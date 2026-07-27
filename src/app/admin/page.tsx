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
  XCircle,
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  Printer,
  Sliders,
  Eye,
  Lock,
  Globe,
  RefreshCw,
  TrendingUp,
  Download
} from "lucide-react";

// Mock Data Databases
const PENDING_MFS_TRANSACTIONS = [
  { id: "TRX-9F2A1B", donorName: "Anika Rahman", amount: 5000, method: "bKash", phone: "01712345678", date: "2026-07-27", campaign: "Emergency Flood Relief", status: "PENDING" },
  { id: "TRX-4C8D7E", donorName: "Anonymous", amount: 1200, method: "Nagad", phone: "01912345678", date: "2026-07-27", campaign: "Medical Treatment for Rina", status: "PENDING" },
  { id: "TRX-5E6F7G", donorName: "Faria Islam", amount: 2500, method: "Rocket", phone: "01812345678", date: "2026-07-26", campaign: "Sylhet Primary School Build", status: "PENDING" },
  { id: "TRX-8H9I0J", donorName: "Zahid Hasan", amount: 15000, method: "Bank Transfer", phone: "01512345678", date: "2026-07-26", campaign: "Robotics Competition Fund", status: "PENDING" },
];

const PENDING_CAMPAIGNS_MODERATION = [
  { id: "CMP-092", title: "Emergency Flood Relief for Sylhet", creator: "Rahim Ali (@rahim)", goal: 500000, category: "Emergency", status: "SUBMITTED", nidStatus: "VERIFIED" },
  { id: "CMP-093", title: "University Tuition Fee for Final Semester", creator: "Sadia Islam (@sadia)", goal: 45000, category: "Education", status: "SUBMITTED", nidStatus: "PENDING" },
  { id: "CMP-094", title: "Clean Drinking Water Well in Char Area", creator: "Tanvir Hossain (@tanvir)", goal: 120000, category: "Community", status: "SUBMITTED", nidStatus: "VERIFIED" },
];

const SUPPORT_TICKETS = [
  { id: "TCK-101", subject: "Withdrawal not received in Nagad", creator: "Rina Akter", priority: "HIGH", status: "OPEN", date: "2h ago" },
  { id: "TCK-102", subject: "How to edit story photo after publish?", creator: "Siyam Ahmed", priority: "NORMAL", status: "OPEN", date: "5h ago" },
  { id: "TCK-103", subject: "Requesting Verified Creator Badge", creator: "Ekattor Foundation", priority: "URGENT", status: "PENDING", date: "1d ago" },
];

