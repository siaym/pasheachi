"use client";

import { Container } from "@/components/layout/container";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { MOCK_TRANSACTIONS } from "@/data/mock";
import { Download, Search, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";

export default function CampaignDonationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = MOCK_TRANSACTIONS.filter((trx) => 
    trx.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trx.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl text-[#1D2927] mb-2">Donations Ledger</h2>
          <p className="text-[#53605C]">
            View all transactions and verification statuses for this campaign.
          </p>
        </div>
        <button className="h-10 px-4 border border-[#1D2927] bg-[#EAE5DB] hover:bg-[#1D2927] hover:text-[#F7F4ED] font-mono text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* Filters and Search */}
      <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7A5B]" />
          <input
            type="text"
            placeholder="Search by name, TrxID, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-[#D9D3C7] focus:border-[#1D2927] outline-none font-mono text-sm text-[#1D2927] placeholder:text-[#8C7A5B]"
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">Status:</span>
          <select className="bg-transparent border-b border-[#D9D3C7] focus:border-[#1D2927] outline-none font-mono text-sm text-[#1D2927] cursor-pointer">
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </PaperLift>

      {/* Ledger Table */}
      <FadeIn delay={0.2}>
        <div className="bg-[#FAF8F3] border border-[#1D2927] overflow-x-auto shadow-paper">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-[#1D2927] bg-[#EAE5DB]">
                <th className="p-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927]">Date & Time</th>
                <th className="p-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927]">Donor Info</th>
                <th className="p-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927]">Transaction Details</th>
                <th className="p-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927] text-right">Amount</th>
                <th className="p-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927] text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="border-b border-[#D9D3C7] hover:bg-[#EAE5DB]/50 transition-colors">
                  <td className="p-4 align-top">
                    <div className="font-mono text-sm text-[#1D2927]">{trx.date}</div>
                    <div className="font-mono text-[10px] text-[#53605C]">{trx.time}</div>
                  </td>
                  <td className="p-4 align-top">
                    <div className="font-bold text-sm text-[#1D2927]">{trx.donorName}</div>
                    <div className="font-mono text-[10px] text-[#53605C]">{trx.phone}</div>
                  </td>
                  <td className="p-4 align-top">
                    <div className="font-mono text-xs text-[#1D2927] mb-1">{trx.id}</div>
                    <div className="inline-block px-2 py-0.5 bg-[#EAE5DB] border border-[#D9D3C7] font-mono text-[9px] uppercase tracking-widest text-[#53605C]">
                      {trx.method}
                    </div>
                  </td>
                  <td className="p-4 align-top text-right">
                    <div className="font-mono text-sm font-bold text-[#1D2927]">৳{trx.amount.toLocaleString()}</div>
                  </td>
                  <td className="p-4 align-top text-center">
                    {trx.status === "verified" ? (
                      <div className="inline-flex items-center gap-1 text-[#2E4A3D] font-mono text-[10px] uppercase tracking-widest font-bold">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 text-[#A84D2A] font-mono text-[10px] uppercase tracking-widest font-bold">
                        <Clock className="h-3 w-3" /> Pending
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#53605C]">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </div>
  );
}
