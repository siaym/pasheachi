"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MOCK_CAMPAIGNS } from "@/data/mock";

export default async function CampaignWorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pathname = usePathname();
  
  // In a real app, fetch campaign by ID
  const campaign = MOCK_CAMPAIGNS[0]; 

  const CAMPAIGN_TABS = [
    { name: "Overview", href: `/dashboard/campaigns/${id}` },
    { name: "Story", href: `/dashboard/campaigns/${id}/story` },
    { name: "Updates", href: `/dashboard/campaigns/${id}/updates` },
    { name: "Supporters", href: `/dashboard/campaigns/${id}/supporters` },
    { name: "Donations", href: `/dashboard/campaigns/${id}/donations` },
    { name: "Analytics", href: `/dashboard/campaigns/${id}/analytics` },
    { name: "Withdrawals", href: `/dashboard/campaigns/${id}/withdrawals` },
    { name: "Settings", href: `/dashboard/campaigns/${id}/settings` },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Workspace Header */}
      <FadeIn>
        <Link 
          href="/dashboard/campaigns"
          className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] hover:text-[#1D2927] transition-colors mb-6"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Campaigns
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center gap-1.5 border border-[#1D2927] px-2 py-0.5 text-[#1D2927] font-bold bg-[#EAE5DB] font-mono text-[9px] uppercase tracking-widest shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> Live
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                Workspace
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#1D2927] line-clamp-1">
              {campaign.title}
            </h1>
          </div>
          
          <button className="h-10 px-4 border border-[#1D2927] text-[#1D2927] font-bold text-xs uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors flex items-center gap-2 shrink-0">
            View Public Page <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </FadeIn>

      {/* Tabs Navigation (Paper Style) */}
      <FadeIn delay={0.1}>
        <div className="border-b border-[#D9D3C7] flex overflow-x-auto hide-scrollbar">
          {CAMPAIGN_TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  "px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors relative",
                  isActive
                    ? "text-[#1D2927]"
                    : "text-[#53605C] hover:text-[#1D2927] hover:bg-[#FAF8F3]"
                )}
              >
                {tab.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1D2927]" />
                )}
              </Link>
            );
          })}
        </div>
      </FadeIn>

      {/* Workspace Content */}
      <FadeIn delay={0.2}>
        {children}
      </FadeIn>
    </div>
  );
}
