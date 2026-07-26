"use client";

import { FadeIn } from "@/components/ui/motion";
import { Search, Mail, Heart } from "lucide-react";
import { useState } from "react";

const MOCK_SUPPORTERS = [
  { id: 1, name: "Anika Rahman", amount: 5000, date: "July 26, 2026", avatar: "A" },
  { id: 2, name: "Anonymous", amount: 1000, date: "July 25, 2026", avatar: "?" },
  { id: 3, name: "Zahid Hasan", amount: 15000, date: "July 25, 2026", avatar: "Z" },
  { id: 4, name: "Faria Islam", amount: 2000, date: "July 24, 2026", avatar: "F" },
  { id: 5, name: "Tanvir Hossain", amount: 3500, date: "July 22, 2026", avatar: "T" },
  { id: 6, name: "Siyam Ahmed", amount: 10000, date: "July 20, 2026", avatar: "S" },
];

export default function CampaignSupportersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSupporters = MOCK_SUPPORTERS.filter((supporter) =>
    supporter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl text-[#1D2927] mb-2">Supporters</h2>
          <p className="text-[#53605C]">
            These are the people backing your campaign. 
          </p>
        </div>
        <button className="h-10 px-4 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] hover:bg-[#FAF8F3] hover:text-[#1D2927] font-mono text-[10px] font-bold uppercase tracking-widest transition-all shadow-ink flex items-center gap-2">
          <Mail className="h-4 w-4" /> Message All
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7A5B]" />
        <input
          type="text"
          placeholder="Search supporters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-[#D9D3C7] focus:border-[#1D2927] outline-none font-mono text-sm text-[#1D2927] placeholder:text-[#8C7A5B] transition-colors"
        />
      </div>

      {/* Supporters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSupporters.map((supporter, idx) => (
          <FadeIn key={supporter.id} delay={0.05 * idx}>
            <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 flex items-start gap-4 hover:border-[#1D2927] hover:shadow-paper transition-all group">
              <div className="w-12 h-12 rounded-full bg-[#EAE5DB] flex items-center justify-center font-editorial text-2xl text-[#1D2927] shrink-0 border border-[#D9D3C7] group-hover:border-[#1D2927] transition-colors">
                {supporter.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#1D2927] truncate">{supporter.name}</h4>
                <div className="flex items-center gap-1 text-[#A84D2A] font-mono text-sm mt-1">
                  <Heart className="h-3 w-3 fill-current" /> ৳{supporter.amount.toLocaleString()}
                </div>
                <div className="text-[#53605C] font-mono text-[10px] uppercase tracking-widest mt-2">
                  {supporter.date}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {filteredSupporters.length === 0 && (
        <div className="text-center py-12 text-[#53605C] font-mono text-sm uppercase tracking-widest">
          No supporters found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
