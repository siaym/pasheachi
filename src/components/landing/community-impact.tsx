"use client";

import { Container } from "@/components/layout/container";
import { MOCK_STATS } from "@/data/mock";
import { Heart, ShieldCheck, Users, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { FadeIn, RevealText } from "@/components/ui/motion";

export function CommunityImpact() {
  const stats = [
    {
      label: "Total Support Raised",
      value: formatCurrency(MOCK_STATS.totalRaised),
      subtitle: "Direct financial support transferred",
      icon: Heart,
    },
    {
      label: "Generous Supporters",
      value: MOCK_STATS.totalSupporters.toLocaleString(),
      subtitle: "Neighbors, friends, and strangers",
      icon: Users,
    },
    {
      label: "Dreams Supported",
      value: MOCK_STATS.totalCampaigns.toLocaleString(),
      subtitle: "Medical, tuition, and community",
      icon: Sparkles,
    },
    {
      label: "Verified Security",
      value: `${MOCK_STATS.successRate}%`,
      subtitle: "Manual MFS transaction audit",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="impact" className="py-24 sm:py-32 bg-transparent text-[#1D2927]">
      <Container variant="wide">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#A84D2A] mb-8">
              <span className="h-px w-8 bg-[#A84D2A]"></span>
              <span className="font-mono">Platform Impact</span>
              <span className="h-px w-8 bg-[#A84D2A]"></span>
            </div>
          </FadeIn>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1D2927]">
            <RevealText>When a Community</RevealText>
            <RevealText><span className="italic text-[#8C7A5B] font-light">Comes Together</span></RevealText>
          </h2>
          <FadeIn delay={0.3}>
            <p className="mt-8 text-lg text-[#53605C] max-w-xl mx-auto font-medium">
              Numbers are not just metrics—they represent real Bangladeshi lives transformed by human generosity.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D9D3C7] border border-[#D9D3C7] shadow-paper">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <FadeIn
                key={idx}
                delay={0.1 * idx}
                className="bg-[#FAF7F0] p-10 flex flex-col items-center text-center group hover:bg-[#F7F4ED] transition-colors"
              >
                <div className="flex h-16 w-16 items-center justify-center border border-[#1D2927] text-[#1D2927] mb-8 group-hover:bg-[#1D2927] group-hover:text-[#F7F4ED] transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-medium text-[#1D2927] mb-3">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#A84D2A] mb-4">
                  {stat.label}
                </div>
                <p className="text-xs text-[#53605C] pt-6 border-t border-[#D9D3C7] w-full font-medium">
                  {stat.subtitle}
                </p>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

