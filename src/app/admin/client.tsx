"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import { WORKSPACES, WorkspaceId } from "@/lib/back-office/workspaces";
import { AdvancedTable } from "@/components/back-office/advanced-table";
import { LauncherHub } from "@/components/back-office/workspaces/LauncherHub";
import { VerificationSettingsHub } from "@/components/back-office/workspaces/VerificationSettingsHub";
import { EmailCenterHub } from "@/components/back-office/workspaces/EmailCenterHub";
import { FeatureFlagsHub } from "@/components/back-office/workspaces/FeatureFlagsHub";
import { SeoSettingsHub } from "@/components/back-office/workspaces/SeoSettingsHub";
import { ImpersonationModal } from "@/components/back-office/impersonation-modal";
import { verifyCampaignAction, verifyTransactionAction, toggleFeaturedCampaignAction, toggleSuccessStoryAction } from "@/app/admin/actions";
import { useAdminNav } from "./layout";
import {
  Building2,
  Wallet,
  ShieldCheck,
  ShieldAlert,
  Headphones,
  BarChart3,
  FileText,
  Settings,
  Megaphone,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  TrendingUp,
  Globe,
  Sliders,
  Eye,
  Layers,
  ArrowRight,
  StickyNote,
  Search
} from "lucide-react";

interface DashboardStats {
  totalTransactions: number;
  pendingTransactions: number;
  verifiedTransactions: number;
  totalDonationVolume: number;
  todayDonationVolume: number;
  verificationRate: number;
  totalCampaigns: number;
  activeCampaigns: number;
  rejectedCampaigns: number;
  pendingCampaigns: number;
  totalUsers: number;
}

