"use client";

import { useState } from "react";
import { Campaign } from "@/types";
import { PRESET_AMOUNTS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  CheckCircle2,
  Lock,
  Smartphone,
  Building,
  Paperclip,
} from "lucide-react";
import { FadeIn, PaperLift } from "../ui/motion";
import { submitDonationAction } from "@/app/[username]/[campaign]/actions";

interface PaymentModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ campaign, isOpen, onClose }: PaymentModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [amount, setAmount] = useState<number>(campaign.campaignType === "fixed" ? (campaign.fixedAmount || 0) : 250);
  const [customAmount, setCustomAmount] = useState<string>("");

  const MFS_NUMBERS = {
    bkash: "01712345678",
    nagad: "01912345678",
    rocket: "01812345678",
    bank: "DBBL Acc: 123-456-7890 (PasheAchi BD)",
  };
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const availableMethods = ["bkash", "nagad", "rocket", "bank"].filter(
    (m) => !campaign.paymentDetails || !!(campaign.paymentDetails as any)[m] || (!campaign.paymentDetails && (MFS_NUMBERS as any)[m])
  );
  
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket" | "bank">(
    (availableMethods[0] as "bkash" | "nagad" | "rocket" | "bank") || "bkash"
  );

  // Transaction form states
  const [trxId, setTrxId] = useState<string>("");
  const [senderNumber, setSenderNumber] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentAmount = customAmount ? Number(customAmount) || 0 : amount;

  const getPaymentNumber = (method: string) => {
    if (campaign.paymentDetails && (campaign.paymentDetails as any)[method]) {
      return (campaign.paymentDetails as any)[method];
    }
    return (MFS_NUMBERS as any)[method];
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getPaymentNumber(paymentMethod));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitTrx = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("campaignId", campaign.id);
      if (!isAnonymous && displayName) formData.append("donorName", displayName);
      formData.append("phone", senderNumber);
      formData.append("amount", currentAmount.toString());
      formData.append("method", paymentMethod);
      formData.append("referenceId", trxId);

      const result = await submitDonationAction(formData);
      
      if (result.error) {
        alert(result.error);
        setSubmitting(false);
        return;
      }
      
      setStep(5);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D2927]/60 backdrop-blur-sm animate-in fade-in">
      <PaperLift className="relative w-full max-w-lg bg-[#FAF8F3] border-2 border-[#1D2927] p-6 sm:p-8 shadow-[8px_8px_0_0_#1D2927] overflow-hidden">
        
        {/* Decorative Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#EAE5DB] opacity-80 rotate-[-1deg] z-20"></div>

        {/* Paperclip */}
        <div className="absolute -top-3 -left-3 z-20 text-[#8C7A5B] rotate-[-15deg]">
          <Paperclip className="h-8 w-8 stroke-[1.5]" />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-[#1D2927] text-[#1D2927] hover:bg-[#EAE5DB] transition-colors z-20"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mt-4">
          {/* STEP 1: Choose Amount & Details */}
          {step === 1 && (
            <FadeIn className="space-y-6">
              <div className="border-b border-dashed border-[#D9D3C7] pb-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A]">
                  Ledger Entry • Step 1 of 4
                </span>
                <h2 className="font-editorial text-3xl text-[#1D2927] mt-2 line-clamp-1">
                  Support {campaign.title}
                </h2>
              </div>

              <div className="space-y-4">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C]">
                  {campaign.campaignType === "fixed" ? "Fixed Contribution Required (৳)" : "Select Amount (৳)"}
                </label>

                {campaign.campaignType === "fixed" ? (
                  <div className="h-12 w-full border border-[#D9D3C7] bg-[#EAE5DB] px-4 flex items-center font-mono text-sm text-[#1D2927] cursor-not-allowed">
                    {campaign.fixedAmount || 0}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-5 gap-2">
                      {PRESET_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setAmount(amt);
                            setCustomAmount("");
                          }}
                          className={`h-12 border transition-all font-mono text-sm ${
                            amount === amt && !customAmount
                              ? "border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] shadow-ink scale-[0.98]"
                              : "border-[#D9D3C7] bg-transparent text-[#1D2927] hover:border-[#1D2927] hover:bg-[#EAE5DB]"
                          }`}
                        >
                          {amt}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[#53605C]">৳</span>
                      <input
                        type="number"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setAmount(Number(e.target.value) || 0);
                        }}
                        className="h-12 w-full border border-[#D9D3C7] bg-[#F7F4ED] pl-8 pr-4 font-mono text-sm text-[#1D2927] placeholder:text-[#8C7A5B] focus:border-[#1D2927] focus:outline-none focus:ring-1 focus:ring-[#1D2927] transition-all"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-[#D9D3C7]">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                    isAnonymous ? "border-[#1D2927] bg-[#1D2927]" : "border-[#D9D3C7] bg-[#F7F4ED]"
                  }`}>
                    {isAnonymous && <Check className="h-3 w-3 text-[#F7F4ED]" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="hidden"
                  />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927] group-hover:text-[#A84D2A] transition-colors">
                    Make this anonymous
                  </span>
                </label>

                {!isAnonymous && (
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1.5">
                      Display Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Arif Ahmed"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="h-10 w-full border border-[#D9D3C7] bg-[#F7F4ED] px-4 font-mono text-sm text-[#1D2927] placeholder:text-[#8C7A5B] focus:border-[#1D2927] focus:outline-none transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-1.5">
                    Support Message (Optional)
                  </label>
                  <textarea
                    placeholder="Write an encouraging message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[80px] w-full border border-[#D9D3C7] bg-[#F7F4ED] p-4 font-mono text-sm text-[#1D2927] placeholder:text-[#8C7A5B] focus:border-[#1D2927] focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={currentAmount <= 0}
                className="w-full h-12 bg-[#1D2927] text-[#F7F4ED] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#2A3B38] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Continue ({formatCurrency(currentAmount)})</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </FadeIn>
          )}

          {/* STEP 2: Choose Payment Method */}
          {step === 2 && (
            <FadeIn className="space-y-6">
              <div className="flex items-center justify-between border-b border-dashed border-[#D9D3C7] pb-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C] hover:text-[#1D2927]"
                >
                  <ArrowLeft className="h-3 w-3" /> Back
                </button>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A]">
                  Step 2 of 4
                </span>
              </div>

              <h2 className="font-editorial text-3xl text-[#1D2927]">
                Payment Method
              </h2>

              <div className="space-y-3">
                {[
                  { id: "bkash", name: "bKash Send Money", desc: "Personal account transfer", icon: Smartphone },
                  { id: "nagad", name: "Nagad Send Money", desc: "Personal account transfer", icon: Smartphone },
                  { id: "rocket", name: "Rocket Send Money", desc: "Personal account transfer", icon: Smartphone },
                  { id: "bank", name: "Direct Bank Transfer", desc: "DBBL / City Bank transfer", icon: Building },
                ].filter(m => availableMethods.includes(m.id)).map((m) => {
                  const Icon = m.icon;
                  const selected = paymentMethod === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as "bkash" | "nagad" | "rocket" | "bank")}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                        selected
                          ? "border-[#1D2927] bg-[#EAE5DB]"
                          : "border-[#D9D3C7] bg-[#F7F4ED] hover:border-[#1D2927]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center border border-[#1D2927] bg-[#FAF8F3] text-[#1D2927]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#1D2927]">{m.name}</h4>
                          <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mt-1">{m.desc}</p>
                        </div>
                      </div>
                      <div
                        className={`h-5 w-5 border flex items-center justify-center ${
                          selected ? "border-[#1D2927] bg-[#1D2927] text-[#F7F4ED]" : "border-[#D9D3C7]"
                        }`}
                      >
                        {selected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => setStep(3)} 
                className="w-full h-12 border border-[#1D2927] text-[#1D2927] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#EAE5DB] transition-colors"
              >
                <span>View Instructions</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </FadeIn>
          )}

          {/* STEP 3: Payment Instructions */}
          {step === 3 && (
            <FadeIn className="space-y-6">
              <div className="flex items-center justify-between border-b border-dashed border-[#D9D3C7] pb-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C] hover:text-[#1D2927]"
                >
                  <ArrowLeft className="h-3 w-3" /> Back
                </button>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A]">
                  Step 3 of 4
                </span>
              </div>

              <div className="border border-[#1D2927] bg-[#F7F4ED] p-6 text-center space-y-4">
                <h3 className="font-editorial text-2xl text-[#1D2927]">
                  Send {formatCurrency(currentAmount)} via {paymentMethod.toUpperCase()}
                </h3>

                <div className="space-y-2 font-mono text-[11px] uppercase tracking-widest text-[#53605C] text-left mx-auto max-w-xs">
                  <p>1. Open your {paymentMethod.toUpperCase()} App</p>
                  <p>2. Select <strong>"Send Money"</strong></p>
                  <p>3. Enter receiver number below:</p>
                </div>

                {/* Number Copy Box */}
                <div className="flex items-center justify-between bg-[#EAE5DB] px-4 py-3 border border-[#D9D3C7]">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#1D2927] whitespace-pre-wrap text-left">
                    {getPaymentNumber(paymentMethod)}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A] hover:text-[#1D2927] transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="p-3 border border-dashed border-[#A84D2A] bg-[#FAF8F3] mt-4">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#A84D2A]">
                    <strong className="block mb-1">Important</strong>
                    Save your Transaction ID from the SMS confirmation to verify on the next step.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setStep(4)} 
                className="w-full h-12 bg-[#1D2927] text-[#F7F4ED] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#2A3B38] transition-colors shadow-ink"
              >
                Payment Completed <ArrowRight className="h-4 w-4" />
              </button>
            </FadeIn>
          )}

          {/* STEP 4: Submit Transaction Details */}
          {step === 4 && (
            <FadeIn>
              <form onSubmit={handleSubmitTrx} className="space-y-6">
                <div className="flex items-center justify-between border-b border-dashed border-[#D9D3C7] pb-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C] hover:text-[#1D2927]"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A]">
                    Step 4 of 4
                  </span>
                </div>

                <div>
                  <h2 className="font-editorial text-3xl text-[#1D2927]">
                    Verify Transaction
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C] mt-2">
                    Enter details for manual audit
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#1D2927] mb-1.5">
                      Transaction ID (TRX ID) *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. TXN8A3F2K12"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                      className="h-10 w-full border border-[#D9D3C7] bg-[#F7F4ED] px-4 font-mono text-sm text-[#1D2927] placeholder:text-[#8C7A5B] focus:border-[#1D2927] focus:outline-none transition-all uppercase"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#53605C] mb-1.5">
                      Amount Sent (৳)
                    </label>
                    <input
                      type="number"
                      value={currentAmount}
                      disabled
                      className="h-10 w-full border border-[#D9D3C7] bg-[#EAE5DB] px-4 font-mono text-sm text-[#53605C] cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#1D2927] mb-1.5">
                      Your {paymentMethod.toUpperCase()} Number *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="017XXXXXXXX"
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      className="h-10 w-full border border-[#D9D3C7] bg-[#F7F4ED] px-4 font-mono text-sm text-[#1D2927] placeholder:text-[#8C7A5B] focus:border-[#1D2927] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!trxId || !senderNumber || submitting}
                  className="w-full h-12 bg-[#1D2927] text-[#F7F4ED] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#2A3B38] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-ink"
                >
                  {submitting ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Submit Verification</span>
                    </>
                  )}
                </button>

                <p className="font-mono text-[9px] uppercase tracking-widest text-[#8C7A5B] text-center flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3" /> Secured by PasheAchi Audit
                </p>
              </form>
            </FadeIn>
          )}

          {/* STEP 5: Success & Verification Notice */}
          {step === 5 && (
            <FadeIn className="text-center space-y-6 py-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center border-2 border-dashed border-[#1D2927] rounded-full text-[#1D2927]">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div>
                <h2 className="font-editorial text-4xl text-[#1D2927]">
                  Thank You
                </h2>
                <p className="font-mono text-xs leading-relaxed text-[#53605C] mt-4 max-w-sm mx-auto">
                  Your payment of <strong>{formatCurrency(currentAmount)}</strong> is in the audit queue.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="border border-[#1D2927] bg-[#F7F4ED] p-6 text-left text-xs space-y-4">
                <div className="flex justify-between border-b border-dashed border-[#D9D3C7] pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">TRX ID:</span>
                  <span className="font-mono font-bold text-[#1D2927]">{trxId}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-[#D9D3C7] pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">Method:</span>
                  <span className="font-mono font-bold text-[#1D2927] capitalize">{paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">Status:</span>
                  <span className="font-mono font-bold text-[#A84D2A]">Pending Audit</span>
                </div>
                
                <div className="mt-8 pt-4 border-t border-[#1D2927] text-right">
                  <span className="font-script text-xl text-[#1D2927] -rotate-2 inline-block">PasheAchi</span>
                </div>
              </div>

              <button 
                onClick={onClose} 
                className="w-full h-12 border border-[#1D2927] text-[#1D2927] font-bold text-xs uppercase tracking-widest flex items-center justify-center hover:bg-[#EAE5DB] transition-colors"
              >
                Return to Campaign
              </button>
            </FadeIn>
          )}
        </div>
      </PaperLift>
    </div>
  );
}
