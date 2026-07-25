"use client";

import { CheckCircle2, ShieldCheck, FileSearch, Building2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FadeIn, RevealText, InkDivider } from "@/components/ui/motion";

const SAFEGUARDS = [
  { icon: FileSearch, title: "Audit Trail", description: "Every bKash, Nagad and Rocket transfer is manually verified against official transaction statements." },
  { icon: ShieldCheck, title: "Identity Verification", description: "Campaign owners must provide government ID and relevant documentation (e.g. hospital bills) before any withdrawal." },
  { icon: Building2, title: "Transparent Payouts", description: "We do not hold funds indefinitely. Withdrawals are processed directly to the creator's verified account with full public ledgers." },
];

export function TrustStamp({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center w-32 h-32 rounded-full border border-[#1D2927] ${className}`}>
      <div className="absolute inset-2 border border-dashed border-[#1D2927] rounded-full animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-4 rounded-full bg-[#1D2927] text-[#F7F4ED] flex flex-col items-center justify-center text-center p-2 shadow-paper">
        <ShieldCheck className="h-5 w-5 mb-1" />
        <span className="font-mono text-[8px] uppercase tracking-widest leading-tight">Verified<br/>Trust</span>
      </div>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <path id="curve" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
        <text className="text-[7.5px] font-mono tracking-widest uppercase fill-[#1D2927]">
          <textPath href="#curve" startOffset="0">
            • PasheAchi Trust & Safety • Dhaka Bangladesh
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export function TrustSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F3] border-b border-[#D9D3C7] relative overflow-hidden">
      <Container variant="wide">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          
          {/* Left: The Manifesto */}
          <div className="lg:col-span-5 relative">
            <FadeIn>
              <div className="editorial-stamp mb-6">
                Our Commitment
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl font-medium leading-[1.1] text-[#1D2927]">
                <RevealText>Trust is not</RevealText>
                <RevealText><span className="italic text-[#8C7A5B] font-light">a feature.</span></RevealText>
                <RevealText>It is the product.</RevealText>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-[#53605C] max-w-md font-medium">
                PasheAchi is built for moments when money must move with care. We are uncompromising in our verification because the people who rely on us cannot afford doubt.
              </p>
              
              <div className="mt-12">
                <TrustStamp className="hidden lg:flex" />
              </div>
            </FadeIn>
          </div>

          {/* Right: The Logistics */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2} className="border border-[#1D2927] bg-[#F7F4ED] p-8 sm:p-12 shadow-paper">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#A84D2A] mb-8">
                How we protect the community
              </h3>
              
              <div className="flex flex-col gap-8">
                {SAFEGUARDS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex gap-6">
                      <div className="shrink-0 mt-1">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full border border-[#D9D3C7] bg-[#FAF8F3]">
                          <Icon className="h-4 w-4 text-[#1D2927]" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1D2927] text-lg mb-2">{item.title}</h4>
                        <p className="text-sm text-[#53605C] leading-relaxed max-w-lg">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <InkDivider className="my-8" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1D2927]">
                  <CheckCircle2 className="h-4 w-4 text-[#A84D2A]" />
                  <span>Manual Transaction Review</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1D2927]">
                  <CheckCircle2 className="h-4 w-4 text-[#A84D2A]" />
                  <span>Visible Campaign Identity</span>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </Container>
    </section>
  );
}
