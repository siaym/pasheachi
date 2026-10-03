"use client";

import { useState, useTransition } from "react";
import { AdvancedTable } from "@/components/back-office/advanced-table";
import { verifyCampaignAction } from "@/app/admin/actions";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  title: string;
  creator: any;
  goalAmount: number | null;
  raisedAmount: number | null;
  category: string;
  status: string;
  isFeatured: boolean;
  isPinned: boolean;
}

export default function CampaignsClientTable({ initialCampaigns }: { initialCampaigns: Campaign[] }) {
  const [isPending, startTransition] = useTransition();
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState<"pending" | "all">("pending");

  const handleApproveCampaign = (id: string) => {
    startTransition(async () => {
      const res = await verifyCampaignAction(id, "approved", "Approved from Moderation Workspace");
      if (res.success) {
        setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: "active" } : c));
        showToast(`Campaign ${id.slice(0, 8)} approved!`);
      } else {
        showToast("Failed to approve campaign.", "error");
      }
    });
  };

  const handleRejectCampaign = (id: string) => {
    startTransition(async () => {
      const res = await verifyCampaignAction(id, "rejected", "Rejected from Moderation Workspace");
      if (res.success) {
        setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: "rejected" } : c));
        showToast(`Campaign ${id.slice(0, 8)} rejected.`);
      }
    });
  };

  const handleBulkApproveCampaigns = (selectedRows: Campaign[]) => {
    startTransition(async () => {
      let count = 0;
      for (const row of selectedRows) {
        if (row.status !== "active") {
          await verifyCampaignAction(row.id, "approved", "Bulk approved");
          setCampaigns(prev => prev.map(c => c.id === row.id ? { ...c, status: "active" } : c));
          count++;
        }
      }
      showToast(`Bulk approved ${count} campaigns!`);
    });
  };

  const filteredData = viewMode === "pending" 
    ? campaigns.filter(c => c.status !== "active" && c.status !== "rejected")
    : campaigns;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button 
          onClick={() => setViewMode("pending")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${viewMode === "pending" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
        >
          Pending Reviews
        </button>
        <button 
          onClick={() => setViewMode("all")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${viewMode === "all" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
        >
          All Campaigns
        </button>
      </div>

      <AdvancedTable
        title={viewMode === "pending" ? "Pending Campaign Reviews" : "Campaign Moderation Desk"}
        bulkActions={viewMode === "pending" ? [{ label: "Approve Selected", action: handleBulkApproveCampaigns }] : []}
        columns={[
          { header: "Title", accessorKey: "title" },
          { header: "Creator", accessorKey: (r) => r.creator?.name || "Unknown" },
          { header: "Category", accessorKey: "category" },
          { header: "Goal", accessorKey: (r) => `৳${r.goalAmount}` },
          {
            header: "Status",
            accessorKey: "status",
            cell: (r) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-md border ${
                r.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                r.status === "rejected" ? "bg-blue-50 text-blue-600 border-blue-200" :
                "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
                {r.status.toUpperCase()}
              </span>
            )
          },
          {
            header: "Action",
            accessorKey: "id",
            cell: (r) => {
              if (r.status === "active") return <span className="text-emerald-600 text-xs font-bold">ACTIVE</span>;
              if (r.status === "rejected") return <span className="text-blue-600 text-xs font-bold">REJECTED</span>;
              
              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApproveCampaign(r.id)}
                    disabled={isPending}
                    className="px-3 py-1 bg-slate-900 text-white hover:bg-emerald-600 text-xs font-semibold rounded-md transition-colors disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectCampaign(r.id)}
                    disabled={isPending}
                    className="px-2 py-1 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 text-xs font-semibold rounded-md transition-colors disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              );
            }
          }
        ]}
        data={filteredData}
        searchPlaceholder="Filter campaigns by title..."
      />
    </div>
  );
}
