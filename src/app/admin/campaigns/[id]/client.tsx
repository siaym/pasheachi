"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import { FilePreviewTrigger } from "@/components/back-office/file-preview";
import { StatusTimeline, buildCampaignTimeline } from "@/components/back-office/status-timeline";
import { verifyCampaignAction, addAdminNoteAction } from "@/app/admin/actions";
import {
  ArrowLeft, Megaphone, User, Wallet, Calendar, MapPin, Tag,
  CheckCircle2, XCircle, StickyNote, Clock, FileText, Image as ImageIcon,
  Smartphone, Landmark, TrendingUp
} from "lucide-react";

export function CampaignInvestigationClient({
  campaign,
  auditLogs,
  adminNotes: initialNotes
}: {
  campaign: any;
  auditLogs: any[];
  adminNotes: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState(initialNotes);
  const [noteInput, setNoteInput] = useState("");
  const [reason, setReason] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  const handleApprove = () => {
    startTransition(async () => {
      const res = await verifyCampaignAction(campaign.id, "approved", reason || "Approved after review");
      if (res.success) showToast("Campaign approved and published live!");
    });
  };

  const handleReject = () => {
    if (!reason.trim()) { showToast("Rejection requires a reason."); return; }
    startTransition(async () => {
      const res = await verifyCampaignAction(campaign.id, "rejected", reason);
      if (res.success) showToast("Campaign rejected.");
    });
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    startTransition(async () => {
      const res = await addAdminNoteAction("Campaign", campaign.id, noteInput.trim());
      if (res.success && res.note) {
        setNotes(prev => [res.note, ...prev]);
        setNoteInput("");
        showToast("Internal note logged.");
      }
    });
  };

  const totalDonations = campaign.transactions?.length || 0;
  const verifiedDonations = campaign.transactions?.filter((t: any) => t.status === "verified").length || 0;
  const pendingDonations = campaign.transactions?.filter((t: any) => t.status === "pending").length || 0;
  const totalRaised = campaign.transactions?.reduce((sum: number, t: any) => sum + t.amount, 0) || 0;
  const progress = campaign.goalAmount ? Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)) : 0;

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "documents", label: `Verification Documents (${campaign.documents?.length || 0})` },
    { id: "story", label: "Story" },
    { id: "donations", label: `Donations (${totalDonations})` },
    { id: "timeline", label: "Timeline" },
    { id: "notes", label: `Notes (${notes.length})` },
  ];

  return (
    <div className="space-y-8 pb-24">
      {/* Toast */}
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D2927] text-[#F7F4ED] border border-[#355C52] p-4 shadow-paper font-mono text-xs uppercase tracking-widest flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> {feedbackMsg}
        </div>
      )}

      {/* Breadcrumb */}
      <Link href="/admin" className="inline-flex items-center gap-2 font-mono text-xs text-[#53605C] hover:text-[#1D2927] transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Back Office
      </Link>

      {/* Campaign Header */}
      <FadeIn className="flex flex-col lg:flex-row gap-6 border-b border-[#D9D3C7] pb-6">
        {/* Cover Image */}
        <div className="w-full lg:w-72 h-48 bg-[#EAE5DB] border border-[#D9D3C7] flex items-center justify-center overflow-hidden shrink-0">
          {campaign.coverImageUrl ? (
            <FilePreviewTrigger url={campaign.coverImageUrl} label="Campaign Cover" />
          ) : (
            <ImageIcon className="h-12 w-12 text-[#D9D3C7]" />
          )}
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={`inline-block font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border ${campaign.status === 'active' ? 'bg-[#E5EEE8] text-[#355C52] border-[#355C52]' : campaign.status === 'rejected' ? 'bg-[#FDF4F0] text-[#A84D2A] border-[#A84D2A]' : 'bg-[#EAE5DB] text-[#8C7A5B] border-[#D9D3C7]'}`}>
                {campaign.status}
              </span>
              <h1 className="font-editorial text-3xl text-[#1D2927] mt-2">{campaign.title}</h1>
              <p className="font-mono text-xs text-[#53605C] mt-1">{campaign.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs text-[#53605C]">
            <span className="flex items-center gap-1"><Tag className="h-3.5 w-3.5 text-[#A84D2A]" />{campaign.category}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{campaign.location}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(campaign.createdAt).toLocaleDateString()}</span>
            <Link href={`/admin/users/${campaign.creatorId}`} className="flex items-center gap-1 text-[#355C52] hover:text-[#1D2927]">
              <User className="h-3.5 w-3.5" />{campaign.creator?.name || "Creator"}
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-xs">
              <span className="font-bold text-[#1D2927]">{formatCurrency(campaign.raisedAmount)} raised</span>
              <span className="text-[#8C7A5B]">of {formatCurrency(campaign.goalAmount || 0)} goal ({progress}%)</span>
            </div>
            <div className="h-3 bg-[#EAE5DB] border border-[#D9D3C7]">
              <div className="h-full bg-[#1D2927] transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar border-b border-[#D9D3C7]">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeSection === s.id ? 'border-[#1D2927] text-[#1D2927]' : 'border-transparent text-[#8C7A5B] hover:text-[#1D2927]'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Section: Overview */}
      {activeSection === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4">
                <div className="font-mono text-[10px] uppercase text-[#8C7A5B] font-bold">Total Donations</div>
                <div className="font-editorial text-2xl text-[#1D2927]">{totalDonations}</div>
              </PaperLift>
              <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4">
                <div className="font-mono text-[10px] uppercase text-[#355C52] font-bold">Verified</div>
                <div className="font-editorial text-2xl text-[#1D2927]">{verifiedDonations}</div>
              </PaperLift>
              <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4">
                <div className="font-mono text-[10px] uppercase text-[#A84D2A] font-bold">Pending</div>
                <div className="font-editorial text-2xl text-[#1D2927]">{pendingDonations}</div>
              </PaperLift>
              <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4">
                <div className="font-mono text-[10px] uppercase text-[#8C7A5B] font-bold">Total Volume</div>
                <div className="font-editorial text-2xl text-[#1D2927]">{formatCurrency(totalRaised)}</div>
              </PaperLift>
            </div>

            {/* Payment Accounts */}
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4">
              <h3 className="font-editorial text-xl text-[#1D2927]">Creator Payment Accounts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                  <div className="text-[10px] uppercase text-[#8C7A5B] font-bold flex items-center gap-1"><Smartphone className="h-3 w-3" /> bKash</div>
                  <div className="text-[#1D2927] font-bold mt-1">{campaign.bkashNumber || "Not configured"}</div>
                </div>
                <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                  <div className="text-[10px] uppercase text-[#8C7A5B] font-bold flex items-center gap-1"><Smartphone className="h-3 w-3" /> Nagad</div>
                  <div className="text-[#1D2927] font-bold mt-1">{campaign.nagadNumber || "Not configured"}</div>
                </div>
                <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                  <div className="text-[10px] uppercase text-[#8C7A5B] font-bold flex items-center gap-1"><Landmark className="h-3 w-3" /> Bank</div>
                  <div className="text-[#1D2927] font-bold mt-1">{campaign.bankDetails || "Not configured"}</div>
                </div>
              </div>
            </PaperLift>
          </div>

          {/* Right Sidebar: Actions + Timeline */}
          <div className="lg:col-span-4 space-y-6">
            <PaperLift className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 space-y-4 shadow-paper">
              <h3 className="font-editorial text-xl text-[#1D2927]">Moderation Action Drawer</h3>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for action or notes..."
                className="w-full h-16 p-2 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
              />
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleApprove} disabled={isPending} className="h-9 bg-[#1D2927] text-[#FAF8F3] font-mono text-[9px] font-bold uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                </button>
                <button onClick={handleReject} disabled={isPending} className="h-9 bg-[#A84D2A] text-[#FAF8F3] font-mono text-[9px] font-bold uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-1">
                  <XCircle className="h-3.5 w-3.5" /> Reject
                </button>
                <button onClick={() => showToast("Info request sent to creator!")} className="h-9 bg-[#FAF8F3] text-[#1D2927] border border-[#1D2927] font-mono text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                  Request Info
                </button>
                <button onClick={() => showToast("Escalated to Trust & Safety!")} className="h-9 bg-[#FDF4F0] text-[#A84D2A] border border-[#A84D2A] font-mono text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                  Escalate T&S
                </button>
              </div>
            </PaperLift>

            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6">
              <StatusTimeline steps={buildCampaignTimeline(campaign, auditLogs)} title="Campaign Lifecycle" />
            </PaperLift>
          </div>
        </div>
      )}

      {/* Section: Verification Documents */}
      {activeSection === "documents" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-[#D9D3C7] pb-4">
            <div>
              <h3 className="font-editorial text-2xl text-[#1D2927]">Verification & Identity Documents</h3>
              <p className="font-mono text-xs text-[#53605C]">Review uploaded National ID cards, medical certificates, prescriptions, and financial evidence.</p>
            </div>
            <span className="px-3 py-1 bg-[#E5EEE8] text-[#355C52] font-mono text-[10px] font-bold uppercase tracking-widest border border-[#355C52]">
              {campaign.documents?.length || 0} Files Attached
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(campaign.documents || []).map((doc: any) => (
              <PaperLift key={doc.id} className="bg-[#FAF8F3] border border-[#D9D3C7] p-5 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-[9px] font-bold uppercase tracking-wider text-[#A84D2A]">
                      {doc.category}
                    </span>
                    <span className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase border ${doc.status === 'verified' ? 'bg-[#E5EEE8] text-[#355C52] border-[#355C52]' : 'bg-[#FDF4F0] text-[#A84D2A] border-[#A84D2A]'}`}>
                      {doc.status}
                    </span>
                  </div>

                  <h4 className="font-editorial text-lg text-[#1D2927] leading-snug">{doc.type}</h4>
                  
                  <div className="h-44 bg-[#EAE5DB] border border-[#D9D3C7] relative flex items-center justify-center overflow-hidden">
                    <FilePreviewTrigger url={doc.url} label={doc.type} />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D9D3C7] flex items-center justify-between font-mono text-[10px] text-[#53605C]">
                  <div>
                    <div>By: {doc.uploadedBy}</div>
                    <div>Date: {new Date(doc.uploadedAt).toLocaleDateString()}</div>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 bg-[#1D2927] text-[#FAF8F3] font-bold uppercase tracking-widest hover:bg-[#A84D2A] transition-colors"
                  >
                    Download
                  </a>
                </div>
              </PaperLift>
            ))}
          </div>
        </div>
      )}

      {/* Section: Story */}
      {activeSection === "story" && (
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-8 shadow-sm">
          <h3 className="font-editorial text-2xl text-[#1D2927] mb-4">Campaign Story</h3>
          <div className="prose prose-sm max-w-none font-mono text-sm text-[#1D2927] leading-relaxed whitespace-pre-wrap">
            {campaign.description || "No story content provided."}
          </div>
        </PaperLift>
      )}

      {/* Section: Donations */}
      {activeSection === "donations" && (
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#EAE5DB] text-[#1D2927] uppercase tracking-widest border-b border-[#1D2927]">
                <tr>
                  <th className="p-3">Tx ID</th>
                  <th className="p-3">Donor</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Investigate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D3C7]">
                {(campaign.transactions || []).map((tx: any) => (
                  <tr key={tx.id} className="hover:bg-[#F7F4ED]">
                    <td className="p-3 font-bold">{tx.id.slice(0, 8)}...</td>
                    <td className="p-3">{tx.donorName}</td>
                    <td className="p-3 font-bold">{formatCurrency(tx.amount)}</td>
                    <td className="p-3">{tx.method}</td>
                    <td className="p-3">{tx.phone}</td>
                    <td className="p-3">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${tx.status === 'verified' ? 'bg-[#E5EEE8] text-[#355C52] border-[#355C52]' : tx.status === 'rejected' ? 'bg-[#FDF4F0] text-[#A84D2A] border-[#A84D2A]' : 'bg-[#EAE5DB] text-[#8C7A5B] border-[#D9D3C7]'}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <Link href={`/admin/transactions/${tx.id}`} className="px-2 py-1 bg-[#1D2927] text-[#FAF8F3] text-[9px] font-bold uppercase">
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
                {(!campaign.transactions || campaign.transactions.length === 0) && (
                  <tr><td colSpan={8} className="p-8 text-center text-[#8C7A5B]">No donations recorded yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </PaperLift>
      )}

      {/* Section: Timeline */}
      {activeSection === "timeline" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6">
            <StatusTimeline steps={buildCampaignTimeline(campaign, auditLogs)} title="Campaign Lifecycle" />
          </PaperLift>

          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-3">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] border-b border-[#D9D3C7] pb-2">Audit Log Entries</h4>
            {auditLogs.length === 0 ? (
              <div className="p-4 text-center text-[#8C7A5B] font-mono text-xs">No audit entries for this campaign.</div>
            ) : (
              auditLogs.map((log: any) => (
                <div key={log.id} className="p-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#1D2927]">{log.action}</span>
                    <span className="text-[10px] text-[#8C7A5B]">{new Date(log.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-[10px] text-[#53605C]">By: {log.actorName} ({log.actorRole})</div>
                  {log.reason && <div className="text-[10px] text-[#53605C]">Reason: {log.reason}</div>}
                </div>
              ))
            )}
          </PaperLift>
        </div>
      )}

      {/* Section: Internal Notes */}
      {activeSection === "notes" && (
        <div className="space-y-6">
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4">
            <h3 className="font-editorial text-xl text-[#1D2927] flex items-center gap-2">
              <StickyNote className="h-5 w-5 text-[#A84D2A]" /> Internal Admin Notes
            </h3>
            <div className="space-y-2">
              <textarea
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Write a private internal note (visible only to Back Office admins)..."
                className="w-full h-20 p-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
              />
              <button onClick={handleAddNote} disabled={isPending} className="h-9 px-4 bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest disabled:opacity-50">
                Log Internal Note
              </button>
            </div>
          </PaperLift>

          <div className="space-y-3">
            {notes.length === 0 ? (
              <div className="p-8 text-center text-[#8C7A5B] font-mono text-xs">No internal notes logged for this campaign.</div>
            ) : (
              notes.map((n: any) => (
                <PaperLift key={n.id} className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 space-y-1 font-mono text-xs">
                  <div className="flex justify-between text-[10px] text-[#8C7A5B]">
                    <span className="font-bold">{n.authorName} ({n.authorRole})</span>
                    <span>{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-[#1D2927]">{n.content}</div>
                </PaperLift>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
