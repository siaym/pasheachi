"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { 
  verifyCampaignAction, 
  verifyTransactionAction, 
  toggleFeaturedCampaignAction, 
  toggleSuccessStoryAction,
  banUserAction,
  unbanUserAction
} from "@/app/admin/actions";
import { useAdminNav } from "./layout";
import {
  Building2,
  Wallet,
  ShieldCheck,
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
  Search,
  ExternalLink,
  MessageSquare,
  Copy,
  Check,
  X,
  Phone,
  CreditCard,
  ShieldAlert,
  Calendar,
  DollarSign
} from "lucide-react";

interface DashboardStats {
  totalTransactions: number;
  pendingTransactions: number;
  verifiedTransactions: number;
  rejectedTransactions?: number;
  totalDonationVolume: number;
  todayDonationVolume: number;
  verificationRate: number;
  totalCampaigns: number;
  activeCampaigns: number;
  rejectedCampaigns: number;
  pendingCampaigns: number;
  completedCampaigns?: number;
  totalUsers: number;
}

export function AdminClientHubContent({
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

  const router = useRouter();
  const [transactions, setTransactions] = useState(initialTransactions);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [users, setUsers] = useState(initialUsers);
  
  // Modals
  const [isImpersonateOpen, setIsImpersonateOpen] = useState(false);
  const [selectedCampaignModal, setSelectedCampaignModal] = useState<any | null>(null);
  const [selectedTxModal, setSelectedTxModal] = useState<any | null>(null);
  const [banModalUser, setBanModalUser] = useState<any | null>(null);
  const [banReason, setBanReason] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  // Campaign & Transaction Filter states
  const [campaignFilter, setCampaignFilter] = useState<"ALL" | "ACTIVE" | "PENDING" | "COMPLETED" | "REJECTED">("ALL");
  const [txFilter, setTxFilter] = useState<"ALL" | "PENDING" | "VERIFIED" | "REJECTED">("ALL");

  // Keep state synced on router refresh
  useEffect(() => {
    if (initialCampaigns) setCampaigns(initialCampaigns);
  }, [initialCampaigns]);

  useEffect(() => {
    if (initialTransactions) setTransactions(initialTransactions);
  }, [initialTransactions]);

  useEffect(() => {
    if (initialUsers) setUsers(initialUsers);
  }, [initialUsers]);

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast(`Copied ${text} to clipboard!`);
  };

  // --- ACTIONS ---
  const handleVerifyTransaction = (id: string, newStatus: "verified" | "rejected" = "verified") => {
    startTransition(async () => {
      const res = await verifyTransactionAction(id, newStatus, `Manual admin action: ${newStatus}`);
      if (res.success) {
        setTransactions((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
        );
        if (selectedTxModal && selectedTxModal.id === id) {
          setSelectedTxModal({ ...selectedTxModal, status: newStatus });
        }
        showToast(`Transaction ${id.slice(0, 8)} marked as ${newStatus}!`);
        router.refresh();
      } else {
        showToast(`Error: ${res.error || "Failed to update transaction"}`);
      }
    });
  };

  const handleBulkVerifyTransactions = (selectedRows: any[]) => {
    startTransition(async () => {
      let count = 0;
      for (const row of selectedRows) {
        if (row.status !== "verified") {
          await verifyTransactionAction(row.id, "verified", "Bulk verified from Finance Desk");
          setTransactions((prev) =>
            prev.map((t) => (t.id === row.id ? { ...t, status: "verified" } : t))
          );
          count++;
        }
      }
      showToast(`Bulk verified ${count} transactions successfully!`);
      router.refresh();
    });
  };

  const handleApproveCampaign = (id: string) => {
    startTransition(async () => {
      const res = await verifyCampaignAction(id, "approved", "Approved by Platform Admin");
      if (res.success) {
        setCampaigns((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: "active" } : c))
        );
        if (selectedCampaignModal && selectedCampaignModal.id === id) {
          setSelectedCampaignModal({ ...selectedCampaignModal, status: "active" });
        }
        showToast(`Campaign approved and now live!`);
        router.refresh();
      } else {
        showToast(`Error: ${res.error || "Failed to approve campaign"}`);
      }
    });
  };

  const handleRejectCampaign = (id: string) => {
    startTransition(async () => {
      const res = await verifyCampaignAction(id, "rejected", "Rejected by Platform Admin");
      if (res.success) {
        setCampaigns((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: "rejected" } : c))
        );
        if (selectedCampaignModal && selectedCampaignModal.id === id) {
          setSelectedCampaignModal({ ...selectedCampaignModal, status: "rejected" });
        }
        showToast(`Campaign rejected.`);
        router.refresh();
      } else {
        showToast(`Error: ${res.error || "Failed to reject campaign"}`);
      }
    });
  };

  const handleToggleFeatured = (id: string, currentFeatured: boolean) => {
    startTransition(async () => {
      const res = await toggleFeaturedCampaignAction(id, !currentFeatured);
      if (res.success) {
        setCampaigns((prev) =>
          prev.map((c) => (c.id === id ? { ...c, isFeatured: !currentFeatured } : c))
        );
        showToast(`Campaign ${!currentFeatured ? "added to" : "removed from"} Featured Stories!`);
        router.refresh();
      } else {
        showToast(`Error: ${res.error || "Failed to update featured status"}`);
      }
    });
  };

  const handleToggleSuccessStory = (id: string, currentStatus: string) => {
    const isCompleted = currentStatus === "completed";
    startTransition(async () => {
      const res = await toggleSuccessStoryAction(id, !isCompleted);
      if (res.success) {
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, status: !isCompleted ? "completed" : "active" } : c
          )
        );
        showToast(`Campaign ${!isCompleted ? "marked as" : "removed from"} Success Story!`);
        router.refresh();
      } else {
        showToast(`Error: ${res.error || "Failed to update success story"}`);
      }
    });
  };

  const handleBanUser = (user: any) => {
    startTransition(async () => {
      const res = await banUserAction(user.id, true, null, banReason || "Violated terms of service");
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, status: "banned", banReason } : u))
        );
        setBanModalUser(null);
        setBanReason("");
        showToast(`User @${user.username} has been suspended.`);
        router.refresh();
      } else {
        showToast(`Error: ${res.error || "Failed to ban user"}`);
      }
    });
  };

  const handleUnbanUser = (user: any) => {
    startTransition(async () => {
      const res = await unbanUserAction(user.id, "Admin reinstated account");
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, status: "active", banReason: null } : u))
        );
        showToast(`User @${user.username} has been reactivated.`);
        router.refresh();
      } else {
        showToast(`Error: ${res.error || "Failed to reactivate user"}`);
      }
    });
  };

  if (activeTab === "LAUNCHER") {
    return (
      <div className="space-y-8">
        <LauncherHub onSelectWorkspace={(wsId) => setWorkspace(wsId, "overview")} />
      </div>
    );
  }

  // Filtered lists for tabs
  const pendingTransactionsList = transactions.filter((t) => t.status === "pending");
  const pendingCampaignsList = campaigns.filter((c) => c.status !== "active" && c.status !== "completed" && c.status !== "rejected");

  const displayedCampaigns = campaigns.filter((c) => {
    if (campaignFilter === "ACTIVE") return c.status === "active";
    if (campaignFilter === "PENDING") return c.status !== "active" && c.status !== "completed" && c.status !== "rejected";
    if (campaignFilter === "COMPLETED") return c.status === "completed";
    if (campaignFilter === "REJECTED") return c.status === "rejected";
    return true;
  });

  const displayedTransactions = transactions.filter((t) => {
    if (txFilter === "PENDING") return t.status === "pending";
    if (txFilter === "VERIFIED") return t.status === "verified";
    if (txFilter === "REJECTED") return t.status === "rejected";
    return true;
  });

  return (
    <div className="space-y-8 pb-24">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D2927] text-white border-2 border-[#10B981] px-5 py-3.5 shadow-2xl rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Impersonation Modal */}
      <ImpersonationModal
        isOpen={isImpersonateOpen}
        onClose={() => setIsImpersonateOpen(false)}
        users={users}
      />

      {/* Campaign Detail Modal */}
      {selectedCampaignModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-[#D9D3C7] pb-4">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#A84D2A] font-bold">
                  Campaign Dossier № {selectedCampaignModal.id.slice(0, 8)}
                </span>
                <h3 className="font-editorial text-2xl text-[#1D2927] mt-1">
                  {selectedCampaignModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCampaignModal(null)}
                className="p-1 border border-[#1D2927] hover:bg-[#1D2927] hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-white border border-[#D9D3C7] space-y-1">
                <span className="text-[#8C7A5B] uppercase text-[10px]">Creator Details</span>
                <div className="font-bold text-[#1D2927]">{selectedCampaignModal.creator?.name || "Creator"}</div>
                <div className="text-[#53605C]">@{selectedCampaignModal.creator?.username || "—"}</div>
                <div className="text-[#53605C]">{selectedCampaignModal.creator?.email || "No email"}</div>
              </div>

              <div className="p-3 bg-white border border-[#D9D3C7] space-y-1">
                <span className="text-[#8C7A5B] uppercase text-[10px]">Financial Targets</span>
                <div className="text-[#1D2927]">Goal: <span className="font-bold">{formatCurrency(selectedCampaignModal.goalAmount)}</span></div>
                <div className="text-[#10B981]">Raised: <span className="font-bold">{formatCurrency(selectedCampaignModal.raisedAmount)}</span></div>
                <div className="text-[#53605C]">Total Donors: <span className="font-bold">{selectedCampaignModal.totalTransactions || 0}</span></div>
              </div>

              <div className="p-3 bg-white border border-[#D9D3C7] space-y-1 md:col-span-2">
                <span className="text-[#8C7A5B] uppercase text-[10px]">Payout Receiving Channels (MFS / Bank)</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                  <div className="p-2 bg-[#F7F4ED] border border-[#D9D3C7]">
                    <span className="font-bold text-[#A84D2A] block text-[10px]">bKash Number</span>
                    <span className="text-sm font-bold text-[#1D2927]">{selectedCampaignModal.bkashNumber || "None specified"}</span>
                  </div>
                  <div className="p-2 bg-[#F7F4ED] border border-[#D9D3C7]">
                    <span className="font-bold text-[#D97706] block text-[10px]">Nagad Number</span>
                    <span className="text-sm font-bold text-[#1D2927]">{selectedCampaignModal.nagadNumber || "None specified"}</span>
                  </div>
                  <div className="p-2 bg-[#F7F4ED] border border-[#D9D3C7]">
                    <span className="font-bold text-[#3B82F6] block text-[10px]">Bank Information</span>
                    <span className="text-xs text-[#1D2927] truncate block">{selectedCampaignModal.bankDetails || "None specified"}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white border border-[#D9D3C7] space-y-1 md:col-span-2">
                <span className="text-[#8C7A5B] uppercase text-[10px]">Story / Subtitle</span>
                <p className="text-[#53605C] leading-relaxed italic font-serif text-sm">
                  &ldquo;{selectedCampaignModal.subtitle || selectedCampaignModal.title}&rdquo;
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D9D3C7]">
              {selectedCampaignModal.creator?.username && selectedCampaignModal.slug && (
                <a
                  href={`/${selectedCampaignModal.creator.username}/${selectedCampaignModal.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1D2927] font-mono text-[10px] uppercase font-bold hover:bg-[#1D2927] hover:text-white transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> View Public Page
                </a>
              )}

              <div className="flex items-center gap-2">
                {selectedCampaignModal.status !== "active" && (
                  <button
                    onClick={() => {
                      handleApproveCampaign(selectedCampaignModal.id);
                    }}
                    disabled={isPending}
                    className="px-4 py-2 bg-[#10B981] text-white font-mono text-[10px] uppercase font-bold hover:bg-[#059669] transition-colors disabled:opacity-50"
                  >
                    Approve Campaign
                  </button>
                )}
                {selectedCampaignModal.status !== "rejected" && (
                  <button
                    onClick={() => {
                      handleRejectCampaign(selectedCampaignModal.id);
                    }}
                    disabled={isPending}
                    className="px-4 py-2 bg-[#EF4444] text-white font-mono text-[10px] uppercase font-bold hover:bg-[#DC2626] transition-colors disabled:opacity-50"
                  >
                    Reject Campaign
                  </button>
                )}
                <button
                  onClick={() => setSelectedCampaignModal(null)}
                  className="px-4 py-2 border border-[#D9D3C7] font-mono text-[10px] uppercase font-bold hover:bg-[#EAE5DB] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Detail Modal */}
      {selectedTxModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-[#D9D3C7] pb-4">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#A84D2A] font-bold">
                  Transaction Audit File
                </span>
                <h3 className="font-editorial text-2xl text-[#1D2927] mt-1">
                  {formatCurrency(selectedTxModal.amount)} ({selectedTxModal.method})
                </h3>
              </div>
              <button
                onClick={() => setSelectedTxModal(null)}
                className="p-1 border border-[#1D2927] hover:bg-[#1D2927] hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-white border border-[#D9D3C7] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[#8C7A5B] uppercase text-[10px]">Reference TRX ID</span>
                  <button
                    onClick={() => copyToClipboard(selectedTxModal.referenceId, `modal-${selectedTxModal.id}`)}
                    className="flex items-center gap-1 text-[10px] text-[#A84D2A] font-bold uppercase hover:underline"
                  >
                    {copiedId === `modal-${selectedTxModal.id}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedId === `modal-${selectedTxModal.id}` ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="text-base font-bold text-[#1D2927] tracking-wider bg-[#F7F4ED] p-2 border border-[#EAE5DB]">
                  {selectedTxModal.referenceId}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-[#D9D3C7]">
                  <span className="text-[#8C7A5B] uppercase text-[10px] block">Donor Name</span>
                  <span className="font-bold text-[#1D2927]">{selectedTxModal.donorName}</span>
                </div>
                <div className="p-3 bg-white border border-[#D9D3C7]">
                  <span className="text-[#8C7A5B] uppercase text-[10px] block">Sender Phone</span>
                  <span className="font-bold text-[#1D2927]">{selectedTxModal.phone}</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-[#D9D3C7]">
                <span className="text-[#8C7A5B] uppercase text-[10px] block">Target Campaign</span>
                <span className="font-bold text-[#1D2927] block mt-0.5">{selectedTxModal.campaignTitle}</span>
              </div>

              {selectedTxModal.message && (
                <div className="p-3 bg-[#FFFDF5] border border-[#FDE68A] text-[#92400E]">
                  <span className="text-[10px] uppercase font-bold flex items-center gap-1 mb-1">
                    <MessageSquare className="h-3 w-3" /> Donor Message
                  </span>
                  <p className="font-serif italic text-sm text-[#78350F]">
                    &ldquo;{selectedTxModal.message}&rdquo;
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center p-2 bg-[#F7F4ED] border border-[#D9D3C7] text-[10px]">
                <span className="text-[#53605C]">Recorded At: {selectedTxModal.date}</span>
                <span className={`px-2 py-0.5 font-bold uppercase ${selectedTxModal.status === "verified" ? "bg-[#10B981] text-white" : selectedTxModal.status === "rejected" ? "bg-[#EF4444] text-white" : "bg-[#F59E0B] text-white"}`}>
                  {selectedTxModal.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#D9D3C7]">
              {selectedTxModal.status !== "verified" && (
                <button
                  onClick={() => handleVerifyTransaction(selectedTxModal.id, "verified")}
                  disabled={isPending}
                  className="px-4 py-2 bg-[#10B981] text-white font-mono text-[10px] uppercase font-bold hover:bg-[#059669] transition-colors disabled:opacity-50"
                >
                  Verify Transaction
                </button>
              )}
              {selectedTxModal.status !== "rejected" && (
                <button
                  onClick={() => handleVerifyTransaction(selectedTxModal.id, "rejected")}
                  disabled={isPending}
                  className="px-4 py-2 bg-[#EF4444] text-white font-mono text-[10px] uppercase font-bold hover:bg-[#DC2626] transition-colors disabled:opacity-50"
                >
                  Reject Transaction
                </button>
              )}
              <button
                onClick={() => setSelectedTxModal(null)}
                className="px-4 py-2 border border-[#D9D3C7] font-mono text-[10px] uppercase font-bold hover:bg-[#EAE5DB] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ban User Modal */}
      {banModalUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F3] border-2 border-[#EF4444] p-6 max-w-md w-full shadow-2xl space-y-4 font-mono">
            <h3 className="font-editorial text-2xl text-[#1D2927] flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-[#EF4444]" /> Suspend @{banModalUser.username}
            </h3>
            <p className="text-xs text-[#53605C]">
              Suspended users will immediately have their sessions revoked and cannot create campaigns or post updates.
            </p>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#1D2927]">Reason for suspension</label>
              <textarea
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder="e.g. Fraudulent campaign verification documents, spamming..."
                className="w-full h-24 p-3 bg-white border border-[#D9D3C7] text-xs font-mono focus:outline-none focus:border-[#1D2927] resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setBanModalUser(null)}
                className="px-4 py-2 border border-[#D9D3C7] text-xs uppercase font-bold hover:bg-[#EAE5DB]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBanUser(banModalUser)}
                disabled={isPending}
                className="px-4 py-2 bg-[#EF4444] text-white text-xs uppercase font-bold hover:bg-[#DC2626] disabled:opacity-50"
              >
                Confirm Suspension
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WORKSPACE 1: SUPER ADMIN (Executive Command Center) */}
      {/* ========================================================================= */}
      {activeTab === "SUPER_ADMIN" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#A84D2A] font-bold">
                Enterprise Back-Office • Live Production Sync
              </div>
              <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927] mt-1">
                {navTab === "campaigns" ? "All Platform Campaigns" :
                 navTab === "creators" ? "Creator & User Directory" :
                 navTab === "audit_logs" ? "Platform Audit Trail" :
                 navTab === "flags" ? "Feature Flags & System Controls" :
                 "Executive Command Center"}
              </h1>
            </div>

            {navTab === "overview" && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsImpersonateOpen(true)}
                  className="h-10 px-4 bg-[#1D2927] text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 hover:bg-[#A84D2A] transition-colors shadow-sm"
                >
                  <Eye className="h-4 w-4" /> Impersonate User
                </button>
              </div>
            )}
          </FadeIn>

          {/* OVERVIEW TAB */}
          {navTab === "overview" && (
            <div className="space-y-8">
              {/* 4 Core Executive Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-mono">
                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[#8C7A5B] text-[10px] uppercase font-bold">
                    <span>Total Verified Volume</span>
                    <DollarSign className="h-4 w-4 text-[#10B981]" />
                  </div>
                  <div className="font-editorial text-3xl text-[#1D2927]">
                    {formatCurrency(stats.totalDonationVolume)}
                  </div>
                  <div className="text-[10px] text-[#10B981] flex items-center gap-1 font-bold">
                    <TrendingUp className="h-3 w-3" /> Today: {formatCurrency(stats.todayDonationVolume)}
                  </div>
                </PaperLift>

                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[#8C7A5B] text-[10px] uppercase font-bold">
                    <span>MFS Pending Review</span>
                    <Wallet className="h-4 w-4 text-[#F59E0B]" />
                  </div>
                  <div className="font-editorial text-3xl text-[#1D2927] flex items-center gap-2">
                    <span>{stats.pendingTransactions}</span>
                    <span className="text-xs font-mono text-[#F59E0B]">tx</span>
                  </div>
                  <div className="text-[10px] text-[#53605C]">
                    Verification Rate: <span className="font-bold text-[#1D2927]">{stats.verificationRate}%</span>
                  </div>
                </PaperLift>

                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[#8C7A5B] text-[10px] uppercase font-bold">
                    <span>Active Campaigns</span>
                    <Megaphone className="h-4 w-4 text-[#3B82F6]" />
                  </div>
                  <div className="font-editorial text-3xl text-[#1D2927]">
                    {stats.activeCampaigns} <span className="text-sm font-mono text-[#8C7A5B]">/ {stats.totalCampaigns}</span>
                  </div>
                  <div className="text-[10px] text-[#A84D2A] font-bold">
                    {stats.pendingCampaigns} pending approval
                  </div>
                </PaperLift>

                <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[#8C7A5B] text-[10px] uppercase font-bold">
                    <span>Registered Users</span>
                    <Users className="h-4 w-4 text-[#6366F1]" />
                  </div>
                  <div className="font-editorial text-3xl text-[#1D2927]">
                    {stats.totalUsers}
                  </div>
                  <div className="text-[10px] text-[#53605C]">
                    {campaigns.length} campaigns created
                  </div>
                </PaperLift>
              </div>

              {/* IMMEDIATE ACTION REQUIRED QUEUE */}
              <div className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 shadow-md space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D9D3C7] pb-3">
                  <div>
                    <h2 className="font-editorial text-2xl text-[#1D2927] flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-[#A84D2A]" /> Immediate Action Required Desk
                    </h2>
                    <p className="font-mono text-xs text-[#53605C] mt-0.5">
                      Pending manual MFS transactions and unapproved campaign filings awaiting admin clearance.
                    </p>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#A84D2A] bg-[#FAF8F3] px-3 py-1 border border-[#A84D2A]">
                    {pendingTransactionsList.length + pendingCampaignsList.length} Action Items
                  </div>
                </div>

                {/* Sub-grid: Pending MFS vs Pending Campaigns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Pending MFS Transactions */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927]">
                      <span className="flex items-center gap-1.5">
                        <Wallet className="h-4 w-4 text-[#A84D2A]" /> Pending MFS Donations ({pendingTransactionsList.length})
                      </span>
                      <button
                        onClick={() => setWorkspace("FINANCE", "verification_queue")}
                        className="text-[10px] text-[#A84D2A] hover:underline"
                      >
                        View Full Queue →
                      </button>
                    </div>

                    {pendingTransactionsList.length === 0 ? (
                      <div className="p-8 border border-dashed border-[#D9D3C7] bg-white text-center font-mono text-xs text-[#8C7A5B]">
                        ✓ All MFS donations have been verified!
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                        {pendingTransactionsList.slice(0, 5).map((t) => (
                          <div
                            key={t.id}
                            className="p-3.5 bg-white border border-[#D9D3C7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono hover:border-[#1D2927] transition-all"
                          >
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 text-[9px] uppercase font-bold text-white ${t.method?.toLowerCase().includes("bkash") ? "bg-[#E2136E]" : t.method?.toLowerCase().includes("nagad") ? "bg-[#F7941D]" : "bg-[#1D2927]"}`}>
                                  {t.method}
                                </span>
                                <span className="font-bold text-sm text-[#1D2927]">{formatCurrency(t.amount)}</span>
                                <span className="text-[#8C7A5B] text-[10px] truncate">TRX: {t.referenceId}</span>
                              </div>
                              <div className="text-[11px] text-[#53605C] truncate">
                                From: <span className="font-bold text-[#1D2927]">{t.donorName}</span> ({t.phone})
                              </div>
                              {t.message && (
                                <div className="text-[10px] text-[#A84D2A] italic truncate">
                                  &ldquo;{t.message}&rdquo;
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleVerifyTransaction(t.id, "verified")}
                                disabled={isPending}
                                className="px-3 py-1.5 bg-[#10B981] text-white text-[10px] uppercase font-bold hover:bg-[#059669] transition-colors disabled:opacity-50"
                              >
                                Verify
                              </button>
                              <button
                                onClick={() => setSelectedTxModal(t)}
                                className="px-2.5 py-1.5 border border-[#1D2927] text-[10px] uppercase font-bold hover:bg-[#1D2927] hover:text-white transition-colors"
                              >
                                Inspect
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Pending Campaigns */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927]">
                      <span className="flex items-center gap-1.5">
                        <Megaphone className="h-4 w-4 text-[#3B82F6]" /> Pending Campaign Reviews ({pendingCampaignsList.length})
                      </span>
                      <button
                        onClick={() => setWorkspace("MODERATION", "pending_campaigns")}
                        className="text-[10px] text-[#3B82F6] hover:underline"
                      >
                        Moderation Desk →
                      </button>
                    </div>

                    {pendingCampaignsList.length === 0 ? (
                      <div className="p-8 border border-dashed border-[#D9D3C7] bg-white text-center font-mono text-xs text-[#8C7A5B]">
                        ✓ No pending campaign reviews. All filings are cleared!
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                        {pendingCampaignsList.slice(0, 5).map((c) => (
                          <div
                            key={c.id}
                            className="p-3.5 bg-white border border-[#D9D3C7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono hover:border-[#1D2927] transition-all"
                          >
                            <div className="space-y-1 min-w-0">
                              <div className="font-bold text-sm text-[#1D2927] truncate">
                                {c.title}
                              </div>
                              <div className="text-[11px] text-[#53605C]">
                                By: <span className="font-bold">@{c.creator?.username || "creator"}</span> • Goal: {formatCurrency(c.goalAmount)}
                              </div>
                              <div className="text-[10px] text-[#8C7A5B]">
                                Payout bKash: {c.bkashNumber || "None"} • Nagad: {c.nagadNumber || "None"}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleApproveCampaign(c.id)}
                                disabled={isPending}
                                className="px-3 py-1.5 bg-[#10B981] text-white text-[10px] uppercase font-bold hover:bg-[#059669] transition-colors disabled:opacity-50"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => setSelectedCampaignModal(c)}
                                className="px-2.5 py-1.5 border border-[#1D2927] text-[10px] uppercase font-bold hover:bg-[#1D2927] hover:text-white transition-colors"
                              >
                                Review
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Audit Trail Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-2">
                  <h3 className="font-editorial text-2xl text-[#1D2927] flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#8C7A5B]" /> Real-time System Audit Feed
                  </h3>
                  <button
                    onClick={() => setWorkspace("SUPER_ADMIN", "audit_logs")}
                    className="font-mono text-xs uppercase font-bold text-[#A84D2A] hover:underline"
                  >
                    View All Logs ({initialAuditLogs.length}) →
                  </button>
                </div>

                <div className="bg-white border border-[#D9D3C7] divide-y divide-[#EAE5DB] font-mono text-xs">
                  {initialAuditLogs.slice(0, 5).map((log: any) => (
                    <div key={log.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#FAF8F3]">
                      <div>
                        <span className="font-bold text-[#1D2927]">{log.actorName}</span>
                        <span className="text-[#8C7A5B] ml-2 font-semibold">[{log.action}]</span>
                        <span className="text-[#53605C] ml-2">{log.resourceType}:{log.resourceId.slice(0, 8)}...</span>
                        {log.reason && <span className="text-[#A84D2A] ml-2 italic">&ldquo;{log.reason}&rdquo;</span>}
                      </div>
                      <span className="text-[10px] text-[#8C7A5B] shrink-0">
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CAMPAIGNS TAB */}
          {navTab === "campaigns" && (
            <div className="space-y-4">
              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-[#8C7A5B] uppercase text-[10px] font-bold mr-1">Status Filter:</span>
                {[
                  { label: `All (${campaigns.length})`, val: "ALL" },
                  { label: `Active (${stats.activeCampaigns})`, val: "ACTIVE" },
                  { label: `Pending Review (${stats.pendingCampaigns})`, val: "PENDING" },
                  { label: `Completed (${stats.completedCampaigns || 0})`, val: "COMPLETED" },
                  { label: `Rejected (${stats.rejectedCampaigns})`, val: "REJECTED" },
                ].map((pill) => (
                  <button
                    key={pill.val}
                    onClick={() => setCampaignFilter(pill.val as any)}
                    className={`px-3 py-1.5 border font-bold uppercase text-[10px] transition-colors ${
                      campaignFilter === pill.val
                        ? "bg-[#1D2927] text-white border-[#1D2927]"
                        : "bg-white text-[#53605C] border-[#D9D3C7] hover:border-[#1D2927]"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              <AdvancedTable
                title="All Platform Campaigns"
                bulkActions={[
                  { label: "Approve Selected", action: (rows) => rows.forEach(r => handleApproveCampaign(r.id)) }
                ]}
                columns={[
                  {
                    header: "Campaign File",
                    accessorKey: "title",
                    cell: (r) => (
                      <div className="flex items-center gap-3 max-w-xs">
                        <div className="w-10 h-10 bg-[#EAE5DB] border border-[#D9D3C7] shrink-0 overflow-hidden">
                          {r.coverImageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={r.coverImageUrl} alt={r.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] font-mono text-[#8C7A5B]">No Pic</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-[#1D2927] truncate">{r.title}</div>
                          <span className="text-[10px] text-[#A84D2A] uppercase font-bold">{r.category}</span>
                        </div>
                      </div>
                    )
                  },
                  {
                    header: "Creator",
                    accessorKey: (r) => r.creator?.name || "Creator",
                    cell: (r) => (
                      <div>
                        <div className="font-bold text-[#1D2927]">{r.creator?.name || "Creator"}</div>
                        <div className="text-[10px] text-[#53605C]">@{r.creator?.username || "—"}</div>
                      </div>
                    )
                  },
                  {
                    header: "Funding Progress",
                    accessorKey: "raisedAmount",
                    cell: (r) => {
                      const pct = Math.min(100, Math.round(((r.raisedAmount || 0) / (r.goalAmount || 1)) * 100));
                      return (
                        <div className="w-32 space-y-1">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-[#10B981]">{formatCurrency(r.raisedAmount)}</span>
                            <span className="text-[#8C7A5B]">{pct}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#EAE5DB] border border-[#D9D3C7]">
                            <div className="h-full bg-[#1D2927]" style={{ width: `${pct}%` }}></div>
                          </div>
                          <div className="text-[9px] text-[#8C7A5B]">Goal: {formatCurrency(r.goalAmount)}</div>
                        </div>
                      );
                    }
                  },
                  {
                    header: "Payout Channels",
                    accessorKey: "bkashNumber",
                    cell: (r) => (
                      <div className="text-[10px] space-y-0.5">
                        {r.bkashNumber && <div><span className="font-bold text-[#A84D2A]">bKash:</span> {r.bkashNumber}</div>}
                        {r.nagadNumber && <div><span className="font-bold text-[#D97706]">Nagad:</span> {r.nagadNumber}</div>}
                        {!r.bkashNumber && !r.nagadNumber && <span className="text-[#8C7A5B] italic">No MFS set</span>}
                      </div>
                    )
                  },
                  {
                    header: "Status",
                    accessorKey: "status",
                    cell: (r) => (
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${
                        r.status === "active" ? "bg-[#E5EEE8] text-[#10B981] border-[#10B981]" :
                        r.status === "completed" ? "bg-[#EFF6FF] text-[#3B82F6] border-[#3B82F6]" :
                        r.status === "rejected" ? "bg-[#FEF2F2] text-[#EF4444] border-[#EF4444]" :
                        "bg-[#FFFBEB] text-[#F59E0B] border-[#F59E0B]"
                      }`}>
                        {r.status}
                      </span>
                    )
                  },
                  {
                    header: "Curator",
                    accessorKey: "isFeatured",
                    cell: (r) => (
                      <button
                        onClick={() => handleToggleFeatured(r.id, !!r.isFeatured)}
                        disabled={isPending}
                        className={`px-2 py-0.5 text-[9px] uppercase font-bold border transition-colors ${
                          r.isFeatured ? "bg-[#1D2927] text-white border-[#1D2927]" : "bg-white text-[#8C7A5B] border-[#D9D3C7] hover:border-[#1D2927]"
                        }`}
                      >
                        {r.isFeatured ? "★ Featured" : "+ Feature"}
                      </button>
                    )
                  },
                  {
                    header: "Action",
                    accessorKey: "id",
                    cell: (r) => (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedCampaignModal(r)}
                          className="px-2 py-1 bg-[#1D2927] text-white text-[9px] uppercase font-bold hover:bg-[#A84D2A] transition-colors"
                        >
                          Inspect
                        </button>
                        {r.creator?.username && r.slug && (
                          <a
                            href={`/${r.creator.username}/${r.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 border border-[#D9D3C7] hover:bg-[#EAE5DB] text-[#1D2927]"
                            title="Open Live Campaign"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    )
                  }
                ]}
                data={displayedCampaigns}
                searchPlaceholder="Filter campaigns by title or creator..."
              />
            </div>
          )}

          {/* CREATORS & USERS TAB */}
          {navTab === "creators" && (
            <div className="space-y-4">
              <AdvancedTable
                title="Creator & User Directory"
                columns={[
                  {
                    header: "User Profile",
                    accessorKey: "name",
                    cell: (u) => (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1D2927] text-white flex items-center justify-center font-bold text-xs uppercase overflow-hidden shrink-0">
                          {u.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={u.avatarUrl} alt={u.name} className="w-full h-full object-cover" />
                          ) : (
                            u.name.slice(0, 1)
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-[#1D2927]">{u.name}</div>
                          <div className="text-[10px] text-[#53605C]">@{u.username}</div>
                        </div>
                      </div>
                    )
                  },
                  { header: "Email", accessorKey: (u) => u.email || "—" },
                  {
                    header: "Role",
                    accessorKey: "role",
                    cell: (u) => (
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${u.role === "admin" ? "bg-[#1D2927] text-white border-[#1D2927]" : "bg-[#FAF8F3] text-[#53605C] border-[#D9D3C7]"}`}>
                        {u.role || "user"}
                      </span>
                    )
                  },
                  {
                    header: "Status",
                    accessorKey: "status",
                    cell: (u) => (
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${u.status === "active" ? "bg-[#E5EEE8] text-[#10B981] border-[#10B981]" : "bg-[#FEF2F2] text-[#EF4444] border-[#EF4444]"}`}>
                        {u.status || "active"}
                      </span>
                    )
                  },
                  { header: "Campaigns", accessorKey: (u) => u.campaignsCount || 0 },
                  { header: "Joined Date", accessorKey: "createdAt" },
                  {
                    header: "Actions",
                    accessorKey: "id",
                    cell: (u) => (
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`/${u.username}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 border border-[#D9D3C7] text-[9px] uppercase font-bold hover:bg-[#EAE5DB]"
                          title="View Profile"
                        >
                          Profile
                        </a>
                        {u.status === "banned" ? (
                          <button
                            onClick={() => handleUnbanUser(u)}
                            disabled={isPending}
                            className="px-2 py-1 bg-[#10B981] text-white text-[9px] uppercase font-bold hover:bg-[#059669]"
                          >
                            Reactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setBanModalUser(u);
                              setBanReason("");
                            }}
                            disabled={isPending}
                            className="px-2 py-1 border border-[#EF4444] text-[#EF4444] text-[9px] uppercase font-bold hover:bg-[#EF4444] hover:text-white transition-colors"
                          >
                            Suspend
                          </button>
                        )}
                      </div>
                    )
                  }
                ]}
                data={users}
                searchPlaceholder="Search users by name, username, or email..."
              />
            </div>
          )}

          {/* AUDIT LOGS TAB */}
          {navTab === "audit_logs" && (
            <div className="space-y-4">
              <AdvancedTable
                title="Persisted Audit Trail"
                columns={[
                  { header: "Timestamp", accessorKey: (r) => new Date(r.createdAt).toLocaleString() },
                  { header: "Actor", accessorKey: (r) => `${r.actorName} (${r.actorRole})` },
                  { header: "Action", accessorKey: "action" },
                  { header: "Target Resource", accessorKey: (r) => `${r.resourceType}:${r.resourceId.slice(0, 8)}...` },
                  { header: "Reason", accessorKey: (r) => r.reason || "—" },
                ]}
                data={initialAuditLogs}
                searchPlaceholder="Filter audit trail by actor or action..."
              />
            </div>
          )}

          {/* FEATURE FLAGS TAB */}
          {navTab === "flags" && (
            <div className="space-y-6">
              <FeatureFlagsHub showToast={showToast} />
              
              <div className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 shadow-sm space-y-4 font-mono">
                <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4">
                  <div>
                    <h4 className="font-editorial text-2xl text-[#1D2927]">System Maintenance Mode</h4>
                    <p className="text-xs text-[#53605C] mt-1">Pauses public submissions for scheduled system updates.</p>
                  </div>
                  <button
                    onClick={() => {
                      setMaintenanceMode(!maintenanceMode);
                      showToast(`Maintenance mode turned ${!maintenanceMode ? 'ON' : 'OFF'}`);
                    }}
                    className={`h-10 px-6 text-xs uppercase font-bold tracking-wider border transition-all ${
                      maintenanceMode ? 'bg-[#EF4444] text-white border-[#EF4444]' : 'bg-white text-[#1D2927] border-[#1D2927] hover:bg-[#1D2927] hover:text-white'
                    }`}
                  >
                    {maintenanceMode ? "Maintenance Active" : "Enable Maintenance"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* WORKSPACE 2: FINANCE & TREASURY */}
      {/* ========================================================================= */}
      {activeTab === "FINANCE" && (
        <div className="space-y-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#A84D2A] font-bold">
                Treasury & Mobile Financial Services
              </div>
              <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927] mt-1">
                {navTab === "verification_queue" ? "Manual MFS Verification Queue" :
                 navTab === "statement_import" ? "Statement Import & Reconciliation" :
                 navTab === "withdrawals" ? "Withdrawals & Payouts Queue" :
                 navTab === "audit" ? "Financial Audit Trail" :
                 "Finance & Treasury Workspace"}
              </h1>
            </div>
          </FadeIn>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-[#8C7A5B] uppercase text-[10px] font-bold mr-1">Status Filter:</span>
            {[
              { label: `All (${transactions.length})`, val: "ALL" },
              { label: `Pending (${stats.pendingTransactions})`, val: "PENDING" },
              { label: `Verified (${stats.verifiedTransactions})`, val: "VERIFIED" },
              { label: `Rejected (${stats.rejectedTransactions || 0})`, val: "REJECTED" },
            ].map((pill) => (
              <button
                key={pill.val}
                onClick={() => setTxFilter(pill.val as any)}
                className={`px-3 py-1.5 border font-bold uppercase text-[10px] transition-colors ${
                  txFilter === pill.val
                    ? "bg-[#1D2927] text-white border-[#1D2927]"
                    : "bg-white text-[#53605C] border-[#D9D3C7] hover:border-[#1D2927]"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Statement Import */}
          {navTab === "statement_import" && (
            <div className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 space-y-4 text-xs font-mono">
              <h3 className="font-editorial text-2xl text-[#1D2927]">Bank & MFS Statement Import</h3>
              <p className="text-[#53605C]">Upload bKash/Nagad daily CSV or Excel statements for automated batch reconciliation.</p>
              <div className="flex items-center gap-3">
                <input type="file" className="text-xs file:bg-[#1D2927] file:text-white file:border-0 file:px-3 file:py-1.5 file:font-mono file:text-[10px] file:uppercase" />
                <button onClick={() => showToast("Statement uploaded for batch matching.")} className="px-4 py-2 bg-[#10B981] text-white font-mono text-[10px] font-bold uppercase">
                  Import Statement
                </button>
              </div>
            </div>
          )}

          {/* Withdrawals */}
          {navTab === "withdrawals" && (
            <div className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 space-y-4 text-xs font-mono">
              <h3 className="font-editorial text-2xl text-[#1D2927]">Withdrawal Payout Requests</h3>
              <div className="p-4 bg-white border border-[#D9D3C7] text-[#1D2927]">
                Currently 0 pending withdrawal requests awaiting treasury release.
              </div>
            </div>
          )}

          {/* Core Table */}
          {(navTab === "overview" || navTab === "verification_queue" || navTab === "audit") && (
            <AdvancedTable
              title={navTab === "verification_queue" ? "Pending Verifications Queue" : "MFS Verification Ledger"}
              bulkActions={[
                { label: "Verify Selected", action: handleBulkVerifyTransactions }
              ]}
              columns={[
                {
                  header: "Reference (TRX ID)",
                  accessorKey: "referenceId",
                  cell: (r) => (
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#1D2927] bg-[#F7F4ED] px-2 py-0.5 border border-[#D9D3C7]">
                        {r.referenceId}
                      </span>
                      <button
                        onClick={() => copyToClipboard(r.referenceId, `row-${r.id}`)}
                        className="text-[#8C7A5B] hover:text-[#1D2927]"
                        title="Copy TRX ID"
                      >
                        {copiedId === `row-${r.id}` ? <Check className="h-3 w-3 text-[#10B981]" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  )
                },
                {
                  header: "Method",
                  accessorKey: "method",
                  cell: (r) => (
                    <span className={`px-2 py-0.5 text-[9px] uppercase font-bold text-white ${r.method?.toLowerCase().includes("bkash") ? "bg-[#E2136E]" : r.method?.toLowerCase().includes("nagad") ? "bg-[#F7941D]" : "bg-[#1D2927]"}`}>
                      {r.method}
                    </span>
                  )
                },
                {
                  header: "Donor & Sender Phone",
                  accessorKey: "donorName",
                  cell: (r) => (
                    <div>
                      <div className="font-bold text-[#1D2927]">{r.donorName}</div>
                      <div className="text-[10px] text-[#53605C] flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {r.phone}
                      </div>
                    </div>
                  )
                },
                {
                  header: "Amount",
                  accessorKey: "amount",
                  cell: (r) => (
                    <span className="font-mono font-bold text-sm text-[#1D2927]">
                      {formatCurrency(r.amount)}
                    </span>
                  )
                },
                {
                  header: "Support Message",
                  accessorKey: "message",
                  cell: (r) => r.message ? (
                    <span className="text-[11px] text-[#A84D2A] italic line-clamp-1 max-w-xs" title={r.message}>
                      &ldquo;{r.message}&rdquo;
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#8C7A5B]">—</span>
                  )
                },
                {
                  header: "Target Campaign",
                  accessorKey: "campaignTitle",
                  cell: (r) => (
                    <div className="max-w-xs truncate text-[11px]">
                      {r.campaignSlug && r.creatorUsername ? (
                        <a
                          href={`/${r.creatorUsername}/${r.campaignSlug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-[#1D2927] hover:underline"
                        >
                          {r.campaignTitle}
                        </a>
                      ) : (
                        <span>{r.campaignTitle}</span>
                      )}
                    </div>
                  )
                },
                {
                  header: "Status",
                  accessorKey: "status",
                  cell: (r) => (
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${
                      r.status === "verified" ? "bg-[#E5EEE8] text-[#10B981] border-[#10B981]" :
                      r.status === "rejected" ? "bg-[#FEF2F2] text-[#EF4444] border-[#EF4444]" :
                      "bg-[#FFFBEB] text-[#F59E0B] border-[#F59E0B]"
                    }`}>
                      {r.status}
                    </span>
                  )
                },
                {
                  header: "Actions",
                  accessorKey: "id",
                  cell: (r) => (
                    <div className="flex items-center gap-1.5">
                      {r.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleVerifyTransaction(r.id, "verified")}
                            disabled={isPending}
                            className="px-2.5 py-1 bg-[#10B981] text-white text-[9px] uppercase font-bold hover:bg-[#059669] transition-colors disabled:opacity-50"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => handleVerifyTransaction(r.id, "rejected")}
                            disabled={isPending}
                            className="px-2 py-1 bg-[#EF4444] text-white text-[9px] uppercase font-bold hover:bg-[#DC2626] transition-colors disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setSelectedTxModal(r)}
                        className="p-1 border border-[#D9D3C7] hover:bg-[#EAE5DB]"
                        title="View Full File"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )
                }
              ]}
              data={displayedTransactions}
              searchPlaceholder="Search transactions by TRX ID, phone, donor..."
            />
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* WORKSPACE 3: MODERATION */}
      {/* ========================================================================= */}
      {activeTab === "MODERATION" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927]">
              {navTab === "pending_campaigns" ? "Pending Campaign Approvals" :
               navTab === "nid_verification" ? "Creator Identity & NID Desk" :
               "Campaign Moderation Workspace"}
            </h1>
          </FadeIn>

          <AdvancedTable
            title="Moderation Review Queue"
            columns={[
              { header: "Title", accessorKey: "title" },
              { header: "Creator", accessorKey: (r) => r.creator?.name || "Creator" },
              { header: "Goal", accessorKey: (r) => formatCurrency(r.goalAmount || 0) },
              { header: "Category", accessorKey: "category" },
              { header: "Status", accessorKey: "status" },
              {
                header: "Actions",
                accessorKey: "id",
                cell: (r) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveCampaign(r.id)}
                      disabled={isPending}
                      className="px-3 py-1 bg-[#10B981] text-white text-[9px] uppercase font-bold hover:bg-[#059669] disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectCampaign(r.id)}
                      disabled={isPending}
                      className="px-2.5 py-1 bg-[#EF4444] text-white text-[9px] uppercase font-bold hover:bg-[#DC2626] disabled:opacity-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => setSelectedCampaignModal(r)}
                      className="px-2 py-1 border border-[#1D2927] text-[9px] uppercase font-bold hover:bg-[#1D2927] hover:text-white"
                    >
                      Review
                    </button>
                  </div>
                )
              }
            ]}
            data={campaigns.filter(c => c.status !== "active" && c.status !== "rejected")}
            searchPlaceholder="Filter pending campaigns..."
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* WORKSPACE 4: CONTENT & CMS */}
      {/* ========================================================================= */}
      {activeTab === "CONTENT" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927]">
              {navTab === "emails" ? "Resend Communication Center" : "Platform Content & CMS"}
            </h1>
          </FadeIn>

          {navTab === "emails" ? (
            <EmailCenterHub showToast={showToast} />
          ) : (
            <div className="space-y-6">
              <div className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 space-y-4 font-mono text-xs">
                <h3 className="font-editorial text-2xl text-[#1D2927]">Global Announcement Banner</h3>
                <input
                  type="text"
                  defaultValue="Emergency Flood & Medical Relief: 100% of contributions reach verified creators."
                  className="w-full h-10 px-4 border border-[#D9D3C7] bg-white text-xs font-mono focus:outline-none focus:border-[#1D2927]"
                />
                <button
                  onClick={() => showToast("Announcement bar updated!")}
                  className="h-9 px-4 bg-[#1D2927] text-white font-mono text-[10px] uppercase font-bold"
                >
                  Save Banner Text
                </button>
              </div>

              <AdvancedTable
                title="Featured Stories Curator"
                columns={[
                  { header: "Title", accessorKey: "title" },
                  { header: "Creator", accessorKey: (r) => r.creator?.name || "Creator" },
                  { header: "Raised", accessorKey: (r) => formatCurrency(r.raisedAmount || 0) },
                  {
                    header: "Curated Status",
                    accessorKey: "isFeatured",
                    cell: (r) => r.isFeatured ? (
                      <span className="px-2 py-0.5 bg-[#E5EEE8] text-[#10B981] font-mono text-[9px] font-bold uppercase border border-[#10B981]">Featured</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#FAF8F3] text-[#8C7A5B] font-mono text-[9px] font-bold uppercase border border-[#D9D3C7]">Standard</span>
                    )
                  },
                  {
                    header: "Toggle",
                    accessorKey: "id",
                    cell: (r) => (
                      <button
                        onClick={() => handleToggleFeatured(r.id, !!r.isFeatured)}
                        disabled={isPending}
                        className={`px-3 py-1 text-[9px] font-mono font-bold uppercase border ${r.isFeatured ? "bg-[#EF4444] text-white border-[#EF4444]" : "bg-[#1D2927] text-white border-[#1D2927]"}`}
                      >
                        {r.isFeatured ? "Remove" : "Make Featured"}
                      </button>
                    )
                  }
                ]}
                data={campaigns}
                searchPlaceholder="Search campaigns to feature..."
              />
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* WORKSPACE 5: PLATFORM CONFIGURATION */}
      {/* ========================================================================= */}
      {activeTab === "PLATFORM" && (
        <div className="space-y-8">
          <FadeIn className="border-b border-[#D9D3C7] pb-4">
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927]">
              Platform Configuration & Policies
            </h1>
          </FadeIn>

          <VerificationSettingsHub showToast={showToast} />
          
          <div className="pt-6 border-t border-[#D9D3C7]">
            <SeoSettingsHub showToast={showToast} />
          </div>

          <div className="pt-6 border-t border-[#D9D3C7]">
            <FeatureFlagsHub showToast={showToast} />
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
    <Suspense fallback={<div className="p-8 text-xs font-mono">Loading Admin Workspace Stage...</div>}>
      <AdminClientHubContent {...props} />
    </Suspense>
  );
}
