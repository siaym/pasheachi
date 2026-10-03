"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Check, X, Megaphone, ExternalLink, User } from "lucide-react";
import { useState } from "react";

// Mock data for pending campaigns
const MOCK_PENDING_CAMPAIGNS = [
  {
    id: "CMP-092",
    title: "Emergency Flood Relief for Sylhet",
    creator: "Rahim Ali",
    goal: 500000,
    type: "Emergency Relief",
    date: "July 26, 2026",
    status: "pending",
    story: "Severe flooding has displaced hundreds of families in our village. We are raising funds to provide emergency dry food, clean water, and temporary shelter materials...",
  },
  {
    id: "CMP-093",
    title: "University Tuition Fee for Final Semester",
    creator: "Sadia Islam",
    goal: 45000,
    type: "Education",
    date: "July 26, 2026",
    status: "pending",
    story: "I am a final year CSE student. Due to a sudden family crisis, I am unable to pay my final semester fees. Without this, I won't be able to graduate. Any help is appreciated.",
  },
];

export default function AdminCampaignApprovalsPage() {
  const [campaigns, setCampaigns] = useState(MOCK_PENDING_CAMPAIGNS);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    // In reality, this makes an API call
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9D3C7] pb-6">
        <div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1D2927] mb-2">
            Campaign Approvals
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Review new submissions ({campaigns.length} Pending)
          </p>
        </div>
      </FadeIn>

      <div className="space-y-6">
        {campaigns.length === 0 ? (
          <FadeIn>
            <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-12 text-center flex flex-col items-center">
              <Megaphone className="h-12 w-12 text-[#D9D3C7] mb-4" />
              <h3 className="font-editorial text-2xl text-[#1D2927]">All Caught Up!</h3>
              <p className="text-[#53605C] mt-2">There are no pending campaigns to review right now.</p>
            </div>
          </FadeIn>
        ) : (
          campaigns.map((campaign, idx) => (
            <FadeIn key={campaign.id} delay={idx * 0.1}>
              <PaperLift className="bg-[#FAF8F3] border-2 border-[#1E3A8A] p-6 sm:p-8 flex flex-col lg:flex-row gap-8 shadow-[4px_4px_0_0_#1E3A8A] relative">
                
                {/* Campaign Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-[#EFF6FF] text-[#1E3A8A] px-2 py-1">
                      {campaign.type}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                      {campaign.id} • {campaign.date}
                    </span>
                  </div>
                  
                  <h3 className="font-editorial text-2xl text-[#1D2927]">{campaign.title}</h3>
                  
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1D2927]">
                    <User className="h-4 w-4 text-[#8C7A5B]" />
                    {campaign.creator}
                  </div>

                  <p className="text-sm text-[#53605C] leading-relaxed line-clamp-3">
                    "{campaign.story}"
                  </p>
                  
                  <div className="font-mono text-sm font-bold text-[#1D2927]">
                    Goal: ৳{campaign.goal.toLocaleString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col justify-end gap-3 shrink-0">
                  <button className="h-10 px-4 border border-[#1D2927] text-[#1D2927] hover:bg-[#EAE5DB] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                    <ExternalLink className="h-3 w-3" /> Preview
                  </button>
                  <button 
                    onClick={() => handleAction(campaign.id, 'approve')}
                    className="h-10 px-4 bg-[#10B981] text-white hover:bg-[#059669] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Check className="h-4 w-4" /> Approve
                  </button>
                  <button 
                    onClick={() => handleAction(campaign.id, 'reject')}
                    className="h-10 px-4 border border-red-200 text-red-600 hover:bg-red-50 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                  >
                    <X className="h-4 w-4" /> Reject
                  </button>
                </div>
              </PaperLift>
            </FadeIn>
          ))
        )}
      </div>
    </div>
  );
}
