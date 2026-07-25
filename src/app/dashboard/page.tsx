"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeIn, PaperLift, RevealText } from "@/components/ui/motion";
import { MOCK_CAMPAIGNS, MOCK_USERS } from "@/data/mock";
import { formatCurrency, calculateProgress } from "@/lib/utils";
import {
  Wallet,
  Rocket,
  Users,
  PlusCircle,
  ArrowUpRight,
  TrendingUp,
  Eye,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  const user = MOCK_USERS.siyam;
  const myCampaigns = MOCK_CAMPAIGNS.filter(
    (c) => c.creator.username === user.username
  );

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#D9D3C7] pb-6">
        <div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927] mb-2">
            Welcome back, <span className="italic text-[#8C7A5B]">{user.name}</span>
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Ledger Overview • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/${user.username}`}>
            <button className="h-10 px-5 border border-[#1D2927] text-[#1D2927] font-bold text-xs uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors flex items-center gap-2">
              View Profile <ArrowUpRight className="h-4 w-4" />
            </button>
          </Link>
          <Link href="/create">
            <button className="h-10 px-5 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] font-bold text-xs uppercase tracking-widest hover:bg-[#1D2927]/90 shadow-ink transition-all flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> New Campaign
            </button>
          </Link>
        </div>
      </FadeIn>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FadeIn delay={0.1}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Wallet className="h-24 w-24" />
            </div>
            <div className="relative z-10">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block">
                Total Raised
              </span>
              <div className="font-editorial text-4xl text-[#1D2927] mb-4">
                ৳32,500
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#A84D2A] flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3" /> +৳12,500 this week
              </p>
            </div>
          </PaperLift>
        </FadeIn>

        <FadeIn delay={0.2}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Rocket className="h-24 w-24" />
            </div>
            <div className="relative z-10">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block">
                Active Campaigns
              </span>
              <div className="font-editorial text-4xl text-[#1D2927] mb-4">
                {myCampaigns.length}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                All records active
              </p>
            </div>
          </PaperLift>
        </FadeIn>

        <FadeIn delay={0.3}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Users className="h-24 w-24" />
            </div>
            <div className="relative z-10">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block">
                Total Supporters
              </span>
              <div className="font-editorial text-4xl text-[#1D2927] mb-4">
                128
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                From 12 districts
              </p>
            </div>
          </PaperLift>
        </FadeIn>
      </div>

      {/* Main Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Campaigns Table (Left 8 cols) */}
        <FadeIn delay={0.4} className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-2">
            <h2 className="font-editorial text-2xl text-[#1D2927]">
              Active Records
            </h2>
            <Link href="/create" className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A] hover:text-[#1D2927] transition-colors">
              [+ Add Record]
            </Link>
          </div>

          <div className="space-y-4">
            {myCampaigns.map((cmp) => {
              const progress = calculateProgress(cmp.raisedAmount, cmp.goalAmount);
              return (
                <PaperLift
                  key={cmp.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-4 sm:p-5 bg-[#FAF8F3] border border-[#D9D3C7] shadow-sm transition-all hover:border-[#1D2927]"
                >
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cmp.imageUrl}
                      alt={cmp.title}
                      className="h-16 w-20 object-cover grayscale opacity-80 mix-blend-multiply"
                    />
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/${user.username}/${cmp.slug}`}
                        className="font-bold text-sm text-[#1D2927] hover:text-[#A84D2A] line-clamp-1 transition-colors"
                      >
                        {cmp.title}
                      </Link>
                      <div className="flex items-center gap-4 mt-2 font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                        <span className="flex items-center gap-1.5 border border-[#1D2927] px-2 py-0.5 text-[#1D2927] font-bold bg-[#EAE5DB]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> {cmp.status}
                        </span>
                        <span>{cmp.daysLeft} days left</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-48 space-y-2 text-left sm:text-right shrink-0 border-t sm:border-t-0 sm:border-l border-[#D9D3C7] pt-4 sm:pt-0 sm:pl-6">
                    <div className="font-mono text-xs font-bold text-[#1D2927]">
                      {formatCurrency(cmp.raisedAmount)} <span className="text-[#8C7A5B] font-normal">/ {formatCurrency(cmp.goalAmount)}</span>
                    </div>
                    {/* Progress Bar (Paper Style) */}
                    <div className="h-1.5 w-full bg-[#EAE5DB] overflow-hidden">
                      <div 
                        className="h-full bg-[#1D2927]" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                      {progress}% Funded
                    </div>
                  </div>
                </PaperLift>
              );
            })}
          </div>
        </FadeIn>

        {/* Activity Feed (Right 4 cols) */}
        <FadeIn delay={0.5} className="lg:col-span-4 space-y-6">
          <div className="border-b border-[#D9D3C7] pb-2">
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
                  <div className="font-mono text-[10px] font-bold text-[#A84D2A] mb-1">
                    +৳500 • Arif Ahmed
                  </div>
                  <div className="text-xs text-[#53605C] leading-snug">
                    for "Laptop Fund for AI Dev"
                  </div>
                  <div className="font-mono text-[9px] text-[#8C7A5B] mt-2 uppercase">2m ago</div>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#D9D3C7] bg-[#F7F4ED] text-[#53605C] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mx-auto absolute left-0 md:left-1/2 -translate-x-1/2">
                  <Eye className="h-3.5 w-3.5" />
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-12 md:ml-0 p-3 rounded border border-[#D9D3C7] bg-[#FAF8F3] shadow-sm">
                  <div className="font-mono text-[10px] font-bold text-[#1D2927] mb-1">
                    45 Profile Views
                  </div>
                  <div className="text-xs text-[#53605C] leading-snug">
                    Spike in traffic today
                  </div>
                  <div className="font-mono text-[9px] text-[#8C7A5B] mt-2 uppercase">4h ago</div>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mx-auto absolute left-0 md:left-1/2 -translate-x-1/2">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-12 md:ml-0 p-3 rounded border border-[#1D2927] bg-[#F7F4ED] shadow-sm">
                  <div className="font-mono text-[10px] font-bold text-[#1D2927] mb-1">
                    Record Verified
                  </div>
                  <div className="text-xs text-[#53605C] leading-snug">
                    "Next.js Tooling" is live
                  </div>
                  <div className="font-mono text-[9px] text-[#8C7A5B] mt-2 uppercase">1d ago</div>
                </div>
              </div>
              
            </div>
          </PaperLift>
        </FadeIn>
      </div>
    </div>
  );
}
