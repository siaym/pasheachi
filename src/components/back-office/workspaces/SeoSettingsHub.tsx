"use client";

import { useState, useTransition } from "react";
import { PaperLift } from "@/components/ui/motion";
import { Globe, Save, Search, CheckCircle2, ShieldCheck, Code } from "lucide-react";

export function SeoSettingsHub({ showToast }: { showToast: (msg: string) => void }) {
  const [isPending, startTransition] = useTransition();
  const [siteTitle, setSiteTitle] = useState("PasheAchi — Support Every Dream | Crowdfunding Bangladesh");
  const [siteDescription, setSiteDescription] = useState(
    "PasheAchi (পাশে আছি) is Bangladesh's dedicated crowdfunding platform where anyone can receive direct financial support for medical treatments, education, emergencies, and dreams."
  );
  const [keywords, setKeywords] = useState("Crowdfunding Bangladesh, PasheAchi, bKash donation, Nagad donation, Medical fundraising BD");
  const [ogImageUrl, setOgImageUrl] = useState("https://images.unsplash.com/photo-1532629345422-7515f3d16bb0");
  const [googleVerification, setGoogleVerification] = useState("g-verify-code-stub-9021");
  const [bingVerification, setBingVerification] = useState("bing-verify-code-stub-4021");
  const [ga4Id, setGa4Id] = useState("G-PASHEACHI2026");
  const [metaPixelId, setMetaPixelId] = useState("FB-PIXEL-90182");

  const handleSave = () => {
    startTransition(async () => {
      // Simulate live update saved to DB
      showToast("Platform SEO & Search Console verification settings updated live!");
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4">
        <div>
          <h3 className="font-editorial text-2xl text-[#1D2927] flex items-center gap-2">
            <Globe className="h-6 w-6 text-[#A84D2A]" /> Platform Enterprise SEO & Analytics Config
          </h3>
          <p className="font-mono text-xs text-[#53605C]">
            Configure search engine indexing, OpenGraph preview cards, Search Console tokens, and analytics tracking live.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="px-5 h-10 bg-[#1D2927] text-[#FAF8F3] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#A84D2A] transition-colors disabled:opacity-50"
        >
          <Save className="h-4 w-4" /> Save SEO Config
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meta Configuration */}
        <PaperLift className="bg-[#FAF8F3] border border-[#1D2927] p-6 shadow-paper space-y-4">
          <h4 className="font-editorial text-xl text-[#1D2927] border-b border-[#D9D3C7] pb-2 flex items-center gap-2">
            <Search className="h-5 w-5 text-[#355C52]" /> Search Metadata & OpenGraph
          </h4>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-1">
              Global Default Meta Title
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-1">
              Global Default Meta Description
            </label>
            <textarea
              rows={3}
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              className="w-full p-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927] resize-none"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-1">
              Global Search Keywords (Comma Separated)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-1">
              Default Social OpenGraph Preview Image URL
            </label>
            <input
              type="text"
              value={ogImageUrl}
              onChange={(e) => setOgImageUrl(e.target.value)}
              className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            />
          </div>
        </PaperLift>

        {/* Verification & Analytics */}
        <PaperLift className="bg-[#FAF8F3] border border-[#1D2927] p-6 shadow-paper space-y-4">
          <h4 className="font-editorial text-xl text-[#1D2927] border-b border-[#D9D3C7] pb-2 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#A84D2A]" /> Search Console & Analytics Integration
          </h4>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-1">
              Google Search Console Verification Token
            </label>
            <input
              type="text"
              placeholder="google-site-verification=..."
              value={googleVerification}
              onChange={(e) => setGoogleVerification(e.target.value)}
              className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-1">
              Bing Webmaster Verification Code
            </label>
            <input
              type="text"
              placeholder="msvalidate.01=..."
              value={bingVerification}
              onChange={(e) => setBingVerification(e.target.value)}
              className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-1">
              Google Analytics 4 Measurement ID
            </label>
            <input
              type="text"
              placeholder="G-XXXXXXXXXX"
              value={ga4Id}
              onChange={(e) => setGa4Id(e.target.value)}
              className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-1">
              Meta (Facebook) Pixel ID
            </label>
            <input
              type="text"
              placeholder="Pixel ID..."
              value={metaPixelId}
              onChange={(e) => setMetaPixelId(e.target.value)}
              className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            />
          </div>
        </PaperLift>
      </div>
    </div>
  );
}
