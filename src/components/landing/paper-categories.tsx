"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CATEGORIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { FadeIn, RevealText, PaperLift } from "@/components/ui/motion";
import * as Icons from "lucide-react";

export function PaperCategories() {
  return (
    <section id="categories" className="py-24 sm:py-32 bg-[#F7F4ED] border-b border-[#D9D3C7]">
      <Container variant="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <FadeIn>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#A84D2A] mb-6">
                <span className="h-px w-8 bg-[#A84D2A]"></span>
                <span className="font-mono">Explore Dreams</span>
              </div>
            </FadeIn>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-[#1D2927]">
              <RevealText>Find a cause that</RevealText>
              <RevealText><span className="italic text-[#8C7A5B] font-light">speaks to you.</span></RevealText>
            </h2>
          </div>
          <FadeIn delay={0.2} className="shrink-0">
            <Link href="/discover" className="inline-flex h-12 items-center justify-center border border-[#1D2927] px-6 text-xs font-bold uppercase tracking-widest text-[#1D2927] hover:bg-[#1D2927] hover:text-[#F7F4ED] transition-colors rounded-none">
              View All Causes
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.slice(0, 12).map((category, index) => {
            // Map the string iconName to the actual component from lucide-react
            const Icon = (Icons as any)[category.iconName] || Icons.HelpCircle;
            // Alternating rotation for a messy desk/collage look
            const rotation = index % 2 === 0 ? "rotate-1 hover:rotate-0" : "-rotate-1 hover:rotate-0";
            
            return (
              <FadeIn key={category.slug} delay={0.05 * index}>
                <Link href={`/discover?category=${category.slug}`} className="block h-full group perspective-1000">
                  <PaperLift className={`h-full flex flex-col items-center text-center p-6 sm:p-8 bg-[#FAF7F0] border border-[#D9D3C7] shadow-sm transition-all duration-500 ${rotation} group-hover:border-[#A84D2A] group-hover:shadow-paper group-hover:bg-[#F7F4ED] group-hover:-translate-y-2 group-hover:z-10 relative`}>
                    <div className="h-12 w-12 rounded-full border border-[#D9D3C7] flex items-center justify-center bg-[#F7F4ED] text-[#1D2927] group-hover:bg-[#A84D2A] group-hover:text-[#F7F4ED] group-hover:border-[#A84D2A] transition-colors mb-6 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-editorial text-lg font-medium text-[#1D2927] group-hover:text-[#A84D2A] transition-colors">
                      {category.name}
                    </h3>
                    <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-4 w-4 text-[#A84D2A]" />
                    </div>
                  </PaperLift>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
