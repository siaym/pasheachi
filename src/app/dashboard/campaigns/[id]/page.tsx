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
  AlertCircle 
} from "lucide-react";

export default async function CampaignOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { transactions: true }
  });

  if (!campaign) {
    notFound();
  }
  const progress = calculateProgress(campaign.raisedAmount, campaign.goalAmount || 0);

  return (
    <div className="space-y-8">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5" /> Total Raised
            </span>
            <div className="font-editorial text-4xl text-[#1D2927] mb-1">
              {formatCurrency(campaign.raisedAmount)}
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
              <span>{progress}% Funded</span>
              <span>Goal: {formatCurrency(campaign.goalAmount || 0)}</span>
            </div>
            <div className="h-1.5 w-full bg-[#EAE5DB] overflow-hidden">
              <div 
                className="h-full bg-[#1D2927]" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </PaperLift>

        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified Funds
            </span>
            <div className="font-editorial text-4xl text-[#1D2927] mb-1">
              {formatCurrency(campaign.raisedAmount * 0.9)} {/* Mock calculation */}
            </div>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-4">
            Available for withdrawal
          </p>
        </PaperLift>

        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <Users className="h-24 w-24" />
          </div>
          <div className="relative z-10">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block flex items-center gap-2">
              <Users className="h-3.5 w-3.5" /> Supporters
            </span>
            <div className="font-editorial text-4xl text-[#1D2927] mb-1">
              {campaign.transactions?.length || 0}
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-4">
              +12 this week
            </p>
          </div>
        </PaperLift>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              <button className="h-8 px-4 border border-[#1D2927] text-[#1D2927] font-bold text-[10px] uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors whitespace-nowrap">
                Write Update
              </button>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <Share2 className="h-5 w-5 text-[#1D2927] mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#1D2927]">Share on Social Media</h4>
                  <p className="text-xs text-[#53605C] mt-0.5 max-w-sm">Share your campaign on Facebook or WhatsApp to reach a wider audience.</p>
                </div>
              </div>
              <button className="h-8 px-4 border border-[#1D2927] text-[#1D2927] font-bold text-[10px] uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors whitespace-nowrap">
                Share Now
              </button>
            </div>
          </div>
        </PaperLift>

        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
          <h2 className="font-editorial text-2xl text-[#1D2927] border-b border-[#D9D3C7] pb-2 mb-6">
            Recent Engagement
          </h2>
          <div className="space-y-6">
            {/* Mock feed */}
            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-[#EAE5DB] flex items-center justify-center border border-[#D9D3C7] shrink-0 text-xs font-bold text-[#1D2927]">
                AA
              </div>
              <div>
                <p className="text-sm text-[#1D2927]">
                  <span className="font-bold">Arif Ahmed</span> donated <span className="font-bold">৳500</span>
                </p>
                <p className="text-xs text-[#53605C] mt-1 italic">"Hope this helps! Keep up the good work."</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#8C7A5B] mt-2">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex gap-4">
               <div className="h-8 w-8 rounded-full bg-[#1D2927] flex items-center justify-center border border-[#1D2927] shrink-0 text-xs font-bold text-[#F7F4ED]">
                S
              </div>
              <div>
                <p className="text-sm text-[#1D2927]">
                  <span className="font-bold">System</span> verified a payment of <span className="font-bold">৳1,500</span>
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#8C7A5B] mt-2">5 hours ago</p>
              </div>
            </div>
          </div>
        </PaperLift>
      </div>
    </div>
  );
}
