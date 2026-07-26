import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { WorkspaceNav } from "./workspace-nav";

export default async function CampaignWorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Fetch campaign by ID
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { creator: true }
  });

  if (!campaign) {
    notFound();
  }

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
          
          <Link href={`/@${campaign.creator.username}/${campaign.slug}`} target="_blank" className="h-10 px-4 border border-[#1D2927] text-[#1D2927] font-bold text-xs uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors flex items-center gap-2 shrink-0">
            View Public Page <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </FadeIn>

      {/* Tabs Navigation (Client Component) */}
      <WorkspaceNav id={id} />

      {/* Workspace Content */}
      <FadeIn delay={0.2}>
        {children}
      </FadeIn>
    </div>
  );
}
