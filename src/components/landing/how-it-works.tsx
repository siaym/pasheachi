import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { UserPlus, Sparkles, Share2, Wallet } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Create Account",
    description: "Sign up in 30 seconds to claim your permanent profile URL (pasheachi.bro.bd/username).",
    icon: UserPlus,
  },
  {
    step: "02",
    title: "Launch Campaign",
    description: "Tell your story, upload images/documents, set a goal amount, and define optional milestones.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Share Link",
    description: "Share your campaign link across Facebook, WhatsApp, LinkedIn, and social networks.",
    icon: Share2,
  },
  {
    step: "04",
    title: "Receive & Withdraw",
    description: "Supporters back your dream via bKash/Nagad/Rocket. Withdraw directly to your account anytime.",
    icon: Wallet,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50/50 dark:bg-slate-900/30">
      <Container variant="wide">
        <SectionHeader
          badge="Simple Flow"
          title="How PasheAchi Works"
          subtitle="Simple, transparent, and built for speed. Start receiving support in four straightforward steps."
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
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-md border border-slate-100 text-[#10B981] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-glow-green dark:bg-slate-900 dark:border-slate-800">
                  <Icon className="h-9 w-9" />
                </div>

                <span className="mb-2 inline-block rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-xs font-extrabold text-[#047857] dark:bg-[#10B981]/15 dark:text-[#6EE7B7]">
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
      </Container>
    </section>
  );
}
