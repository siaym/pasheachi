"use client";

import { useState, useEffect, useTransition } from "react";
import { PaperLift } from "@/components/ui/motion";
import { sendManualEmailAction, getEmailLogsAction } from "@/app/admin/actions";
import { Mail, Send, History, CheckCircle2 } from "lucide-react";
import { AdvancedTable } from "@/components/back-office/advanced-table";

export function EmailCenterHub({ showToast }: { showToast: (msg: string) => void }) {
  const [isPending, startTransition] = useTransition();
  const [recipientType, setRecipientType] = useState("single");
  const [customEmail, setCustomEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [templateName, setTemplateName] = useState("custom");
  const [emailLogs, setEmailLogs] = useState<any[]>([]);

  useEffect(() => {
    getEmailLogsAction().then((logs) => setEmailLogs(logs));
  }, []);

  const templates: Record<string, { subject: string; body: string }> = {
    campaign_approved: {
      subject: "Your PasheAchi Campaign Has Been Approved!",
      body: "Assalamu Alaikum,\n\nWe are pleased to inform you that your campaign has passed all document verification checks and is now LIVE on PasheAchi.\n\nYou can share your campaign link with supporters and track donations directly from your dashboard.\n\nWarm regards,\nPasheAchi Admin Team",
    },
    campaign_rejected: {
      subject: "Important Update Regarding Your Campaign Submission",
      body: "Assalamu Alaikum,\n\nAfter reviewing your campaign submission and verification documents, our team requires additional clarification before approval.\n\nPlease log into your creator dashboard to review requested modifications.\n\nSincerely,\nPasheAchi Compliance Desk",
    },
    need_documents: {
      subject: "Action Required: Additional Verification Documents Needed",
      body: "Assalamu Alaikum,\n\nTo complete the review of your campaign, please upload the following documents:\n- Updated Hospital Estimate / Clinical Summary\n- Valid National ID (NID) Scan\n\nYou can upload these documents directly in your campaign dashboard.\n\nThank you,\nPasheAchi Trust & Safety",
    },
    withdrawal_approved: {
      subject: "Withdrawal Request Approved & Transfer Dispatched",
      body: "Assalamu Alaikum,\n\nYour withdrawal request has been approved and processed to your designated Mobile Financial Service (MFS) / Bank account.\n\nThank you for your transparency and dedication to your campaign.\n\nBest regards,\nPasheAchi Treasury Desk",
    },
    maintenance_notice: {
      subject: "Scheduled System Maintenance Notice - PasheAchi Platform",
      body: "Dear PasheAchi Community,\n\nWe will be conducting scheduled system maintenance to enhance platform security and performance.\n\nDuring this window, campaign submissions and withdrawal processing will be temporarily paused.\n\nThank you for your patience,\nPasheAchi Engineering Team",
    },
  };

  const handleTemplateSelect = (tmplKey: string) => {
    setTemplateName(tmplKey);
    if (templates[tmplKey]) {
      setSubject(templates[tmplKey].subject);
      setBody(templates[tmplKey].body);
    }
  };

  const handleSendEmail = () => {
    if (!subject.trim() || !body.trim()) {
      showToast("Please enter both email subject and content body.");
      return;
    }

    startTransition(async () => {
      const res = await sendManualEmailAction({
        recipientType,
        customEmail,
        subject,
        body,
        templateName,
      });

      if (res.success) {
        showToast(`Email successfully dispatched to ${res.count} recipient(s)!`);
        setSubject("");
        setBody("");
        getEmailLogsAction().then((logs) => setEmailLogs(logs));
      } else {
        showToast(`Error: ${res.error || "Failed to send email"}`);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4">
        <div>
          <h3 className="font-editorial text-2xl text-[#1D2927] flex items-center gap-2">
            <Mail className="h-6 w-6 text-[#A84D2A]" /> Resend Administrative Email Center
          </h3>
          <p className="font-mono text-xs text-[#53605C]">
            Dispatch manual email notifications, announcements, and template updates to users, creators, or supporters.
          </p>
        </div>
      </div>

      {/* Composer Grid */}
      <PaperLift className="bg-[#FAF8F3] border border-[#1D2927] p-6 shadow-paper space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-2">
              Recipient Target
            </label>
            <select
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
              className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            >
              <option value="single">Single User (Enter Email)</option>
              <option value="all_creators">All Campaign Creators</option>
              <option value="all_donors">All Registered Donors</option>
            </select>
          </div>

          {recipientType === "single" && (
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-2">
                Recipient Email Address
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
              />
            </div>
          )}

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-2">
              Quick Email Template
            </label>
            <select
              value={templateName}
              onChange={(e) => handleTemplateSelect(e.target.value)}
              className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
            >
              <option value="custom">Custom Email (Blank)</option>
              <option value="campaign_approved">Campaign Approved</option>
              <option value="campaign_rejected">Campaign Rejected</option>
              <option value="need_documents">Need Additional Verification Docs</option>
              <option value="withdrawal_approved">Withdrawal Approved</option>
              <option value="maintenance_notice">Maintenance Notice</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-2">
            Email Subject Line
          </label>
          <input
            type="text"
            placeholder="Subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927]"
          />
        </div>

        <div>
          <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1D2927] mb-2">
            Email Body Content (Markdown / Text)
          </label>
          <textarea
            rows={8}
            placeholder="Type your official administrative message body here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-4 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs focus:outline-none focus:border-[#1D2927] resize-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleSendEmail}
            disabled={isPending}
            className="px-6 h-11 bg-[#1D2927] text-[#FAF8F3] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#A84D2A] transition-colors disabled:opacity-50"
          >
            <Send className="h-4 w-4" /> Dispatch Email Now
          </button>
        </div>
      </PaperLift>

      {/* Email History Logs */}
      <div className="space-y-4 pt-6 border-t border-[#D9D3C7]">
        <h4 className="font-editorial text-2xl text-[#1D2927] flex items-center gap-2">
          <History className="h-5 w-5 text-[#53605C]" /> Persistent Email Transmission Logs
        </h4>
        <AdvancedTable
          title="Email Dispatch Log"
          columns={[
            { header: "Recipient", accessorKey: "recipientEmail" },
            { header: "Subject", accessorKey: "subject" },
            { header: "Template", accessorKey: (r) => r.templateName || "Custom" },
            {
              header: "Status",
              accessorKey: "status",
              cell: (r) => (
                <span className="px-2 py-0.5 bg-[#E5EEE8] text-[#355C52] font-mono text-[9px] font-bold uppercase border border-[#355C52] flex items-center gap-1 w-fit">
                  <CheckCircle2 className="h-3 w-3" /> {r.status}
                </span>
              )
            },
            {
              header: "Date Sent",
              accessorKey: (r) => new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
            }
          ]}
          data={emailLogs}
          searchPlaceholder="Search email logs..."
        />
      </div>
    </div>
  );
}
