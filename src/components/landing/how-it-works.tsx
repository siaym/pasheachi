"use client";

import { Container } from "@/components/layout/container";
import { FadeIn, RevealText, InkDivider } from "@/components/ui/motion";

const STEPS = [
  {
    step: "01",
    title: "Claim Your Story",
    description: "Every journey needs a home. Create a beautiful, permanent narrative page that tells the world exactly what you are fighting for.",
  },
  {
    step: "02",
    title: "The Power of Proof",
    description: "We are building an archive of trust. Upload documents, photos, and updates. Transparency is how strangers become community.",
  },
  {
    step: "03",
    title: "Share with the World",
    description: "Your story is only as powerful as its reach. We provide beautifully crafted preview cards for every social network.",
  },
  {
    step: "04",
    title: "Receive Direct Support",
    description: "Direct to you. Funds are transferred via secure local channels (bKash, Nagad, Bank). No hidden fees, no opaque holding periods.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-transparent border-b border-[#D9D3C7]">
      <Container variant="wide">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#A84D2A] mb-8">
              <span className="h-px w-8 bg-[#A84D2A]"></span>
              <span className="font-mono">The Process</span>
              <span className="h-px w-8 bg-[#A84D2A]"></span>
            </div>
          </FadeIn>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1D2927]">
            <RevealText>How trust is</RevealText>
            <RevealText><span className="italic text-[#8C7A5B] font-light">built.</span></RevealText>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Vertical Ink Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#D9D3C7] -translate-x-1/2 z-0" />

          <div className="flex flex-col gap-12 sm:gap-24 relative z-10">
            {STEPS.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Content Side */}
                  <div className={`flex-1 flex flex-col ${isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} text-center items-center`}>
                    <FadeIn delay={0.1}>
                      <span className="mb-4 inline-block font-mono text-[10px] font-bold tracking-[0.2em] text-[#A84D2A] bg-[#F7F4ED] border border-[#A84D2A] px-3 py-1">
                        PHASE {item.step}
                      </span>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1D2927] mb-4">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#53605C] max-w-sm">
                        {item.description}
                      </p>
                    </FadeIn>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex shrink-0 w-16 h-16 rounded-full border border-[#1D2927] bg-[#FAF8F3] items-center justify-center font-editorial text-2xl text-[#1D2927] shadow-sm relative">
                    {/* Horizontal connector to the line */}
                    <div className={`absolute top-1/2 w-8 h-px bg-[#1D2927] ${isEven ? 'right-full' : 'left-full'}`}></div>
                    <span className="italic">{item.step}</span>
                  </div>

                  {/* Empty Spacer Side */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-32 max-w-2xl mx-auto">
            <InkDivider className="mb-8" />
            <div className="text-center">
              <p className="font-editorial text-2xl italic text-[#1D2927] mb-4">
                "Our promise is simple: transparency at every step."
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                — The PasheAchi Trust & Safety Team
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
