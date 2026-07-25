"use client";

import { Heart, Sparkles, CheckCircle2, Wallet } from "lucide-react";
import { Container } from "@/components/layout/container";

const ACTIVITIES = [
  {
    icon: Heart,
    text: "Anonymous supported medical treatment for Rina's mother",
    amount: "৳1,000",
    time: "3 mins ago",
    tag: "Medical",
  },
  {
    icon: Sparkles,
    text: "Tanvir Ahmed backed Open Source Bengali Next.js library",
    amount: "৳500",
    time: "12 mins ago",
    tag: "Open Source",
  },
  {
    icon: CheckCircle2,
    text: "Sylhet Flood Relief Project reached 100% target goal",
    amount: "৳2,50,000",
    time: "24 mins ago",
    tag: "Emergency",
  },
  {
    icon: Wallet,
    text: "Fatima Begum received bKash payout for university books",
    amount: "৳8,500",
    time: "45 mins ago",
    tag: "Education",
  },
];

export function LiveActivity() {
  return (
    <section className="border-b border-[#D9D3C7] bg-[#FAF7F0] py-4 dark:border-slate-800 dark:bg-slate-900">
      <Container variant="wide">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Header Tag */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A84D2A] shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A84D2A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A84D2A]" />
            </span>
            <span>Live Community Activity</span>
          </div>

          {/* Ticker Items */}
          <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 text-xs text-[#1D2927] dark:text-[#F7F4ED]">
            {ACTIVITIES.map((act, i) => {
              const Icon = act.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 shrink-0 bg-white/80 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-[#EAE5DB] dark:border-slate-700 shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-[#A84D2A]" />
                  <span className="font-medium">{act.text}</span>
                  <span className="font-bold text-[#355C52]">{act.amount}</span>
                  <span className="text-[10px] text-slate-400">• {act.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
