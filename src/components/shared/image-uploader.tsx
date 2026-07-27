"use client";

import { useState, useRef } from "react";
import { Upload, Link as LinkIcon, X, Check, Image as ImageIcon, Sparkles } from "lucide-react";

export const CURATED_PRESETS = [
  {
    category: "Medical",
    title: "Hospital & Medical Care",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
  },
  {
    category: "Education",
    title: "Classroom & Books",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    category: "Relief",
    title: "Flood & Community Relief",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    category: "Creative",
    title: "Film & Camera Work",
    url: "https://images.unsplash.com/photo-1512790182412-b19e6d61b39a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    category: "Technology",
    title: "Code & Hardware",
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
  },
];

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: "square" | "landscape" | "banner";
}

export function ImageUploader({
  value,
  onChange,
  label = "Cover Image",
  aspectRatio = "landscape",
}: ImageUploaderProps) {
  const [tab, setTab] = useState<"upload" | "url" | "presets">("upload");
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image file size should be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const aspectClasses = {
    square: "aspect-square max-w-[200px]",
    landscape: "aspect-[16/9] w-full",
    banner: "aspect-[3/1] w-full",
  }[aspectRatio];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
          {label} *
        </label>
        <div className="flex gap-1 border border-[#D9D3C7] bg-[#EAE5DB]/50 p-0.5 rounded-xs font-mono text-[9px] uppercase tracking-widest">
          <button
            type="button"
            onClick={() => setTab("upload")}
            className={`px-2 py-1 transition-colors ${
              tab === "upload"
                ? "bg-[#1D2927] text-[#F7F4ED] font-bold"
                : "text-[#53605C] hover:text-[#1D2927]"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setTab("url")}
            className={`px-2 py-1 transition-colors ${
              tab === "url"
                ? "bg-[#1D2927] text-[#F7F4ED] font-bold"
                : "text-[#53605C] hover:text-[#1D2927]"
            }`}
          >
            Image Link
          </button>
          <button
            type="button"
            onClick={() => setTab("presets")}
            className={`px-2 py-1 transition-colors flex items-center gap-1 ${
              tab === "presets"
                ? "bg-[#1D2927] text-[#F7F4ED] font-bold"
                : "text-[#53605C] hover:text-[#1D2927]"
            }`}
          >
            <Sparkles className="h-2.5 w-2.5" /> Presets
          </button>
        </div>
      </div>

      {/* Preview Box if image is selected */}
      {value ? (
        <div className="relative border-2 border-[#1D2927] bg-[#EAE5DB] overflow-hidden group shadow-sm">
          <div className={`${aspectClasses} relative overflow-hidden`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-[#A84D2A]/10 pointer-events-none"></div>
          </div>

          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 border border-[#1D2927] bg-[#FAF8F3] text-[#1D2927] hover:bg-[#A84D2A] hover:text-white transition-colors shadow-sm"
              title="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute bottom-2 left-2 bg-[#FAF8F3]/90 border border-[#1D2927] px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#1D2927]">
            ✓ Selected Image
          </div>
        </div>
      ) : (
        <>
          {tab === "upload" && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#1D2927] bg-[#EAE5DB]/40 p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#EAE5DB] transition-all text-center group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="h-8 w-8 text-[#1D2927] mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1D2927]">
                Click or Drop Image File
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-1">
                PNG, JPG, WEBP • Max 5MB
              </span>
            </div>
          )}

          {tab === "url" && (
            <div className="space-y-3 bg-[#EAE5DB]/30 p-4 border border-[#D9D3C7]">
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-xs text-[#1D2927] outline-none"
                />
                <button
                  type="button"
                  onClick={() => onChange(urlInput)}
                  className="px-4 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] font-mono text-[10px] uppercase font-bold tracking-widest hover:bg-[#FAF8F3] hover:text-[#1D2927] transition-all"
                >
                  Apply
                </button>
              </div>
              <p className="font-mono text-[9px] text-[#53605C] uppercase tracking-widest">
                Paste a direct image URL from Unsplash or image host.
              </p>
            </div>
          )}

          {tab === "presets" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#EAE5DB]/30 p-3 border border-[#D9D3C7]">
              {CURATED_PRESETS.map((preset) => (
                <button
                  key={preset.category}
                  type="button"
                  onClick={() => onChange(preset.url)}
                  className="group relative aspect-[4/3] border border-[#D9D3C7] overflow-hidden hover:border-[#1D2927] transition-all text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preset.url}
                    alt={preset.title}
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-[#1D2927]/40 group-hover:bg-[#1D2927]/20 transition-colors"></div>
                  <div className="absolute bottom-1 left-1.5 right-1.5">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-widest bg-[#FAF8F3] text-[#1D2927] px-1.5 py-0.5 border border-[#1D2927] block truncate">
                      {preset.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
