"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { FadeIn, RevealText, PaperLift } from "@/components/ui/motion";
import {
  MapPin,
  Globe,
  Share2,
  QrCode,
  Trophy,
  Heart,
  Calendar,
  CheckCircle2,
  Paperclip,
} from "lucide-react";
import { User, Campaign } from "@/types";

import { formatCurrency, formatCompactNumber } from "@/lib/utils";
import { Check } from "lucide-react";

export function UserProfileClient({
  user,
  userCampaigns,
}: {
  user: User;
  userCampaigns: Campaign[];
}) {
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "achievements" | "about">("active");
  const [copied, setCopied] = useState(false);

  const activeCampaigns = userCampaigns.filter((c) => c.status === "active");
  const completedCampaigns = userCampaigns.filter((c) => c.status === "completed");
  const pinnedCampaign = userCampaigns.find((c) => c.isPinned);

  const totalRaised = userCampaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0);
  const totalSupporters = userCampaigns.reduce((sum, c) => sum + (c.transactions?.length || 0), 0);
  const joinedYear = user.createdAt ? new Date(user.createdAt).getFullYear() : 2026;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/${user.username}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };


  return (
    <div className="min-h-screen pb-20 pt-20">
      {/* Dossier Banner Image */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b-2 border-[#1D2927]">
        <div className="absolute inset-0 bg-[#D9D3C7] z-0"></div>
        {user.coverUrl && (
          <div className="absolute inset-0 z-10 grayscale opacity-80 mix-blend-multiply">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.coverUrl}
              alt={`${user.name} cover`}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 z-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute -bottom-4 right-1/4 w-32 h-8 bg-[#EAE5DB] opacity-80 rotate-[-2deg] z-30 shadow-sm border border-[#D9D3C7]/50"></div>
      </div>

      <Container variant="wide" className="relative z-40">
        <div className="relative -mt-20 sm:-mt-24 mb-12 flex flex-col sm:flex-row items-start justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-8">
            <PaperLift className="relative w-40 h-40 sm:w-48 sm:h-48 bg-[#FAF8F3] border-2 border-[#D9D3C7] p-2 sm:p-3 shadow-paper rotate-[-2deg] shrink-0">
              <div className="absolute -top-3 -left-2 z-50 text-[#8C7A5B] rotate-[-15deg]">
                <Paperclip className="h-8 w-8 stroke-[1.5]" />
              </div>
              <div className="w-full h-full relative overflow-hidden border border-[#1D2927] grayscale transition-all duration-700 hover:grayscale-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatarUrl || "https://i.pravatar.cc/300"}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#A84D2A]/10 mix-blend-multiply pointer-events-none"></div>
              </div>
            </PaperLift>

            <div className="space-y-3 pt-4 sm:pt-0 sm:pb-4">
              <FadeIn>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-editorial text-4xl sm:text-5xl font-medium leading-[1.1] text-[#1D2927]">
                    {user.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#355C52] bg-[#E5EEE8] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#355C52]">
                    <CheckCircle2 className="h-3 w-3" /> Verified Creator
                  </span>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.1}>
                <div className="font-mono text-xs uppercase tracking-widest text-[#53605C] flex flex-wrap gap-4 items-center">
                  <span className="font-bold text-[#A84D2A]">@{user.username}</span>
                  <span className="w-1 h-1 rounded-full bg-[#D9D3C7]"></span>
                  <span>Joined {joinedYear}</span>
                  {user.location && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#D9D3C7]"></span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {user.location}</span>
                    </>
                  )}
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="pt-2">
                <div className="flex flex-wrap gap-6 sm:gap-8 font-mono text-[10px] uppercase tracking-widest text-[#53605C] border-t border-dashed border-[#D9D3C7] pt-3">
                  <div>
                    <span className="font-bold text-[#1D2927] text-base block">{formatCurrency(totalRaised)}</span>
                    <span className="text-[#8C7A5B]">Total Raised</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#A84D2A] text-base block">{formatCompactNumber(totalSupporters)}</span>
                    <span className="text-[#8C7A5B]">Supporters</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#355C52] text-base block">{activeCampaigns.length}</span>
                    <span className="text-[#8C7A5B]">Active</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#1D2927] text-base block">{completedCampaigns.length}</span>
                    <span className="text-[#8C7A5B]">Completed</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto sm:self-end sm:pb-4">
            {activeCampaigns.length > 0 && (
              <a
                href={`/${user.username}/${activeCampaigns[0].slug}`}
                className="h-10 px-6 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#FAF8F3] hover:text-[#1D2927] transition-all shadow-ink active:scale-[0.98]"
              >
                <Heart className="h-3 w-3" /> Support Cause
              </a>
            )}

            <button
              onClick={handleShare}
              className="h-10 px-4 border border-[#D9D3C7] bg-transparent text-[#1D2927] font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:border-[#1D2927] hover:bg-[#EAE5DB] transition-all active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-[#355C52]" /> Copied Link
                </>
              ) : (
                <>
                  <Share2 className="h-3 w-3" /> Share Profile
                </>
              )}
            </button>
          </div>
        </div>


        <div className="flex items-end gap-1 sm:gap-2 border-b-2 border-[#1D2927] pt-8">
          {[
            { id: "active", label: `Active (${activeCampaigns.length})` },
            { id: "completed", label: `Completed (${completedCampaigns.length})` },
            { id: "achievements", label: "Records" },
            { id: "about", label: "Dossier" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-4 sm:px-6 pt-3 pb-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-all
                border-t-2 border-x-2 rounded-t-sm
                ${activeTab === tab.id 
                  ? "border-[#1D2927] bg-[#F7F4ED] text-[#1D2927] z-10 top-[2px]" 
                  : "border-[#D9D3C7] bg-[#EAE5DB] text-[#8C7A5B] hover:bg-[#FAF8F3] hover:text-[#1D2927]"
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute -bottom-[4px] left-0 right-0 h-[4px] bg-[#F7F4ED]"></div>
              )}
            </button>
          ))}
        </div>

        <div className="pt-10 pb-12">
          <FadeIn>
            {activeTab === "active" && pinnedCampaign && (
              <div className="mb-12 border-b border-dashed border-[#D9D3C7] pb-12">
                <div className="mb-4 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A84D2A]"></span> Priority File
                </div>
                <div className="max-w-2xl">
                  <CampaignCard campaign={pinnedCampaign as any} />
                </div>
              </div>
            )}

            {activeTab === "active" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeCampaigns.map((c) => (
                  <div key={c.id} className="h-full">
                    <CampaignCard campaign={c as any} />
                  </div>
                ))}
                {activeCampaigns.length === 0 && (
                  <div className="col-span-full py-16 text-center font-mono text-sm uppercase tracking-widest text-[#8C7A5B]">
                    No active files at the moment.
                  </div>
                )}
              </div>
            )}

            {activeTab === "completed" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedCampaigns.map((c) => (
                  <div key={c.id} className="h-full opacity-80 hover:opacity-100 transition-opacity">
                    <CampaignCard campaign={c as any} />
                  </div>
                ))}
                {completedCampaigns.length === 0 && (
                  <div className="col-span-full py-16 text-center font-mono text-sm uppercase tracking-widest text-[#8C7A5B]">
                    No completed records found.
                  </div>
                )}
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: Trophy, title: "First Campaign", desc: "Launched first cause", color: "text-[#8C7A5B]" },
                  { icon: Heart, title: "100+ Supporters", desc: "Backed by 100 donors", color: "text-[#A84D2A]" },
                  { icon: Calendar, title: "Verified Identity", desc: "NID & Background checked", color: "text-[#1D2927]" }
                ].map((cert, idx) => (
                  <PaperLift key={idx} className="flex flex-col items-center text-center p-8 bg-[#FAF8F3] border border-[#D9D3C7] shadow-sm">
                    <div className="flex h-16 w-16 items-center justify-center border-2 border-dashed border-[#D9D3C7] rounded-full mb-6">
                      <cert.icon className={`h-8 w-8 ${cert.color}`} />
                    </div>
                    <h4 className="font-editorial text-2xl text-[#1D2927] mb-2">{cert.title}</h4>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">{cert.desc}</p>
                    <div className="mt-8 border-t border-[#D9D3C7] pt-4 w-full text-center">
                      <span className="font-script text-xl text-[#A84D2A] -rotate-2 inline-block">Official</span>
                    </div>
                  </PaperLift>
                ))}
              </div>
            )}

            {activeTab === "about" && (
              <PaperLift className="max-w-3xl mx-auto bg-[#FAF8F3] border border-[#D9D3C7] p-8 sm:p-12 shadow-paper relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#EAE5DB] opacity-70 rotate-[-1deg] z-10"></div>
                
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#53605C] text-right mb-12">
                  Document ID: USR-{user.id.toUpperCase()}<br/>
                  Dated: {new Date().toLocaleDateString('en-GB')}
                </div>

                <h3 className="font-editorial text-4xl text-[#1D2927] mb-8">
                  Background Dossier
                </h3>

                <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-[#1D2927] leading-relaxed">
                  {user.bio ? (
                    <div className="whitespace-pre-line">{user.bio}</div>
                  ) : (
                    <p className="italic text-[#53605C]">No background information has been provided for this creator yet.</p>
                  )}
                </div>

                <div className="mt-16 text-right">
                  <div className="w-48 border-b border-[#1D2927] ml-auto mb-2"></div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B]">Authorized Signature</span>
                </div>
              </PaperLift>
            )}
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
