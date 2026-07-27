import Link from "next/link";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import {
  Wallet,
  Users,
  PlusCircle,
  TrendingUp,
  Eye,
  CheckCircle2,
  AlertCircle,
  Share2,
  Download,
  Link as LinkIcon,
  Rss,
  Banknote,
  ShieldCheck,
  Clock
} from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

import { calculateCampaignHealth } from "@/lib/campaign-health";
import { generateCampaignTimeline } from "@/lib/campaign-timeline";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      campaigns: {
        include: {
          transactions: true,
        },
        orderBy: { createdAt: "desc" }
      },
    },
  });

  if (!userData) {
    redirect("/login");
  }

  let totalRaised = 0;
  let verifiedAmount = 0;
  let pendingDonations = 0;
  let totalSupporters = 0;

  userData.campaigns.forEach(campaign => {
    totalRaised += campaign.raisedAmount;
    
    const uniqueSupporters = new Set();
    campaign.transactions.forEach(trx => {
      uniqueSupporters.add(trx.phone || trx.donorName);
      if (trx.status === "verified") {
        verifiedAmount += trx.amount;
      } else {
        pendingDonations += trx.amount;
      }
    });
    totalSupporters += uniqueSupporters.size;
  });

  const availableBalance = verifiedAmount;
  const activeCampaign = userData.campaigns[0] || {
    description: "",
    coverImageUrl: "",
    transactions: [],
    creator: userData
  };

  const healthResult = calculateCampaignHealth({
    description: activeCampaign.description,
    coverImageUrl: activeCampaign.coverImageUrl,
    bkashNumber: (activeCampaign as any).bkashNumber,
    nagadNumber: (activeCampaign as any).nagadNumber,
    bankDetails: (activeCampaign as any).bankDetails,
    transactions: activeCampaign.transactions,
    creator: userData,
  });

  const timelineEvents = generateCampaignTimeline(activeCampaign);

  // Calculate Publishing Checklist
  const checklistItems = [
    { label: "Campaign Story Description", done: (activeCampaign.description || "").length > 100 },
    { label: "Cover Image Uploaded", done: (activeCampaign.coverImageUrl || "").length > 10 },
    { label: "Goal Amount Specified", done: (activeCampaign.goalAmount || 0) > 0 },
    { label: "Payment Receiving Method", done: Boolean((activeCampaign as any).bkashNumber || (activeCampaign as any).nagadNumber || (activeCampaign as any).bankDetails) },
    { label: "Creator Profile Information", done: Boolean(userData.bio && userData.name) },
  ];
  const completedChecklistCount = checklistItems.filter(i => i.done).length;
  const checklistPercentage = Math.round((completedChecklistCount / checklistItems.length) * 100);

  const metrics = {
    totalRaised,
    verifiedAmount,
    pendingDonations,
    totalSupporters,
    availableBalance,
  };

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9D3C7] pb-6">
        <div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927] mb-2">
            Welcome back, <span className="italic text-[#8C7A5B]">{user.name}</span>
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Workspace Overview • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/create"
            className="h-10 px-5 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#FAF8F3] hover:text-[#1D2927] transition-all shadow-ink"
          >
            <PlusCircle className="h-4 w-4" /> Start New Campaign
          </Link>
        </div>
      </FadeIn>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FadeIn delay={0.1}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block flex items-center gap-2">
                <Wallet className="h-3.5 w-3.5" /> Total Raised
              </span>
              <div className="font-editorial text-3xl text-[#1D2927] mb-1">
                {formatCurrency(metrics.totalRaised)}
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#355C52] flex items-center gap-1.5 mt-4">
              <TrendingUp className="h-3 w-3" /> Live Database Sync
            </p>
          </PaperLift>
        </FadeIn>

        <FadeIn delay={0.15}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#355C52] mb-2 block flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified Balance
              </span>
              <div className="font-editorial text-3xl text-[#1D2927] mb-1">
                {formatCurrency(metrics.verifiedAmount)}
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-4">
              Available for payout
            </p>
          </PaperLift>
        </FadeIn>

        <FadeIn delay={0.2}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A] mb-2 block flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> Pending Audit
              </span>
              <div className="font-editorial text-3xl text-[#1D2927] mb-1">
                {formatCurrency(metrics.pendingDonations)}
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-4">
              Manual MFS verification in progress
            </p>
          </PaperLift>
        </FadeIn>

        <FadeIn delay={0.25}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block flex items-center gap-2">
                <Users className="h-3.5 w-3.5" /> Total Supporters
              </span>
              <div className="font-editorial text-3xl text-[#1D2927] mb-1">
                {metrics.totalSupporters}
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-4">
              Community contributors
            </p>
          </PaperLift>
        </FadeIn>
      </div>

      {/* Campaign Health Score & Readiness Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Campaign Health Score Card */}
        <FadeIn delay={0.3} className="lg:col-span-7">
          <PaperLift className="bg-[#FAF8F3] border border-[#1D2927] p-6 sm:p-8 shadow-paper h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A]">
                    Campaign Performance Audit
                  </span>
                  <h3 className="font-editorial text-2xl text-[#1D2927] mt-1">Campaign Health Score</h3>
                </div>
                <div className="text-right">
                  <div className="font-mono text-3xl font-bold text-[#1D2927]">
                    {healthResult.score} <span className="text-xs text-[#8C7A5B]">/ 100</span>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 border border-[#355C52] bg-[#E5EEE8] font-mono text-[9px] font-bold uppercase text-[#355C52] mt-1">
                    Grade {healthResult.grade}
                  </span>
                </div>
              </div>

              {/* Suggestions List */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C]">
                  Actionable Suggestions to Boost Health
                </span>
                {healthResult.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-[#F7F4ED] border border-[#D9D3C7] text-xs font-mono text-[#1D2927]">
                    <CheckCircle2 className="h-4 w-4 text-[#A84D2A] shrink-0 mt-0.5" />
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          </PaperLift>
        </FadeIn>

        {/* Publishing Readiness Checklist */}
        <FadeIn delay={0.35} className="lg:col-span-5">
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 sm:p-8 shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4 mb-6">
                <h3 className="font-editorial text-xl text-[#1D2927]">Campaign Readiness</h3>
                <span className="font-mono text-sm font-bold text-[#A84D2A]">
                  {checklistPercentage}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-[#EAE5DB] border border-[#D9D3C7] overflow-hidden mb-6">
                <div 
                  className="h-full bg-[#1D2927] transition-all duration-700" 
                  style={{ width: `${checklistPercentage}%` }}
                />
              </div>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-mono">
                    <span className={item.done ? "text-[#1D2927]" : "text-[#8C7A5B] line-through"}>
                      {item.label}
                    </span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase ${item.done ? 'bg-[#E5EEE8] text-[#355C52]' : 'bg-[#EAE5DB] text-[#8C7A5B]'}`}>
                      {item.done ? 'Done' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </PaperLift>
        </FadeIn>
      </div>

      {/* Automatic Campaign Timeline & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quick Actions & Tasks */}
        <div className="lg:col-span-8 space-y-8">
          <FadeIn delay={0.4} className="space-y-4">
            <h2 className="font-editorial text-2xl text-[#1D2927] border-b border-[#D9D3C7] pb-2">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link href="/create" className="group">
                <PaperLift className="bg-[#1D2927] border border-[#1D2927] p-4 text-[#F7F4ED] h-full flex flex-col items-center justify-center gap-3 text-center transition-all hover:bg-[#1D2927]/90 shadow-ink">
                  <PlusCircle className="h-6 w-6" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">New Campaign</span>
                </PaperLift>
              </Link>
              
              <Link href="/dashboard/withdrawals" className="group">
                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 text-[#1D2927] h-full flex flex-col items-center justify-center gap-3 text-center transition-all hover:border-[#1D2927]">
                  <Banknote className="h-6 w-6 text-[#8C7A5B] group-hover:text-[#1D2927] transition-colors" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Request Payout</span>
                </PaperLift>
              </Link>

              <Link href="/dashboard/donors" className="group">
                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 text-[#1D2927] h-full flex flex-col items-center justify-center gap-3 text-center transition-all hover:border-[#1D2927]">
                  <Users className="h-6 w-6 text-[#8C7A5B] group-hover:text-[#1D2927] transition-colors" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Supporter CRM</span>
                </PaperLift>
              </Link>

              <Link href={`/${user.username}`} className="group">
                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 text-[#1D2927] h-full flex flex-col items-center justify-center gap-3 text-center transition-all hover:border-[#1D2927]">
                  <Share2 className="h-6 w-6 text-[#8C7A5B] group-hover:text-[#1D2927] transition-colors" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Public Profile</span>
                </PaperLift>
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Automatic Campaign Timeline */}
        <div className="lg:col-span-4 space-y-6">
          <FadeIn delay={0.5}>
            <div className="border-b border-[#D9D3C7] pb-2 mb-6">
              <h2 className="font-editorial text-2xl text-[#1D2927]">
                Automatic Campaign Timeline
              </h2>
            </div>

            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
              <div className="space-y-6">
                {timelineEvents.map((evt) => (
                  <div key={evt.id} className="flex gap-4 items-start border-l-2 border-[#1D2927] pl-4">
                    <div>
                      <span className="font-mono text-[9px] uppercase font-bold text-[#A84D2A] tracking-widest block">
                        {evt.date}
                      </span>
                      <h4 className="font-bold text-sm text-[#1D2927] mt-0.5">{evt.title}</h4>
                      <p className="font-mono text-xs text-[#53605C] mt-1">{evt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PaperLift>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}


