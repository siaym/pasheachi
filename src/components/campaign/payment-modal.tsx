"use client";

import { useState } from "react";
import { Campaign } from "@/types";
import { PRESET_AMOUNTS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";

interface PaymentModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ campaign, isOpen, onClose }: PaymentModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [amount, setAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket" | "bank">("bkash");

  // Transaction form states
  const [trxId, setTrxId] = useState<string>("");
  const [senderNumber, setSenderNumber] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentAmount = customAmount ? Number(customAmount) || 0 : amount;

  const MFS_NUMBERS = {
    bkash: "01712345678",
    nagad: "01912345678",
    rocket: "01812345678",
    bank: "DBBL Acc: 123-456-7890 (PasheAchi BD)",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(MFS_NUMBERS[paymentMethod]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitTrx = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep(5);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-400"
        >
          <X className="h-5 w-5" />
        </button>

        {/* STEP 1: Choose Amount & Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
                Step 1 of 4 • Support Cause
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
                Support {campaign.title}
              </h2>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Choose Amount (৳)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`h-11 rounded-xl text-xs font-bold transition-all ${
                      amount === amt && !customAmount
                        ? "bg-[#10B981] text-white shadow-md shadow-[#10B981]/25"
                        : "border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    ৳{amt}
                  </button>
                ))}
              </div>

              <Input
                type="number"
                placeholder="Or enter custom amount in ৳"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount(Number(e.target.value) || 0);
                }}
              />
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-slate-300 text-[#10B981] focus:ring-[#10B981]"
                />
                <span>Donate Anonymously (Hide your name publicly)</span>
              </label>

              {!isAnonymous && (
                <Input
                  label="Display Name (Optional)"
                  placeholder="e.g. Arif Ahmed"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              )}

              <Input
                label="Support Message / Prayer (Optional)"
                placeholder="Write an encouraging message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Button
              size="lg"
              onClick={() => setStep(2)}
              disabled={currentAmount <= 0}
              className="w-full font-bold gap-2"
            >
              <span>Continue to Payment ({formatCurrency(currentAmount)})</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* STEP 2: Choose Payment Method */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <span className="text-xs font-bold text-[#10B981]">
                Amount: {formatCurrency(currentAmount)}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Choose Payment Method
            </h2>

            <div className="space-y-3">
              {[
                { id: "bkash", name: "bKash Send Money", desc: "Personal account transfer", icon: Smartphone },
                { id: "nagad", name: "Nagad Send Money", desc: "Personal account transfer", icon: Smartphone },
                { id: "rocket", name: "Rocket Send Money", desc: "Personal account transfer", icon: Smartphone },
                { id: "bank", name: "Direct Bank Transfer", desc: "DBBL / City Bank transfer", icon: Building },
              ].map((m) => {
                const Icon = m.icon;
                const selected = paymentMethod === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as "bkash" | "nagad" | "rocket" | "bank")}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selected
                        ? "border-[#10B981] bg-[#ECFDF5]/50 dark:bg-[#10B981]/10"
                        : "border-slate-100 bg-white hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{m.name}</h4>
                        <p className="text-xs text-slate-500">{m.desc}</p>
                      </div>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                        selected ? "border-[#10B981] bg-[#10B981] text-white" : "border-slate-300"
                      }`}
                    >
                      {selected && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <Button size="lg" onClick={() => setStep(3)} className="w-full font-bold">
              Continue to Instructions →
            </Button>
          </div>
        )}

        {/* STEP 3: Payment Instructions */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <span className="text-xs font-bold text-[#10B981]">
                Send {formatCurrency(currentAmount)}
              </span>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-950/40 text-center space-y-3">
              <h3 className="font-bold text-base text-[#047857] dark:text-emerald-300">
                📱 Send {formatCurrency(currentAmount)} via {paymentMethod.toUpperCase()}
              </h3>

              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <p>1. Open your {paymentMethod.toUpperCase()} App</p>
                <p>2. Select <strong>"Send Money"</strong></p>
                <p>3. Enter receiver number below:</p>
              </div>

              {/* Number Copy Box */}
              <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 border border-emerald-200 dark:bg-slate-900 dark:border-slate-800">
                <span className="font-mono text-base font-bold text-slate-900 dark:text-white">
                  {MFS_NUMBERS[paymentMethod]}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs font-bold text-[#10B981] hover:underline"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              <p className="text-[11px] text-amber-700 font-semibold dark:text-amber-300">
                ⚠️ Save your Transaction ID from the SMS confirmation to verify below.
              </p>
            </div>

            <Button size="lg" onClick={() => setStep(4)} className="w-full font-bold">
              I've Completed Payment →
            </Button>
          </div>
        )}

        {/* STEP 4: Submit Transaction Details */}
        {step === 4 && (
          <form onSubmit={handleSubmitTrx} className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <span className="text-xs font-bold text-[#10B981]">Verify Payment</span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Enter Transaction Details
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your transaction info for manual verification
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Transaction ID (TRX ID) *"
                required
                placeholder="e.g. TXN8A3F2K12"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                helperText="Found in your MFS SMS confirmation message"
              />

              <Input
                label="Amount Sent (৳) *"
                required
                type="number"
                value={currentAmount}
                disabled
              />

              <Input
                label={`Your ${paymentMethod.toUpperCase()} Sender Number *`}
                required
                placeholder="017XXXXXXXX"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
              />
            </div>

            <Button
              size="lg"
              type="submit"
              isLoading={submitting}
              disabled={!trxId || !senderNumber}
              className="w-full font-bold gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Confirm & Submit Support</span>
            </Button>

            <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
              <Lock className="h-3 w-3" /> Information is securely transmitted to PasheAchi audit queue
            </p>
          </form>
        )}

        {/* STEP 5: Success & Verification Notice */}
        {step === 5 && (
          <div className="text-center space-y-6 py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-[#10B981] animate-bounce">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Thank You for Your Support!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-sm mx-auto">
                Your payment of <strong>{formatCurrency(currentAmount)}</strong> has been submitted. It is now in our verification queue.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left text-xs space-y-2 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{trxId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Method:</span>
                <span className="font-bold capitalize">{paymentMethod} Send Money</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-amber-600">⏳ Pending Audit (1-24 hrs)</span>
              </div>
            </div>

            <Button size="lg" onClick={onClose} className="w-full font-bold">
              Done & Return to Campaign
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
