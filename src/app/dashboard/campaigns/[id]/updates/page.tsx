"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Plus, Megaphone, Image as ImageIcon, Send, Clock } from "lucide-react";
import { useState } from "react";

const MOCK_UPDATES = [
  {
    id: 1,
    title: "Surgery Date Confirmed!",
    date: "2 days ago",
    content: "Thank you to everyone who has donated so far! Thanks to your generous support, we were able to pay the hospital deposit. The surgery is scheduled for next Tuesday. Please keep us in your prayers.",
    status: "published"
  },
  {
    id: 2,
    title: "Initial Diagnostic Tests Completed",
    date: "1 week ago",
    content: "We spent the first ৳10,000 from the fund on the angiogram and blood tests. The doctors are optimistic.",
    status: "published"
  }
];

export default function CampaignUpdatesPage() {
  const [isDrafting, setIsDrafting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = () => {
    setIsDrafting(false);
    setTitle("");
    setContent("");
    // In reality, this would push a new update to the server
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl text-[#1D2927] mb-2">Campaign Updates</h2>
          <p className="text-[#53605C]">
            Keep your donors informed. Post progress reports, thank you notes, or milestones achieved.
          </p>
        </div>
        {!isDrafting && (
          <button 
            onClick={() => setIsDrafting(true)}
            className="h-10 px-4 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] hover:bg-[#FAF8F3] hover:text-[#1D2927] font-mono text-[10px] font-bold uppercase tracking-widest transition-all shadow-ink flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Post New Update
          </button>
        )}
      </div>

      {/* New Update Composer (Conditional) */}
      {isDrafting && (
        <FadeIn>
          <PaperLift className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 shadow-[4px_4px_0_0_#1D2927] relative">
            <button 
              onClick={() => setIsDrafting(false)}
              className="absolute top-4 right-4 text-[#53605C] hover:text-[#1D2927] text-xs font-mono uppercase tracking-widest"
            >
              Cancel
            </button>
            <h3 className="font-editorial text-2xl text-[#1D2927] mb-6 flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-[#A84D2A]" /> Draft Update
            </h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Update Title (e.g., Milestone Reached!)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-editorial text-xl text-[#1D2927] placeholder:text-[#D9D3C7] focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Write your update here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[150px] bg-transparent border border-[#D9D3C7] focus:border-[#1D2927] p-4 text-[#1D2927] text-sm resize-y focus:outline-none transition-colors"
              />
              
              <div className="flex items-center justify-between pt-2">
                <button className="flex items-center gap-2 text-[#53605C] hover:text-[#1D2927] text-xs font-mono uppercase tracking-widest transition-colors">
                  <ImageIcon className="h-4 w-4" /> Attach Photo
                </button>
                <button 
                  onClick={handlePost}
                  disabled={!title || !content}
                  className="h-10 px-6 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] hover:bg-[#FAF8F3] hover:text-[#1D2927] font-mono text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="h-3 w-3" /> Publish Now
                </button>
              </div>
            </div>
          </PaperLift>
        </FadeIn>
      )}

      {/* Updates Timeline Feed */}
      <div className="space-y-6 pt-4">
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C] border-b border-[#D9D3C7] pb-2">
          Past Updates
        </h4>
        
        {MOCK_UPDATES.map((update, idx) => (
          <FadeIn key={update.id} delay={0.1 * idx}>
            <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 hover:border-[#1D2927] transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-editorial text-xl text-[#1D2927] group-hover:text-[#A84D2A] transition-colors">{update.title}</h5>
                <div className="flex items-center gap-2 text-[#53605C] font-mono text-[10px] uppercase tracking-widest">
                  <Clock className="h-3 w-3" /> {update.date}
                </div>
              </div>
              <p className="text-sm text-[#1D2927] leading-relaxed">
                {update.content}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

    </div>
  );
}
