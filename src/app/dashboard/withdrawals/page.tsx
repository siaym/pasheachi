"use client";

import { useState } from "react";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import { Wallet, X, CheckCircle2, Clock } from "lucide-react";

const MOCK_WITHDRAWALS = [
  {
    id: "w-1",
    amount: 15000,
    method: "bKash",
    account: "01712345678",
    date: "Jul 10, 2026",
    status: "completed",
  },
  {
    id: "w-2",
    amount: 10000,
    method: "Nagad",
    account: "01912345678",
    date: "Jul 5, 2026",
    status: "completed",
  },
  {
    id: "w-3",
    amount: 5875,
    method: "bKash",
    account: "01712345678",
    date: "Today",
    status: "pending",
  },
];

export default function WithdrawalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [method, setMethod] = useState("bkash");
  const [accountNo, setAccountNo] = useState("01712345678");
  const [submitting, setSubmitting] = useState(false);

  const availableBalance = 30875;

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#D9D3C7] pb-6">
        <div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927] mb-2">
            Fund <span className="italic text-[#8C7A5B]">Withdrawals</span>
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Transfer campaign earnings to your MFS or Bank
          </p>
        </div>
      </FadeIn>

      {/* Balance Card - Paper Document Style */}
      <FadeIn delay={0.1}>
        <PaperLift className="bg-[#FAF8F3] border border-[#1D2927] shadow-paper p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 relative overflow-hidden">
          {/* Decorative stamp */}
          <div className="absolute right-32 top-8 rotate-[15deg] opacity-20 pointer-events-none mix-blend-multiply hidden md:block">
            <div className="w-24 h-24 rounded-full border-4 border-double border-[#A84D2A] flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-[#A84D2A] uppercase tracking-widest -rotate-[15deg]">Verified</span>
            </div>
          </div>
          
          <div className="relative z-10">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-2 block">
              Available Balance (After 5% Platform Fee)
            </span>
            <div className="font-editorial text-5xl sm:text-6xl text-[#1D2927] mb-4">
              {formatCurrency(availableBalance)}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
              Ready for payout • Min withdrawal ৳500
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-8 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] font-bold text-xs uppercase tracking-widest hover:bg-[#1D2927]/90 shadow-ink transition-all flex items-center gap-2 shrink-0 z-10"
          >
            <Wallet className="h-4 w-4" />
            Request Payout
          </button>
        </PaperLift>
      </FadeIn>

      {/* Withdrawal History Ledger */}
      <FadeIn delay={0.2} className="space-y-4">
        <h2 className="font-editorial text-2xl text-[#1D2927] border-b border-[#D9D3C7] pb-2">
          Payout History
        </h2>

        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#EAE5DB] text-[#1D2927] uppercase tracking-widest border-b border-[#1D2927]">
                <tr>
                  <th className="p-4 font-bold">Amount</th>
                  <th className="p-4 font-bold">Method</th>
                  <th className="p-4 font-bold">Account</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D3C7]">
                {MOCK_WITHDRAWALS.map((w) => (
                  <tr key={w.id} className="hover:bg-[#F7F4ED] transition-colors">
                    <td className="p-4 font-bold text-[#1D2927]">
                      {formatCurrency(w.amount)}
                    </td>
                    <td className="p-4 text-[#53605C] uppercase">{w.method}</td>
                    <td className="p-4 text-[#8C7A5B]">{w.account}</td>
                    <td className="p-4 text-[#53605C]">{w.date}</td>
                    <td className="p-4 text-right">
                      {w.status === "completed" && (
                        <span className="inline-flex items-center gap-1 border border-[#1D2927] px-2 py-0.5 text-[#1D2927] font-bold bg-[#EAE5DB] text-[9px] uppercase tracking-widest">
                          <CheckCircle2 className="h-3 w-3 text-[#10B981]" /> Completed
                        </span>
                      )}
                      {w.status === "pending" && (
                        <span className="inline-flex items-center gap-1 border border-[#A84D2A] px-2 py-0.5 text-[#A84D2A] font-bold bg-[#F7F4ED] text-[9px] uppercase tracking-widest">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PaperLift>
      </FadeIn>

      {/* Modal - Paper Form Style */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2927]/80 backdrop-blur-sm">
          <PaperLift className="relative w-full max-w-md bg-[#FAF8F3] border border-[#D9D3C7] shadow-paper p-8 space-y-8 animate-in fade-in zoom-in duration-300">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-[#1D2927] hover:text-[#A84D2A] transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#53605C] mb-2 pl-3 border-l-2 border-[#A84D2A]">
                Form 104-B
              </div>
              <h3 className="font-editorial text-3xl text-[#1D2927]">
                Withdrawal Slip
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C] mt-2">
                Available: <span className="font-bold text-[#1D2927]">{formatCurrency(availableBalance)}</span>
              </p>
            </div>

            <form onSubmit={handleRequest} className="space-y-6">
              <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B]">
                  Payout Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="h-12 w-full bg-transparent border-b border-[#D9D3C7] font-editorial text-xl italic text-[#1D2927] focus:outline-none focus:border-[#1D2927] cursor-pointer"
                >
                  <option value="bkash">bKash Personal</option>
                  <option value="nagad">Nagad Personal</option>
                  <option value="rocket">Rocket Personal</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B]">
                  Account Number
                </label>
                <input
                  type="text"
                  required
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  className="h-12 w-full bg-transparent border-b border-[#D9D3C7] font-mono text-xl text-[#1D2927] focus:outline-none focus:border-[#1D2927]"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B]">
                  Amount (৳)
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 15000"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="h-12 w-full bg-transparent border-b border-[#D9D3C7] font-mono text-xl text-[#1D2927] focus:outline-none focus:border-[#1D2927] placeholder:text-[#D9D3C7]"
                />
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] pt-1">
                  Min ৳500 • Max ৳30,875
                </p>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full h-12 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] font-bold text-xs uppercase tracking-widest hover:bg-[#1D2927]/90 shadow-ink transition-all mt-4"
              >
                {submitting ? "Processing..." : "Authorize Payout"}
              </button>
            </form>
          </PaperLift>
        </div>
      )}
    </div>
  );
}
