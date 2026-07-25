import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle, FileText, Smartphone } from "lucide-react";

export default function TrustPage() {
  return (
    <div className="min-h-screen py-12 sm:py-20">
      <Container variant="standard">
        {/* Header */}
        <SectionHeader
          badge="Trust & Safety"
          title="Bank-Grade Trust & Anti-Fraud Security"
          subtitle="How PasheAchi protects donors, verifies manual transactions, and ensures complete campaign transparency."
          centered
        />

        {/* Protection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#10B981] dark:bg-emerald-950/50">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Manual Transaction Audit
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Every bKash, Nagad, and Rocket transfer is matched against daily provider statements before funds appear as verified.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5] dark:bg-indigo-950/50">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Identity Verification
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Creators upload government-issued NID, Passport, Student ID, or NGO Registration papers before withdrawing funds.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-[#F59E0B] dark:bg-amber-950/50">
              <Smartphone className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Phone Number Verification
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Mandatory SMS verification for all registered users prevents spam and ghost accounts.
            </p>
          </div>
        </div>

        {/* Verification Levels */}
        <div className="max-w-3xl mx-auto space-y-6 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
            Verification Levels & Badges
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  L1
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Phone & Email Verified</h4>
                  <p className="text-xs text-slate-500">Basic verification required for all accounts</p>
                </div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
            </div>

            <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-[#10B981] dark:bg-emerald-950/50">
                  L2
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">NID / Passport Identity Verified</h4>
                  <p className="text-xs text-slate-500">Government identity document checked</p>
                </div>
              </div>
              <Badge variant="verified">✓ Verified Creator</Badge>
            </div>

            <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-[#4F46E5] dark:bg-indigo-950/50">
                  L3
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">NGO / Student Organization</h4>
                  <p className="text-xs text-slate-500">Official organizational registration audit</p>
                </div>
              </div>
              <Badge variant="verified">✓ Verified NGO</Badge>
            </div>
          </div>
        </div>

        {/* Report Concern Callout */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-amber-200 bg-amber-50/60 p-8 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-bold text-base flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <span>Suspect Fraud or Abuse?</span>
            </h4>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              If you discover a suspicious campaign, report it immediately. Our safety team acts within 2 hours.
            </p>
          </div>
          <a
            href="mailto:safety@pasheachi.bro.bd"
            className="whitespace-nowrap rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-700 transition-colors"
          >
            Report an Issue
          </a>
        </div>
      </Container>
    </div>
  );
}
