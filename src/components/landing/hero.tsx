"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Paperclip, MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { RevealText, FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";

export function Hero({ campaign }: { campaign?: any }) {
  const title = campaign?.title || "Rina's Mother Needs Cardiac Surgery";
  const location = campaign?.location || "Dhaka, Bangladesh";
  const image = campaign?.coverImageUrl || "https://images.unsplash.com/photo-1542810634-71277d95dc8c?auto=format&fit=crop&q=80";
  const goal = campaign?.goalAmount || 300000;
  const raised = campaign?.raisedAmount || 246000;
  const progress = Math.min(100, Math.round((raised / (goal || 1)) * 100));
  const cleanUsername = campaign?.creator?.username ? campaign.creator.username.replace(/^@/, "").toLowerCase() : "user";
  const targetHref = campaign ? `/${cleanUsername}/${campaign.slug || campaign.id}` : "/discover";

  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-32 overflow-hidden border-b border-[#D9D3C7]">
      <Container variant="wide" className="relative z-10">
        
        {/* Magazine Issue Stamp */}
        <FadeIn delay={0.1} className="mb-8 md:mb-12">
          <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#53605C]">
            VOL. 01 <span className="mx-4 text-[#D9D3C7]">/</span> A PLATFORM FOR HOPE
          </div>
        </FadeIn>

        {/* Broken Grid Layout */}
        <div className="relative flex flex-col lg:flex-row items-start justify-between min-h-[600px] gap-12 lg:gap-0">
          
          {/* Left Content - Typography */}
          <div className="lg:w-[55%] relative z-20 flex flex-col justify-center mt-12 lg:mt-24">
            <h1 className="font-editorial text-5xl sm:text-7xl lg:text-[7.5rem] leading-[0.95] text-[#1D2927]">
              <RevealText>Every dream</RevealText>
              <RevealText><span className="italic text-[#A84D2A]">deserves</span></RevealText>
              <RevealText>someone</RevealText>
              <RevealText>beside it.</RevealText>
            </h1>

            <FadeIn delay={0.4}>
              <p className="mt-8 max-w-md text-base sm:text-lg font-medium leading-relaxed text-[#53605C]">
                PasheAchi is a community where people come together to support real stories and real people.
              </p>
            </FadeIn>

            <FadeIn delay={0.6} className="mt-12 flex flex-col sm:flex-row items-center gap-6">
              <Link href="/discover" className="group flex items-center justify-center bg-[#A84D2A] text-[#F7F4ED] h-12 px-8 rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:bg-[#843B20] hover:shadow-paper-hover active:scale-95">
                Explore Stories
              </Link>
              <Link href="/create" className="group flex items-center justify-center bg-transparent border border-[#1D2927] text-[#1D2927] h-12 px-8 rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:bg-[#1D2927] hover:text-[#F7F4ED] active:scale-95">
                Start a Campaign
              </Link>
            </FadeIn>

            {/* Micro Social Proof */}
            <FadeIn delay={0.8} className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F7F4ED] bg-[#D9D3C7] overflow-hidden grayscale">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-[10px] sm:text-xs font-medium text-[#53605C] leading-tight">
                <span className="font-bold text-[#1D2927]">12,842+ people</span> are supporting dreams today<br/>
                Be the reason someone's dream comes true.
              </div>
            </FadeIn>
          </div>

          {/* Right Content - The Floating Editorial Card */}
          <div className="lg:w-[50%] lg:absolute lg:top-0 lg:right-0 z-30 w-full flex justify-center lg:justify-end lg:-translate-y-8 mt-12 lg:mt-0">
            <FadeIn delay={0.8} className="relative w-full max-w-[440px]">
              
              {/* Paper Clip (Decorative) */}
              <div className="absolute -top-4 right-24 z-40 text-[#8C7A5B] rotate-[15deg]">
                <Paperclip className="h-10 w-10 stroke-[1.5]" />
              </div>

              {/* The Physical Card Link */}
              <Link href={targetHref} className="block group">
                <PaperLift className="relative bg-[#FAF8F3] border border-[#D9D3C7] p-4 sm:p-6 shadow-paper rotate-[-2deg] group-hover:rotate-0 transition-all duration-700 backdrop-paper">
                  
                  {/* Vintage Verification Stamp */}
                  <div className="absolute -right-6 top-32 z-40 rotate-[12deg] opacity-80 pointer-events-none mix-blend-multiply">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-[#A84D2A] text-[#A84D2A]">
                      <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full border border-[#A84D2A]">
                        <CheckCircle2 className="h-5 w-5 mb-0.5" />
                        <span className="font-mono text-[7px] uppercase tracking-widest font-bold">Verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col h-full bg-[#F7F4ED] border border-[#EAE5DB]">
                    {/* Eyebrow */}
                    <div className="px-5 pt-5 pb-3">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8C7A5B]">
                        Featured Story
                      </span>
                      <h3 className="font-editorial text-2xl leading-tight text-[#1D2927] mt-2 mb-2 group-hover:text-[#A84D2A] transition-colors">
                        {title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#53605C] font-mono uppercase tracking-wider">
                        <MapPin className="h-3 w-3" /> {location}
                      </div>
                    </div>

                    {/* Photo escaping frame slightly via negative margin */}
                    <div className="relative mx-3 mb-2 aspect-[4/3] bg-[#D9D3C7] overflow-hidden border border-[#1D2927]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      />
                      <div className="absolute inset-0 bg-[#A84D2A]/10 mix-blend-multiply pointer-events-none"></div>
                    </div>

                    {/* Progress & Details */}
                    <div className="p-5">
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-bold text-sm text-[#1D2927]">{progress}% funded</span>
                        <span className="text-[10px] font-mono text-[#53605C]">Active</span>
                      </div>
                      {/* Progress bar */}
                      <div className="h-1.5 w-full bg-[#EAE5DB] border border-[#D9D3C7] overflow-hidden relative">
                        <div className="absolute top-0 left-0 bottom-0 bg-[#A84D2A]" style={{ width: `${progress}%` }}></div>
                      </div>
                      
                      <div className="mt-4 font-mono text-[11px] tracking-wide text-[#1D2927] border-t border-dashed border-[#D9D3C7] pt-4">
                        <span className="font-bold">{formatCurrency(raised)}</span> raised of {formatCurrency(goal)} goal
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex -space-x-1.5">
                           {[5, 6, 7].map((i) => (
                             <div key={i} className="w-6 h-6 rounded-full border border-[#F7F4ED] bg-[#D9D3C7] overflow-hidden grayscale">
                               {/* eslint-disable-next-line @next/next/no-img-element */}
                               <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="avatar" className="w-full h-full object-cover" />
                             </div>
                           ))}
                        </div>
                        <span className="text-[10px] font-mono text-[#53605C]">Community Supporters</span>
                      </div>
                    </div>
                  </div>

                  {/* Attached Note (Tape/Post-it style) */}
                  <div className="absolute -bottom-6 -right-4 w-40 bg-[#FAF8F3] border border-[#D9D3C7] p-3 shadow-sm rotate-[6deg] z-50">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#EAE5DB] opacity-70 rotate-[-2deg]"></div>
                    <div className="font-mono text-[8px] uppercase tracking-widest text-[#8C7A5B] mb-1">
                      Verified Campaign
                    </div>
                    <p className="text-[10px] leading-relaxed text-[#53605C] mb-2 font-medium">
                      Direct MFS & Bank support active.
                    </p>
                    <p className="font-script text-2xl text-[#A84D2A] -rotate-2">
                      Thank you! ♡
                    </p>
                  </div>

                </PaperLift>
              </Link>
            </FadeIn>
          </div>

        </div>
      </Container>
    </section>
  );
}


