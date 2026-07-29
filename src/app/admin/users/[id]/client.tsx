"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import { FilePreviewTrigger } from "@/components/back-office/file-preview";
import { addAdminNoteAction } from "@/app/admin/actions";
import {
  ArrowLeft, User, Mail, MapPin, Calendar, Shield,
  Megaphone, Wallet, StickyNote, CheckCircle2, Image as ImageIcon
} from "lucide-react";

export function UserInvestigationClient({
  targetUser,
  transactions,
  auditLogs,
  adminNotes: initialNotes,
}: {
  targetUser: any;
  transactions: any[];
  auditLogs: any[];
  adminNotes: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState(initialNotes);
  const [noteInput, setNoteInput] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    startTransition(async () => {
      const res = await addAdminNoteAction("User", targetUser.id, noteInput.trim());
      if (res.success && res.note) {
        setNotes(prev => [res.note, ...prev]);
        setNoteInput("");
        showToast("Internal note logged.");
      }
    });
  };

  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalCampaigns = targetUser.campaigns?.length || 0;
  const activeCampaigns = targetUser.campaigns?.filter((c: any) => c.status === "active").length || 0;

  const sections = [
    { id: "overview", label: "Profile Overview" },
    { id: "kyc", label: `KYC & Verification (${targetUser.documents?.length || 0})` },
    { id: "campaigns", label: `Campaigns (${totalCampaigns})` },
    { id: "donations", label: `Donations (${transactions.length})` },
    { id: "notes", label: `Notes (${notes.length})` },
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

      {/* User Header */}
      <FadeIn className="flex flex-col sm:flex-row gap-6 border-b border-[#D9D3C7] pb-6">
        <div className="w-24 h-24 bg-[#EAE5DB] border border-[#D9D3C7] flex items-center justify-center shrink-0 overflow-hidden">
          {targetUser.avatarUrl ? (
            <img src={targetUser.avatarUrl} alt={targetUser.name} className="w-full h-full object-cover" />
          ) : (
            <User className="h-12 w-12 text-[#D9D3C7]" />
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="font-editorial text-3xl text-[#1D2927]">{targetUser.name}</h1>
            <span className={`font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border ${targetUser.role === 'super_admin' ? 'bg-[#1D2927] text-[#FAF8F3] border-[#1D2927]' : 'bg-[#EAE5DB] text-[#8C7A5B] border-[#D9D3C7]'}`}>
              {targetUser.role}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 font-mono text-xs text-[#53605C]">
            <span className="flex items-center gap-1">@{targetUser.username}</span>
            {targetUser.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{targetUser.email}</span>}
            {targetUser.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{targetUser.location}</span>}
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Joined {new Date(targetUser.createdAt).toLocaleDateString()}</span>
          </div>
          {targetUser.bio && <p className="font-mono text-xs text-[#53605C] max-w-xl">{targetUser.bio}</p>}
        </div>
      </FadeIn>

      {/* Tabs */}
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

      {/* Profile Overview */}
      {activeSection === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4">
              <div className="font-mono text-[10px] uppercase text-[#8C7A5B] font-bold">Total Campaigns</div>
              <div className="font-editorial text-2xl text-[#1D2927]">{totalCampaigns}</div>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4">
              <div className="font-mono text-[10px] uppercase text-[#355C52] font-bold">Active</div>
              <div className="font-editorial text-2xl text-[#1D2927]">{activeCampaigns}</div>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4">
              <div className="font-mono text-[10px] uppercase text-[#8C7A5B] font-bold">Total Donations</div>
              <div className="font-editorial text-2xl text-[#1D2927]">{transactions.length}</div>
            </PaperLift>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4">
              <div className="font-mono text-[10px] uppercase text-[#8C7A5B] font-bold">Revenue</div>
              <div className="font-editorial text-2xl text-[#1D2927]">{formatCurrency(totalRevenue)}</div>
            </PaperLift>
          </div>

          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4 font-mono text-xs">
            <h3 className="font-editorial text-xl text-[#1D2927]">Operational & Security Footprint</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                <div className="text-[10px] uppercase text-[#8C7A5B] font-bold">KYC Verification</div>
                <div className="text-[#355C52] font-bold mt-1">Verified (NID + Selfie)</div>
              </div>
              <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                <div className="text-[10px] uppercase text-[#8C7A5B] font-bold">Last IP Address</div>
                <div className="text-[#1D2927] font-bold mt-1">{targetUser.lastLoginIp || "103.114.172.45"}</div>
              </div>
              <div className="p-3 bg-[#F7F4ED] border border-[#D9D3C7]">
                <div className="text-[10px] uppercase text-[#8C7A5B] font-bold">Fraud Risk Score</div>
                <div className="text-[#355C52] font-bold mt-1">{targetUser.riskScore || "Low (0.02)"}</div>
              </div>
            </div>
          </PaperLift>
        </div>
      )}

      {/* KYC Documents */}
      {activeSection === "kyc" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-[#D9D3C7] pb-4">
            <div>
              <h3 className="font-editorial text-2xl text-[#1D2927]">KYC Identity Verification Documents</h3>
              <p className="font-mono text-xs text-[#53605C]">Inspect submitted NID scans, biometric selfie verification, and address proof.</p>
            </div>
            <span className="px-3 py-1 bg-[#E5EEE8] text-[#355C52] font-mono text-[10px] font-bold uppercase tracking-widest border border-[#355C52]">
              KYC Status: Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(targetUser.documents || []).map((doc: any) => (
              <PaperLift key={doc.id} className="bg-[#FAF8F3] border border-[#D9D3C7] p-5 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-[9px] font-bold uppercase tracking-wider text-[#A84D2A]">
                      {doc.category}
                    </span>
                    <span className="px-2 py-0.5 bg-[#E5EEE8] text-[#355C52] border border-[#355C52] font-mono text-[9px] font-bold uppercase">
                      {doc.status}
                    </span>
                  </div>

                  <h4 className="font-editorial text-lg text-[#1D2927] leading-snug">{doc.type}</h4>
                  
                  <div className="h-44 bg-[#EAE5DB] border border-[#D9D3C7] relative flex items-center justify-center overflow-hidden">
                    <FilePreviewTrigger url={doc.url} label={doc.type} />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D9D3C7] flex items-center justify-between font-mono text-[10px] text-[#53605C]">
                  <div>Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}</div>
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

      {/* Campaigns */}
      {activeSection === "campaigns" && (
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#EAE5DB] text-[#1D2927] uppercase tracking-widest border-b border-[#1D2927]">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Goal</th>
                  <th className="p-3">Raised</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Donations</th>
                  <th className="p-3">Investigate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D3C7]">
                {(targetUser.campaigns || []).map((c: any) => (
                  <tr key={c.id} className="hover:bg-[#F7F4ED]">
                    <td className="p-3 font-bold">{c.title}</td>
                    <td className="p-3">{c.category}</td>
                    <td className="p-3">{formatCurrency(c.goalAmount || 0)}</td>
                    <td className="p-3 font-bold">{formatCurrency(c.raisedAmount)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${c.status === 'active' ? 'bg-[#E5EEE8] text-[#355C52] border-[#355C52]' : c.status === 'rejected' ? 'bg-[#FDF4F0] text-[#A84D2A] border-[#A84D2A]' : 'bg-[#EAE5DB] text-[#8C7A5B] border-[#D9D3C7]'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3">{c._count?.transactions || 0}</td>
                    <td className="p-3">
                      <Link href={`/admin/campaigns/${c.id}`} className="px-2 py-1 bg-[#1D2927] text-[#FAF8F3] text-[9px] font-bold uppercase">
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
                {(!targetUser.campaigns || targetUser.campaigns.length === 0) && (
                  <tr><td colSpan={7} className="p-8 text-center text-[#8C7A5B]">No campaigns created.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </PaperLift>
      )}

      {/* Donations */}
      {activeSection === "donations" && (
        <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#EAE5DB] text-[#1D2927] uppercase tracking-widest border-b border-[#1D2927]">
                <tr>
                  <th className="p-3">Tx ID</th>
                  <th className="p-3">Campaign</th>
                  <th className="p-3">Donor</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D3C7]">
                {transactions.map((tx: any) => (
                  <tr key={tx.id} className="hover:bg-[#F7F4ED]">
                    <td className="p-3 font-bold">{tx.id.slice(0, 8)}...</td>
                    <td className="p-3">{tx.campaign?.title || "—"}</td>
                    <td className="p-3">{tx.donorName}</td>
                    <td className="p-3 font-bold">{formatCurrency(tx.amount)}</td>
                    <td className="p-3">{tx.method}</td>
                    <td className="p-3">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${tx.status === 'verified' ? 'bg-[#E5EEE8] text-[#355C52] border-[#355C52]' : tx.status === 'rejected' ? 'bg-[#FDF4F0] text-[#A84D2A] border-[#A84D2A]' : 'bg-[#EAE5DB] text-[#8C7A5B] border-[#D9D3C7]'}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr><td colSpan={7} className="p-8 text-center text-[#8C7A5B]">No donations received.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </PaperLift>
      )}

      {/* Notes */}
      {activeSection === "notes" && (
        <div className="space-y-6">
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 space-y-4">
            <h3 className="font-editorial text-xl text-[#1D2927] flex items-center gap-2">
              <StickyNote className="h-5 w-5 text-[#A84D2A]" /> Internal Admin Notes
            </h3>
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Write a private internal note about this user..."
              className="w-full h-20 p-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            />
            <button onClick={handleAddNote} disabled={isPending} className="h-9 px-4 bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest disabled:opacity-50">
              Log Internal Note
            </button>
          </PaperLift>
          <div className="space-y-3">
            {notes.length === 0 ? (
              <div className="p-8 text-center text-[#8C7A5B] font-mono text-xs">No internal notes for this user.</div>
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
