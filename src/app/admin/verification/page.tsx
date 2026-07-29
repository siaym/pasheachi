"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { Check, X, ShieldCheck, Search, Smartphone, Filter } from "lucide-react";
import { useState } from "react";

// Mock data for pending transactions
const MOCK_PENDING_TX = [
  {
    id: "TX-998A",
    campaignName: "Mother's Cardiac Surgery",
    donor: "Anonymous",
    amount: 1500,
    method: "bKash",
    trxId: "8GH2KX91L",
    senderNo: "01712345345",
    time: "2 mins ago",
    status: "pending",
  },
  {
    id: "TX-998B",
    campaignName: "Flood Relief Sylhet",
    donor: "Tariqul",
    amount: 500,
    method: "Nagad",
    trxId: "NG72MQP0",
    senderNo: "01911222888",
    time: "15 mins ago",
    status: "pending",
  },
  {
    id: "TX-998C",
    campaignName: "University Tuition",
    donor: "Sara",
    amount: 2000,
    method: "bKash",
    trxId: "8GH5ZZ10B",
    senderNo: "01822333444",
    time: "1 hour ago",
    status: "pending",
  }
];

export default function AdminVerificationPage() {
  const [transactions, setTransactions] = useState(MOCK_PENDING_TX);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    // In reality, this makes an API call
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const filteredTx = transactions.filter(tx => 
    tx.trxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.senderNo.includes(searchTerm)
  );

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9D3C7] pb-6">
        <div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1D2927] mb-2">
            Verification Queue
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Manual Audit ({transactions.length} Pending)
          </p>
        </div>
      </FadeIn>

      {/* Toolbar */}
      <FadeIn delay={0.1} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7A5B]" />
          <input
            type="text"
            placeholder="Search TrxID or Sender No..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF8F3] border border-[#D9D3C7] focus:border-[#1E3A8A] pl-10 pr-4 py-2 font-mono text-sm outline-none transition-colors shadow-sm"
          />
        </div>
        <button className="h-10 px-4 bg-[#FAF8F3] border border-[#D9D3C7] text-[#1D2927] flex items-center justify-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:border-[#1E3A8A] transition-colors">
          <Filter className="h-4 w-4" /> Filter Method
        </button>
      </FadeIn>

      {/* Queue List */}
      <div className="space-y-4">
        {filteredTx.length === 0 ? (
          <FadeIn>
            <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-12 text-center flex flex-col items-center">
              <ShieldCheck className="h-12 w-12 text-[#D9D3C7] mb-4" />
              <h3 className="font-editorial text-2xl text-[#1D2927]">Queue Empty!</h3>
              <p className="text-[#53605C] mt-2">All manual transactions have been verified.</p>
            </div>
          </FadeIn>
        ) : (
          filteredTx.map((tx, idx) => (
            <FadeIn key={tx.id} delay={idx * 0.05}>
              <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-[#1E3A8A] transition-colors">
                
                {/* Details */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1">Method</div>
                    <div className="flex items-center gap-1.5 font-bold text-sm text-[#1D2927]">
                      <Smartphone className="h-4 w-4 text-[#8C7A5B]" /> {tx.method}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1">TrxID</div>
                    <div className="font-mono text-sm font-bold text-[#1E3A8A]">{tx.trxId}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1">Sender No</div>
                    <div className="font-mono text-sm text-[#1D2927]">{tx.senderNo}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1">Amount</div>
                    <div className="font-editorial text-xl text-[#1D2927]">৳{tx.amount.toLocaleString()}</div>
                  </div>
                </div>

                {/* Context & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto shrink-0 border-t lg:border-t-0 lg:border-l border-[#D9D3C7] pt-4 lg:pt-0 lg:pl-6">
                  <div className="text-left lg:text-right hidden sm:block">
                    <div className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] truncate max-w-[150px]">{tx.campaignName}</div>
                    <div className="font-mono text-[9px] text-[#8C7A5B]">{tx.time}</div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => handleAction(tx.id, 'approve')}
                      className="flex-1 sm:flex-none h-10 w-10 bg-[#10B981] text-white hover:bg-[#059669] flex items-center justify-center transition-colors shadow-sm"
                      title="Approve"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleAction(tx.id, 'reject')}
                      className="flex-1 sm:flex-none h-10 w-10 border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                      title="Reject"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

              </PaperLift>
            </FadeIn>
          ))
        )}
      </div>
    </div>
  );
}
