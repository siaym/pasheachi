"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Plus, Megaphone, Image as ImageIcon, Send, Clock, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { addUpdate } from "./actions";

export function UpdatesClient({ updates, campaignId }: { updates: any[], campaignId: string }) {
  const [isDrafting, setIsDrafting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handlePost = () => {
    startTransition(async () => {
      await addUpdate(campaignId, title, content);
      setIsDrafting(false);
      setTitle("");
      setContent("");
    });
  };

  return (
    <div className="space-y-8 pb-24 relative">
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

      {isDrafting && (
        <FadeIn>
          <PaperLift className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 shadow-[4px_4px_0_0_#1D2927] relative">
            <button 
              onClick={() => setIsDrafting(false)}
              className="absolute top-4 right-4 text-[#53605C] hover:text-[#1D2927] text-xs font-mono uppercase tracking-widest"
              disabled={isPending}
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
                disabled={isPending}
                className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-editorial text-xl text-[#1D2927] placeholder:text-[#D9D3C7] focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Write your update here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isPending}
                className="w-full min-h-[150px] bg-transparent border border-[#D9D3C7] focus:border-[#1D2927] p-4 text-[#1D2927] text-sm resize-y focus:outline-none transition-colors"
              />
              
              <div className="flex items-center justify-between pt-2">
                <button className="flex items-center gap-2 text-[#53605C] hover:text-[#1D2927] text-xs font-mono uppercase tracking-widest transition-colors">
                  <ImageIcon className="h-4 w-4" /> Attach Photo
                </button>
                <button 
                  onClick={handlePost}
                  disabled={!title || !content || isPending}
                  className="h-10 px-6 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] hover:bg-[#FAF8F3] hover:text-[#1D2927] font-mono text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                  {isPending ? 'Publishing...' : 'Publish Now'}
                </button>
              </div>
            </div>
          </PaperLift>
        </FadeIn>
      )}

      <div className="space-y-6 pt-4">
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C] border-b border-[#D9D3C7] pb-2">
          Past Updates
        </h4>
        
        {updates.length === 0 ? (
          <div className="text-center py-12 text-[#53605C] font-mono text-sm uppercase tracking-widest">
            No updates posted yet.
          </div>
        ) : (
          updates.map((update, idx) => (
            <FadeIn key={update.id} delay={0.1 * idx}>
              <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 hover:border-[#1D2927] transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-editorial text-xl text-[#1D2927] group-hover:text-[#A84D2A] transition-colors">{update.title}</h5>
                  <div className="flex items-center gap-2 text-[#53605C] font-mono text-[10px] uppercase tracking-widest">
                    <Clock className="h-3 w-3" /> {new Date(update.date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm text-[#1D2927] leading-relaxed whitespace-pre-line">
                  {update.content}
                </p>
              </div>
            </FadeIn>
          ))
        )}
      </div>

    </div>
  );
}
