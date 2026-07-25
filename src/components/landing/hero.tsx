"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Wallet, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

export function Hero() {
  const [claimHandle, setClaimHandle] = useState("");

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 bg-[#FDFBF7] dark:bg-[#0F172A]">
      <Container variant="wide" className="relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Subtle Story Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EADECC] bg-[#F4F0EA] px-4 py-1.5 text-xs font-semibold text-[#1E293B] shadow-sm mb-8 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <Heart className="h-3.5 w-3.5 text-[#C25E00]" />
            <span>"পাশে আছি" — People Standing Beside People</span>
          </div>

          {/* Master Editorial Headline */}
          <h1 className="max-w-5xl text-4xl sm:text-6xl lg:text-7xl font-editorial font-bold tracking-tight text-[#1E293B] dark:text-[#FDFBF7] leading-[1.08]">
            Stand Beside <br className="hidden sm:inline" />
            <span className="italic text-[#C25E00]">Every Dream.</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="mt-6 max-w-2xl text-base sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
            A handcrafted crowdfunding and support platform for Bangladesh. Back medical treatments, university tuition, travel, open source, emergency relief, and personal dreams.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/discover" className="w-full sm:w-auto">
              <Button size="xl" variant="accent" className="w-full sm:w-auto font-bold gap-2">
                <span>Explore Causes</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/create" className="w-full sm:w-auto">
              <Button size="xl" variant="secondary" className="w-full sm:w-auto font-bold">
                Start a Campaign
              </Button>
            </Link>
          </div>

          {/* Inline Profile Handle Claim Input */}
          <div className="mt-10 w-full max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (claimHandle) window.location.href = `/signup?username=${claimHandle}`;
              }}
              className="relative flex items-center rounded-2xl border border-[#EADECC] bg-white p-2 shadow-sm focus-within:border-[#C25E00] focus-within:ring-2 focus-within:ring-[#C25E00]/20 transition-all dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="pl-3 text-xs font-bold text-slate-400 select-none">
                pasheachi.bro.bd/@
              </span>
              <input
                type="text"
                placeholder="your-name"
                value={claimHandle}
                onChange={(e) =>
                  setClaimHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
                }
                className="h-9 flex-1 bg-transparent px-1 text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
              />
              <Button type="submit" size="sm" variant="default" className="shrink-0 font-bold text-xs">
                Claim URL
              </Button>
            </form>
          </div>

          {/* Handcrafted Editorial Cause Card Preview */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="card-editorial p-6 sm:p-8 text-left space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EADECC] pb-6 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <Avatar
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                    name="Rina Akter"
                    size="md"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#1E293B] dark:text-[#FDFBF7]">
                      Rina Akter • pasheachi.bro.bd/@rina
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#2D5A27]" />
                      <span>NID Verified Creator • Dhaka</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>12 days left</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-editorial font-bold text-[#1E293B] dark:text-[#FDFBF7]">
                  Help Rina's Mother Get Urgent Surgery
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  My mother requires an immediate open-heart procedure at National Heart Foundation. Every contribution brings us one step closer to saving her life.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-bold text-[#1E293B] dark:text-[#FDFBF7]">
                  <span className="text-[#2D5A27]">৳34,500 raised (69%)</span>
                  <span>Goal: ৳50,000</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#F4F0EA] dark:bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-[#2D5A27] w-[69%]" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Wallet className="h-4 w-4 text-[#2D5A27]" />
                  <span>Manual bKash & Nagad Audit Verified</span>
                </div>

                <Link href="/@rina/medical-fund-mother">
                  <Button variant="accent" size="md" className="font-bold gap-1.5">
                    <span>Support This Dream</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
