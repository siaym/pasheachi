"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  FileSpreadsheet,
  Users,
  Rocket,
  Wallet,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-900 text-white">
      <Container variant="wide">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="verified">Admin Console</Badge>
              <span className="text-xs text-slate-400">PasheAchi Operations</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">
              Admin Overview & Audit Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/bulk-checker">
              <Button size="md" className="font-bold gap-2 bg-[#10B981] hover:bg-[#059669]">
                <FileSpreadsheet className="h-4 w-4" />
                <span>Bulk Transaction Checker</span>
              </Button>
            </Link>
            <Link href="/admin/verification">
              <Button size="md" variant="secondary" className="font-bold gap-2 text-slate-900 bg-white">
                <ShieldCheck className="h-4 w-4 text-[#10B981]" />
                <span>Verification Queue (23)</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Admin Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800">
          <Link href="/admin" className="px-4 py-2 rounded-full text-xs font-bold bg-[#10B981] text-white">
            Overview
          </Link>
          <Link href="/admin/verification" className="px-4 py-2 rounded-full text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800">
            Verification Queue (23)
          </Link>
          <Link href="/admin/bulk-checker" className="px-4 py-2 rounded-full text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-1.5">
            <FileSpreadsheet className="h-3.5 w-3.5 text-[#10B981]" />
            <span>Bulk Checker</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Platform Revenue</span>
              <Wallet className="h-4 w-4 text-[#10B981]" />
            </div>
            <div className="text-3xl font-extrabold text-white">৳4.2 Cr+</div>
            <span className="text-xs text-[#10B981] font-semibold">+18.4% this month</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Total Campaigns</span>
              <Rocket className="h-4 w-4 text-[#4F46E5]" />
            </div>
            <div className="text-3xl font-extrabold text-white">1,247</div>
            <span className="text-xs text-slate-400 font-semibold">124 pending review</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Total Users</span>
              <Users className="h-4 w-4 text-[#F59E0B]" />
            </div>
            <div className="text-3xl font-extrabold text-white">15,832</div>
            <span className="text-xs text-[#10B981] font-semibold">+142 new today</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Verification Rate</span>
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
            </div>
            <div className="text-3xl font-extrabold text-white">99.2%</div>
            <span className="text-xs text-slate-400 font-semibold">Avg audit time 1.4 hrs</span>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="rounded-3xl border border-emerald-900/50 bg-gradient-to-br from-emerald-950/40 to-slate-950 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10B981]/20 text-[#10B981]">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Bulk Transaction Checker</h3>
                <p className="text-xs text-slate-400">Match CSV/Excel bank statements instantly</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload statements from bKash, Nagad, or Rocket to automatically match Transaction ID, Amount, Receiver Number, and Time Window across pending donations.
            </p>
            <Link href="/admin/bulk-checker" className="inline-block">
              <Button size="md" className="font-bold gap-2 bg-[#10B981] hover:bg-[#059669]">
                <span>Open Bulk Checker</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-[#818CF8]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Manual Verification Queue</h3>
                <p className="text-xs text-slate-400">Review pending user transactions</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Audit individual transactions submitted by donors. Approve valid payments, flag duplicate Transaction IDs, or reject mismatched numbers.
            </p>
            <Link href="/admin/verification" className="inline-block">
              <Button size="md" variant="secondary" className="font-bold gap-2 text-slate-900 bg-white">
                <span>View Queue (23 Pending)</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
