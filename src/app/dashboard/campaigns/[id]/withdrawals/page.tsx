"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { ArrowRight, Building2, CheckCircle2, Clock, Landmark, Smartphone } from "lucide-react";
import { useState } from "react";

const MOCK_WITHDRAWALS = [
  { id: "WD-A7B29F", date: "July 20, 2026", amount: 20000, method: "Bank Transfer", status: "completed" },
  { id: "WD-C4D81E", date: "July 15, 2026", amount: 10000, method: "bKash", status: "completed" },
];

export default function CampaignWithdrawalsPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [isRequesting, setIsRequesting] = useState(false);

  const availableBalance = 14500; // Mock verified balance left

  const handleRequest = () => {
    setIsRequesting(true);
    setTimeout(() => {
      setIsRequesting(false);
      setAmount("");
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl text-[#1D2927] mb-2">Withdrawals</h2>
          <p className="text-[#53605C]">
            Request payouts from your verified campaign funds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Request Form */}
        <div className="lg:col-span-2 space-y-8">
          
          <PaperLift className="bg-[#1D2927] p-8 text-[#F7F4ED] relative overflow-hidden">
            <div className="absolute -right-12 -top-12 opacity-10">
              <Landmark className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#D9D3C7] mb-2">
                Available Verified Balance
              </div>
              <div className="font-editorial text-5xl">
                ৳{availableBalance.toLocaleString()}
              </div>
              <p className="text-xs text-[#D9D3C7] mt-4 max-w-sm">
                Funds become available for withdrawal 3 days after a donation is successfully verified.
              </p>
            </div>
          </PaperLift>

          <FadeIn delay={0.1}>
            <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 sm:p-8 space-y-6">
              <h3 className="font-editorial text-xl text-[#1D2927] border-b border-[#D9D3C7] pb-2">
                Request Payout
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                    Withdrawal Amount (৳)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    max={availableBalance}
                    className="w-full bg-transparent border-b border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-xl text-[#1D2927] outline-none transition-colors"
                  />
                  {Number(amount) > availableBalance && (
                    <div className="text-red-500 font-mono text-[10px] mt-1">Amount exceeds available balance</div>
                  )}
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-3">
                    Payout Method
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className={`border p-4 cursor-pointer transition-colors flex items-center gap-3 ${method === 'bank' ? 'border-[#1D2927] bg-[#EAE5DB]' : 'border-[#D9D3C7] hover:border-[#1D2927]'}`}>
                      <input type="radio" name="method" value="bank" checked={method === 'bank'} onChange={() => setMethod('bank')} className="sr-only" />
                      <Building2 className="h-5 w-5 text-[#1D2927]" />
                      <div>
                        <div className="font-bold text-[#1D2927] text-sm">Bank Transfer</div>
                        <div className="font-mono text-[10px] text-[#53605C]">Dutch Bangla Bank (***4092)</div>
                      </div>
                    </label>
                    <label className={`border p-4 cursor-pointer transition-colors flex items-center gap-3 ${method === 'mfs' ? 'border-[#1D2927] bg-[#EAE5DB]' : 'border-[#D9D3C7] hover:border-[#1D2927]'}`}>
                      <input type="radio" name="method" value="mfs" checked={method === 'mfs'} onChange={() => setMethod('mfs')} className="sr-only" />
                      <Smartphone className="h-5 w-5 text-[#1D2927]" />
                      <div>
                        <div className="font-bold text-[#1D2927] text-sm">bKash</div>
                        <div className="font-mono text-[10px] text-[#53605C]">+880 1712 *** 345</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={handleRequest}
                disabled={!amount || Number(amount) > availableBalance || Number(amount) <= 0 || isRequesting}
                className="w-full h-12 bg-[#1D2927] text-[#F7F4ED] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#FAF8F3] hover:text-[#1D2927] hover:border hover:border-[#1D2927] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-ink"
              >
                {isRequesting ? "Processing..." : "Submit Request"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: History */}
        <FadeIn delay={0.2} className="space-y-6">
          <h3 className="font-editorial text-2xl text-[#1D2927] border-b-2 border-[#1D2927] pb-2">History</h3>
          
          <div className="space-y-4">
            {MOCK_WITHDRAWALS.map((wd) => (
              <div key={wd.id} className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-mono text-sm font-bold text-[#1D2927]">৳{wd.amount.toLocaleString()}</div>
                    <div className="font-mono text-[10px] text-[#53605C] uppercase tracking-widest mt-1">{wd.method}</div>
                  </div>
                  {wd.status === "completed" ? (
                    <div className="flex items-center gap-1 text-[#2E4A3D] font-mono text-[10px] uppercase font-bold">
                      <CheckCircle2 className="h-3 w-3" /> Paid
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[#A84D2A] font-mono text-[10px] uppercase font-bold">
                      <Clock className="h-3 w-3" /> Pending
                    </div>
                  )}
                </div>
                <div className="border-t border-[#D9D3C7] pt-2 mt-2 flex justify-between font-mono text-[9px] text-[#53605C]">
                  <span>{wd.id}</span>
                  <span>{wd.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#EAE5DB] p-4 border-l-4 border-[#8C7A5B]">
            <p className="text-xs text-[#1D2927] leading-relaxed">
              <strong>Need help?</strong> Bank transfers usually take 2-3 business days. MFS transfers are processed within 24 hours. Contact <a href="#" className="underline">support</a> if a withdrawal is delayed.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
