"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Heart, Wallet, Users, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";

export function Hero() {
  const [claimHandle, setClaimHandle] = useState("");

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 bg-[#F8FAFC] dark:bg-[#0B0F1A]">
      {/* Handcrafted Architectural Ambient Lighting (No Neon/Purple) */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[600px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-emerald-500/0 to-transparent blur-2xl" />

      <Container variant="wide" className="relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Subtle Trust Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold text-[#047857] shadow-sm backdrop-blur-md dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300 mb-8">
            <ShieldCheck className="h-4 w-4 text-[#10B981]" />
            <span>100% Verified Manual bKash & Nagad Transfers</span>
            <span className="hidden sm:inline text-emerald-300">•</span>
            <span className="hidden sm:inline font-bold">পাশে আছি</span>
          </div>

          {/* Master Headline */}
          <h1 className="max-w-5xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            Stand Beside <br className="hidden sm:inline" />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#047857]">
              Every Dream.
            </span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="mt-6 max-w-2xl text-base sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
            A handcrafted crowdfunding platform for Bangladesh. Support medical procedures, university tuition, open-source software, travel, emergency relief, and personal dreams.
          </p>

          {/* Interactive Claim Username Box */}
          <div className="mt-10 w-full max-w-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (claimHandle) window.location.href = `/signup?username=${claimHandle}`;
              }}
              className="relative flex items-center rounded-2xl border-2 border-slate-200 bg-white p-2 shadow-xl focus-within:border-[#10B981] focus-within:ring-4 focus-within:ring-[#10B981]/15 transition-all dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="pl-3 text-xs sm:text-sm font-bold text-slate-400 select-none">
                pasheachi.bro.bd/@
              </span>
              <input
                type="text"
                placeholder="your-name"
                value={claimHandle}
                onChange={(e) =>
                  setClaimHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
                }
                className="h-10 flex-1 bg-transparent px-1 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
              />
              <Button type="submit" size="md" className="shrink-0 font-bold gap-1.5 shadow-md">
                <span>Claim Profile</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
              <span>Claim your permanent 1-link profile in 30 seconds</span>
              <span>•</span>
              <span className="text-[#10B981] font-semibold">100% Free</span>
            </p>
          </div>

          {/* Hero Showcase Card — Handcrafted Interactive Mockup */}
          <div className="mt-14 w-full max-w-5xl relative">
            <div className="relative rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-left overflow-hidden">
              
              {/* Floating Notification Toast Simulation */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 hidden sm:flex items-center gap-3 rounded-2xl border border-emerald-200/80 bg-white/95 p-3.5 shadow-xl backdrop-blur-md dark:border-emerald-900/60 dark:bg-slate-900/95 animate-bounce">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#10B981] shrink-0">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    bKash Received ৳500
                  </div>
                  <div className="text-[10px] text-slate-500">
                    from Arif Ahmed • 2 mins ago
                  </div>
                </div>
              </div>

              {/* Showcase Grid inside Hero */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Media Mockup */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
                      alt="Hero Cause Showcase"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="primary">MEDICAL FUND</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1 text-[#10B981]">
                      <CheckCircle2 className="h-4 w-4" /> NID Verified Creator
                    </span>
                    <span>12 days left</span>
                  </div>
                </div>

                {/* Right Details Mockup */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                        name="Rina Akter"
                        size="sm"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Rina Akter
                        </div>
                        <div className="text-[10px] text-slate-500">
                          pasheachi.bro.bd/@rina
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                      Help Rina's Mother Get Urgent Surgery
                    </h3>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#10B981]">69% Raised</span>
                      <span className="text-slate-900 dark:text-white">
                        ৳34,500 of ৳50,000
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#059669] to-[#10B981] w-[69%]" />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                      <span>142 Supporters</span>
                      <span>Verified Manual Audit</span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-3">
                    <Link href="/@rina/medical-fund-mother" className="flex-1">
                      <Button size="lg" className="w-full font-bold shadow-md gap-2">
                        <span>Support ৳250 Now</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
