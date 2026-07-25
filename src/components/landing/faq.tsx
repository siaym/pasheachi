"use client";

import { Container } from "@/components/layout/container";
import { FadeIn, RevealText, PaperLift } from "@/components/ui/motion";
import { Accordion } from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  return (
    <section className="py-24 sm:py-32 bg-transparent relative border-t border-[#D9D3C7]">
      <Container variant="content">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#A84D2A] mb-8">
              <span className="h-px w-8 bg-[#A84D2A]"></span>
              <span className="font-mono">Got Questions?</span>
              <span className="h-px w-8 bg-[#A84D2A]"></span>
            </div>
          </FadeIn>
          
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1D2927] mb-6">
            <RevealText>Frequently Asked</RevealText>
            <RevealText><span className="italic text-[#8C7A5B] font-light">Questions.</span></RevealText>
          </h2>

          <FadeIn delay={0.2}>
            <p className="text-sm sm:text-base leading-relaxed text-[#53605C] max-w-xl mx-auto">
              Everything you need to know about starting a campaign, manual verification, fees, and safety.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-8 sm:p-12 shadow-paper backdrop-paper">
            <Accordion items={FAQ_ITEMS} />
          </PaperLift>
        </FadeIn>
      </Container>
    </section>
  );
}
