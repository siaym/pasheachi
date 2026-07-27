"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { MOCK_SUCCESS_STORIES } from "@/data/mock";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, RevealText } from "@/components/ui/motion";

import { Campaign } from "@/types";

export function SuccessStories({ campaigns = [] }: { campaigns?: Campaign[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const stories = campaigns.length > 0 
    ? campaigns.map(c => ({
        id: c.id,
        name: c.creator?.name || "Anonymous Creator",
        location: c.location || "Bangladesh",
        photoUrl: c.coverImageUrl || c.creator?.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        quote: c.subtitle || c.description.slice(0, 150) + "...",
        amountRaised: c.raisedAmount,
        supportersCount: c.transactions?.length || 0,
        campaignTitle: c.title,
      }))
    : MOCK_SUCCESS_STORIES;

  const current = stories[activeIdx] || stories[0];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };


  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-[#D9D3C7]">
      <Container variant="wide">
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#A84D2A] mb-6">
              <span className="h-px w-8 bg-[#A84D2A]"></span>
              <span className="font-mono">Success Stories</span>
              <span className="h-px w-8 bg-[#A84D2A]"></span>
            </div>
          </FadeIn>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-[#1D2927]">
            <RevealText>The pages we write</RevealText>
            <RevealText><span className="italic text-[#8C7A5B] font-light">together.</span></RevealText>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto border border-[#1D2927] bg-[#FAF8F3] shadow-paper p-1">
          <div className="relative border border-[#D9D3C7] bg-[#F7F4ED] overflow-hidden min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 h-full"
              >
                {/* Photo Side */}
                <div className="relative h-64 md:h-full border-b md:border-b-0 md:border-r border-[#D9D3C7] p-2">
                  <div className="relative h-full w-full grayscale hover:grayscale-0 transition-all duration-1000">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={current.photoUrl} 
                      alt={current.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#8C7A5B]/10 mix-blend-multiply"></div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex flex-col p-8 sm:p-12 md:p-16">
                  <div className="flex items-center gap-2 mb-8">
                    <CheckCircle2 className="h-4 w-4 text-[#A84D2A]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A84D2A]">Verified Success</span>
                  </div>

                  <blockquote className="font-editorial text-2xl sm:text-3xl leading-relaxed text-[#1D2927] flex-1">
                    "{current.quote}"
                  </blockquote>

                  <div className="mt-12 pt-8 border-t border-[#D9D3C7]">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#1D2927] mb-1">
                      {current.name}
                    </h4>
                    <p className="text-[11px] font-mono text-[#53605C] mb-6 uppercase tracking-wider">
                      {current.location}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pb-20 md:pb-0 md:pr-48">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-1">Raised</div>
                        <div className="font-mono text-xl text-[#1D2927]">{formatCurrency(current.amountRaised)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-1">Supporters</div>
                        <div className="font-mono text-xl text-[#1D2927]">{current.supportersCount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-0 right-0 md:bottom-8 md:right-8 flex items-center bg-[#F7F4ED] border-t border-l md:border-[#1D2927] border-[#D9D3C7]">
              <button
                onClick={handlePrev}
                className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center border-r border-[#D9D3C7] text-[#1D2927] hover:bg-[#1D2927] hover:text-[#F7F4ED] transition-colors"
                aria-label="Previous story"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="px-4 font-mono text-[10px] tracking-widest text-[#53605C]">
                {String(activeIdx + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
              </div>

              <button
                onClick={handleNext}
                className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center border-l border-[#D9D3C7] text-[#1D2927] hover:bg-[#1D2927] hover:text-[#F7F4ED] transition-colors"
                aria-label="Next story"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
