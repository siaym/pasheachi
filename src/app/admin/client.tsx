"use client";

import { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import { WORKSPACES, WorkspaceId } from "@/lib/back-office/workspaces";
import { AdvancedTable } from "@/components/back-office/advanced-table";
import { LauncherHub } from "@/components/back-office/workspaces/LauncherHub";
import { ImpersonationModal } from "@/components/back-office/impersonation-modal";
import { verifyCampaignAction, verifyTransactionAction } from "@/app/admin/actions";
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


  const [transactions, setTransactions] = useState(initialTransactions);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [isImpersonateOpen, setIsImpersonateOpen] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3000);
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
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D2927] text-[#F7F4ED] border border-[#355C52] p-4 shadow-paper font-mono text-xs uppercase tracking-widest flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> {feedbackMsg}
        </div>
      )}

      {/* Impersonation Modal */}
      <ImpersonationModal isOpen={isImpersonateOpen} onClose={() => setIsImpersonateOpen(false)} users={initialUsers} />

      {/* Workspace Tabs Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FAF8F3] border border-[#D9D3C7] p-2">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => handleSelectWorkspace("LAUNCHER")}
            className="px-3 py-2 bg-[#FAF8F3] border border-[#1D2927] font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927] hover:bg-[#1D2927] hover:text-[#FAF8F3] transition-colors flex items-center gap-1.5"
          >
            <Layers className="h-3.5 w-3.5 text-[#A84D2A]" /> Launcher
          </button>

          {(Object.keys(WORKSPACES) as WorkspaceId[]).map((wsKey) => {
            const ws = WORKSPACES[wsKey];
            const isSelected = activeTab === wsKey;
            const Icon = ws.icon;
            return (
              <button
                key={wsKey}
                onClick={() => handleSelectWorkspace(wsKey)}
                className={`px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border transition-all ${isSelected ? 'bg-[#1D2927] text-[#FAF8F3] border-[#1D2927] shadow-sm' : 'bg-[#F7F4ED] text-[#53605C] border-transparent hover:border-[#D9D3C7] hover:text-[#1D2927]'}`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{ws.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Super Admin Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsImpersonateOpen(true)}
            className="h-8 px-3 bg-[#A84D2A] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"
          >
            <Eye className="h-3.5 w-3.5" /> Impersonate User
          </button>
        </div>
      </div>

      {/* Global "Needs Attention" Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <PaperLift className="lg:col-span-8 bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-[#D9D3C7] pb-3">
            <h3 className="font-editorial text-2xl text-[#1D2927] flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#A84D2A]" /> Global Needs Attention Queue
            </h3>
            <span className="font-mono text-xs uppercase text-[#A84D2A] font-bold">{stats.pendingTransactions + stats.pendingCampaigns} Action Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3 bg-[#FDF4F0] border border-[#A84D2A]">
              <div className="font-bold text-[10px] uppercase text-[#A84D2A]">Pending MFS Verifications</div>
              <div className="font-editorial text-2xl text-[#1D2927] mt-1">{stats.pendingTransactions} Tx</div>
            </div>
            <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
              <div className="font-bold text-[10px] uppercase text-[#8C7A5B]">Campaign Reviews</div>
              <div className="font-editorial text-2xl text-[#1D2927] mt-1">{stats.pendingCampaigns} Pending</div>
            </div>
            <div className="p-3 bg-[#E5EEE8] border border-[#355C52]">
              <div className="font-bold text-[10px] uppercase text-[#355C52]">Verification Rate</div>
              <div className="font-editorial text-2xl text-[#1D2927] mt-1">{stats.verificationRate}%</div>
            </div>
            <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
              <div className="font-bold text-[10px] uppercase text-[#8C7A5B]">Today&apos;s Volume</div>
              <div className="font-editorial text-2xl text-[#1D2927] mt-1">{formatCurrency(stats.todayDonationVolume)}</div>
            </div>
          </div>
        </PaperLift>

        <PaperLift className="lg:col-span-4 bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-[#D9D3C7] pb-2 font-bold uppercase text-[#1D2927]">
            <span>Platform Snapshot</span>
            <span className="text-[10px] text-[#8C7A5B]">Live DB</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between p-2 bg-[#F7F4ED] border border-[#D9D3C7]">
              <span className="text-[#8C7A5B]">Total Users</span>
              <span className="font-bold text-[#1D2927]">{stats.totalUsers}</span>
            </div>
            <div className="flex justify-between p-2 bg-[#F7F4ED] border border-[#D9D3C7]">
              <span className="text-[#8C7A5B]">Total Campaigns</span>
              <span className="font-bold text-[#1D2927]">{stats.totalCampaigns}</span>
            </div>
            <div className="flex justify-between p-2 bg-[#F7F4ED] border border-[#D9D3C7]">
              <span className="text-[#8C7A5B]">Active Campaigns</span>
              <span className="font-bold text-[#1D2927]">{stats.activeCampaigns}</span>
            </div>
            <div className="flex justify-between p-2 bg-[#F7F4ED] border border-[#D9D3C7]">
              <span className="text-[#8C7A5B]">Total Donations</span>
              <span className="font-bold text-[#1D2927]">{formatCurrency(stats.totalDonationVolume)}</span>
            </div>
            <div className="flex justify-between p-2 bg-[#F7F4ED] border border-[#D9D3C7]">
              <span className="text-[#8C7A5B]">Total Transactions</span>
              <span className="font-bold text-[#1D2927]">{stats.totalTransactions}</span>
            </div>
          </div>
        </PaperLift>
      </div>

      {/* WORKSPACE 1: SUPER ADMIN */}
      {activeTab === "SUPER_ADMIN" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <h1 className="font-editorial text-4xl text-[#1D2927]">
                {navTab === "campaigns" ? "All Campaigns Desk" :
                 navTab === "creators" ? "Creator Profiles & Users" :
                 navTab === "audit_logs" ? "Platform Audit Logs" :
                 navTab === "flags" ? "Feature Flags & System Controls" :
                 "Executive Command Center"}
              </h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                Live Database Operational Status • Persisted Audit Logs
              </p>
            </div>
          </FadeIn>

          {/* Live Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: "Total Revenue", value: formatCurrency(stats.totalDonationVolume), color: "#1D2927" },
              { label: "Total Users", value: stats.totalUsers.toString(), color: "#355C52" },
              { label: "Total Campaigns", value: stats.totalCampaigns.toString(), color: "#8C7A5B" },
              { label: "Verified Tx", value: stats.verifiedTransactions.toString(), color: "#355C52" },
              { label: "Pending Tx", value: stats.pendingTransactions.toString(), color: "#A84D2A" },
            ].map((s, i) => (
              <PaperLift key={i} className="bg-[#FAF8F3] border border-[#D9D3C7] p-4">
                <div className="font-mono text-[10px] uppercase font-bold" style={{ color: s.color }}>{s.label}</div>
                <div className="font-editorial text-2xl text-[#1D2927] mt-1">{s.value}</div>
              </PaperLift>
            ))}
          </div>

          {/* Campaigns Section */}
          {(navTab === "overview" || navTab === "campaigns") && (
            <div className="space-y-4">
              <h3 className="font-editorial text-2xl text-[#1D2927]">All Platform Campaigns</h3>
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
                      <Link href={`/admin/campaigns/${r.id}`} className="px-2 py-1 bg-[#355C52] text-[#FAF8F3] font-mono text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
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
          {(navTab === "overview" || navTab === "audit_logs") && (
            <div className="space-y-4">
              <h3 className="font-editorial text-2xl text-[#1D2927]">Platform Audit Trail (Persisted)</h3>
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
          {(navTab === "overview" || navTab === "creators") && (
            <div className="space-y-4">
              <h3 className="font-editorial text-2xl text-[#1D2927]">All Creator & User Profiles</h3>
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
                      <Link href={`/admin/users/${r.id}`} className="px-2 py-1 bg-[#1D2927] text-[#FAF8F3] font-mono text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
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
          {(navTab === "overview" || navTab === "flags") && (
            <PaperLift className="bg-[#FAF8F3] border border-[#1D2927] p-6 shadow-paper space-y-6">
              <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4">
                <div>
                  <h4 className="font-editorial text-xl text-[#1D2927]">System Maintenance Mode & Feature Flags</h4>
                  <p className="font-mono text-xs text-[#53605C] mt-1">Pauses public submissions for scheduled system updates.</p>
                </div>
                <button
                  onClick={() => {
                    setMaintenanceMode(!maintenanceMode);
                    showToast(`Maintenance mode turned ${!maintenanceMode ? 'ON' : 'OFF'}`);
                  }}
                  className={`h-10 px-6 font-mono text-[10px] font-bold uppercase tracking-widest border transition-all ${maintenanceMode ? 'bg-[#A84D2A] text-[#FAF8F3] border-[#A84D2A]' : 'bg-[#FAF8F3] text-[#1D2927] border-[#1D2927]'}`}
                >
                  {maintenanceMode ? "Maintenance Active" : "Enable Maintenance"}
                </button>
              </div>
            </PaperLift>
          )}
        </div>
      )}

      {/* WORKSPACE 2: FINANCE */}
      {activeTab === "FINANCE" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <h1 className="font-editorial text-4xl text-[#1D2927]">
                {navTab === "verification_queue" ? "Manual MFS Verification Queue" :
                 navTab === "statement_import" ? "Statement Import & Reconciliation" :
                 navTab === "withdrawals" ? "Withdrawals & Payouts Queue" :
                 navTab === "audit" ? "Financial Audit Trail" :
                 "Finance & Treasury Workspace"}
              </h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                Manual MFS verification, statement matching & payout logs • Actions Persist to DB
              </p>
            </div>
          </FadeIn>

          {(navTab === "statement_import") && (
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4 font-mono text-xs">
              <h3 className="font-editorial text-2xl text-[#1D2927]">Bank & MFS Statement Import</h3>
              <p className="text-[#53605C]">Upload bKash/Nagad daily CSV or Excel statements for automated batch reconciliation.</p>
              <div className="flex items-center gap-3">
                <input type="file" className="text-xs text-[#53605C] file:bg-[#1D2927] file:text-[#FAF8F3] file:border-0 file:px-3 file:py-1.5 file:font-mono file:text-[10px] file:uppercase" />
                <button onClick={() => showToast("Statement uploaded for batch matching.")} className="px-4 py-2 bg-[#355C52] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase">Import Statement</button>
              </div>
            </PaperLift>
          )}

          {(navTab === "withdrawals") && (
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4 font-mono text-xs">
              <h3 className="font-editorial text-2xl text-[#1D2927]">Withdrawal Payout Requests</h3>
              <div className="p-3 bg-[#E5EEE8] border border-[#355C52] text-[#355C52]">
                5 pending withdrawal requests totaling ৳145,000 awaiting treasury release.
              </div>
            </PaperLift>
          )}

          <AdvancedTable
            title={navTab === "verification_queue" ? "Pending Verifications Queue" : "MFS Verification Ledger"}
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
                  <Link href={`/admin/transactions/${r.id}`} className="px-2 py-1 bg-[#355C52] text-[#FAF8F3] font-mono text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
                    <Search className="h-3 w-3" /> Open
                  </Link>
                )
              },
              {
                header: "Action",
                accessorKey: "status",
                cell: (r) => r.status === "verified" ? (
                  <span className="px-2 py-0.5 bg-[#E5EEE8] text-[#355C52] font-mono text-[9px] font-bold uppercase border border-[#355C52]">Verified</span>
                ) : r.status === "rejected" ? (
                  <span className="px-2 py-0.5 bg-[#FDF4F0] text-[#A84D2A] font-mono text-[9px] font-bold uppercase border border-[#A84D2A]">Rejected</span>
                ) : (
                  <button
                    onClick={() => handleVerifyTransaction(r.id)}
                    disabled={isPending}
                    className="px-3 py-1 bg-[#1D2927] text-[#FAF8F3] hover:bg-[#355C52] font-mono text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
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
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl text-[#1D2927]">
              {navTab === "pending_campaigns" ? "Pending Campaign Reviews" :
               navTab === "nid_verification" ? "Creator NID & Passport Verification Desk" :
               navTab === "log" ? "Moderation Activity Log" :
               "Campaign Moderation Workspace"}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
              Review Submitted Campaigns • NID & Identity Document Inspection
            </p>
          </FadeIn>

          {(navTab === "nid_verification") && (
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3 font-mono text-xs">
              <h3 className="font-editorial text-2xl text-[#1D2927]">NID / Passport Review Queue</h3>
              <p className="text-[#53605C]">7 creators have uploaded government identity documents awaiting manual verification.</p>
            </PaperLift>
          )}

          <AdvancedTable
            title="Campaign Approval Desk"
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
                  <Link href={`/admin/campaigns/${r.id}`} className="px-2 py-1 bg-[#355C52] text-[#FAF8F3] font-mono text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
                    <Search className="h-3 w-3" /> Open
                  </Link>
                )
              },
              {
                header: "Action",
                accessorKey: "id",
                cell: (r) => r.status === "active" ? (
                  <span className="px-2 py-0.5 bg-[#E5EEE8] text-[#355C52] font-mono text-[9px] font-bold uppercase border border-[#355C52]">Approved</span>
                ) : r.status === "rejected" ? (
                  <span className="px-2 py-0.5 bg-[#FDF4F0] text-[#A84D2A] font-mono text-[9px] font-bold uppercase border border-[#A84D2A]">Rejected</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveCampaign(r.id)}
                      disabled={isPending}
                      className="px-3 py-1 bg-[#1D2927] text-[#FAF8F3] hover:bg-[#355C52] font-mono text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectCampaign(r.id)}
                      disabled={isPending}
                      className="px-2 py-1 bg-[#FDF4F0] text-[#A84D2A] border border-[#A84D2A] font-mono text-[10px] font-bold uppercase disabled:opacity-50"
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

      {/* WORKSPACE 4: TRUST & SAFETY */}
      {activeTab === "TRUST_SAFETY" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl text-[#1D2927]">
              {navTab === "flagged" ? "Flagged & High Risk Campaigns" :
               navTab === "suspicious_tx" ? "Suspicious Transactions Monitoring" :
               navTab === "blacklist" ? "Blacklisted Users & IPs Registry" :
               "Trust & Safety Risk Center"}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">Fraud & Risk Analysis • IP & User Suspicious Patterns</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-2">
              <div className="font-mono text-[10px] uppercase font-bold text-[#8C7A5B]">Platform Risk Score</div>
              <div className="font-editorial text-3xl text-[#1D2927]">0.01 / 1.0</div>
              <p className="font-mono text-[9px] uppercase text-[#355C52]">Low Risk Profile</p>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-2">
              <div className="font-mono text-[10px] uppercase font-bold text-[#8C7A5B]">Rejected Campaigns</div>
              <div className="font-editorial text-3xl text-[#1D2927]">{stats.rejectedCampaigns}</div>
              <p className="font-mono text-[9px] uppercase text-[#53605C]">All time</p>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-2">
              <div className="font-mono text-[10px] uppercase font-bold text-[#8C7A5B]">Verification Rate</div>
              <div className="font-editorial text-3xl text-[#1D2927]">{stats.verificationRate}%</div>
              <p className="font-mono text-[9px] uppercase text-[#53605C]">Transactions verified</p>
            </PaperLift>
          </div>

          <AdvancedTable
            title={navTab === "suspicious_tx" ? "Suspicious Transactions Queue" : "Risk Analysis Log"}
            columns={[
              { header: "Item ID", accessorKey: (r) => r.id.slice(0, 8) + "..." },
              { header: "Donor / Actor", accessorKey: (r) => r.donorName || "User" },
              { header: "Amount", accessorKey: (r) => formatCurrency(r.amount || 0) },
              { header: "Status", accessorKey: "status" },
            ]}
            data={transactions}
            searchPlaceholder="Search audit and transaction risks..."
          />
        </div>
      )}

      {/* WORKSPACE 5: SUPPORT */}
      {activeTab === "SUPPORT" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl text-[#1D2927]">
              {navTab === "tickets" ? "Open Support Tickets Queue" :
               navTab === "appeals" ? "Campaign Verification Appeals" :
               navTab === "kb" ? "Support Knowledge Base & FAQs" :
               "Customer Support Helpdesk"}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">User Inquiries, Creator Appeals & Helpdesk</p>
          </FadeIn>

          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-12 text-center">
            <Headphones className="h-12 w-12 text-[#8C7A5B] mx-auto mb-4" />
            <h3 className="font-editorial text-2xl text-[#1D2927]">
              {navTab === "appeals" ? "No Active Campaign Appeals" : "Support Queue Clear"}
            </h3>
            <p className="font-mono text-xs text-[#53605C] mt-2">All creator and donor tickets are currently up to date.</p>
          </PaperLift>
        </div>
      )}

      {/* WORKSPACE 6: ANALYTICS */}
      {activeTab === "ANALYTICS" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl text-[#1D2927]">
              {navTab === "growth" ? "Platform Growth Trends & Revenue Velocity" :
               navTab === "categories" ? "Category Performance Leaderboard" :
               "Business Analytics & BI"}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">Live Database Intelligence & Performance Metrics</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3">
              <div className="font-bold text-[#1D2927] uppercase text-[10px]">Total Revenue</div>
              <div className="font-editorial text-4xl text-[#1D2927]">{formatCurrency(stats.totalDonationVolume)}</div>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3">
              <div className="font-bold text-[#1D2927] uppercase text-[10px]">Total Campaigns</div>
              <div className="font-editorial text-4xl text-[#1D2927]">{stats.totalCampaigns}</div>
              <div className="text-[#53605C]">{stats.activeCampaigns} active • {stats.rejectedCampaigns} rejected</div>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3">
              <div className="font-bold text-[#1D2927] uppercase text-[10px]">Total Users</div>
              <div className="font-editorial text-4xl text-[#1D2927]">{stats.totalUsers}</div>
            </PaperLift>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3">
              <div className="font-bold text-[#1D2927] uppercase text-[10px]">Total Transactions</div>
              <div className="font-editorial text-4xl text-[#1D2927]">{stats.totalTransactions}</div>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3">
              <div className="font-bold text-[#1D2927] uppercase text-[10px]">Verified Tx</div>
              <div className="font-editorial text-4xl text-[#355C52]">{stats.verifiedTransactions}</div>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3">
              <div className="font-bold text-[#1D2927] uppercase text-[10px]">Today&apos;s Volume</div>
              <div className="font-editorial text-4xl text-[#A84D2A]">{formatCurrency(stats.todayDonationVolume)}</div>
            </PaperLift>
          </div>
        </div>
      )}

      {/* WORKSPACE 7: CONTENT */}
      {activeTab === "CONTENT" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl text-[#1D2927]">
              {navTab === "homepage" ? "Homepage Curator & Featured Stories" :
               navTab === "emails" ? "Automated Email & Notification Templates" :
               "Platform Content & CMS"}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">Homepage & Banner Controls</p>
          </FadeIn>

          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4">
            <h3 className="font-editorial text-2xl text-[#1D2927]">Global Announcement Banner</h3>
            <input
              type="text"
              defaultValue="Emergency Sylhet Flood Relief: 100% of contributions reach families directly."
              className="w-full h-10 px-4 border border-[#D9D3C7] bg-[#F7F4ED] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            />
            <button
              onClick={() => showToast("Announcement bar updated!")}
              className="h-9 px-4 bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase"
            >
              Update Banner Text
            </button>
          </PaperLift>
        </div>
      )}

      {/* WORKSPACE 8: PLATFORM */}
      {activeTab === "PLATFORM" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl text-[#1D2927]">
              {navTab === "maintenance" ? "Maintenance Mode & Feature Flags" :
               navTab === "security" ? "Security Parameters & Active Sessions" :
               "Platform Configuration"}
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">System Controls & Feature Flags</p>
          </FadeIn>

          <PaperLift className="bg-[#FAF8F3] border border-[#1D2927] p-6 shadow-paper space-y-6">
            <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4">
              <div>
                <h4 className="font-editorial text-xl text-[#1D2927]">System Maintenance Mode</h4>
                <p className="font-mono text-xs text-[#53605C] mt-1">Pauses public submissions for scheduled system updates.</p>
              </div>
              <button
                onClick={() => {
                  setMaintenanceMode(!maintenanceMode);
                  showToast(`Maintenance mode turned ${!maintenanceMode ? 'ON' : 'OFF'}`);
                }}
                className={`h-10 px-6 font-mono text-[10px] font-bold uppercase tracking-widest border transition-all ${maintenanceMode ? 'bg-[#A84D2A] text-[#FAF8F3] border-[#A84D2A]' : 'bg-[#FAF8F3] text-[#1D2927] border-[#1D2927]'}`}
              >
                {maintenanceMode ? "Maintenance Active" : "Enable Maintenance"}
              </button>
            </div>
          </PaperLift>
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
    <Suspense fallback={<div className="p-8 font-mono text-xs">Loading Admin Workspace Stage...</div>}>
      <AdminClientHubContent {...props} />
    </Suspense>
  );
}

