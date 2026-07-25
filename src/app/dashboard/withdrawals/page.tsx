"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import {
  Wallet,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Building,
  Smartphone,
  X,
} from "lucide-react";

const MOCK_WITHDRAWALS = [
  {
    id: "w-1",
    amount: 15000,
    method: "bKash",
    account: "01712345678",
    date: "Jul 10, 2026",
    status: "completed",
  },
  {
    id: "w-2",
    amount: 10000,
    method: "Nagad",
    account: "01912345678",
    date: "Jul 5, 2026",
    status: "completed",
  },
  {
    id: "w-3",
    amount: 5875,
    method: "bKash",
    account: "01712345678",
    date: "Today",
    status: "pending",
  },
];

export default function WithdrawalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [method, setMethod] = useState("bkash");
  const [accountNo, setAccountNo] = useState("01712345678");
  const [submitting, setSubmitting] = useState(false);

  const availableBalance = 30875;

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50/50 dark:bg-slate-950">
      <Container variant="wide">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#10B981] mb-2 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Withdraw Funds
            </h1>
            <p className="text-sm text-slate-500">
              Transfer your campaign earnings directly to your MFS or Bank account
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="font-bold gap-2 shadow-lg shadow-[#10B981]/25"
          >
            <Wallet className="h-4 w-4" />
            <span>Request Withdrawal</span>
          </Button>
        </div>

        {/* Balance Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#10B981] via-[#059669] to-[#4F46E5] p-8 text-white mb-10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
              Available Balance (After 5% Platform Fee)
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold mt-1">
              {formatCurrency(availableBalance)}
            </div>
            <p className="text-xs text-emerald-100 mt-2">
              Ready for instant payout request • Min withdrawal ৳500
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 text-white hover:bg-slate-800 font-bold shrink-0"
          >
            Withdraw Now
          </Button>
        </div>

        {/* Withdrawal History Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Withdrawal History
          </h2>

          <div className="rounded-3xl border border-slate-100 bg-white shadow-xl overflow-hidden dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider dark:bg-slate-950 dark:text-slate-400">
                  <tr>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Method</th>
                    <th className="p-4">Account Number</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {MOCK_WITHDRAWALS.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-extrabold text-slate-900 dark:text-white text-sm">
                        {formatCurrency(w.amount)}
                      </td>
                      <td className="p-4 capitalize">{w.method}</td>
                      <td className="p-4 text-slate-500 font-mono">{w.account}</td>
                      <td className="p-4 text-slate-500">{w.date}</td>
                      <td className="p-4">
                        {w.status === "completed" && (
                          <Badge variant="active">✅ Completed</Badge>
                        )}
                        {w.status === "pending" && (
                          <Badge variant="pending">⏳ Pending (1-3 days)</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800 space-y-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Request Withdrawal
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Available balance: {formatCurrency(availableBalance)}
                </p>
              </div>

              <form onSubmit={handleRequest} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Payout Method
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="bkash">bKash Personal</option>
                    <option value="nagad">Nagad Personal</option>
                    <option value="rocket">Rocket Personal</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>

                <Input
                  label="Account Number *"
                  required
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                />

                <Input
                  label="Amount (৳) *"
                  type="number"
                  required
                  placeholder="e.g. 15000"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  helperText="Min ৳500 • Max ৳30,875"
                />

                <Button size="lg" isLoading={submitting} type="submit" className="w-full font-bold">
                  Confirm Withdrawal Request
                </Button>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
