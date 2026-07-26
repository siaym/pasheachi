"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Save, Image as ImageIcon, Link, Bold, Italic, List, ListOrdered } from "lucide-react";
import { useState } from "react";

export default function CampaignStoryEditPage() {
  const [content, setContent] = useState(
    "My mother has been diagnosed with severe triple vessel disease. Doctors at National Heart Foundation have advised an urgent bypass surgery within the next two weeks.\n\nOur family has exhausted all our savings on preliminary diagnostic tests, medications, and hospital admissions over the past three months. The total estimated bill for the surgery, ICU stay, and post-operative medications comes to ৳50,000 beyond what we can manage.\n\nEvery single contribution—no matter how small—will bring us one step closer to saving my mother's life. Please keep her in your prayers and share this link with your network."
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl text-[#1D2927] mb-2">Edit Story</h2>
          <p className="text-[#53605C]">
            Update your campaign's main narrative. Make it compelling and transparent.
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="h-10 px-6 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] hover:bg-[#FAF8F3] hover:text-[#1D2927] font-mono text-[10px] font-bold uppercase tracking-widest transition-all shadow-ink flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <FadeIn delay={0.2}>
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] shadow-paper overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Editor Toolbar */}
          <div className="bg-[#EAE5DB] border-b border-[#D9D3C7] p-2 flex flex-wrap gap-2 items-center">
            <div className="flex bg-[#FAF8F3] border border-[#D9D3C7] p-1">
              <button className="p-2 hover:bg-[#EAE5DB] transition-colors text-[#1D2927]" title="Bold"><Bold className="h-4 w-4" /></button>
              <button className="p-2 hover:bg-[#EAE5DB] transition-colors text-[#1D2927]" title="Italic"><Italic className="h-4 w-4" /></button>
            </div>
            
            <div className="flex bg-[#FAF8F3] border border-[#D9D3C7] p-1">
              <button className="p-2 hover:bg-[#EAE5DB] transition-colors text-[#1D2927]" title="Bullet List"><List className="h-4 w-4" /></button>
              <button className="p-2 hover:bg-[#EAE5DB] transition-colors text-[#1D2927]" title="Numbered List"><ListOrdered className="h-4 w-4" /></button>
            </div>

            <div className="flex bg-[#FAF8F3] border border-[#D9D3C7] p-1 ml-auto">
              <button className="p-2 hover:bg-[#EAE5DB] transition-colors text-[#1D2927]" title="Add Link"><Link className="h-4 w-4" /></button>
              <button className="p-2 hover:bg-[#EAE5DB] transition-colors text-[#1D2927]" title="Insert Image"><ImageIcon className="h-4 w-4" /></button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 p-6 sm:p-8">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[400px] bg-transparent border-none focus:outline-none resize-none font-editorial text-lg text-[#1D2927] leading-relaxed placeholder:text-[#D9D3C7] placeholder:italic"
              placeholder="Tell your story here..."
            />
          </div>

        </PaperLift>
      </FadeIn>

      <div className="bg-[#EAE5DB] p-4 border-l-4 border-[#8C7A5B]">
        <h4 className="font-bold text-sm text-[#1D2927] mb-1">Writing Tips</h4>
        <ul className="list-disc list-inside text-xs text-[#53605C] space-y-1">
          <li>Be transparent about exactly how the funds will be used.</li>
          <li>Break up long paragraphs for easier reading.</li>
          <li>Include personal details to build an emotional connection.</li>
        </ul>
      </div>

    </div>
  );
}
