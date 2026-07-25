import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { UserPlus, Sparkles, Share2, Wallet, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Claim Permanent Profile",
    description: "Claim your permanent URL (pasheachi.bro.bd/@username) in 30 seconds to showcase all your causes in one place.",
    icon: UserPlus,
  },
  {
    step: "02",
    title: "Tell Your Story",
    description: "Upload photos, medical documents, set your target goal amount, and define optional fund milestones.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Share Everywhere",
    description: "Share your campaign link across Facebook, WhatsApp, LinkedIn, and social networks with rich preview cards.",
    icon: Share2,
  },
  {
    step: "04",
    title: "Receive & Withdraw",
    description: "Supporters back your dream via bKash, Nagad, Rocket, or Bank. Withdraw directly to your account anytime.",
    icon: Wallet,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-900/40">
      <Container variant="wide">
        <SectionHeader
          badge="Simple Flow"
          title="How PasheAchi Works"
          subtitle="Simple, transparent, and built for trust. Start receiving support in four straightforward steps."
          centered
        />

        <div className="relative mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-800 -z-0" />

          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step Circle */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-md border border-slate-100 text-[#10B981] transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-green dark:bg-slate-900 dark:border-slate-800">
                  <Icon className="h-9 w-9" />
                </div>

                <span className="mb-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-extrabold text-[#047857] dark:bg-emerald-950/50 dark:text-emerald-300">
                  STEP {item.step}
                </span>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Handcrafted Trust Banner inside How It Works */}
        <div className="mt-16 mx-auto max-w-3xl rounded-3xl border border-emerald-200/80 bg-white p-6 sm:p-8 shadow-xl dark:border-emerald-900/50 dark:bg-slate-900 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#10B981] dark:bg-emerald-950/60">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Zero Platform Hold & Manual Transaction Security
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              In Phase 1, every bKash, Nagad, and Rocket transaction is audited against official provider statements by our compliance team in Dhaka.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
