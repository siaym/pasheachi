
import Link from "next/link";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatCurrency, calculateProgress } from "@/lib/utils";
import {
  Search,
  PlusCircle,
  MoreVertical,
  Settings,
  Share2,
  Eye,
  Archive,
  Copy,
  Filter
} from "lucide-react";

type FilterStatus = "All" | "Live" | "Draft" | "Pending Approval" | "Completed" | "Archived" | "Rejected";

export default async function MyCampaignsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: FilterStatus }>;
}) {
  const { filter } = await searchParams;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const myCampaigns = await prisma.campaign.findMany({
    where: { creatorId: user.id },
    include: { creator: true, transactions: true }
  });

  const activeFilter = filter || "All";
  const filters: FilterStatus[] = ["All", "Live", "Draft", "Pending Approval", "Completed", "Archived", "Rejected"];

  return (
    <div className="space-y-12">
      {/* Header */}
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9D3C7] pb-6">
        <div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927] mb-2">
            My <span className="italic text-[#8C7A5B]">Campaigns</span>
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Manage, track, and edit your fundraising records
          </p>
        </div>

        <Link href="/create">
          <button className="h-10 px-5 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] font-bold text-xs uppercase tracking-widest hover:bg-[#1D2927]/90 shadow-ink transition-all flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> New Campaign
          </button>
        </Link>
      </FadeIn>

      <FadeIn delay={0.1} className="space-y-6">
        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar flex-1">
            <div className="flex items-center gap-2 pr-4 border-r border-[#D9D3C7] mr-2">
              <Filter className="h-4 w-4 text-[#8C7A5B]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C]">Filter</span>
            </div>
            {filters.map((filter) => (
              <a
                key={filter}
                href={`/dashboard/campaigns?filter=${filter}`}
                className={`h-8 px-4 border font-bold text-[10px] flex items-center uppercase tracking-widest transition-colors whitespace-nowrap ${
                  activeFilter === filter
                    ? "border-[#1D2927] bg-[#EAE5DB] text-[#1D2927]"
                    : "border-transparent text-[#53605C] hover:text-[#1D2927] hover:bg-[#EAE5DB]"
                }`}
              >
                {filter}
              </a>
            ))}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8C7A5B]" />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="h-9 w-full bg-transparent border-b border-[#D9D3C7] pl-9 pr-3 text-sm font-editorial italic text-[#1D2927] focus:outline-none focus:border-[#1D2927] placeholder:text-[#8C7A5B]"
            />
          </div>
        </div>

        {/* Campaign List */}
        <div className="space-y-6">
          {myCampaigns.map((cmp) => {
            const progress = calculateProgress(cmp.raisedAmount, cmp.goalAmount);
            return (
              <PaperLift
                key={cmp.id}
                className="bg-[#FAF8F3] border border-[#D9D3C7] shadow-sm transition-all hover:border-[#1D2927] flex flex-col md:flex-row overflow-hidden"
              >
                {/* Cover Image */}
                <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative border-b md:border-b-0 md:border-r border-[#D9D3C7]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cmp.coverImageUrl || "/placeholder.jpg"}
                    alt={cmp.title}
                    className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 border border-[#1D2927] px-2 py-0.5 text-[#1D2927] font-bold bg-[#EAE5DB] font-mono text-[9px] uppercase tracking-widest shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> Live
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#1D2927] mb-1 line-clamp-1">
                        {cmp.title}
                      </h3>
                      <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                        <span className="text-[#10B981] font-bold">✓ Verified</span>
                        <span>•</span>
                        <span>{cmp.daysLeft} Days Left</span>
                        <span>•</span>
                        <span>{cmp.transactions?.length || 0} Supporters</span>
                      </div>
                    </div>
                    
                    {/* Action Menu Trigger (Mocked as simple buttons for now, can use DropdownMenu later) */}
                    <div className="hidden sm:flex items-center gap-2">
                      <Link href={`/dashboard/campaigns/${cmp.id}`}>
                        <button className="h-8 px-3 border border-[#1D2927] text-[#1D2927] font-bold text-[10px] uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors flex items-center gap-1.5">
                          <Settings className="h-3 w-3" /> Manage
                        </button>
                      </Link>
                      <button className="h-8 w-8 flex items-center justify-center border border-[#D9D3C7] text-[#53605C] hover:text-[#1D2927] hover:border-[#1D2927] hover:bg-[#EAE5DB] transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                    <div className="space-y-2">
                      <div className="flex justify-between font-mono text-xs text-[#1D2927]">
                        <span className="font-bold">{formatCurrency(cmp.raisedAmount)}</span>
                        <span className="text-[#355C52]">{cmp.transactions?.length || 0}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#53605C]">Progress</span>
                        <span className="font-mono font-bold text-[#1D2927]">
                          {Math.round((cmp.raisedAmount / (cmp.goalAmount || 1)) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-[#EAE5DB] overflow-hidden">
                        <div 
                          className="h-full bg-[#1D2927]" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                        {progress}% Funded
                      </div>
                    </div>

                    {/* Mobile Quick Actions */}
                    <div className="flex sm:hidden items-center gap-2 border-t border-[#D9D3C7] pt-4 mt-2">
                      <Link href={`/dashboard/campaigns/${cmp.id}`} className="flex-1">
                        <button className="w-full h-8 border border-[#1D2927] text-[#1D2927] font-bold text-[10px] uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors flex items-center justify-center gap-1.5">
                          <Settings className="h-3 w-3" /> Manage
                        </button>
                      </Link>
                    </div>

                    <div className="hidden sm:flex flex-wrap items-center justify-end gap-3 font-mono text-[9px] uppercase tracking-widest text-[#53605C]">
                      <button className="flex items-center gap-1 hover:text-[#1D2927] transition-colors">
                        <Share2 className="h-3 w-3" /> Share
                      </button>
                      <Link href={`/${user.username}/${cmp.slug}`} className="flex items-center gap-1 hover:text-[#1D2927] transition-colors">
                        <Eye className="h-3 w-3" /> Preview
                      </Link>
                      <button className="flex items-center gap-1 hover:text-[#1D2927] transition-colors">
                        <Copy className="h-3 w-3" /> Duplicate
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#A84D2A] transition-colors">
                        <Archive className="h-3 w-3" /> Archive
                      </button>
                    </div>
                  </div>
                </div>
              </PaperLift>
            );
          })}
        </div>
      </FadeIn>
    </div>
  );
}
