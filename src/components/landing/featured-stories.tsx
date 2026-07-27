"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Campaign } from "@/types";
import { calculateProgress, formatCurrency } from "@/lib/utils";
import { FadeIn, RevealText, InkDivider, PaperLift } from "@/components/ui/motion";

export function FeaturedStories({ campaigns }: { campaigns: Campaign[] }) {
  const featured = campaigns.slice(0, 3);

  return (
    <section id="featured-stories" className="py-20 sm:py-32 bg-transparent border-b border-[#D9D3C7]">
      <Container variant="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <FadeIn>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#A84D2A] mb-6">
                <span className="h-px w-8 bg-[#A84D2A]"></span>
                <span className="font-mono">Featured Dreams</span>
              </div>
            </FadeIn>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-[#1D2927]">
              <RevealText>Real People.</RevealText>
              <RevealText><span className="italic text-[#8C7A5B] font-light">Real</span> Stories.</RevealText>
            </h2>
          </div>
          <FadeIn delay={0.2} className="max-w-md text-base leading-relaxed text-[#53605C] font-medium border-l border-[#D9D3C7] pl-6">
            Behind every campaign is a human story. Every contribution brings someone closer to a moment that changes everything.
          </FadeIn>
        </div>

        <InkDivider className="mb-8 hidden md:block opacity-30" />

        {featured.length === 0 ? (
          <div className="border border-[#1D2927] bg-[#FAF8F3] p-12 text-center shadow-paper space-y-6 max-w-xl mx-auto">
            <h3 className="font-editorial text-3xl text-[#1D2927]">Be the First to Share a Dream</h3>
            <p className="font-mono text-xs uppercase tracking-widest text-[#53605C] leading-relaxed">
              No campaigns have been published yet. Start your campaign today and let your community stand beside you.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center justify-center bg-[#A84D2A] text-[#F7F4ED] h-12 px-8 font-bold text-xs uppercase tracking-widest hover:bg-[#843B20] transition-colors shadow-ink"
            >
              Start a Campaign
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#D9D3C7] bg-[#F7F4ED]/80 backdrop-blur-md shadow-paper">
            {featured.map((campaign, index) => {

            const progress = calculateProgress(campaign.raisedAmount, campaign.goalAmount || 0);
            return (
              <FadeIn
                key={campaign.id}
                delay={0.1 * index}
                className={`group flex flex-col p-8 sm:p-10 ${index !== featured.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#D9D3C7]' : ''}`}
              >
                {/* Media Container */}
                <PaperLift className="relative aspect-[4/3] w-full overflow-hidden border border-[#1D2927] p-1 bg-[#FAF8F3]">
                  <div className="relative h-full w-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={campaign.coverImageUrl || "/placeholder.jpg"}
                      alt={campaign.title}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#8C7A5B]/20 mix-blend-multiply pointer-events-none transition-opacity group-hover:opacity-0"></div>
                  </div>
                  {/* Category Stamp */}
                  <div className="absolute top-4 left-4 bg-[#F7F4ED] border border-[#1D2927] px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-[#1D2927]">
                    {campaign.category}
                  </div>
                </PaperLift>

                {/* Creator Info */}
                <div className="mt-8 flex items-center justify-between border-b border-[#D9D3C7] pb-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#1D2927]">
                      {campaign.creator.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#53605C] mt-1">
                      @{campaign.creator.username}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#8C7A5B]">
                      Time Left
                    </div>
                    <div className="text-xs font-bold text-[#1D2927] mt-1">
                      Active
                    </div>
                  </div>
                </div>

                {/* Story Title & Description */}
                <div className="py-6 flex-1">
                  <Link href={`/${campaign.creator.username}/${campaign.slug}`}>
                    <h3 className="font-editorial text-2xl font-medium leading-snug text-[#1D2927] transition-colors group-hover:text-[#A84D2A]">
                      {campaign.title}
                    </h3>
                  </Link>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#53605C]">
                    {campaign.description}
                  </p>
                </div>

                {/* Progress Bar & Amount */}
                <div className="pt-6 border-t border-[#D9D3C7]">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="font-mono text-lg font-medium text-[#1D2927]">
                        {formatCurrency(campaign.raisedAmount)}
                      </p>
                      <p className="text-[10px] font-bold tracking-widest text-[#53605C] mt-1 uppercase">
                        Raised of {formatCurrency(campaign.goalAmount || 0)}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#A84D2A]">{progress}%</span>
                  </div>
                  {/* Custom Sharp Progress Bar */}
                  <div className="h-1.5 w-full bg-[#EAE5DB] border border-[#D9D3C7] overflow-hidden">
                    <div 
                      className="h-full bg-[#1D2927] transition-all duration-1000 origin-left"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Link */}
                <div className="mt-8">
                  <Link
                    href={`/${campaign.creator.username}/${campaign.slug}`}
                    className="inline-flex items-center justify-between w-full h-12 px-6 border border-[#1D2927] text-xs font-bold uppercase tracking-widest text-[#1D2927] hover:bg-[#1D2927] hover:text-[#F7F4ED] transition-colors"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </div>
        )}
      </Container>

    </section>
  );
}


