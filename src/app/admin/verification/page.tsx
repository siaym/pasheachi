"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileSpreadsheet,
  ArrowLeft,
  Search,
  Filter,
} from "lucide-react";

const MOCK_QUEUE = [
  {
    id: "q-1",
    trxId: "TXN8A3F2K12",
    amount: 500,
    senderNumber: "01712345678",
    receiverNumber: "01712345678",
    method: "bKash",
    campaign: "Help Rina's Mother Get Urgent Surgery",
    user: "@siyam",
    time: "2 mins ago",
    status: "pending",
  },
  {
    id: "q-2",
    trxId: "TXN9B4G3L99",
    amount: 1000,
    senderNumber: "01987654321",
    receiverNumber: "01912345678",
    method: "Nagad",
    campaign: "Japan Tour & Cultural Expedition",
    user: "@tanvir",
    time: "15 mins ago",
    status: "pending",
  },
  {
    id: "q-3",
    trxId: "TXN7C2H1M44",
    amount: 250,
    senderNumber: "01811223344",
    receiverNumber: "01812345678",
    method: "Rocket",
    campaign: "Support Next.js Bengali Developer Tooling",
    user: "@siyam",
    time: "45 mins ago",
    status: "flagged",
    flagReason: "Duplicate Transaction ID submitted",
  },
  {
    id: "q-4",
    trxId: "TXN5E0J9O11",
    amount: 5000,
    senderNumber: "01755667788",
    receiverNumber: "01712345678",
    method: "bKash",
    campaign: "Free School Supplies for 200 Street Children",
    user: "@ekattor",
    time: "1 hour ago",
    status: "approved",
  },
];

export default function VerificationQueuePage() {
  const [filter, setFilter] = useState<"all" | "pending" | "flagged" | "approved">("pending");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filtered = MOCK_QUEUE.filter((item) => {
    if (filter === "pending") return item.status === "pending";
    if (filter === "flagged") return item.status === "flagged";
    if (filter === "approved") return item.status === "approved";
    return true;
  });

  return (
    <div className="page-shell py-8 sm:py-12">
      <Container variant="wide">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Admin Overview
          </Link>

          <Link href="/admin/bulk-checker">
            <Button size="sm" className="font-bold gap-2 bg-[#10B981] hover:bg-[#059669]">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Use Bulk Checker</span>
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Manual Verification Queue
            </h1>
            <p className="text-sm text-slate-400">
              Audit submitted donor transaction IDs and confirm funds
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {(["all", "pending", "flagged", "approved"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                  filter === f
                    ? "bg-[#10B981] text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Batch Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300">
              {selectedIds.length} transactions selected
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-[#10B981] hover:bg-[#059669] text-xs font-bold gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Approve Selected
              </Button>
              <Button size="sm" variant="danger" className="text-xs font-bold gap-1">
                <XCircle className="h-3.5 w-3.5" /> Reject Selected
              </Button>
            </div>
          </div>
        )}

        {/* Table Container */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4 w-10">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedIds(e.target.checked ? filtered.map((i) => i.id) : [])
                      }
                      className="rounded border-slate-700"
                    />
                  </th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Sender #</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Campaign</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/60">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded border-slate-700"
                      />
                    </td>
                    <td className="p-4 font-mono font-bold text-white">{item.trxId}</td>
                    <td className="p-4 font-extrabold text-[#10B981]">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="p-4 text-slate-300">{item.senderNumber}</td>
                    <td className="p-4 capitalize">{item.method}</td>
                    <td className="p-4 text-slate-300 max-w-xs truncate">{item.campaign}</td>
                    <td className="p-4 text-slate-400">{item.time}</td>
                    <td className="p-4">
                      {item.status === "pending" && (
                        <Badge variant="pending">⏳ Pending Audit</Badge>
                      )}
                      {item.status === "flagged" && (
                        <Badge variant="accent">🚨 {item.flagReason || "Flagged"}</Badge>
                      )}
                      {item.status === "approved" && (
                        <Badge variant="active">✅ Verified</Badge>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-950/60 text-[#10B981] hover:bg-[#10B981] hover:text-white transition-colors"
                          title="Approve"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-950/60 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}
