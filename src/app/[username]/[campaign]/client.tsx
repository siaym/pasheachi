"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PaymentModal } from "@/components/campaign/payment-modal";
import { PRESET_AMOUNTS } from "@/lib/constants";
import { formatCurrency, calculateProgress } from "@/lib/utils";
import { FadeIn, RevealText, PaperLift, InkDivider } from "@/components/ui/motion";
import {
  Heart,
  Share2,
  Clock,
  CheckCircle2,
  FileText,
  MessageSquare,
  ArrowLeft,
  ShieldCheck,
  Paperclip,
  MapPin,
} from "lucide-react";

export function CampaignDetailClient({
  campaign,
  creator,
  supportMessages = [],
}: {
  campaign: any;
  creator: any;
  supportMessages?: any[];
}) {
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [liked, setLiked] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const progress = calculateProgress(campaign.raisedAmount, campaign.goalAmount);

  return (
    <div className="min-h-screen pt-32 pb-20 sm:pb-32 relative">
      <Container variant="wide" className="relative z-10">
        <FadeIn className="flex items-center justify-between border-b border-[#D9D3C7] pb-4 mb-8 sm:mb-12">
          <Link
            href={`/${creator.username}`}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#53605C] hover:text-[#A84D2A] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span className="ink-underline">Back to {creator.name}</span>
          </Link>
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B]">
            Case File № {campaign.id.replace('camp-', '00').slice(0, 8)}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="editorial-stamp bg-[#F7F4ED] border-[#A84D2A] text-[#A84D2A]">
                  {campaign.category}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-[#53605C] font-mono uppercase tracking-wider">
                  <MapPin className="h-3 w-3" /> {campaign.location || "Dhaka, BD"}
                </div>
              </div>
              
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-[#1D2927]">
                <RevealText>{campaign.title}</RevealText>
              </h1>

              <FadeIn delay={0.2} className="flex flex-wrap items-center gap-6 pt-4 border-t border-dashed border-[#D9D3C7]">
                <Link
                  href={`/${creator.username}`}
                  className="group flex items-center gap-3 text-[#1D2927]"
                >
                  <div className="w-10 h-10 rounded-full border border-[#D9D3C7] overflow-hidden bg-[#EAE5DB] grayscale group-hover:grayscale-0 transition-all">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={creator.avatarUrl || "https://i.pravatar.cc/300"} alt={creator.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm">{creator.name}</span>
                      {creator.verified && <CheckCircle2 className="h-3 w-3 text-[#A84D2A]" />}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#53605C]">
                      Campaign Organizer
                    </div>
                  </div>
                </Link>

                <div className="h-8 w-px bg-[#D9D3C7] hidden sm:block"></div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#8C7A5B]" />
                  <div>
                    <div className="font-bold text-sm text-[#1D2927]">
                      30 days
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#53605C]">
                      Remaining
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.4} className="relative mt-8">
              <div className="absolute -top-3 -left-3 z-20 text-[#8C7A5B] rotate-[-15deg]">
                <Paperclip className="h-8 w-8 stroke-[1.5]" />
              </div>
              <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-3 sm:p-4 shadow-sm rotate-[1deg]">
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#1D2927] grayscale hover:grayscale-0 transition-all duration-1000">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={campaign.coverImageUrl || "/placeholder.jpg"}
                    alt={campaign.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#A84D2A]/10 mix-blend-multiply pointer-events-none"></div>
                </div>
                <div className="mt-3 text-[10px] font-mono uppercase tracking-widest text-[#53605C] text-right">
                  Fig 1. Primary Documentation
                </div>
              </div>
            </FadeIn>

            <InkDivider />

            <FadeIn className="space-y-6">
              <h2 className="font-editorial text-3xl font-medium text-[#1D2927]">
                The Story
              </h2>
              <div className="prose prose-stone max-w-none text-base sm:text-lg leading-relaxed text-[#53605C]">
                {(campaign.description || campaign.story || "").split('\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </FadeIn>


            <InkDivider />

            {/* Missing Milestones logic for now as it's not in our basic Prisma model */}

            <FadeIn className="space-y-6">
              <h3 className="font-editorial text-2xl font-medium text-[#1D2927] flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-[#A84D2A]" />
                Community Support
              </h3>

              <div className="space-y-4">
                {supportMessages.length > 0 ? (
                  supportMessages.map((msg, idx) => {
                    const dateObj = new Date(msg.date);
                    const diffInHours = Math.floor((new Date().getTime() - dateObj.getTime()) / 3600000);
                    const timeString = diffInHours < 24 ? (diffInHours === 0 ? 'Just now' : `${diffInHours} hours ago`) : dateObj.toLocaleDateString();

                    return (
                      <div key={idx} className="p-5 border border-[#D9D3C7] bg-[#FAF8F3] relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#EAE5DB]"></div>
                        <div className="flex items-center justify-between mb-3 pl-2">
                          <div className="flex items-center gap-3">
                            <div className="font-bold text-sm text-[#1D2927]">{msg.donorName}</div>
                            <span className="editorial-stamp !text-[8px]">Supporter</span>
                          </div>
                          <span className="font-mono text-[10px] uppercase text-[#53605C]">{timeString}</span>
                        </div>
                        <p className="text-[#1D2927] italic font-editorial text-lg pl-2">
                          "{msg.message}"
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-5 border border-dashed border-[#D9D3C7] bg-[#F7F4ED] text-center">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">No messages yet. Be the first to show support!</p>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-28 z-40">
              <FadeIn delay={0.3}>
                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 sm:p-8 shadow-paper backdrop-paper">
                  <div className="mb-8">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-mono text-4xl font-medium text-[#1D2927]">
                        {formatCurrency(campaign.raisedAmount)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-end mb-3">
                      <span className="font-bold text-sm text-[#A84D2A]">{progress}% funded</span>
                      <span className="text-xs font-mono text-[#53605C]">
                        Goal: {formatCurrency(campaign.goalAmount || 0)}
                      </span>
                    </div>

                    {campaign.campaignType === "fixed" && (
                      <div className="mb-4 bg-[#EAE5DB]/50 border border-[#D9D3C7] p-3 text-center">
                        <div className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1">Fixed Contribution Required</div>
                        <div className="font-editorial text-2xl text-[#1D2927]">
                          {formatCurrency(campaign.fixedAmount || 0)} <span className="text-xs font-mono text-[#53605C] font-normal tracking-widest uppercase">/ person</span>
                        </div>
                      </div>
                    )}

                    <div className="h-2 w-full bg-[#EAE5DB] border border-[#D9D3C7] overflow-hidden relative mb-4">
                      <div 
                        className="absolute top-0 left-0 bottom-0 bg-[#1D2927] transition-all duration-1000 ease-out" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                      <span className="w-2 h-2 rounded-full bg-[#1D2927]"></span>
                      {campaign.transactions?.length || 0} Supporters have joined
                    </div>
                  </div>

                  <div className="ink-rule-subtle mb-6"></div>

                  {campaign.campaignType === "fixed" ? (
                    <div className="space-y-4">
                       <label className="block text-xs font-bold uppercase tracking-widest text-[#1D2927]">
                        Fixed Amount (৳)
                      </label>
                      <div className="h-12 w-full border border-[#D9D3C7] bg-[#EAE5DB] px-4 flex items-center font-mono text-sm text-[#53605C] cursor-not-allowed">
                        {campaign.fixedAmount || 0}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#1D2927]">
                        Select Support Amount (৳)
                      </label>

                      <div className="grid grid-cols-5 gap-2">
                        {PRESET_AMOUNTS.map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(amt);
                              setCustomAmount("");
                            }}
                            className={`h-12 border transition-all font-mono text-sm ${
                              selectedAmount === amt && !customAmount
                                ? "border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] shadow-ink scale-[0.98]"
                                : "border-[#D9D3C7] bg-transparent text-[#1D2927] hover:border-[#1D2927] hover:bg-[#EAE5DB]"
                            }`}
                          >
                            {amt}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[#53605C]">৳</span>
                        <input
                          type="number"
                          placeholder="Custom amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedAmount(Number(e.target.value) || 0);
                          }}
                          className="h-12 w-full border border-[#D9D3C7] bg-[#F7F4ED] pl-8 pr-4 font-mono text-sm text-[#1D2927] placeholder:text-[#8C7A5B] focus:border-[#1D2927] focus:outline-none focus:ring-1 focus:ring-[#1D2927] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setIsPaymentOpen(true)}
                    className="w-full mt-6 h-14 bg-[#A84D2A] text-[#F7F4ED] font-bold text-sm uppercase tracking-widest transition-all hover:bg-[#843B20] hover:shadow-paper-hover active:scale-[0.98] relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Heart className="h-4 w-4" />
                      Support {formatCurrency(campaign.campaignType === "fixed" ? (campaign.fixedAmount || 0) : (selectedAmount || 250))}
                    </span>
                    <div className="absolute inset-0 bg-[#1D2927] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                  </button>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`flex-1 h-10 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border transition-all ${
                        liked ? "border-[#A84D2A] text-[#A84D2A]" : "border-[#D9D3C7] text-[#1D2927] hover:border-[#1D2927]"
                      }`}
                    >
                      <Heart className={`h-3 w-3 ${liked ? "fill-[#A84D2A]" : ""}`} />
                      {liked ? "Saved" : "Save"}
                    </button>
                    <button className="flex-1 h-10 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border border-[#D9D3C7] text-[#1D2927] hover:border-[#1D2927] transition-all">
                      <Share2 className="h-3 w-3" />
                      Share
                    </button>
                  </div>

                  <div className="mt-8 p-4 border-2 border-dashed border-[#D9D3C7] flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-[#1D2927]" />
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#53605C] leading-relaxed">
                      <strong className="text-[#1D2927]">Secure Transfer</strong><br/>
                      Verified manual processing via bKash, Nagad, Rocket or direct Bank Transfer.
                    </p>
                  </div>

                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#EAE5DB] opacity-70 rotate-[2deg] z-50"></div>
                </PaperLift>
              </FadeIn>
            </div>
          </div>
        </div>
      </Container>

      <PaymentModal
        campaign={campaign}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      />
    </div>
  );
}
