import { PaperLift } from "@/components/ui/motion";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatCurrency, calculateProgress } from "@/lib/utils";
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Share2, 
  Rss, 
  Heart,
  CheckCircle2,
  Clock
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CampaignOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { creator: true }
  });

  if (!campaign) {
    notFound();
  }

  // Calculate live verified aggregate sums directly from DB
  const [verifiedTxSum, verifiedSupportersCount, recentVerifiedTxs, approvedWithdrawalsSum] = await Promise.all([
    prisma.transaction.aggregate({
      where: { campaignId: id, status: "verified" },
      _sum: { amount: true }
    }),
    prisma.transaction.count({
      where: { campaignId: id, status: "verified" }
    }),
    prisma.transaction.findMany({
      where: { campaignId: id, status: "verified" },
      take: 5,
      orderBy: { date: "desc" }
    }),
    prisma.withdrawal.aggregate({
      where: { campaignId: id, status: "approved" },
      _sum: { amount: true }
    })
  ]);

  const liveRaised = verifiedTxSum._sum.amount ?? campaign.raisedAmount ?? 0;
  const approvedWithdrawals = approvedWithdrawalsSum._sum.amount ?? 0;
  const availableFunds = Math.max(0, liveRaised - approvedWithdrawals);

  const progress = calculateProgress(liveRaised, campaign.goalAmount || 0);

  return (
    <div className="space-y-8">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-[#A84D2A]" /> Total Raised
            </span>
            <div className="font-sans font-medium tracking-tight text-4xl text-[#1D2927] mb-1">
              {formatCurrency(liveRaised)}
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
              <span>{progress}% Funded</span>
              <span>Goal: {formatCurrency(campaign.goalAmount || 0)}</span>
            </div>
            <div className="h-1.5 w-full bg-[#EAE5DB] overflow-hidden rounded-full">
              <div 
                className="h-full bg-[#1D2927] transition-all duration-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </PaperLift>

        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" /> Verified Funds
            </span>
            <div className="font-sans font-medium tracking-tight text-4xl text-[#1D2927] mb-1">
              {formatCurrency(availableFunds)}
            </div>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-4 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> Available for withdrawal
          </p>
        </PaperLift>

        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <Users className="h-24 w-24" />
          </div>
          <div className="relative z-10">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-[#355C52]" /> Verified Supporters
            </span>
            <div className="font-sans font-medium tracking-tight text-4xl text-[#1D2927] mb-1">
              {verifiedSupportersCount}
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-4">
              Direct Community Backers
            </p>
          </div>
        </PaperLift>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recommended Actions */}
        <PaperLift className="bg-[#F7F4ED] border border-[#D9D3C7] p-6 shadow-sm">
          <h2 className="font-editorial text-2xl text-[#1D2927] border-b border-[#D9D3C7] pb-2 mb-6">
            Recommended Actions
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-[#D9D3C7]/50 pb-4">
              <div className="flex items-start gap-4">
                <Rss className="h-5 w-5 text-[#A84D2A] mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#1D2927]">Post an update</h4>
                  <p className="text-xs text-[#53605C] mt-0.5 max-w-sm">Keep your supporters informed about your progress. Campaigns with regular updates raise 3x more.</p>
                </div>
              </div>
              <Link 
                href={`/dashboard/campaigns/${id}/updates`}
                className="h-8 px-4 border border-[#1D2927] text-[#1D2927] font-bold text-[10px] uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors whitespace-nowrap flex items-center justify-center"
              >
                Write Update
              </Link>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <Share2 className="h-5 w-5 text-[#1D2927] mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#1D2927]">Share on Social Media</h4>
                  <p className="text-xs text-[#53605C] mt-0.5 max-w-sm">Share your campaign on Facebook or WhatsApp to reach a wider audience.</p>
                </div>
              </div>
              <Link
                href={`/${campaign.creator.username.toLowerCase()}/${campaign.slug}`}
                target="_blank"
                className="h-8 px-4 border border-[#1D2927] text-[#1D2927] font-bold text-[10px] uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors whitespace-nowrap flex items-center justify-center"
              >
                View & Share
              </Link>
            </div>
          </div>
        </PaperLift>

        {/* Live Recent Engagement Feed */}
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
          <h2 className="font-editorial text-2xl text-[#1D2927] border-b border-[#D9D3C7] pb-2 mb-6 flex items-center justify-between">
            <span>Recent Verified Engagement</span>
            <span className="font-mono text-xs font-normal text-[#53605C]">{recentVerifiedTxs.length} Live</span>
          </h2>
          
          {recentVerifiedTxs.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-[#53605C]">
              No verified transactions recorded yet.
            </div>
          ) : (
            <div className="space-y-4">
              {recentVerifiedTxs.map((tx: any) => {
                const diffInMinutes = Math.floor((new Date().getTime() - new Date(tx.date).getTime()) / 60000);
                const timeAgo = diffInMinutes < 60 ? `${diffInMinutes} mins ago` : `${Math.floor(diffInMinutes / 60)} hours ago`;
                const initials = tx.donorName ? tx.donorName.slice(0, 2).toUpperCase() : "AN";

                return (
                  <div key={tx.id} className="flex gap-4 border-b border-[#D9D3C7]/40 pb-3 last:border-0 last:pb-0">
                    <div className="h-9 w-9 rounded-full bg-[#EAE5DB] flex items-center justify-center border border-[#D9D3C7] shrink-0 text-xs font-bold text-[#1D2927]">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-[#1D2927]">
                          <span className="font-bold">{tx.donorName || "Anonymous Supporter"}</span> donated <span className="font-bold text-[#10B981]">{formatCurrency(tx.amount)}</span>
                        </p>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#8C7A5B] shrink-0">{timeAgo}</span>
                      </div>
                      {tx.note && (
                        <p className="text-xs text-[#53605C] mt-1 italic line-clamp-1">"{tx.note}"</p>
                      )}
                      <p className="font-mono text-[9px] text-[#10B981] mt-1 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Payment Verified via {tx.paymentMethod} ({tx.trxId})
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </PaperLift>
      </div>
    </div>
  );
}
