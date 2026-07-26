"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Download, Users, Eye, MousePointerClick, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

export default function CampaignAnalyticsPage() {
  return (
    <div className="space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl text-[#1D2927] mb-2">Campaign Analytics</h2>
          <p className="text-[#53605C]">
            Track your campaign's performance, traffic sources, and conversion rates over the last 30 days.
          </p>
        </div>
        <button className="h-10 px-4 border border-[#1D2927] bg-[#EAE5DB] hover:bg-[#1D2927] hover:text-[#F7F4ED] font-mono text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <PaperLift delay={0.1} className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 flex flex-col justify-between h-32">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
            <Eye className="h-4 w-4" /> Total Views
          </div>
          <div className="flex items-end justify-between">
            <span className="font-editorial text-4xl text-[#1D2927]">12,450</span>
            <span className="flex items-center text-[#2E4A3D] font-mono text-xs font-bold">
              <TrendingUp className="h-3 w-3 mr-1" /> 14%
            </span>
          </div>
        </PaperLift>

        <PaperLift delay={0.2} className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 flex flex-col justify-between h-32">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
            <Users className="h-4 w-4" /> Unique Visitors
          </div>
          <div className="flex items-end justify-between">
            <span className="font-editorial text-4xl text-[#1D2927]">8,120</span>
            <span className="flex items-center text-[#2E4A3D] font-mono text-xs font-bold">
              <TrendingUp className="h-3 w-3 mr-1" /> 8%
            </span>
          </div>
        </PaperLift>

        <PaperLift delay={0.3} className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 flex flex-col justify-between h-32">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
            <MousePointerClick className="h-4 w-4" /> Conversion Rate
          </div>
          <div className="flex items-end justify-between">
            <span className="font-editorial text-4xl text-[#1D2927]">3.4%</span>
            <span className="flex items-center text-[#A84D2A] font-mono text-xs font-bold">
              <TrendingDown className="h-3 w-3 mr-1" /> 1.2%
            </span>
          </div>
        </PaperLift>

        <PaperLift delay={0.4} className="bg-[#FAF8F3] border border-[#1D2927] bg-[#EAE5DB] p-6 flex flex-col justify-between h-32 shadow-ink">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#1D2927] font-bold">
            <TrendingUp className="h-4 w-4" /> Avg. Donation
          </div>
          <div className="flex items-end justify-between">
            <span className="font-editorial text-4xl text-[#1D2927]">৳850</span>
            <span className="flex items-center text-[#1D2927] font-mono text-xs font-bold">
              +৳120
            </span>
          </div>
        </PaperLift>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Traffic Sources (Left Col) */}
        <FadeIn delay={0.5} className="lg:col-span-2 space-y-6">
          <h3 className="font-editorial text-2xl text-[#1D2927] border-b-2 border-[#1D2927] pb-2">Traffic Sources</h3>
          
          <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-sm">
                <span className="text-[#1D2927] font-bold">Direct Link / Organic</span>
                <span className="text-[#53605C]">45% (5,602 views)</span>
              </div>
              <div className="w-full bg-[#EAE5DB] h-4 border border-[#D9D3C7]">
                <div className="bg-[#1D2927] h-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-mono text-sm">
                <span className="text-[#1D2927] font-bold">Facebook</span>
                <span className="text-[#53605C]">30% (3,735 views)</span>
              </div>
              <div className="w-full bg-[#EAE5DB] h-4 border border-[#D9D3C7]">
                <div className="bg-[#2E4A3D] h-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-mono text-sm">
                <span className="text-[#1D2927] font-bold">WhatsApp / Messenger</span>
                <span className="text-[#53605C]">15% (1,867 views)</span>
              </div>
              <div className="w-full bg-[#EAE5DB] h-4 border border-[#D9D3C7]">
                <div className="bg-[#8C7A5B] h-full" style={{ width: '15%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-mono text-sm">
                <span className="text-[#1D2927] font-bold">PasheAchi Discover Page</span>
                <span className="text-[#53605C]">10% (1,246 views)</span>
              </div>
              <div className="w-full bg-[#EAE5DB] h-4 border border-[#D9D3C7]">
                <div className="bg-[#A84D2A] h-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Top Referrers (Right Col) */}
        <FadeIn delay={0.6} className="space-y-6">
          <h3 className="font-editorial text-2xl text-[#1D2927] border-b border-[#D9D3C7] pb-2">Top Referrers</h3>
          
          <div className="bg-[#FAF8F3] border border-[#D9D3C7] divide-y divide-[#D9D3C7]">
            <a href="#" className="flex items-center justify-between p-4 hover:bg-[#EAE5DB] transition-colors group">
              <div>
                <div className="font-bold text-[#1D2927] text-sm">facebook.com/groups/dhakians</div>
                <div className="font-mono text-[10px] uppercase text-[#53605C] mt-1">1,204 visitors</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#8C7A5B] group-hover:text-[#1D2927]" />
            </a>
            <a href="#" className="flex items-center justify-between p-4 hover:bg-[#EAE5DB] transition-colors group">
              <div>
                <div className="font-bold text-[#1D2927] text-sm">twitter.com/johndoe</div>
                <div className="font-mono text-[10px] uppercase text-[#53605C] mt-1">842 visitors</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#8C7A5B] group-hover:text-[#1D2927]" />
            </a>
            <a href="#" className="flex items-center justify-between p-4 hover:bg-[#EAE5DB] transition-colors group">
              <div>
                <div className="font-bold text-[#1D2927] text-sm">somewhereinblog.net</div>
                <div className="font-mono text-[10px] uppercase text-[#53605C] mt-1">412 visitors</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#8C7A5B] group-hover:text-[#1D2927]" />
            </a>
            <a href="#" className="flex items-center justify-between p-4 hover:bg-[#EAE5DB] transition-colors group">
              <div>
                <div className="font-bold text-[#1D2927] text-sm">linkedin.com/feed</div>
                <div className="font-mono text-[10px] uppercase text-[#53605C] mt-1">156 visitors</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#8C7A5B] group-hover:text-[#1D2927]" />
            </a>
          </div>
        </FadeIn>
      </div>
      
    </div>
  );
}
