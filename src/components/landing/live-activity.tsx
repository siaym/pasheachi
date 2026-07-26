"use client";

import { Heart, Sparkles, CheckCircle2, Wallet } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const ACTIVITIES = [
  {
    icon: Heart,
    text: "Anonymous supported medical treatment for Rina's mother",
    amount: "৳1,000",
    time: "3 mins ago",
  },
  {
    icon: Sparkles,
    text: "Tanvir Ahmed backed Open Source Bengali Next.js library",
    amount: "৳500",
    time: "12 mins ago",
  },
  {
    icon: CheckCircle2,
    text: "Sylhet Flood Relief Project reached 100% target goal",
    amount: "৳2,50,000",
    time: "24 mins ago",
  },
  {
    icon: Wallet,
    text: "Fatima Begum received bKash payout for university books",
    amount: "৳8,500",
    time: "45 mins ago",
  },
];

export function LiveActivity({ transactions }: { transactions: any[] }) {
  // If we have real transactions, map them. Otherwise, fall back to mock data
  const baseActivities = transactions.length > 0 
    ? transactions.map(t => ({
        icon: Heart,
        text: `${t.isAnonymous ? 'Anonymous' : t.donorName} supported ${t.campaignTitle}`,
        amount: `৳${t.amount.toLocaleString()}`,
        time: t.date,
      }))
    : ACTIVITIES;

  const duplicatedActivities = [...baseActivities, ...baseActivities, ...baseActivities];

  return (
    <section className="border-b border-[#D9D3C7] bg-[#1D2927] py-3.5 overflow-hidden">
      <FadeIn delay={0.2} className="flex items-center mx-auto max-w-[1920px]">
        {/* Header Tag */}
        <div className="flex items-center gap-3 px-6 md:px-12 border-r border-[#2F3E3B] shrink-0 text-[#F7F4ED] bg-[#1D2927] z-10 relative">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A84D2A] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A84D2A]" />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Live Support</span>
        </div>

        {/* Ticker Items */}
        <div className="flex-1 relative flex">
          <div className="flex items-center gap-8 px-8 text-[11px] font-mono tracking-wide text-[#D9D3C7] animate-marquee whitespace-nowrap w-max">
            {duplicatedActivities.map((act, i) => {
              const Icon = act.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 shrink-0 group"
                >
                  <Icon className="h-3 w-3 text-[#A84D2A]" />
                  <span className="text-[#F7F4ED] group-hover:text-[#A84D2A] transition-colors cursor-default">{act.text}</span>
                  <span className="font-bold text-[#A84D2A]">— {act.amount}</span>
                  <span className="text-[#53605C]">{act.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}


