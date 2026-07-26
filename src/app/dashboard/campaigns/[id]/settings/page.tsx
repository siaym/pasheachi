"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Save, AlertTriangle, EyeOff, Power, ArchiveX } from "lucide-react";
import { useState } from "react";

export default function CampaignSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [visibility, setVisibility] = useState("public");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl text-[#1D2927] mb-2">Settings</h2>
          <p className="text-[#53605C]">
            Manage visibility, update categories, or perform destructive actions.
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

      <FadeIn delay={0.1}>
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 sm:p-8 space-y-8">
          <h3 className="font-editorial text-2xl text-[#1D2927] border-b border-[#D9D3C7] pb-2">General Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                  Campaign Visibility
                </label>
                <div className="flex gap-4">
                  <label className={`flex-1 border p-4 cursor-pointer transition-colors ${visibility === 'public' ? 'border-[#1D2927] bg-[#EAE5DB]' : 'border-[#D9D3C7] hover:border-[#1D2927]'}`}>
                    <input type="radio" name="visibility" value="public" checked={visibility === 'public'} onChange={() => setVisibility('public')} className="sr-only" />
                    <div className="font-bold text-[#1D2927] text-sm">Public</div>
                    <div className="font-mono text-[10px] text-[#53605C]">Visible on discover page</div>
                  </label>
                  <label className={`flex-1 border p-4 cursor-pointer transition-colors flex items-center justify-between ${visibility === 'hidden' ? 'border-[#1D2927] bg-[#EAE5DB]' : 'border-[#D9D3C7] hover:border-[#1D2927]'}`}>
                    <input type="radio" name="visibility" value="hidden" checked={visibility === 'hidden'} onChange={() => setVisibility('hidden')} className="sr-only" />
                    <div>
                      <div className="font-bold text-[#1D2927] text-sm">Hidden</div>
                      <div className="font-mono text-[10px] text-[#53605C]">Only accessible via link</div>
                    </div>
                    <EyeOff className="h-4 w-4 text-[#53605C]" />
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                  Category
                </label>
                <select className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-sm uppercase tracking-widest text-[#1D2927] focus:outline-none cursor-pointer transition-colors">
                  <option value="medical">Medical & Health</option>
                  <option value="education">Education</option>
                  <option value="emergency">Emergency Relief</option>
                  <option value="memorial">Memorial</option>
                </select>
              </div>
            </div>
          </div>
        </PaperLift>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-[#FAF8F3] border border-red-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-red-200 pb-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h3 className="font-editorial text-2xl text-red-600">Danger Zone</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red-100 bg-red-50/50">
              <div>
                <h4 className="font-bold text-[#1D2927] text-sm">Pause Donations</h4>
                <p className="text-xs text-[#53605C] mt-1">Temporarily disable the "Donate" button on your campaign page. The page will still be visible.</p>
              </div>
              <button className="shrink-0 h-10 px-4 border border-[#1D2927] text-[#1D2927] hover:bg-[#1D2927] hover:text-[#F7F4ED] font-mono text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                <Power className="h-3 w-3" /> Pause
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red-200 bg-red-50">
              <div>
                <h4 className="font-bold text-red-700 text-sm">Close & Archive Campaign</h4>
                <p className="text-xs text-red-600/80 mt-1">Permanently close this campaign. It will be marked as completed and no further actions can be taken.</p>
              </div>
              <button className="shrink-0 h-10 px-4 bg-red-600 text-white hover:bg-red-700 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                <ArchiveX className="h-3 w-3" /> Close Campaign
              </button>
            </div>
          </div>
        </div>
      </FadeIn>

    </div>
  );
}
