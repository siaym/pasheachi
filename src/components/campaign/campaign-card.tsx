"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Share2, Clock, CheckCircle2, Paperclip } from "lucide-react";
import { Campaign } from "@/types";
import { calculateProgress, formatCurrency } from "@/lib/utils";
import { PaperLift } from "@/components/ui/motion";
import { AvatarStack } from "@/components/shared/avatar-stack";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const [liked, setLiked] = useState(false);
  const progress = calculateProgress(campaign.raisedAmount, campaign.goalAmount || 0);

  return (
    <PaperLift className="group flex flex-col h-full bg-[#FAF8F3] border border-[#D9D3C7] p-3 sm:p-4 shadow-sm hover:shadow-paper transition-shadow duration-500 relative backdrop-paper">
      
      {/* Decorative Tape/Clip */}
      <div className="absolute -top-3 -right-2 z-20 text-[#8C7A5B] rotate-[15deg]">
        <Paperclip className="h-6 w-6 stroke-[1.5]" />
      </div>

      {/* Media Header (Paper Framed Image) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#1D2927] bg-[#EAE5DB] mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={campaign.coverImageUrl || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"}
          alt={campaign.title}
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[#A84D2A]/10 mix-blend-multiply pointer-events-none transition-opacity duration-700 group-hover:opacity-0"></div>

        {/* Category Overlay (Editorial Stamp) */}
        <div className="absolute left-0 top-0">
          <span className="editorial-stamp !text-[9px] bg-[#FAF8F3] text-[#A84D2A] border-b border-r border-[#1D2927] shadow-none">
            {campaign.category}
          </span>
        </div>

        {/* Action Overlay */}
        <div className="absolute right-2 top-2 flex flex-col gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setLiked(!liked);
            }}
            className="flex h-8 w-8 items-center justify-center border border-[#1D2927] bg-[#FAF8F3] text-[#1D2927] transition-all hover:bg-[#1D2927] hover:text-[#FAF8F3]"
            aria-label="Like campaign"
          >
            <Heart
              className={`h-3.5 w-3.5 transition-colors ${
                liked ? "fill-[#A84D2A] text-[#A84D2A]" : ""
              }`}
            />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center border border-[#1D2927] bg-[#FAF8F3] text-[#1D2927] transition-all hover:bg-[#1D2927] hover:text-[#FAF8F3]"
            aria-label="Share campaign"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col px-1">
        {/* Creator Info & Time Left */}
        <div className="mb-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#53605C]">
          <Link
            href={`/${campaign.creator.username}`}
            className="flex items-center gap-1 hover:text-[#A84D2A] transition-colors"
          >
            <span>{campaign.creator.username}</span>
            <CheckCircle2 className="h-3 w-3 text-[#A84D2A]" />
          </Link>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-[#8C7A5B]" />
            <span>Active</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/${campaign.creator.username}/${campaign.slug}`}>
          <h3 className="line-clamp-2 font-editorial text-2xl leading-tight text-[#1D2927] transition-colors group-hover:text-[#A84D2A] mb-4">
            {campaign.title}
          </h3>
        </Link>

        {/* Progress Section */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
            <span className="font-bold text-[#A84D2A]">{progress}% funded</span>
            <span className="text-[#53605C]">
              {formatCurrency(campaign.raisedAmount)}
            </span>
          </div>
          
          {/* Hand-drawn style progress bar */}
          <div className="h-1.5 w-full bg-[#EAE5DB] border border-[#D9D3C7] overflow-hidden relative mb-4">
            <div 
              className="absolute top-0 left-0 bottom-0 bg-[#1D2927] transition-all duration-1000 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="ink-rule-subtle mt-1 mb-4"></div>

        {/* Footer info: Supporters & Action */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AvatarStack count={campaign.transactions?.length || 0} />
          </div>

          <Link href={`/${campaign.creator.username}/${campaign.slug}`} className="flex-1">
            <button className="w-full h-10 border border-[#1D2927] bg-transparent text-[#1D2927] font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-[#1D2927] hover:text-[#F7F4ED] hover:shadow-ink active:scale-[0.98]">
              Support Dream
            </button>
          </Link>

        </div>
      </div>
    </PaperLift>
  );
}
