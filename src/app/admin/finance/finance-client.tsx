"use client";

import { useState, useTransition } from "react";
import { AdvancedTable } from "@/components/back-office/advanced-table";
import { verifyTransactionAction } from "@/app/admin/actions";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  donorName: string;
  amount: number;
  method: string;
  phone: string;
  date: string;
  campaign: string;
  campaignId: string;
  status: string;
}

export default function FinanceClientTable({ initialTransactions }: { initialTransactions: Transaction[] }) {
  const [isPending, startTransition] = useTransition();
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState<"pending" | "all">("pending");

  const handleVerifyTransaction = (id: string) => {
    startTransition(async () => {
      const res = await verifyTransactionAction(id, "verified", "Verified from Finance Workspace");
      if (res.success) {
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: "verified" } : t));
        showToast(`Transaction ${id.slice(0, 8)} verified and persisted!`);
      } else {
        showToast("Failed to verify transaction.", "error");
      }
    });
  };

  const handleBulkVerifyTransactions = (selectedRows: Transaction[]) => {
    startTransition(async () => {
      let count = 0;
      for (const row of selectedRows) {
        if (row.status !== "verified") {
          await verifyTransactionAction(row.id, "verified", "Bulk verified");
          setTransactions(prev => prev.map(t => t.id === row.id ? { ...t, status: "verified" } : t));
          count++;
        }
      }
      showToast(`Bulk verified ${count} transactions!`);
    });
  };

  const filteredData = viewMode === "pending" 
    ? transactions.filter(t => t.status === "pending" || t.status === "PENDING")
    : transactions;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button 
          onClick={() => setViewMode("pending")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${viewMode === "pending" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
        >
          Pending Verifications
        </button>
        <button 
          onClick={() => setViewMode("all")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${viewMode === "all" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
        >
          All Transactions Ledger
        </button>
      </div>

      <AdvancedTable
        title={viewMode === "pending" ? "Pending Verifications Queue" : "MFS Verification Ledger"}
        bulkActions={viewMode === "pending" ? [{ label: "Verify Selected", action: handleBulkVerifyTransactions }] : []}
        columns={[
          { header: "Tx ID", accessorKey: (r) => r.id.slice(0, 8) + "..." },
          { header: "Date", accessorKey: "date" },
          { header: "Donor", accessorKey: "donorName" },
          { header: "Amount", accessorKey: (r) => `৳${r.amount}` },
          { header: "Method", accessorKey: (r) => r.method.toUpperCase() },
          { header: "Phone/Ref", accessorKey: "phone" },
          { header: "Campaign", accessorKey: "campaign" },
          {
            header: "Status",
            accessorKey: "status",
            cell: (r) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-md border ${
                r.status === "verified" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                r.status === "rejected" ? "bg-blue-50 text-blue-600 border-blue-200" :
                "bg-slate-50 text-slate-600 border-slate-200"
              }`}>
                {r.status.toUpperCase()}
              </span>
            )
          },
          {
            header: "Action",
            accessorKey: "id",
            cell: (r) => {
              if (r.status === "verified" || r.status === "rejected") return null;
              return (
                <button
                  onClick={() => handleVerifyTransaction(r.id)}
                  disabled={isPending}
                  className="px-3 py-1.5 bg-white border border-slate-200 shadow-sm rounded-md hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors disabled:opacity-50"
                >
                  Verify Tx
                </button>
              );
            }
          }
        ]}
        data={filteredData}
        searchPlaceholder="Filter transactions by ID or donor name..."
      />
    </div>
  );
}
