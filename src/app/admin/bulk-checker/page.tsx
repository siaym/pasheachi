"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Copy,
  Download,
  Printer,
  ArrowLeft,
  Search,
  Sparkles,
} from "lucide-react";

export default function BulkTransactionCheckerPage() {
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pastedData, setPastedData] = useState("");

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 1500);
  };

  const MOCK_MATCHED = [
    {
      trxId: "TXN8A3F2K12",
      amount: 500,
      receiverNumber: "01712345678",
      campaign: "Help Rina's Mother Get Urgent Surgery",
      matchScore: "4/4",
      status: "ready",
    },
    {
      trxId: "TXN9B4G3L99",
      amount: 1000,
      receiverNumber: "01912345678",
      campaign: "Japan Tour & Cultural Expedition",
      matchScore: "4/4",
      status: "ready",
    },
  ];

  const MOCK_PARTIAL = [
    {
      trxId: "TXN7C2H1M44",
      amount: 250,
      receiverNumber: "01812345678",
      campaign: "Support Next.js Bengali Developer Tooling",
      matchScore: "3/4",
      issue: "Amount mismatch (submitted ৳250, statement ৳200)",
    },
  ];

  const MOCK_DUPLICATES = [
    {
      trxId: "TXN5E0J9O11",
      amount: 500,
      campaign: "Help Rina's Mother Get Urgent Surgery",
      usedOn: "Already approved on Jul 15, 2026",
    },
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-900 text-white">
      <Container variant="wide">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Admin Overview
          </Link>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#10B981]/20 px-3 py-1 text-xs font-bold text-[#10B981] mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Automated Statement Auditor</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold">
            Bulk Transaction Checker Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Upload statement CSV/Excel or paste bKash/Nagad history to auto-match Transaction ID, Amount, Receiver Number, and Time Window.
          </p>
        </div>

        {/* Upload & Statement Input Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6 mb-10 shadow-2xl">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Upload className="h-5 w-5 text-[#10B981]" />
            <span>Step 1: Upload or Paste MFS Statement</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Upload Dropzone */}
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/50 text-center hover:border-[#10B981] transition-colors cursor-pointer">
              <FileSpreadsheet className="h-12 w-12 text-[#10B981] mb-3" />
              <h4 className="font-bold text-sm text-white">
                Upload CSV or Excel Statement File
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Drag & drop statements downloaded from bKash, Nagad, or Rocket merchant portals
              </p>
              <Button size="sm" variant="secondary" className="mt-4 font-bold text-xs bg-white text-slate-900">
                Browse Files
              </Button>
            </div>

            {/* Paste Raw Statement Text Area */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Or Paste Statement / SMS Text List
              </label>
              <textarea
                rows={5}
                placeholder="Paste transaction lines here... e.g. TXN8A3F2K12 Amt: 500 Tk From: 01712345678"
                value={pastedData}
                onChange={(e) => setPastedData(e.target.value)}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-xs font-mono text-white placeholder:text-slate-500 focus:border-[#10B981] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-900">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Source: <strong>bKash / Nagad / Rocket</strong></span>
              <span>Time Window Tolerance: <strong>30 minutes</strong></span>
            </div>

            <Button
              size="lg"
              isLoading={loading}
              onClick={handleAnalyze}
              className="font-bold gap-2 bg-[#10B981] hover:bg-[#059669]"
            >
              <Sparkles className="h-4 w-4" />
              <span>Run Auto-Matching Engine</span>
            </Button>
          </div>
        </div>

        {/* Matching Analysis Results */}
        {analyzed && (
          <div className="space-y-10 animate-in fade-in">
            {/* Success Summary Header */}
            <div className="rounded-2xl bg-emerald-950/60 border border-emerald-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-bold text-emerald-300">
                <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
                <span>Processing complete! 156 transactions analyzed from statement.</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-[#10B981] text-white font-bold text-xs">
                  ✅ Auto-Approve 89 Matched
                </Button>
              </div>
            </div>

            {/* Status Breakdown Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="rounded-2xl border border-emerald-800 bg-emerald-950/30 p-4 text-center">
                <div className="text-2xl font-extrabold text-[#10B981]">89</div>
                <div className="text-xs font-bold text-[#10B981] mt-1">✅ Matched (4/4)</div>
              </div>

              <div className="rounded-2xl border border-amber-800 bg-amber-950/30 p-4 text-center">
                <div className="text-2xl font-extrabold text-[#F59E0B]">12</div>
                <div className="text-xs font-bold text-[#F59E0B] mt-1">⚠️ Partial Match</div>
              </div>

              <div className="rounded-2xl border border-indigo-800 bg-indigo-950/30 p-4 text-center">
                <div className="text-2xl font-extrabold text-[#818CF8]">4</div>
                <div className="text-xs font-bold text-[#818CF8] mt-1">🔁 Duplicates</div>
              </div>

              <div className="rounded-2xl border border-red-800 bg-red-950/30 p-4 text-center">
                <div className="text-2xl font-extrabold text-red-400">7</div>
                <div className="text-xs font-bold text-red-400 mt-1">🚨 Suspicious</div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-center">
                <div className="text-2xl font-extrabold text-slate-400">41</div>
                <div className="text-xs font-bold text-slate-400 mt-1">❓ Unknown</div>
              </div>

              <div className="rounded-2xl border border-red-900 bg-red-950/60 p-4 text-center">
                <div className="text-2xl font-extrabold text-red-500">3</div>
                <div className="text-xs font-bold text-red-500 mt-1">❌ Rejected</div>
              </div>
            </div>

            {/* Matched Table */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
                  <span>Matched Transactions (4/4 Match Score)</span>
                </h3>
                <Button size="sm" className="bg-[#10B981] text-xs font-bold">
                  Approve All Matched
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-bold uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3">Transaction ID</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Receiver #</th>
                      <th className="p-3">Match Score</th>
                      <th className="p-3">Campaign</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {MOCK_MATCHED.map((m, idx) => (
                      <tr key={idx}>
                        <td className="p-3 font-mono font-bold text-white">{m.trxId}</td>
                        <td className="p-3 font-extrabold text-[#10B981]">
                          {formatCurrency(m.amount)}
                        </td>
                        <td className="p-3 text-slate-300">{m.receiverNumber}</td>
                        <td className="p-3">
                          <Badge variant="active">{m.matchScore} Match</Badge>
                        </td>
                        <td className="p-3 text-slate-300">{m.campaign}</td>
                        <td className="p-3 text-right">
                          <Button size="sm" className="bg-[#10B981] text-[10px] h-7 font-bold">
                            Approve
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Export Summary Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl border border-slate-800 bg-slate-950">
              <div>
                <h4 className="font-bold text-sm text-white">Generate Audit Report</h4>
                <p className="text-xs text-slate-400">Download payment summary breakdown for accounting</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" className="gap-1.5 text-xs font-bold bg-white text-slate-900">
                  <Download className="h-4 w-4" /> Export CSV
                </Button>
                <Button size="sm" variant="secondary" className="gap-1.5 text-xs font-bold bg-white text-slate-900">
                  <Printer className="h-4 w-4" /> Print Report
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
