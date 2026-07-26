import { Container } from "@/components/layout/container";
import { FadeIn, PaperLift, RevealText } from "@/components/ui/motion";
import { Accordion } from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";
import {
  Search,
  BookOpen,
  Sparkles,
  Wallet,
  ShieldCheck,
  UserCheck,
  HelpCircle,
  MessageCircle,
  Mail,
} from "lucide-react";

const TOPICS = [
  { icon: BookOpen, title: "Getting Started", count: "4 articles" },
  { icon: Sparkles, title: "Creating Campaigns", count: "6 articles" },
  { icon: Wallet, title: "Payment & Donate", count: "5 articles" },
  { icon: Wallet, title: "Withdraw Funds", count: "4 articles" },
  { icon: UserCheck, title: "Verification", count: "3 articles" },
  { icon: ShieldCheck, title: "Security & Safety", count: "5 articles" },
  { icon: HelpCircle, title: "Account Settings", count: "4 articles" },
  { icon: MessageCircle, title: "Report Issues", count: "2 articles" },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[#F8FAFC]">
      <Container variant="standard" className="relative z-10">
        {/* Hero Search Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto space-y-6">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-[#A84D2A] mb-8">
              <span className="h-px w-8 bg-[#A84D2A]"></span>
              <span className="font-mono">Help Center</span>
              <span className="h-px w-8 bg-[#A84D2A]"></span>
            </div>
          </FadeIn>
          
          <h1 className="font-editorial text-5xl sm:text-6xl font-medium leading-[1.1] text-[#1D2927]">
            <RevealText>How can we</RevealText>
            <RevealText><span className="italic text-[#8C7A5B] font-light">help you?</span></RevealText>
          </h1>
          
          <FadeIn delay={0.2}>
            <p className="text-[#53605C] max-w-lg mx-auto">
              Search for answers or browse popular topics below.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="pt-8">
            <div className="relative w-full max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8C7A5B]" />
              <input
                type="text"
                placeholder="Search help articles (e.g. withdrawal, verification)..."
                className="h-14 w-full bg-[#FAF8F3] border-2 border-[#1D2927] pl-12 pr-4 font-mono text-sm text-[#1D2927] placeholder:text-[#8C7A5B] focus:outline-none focus:ring-4 focus:ring-[#1D2927]/10 transition-all shadow-paper"
              />
            </div>
          </FadeIn>
        </div>

        {/* Popular Topics Grid */}
        <FadeIn delay={0.4}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-24">
            {TOPICS.map((t, idx) => {
              const Icon = t.icon;
              return (
                <PaperLift
                  key={idx}
                  className="flex flex-col items-center p-6 bg-[#FAF8F3] border border-[#D9D3C7] text-center shadow-sm cursor-pointer group"
                >
                  <div className="mb-4 text-[#8C7A5B] group-hover:text-[#A84D2A] transition-colors">
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-editorial text-xl text-[#1D2927] group-hover:text-[#A84D2A] transition-colors">
                    {t.title}
                  </h4>
                  <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
                    {t.count}
                  </span>
                </PaperLift>
              );
            })}
          </div>
        </FadeIn>

        {/* FAQ Accordion */}
        <FadeIn delay={0.5}>
          <div className="max-w-3xl mx-auto mb-24">
            <div className="text-center mb-10">
              <h3 className="font-editorial text-4xl text-[#1D2927]">
                Frequently Asked Questions
              </h3>
            </div>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-8 sm:p-12 shadow-paper">
              <Accordion items={FAQ_ITEMS} />
            </PaperLift>
          </div>
        </FadeIn>

        {/* Support Banner */}
        <FadeIn delay={0.6}>
          <div className="max-w-3xl mx-auto bg-[#1D2927] p-10 text-center text-[#F7F4ED] relative overflow-hidden shadow-ink">
            <div className="absolute -right-8 -top-8 opacity-10">
              <Mail className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <h4 className="font-editorial text-3xl mb-4">Still Need Assistance?</h4>
              <p className="font-mono text-sm text-[#D9D3C7] max-w-md mx-auto mb-8 leading-relaxed">
                Our support team is active 7 days a week to verify transactions and assist creators. Reach out to us directly.
              </p>
              <div className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#A84D2A] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#843B20] transition-colors cursor-pointer">
                <Mail className="h-4 w-4" />
                <span>support@pasheachi.bro.bd</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
