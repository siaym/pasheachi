"use client";

import { useState, useEffect } from "react";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Save, Image as ImageIcon, Link as LinkIcon, Bold, Italic, List, ListOrdered, CheckCircle2, Video, Eye, Edit3 } from "lucide-react";
import { ImageUploader } from "@/components/shared/image-uploader";
import { updateCampaignStoryAction } from "../actions";

export function StoryEditClient({ campaign }: { campaign: any }) {
  const [content, setContent] = useState(campaign.description || "");
  const [coverImageUrl, setCoverImageUrl] = useState(campaign.coverImageUrl || "");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState("All changes saved");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Auto-save local draft to localStorage every 5s
  useEffect(() => {
    const draftKey = `pasheachi_story_draft_${campaign.id}`;
    const timer = setTimeout(() => {
      if (content !== campaign.description) {
        localStorage.setItem(draftKey, content);
        setAutoSaveStatus("Draft auto-saved locally");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [content, campaign.id, campaign.description]);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg("");
    setSavedSuccess(false);

    const result = await updateCampaignStoryAction(campaign.id, content, coverImageUrl);

    setIsSaving(false);
    if (result.success) {
      setSavedSuccess(true);
      setAutoSaveStatus("Saved live to database");
      localStorage.removeItem(`pasheachi_story_draft_${campaign.id}`);
      setTimeout(() => setSavedSuccess(false), 3000);
    } else {
      setErrorMsg(result.error || "Failed to save changes.");
    }
  };

  const handleInsertVideo = () => {
    if (videoUrl) {
      setContent((prev: string) => prev + `\n\n🎥 [Watch Video Update](${videoUrl})\n`);
      setVideoUrl("");
      setShowVideoModal(false);
    }
  };


  return (
    <div className="space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl text-[#1D2927] mb-2">Edit Story & Media</h2>
          <div className="flex items-center gap-3">
            <p className="text-[#53605C] text-xs font-mono uppercase tracking-widest">
              Update cover photo and narrative.
            </p>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C7A5B] bg-[#EAE5DB] px-2 py-0.5 border border-[#D9D3C7]">
              {autoSaveStatus}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="h-10 px-4 border border-[#1D2927] bg-[#FAF8F3] text-[#1D2927] hover:bg-[#EAE5DB] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
          >
            {isPreviewMode ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {isPreviewMode ? "Back to Edit" : "Live Preview"}
          </button>
          
          {savedSuccess && (
            <span className="text-xs font-mono uppercase tracking-widest text-[#355C52] flex items-center gap-1 font-bold">
              <CheckCircle2 className="h-4 w-4" /> Saved Live!
            </span>
          )}
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="h-10 px-6 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] hover:bg-[#FAF8F3] hover:text-[#1D2927] font-mono text-[10px] font-bold uppercase tracking-widest transition-all shadow-ink flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-[#A84D2A]/10 border border-[#A84D2A] p-4 text-xs font-mono text-[#A84D2A]">
          {errorMsg}
        </div>
      )}

      {/* Campaign Cover Photo Upload */}
      <FadeIn delay={0.1}>
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
          <ImageUploader
            value={coverImageUrl}
            onChange={setCoverImageUrl}
            label="Campaign Cover Photo (Displayed on Public Page)"
            aspectRatio="landscape"
          />
        </PaperLift>
      </FadeIn>

      {/* Narrative Story Editor / Preview */}
      <FadeIn delay={0.2}>
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] shadow-paper overflow-hidden flex flex-col min-h-[500px]">
          {/* Editor Toolbar */}
          {!isPreviewMode && (
            <div className="bg-[#EAE5DB] border-b border-[#D9D3C7] p-2 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex bg-[#FAF8F3] border border-[#D9D3C7] p-1">
                  <button className="p-2 hover:bg-[#EAE5DB] transition-colors text-[#1D2927]" title="Bold"><Bold className="h-4 w-4" /></button>
                  <button className="p-2 hover:bg-[#EAE5DB] transition-colors text-[#1D2927]" title="Italic"><Italic className="h-4 w-4" /></button>
                </div>
                
                <div className="flex bg-[#FAF8F3] border border-[#D9D3C7] p-1">
                  <button className="p-2 hover:bg-[#EAE5DB] transition-colors text-[#1D2927]" title="Bullet List"><List className="h-4 w-4" /></button>
                  <button className="p-2 hover:bg-[#EAE5DB] transition-colors text-[#1D2927]" title="Numbered List"><ListOrdered className="h-4 w-4" /></button>
                </div>

                <button 
                  onClick={() => setShowVideoModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F3] border border-[#D9D3C7] hover:bg-[#1D2927] hover:text-[#FAF8F3] text-xs font-mono uppercase tracking-widest text-[#1D2927] transition-colors"
                >
                  <Video className="h-4 w-4" /> Add Video Embed
                </button>
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C7A5B] pr-2">
                Markdown & Rich Text Supported
              </span>
            </div>
          )}

          {/* Editor or Preview Area */}
          <div className="flex-1 p-6 sm:p-8">
            {isPreviewMode ? (
              <div className="prose max-w-none font-editorial text-lg text-[#1D2927] leading-relaxed whitespace-pre-wrap">
                {content || <em className="text-[#8C7A5B]">No story content typed yet.</em>}
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setAutoSaveStatus("Editing...");
                }}
                className="w-full h-full min-h-[400px] bg-transparent border-none focus:outline-none resize-none font-editorial text-lg text-[#1D2927] leading-relaxed placeholder:text-[#D9D3C7] placeholder:italic"
                placeholder="Tell your story here..."
              />
            )}
          </div>
        </PaperLift>
      </FadeIn>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-[#1D2927]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 max-w-md w-full shadow-paper space-y-4">
            <h3 className="font-editorial text-xl text-[#1D2927]">Embed YouTube / Vimeo Video</h3>
            <p className="text-xs font-mono text-[#53605C]">Paste video link to embed in your story.</p>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full h-10 px-3 border border-[#D9D3C7] bg-[#F7F4ED] text-sm font-mono focus:outline-none focus:border-[#1D2927]"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setShowVideoModal(false)}
                className="h-8 px-4 border border-[#D9D3C7] font-mono text-[10px] uppercase font-bold"
              >
                Cancel
              </button>
              <button 
                onClick={handleInsertVideo}
                className="h-8 px-4 bg-[#1D2927] text-[#F7F4ED] font-mono text-[10px] uppercase font-bold"
              >
                Insert Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
