"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import {
  Wallet,
  Users,
  Megaphone,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AdminOverviewPage() {
  // Mock Admin Metrics
  const metrics = {
    revenue: 42500000, // 4.2 Cr
    activeCampaigns: 1247,
    totalUsers: 15832,
    verificationRate: 99.2,
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9D3C7] pb-6">
        <div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927] mb-2">
            System Overview
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Platform Health & Key Metrics • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </FadeIn>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <FadeIn delay={0.1}>
          <PaperLift className="bg-[#FAF8F3] border border-[#1E3A8A] p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1E3A8A] mb-2 block flex items-center gap-2">
                <Wallet className="h-3.5 w-3.5" /> Platform Revenue
              </span>
              <div className="font-editorial text-3xl text-[#1D2927] mb-1">
                {formatCurrency(metrics.revenue)}
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#10B981] flex items-center gap-1.5 mt-4">
              <TrendingUp className="h-3 w-3" /> +18.4% this month
            </p>
          </PaperLift>
        </FadeIn>

        <FadeIn delay={0.15}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C] mb-2 block flex items-center gap-2">
                <Megaphone className="h-3.5 w-3.5" /> Total Campaigns
              </span>
              <div className="font-editorial text-3xl text-[#1D2927] mb-1">
                {metrics.activeCampaigns.toLocaleString()}
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#A84D2A] mt-4">
              12 pending review
            </p>
          </PaperLift>
        </FadeIn>

        <FadeIn delay={0.2}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C] mb-2 block flex items-center gap-2">
                <Users className="h-3.5 w-3.5" /> Total Users
              </span>
              <div className="font-editorial text-3xl text-[#1D2927] mb-1">
                {metrics.totalUsers.toLocaleString()}
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#10B981] mt-4">
              +142 new today
            </p>
          </PaperLift>
        </FadeIn>

        <FadeIn delay={0.25}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C] mb-2 block flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verification Rate
              </span>
              <div className="font-editorial text-3xl text-[#1D2927] mb-1">
                {metrics.verificationRate}%
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-4">
              Avg audit time 1.4 hrs
            </p>
          </PaperLift>
        </FadeIn>
      </div>

      {/* Priority Action Cards */}
      <FadeIn delay={0.3}>
        <h2 className="font-editorial text-2xl text-[#1D2927] border-b border-[#D9D3C7] pb-2 mb-6">
          Needs Attention
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PaperLift className="bg-[#F8FAFC] border-2 border-red-200 p-8 flex flex-col items-start gap-4 shadow-sm relative overflow-hidden">
            <div className="absolute -right-8 -top-8 opacity-5">
              <ShieldAlert className="w-48 h-48 text-red-600" />
            </div>
            <div className="relative z-10 space-y-4 w-full flex flex-col h-full">
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-red-600 mb-2">
                  <ShieldAlert className="h-4 w-4" /> 23 Pending
                </div>
                <h3 className="font-editorial text-2xl text-[#1D2927]">Verification Queue</h3>
                <p className="text-sm text-[#53605C] mt-2 leading-relaxed max-w-sm">
                  Audit individual transactions submitted by donors. Approve valid payments or reject mismatched IDs.
                </p>
              </div>
              
              <div className="mt-auto pt-4">
                <Link href="/admin/verification" className="inline-flex h-10 px-6 bg-red-600 text-white font-mono text-[10px] font-bold uppercase tracking-widest items-center gap-2 hover:bg-red-700 transition-colors">
                  Process Queue <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </PaperLift>

          <PaperLift className="bg-[#EFF6FF] border-2 border-[#1E3A8A] p-8 flex flex-col items-start gap-4 shadow-[4px_4px_0_0_#1E3A8A] relative overflow-hidden">
            <div className="absolute -right-8 -top-8 opacity-5">
              <Megaphone className="w-48 h-48 text-[#1E3A8A]" />
            </div>
            <div className="relative z-10 space-y-4 w-full flex flex-col h-full">
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1E3A8A] mb-2">
                  <Megaphone className="h-4 w-4" /> 12 Pending
                </div>
                <h3 className="font-editorial text-2xl text-[#1D2927]">Campaign Approvals</h3>
                <p className="text-sm text-[#53605C] mt-2 leading-relaxed max-w-sm">
                  Review newly submitted campaigns for policy violations before they go live on the public Discover page.
                </p>
              </div>
              
              <div className="mt-auto pt-4">
                <Link href="/admin/campaigns" className="inline-flex h-10 px-6 bg-[#1E3A8A] text-white font-mono text-[10px] font-bold uppercase tracking-widest items-center gap-2 hover:bg-[#1E40AF] transition-colors">
                  Review Campaigns <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </PaperLift>
        </div>
      </FadeIn>

    </div>
  );
}
