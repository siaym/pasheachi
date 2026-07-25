"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import { Download, ArrowLeft, Heart, Search } from "lucide-react";
import Link from "next/link";

const MOCK_DONORS = [
  {
    id: "d-1",
    name: "Arif Ahmed",
    amount: 5000,
    method: "bKash",
    date: "Jul 18, 2026",
    message: "Stay strong brother! Praying for complete recovery.",
    isAnonymous: false,
    status: "verified",
  },
  {
    id: "d-2",
    name: "Fatema Tuz",
    amount: 3000,
    method: "Nagad",
    date: "Jul 17, 2026",
    message: "May Allah bless your noble initiative.",
    isAnonymous: false,
    status: "verified",
  },
  {
    id: "d-3",
    name: "Anonymous Supporter",
    amount: 2000,
    method: "bKash",
    date: "Jul 16, 2026",
    message: "❤️",
    isAnonymous: true,
    status: "verified",
  },
  {
    id: "d-4",
    name: "Karim Hossain",
    amount: 1000,
    method: "Rocket",
    date: "Jul 15, 2026",
    message: "Small token of support.",
    isAnonymous: false,
    status: "verified",
  },
];

export default function DonorManagementPage() {
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
              Donor Management
            </h1>
            <p className="text-sm text-slate-500">
              Total 128 supporters • ৳32,500 raised for your active campaigns
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="gap-2 font-bold text-xs">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            <Button size="sm" variant="secondary" className="gap-2 font-bold text-xs">
              <Download className="h-4 w-4" /> Export Excel
            </Button>
          </div>
        </div>

        {/* Donors Table Card */}
        <div className="rounded-3xl border border-slate-100 bg-white shadow-xl overflow-hidden dark:border-slate-800 dark:bg-slate-900">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search donor name or message..."
                className="h-9 w-full rounded-xl bg-slate-100 pl-9 pr-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#10B981] dark:bg-slate-800 dark:text-white"
              />
            </div>

            <span className="text-xs font-semibold text-slate-500">
              Showing {MOCK_DONORS.length} recent donations
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="p-4">Donor Name</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {MOCK_DONORS.map((donor) => (
                  <tr key={donor.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={donor.name} size="xs" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {donor.isAnonymous ? "Anonymous Supporter" : donor.name}
                          </span>
                          {donor.isAnonymous && (
                            <span className="block text-[10px] text-slate-400">Hidden publicly</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-extrabold text-[#10B981]">
                      {formatCurrency(donor.amount)}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {donor.method}
                    </td>
                    <td className="p-4 text-slate-500">{donor.date}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {donor.message || "—"}
                    </td>
                    <td className="p-4">
                      <Badge variant="active" className="px-2 py-0.5 text-[10px]">
                        ✓ Verified
                      </Badge>
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
