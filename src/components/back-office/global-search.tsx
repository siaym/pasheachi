"use client";

import { useState, useEffect } from "react";
import { Search, Megaphone, Users, Wallet, FileText, Headphones, Settings, X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: "Campaign" | "Creator" | "Transaction" | "Ticket" | "AuditLog" | "Setting";
  url: string;
}

const SEARCH_DATABASE: SearchResult[] = [
  { id: "1", title: "Emergency Flood Relief for Sylhet", subtitle: "Campaign • Goal: ৳5,00,000", category: "Campaign", url: "/admin" },
  { id: "2", title: "Siyam Ahmed (@siyam)", subtitle: "Verified Creator • 2 Active Campaigns", category: "Creator", url: "/admin" },
  { id: "3", title: "TRX-9F2A1B (৳5,000 bKash)", subtitle: "Transaction • Verified", category: "Transaction", url: "/admin" },
  { id: "4", title: "TICKET-809: Withdrawal status inquiry", subtitle: "Support Ticket • Open", category: "Ticket", url: "/admin" },
  { id: "5", title: "Manual Verification Threshold Limit", subtitle: "Platform Config • ৳25,000", category: "Setting", url: "/admin" },
];

export function GlobalSearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query
    ? SEARCH_DATABASE.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()))
    : SEARCH_DATABASE.slice(0, 4);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Campaign": return Megaphone;
      case "Creator": return Users;
      case "Transaction": return Wallet;
      case "Ticket": return Headphones;
      default: return FileText;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1D2927]/70 backdrop-blur-sm flex items-start justify-center pt-24 p-4">
      <div className="bg-[#FAF8F3] border-2 border-[#1D2927] shadow-paper max-w-xl w-full overflow-hidden flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-[#D9D3C7] flex items-center gap-3 bg-[#F7F4ED]">
          <Search className="h-5 w-5 text-[#8C7A5B]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search campaigns, creators, transactions, tickets, logs..."
            className="flex-1 bg-transparent border-none focus:outline-none font-editorial italic text-lg text-[#1D2927] placeholder:text-[#8C7A5B]"
          />
          <button onClick={onClose} className="p-1 hover:bg-[#EAE5DB] text-[#53605C]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#D9D3C7]">
          {results.length === 0 ? (
            <div className="p-8 text-center text-[#8C7A5B] font-mono text-xs">
              No Back Office records found for "{query}".
            </div>
          ) : (
            results.map((res) => {
              const Icon = getCategoryIcon(res.category);
              return (
                <Link
                  key={res.id}
                  href={res.url}
                  onClick={onClose}
                  className="p-4 flex items-center justify-between hover:bg-[#F7F4ED] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 border border-[#D9D3C7] bg-[#EAE5DB] text-[#1D2927]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#1D2927]">{res.title}</div>
                      <div className="font-mono text-[10px] uppercase text-[#53605C]">{res.subtitle}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#8C7A5B] group-hover:text-[#1D2927] transition-colors" />
                </Link>
              );
            })
          )}
        </div>

        {/* Shortcut Footer */}
        <div className="p-3 bg-[#EAE5DB] border-t border-[#D9D3C7] flex justify-between items-center text-[10px] font-mono text-[#53605C]">
          <span>Tip: Press ESC or click outside to close</span>
          <span className="bg-[#FAF8F3] px-2 py-0.5 border border-[#D9D3C7] font-bold text-[#1D2927]">Ctrl + K</span>
        </div>
      </div>
    </div>
  );
}
