"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Share2, Clock } from "lucide-react";
import { Campaign } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AvatarStack } from "@/components/shared/avatar-stack";
import { calculateProgress, formatCurrency } from "@/lib/utils";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const [liked, setLiked] = useState(false);
  const progress = calculateProgress(campaign.raisedAmount, campaign.goalAmount);

  return (
    <Card className="group flex flex-col overflow-hidden">
      {/* Media Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EEE8DC]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Overlay */}
        <div className="absolute left-0 top-0 flex items-center gap-2">
          <Badge variant="primary" className="rounded-none border-0 bg-[#1D2927] px-3 py-1.5 shadow-none">
            {campaign.category.toUpperCase()}
          </Badge>
        </div>

        {/* Action Overlay (Heart & Share) */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            onClick={() => setLiked(!liked)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFDF8] text-[#1D2927] transition-transform active:scale-90"
            aria-label="Like campaign"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                liked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFDF8] text-[#1D2927] transition-transform active:scale-90"
            aria-label="Share campaign"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Creator Info & Time Left */}
        <div className="mb-3 flex items-center justify-between text-xs text-[#68726D]">
          <Link
            href={`/@${campaign.creator.username}`}
            className="flex items-center gap-1.5 font-medium hover:text-[#A84D2A] transition-colors"
          >
            <span>by @{campaign.creator.username}</span>
            {campaign.creator.verified && <Badge variant="verified" className="px-1 py-0 text-[9px]">✓</Badge>}
          </Link>
          <div className="flex items-center gap-1 font-semibold text-[#53605C]">
            <Clock className="h-3.5 w-3.5 text-[#355C52]" />
            <span>{campaign.daysLeft > 0 ? `${campaign.daysLeft}d left` : "Ended"}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/@${campaign.creator.username}/${campaign.slug}`}>
          <h3 className="line-clamp-2 text-2xl font-bold leading-[1.1] text-[#1D2927] transition-colors group-hover:text-[#A84D2A]">
            {campaign.title}
          </h3>
        </Link>

        {/* Progress Bar */}
        <div className="my-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#355C52]">{progress}% funded</span>
            <span className="text-[#68726D]">
              {formatCurrency(campaign.raisedAmount)} of {formatCurrency(campaign.goalAmount)}
            </span>
          </div>
          <Progress value={progress} size="md" />
        </div>

        {/* Footer info: Supporters & Action */}
        <div className="mt-auto pt-2 flex flex-col gap-4">
          <AvatarStack count={campaign.supportersCount} />

          <Link href={`/@${campaign.creator.username}/${campaign.slug}`} className="w-full">
            <Button size="md" variant="secondary" className="w-full font-bold">
              Support This Dream
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
