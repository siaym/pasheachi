"use client";

import { useState } from "react";
import { X, Download, ZoomIn, ZoomOut, FileText, Image as ImageIcon } from "lucide-react";

export function FilePreview({
  url,
  fileName,
  isOpen,
  onClose,
}: {
  url: string;
  fileName?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  const isImage = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(url) || url.includes("/storage/v1/object/public/");
  const isPdf = /\.pdf$/i.test(url);

  return (
    <div className="fixed inset-0 z-50 bg-[#1D2927]/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F3] border-2 border-[#1D2927] shadow-paper max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#EAE5DB] border-b border-[#D9D3C7] flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-[#1D2927]">
            {isImage ? <ImageIcon className="h-4 w-4 text-[#A84D2A]" /> : <FileText className="h-4 w-4 text-[#A84D2A]" />}
            <span className="font-bold uppercase tracking-widest">{fileName || "File Preview"}</span>
          </div>
          <div className="flex items-center gap-2">
            {isImage && (
              <>
                <button onClick={() => setZoom(z => Math.max(0.25, z - 0.25))} className="p-1.5 border border-[#D9D3C7] bg-[#FAF8F3] hover:bg-[#1D2927] hover:text-[#FAF8F3] transition-colors">
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="font-mono text-[10px] font-bold text-[#53605C] w-10 text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-1.5 border border-[#D9D3C7] bg-[#FAF8F3] hover:bg-[#1D2927] hover:text-[#FAF8F3] transition-colors">
                  <ZoomIn className="h-4 w-4" />
                </button>
              </>
            )}
            <a href={url} target="_blank" rel="noopener noreferrer" className="p-1.5 border border-[#D9D3C7] bg-[#FAF8F3] hover:bg-[#1D2927] hover:text-[#FAF8F3] transition-colors">
              <Download className="h-4 w-4" />
            </a>
            <button onClick={onClose} className="p-1.5 border border-[#D9D3C7] bg-[#FAF8F3] hover:bg-[#A84D2A] hover:text-[#FAF8F3] transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#F7F4ED] min-h-[400px]">
          {isImage ? (
            <img
              src={url}
              alt={fileName || "Preview"}
              style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
              className="max-w-full max-h-full object-contain transition-transform duration-200"
            />
          ) : isPdf ? (
            <iframe src={url} className="w-full h-full min-h-[500px] border border-[#D9D3C7]" />
          ) : (
            <div className="text-center font-mono text-xs text-[#8C7A5B] space-y-4">
              <FileText className="h-16 w-16 text-[#D9D3C7] mx-auto" />
              <p>Preview not available for this file type.</p>
              <a href={url} target="_blank" className="inline-block px-4 py-2 bg-[#1D2927] text-[#FAF8F3] font-bold uppercase tracking-widest">
                Open in New Tab
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FilePreviewTrigger({ url, label }: { url: string; label?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  if (!url) return <span className="font-mono text-[10px] text-[#8C7A5B]">No file</span>;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-2 py-1 bg-[#EAE5DB] text-[#1D2927] border border-[#D9D3C7] font-mono text-[9px] font-bold uppercase flex items-center gap-1 hover:bg-[#1D2927] hover:text-[#FAF8F3] transition-colors"
      >
        <ImageIcon className="h-3 w-3 text-[#A84D2A]" /> {label || "Preview"}
      </button>
      <FilePreview url={url} fileName={label} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
