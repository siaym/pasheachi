"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { Avatar } from "@/components/ui/avatar";
import { MOCK_SUCCESS_STORIES } from "@/data/mock";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function SuccessStories() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = MOCK_SUCCESS_STORIES[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? MOCK_SUCCESS_STORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === MOCK_SUCCESS_STORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <Container variant="wide">
        <SectionHeader
          badge="Real Impact"
          title="Lives Changed & Dreams Realized"
          subtitle="Hear from real campaign owners who reached their goals with the support of the PasheAchi community."
          centered
        />

        <div className="mx-auto max-w-4xl mt-8">
          <div className="relative rounded-3xl border border-slate-100 bg-white p-8 sm:p-12 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <Quote className="h-12 w-12 text-[#10B981]/20 mb-6" />

            <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-slate-800 italic dark:text-slate-200 mb-8">
              "{current.quote}"
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <Avatar src={current.photoUrl} name={current.name} size="lg" />
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {current.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {current.location} • {current.campaignTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-left sm:text-right">
                  <div className="text-lg font-extrabold text-[#10B981]">
                    {formatCurrency(current.amountRaised)}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    {current.supportersCount} supporters
                  </div>
                </div>

                {/* Nav Arrows */}
                <div className="flex items-center gap-1.5 ml-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    aria-label="Previous story"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    aria-label="Next story"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {MOCK_SUCCESS_STORIES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  activeIdx === idx ? "w-8 bg-[#10B981]" : "w-2.5 bg-slate-300 dark:bg-slate-700"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
