"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Heart, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 bg-gradient-to-b from-[#ECFDF5]/60 via-transparent to-transparent dark:from-[#10B981]/5">
      {/* Floating Animated Background Orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#10B981]/20 to-[#4F46E5]/20 blur-3xl opacity-70" />

      <Container variant="wide" className="relative">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-sm border border-slate-200/80 mb-6 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
            <Sparkles className="h-4 w-4 text-[#10B981]" />
            <span>Support Every Dream • 100% Verified Payments</span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Stand Beside <br className="hidden sm:inline" />
            <span className="gradient-text">Every Dream.</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Help creators, students, travelers, families, emergency medical treatments, and community projects reach their goals.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/create" className="w-full sm:w-auto">
              <Button size="xl" className="w-full sm:w-auto gap-2 font-bold shadow-lg shadow-[#10B981]/25">
                <span>Start Campaign</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/discover" className="w-full sm:w-auto">
              <Button size="xl" variant="secondary" className="w-full sm:w-auto font-bold">
                Explore Campaigns
              </Button>
            </Link>
          </div>

          {/* Floating Hero Illustration / Feature Visual */}
          <div className="mt-14 relative w-full max-w-4xl rounded-3xl border border-slate-200/80 bg-white/60 p-4 sm:p-6 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Feature 1 */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#10B981] dark:bg-emerald-950/50">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Manual Verification</h4>
                  <p className="text-xs text-slate-500">Every transaction verified</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5] dark:bg-indigo-950/50">
                  <Heart className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">One Permanent Profile</h4>
                  <p className="text-xs text-slate-500">Unlimited campaigns</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B] dark:bg-amber-950/50">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero Hidden Fees</h4>
                  <p className="text-xs text-slate-500">Direct MFS transfers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
