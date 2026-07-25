"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <section className="py-16 sm:py-24">
      <Container variant="wide">
        <div className="border-y border-[#D9D3C7] py-10 sm:grid sm:grid-cols-[1fr_auto] sm:items-end sm:gap-12">
          <div><p className="eyebrow">From the community</p><h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-[#1D2927] sm:text-5xl">A quieter way to keep close to the causes you care about.</h2></div>
          {subscribed ? <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#355C52]"><CheckCircle2 className="h-5 w-5" /> You&apos;re on the list. Thank you.</p> : <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }} className="mt-6 flex min-w-0 border-b border-[#9B9488] pb-2 sm:mt-0 sm:w-80"><input type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#68726D]" /><button className="inline-flex items-center gap-1 text-sm font-semibold text-[#A84D2A]">Join <ArrowRight className="h-4 w-4" /></button></form>}
        </div>
      </Container>
    </section>
  );
}
