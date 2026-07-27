import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Rss, PlusCircle, Megaphone } from "lucide-react";
import Link from "next/link";

export default async function DashboardUpdatesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await prisma.campaign.findMany({
    where: { creatorId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 pb-24">
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-6">
        <div>
          <h1 className="font-editorial text-4xl text-[#1D2927] mb-2">Campaign Updates</h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Post blog updates to keep your supporters informed.
          </p>
        </div>
      </FadeIn>

      <div className="space-y-6">
        {campaigns.length === 0 ? (
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-12 text-center flex flex-col items-center">
            <Rss className="h-12 w-12 text-[#8C7A5B] mb-4" />
            <h3 className="font-editorial text-2xl text-[#1D2927]">No Active Campaigns</h3>
            <p className="text-xs font-mono text-[#53605C] mt-2 mb-6">Create a campaign first to post story updates.</p>
            <Link href="/create" className="h-10 px-6 bg-[#1D2927] text-[#FAF8F3] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-ink">
              <PlusCircle className="h-4 w-4" /> Create Campaign
            </Link>
          </PaperLift>
        ) : (
          campaigns.map((c) => (
            <PaperLift key={c.id} className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A] mb-1 block">
                  {c.category}
                </span>
                <h3 className="font-editorial text-2xl text-[#1D2927]">{c.title}</h3>
                <p className="font-mono text-xs text-[#53605C] mt-1">Goal: ৳{c.goalAmount?.toLocaleString()} • Raised: ৳{c.raisedAmount.toLocaleString()}</p>
              </div>
              <Link
                href={`/dashboard/campaigns/${c.id}/story`}
                className="h-10 px-5 border border-[#1D2927] bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#FAF8F3] hover:text-[#1D2927] transition-all shadow-ink shrink-0"
              >
                <Rss className="h-4 w-4" /> Edit Narrative & Updates
              </Link>
            </PaperLift>
          ))
        )}
      </div>
    </div>
  );
}
