"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [claimHandle, setClaimHandle] = useState("");

  return (
    <section className="border-b border-[#D9D3C7] bg-[#F7F4ED] py-14 sm:py-24">
      <Container variant="wide">
        <div className="grid items-end gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-6">People standing beside people</p>
            <h1 className="max-w-3xl text-5xl font-bold leading-[.98] text-[#1D2927] sm:text-7xl lg:text-[5.4rem]">
              Every dream deserves <em className="font-normal text-[#A84D2A]">someone beside it.</em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#53605C] sm:text-lg">
              PasheAchi brings people together for medical care, education, community work, creative projects, and the moments that cannot wait.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/discover"><Button size="lg" variant="accent">Find a cause <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/about"><Button size="lg" variant="ghost">Why PasheAchi</Button></Link>
            </div>
            <form
              onSubmit={(event) => { event.preventDefault(); if (claimHandle) window.location.href = `/signup?username=${claimHandle}`; }}
              className="mt-12 max-w-md border-t border-[#D9D3C7] pt-6"
            >
              <label htmlFor="handle" className="text-xs font-semibold uppercase tracking-[.12em] text-[#53605C]">Your permanent place on PasheAchi</label>
              <div className="mt-3 flex border-b border-[#9B9488] pb-2 focus-within:border-[#A84D2A]">
                <span className="pt-1 text-sm text-[#68726D]">pasheachi.com/@</span>
                <input id="handle" value={claimHandle} onChange={(event) => setClaimHandle(event.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))} placeholder="your-name" className="min-w-0 flex-1 bg-transparent px-1 text-sm font-semibold text-[#1D2927] outline-none placeholder:font-normal" />
                <button type="submit" className="text-sm font-semibold text-[#A84D2A] hover:text-[#843B20]">Claim it</button>
              </div>
            </form>
          </div>

          <aside className="relative border-y border-[#D9D3C7] py-7 sm:py-10 lg:mb-2">
            <div className="absolute left-0 top-0 h-1 w-16 bg-[#A84D2A]" />
            <p className="eyebrow">A story in progress</p>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-[#1D2927]">Help Rina&apos;s mother receive urgent cardiac care.</h2>
            <p className="mt-4 text-sm leading-6 text-[#53605C]">A verified request from Dhaka, supported by 142 neighbours, friends and strangers.</p>
            <div className="mt-8 flex items-end justify-between border-b border-[#D9D3C7] pb-4">
              <div><p className="text-3xl font-bold text-[#1D2927]">৳34,500</p><p className="mt-1 text-xs text-[#68726D]">raised of ৳50,000</p></div>
              <p className="text-sm font-semibold text-[#355C52]">69% funded</p>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4 text-xs text-[#53605C]"><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#355C52]" />Identity checked</span><Link href="/@rina/medical-fund-mother" className="inline-flex items-center gap-1 font-semibold text-[#A84D2A]">Read story <ArrowUpRight className="h-3.5 w-3.5" /></Link></div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
