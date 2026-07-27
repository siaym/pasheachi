"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import { StatusTimeline } from "@/components/back-office/status-timeline";
import { verifyTransactionAction, addAdminNoteAction } from "@/app/admin/actions";
import {
  ArrowLeft, Wallet, User, Megaphone, Phone, Calendar,
  CheckCircle2, XCircle, Flag, StickyNote, Hash, CreditCard
} from "lucide-react";

export function TransactionInvestigationClient({
  transaction,
  auditLogs,
  adminNotes: initialNotes,
}: {
  transaction: any;
  auditLogs: any[];
  adminNotes: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState(initialNotes);
  const [noteInput, setNoteInput] = useState("");
  const [reason, setReason] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [currentStatus, setCurrentStatus] = useState(transaction.status);

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  const handleAction = (newStatus: "verified" | "rejected" | "flagged") => {
    if (newStatus !== "verified" && !reason.trim()) {
      showToast("Reason is required for rejection or flagging.");
      return;
    }
    startTransition(async () => {
      const res = await verifyTransactionAction(transaction.id, newStatus, reason || `${newStatus} after manual review`);
      if (res.success) {
        setCurrentStatus(newStatus);
        showToast(`Transaction ${newStatus}!`);
      }
    });
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    startTransition(async () => {
      const res = await addAdminNoteAction("Transaction", transaction.id, noteInput.trim());
      if (res.success && res.note) {
        setNotes(prev => [res.note, ...prev]);
        setNoteInput("");
        showToast("Internal note logged.");
      }
    });
  };

  const timelineSteps = [
    {
      label: "Donation Submitted",
      timestamp: new Date(transaction.date).toLocaleString(),
      actor: transaction.donorName,
      status: "completed" as const
    },
    {
      label: "Pending MFS Verification",
      status: currentStatus === "pending" ? "current" as const : "completed" as const
    },
    ...(currentStatus === "verified" ? [{
      label: "Transaction Verified",
      timestamp: auditLogs.find(l => l.action === "VERIFY_TRANSACTION")
        ? new Date(auditLogs.find(l => l.action === "VERIFY_TRANSACTION").createdAt).toLocaleString()
        : undefined,
      actor: auditLogs.find(l => l.action === "VERIFY_TRANSACTION")?.actorName,
      note: auditLogs.find(l => l.action === "VERIFY_TRANSACTION")?.reason,
      status: "completed" as const
    }] : currentStatus === "rejected" ? [{
      label: "Transaction Rejected",
      timestamp: auditLogs.find(l => l.action === "REJECT_TRANSACTION")
        ? new Date(auditLogs.find(l => l.action === "REJECT_TRANSACTION").createdAt).toLocaleString()
        : undefined,
      actor: auditLogs.find(l => l.action === "REJECT_TRANSACTION")?.actorName,
      note: auditLogs.find(l => l.action === "REJECT_TRANSACTION")?.reason,
      status: "completed" as const
    }] : currentStatus === "flagged" ? [{
      label: "Transaction Flagged for Investigation",
      status: "current" as const
    }] : [{
      label: "Verified / Rejected",
      status: "pending" as const
    }])
  ];

  return (
    <div className="space-y-8 pb-24">
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D2927] text-[#F7F4ED] border border-[#355C52] p-4 shadow-paper font-mono text-xs uppercase tracking-widest flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> {feedbackMsg}
        </div>
      )}

      <Link href="/admin" className="inline-flex items-center gap-2 font-mono text-xs text-[#53605C] hover:text-[#1D2927] transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Back Office
      </Link>

      {/* Transaction Header */}
      <FadeIn className="border-b border-[#D9D3C7] pb-6 space-y-3">
        <div className="flex items-center gap-3">
          <span className={`font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border ${currentStatus === 'verified' ? 'bg-[#E5EEE8] text-[#355C52] border-[#355C52]' : currentStatus === 'rejected' ? 'bg-[#FDF4F0] text-[#A84D2A] border-[#A84D2A]' : currentStatus === 'flagged' ? 'bg-[#FDF4F0] text-[#A84D2A] border-[#A84D2A]' : 'bg-[#EAE5DB] text-[#8C7A5B] border-[#D9D3C7]'}`}>
            {currentStatus}
          </span>
          <h1 className="font-editorial text-3xl text-[#1D2927]">Transaction Investigation</h1>
        </div>
        <p className="font-mono text-xs text-[#53605C]">TX ID: {transaction.id}</p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Key Details */}
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6">
            <h3 className="font-editorial text-xl text-[#1D2927] mb-4">Transaction Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                <div className="text-[10px] uppercase text-[#8C7A5B] font-bold flex items-center gap-1"><Wallet className="h-3 w-3" /> Amount</div>
                <div className="text-[#1D2927] font-bold text-lg mt-1">{formatCurrency(transaction.amount)}</div>
              </div>
              <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                <div className="text-[10px] uppercase text-[#8C7A5B] font-bold flex items-center gap-1"><CreditCard className="h-3 w-3" /> Method</div>
                <div className="text-[#1D2927] font-bold mt-1">{transaction.method}</div>
              </div>
              <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                <div className="text-[10px] uppercase text-[#8C7A5B] font-bold flex items-center gap-1"><Calendar className="h-3 w-3" /> Date</div>
                <div className="text-[#1D2927] font-bold mt-1">{new Date(transaction.date).toLocaleDateString()}</div>
              </div>
              <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                <div className="text-[10px] uppercase text-[#8C7A5B] font-bold flex items-center gap-1"><User className="h-3 w-3" /> Donor</div>
                <div className="text-[#1D2927] font-bold mt-1">{transaction.donorName}</div>
              </div>
              <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                <div className="text-[10px] uppercase text-[#8C7A5B] font-bold flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</div>
                <div className="text-[#1D2927] font-bold mt-1">{transaction.phone || "N/A"}</div>
              </div>
              <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                <div className="text-[10px] uppercase text-[#8C7A5B] font-bold flex items-center gap-1"><Hash className="h-3 w-3" /> Reference ID</div>
                <div className="text-[#1D2927] font-bold mt-1">{transaction.referenceId || "N/A"}</div>
              </div>
            </div>
          </PaperLift>

          {/* Related Campaign */}
          {transaction.campaign && (
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6">
              <h3 className="font-editorial text-xl text-[#1D2927] mb-4 flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-[#A84D2A]" /> Related Campaign
              </h3>
              <div className="flex items-center justify-between p-4 bg-[#F7F4ED] border border-[#D9D3C7]">
                <div>
                  <div className="font-mono text-xs font-bold text-[#1D2927]">{transaction.campaign.title}</div>
                  <div className="font-mono text-[10px] text-[#53605C] mt-1">
                    Goal: {formatCurrency(transaction.campaign.goalAmount || 0)} • Raised: {formatCurrency(transaction.campaign.raisedAmount)}
                  </div>
                  {transaction.campaign.creator && (
                    <div className="font-mono text-[10px] text-[#53605C] mt-1">
                      Creator: {transaction.campaign.creator.name}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/campaigns/${transaction.campaign.id}`} className="px-3 py-1.5 bg-[#1D2927] text-[#FAF8F3] font-mono text-[9px] font-bold uppercase">
                    Investigate Campaign
                  </Link>
                  {transaction.campaign.creator && (
                    <Link href={`/admin/users/${transaction.campaign.creator.id}`} className="px-3 py-1.5 bg-[#355C52] text-[#FAF8F3] font-mono text-[9px] font-bold uppercase">
                      Investigate Creator
                    </Link>
                  )}
                </div>
              </div>
            </PaperLift>
          )}

          {/* Internal Notes */}
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4">
            <h3 className="font-editorial text-xl text-[#1D2927] flex items-center gap-2">
              <StickyNote className="h-5 w-5 text-[#A84D2A]" /> Internal Notes ({notes.length})
            </h3>
            <div className="space-y-2">
              <textarea
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Write a private note about this transaction..."
                className="w-full h-16 p-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
              />
              <button onClick={handleAddNote} disabled={isPending} className="h-9 px-4 bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest disabled:opacity-50">
                Log Note
              </button>
            </div>
            {notes.map((n: any) => (
              <div key={n.id} className="p-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] text-[#8C7A5B]">
                  <span className="font-bold">{n.authorName} ({n.authorRole})</span>
                  <span>{new Date(n.createdAt).toLocaleString()}</span>
                </div>
                <div className="text-[#1D2927]">{n.content}</div>
              </div>
            ))}
          </PaperLift>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Panel */}
          <PaperLift className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 space-y-4 shadow-paper">
            <h3 className="font-editorial text-xl text-[#1D2927]">Verification Action</h3>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for action (required for rejection/flagging)..."
              className="w-full h-16 p-2 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            />
            <div className="space-y-2">
              <button onClick={() => handleAction("verified")} disabled={isPending || currentStatus === "verified"} className="w-full h-10 bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Verify Transaction
              </button>
              <button onClick={() => handleAction("rejected")} disabled={isPending || currentStatus === "rejected"} className="w-full h-10 bg-[#A84D2A] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-1">
                <XCircle className="h-4 w-4" /> Reject Transaction
              </button>
              <button onClick={() => handleAction("flagged")} disabled={isPending || currentStatus === "flagged"} className="w-full h-10 bg-[#8C7A5B] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-1">
                <Flag className="h-4 w-4" /> Flag for Investigation
              </button>
            </div>
          </PaperLift>

          {/* Timeline */}
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6">
            <StatusTimeline steps={timelineSteps} title="Transaction Lifecycle" />
          </PaperLift>
        </div>
      </div>
    </div>
  );
}
