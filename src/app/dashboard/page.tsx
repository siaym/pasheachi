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

  user.campaigns.forEach(campaign => {
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

  const availableBalance = verifiedAmount; // Could subtract fees here

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
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#A84D2A] flex items-center gap-1.5 mt-4">
              <TrendingUp className="h-3 w-3" /> +৳12,500 this week
            </p>
          </PaperLift>
        </FadeIn>

        <FadeIn delay={0.15}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified
              </span>
              <div className="font-editorial text-3xl text-[#1D2927] mb-1">
                {formatCurrency(metrics.verifiedAmount)}
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-4">
              Ready for withdrawal
            </p>
          </PaperLift>
        </FadeIn>

        <FadeIn delay={0.2}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A] mb-2 block flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> Pending
              </span>
              <div className="font-editorial text-3xl text-[#1D2927] mb-1">
                {formatCurrency(metrics.pendingDonations)}
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-4">
              Awaiting verification
            </p>
          </PaperLift>
        </FadeIn>

        <FadeIn delay={0.25}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
             {/* Decorative stamp */}
             <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
              <Users className="h-24 w-24" />
            </div>
            <div className="relative z-10">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block flex items-center gap-2">
                <Users className="h-3.5 w-3.5" /> Supporters
              </span>
              <div className="font-editorial text-3xl text-[#1D2927] mb-1">
                {metrics.totalSupporters}
              </div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-4">
                From 12 districts
              </p>
            </div>
          </PaperLift>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quick Actions & Tasks */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Quick Actions */}
          <FadeIn delay={0.3} className="space-y-6">
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

              <button className="group text-left">
                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 text-[#1D2927] h-full flex flex-col items-center justify-center gap-3 text-center transition-all hover:border-[#1D2927] w-full">
                  <Rss className="h-6 w-6 text-[#8C7A5B] group-hover:text-[#1D2927] transition-colors" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Post Update</span>
                </PaperLift>
              </button>

              <button className="group text-left">
                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 text-[#1D2927] h-full flex flex-col items-center justify-center gap-3 text-center transition-all hover:border-[#1D2927] w-full">
                  <Share2 className="h-6 w-6 text-[#8C7A5B] group-hover:text-[#1D2927] transition-colors" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Share Campaign</span>
                </PaperLift>
              </button>

              <button className="group text-left">
                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 text-[#1D2927] h-full flex flex-col items-center justify-center gap-3 text-center transition-all hover:border-[#1D2927] w-full">
                  <Download className="h-6 w-6 text-[#8C7A5B] group-hover:text-[#1D2927] transition-colors" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Download Report</span>
                </PaperLift>
              </button>

              <button className="group text-left">
                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 text-[#1D2927] h-full flex flex-col items-center justify-center gap-3 text-center transition-all hover:border-[#1D2927] w-full">
                  <LinkIcon className="h-6 w-6 text-[#8C7A5B] group-hover:text-[#1D2927] transition-colors" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Copy Link</span>
                </PaperLift>
              </button>
            </div>
          </FadeIn>

          {/* Upcoming Tasks */}
          <FadeIn delay={0.4} className="space-y-6">
            <h2 className="font-editorial text-2xl text-[#1D2927] border-b border-[#D9D3C7] pb-2">
              Needs Attention
            </h2>
            <div className="space-y-4">
              <PaperLift className="bg-[#F7F4ED] border-l-4 border-[#A84D2A] border-y border-r border-y-[#D9D3C7] border-r-[#D9D3C7] p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <AlertCircle className="h-5 w-5 text-[#A84D2A]" />
                  <div>
                    <h4 className="font-bold text-sm text-[#1D2927]">Post an update to "Laptop Fund"</h4>
                    <p className="text-xs text-[#53605C] mt-0.5">It's been 14 days since your last update. Supporters want to hear from you.</p>
                  </div>
                </div>
                <button className="h-8 px-4 border border-[#1D2927] text-[#1D2927] font-bold text-[10px] uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors whitespace-nowrap">
                  Draft Update
                </button>
              </PaperLift>

              <PaperLift className="bg-[#F7F4ED] border-l-4 border-[#1D2927] border-y border-r border-y-[#D9D3C7] border-r-[#D9D3C7] p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="h-5 w-5 text-[#1D2927]" />
                  <div>
                    <h4 className="font-bold text-sm text-[#1D2927]">Reply to 3 new supporter messages</h4>
                    <p className="text-xs text-[#53605C] mt-0.5">Engaging with supporters increases the likelihood of them sharing your campaign.</p>
                  </div>
                </div>
                <Link href="/dashboard/supporters" className="h-8 flex items-center px-4 border border-[#1D2927] text-[#1D2927] font-bold text-[10px] uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors whitespace-nowrap">
                  View Messages
                </Link>
              </PaperLift>
            </div>
          </FadeIn>

        </div>

        {/* Right Column: Ledger Log */}
        <div className="lg:col-span-4 space-y-6">
          <FadeIn delay={0.5}>
            <div className="border-b border-[#D9D3C7] pb-2 mb-6">
              <h2 className="font-editorial text-2xl text-[#1D2927]">
                Log Entries
              </h2>
            </div>

            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#D9D3C7] before:to-transparent">
                
                {/* Activity 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#1D2927] bg-[#F7F4ED] text-[#1D2927] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mx-auto absolute left-0 md:left-1/2 -translate-x-1/2">
                    <Wallet className="h-3.5 w-3.5" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-12 md:ml-0 p-3 rounded border border-[#D9D3C7] bg-[#F7F4ED] shadow-sm">
                    <div className="font-mono text-[10px] font-bold text-[#10B981] mb-1">
                      +৳500 Verified
                    </div>
                    <div className="text-xs text-[#53605C] leading-snug">
                      Arif Ahmed • "Laptop Fund"
                    </div>
                    <div className="font-mono text-[9px] text-[#8C7A5B] mt-2 uppercase">2m ago</div>
                  </div>
                </div>

                {/* Activity 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#D9D3C7] bg-[#F7F4ED] text-[#A84D2A] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mx-auto absolute left-0 md:left-1/2 -translate-x-1/2">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-12 md:ml-0 p-3 rounded border border-[#D9D3C7] bg-[#FAF8F3] shadow-sm">
                    <div className="font-mono text-[10px] font-bold text-[#A84D2A] mb-1">
                      ৳1,200 Pending
                    </div>
                    <div className="text-xs text-[#53605C] leading-snug">
                      Awaiting bKash verification
                    </div>
                    <div className="font-mono text-[9px] text-[#8C7A5B] mt-2 uppercase">1h ago</div>
                  </div>
                </div>

                {/* Activity 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mx-auto absolute left-0 md:left-1/2 -translate-x-1/2">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-12 md:ml-0 p-3 rounded border border-[#1D2927] bg-[#F7F4ED] shadow-sm">
                    <div className="font-mono text-[10px] font-bold text-[#1D2927] mb-1">
                      Withdrawal Complete
                    </div>
                    <div className="text-xs text-[#53605C] leading-snug">
                      ৳15,000 sent to ending in 5678
                    </div>
                    <div className="font-mono text-[9px] text-[#8C7A5B] mt-2 uppercase">1d ago</div>
                  </div>
                </div>

                {/* Activity 4 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#D9D3C7] bg-[#F7F4ED] text-[#53605C] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mx-auto absolute left-0 md:left-1/2 -translate-x-1/2">
                    <Eye className="h-3.5 w-3.5" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-12 md:ml-0 p-3 rounded border border-[#D9D3C7] bg-[#FAF8F3] shadow-sm">
                    <div className="font-mono text-[10px] font-bold text-[#1D2927] mb-1">
                      Traffic Spike
                    </div>
                    <div className="text-xs text-[#53605C] leading-snug">
                      45 new visitors today
                    </div>
                    <div className="font-mono text-[9px] text-[#8C7A5B] mt-2 uppercase">2d ago</div>
                  </div>
                </div>
                
              </div>
            </PaperLift>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}
