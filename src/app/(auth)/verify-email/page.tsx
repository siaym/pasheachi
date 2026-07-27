"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { verifyEmailAction } from "../actions";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const [email, setEmail] = useState(emailParam);
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", code);

    startTransition(async () => {
      const res = await verifyEmailAction(formData);
      if (res?.error) {
        setErrorMsg(res.error);
      }
    });
  };

  return (
    <div className="min-h-screen pt-40 pb-20 bg-[#F7F4ED] flex items-center justify-center px-4">
      <FadeIn className="max-w-md w-full">
        <PaperLift className="bg-[#FAF8F3] border-2 border-[#1D2927] p-8 shadow-paper space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full border border-[#1D2927] bg-[#EAE5DB] flex items-center justify-center mx-auto text-[#A84D2A]">
              <Mail className="h-6 w-6" />
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A]">
              Identity Dossier Verification
            </span>
            <h1 className="font-editorial text-3xl text-[#1D2927]">Verify Your Email</h1>
            <p className="font-mono text-xs text-[#53605C]">
              We sent a 6-digit authorization code to <strong className="text-[#1D2927]">{email}</strong>.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-[#FDF4F0] border border-[#A84D2A] text-xs font-mono text-[#A84D2A] text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] font-bold uppercase text-[#8C7A5B] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 border border-[#D9D3C7] bg-[#F7F4ED] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold uppercase text-[#8C7A5B] mb-1">
                6-Digit Verification Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className="w-full h-12 px-3 border-2 border-[#1D2927] bg-[#FAF8F3] font-mono text-center text-xl tracking-[0.5em] font-bold text-[#1D2927] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-[#1D2927] text-[#FAF8F3] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#FAF8F3] hover:text-[#1D2927] border border-[#1D2927] transition-all shadow-ink flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isPending ? "Verifying..." : "Authorize & Enter Workspace"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </PaperLift>
      </FadeIn>
    </div>
  );
}
