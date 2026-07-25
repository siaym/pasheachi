"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import { Download, Search } from "lucide-react";

const MOCK_DONORS = [
  {
    id: "d-1",
    name: "Arif Ahmed",
    amount: 5000,
    method: "bKash",
    date: "Jul 18, 2026",
    message: "Stay strong brother! Praying for complete recovery.",
    isAnonymous: false,
    status: "verified",
  },
  {
    id: "d-2",
    name: "Fatema Tuz",
    amount: 3000,
    method: "Nagad",
    date: "Jul 17, 2026",
    message: "May Allah bless your noble initiative.",
    isAnonymous: false,
    status: "verified",
  },
  {
    id: "d-3",
    name: "Anonymous Supporter",
    amount: 2000,
    method: "bKash",
    date: "Jul 16, 2026",
    message: "❤️",
    isAnonymous: true,
    status: "verified",
  },
  {
    id: "d-4",
    name: "Karim Hossain",
    amount: 1000,
    method: "Rocket",
    date: "Jul 15, 2026",
    message: "Small token of support.",
    isAnonymous: false,
    status: "verified",
  },
];

export default function DonorManagementPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#D9D3C7] pb-6">
        <div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927] mb-2">
            Donor <span className="italic text-[#8C7A5B]">Records</span>
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Total 128 supporters • ৳32,500 recorded
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-10 px-4 border border-[#1D2927] text-[#1D2927] font-bold text-xs uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" /> CSV
          </button>
          <button className="h-10 px-4 border border-[#1D2927] text-[#1D2927] font-bold text-xs uppercase tracking-widest hover:bg-[#EAE5DB] transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" /> Excel
          </button>
        </div>
      </FadeIn>

      {/* Donors Ledger Card */}
      <FadeIn delay={0.1}>
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] shadow-sm overflow-hidden">
          
          <div className="p-6 border-b border-[#D9D3C7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F7F4ED]">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8C7A5B]" />
              <input
                type="text"
                placeholder="Search donor name or message..."
                className="h-9 w-full bg-transparent border-b border-[#D9D3C7] pl-9 pr-3 text-sm font-editorial italic text-[#1D2927] focus:outline-none focus:border-[#1D2927] placeholder:text-[#8C7A5B]"
              />
            </div>

            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C]">
              Showing {MOCK_DONORS.length} recent entries
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#EAE5DB] text-[#1D2927] uppercase tracking-widest border-b border-[#1D2927]">
                <tr>
                  <th className="p-4 font-bold">Donor Name</th>
                  <th className="p-4 font-bold">Amount</th>
                  <th className="p-4 font-bold">Method</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">Message</th>
                  <th className="p-4 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D3C7]">
                {MOCK_DONORS.map((donor) => (
                  <tr key={donor.id} className="hover:bg-[#F7F4ED] transition-colors">
                    <td className="p-4">
                      <div>
                        <span className="font-bold text-[#1D2927]">
                          {donor.isAnonymous ? "Anonymous Supporter" : donor.name}
                        </span>
                        {donor.isAnonymous && (
                          <span className="block text-[9px] text-[#A84D2A] uppercase tracking-widest mt-1">Hidden from public</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-[#1D2927]">
                      {formatCurrency(donor.amount)}
                    </td>
                    <td className="p-4 text-[#53605C] uppercase">
                      {donor.method}
                    </td>
                    <td className="p-4 text-[#53605C]">
                      {donor.date}
                    </td>
                    <td className="p-4 text-[#53605C] max-w-xs truncate font-editorial text-sm italic">
                      {donor.message ? `"${donor.message}"` : "—"}
                    </td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center gap-1 border border-[#1D2927] px-2 py-0.5 text-[#1D2927] font-bold bg-[#EAE5DB] text-[9px] uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> {donor.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PaperLift>
      </FadeIn>
    </div>
  );
}