export default function AdminWorkspacePage() {
  const [activeTab, setActiveTab] = useState<WorkspaceId>("SUPER_ADMIN");
  const [transactions, setTransactions] = useState(PENDING_MFS_TRANSACTIONS);
  const [campaigns, setCampaigns] = useState(PENDING_CAMPAIGNS_MODERATION);
  const [auditLogs, setAuditLogs] = useState(getAuditLogs());
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  // MFS Verification Handlers
  const handleVerifyTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: "VERIFIED" } : t));
    logAuditEvent({
      actorName: "Siyam Ahmed",
      actorEmail: "siyam@pasheachi.bro.bd",
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
      actorEmail: "siyam@pasheachi.bro.bd",
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
                Platform Health • Revenue • Enterprise Audit Logs
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-bold uppercase text-[#355C52] bg-[#E5EEE8] px-3 py-1 border border-[#355C52]">
                Platform Operational
              </span>
            </div>
          </FadeIn>

          {/* Super Admin Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
              <div className="font-mono text-[10px] font-bold uppercase text-[#8C7A5B] mb-1">Total Volume Raised</div>
              <div className="font-editorial text-4xl text-[#1D2927]">{formatCurrency(24500000)}</div>
              <p className="font-mono text-[9px] uppercase text-[#355C52] mt-3">From 15,832 Supporters</p>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
              <div className="font-mono text-[10px] font-bold uppercase text-[#355C52] mb-1">Platform Revenue (5%)</div>
              <div className="font-editorial text-4xl text-[#1D2927]">{formatCurrency(1225000)}</div>
              <p className="font-mono text-[9px] uppercase text-[#53605C] mt-3">Platform operational fee</p>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
              <div className="font-mono text-[10px] font-bold uppercase text-[#A84D2A] mb-1">Pending Manual MFS</div>
              <div className="font-editorial text-4xl text-[#1D2927]">18 Tx</div>
              <p className="font-mono text-[9px] uppercase text-[#A84D2A] mt-3">Awaiting finance audit</p>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm">
              <div className="font-mono text-[10px] font-bold uppercase text-[#8C7A5B] mb-1">Active Campaigns</div>
              <div className="font-editorial text-4xl text-[#1D2927]">1,247</div>
              <p className="font-mono text-[9px] uppercase text-[#53605C] mt-3">Across 64 districts</p>
            </PaperLift>
          </div>

          {/* Immutable Audit Log Table */}
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
              <h1 className="font-editorial text-4xl text-[#1D2927]">Finance & Treasury Workspace</h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                Manual Payment Verification Queue (Version 1) • Bank Statement Import • Withdrawals
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => showToast("Statement CSV Imported! 45 transactions auto-matched.")}
                className="h-9 px-4 bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-ink"
              >
                <FileSpreadsheet className="h-4 w-4 text-[#A84D2A]" /> Import Statement CSV
              </button>
            </div>
          </FadeIn>

          {/* Pending Manual MFS Verification Queue Table */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-editorial text-2xl text-[#1D2927]">Manual MFS Verification Queue</h3>
              <span className="font-mono text-xs uppercase text-[#A84D2A] font-bold">{transactions.filter(t => t.status === 'PENDING').length} Pending Review</span>
            </div>

            <AdvancedTable
              title="Manual MFS Verification Queue"
              columns={[
                { header: "Tx ID", accessorKey: "id" },
                { header: "Donor Name", accessorKey: "donorName" },
                { header: "Amount", accessorKey: (r) => formatCurrency(r.amount) },
                { header: "MFS Method", accessorKey: "method" },
                { header: "Sender Phone", accessorKey: "phone" },
                { header: "Date", accessorKey: "date" },
                { header: "Campaign", accessorKey: "campaign" },
                { 
                  header: "Action", 
                  accessorKey: "status",
                  cell: (r) => r.status === "VERIFIED" ? (
                    <span className="px-2 py-0.5 bg-[#E5EEE8] text-[#355C52] font-mono text-[9px] font-bold uppercase border border-[#355C52]">Verified</span>
                  ) : (
                    <button
                      onClick={() => handleVerifyTransaction(r.id)}
                      className="px-3 py-1 bg-[#1D2927] text-[#FAF8F3] hover:bg-[#355C52] font-mono text-[10px] font-bold uppercase tracking-widest border border-[#1D2927] transition-colors"
                    >
                      Verify Tx
                    </button>
                  )
                }
              ]}
              data={transactions}
              bulkActions={[
                {
                  label: "Bulk Verify Selected",
                  action: (selected) => {
                    selected.forEach(s => handleVerifyTransaction(s.id));
                  }
                }
              ]}
              searchPlaceholder="Filter transactions by ID, donor name, or phone..."
            />
          </div>
        </div>
      )}

      {/* WORKSPACE 3: MODERATION */}
      {activeTab === "MODERATION" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <h1 className="font-editorial text-4xl text-[#1D2927]">Campaign Moderation Workspace</h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                Review Submitted Campaigns • Government NID & Evidence Audit Desk
              </p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            <h3 className="font-editorial text-2xl text-[#1D2927]">Pending Campaign Submissions</h3>
            <AdvancedTable
              title="Campaign Approval Desk"
              columns={[
                { header: "CMP ID", accessorKey: "id" },
                { header: "Title", accessorKey: "title" },
                { header: "Creator", accessorKey: "creator" },
                { header: "Goal", accessorKey: (r) => formatCurrency(r.goal) },
                { header: "Category", accessorKey: "category" },
                { 
                  header: "NID Verification", 
                  accessorKey: "nidStatus",
                  cell: (r) => (
                    <span className={`px-2 py-0.5 font-mono text-[9px] uppercase font-bold border ${r.nidStatus === 'VERIFIED' ? 'bg-[#E5EEE8] text-[#355C52] border-[#355C52]' : 'bg-[#FDF4F0] text-[#A84D2A] border-[#A84D2A]'}`}>
                      {r.nidStatus}
                    </span>
                  )
                },
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
                        onClick={() => showToast(`Campaign ${r.id} rejected with reason logged.`)}
                        className="px-2 py-1 bg-[#FDF4F0] text-[#A84D2A] border border-[#A84D2A] font-mono text-[10px] font-bold uppercase"
                      >
                        Reject
                      </button>
                    </div>
                  )
                }
              ]}
              data={campaigns}
              searchPlaceholder="Filter submissions by title or creator..."
            />
          </div>
        </div>
      )}

      {/* WORKSPACE 4: TRUST & SAFETY */}
      {activeTab === "TRUST_SAFETY" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <h1 className="font-editorial text-4xl text-[#1D2927]">Trust & Safety Risk Center</h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                Fraud Investigation • Risk Scores • Suspicious Device & IP Alerts
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PaperLift className="bg-[#FDF4F0] border border-[#A84D2A] p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#A84D2A] font-mono text-xs font-bold uppercase">
                <AlertTriangle className="h-4 w-4" /> Fraud Risk Alerts
              </div>
              <div className="font-editorial text-4xl text-[#1D2927]">4 Alerts</div>
              <p className="font-mono text-[10px] text-[#53605C]">Multiple donations from same IP</p>
            </PaperLift>

            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#8C7A5B] font-mono text-xs font-bold uppercase">
                <Users className="h-4 w-4" /> Blacklisted Accounts
              </div>
              <div className="font-editorial text-4xl text-[#1D2927]">12 Users</div>
              <p className="font-mono text-[10px] text-[#53605C]">Suspended for policy violation</p>
            </PaperLift>

            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#355C52] font-mono text-xs font-bold uppercase">
                <ShieldCheck className="h-4 w-4" /> Avg Risk Score
              </div>
              <div className="font-editorial text-4xl text-[#1D2927]">0.02 / 1.0</div>
              <p className="font-mono text-[9px] uppercase text-[#355C52]">Low Platform Vulnerability</p>
            </PaperLift>
          </div>
        </div>
      )}

      {/* WORKSPACE 5: SUPPORT */}
      {activeTab === "SUPPORT" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <h1 className="font-editorial text-4xl text-[#1D2927]">Support & Helpdesk Desk</h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                Ticket Queue • Creator Support • Donor Inquiries & Appeals
              </p>
            </div>
          </FadeIn>

          <AdvancedTable
            title="Open Support Tickets"
            columns={[
              { header: "Ticket ID", accessorKey: "id" },
              { header: "Subject", accessorKey: "subject" },
              { header: "Creator", accessorKey: "creator" },
              { 
                header: "Priority", 
                accessorKey: "priority",
                cell: (r) => (
                  <span className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase border ${r.priority === 'URGENT' ? 'bg-[#A84D2A] text-[#FAF8F3] border-[#A84D2A]' : 'bg-[#EAE5DB] text-[#1D2927] border-[#D9D3C7]'}`}>
                    {r.priority}
                  </span>
                )
              },
              { header: "Age", accessorKey: "date" },
              {
                header: "Action",
                accessorKey: "id",
                cell: (r) => (
                  <button 
                    onClick={() => showToast(`Opened reply window for ticket ${r.id}`)}
                    className="px-3 py-1 bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase"
                  >
                    Reply
                  </button>
                )
              }
            ]}
            data={SUPPORT_TICKETS}
          />
        </div>
      )}

      {/* WORKSPACE 6: ANALYTICS */}
      {activeTab === "ANALYTICS" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <h1 className="font-editorial text-4xl text-[#1D2927]">Business Intelligence & Analytics</h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                Platform Growth • Conversion Funnels • Donation Trend Breakdown
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4">
              <h4 className="font-editorial text-xl text-[#1D2927]">Category Volume Share</h4>
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-1 font-bold"><span>Medical & Health</span><span>42%</span></div>
                  <div className="h-3 bg-[#EAE5DB] border border-[#D9D3C7]"><div className="h-full bg-[#1D2927]" style={{ width: '42%' }} /></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 font-bold"><span>Emergency Relief</span><span>28%</span></div>
                  <div className="h-3 bg-[#EAE5DB] border border-[#D9D3C7]"><div className="h-full bg-[#A84D2A]" style={{ width: '28%' }} /></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 font-bold"><span>Education & Tuition</span><span>18%</span></div>
                  <div className="h-3 bg-[#EAE5DB] border border-[#D9D3C7]"><div className="h-full bg-[#355C52]" style={{ width: '18%' }} /></div>
                </div>
              </div>
            </PaperLift>

            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4">
              <h4 className="font-editorial text-xl text-[#1D2927]">Conversion Metrics</h4>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between border-b border-[#D9D3C7] pb-2">
                  <span className="text-[#8C7A5B]">Platform Visitor Conversion</span>
                  <span className="font-bold text-[#1D2927]">4.8%</span>
                </div>
                <div className="flex justify-between border-b border-[#D9D3C7] pb-2">
                  <span className="text-[#8C7A5B]">Average Donation Size</span>
                  <span className="font-bold text-[#1D2927]">৳1,540</span>
                </div>
                <div className="flex justify-between border-b border-[#D9D3C7] pb-2">
                  <span className="text-[#8C7A5B]">Repeat Donor Ratio</span>
                  <span className="font-bold text-[#1D2927]">34.2%</span>
                </div>
              </div>
            </PaperLift>
          </div>
        </div>
      )}

      {/* WORKSPACE 7: CONTENT */}
      {activeTab === "CONTENT" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <h1 className="font-editorial text-4xl text-[#1D2927]">Platform Content & CMS Workspace</h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                Curate Featured Campaigns • Homepage Hero • Announcement Banner Editor
              </p>
            </div>
          </FadeIn>

          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4">
            <h3 className="font-editorial text-2xl text-[#1D2927]">Global Announcement Bar</h3>
            <input
              type="text"
              defaultValue="Emergency Sylhet Flood Relief: 100% of contributions reach families directly."
              className="w-full h-10 px-4 border border-[#D9D3C7] bg-[#F7F4ED] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            />
            <button 
              onClick={() => showToast("Announcement bar updated live!")}
              className="h-9 px-4 bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest"
            >
              Update Banner Text
            </button>
          </PaperLift>
        </div>
      )}

      {/* WORKSPACE 8: PLATFORM */}
      {activeTab === "PLATFORM" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <h1 className="font-editorial text-4xl text-[#1D2927]">Platform Configuration & Security</h1>
              <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
                System Limits • Maintenance Mode Toggle • Security Keys
              </p>
            </div>
          </FadeIn>

          <PaperLift className="bg-[#FAF8F3] border border-[#1D2927] p-6 shadow-paper space-y-6">
            <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4">
              <div>
                <h4 className="font-editorial text-xl text-[#1D2927]">System Maintenance Mode</h4>
                <p className="font-mono text-xs text-[#53605C] mt-1">Pauses public campaign submissions for scheduled system updates.</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#8C7A5B] mb-1">Minimum Withdrawal Limit (BDT)</label>
                <input type="number" defaultValue={500} className="w-full h-10 px-3 border border-[#D9D3C7] bg-[#F7F4ED]" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#8C7A5B] mb-1">Max Daily Unverified MFS Limit (BDT)</label>
                <input type="number" defaultValue={25000} className="w-full h-10 px-3 border border-[#D9D3C7] bg-[#F7F4ED]" />
              </div>
            </div>
          </PaperLift>
        </div>
      )}
    </div>
  );
}
