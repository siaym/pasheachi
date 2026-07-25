import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
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
    <div className="min-h-screen py-12 sm:py-20">
      <Container variant="standard">
        {/* Hero Search Header */}
        <div className="text-center max-w-2xl mx-auto space-y-6 mb-12">
          <SectionHeader
            badge="Help Center"
            title="How Can We Help You?"
            subtitle="Search for answers or browse popular topics below."
            centered
          />

          <div className="relative w-full">
            <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search help articles (e.g. bKash, withdrawal, verification)..."
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 shadow-md placeholder:text-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-4 focus:ring-[#10B981]/15 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Popular Topics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {TOPICS.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center p-6 rounded-2xl border border-slate-100 bg-white text-center shadow-sm transition-transform hover:-translate-y-1 hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#10B981] dark:bg-emerald-950/50">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.title}
                </h4>
                <span className="mt-1 text-xs text-slate-400">{t.count}</span>
              </div>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
            Frequently Asked Questions
          </h3>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>

        {/* Support Banner */}
        <div className="mt-16 max-w-3xl mx-auto rounded-3xl bg-emerald-50 p-8 text-center text-[#047857] dark:bg-emerald-950/40 dark:text-emerald-300 space-y-3">
          <h4 className="text-lg font-bold">Still Need Assistance?</h4>
          <p className="text-sm max-w-md mx-auto">
            Our support team is active 7 days a week to verify transactions and assist creators.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2 text-sm font-bold">
            <Mail className="h-4 w-4" />
            <span>support@pasheachi.bro.bd</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
