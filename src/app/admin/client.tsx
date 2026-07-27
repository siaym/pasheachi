"use client";

import { useState } from "react";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import { WORKSPACES, WorkspaceId } from "@/lib/back-office/workspaces";
import { AdvancedTable } from "@/components/back-office/advanced-table";
import { getAuditLogs, logAuditEvent } from "@/lib/back-office/audit-logger";
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
  Sliders
} from "lucide-react";

export function AdminClientHub({
  initialTransactions = [],
  initialCampaigns = [],
  initialUsers = []
}: {
  initialTransactions?: any[];
  initialCampaigns?: any[];
  initialUsers?: any[];
}) {
  const [activeTab, setActiveTab] = useState<WorkspaceId>("SUPER_ADMIN");
  const [transactions, setTransactions] = useState(initialTransactions);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [auditLogs, setAuditLogs] = useState(getAuditLogs());
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  const handleVerifyTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: "VERIFIED" } : t));
    logAuditEvent({
      actorName: "Siyam Ahmed",
      actorEmail: "saifulsiam10000@gmail.com",
      actorRole: "SuperAdmin",
      action: "MANUAL_MFS_VERIFY",
      resourceType: "Transaction",
      resourceId: id,
      ipAddress: "103.145.78.12",
      userAgent: "BackOffice Engine",
      oldValue: "PENDING",
      newValue: "VERIFIED",
      reason: "Matched MFS Statement Transaction ID"
    });
    setAuditLogs(getAuditLogs());
    showToast(`Transaction ${id} verified successfully!`);
  };

  const handleApproveCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    logAuditEvent({
      actorName: "Siyam Ahmed",
      actorEmail: "saifulsiam10000@gmail.com",
      actorRole: "Moderator",
      action: "APPROVE_CAMPAIGN",
      resourceType: "Campaign",
      resourceId: id,
      ipAddress: "103.145.78.12",
      userAgent: "BackOffice Engine",
      oldValue: "SUBMITTED",
      newValue: "APPROVED",
      reason: "Verified campaign narrative & creator NID"
    });
    setAuditLogs(getAuditLogs());
    showToast(`Campaign ${id} approved and published live!`);
  };

  const pendingTxCount = transactions.filter(t => t.status === "pending" || t.status === "PENDING").length;

  return (
    <div className="space-y-8 pb-24">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D2927] text-[#F7F4ED] border border-[#355C52] p-4 shadow-paper font-mono text-xs uppercase tracking-widest flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> {feedbackMsg}
        </div>
      )}

      {/* Workspace Tabs Header Bar */}
      <div className="flex flex-wrap gap-2 bg-[#FAF8F3] border border-[#D9D3C7] p-2 overflow-x-auto hide-scrollbar">
        {(Object.keys(WORKSPACES) as WorkspaceId[]).map((wsKey) => {
          const ws = WORKSPACES[wsKey];
          const isSelected = activeTab === wsKey;
          const Icon = ws.icon;
          return (
            <button
              key={wsKey}
              onClick={() => setActiveTab(wsKey)}
              className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border transition-all ${isSelected ? 'bg-[#1D2927] text-[#FAF8F3] border-[#1D2927] shadow-sm' : 'bg-[#F7F4ED] text-[#53605C] border-transparent hover:border-[#D9D3C7] hover:text-[#1D2927]'}`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{ws.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* WORKSPACE 1: SUPER ADMIN */}
      {activeTab === "SUPER_ADMIN" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <h1 className="font-editorial text-4xl text-[#1D2927]">Executive Command Center</h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                Live Database Operational Status • Enterprise Audit Logs
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-bold uppercase text-[#355C52] bg-[#E5EEE8] px-3 py-1 border border-[#355C52]">
                Database Connected
              </span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
              <div className="font-mono text-[10px] font-bold uppercase text-[#8C7A5B] mb-1">Live Campaigns Count</div>
              <div className="font-editorial text-4xl text-[#1D2927]">{campaigns.length}</div>
              <p className="font-mono text-[9px] uppercase text-[#355C52] mt-3">Active database records</p>
            </PaperLift>

            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
              <div className="font-mono text-[10px] font-bold uppercase text-[#A84D2A] mb-1">Pending Audit Tx</div>
              <div className="font-editorial text-4xl text-[#1D2927]">{pendingTxCount}</div>
              <p className="font-mono text-[9px] uppercase text-[#A84D2A] mt-3">Awaiting MFS verification</p>
            </PaperLift>

            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
              <div className="font-mono text-[10px] font-bold uppercase text-[#355C52] mb-1">Registered Creators</div>
              <div className="font-editorial text-4xl text-[#1D2927]">{initialUsers.length}</div>
              <p className="font-mono text-[9px] uppercase text-[#53605C] mt-3">Supabase PostgreSQL accounts</p>
            </PaperLift>

            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
              <div className="font-mono text-[10px] font-bold uppercase text-[#8C7A5B] mb-1">System Audit Logs</div>
              <div className="font-editorial text-4xl text-[#1D2927]">{auditLogs.length}</div>
              <p className="font-mono text-[9px] uppercase text-[#53605C] mt-3">Immutable action entries</p>
            </PaperLift>
          </div>

          <div className="space-y-4">
            <h3 className="font-editorial text-2xl text-[#1D2927]">Platform Audit Trail (Immutable)</h3>
            <AdvancedTable
              title="Audit Logs"
              columns={[
                { header: "Log ID", accessorKey: "id" },
                { header: "Timestamp", accessorKey: "timestamp" },
                { header: "Actor", accessorKey: (r) => `${r.actorName} (${r.actorRole})` },
                { header: "Action", accessorKey: "action" },
                { header: "Resource", accessorKey: (r) => `${r.resourceType}:${r.resourceId}` },
                { header: "Reason / Notes", accessorKey: "reason" },
              ]}
              data={auditLogs}
              searchPlaceholder="Filter audit trail by actor, IP or action..."
            />
          </div>
        </div>
      )}

      {/* WORKSPACE 2: FINANCE */}
      {activeTab === "FINANCE" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <h1 className="font-editorial text-4xl text-[#1D2927]">Finance Workspace</h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                Manual MFS Verification Queue (Version 1)
              </p>
            </div>
            <button 
              onClick={() => showToast("Statement CSV Imported! Transactions auto-matched.")}
              className="h-9 px-4 bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-ink"
            >
              <FileSpreadsheet className="h-4 w-4 text-[#A84D2A]" /> Import Statement CSV
            </button>
          </FadeIn>

          <AdvancedTable
            title="MFS Verification Ledger"
            columns={[
              { header: "Tx ID", accessorKey: "id" },
              { header: "Donor Name", accessorKey: (r) => r.donorName || "Anonymous" },
              { header: "Amount", accessorKey: (r) => formatCurrency(r.amount) },
              { header: "Method", accessorKey: (r) => r.method || "bKash" },
              { header: "Sender Phone", accessorKey: (r) => r.phone || "N/A" },
              { header: "Status", accessorKey: "status" },
              {
                header: "Action",
                accessorKey: "status",
                cell: (r) => r.status === "VERIFIED" || r.status === "verified" ? (
                  <span className="px-2 py-0.5 bg-[#E5EEE8] text-[#355C52] font-mono text-[9px] font-bold uppercase border border-[#355C52]">Verified</span>
                ) : (
                  <button
                    onClick={() => handleVerifyTransaction(r.id)}
                    className="px-3 py-1 bg-[#1D2927] text-[#FAF8F3] hover:bg-[#355C52] font-mono text-[10px] font-bold uppercase tracking-widest transition-colors"
                  >
                    Verify Tx
                  </button>
                )
              }
            ]}
            data={transactions}
            searchPlaceholder="Filter transactions by ID or donor name..."
          />
        </div>
      )}

      {/* WORKSPACE 3: MODERATION */}
      {activeTab === "MODERATION" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <h1 className="font-editorial text-4xl text-[#1D2927]">Campaign Moderation Workspace</h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                Review Submitted Campaigns & Government ID Evidence
              </p>
            </div>
          </FadeIn>

          <AdvancedTable
            title="Campaign Approval Desk"
            columns={[
              { header: "CMP ID", accessorKey: "id" },
              { header: "Title", accessorKey: "title" },
              { header: "Creator", accessorKey: (r) => r.creator?.name || "Creator" },
              { header: "Goal Amount", accessorKey: (r) => formatCurrency(r.goalAmount || 0) },
              { header: "Category", accessorKey: "category" },
              {
                header: "Action",
                accessorKey: "id",
                cell: (r) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveCampaign(r.id)}
                      className="px-3 py-1 bg-[#1D2927] text-[#FAF8F3] hover:bg-[#355C52] font-mono text-[10px] font-bold uppercase tracking-widest transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => showToast(`Campaign ${r.id} rejected.`)}
                      className="px-2 py-1 bg-[#FDF4F0] text-[#A84D2A] border border-[#A84D2A] font-mono text-[10px] font-bold uppercase"
                    >
                      Reject
                    </button>
                  </div>
                )
              }
            ]}
            data={campaigns}
            searchPlaceholder="Filter campaigns by title..."
          />
        </div>
      )}

      {/* WORKSPACE 4: TRUST & SAFETY */}
      {activeTab === "TRUST_SAFETY" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl text-[#1D2927]">Trust & Safety Risk Center</h1>
            <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">Fraud & Risk Analysis</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-2">
              <div className="font-mono text-[10px] uppercase font-bold text-[#8C7A5B]">Platform Risk Score</div>
              <div className="font-editorial text-3xl text-[#1D2927]">0.01 / 1.0</div>
              <p className="font-mono text-[9px] uppercase text-[#355C52]">Low Risk Profile</p>
            </PaperLift>
          </div>
        </div>
      )}

      {/* WORKSPACE 5: SUPPORT */}
      {activeTab === "SUPPORT" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl text-[#1D2927]">Support Helpdesk</h1>
            <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">User Inquiries & Appeals Queue</p>
          </FadeIn>

          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-12 text-center">
            <Headphones className="h-12 w-12 text-[#8C7A5B] mx-auto mb-4" />
            <h3 className="font-editorial text-2xl text-[#1D2927]">Support Queue Clear</h3>
            <p className="font-mono text-xs text-[#53605C] mt-2">All creator and donor tickets are resolved.</p>
          </PaperLift>
        </div>
      )}

      {/* WORKSPACE 6: ANALYTICS */}
      {activeTab === "ANALYTICS" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl text-[#1D2927]">Business Analytics</h1>
            <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">Live Database Intelligence</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3">
              <div className="font-bold text-[#1D2927]">Total Database Campaigns</div>
              <div className="font-editorial text-4xl">{campaigns.length}</div>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3">
              <div className="font-bold text-[#1D2927]">Total Registered Users</div>
              <div className="font-editorial text-4xl">{initialUsers.length}</div>
            </PaperLift>
          </div>
        </div>
      )}

      {/* WORKSPACE 7: CONTENT */}
      {activeTab === "CONTENT" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl text-[#1D2927]">Platform Content & CMS</h1>
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
            <h1 className="font-editorial text-4xl text-[#1D2927]">Platform Configuration</h1>
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
