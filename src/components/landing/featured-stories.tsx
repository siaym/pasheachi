"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MOCK_CAMPAIGNS } from "@/data/mock";
import { calculateProgress, formatCurrency } from "@/lib/utils";

export function FeaturedStories() {
  const featured = MOCK_CAMPAIGNS.slice(0, 3);

  return (
    <section id="featured-stories" className="py-16 sm:py-24 bg-[#F7F4ED] dark:bg-[#121A19]">
      <Container variant="wide">
        <SectionHeader
          badge="Real People • Real Stories"
          title="Featured Stories in Progress"
          subtitle="Behind every campaign is a human story. Every contribution brings someone closer to their dream."
          centered
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((campaign) => {
            const progress = calculateProgress(campaign.raisedAmount, campaign.goalAmount);
            return (
              <div
                key={campaign.id}
                className="paper-card flex flex-col overflow-hidden group p-6 space-y-5"
              >
                {/* Media Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary">{campaign.category.toUpperCase()}</Badge>
                  </div>
                </div>

                {/* Creator Header */}
                <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={campaign.creator.avatarUrl}
                      name={campaign.creator.name}
                      size="sm"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#1D2927] dark:text-[#F7F4ED]">
                        {campaign.creator.name}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-[#355C52]" />
                        <span>@{campaign.creator.username}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                    <Clock className="h-3.5 w-3.5 text-[#A84D2A]" />
                    <span>{campaign.daysLeft}d left</span>
                  </div>
                </div>

                {/* Story Title & Description */}
                <div className="space-y-2 flex-1">
                  <Link href={`/@${campaign.creator.username}/${campaign.slug}`}>
                    <h3 className="text-lg font-bold leading-snug text-[#1D2927] transition-colors group-hover:text-[#A84D2A] dark:text-white">
                      {campaign.title}
                    </h3>
                  </Link>
                  <p className="line-clamp-2 text-xs leading-relaxed text-[#53605C] dark:text-slate-400">
                    {campaign.description}
                  </p>
                </div>

                {/* Progress Bar & Amount */}
                <div className="space-y-2 pt-2 border-t border-[#D9D3C7] dark:border-slate-800">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#355C52]">{progress}% funded</span>
                    <span className="text-[#1D2927] dark:text-white">
                      {formatCurrency(campaign.raisedAmount)} of {formatCurrency(campaign.goalAmount)}
                    </span>
                  </div>
                  <Progress value={progress} size="md" />
                </div>

                {/* Action Link */}
                <div className="pt-1">
                  <Link
                    href={`/@${campaign.creator.username}/${campaign.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-[#A84D2A] hover:text-[#843B20] transition-colors"
                  >
                    <span className="ink-underline">Read Full Story & Support</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
