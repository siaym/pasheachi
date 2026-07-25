import { Container } from "@/components/layout/container";
import { ShieldCheck, CheckCircle2, Lock, Smartphone, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TrustSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container variant="wide">
        <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-14 text-white shadow-2xl overflow-hidden relative">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#10B981]/15 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="verified">100% Secure Platform</Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Built on Absolute Trust & Transparency
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                We know how important financial trust is in Bangladesh. Every single donor transaction is manually verified by our team against official bKash, Nagad, and Rocket statements before appearing as confirmed.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />
                  <span>Manual Transaction ID matching against MFS statements</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />
                  <span>Government NID & Identity Audit for all campaign owners</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />
                  <span>Permanent 1-link profile (@username) for full reputation history</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Tier Box */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-[#10B981]">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Direct MFS Transfer</h4>
                      <p className="text-xs text-slate-400">bKash • Nagad • Rocket</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#10B981]">Instant</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-[#818CF8]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Identity Audit Tier</h4>
                      <p className="text-xs text-slate-400">NID / Passport / Student ID verified</p>
                    </div>
                  </div>
                  <Badge variant="verified">✓ L2 Verified</Badge>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-[#F59E0B]">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Bank Payout Security</h4>
                      <p className="text-xs text-slate-400">Direct account withdrawal within 1-3 days</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