function AdminClientHubContent({
  stats,
  initialTransactions = [],
  initialCampaigns = [],
  initialUsers = [],
  initialAuditLogs = [],
}: {
  stats: DashboardStats;
  initialTransactions?: any[];
  initialCampaigns?: any[];
  initialUsers?: any[];
  initialAuditLogs?: any[];
}) {
  const { activeWorkspaceId, activeNavItem, setWorkspace } = useAdminNav();

  const activeTab = activeWorkspaceId;
  const navTab = activeNavItem || "overview";

  const handleSelectWorkspace = (wsId: WorkspaceId | "LAUNCHER") => {
    setWorkspace(wsId, "overview");
  };

  const router = useRouter();
  const [transactions, setTransactions] = useState(initialTransactions);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [isImpersonateOpen, setIsImpersonateOpen] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  // Sync state when initial props update from server revalidation
  useEffect(() => {
    if (initialCampaigns) setCampaigns(initialCampaigns);
  }, [initialCampaigns]);

  useEffect(() => {
    if (initialTransactions) setTransactions(initialTransactions);
  }, [initialTransactions]);

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  const handleToggleFeatured = (id: string, currentFeatured: boolean) => {
    startTransition(async () => {
      const res = await toggleFeaturedCampaignAction(id, !currentFeatured);
      if (res.success) {
        setCampaigns(prev => prev.map(c => c.id === id ? { ...c, isFeatured: !currentFeatured } : c));
        showToast(`Campaign ${!currentFeatured ? 'added to' : 'removed from'} Featured Stories!`);
        router.refresh();
      } else {
        showToast(`Error: ${res.error || "Failed to feature campaign"}`);
      }
    });
  };

  const handleToggleSuccessStory = (id: string, currentStatus: string) => {
    const isCompleted = currentStatus === "completed";
    startTransition(async () => {
      const res = await toggleSuccessStoryAction(id, !isCompleted);
      if (res.success) {
        setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: !isCompleted ? "completed" : "active" } : c));
        showToast(`Campaign ${!isCompleted ? 'marked as' : 'removed from'} Success Stories!`);
        router.refresh();
      } else {
        showToast(`Error: ${res.error || "Failed to update success story"}`);
      }
    });
  };



  const handleVerifyTransaction = (id: string) => {
    startTransition(async () => {
      const res = await verifyTransactionAction(id, "verified", "Verified from Finance Workspace");
      if (res.success) {
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: "verified" } : t));
        showToast(`Transaction ${id.slice(0, 8)} verified and persisted!`);
      }
    });
  };

  
  const handleBulkVerifyTransactions = (selectedRows: any[]) => {
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

  const handleBulkApproveCampaigns = (selectedRows: any[]) => {
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

  const handleApproveCampaign = (id: string) => {
    startTransition(async () => {
      const res = await verifyCampaignAction(id, "approved", "Approved from Moderation Workspace");
      if (res.success) {
        setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: "active" } : c));
        showToast(`Campaign ${id.slice(0, 8)} approved!`);
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

  if (activeTab === "LAUNCHER") {
    return (
      <div className="space-y-8">
        <LauncherHub onSelectWorkspace={(wsId) => handleSelectWorkspace(wsId)} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white border border-emerald-600 p-4 shadow-md rounded-xl text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> {feedbackMsg}
        </div>
      )}

      {/* Impersonation Modal */}
      <ImpersonationModal isOpen={isImpersonateOpen} onClose={() => setIsImpersonateOpen(false)} users={initialUsers} />

      {/* Workspace Tabs Header Bar removed */}

      {/* Global Needs Attention Widget moved to SUPER_ADMIN */}

      {/* WORKSPACE 1: SUPER ADMIN */}
      {activeTab === "SUPER_ADMIN" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex-1">
              <h1 className="font-sans font-semibold tracking-tight text-4xl text-slate-900">
                {navTab === "campaigns" ? "All Campaigns Desk" :
                 navTab === "creators" ? "Creator Profiles & Users" :
                 navTab === "audit_logs" ? "Platform Audit Logs" :
                 navTab === "flags" ? "Feature Flags & System Controls" :
                 "Executive Command Center"}
              </h1>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mt-1">
                Live Database Operational Status • Persisted Audit Logs
              </p>
            </div>
            
            {navTab === "overview" && (
              <button
                onClick={() => setIsImpersonateOpen(true)}
                className="h-10 px-4 bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 hover:bg-slate-900 transition-colors"
              >
                <Eye className="h-4 w-4" /> Impersonate User
              </button>
            )}
          </FadeIn>

          {navTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white border border-slate-200 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <h3 className="font-sans font-semibold tracking-tight text-2xl text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-blue-600" /> Global Needs Attention Queue
                  </h3>
                  <span className="text-xs font-medium uppercase text-blue-600 font-bold">{stats.pendingTransactions + stats.pendingCampaigns} Action Items</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-medium">
                  <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="font-bold text-[10px] uppercase text-blue-600">Pending MFS Verifications</div>
                    <div className="font-sans font-semibold tracking-tight text-2xl text-slate-900 mt-1">{stats.pendingTransactions} Tx</div>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="font-bold text-[10px] uppercase text-slate-400">Campaign Reviews</div>
                    <div className="font-sans font-semibold tracking-tight text-2xl text-slate-900 mt-1">{stats.pendingCampaigns} Pending</div>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="font-bold text-[10px] uppercase text-emerald-700">Verification Rate</div>
                    <div className="font-sans font-semibold tracking-tight text-2xl text-slate-900 mt-1">{stats.verificationRate}%</div>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="font-bold text-[10px] uppercase text-slate-400">Today's Volume</div>
                    <div className="font-sans font-semibold tracking-tight text-2xl text-slate-900 mt-1">{formatCurrency(stats.todayDonationVolume)}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white border border-slate-200 p-6 space-y-3 text-xs font-medium">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2 font-bold uppercase text-slate-900">
                  <span>Platform Snapshot</span>
                  <span className="text-[10px] text-slate-400">Live DB</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-slate-50 border border-slate-200">
                    <span className="text-slate-400">Total Users</span>
                    <span className="font-bold text-slate-900">{stats.totalUsers}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 border border-slate-200">
                    <span className="text-slate-400">Total Campaigns</span>
                    <span className="font-bold text-slate-900">{stats.totalCampaigns}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 border border-slate-200">
                    <span className="text-slate-400">Active Campaigns</span>
                    <span className="font-bold text-slate-900">{stats.activeCampaigns}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 border border-slate-200">
                    <span className="text-slate-400">Total Donations</span>
                    <span className="font-bold text-slate-900">{formatCurrency(stats.totalDonationVolume)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 border border-slate-200">
                    <span className="text-slate-400">Total Transactions</span>
                    <span className="font-bold text-slate-900">{stats.totalTransactions}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Live Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: "Total Revenue", value: formatCurrency(stats.totalDonationVolume), color: "#1D2927" },
              { label: "Total Users", value: stats.totalUsers.toString(), color: "#355C52" },
              { label: "Total Campaigns", value: stats.totalCampaigns.toString(), color: "#8C7A5B" },
              { label: "Verified Tx", value: stats.verifiedTransactions.toString(), color: "#355C52" },
              { label: "Pending Tx", value: stats.pendingTransactions.toString(), color: "#A84D2A" },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500" style={{ color: s.color }}>{s.label}</div>
                <div className="font-sans font-semibold tracking-tight text-2xl text-slate-900 mt-1">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Campaigns Section */}
          {(navTab === "campaigns") && (
            <div className="space-y-4">
              <h3 className="font-sans font-semibold tracking-tight text-2xl text-slate-900">All Platform Campaigns</h3>
              <AdvancedTable
                title="Campaigns"
                columns={[
                  { header: "Title", accessorKey: "title" },
                  { header: "Creator", accessorKey: (r) => r.creator?.name || "Creator" },
                  { header: "Goal", accessorKey: (r) => formatCurrency(r.goalAmount || 0) },
                  { header: "Raised", accessorKey: (r) => formatCurrency(r.raisedAmount || 0) },
                  { header: "Category", accessorKey: "category" },
                  { header: "Status", accessorKey: "status" },
                  {
                    header: "Investigate",
                    accessorKey: "id",
                    cell: (r) => (
                      <Link href={`/admin/campaigns/${r.id}`} className="px-2 py-1 bg-emerald-600 text-white font-mono text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
                        <Search className="h-3 w-3" /> Open
                      </Link>
                    )
                  },
                ]}
                data={campaigns}
                searchPlaceholder="Filter campaigns by title..."
              />
            </div>
          )}

          {/* Audit Trail from DB */}
          {(navTab === "audit_logs") && (
            <div className="space-y-4">
              <h3 className="font-sans font-semibold tracking-tight text-2xl text-slate-900">Platform Audit Trail (Persisted)</h3>
              <AdvancedTable
                title="Audit Logs"
                columns={[
                  { header: "Timestamp", accessorKey: (r) => new Date(r.createdAt).toLocaleString() },
                  { header: "Actor", accessorKey: (r) => `${r.actorName} (${r.actorRole})` },
                  { header: "Action", accessorKey: "action" },
                  { header: "Resource", accessorKey: (r) => `${r.resourceType}:${r.resourceId.slice(0, 8)}...` },
                  { header: "Reason", accessorKey: (r) => r.reason || "—" },
                ]}
                data={initialAuditLogs}
                searchPlaceholder="Filter audit trail by actor or action..."
              />
            </div>
          )}

          {/* Users Table with Investigate Links */}
          {(navTab === "creators") && (
            <div className="space-y-4">
              <h3 className="font-sans font-semibold tracking-tight text-2xl text-slate-900">All Creator & User Profiles</h3>
              <AdvancedTable
                title="Users"
                columns={[
                  { header: "Name", accessorKey: "name" },
                  { header: "Username", accessorKey: "username" },
                  { header: "Email", accessorKey: (r) => r.email || "—" },
                  { header: "Role", accessorKey: "role" },
                  { header: "Joined", accessorKey: (r) => new Date(r.createdAt).toLocaleDateString() },
                  {
                    header: "Investigate",
                    accessorKey: "id",
                    cell: (r) => (
                      <Link href={`/admin/users/${r.id}`} className="px-2 py-1 bg-slate-900 text-white font-mono text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
                        <Search className="h-3 w-3" /> Open
                      </Link>
                    )
                  }
                ]}
                data={initialUsers}
                searchPlaceholder="Search users by name or email..."
              />
            </div>
          )}

          {/* System Controls & Feature Flags */}
          {(navTab === "flags") && (
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 shadow-md rounded-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h4 className="font-sans font-semibold tracking-tight text-xl text-slate-900">System Maintenance Mode & Feature Flags</h4>
                  <p className="text-xs font-medium text-slate-500 mt-1">Pauses public submissions for scheduled system updates.</p>
                </div>
                <button
                  onClick={() => {
                    setMaintenanceMode(!maintenanceMode);
                    showToast(`Maintenance mode turned ${!maintenanceMode ? 'ON' : 'OFF'}`);
                  }}
                  className={`h-10 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 border transition-all ${maintenanceMode ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-900 border-slate-900'}`}
                >
                  {maintenanceMode ? "Maintenance Active" : "Enable Maintenance"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* WORKSPACE 2: FINANCE */}
      {activeTab === "FINANCE" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h1 className="font-sans font-semibold tracking-tight text-4xl text-slate-900">
                {navTab === "verification_queue" ? "Manual MFS Verification Queue" :
                 navTab === "statement_import" ? "Statement Import & Reconciliation" :
                 navTab === "withdrawals" ? "Withdrawals & Payouts Queue" :
                 navTab === "audit" ? "Financial Audit Trail" :
                 "Finance & Treasury Workspace"}
              </h1>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Manual MFS verification, statement matching & payout logs • Actions Persist to DB
              </p>
            </div>
          </FadeIn>

          {(navTab === "statement_import") && (
            <div className="bg-white border border-slate-200 p-6 space-y-4 text-xs font-medium">
              <h3 className="font-sans font-semibold tracking-tight text-2xl text-slate-900">Bank & MFS Statement Import</h3>
              <p className="text-slate-500">Upload bKash/Nagad daily CSV or Excel statements for automated batch reconciliation.</p>
              <div className="flex items-center gap-3">
                <input type="file" className="text-xs text-slate-500 file:bg-slate-900 file:text-white file:border-0 file:px-3 file:py-1.5 file:font-mono file:text-[10px] file:uppercase" />
                <button onClick={() => showToast("Statement uploaded for batch matching.")} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium font-bold uppercase">Import Statement</button>
              </div>
            </div>
          )}

          {(navTab === "withdrawals") && (
            <div className="bg-white border border-slate-200 p-6 space-y-4 text-xs font-medium">
              <h3 className="font-sans font-semibold tracking-tight text-2xl text-slate-900">Withdrawal Payout Requests</h3>
              <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm text-emerald-700">
                5 pending withdrawal requests totaling ৳145,000 awaiting treasury release.
              </div>
            </div>
          )}

          <AdvancedTable
            title={navTab === "verification_queue" ? "Pending Verifications Queue" : "MFS Verification Ledger"}
            bulkActions={navTab === "verification_queue" ? [{ label: "Verify Selected", action: handleBulkVerifyTransactions }] : []}
            columns={[
              { header: "Tx ID", accessorKey: (r) => r.id.slice(0, 8) + "..." },
              { header: "Donor Name", accessorKey: (r) => r.donorName || "Anonymous" },
              { header: "Amount", accessorKey: (r) => formatCurrency(r.amount) },
              { header: "Method", accessorKey: (r) => r.method || "bKash" },
              { header: "Phone", accessorKey: (r) => r.phone || "N/A" },
              { header: "Campaign", accessorKey: (r) => r.campaign || "—" },
              { header: "Status", accessorKey: "status" },
              {
                header: "Investigate",
                accessorKey: "id",
                cell: (r) => (
                  <Link href={`/admin/transactions/${r.id}`} className="px-2 py-1 bg-emerald-600 text-white font-mono text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
                    <Search className="h-3 w-3" /> Open
                  </Link>
                )
              },
              {
                header: "Action",
                accessorKey: "status",
                cell: (r) => r.status === "verified" ? (
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold uppercase border border-emerald-600">Verified</span>
                ) : r.status === "rejected" ? (
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 font-mono text-[9px] font-bold uppercase border border-blue-600">Rejected</span>
                ) : (
                  <button
                    onClick={() => handleVerifyTransaction(r.id)}
                    disabled={isPending}
                    className="px-3 py-1 bg-slate-900 text-white hover:bg-emerald-600 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors disabled:opacity-50"
                  >
                    Verify Tx
                  </button>
                )
              }
            ]}
            data={navTab === "verification_queue" ? transactions.filter(t => t.status === "pending" || t.status === "PENDING") : transactions}
            searchPlaceholder="Filter transactions by ID or donor name..."
          />
        </div>
      )}

      {/* WORKSPACE 3: MODERATION */}
      {activeTab === "MODERATION" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-slate-200 pb-4">
            <h1 className="font-sans font-semibold tracking-tight text-4xl text-slate-900">
              {navTab === "pending_campaigns" ? "Pending Campaign Reviews" :
               navTab === "nid_verification" ? "Creator NID & Passport Verification Desk" :
               navTab === "log" ? "Moderation Activity Log" :
               "Campaign Moderation Workspace"}
            </h1>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Review Submitted Campaigns • NID & Identity Document Inspection
            </p>
          </FadeIn>

          {(navTab === "nid_verification") && (
            <div className="bg-white border border-slate-200 p-6 space-y-3 text-xs font-medium">
              <h3 className="font-sans font-semibold tracking-tight text-2xl text-slate-900">NID / Passport Review Queue</h3>
              <p className="text-slate-500">7 creators have uploaded government identity documents awaiting manual verification.</p>
            </div>
          )}

          <AdvancedTable
            title="Campaign Approval Desk"
            bulkActions={navTab === "pending_campaigns" ? [{ label: "Approve Selected", action: handleBulkApproveCampaigns }] : []}
            columns={[
              { header: "Title", accessorKey: "title" },
              { header: "Creator", accessorKey: (r) => r.creator?.name || "Creator" },
              { header: "Goal", accessorKey: (r) => formatCurrency(r.goalAmount || 0) },
              { header: "Raised", accessorKey: (r) => formatCurrency(r.raisedAmount || 0) },
              { header: "Category", accessorKey: "category" },
              { header: "Status", accessorKey: (r) => r.status },
              {
                header: "Investigate",
                accessorKey: "id",
                cell: (r) => (
                  <Link href={`/admin/campaigns/${r.id}`} className="px-2 py-1 bg-emerald-600 text-white font-mono text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
                    <Search className="h-3 w-3" /> Open
                  </Link>
                )
              },
              {
                header: "Action",
                accessorKey: "id",
                cell: (r) => r.status === "active" ? (
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold uppercase border border-emerald-600">Approved</span>
                ) : r.status === "rejected" ? (
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 font-mono text-[9px] font-bold uppercase border border-blue-600">Rejected</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveCampaign(r.id)}
                      disabled={isPending}
                      className="px-3 py-1 bg-slate-900 text-white hover:bg-emerald-600 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectCampaign(r.id)}
                      disabled={isPending}
                      className="px-2 py-1 bg-blue-50 text-blue-600 border border-blue-600 text-sm font-medium font-bold uppercase disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                )
              }
            ]}
            data={navTab === "pending_campaigns" ? campaigns.filter(c => c.status !== "active" && c.status !== "rejected") : campaigns}
            searchPlaceholder="Filter campaigns by title..."
          />
        </div>
      )}
      {/* WORKSPACE 7: CONTENT */}
      {activeTab === "CONTENT" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-slate-200 pb-4">
            <h1 className="font-sans font-semibold tracking-tight text-4xl text-slate-900">
              {navTab === "homepage" ? "Homepage Curator & Featured Stories" :
               navTab === "emails" ? "Resend Email & Communication Center" :
               "Platform Content & CMS"}
            </h1>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Homepage & Content Controls</p>
          </FadeIn>

          {navTab === "emails" ? (
            <EmailCenterHub showToast={showToast} />
          ) : (
            <>
              <div className="bg-white border border-slate-200 p-6 space-y-4">
                <h3 className="font-sans font-semibold tracking-tight text-2xl text-slate-900">Global Announcement Banner</h3>
                <input
                  type="text"
                  defaultValue="Emergency Sylhet Flood Relief: 100% of contributions reach families directly."
                  className="w-full h-10 px-4 border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:border-slate-900"
                />
                <button
                  onClick={() => showToast("Announcement bar updated!")}
                  className="h-9 px-4 bg-slate-900 text-white text-sm font-medium font-bold uppercase"
                >
                  Update Banner Text
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-sans font-semibold tracking-tight text-2xl text-slate-900">Featured Dreams & Stories Curator Desk</h3>
                    <p className="text-xs font-medium text-slate-500">Manage which verified campaigns are featured on the homepage carousel and cards.</p>
                  </div>
                </div>

                <AdvancedTable
                  title="Featured Stories Curator"
                  columns={[
                    { header: "Title", accessorKey: "title" },
                    { header: "Creator", accessorKey: (r) => r.creator?.name || "Creator" },
                    { header: "Goal", accessorKey: (r) => formatCurrency(r.goalAmount || 0) },
                    { header: "Raised", accessorKey: (r) => formatCurrency(r.raisedAmount || 0) },
                    { header: "Category", accessorKey: "category" },
                    {
                      header: "Featured Status",
                      accessorKey: "isFeatured",
                      cell: (r) => r.isFeatured ? (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold uppercase border border-emerald-600">Featured Story</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-500 font-mono text-[9px] font-bold uppercase border border-slate-200">Standard</span>
                      )
                    },
                    {
                      header: "Actions",
                      accessorKey: "id",
                      cell: (r) => (
                        <button
                          onClick={() => handleToggleFeatured(r.id, !!r.isFeatured)}
                          disabled={isPending}
                          className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors disabled:opacity-50 ${r.isFeatured ? 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
                        >
                          {r.isFeatured ? "Remove Featured" : "Make Featured Story"}
                        </button>
                      )
                    }
                  ]}
                  data={campaigns}
                  searchPlaceholder="Filter campaigns to feature..."
                />
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-200">
                <div>
                  <h3 className="font-sans font-semibold tracking-tight text-2xl text-slate-900">Success Stories Curator (&quot;The pages we write together&quot;)</h3>
                  <p className="text-xs font-medium text-slate-500">Manage completed campaigns featured on the homepage Success Stories carousel.</p>
                </div>

                <AdvancedTable
                  title="Success Stories Curator"
                  columns={[
                    { header: "Title", accessorKey: "title" },
                    { header: "Creator", accessorKey: (r) => r.creator?.name || "Creator" },
                    { header: "Goal", accessorKey: (r) => formatCurrency(r.goalAmount || 0) },
                    { header: "Raised", accessorKey: (r) => formatCurrency(r.raisedAmount || 0) },
                    { header: "Status", accessorKey: (r) => r.status },
                    {
                      header: "Success Story Badge",
                      accessorKey: "status",
                      cell: (r) => r.status === "completed" ? (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold uppercase border border-emerald-600">Verified Success</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-500 font-mono text-[9px] font-bold uppercase border border-slate-200">In Progress</span>
                      )
                    },
                    {
                      header: "Actions",
                      accessorKey: "id",
                      cell: (r) => (
                        <button
                          onClick={() => handleToggleSuccessStory(r.id, r.status)}
                          disabled={isPending}
                          className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors disabled:opacity-50 ${r.status === "completed" ? 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50' : 'bg-emerald-600 text-white hover:bg-slate-900'}`}
                        >
                          {r.status === "completed" ? "Remove Success Story" : "Mark as Success Story"}
                        </button>
                      )
                    }
                  ]}
                  data={campaigns}
                  searchPlaceholder="Filter campaigns for success stories..."
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* WORKSPACE 8: PLATFORM */}
      {activeTab === "PLATFORM" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-slate-200 pb-4">
            <h1 className="font-sans font-semibold tracking-tight text-4xl text-slate-900">
              {navTab === "maintenance" ? "Maintenance Mode & Feature Flags" :
               navTab === "verification_settings" ? "Document Verification Settings" :
               "Platform Configuration"}
            </h1>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">System Controls & Feature Flags</p>
          </FadeIn>

          <VerificationSettingsHub showToast={showToast} />
          
          <div className="pt-6 border-t border-slate-200">
            <FeatureFlagsHub showToast={showToast} />
          </div>

          <div className="pt-6 border-t border-slate-200">
            <SeoSettingsHub showToast={showToast} />
          </div>

          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 shadow-md rounded-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h4 className="font-sans font-semibold tracking-tight text-xl text-slate-900">System Maintenance Mode</h4>
                <p className="text-xs font-medium text-slate-500 mt-1">Pauses public submissions for scheduled system updates.</p>
              </div>
              <button
                onClick={() => {
                  setMaintenanceMode(!maintenanceMode);
                  showToast(`Maintenance mode turned ${!maintenanceMode ? 'ON' : 'OFF'}`);
                }}
                className={`h-10 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 border transition-all ${maintenanceMode ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-900 border-slate-900'}`}
              >
                {maintenanceMode ? "Maintenance Active" : "Enable Maintenance"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export function AdminClientHub(props: {
  stats: DashboardStats;
  initialTransactions?: any[];
  initialCampaigns?: any[];
  initialUsers?: any[];
  initialAuditLogs?: any[];
}) {
  return (
    <Suspense fallback={<div className="p-8 text-xs font-medium">Loading Admin Workspace Stage...</div>}>
      <AdminClientHubContent {...props} />
    </Suspense>
  );
}

