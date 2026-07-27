"use client";

import { CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";

interface TimelineStep {
  label: string;
  timestamp?: string;
  actor?: string;
  note?: string;
  status: "completed" | "current" | "pending";
}

export function StatusTimeline({ steps, title }: { steps: TimelineStep[]; title?: string }) {
  return (
    <div className="space-y-3">
      {title && (
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C7A5B] border-b border-[#D9D3C7] pb-2">
          {title}
        </h4>
      )}

      <div className="relative pl-6 space-y-0">
        {/* Vertical connector line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#D9D3C7]" />

        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <div key={idx} className="relative flex items-start gap-3 pb-5 last:pb-0">
              {/* Dot */}
              <div className="absolute -left-6 mt-0.5">
                {step.status === "completed" ? (
                  <CheckCircle2 className="h-[22px] w-[22px] text-[#355C52] bg-[#FAF8F3]" />
                ) : step.status === "current" ? (
                  <Clock className="h-[22px] w-[22px] text-[#A84D2A] bg-[#FAF8F3] animate-pulse" />
                ) : (
                  <Circle className="h-[22px] w-[22px] text-[#D9D3C7] bg-[#FAF8F3]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="font-mono text-xs font-bold text-[#1D2927]">{step.label}</div>
                {step.timestamp && (
                  <div className="font-mono text-[10px] text-[#8C7A5B] mt-0.5">{step.timestamp}</div>
                )}
                {step.actor && (
                  <div className="font-mono text-[10px] text-[#53605C] mt-0.5">By: {step.actor}</div>
                )}
                {step.note && (
                  <div className="mt-1 p-2 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-[10px] text-[#53605C]">
                    {step.note}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function buildCampaignTimeline(campaign: any, auditLogs: any[]): TimelineStep[] {
  const steps: TimelineStep[] = [];

  steps.push({
    label: "Campaign Created",
    timestamp: new Date(campaign.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    actor: campaign.creator?.name || "Creator",
    status: "completed"
  });

  const approveLog = auditLogs.find(l => l.action === "APPROVE_CAMPAIGN");
  const rejectLog = auditLogs.find(l => l.action === "REJECT_CAMPAIGN");

  if (approveLog) {
    steps.push({
      label: "Under Moderation Review",
      status: "completed"
    });
    steps.push({
      label: "Campaign Approved",
      timestamp: new Date(approveLog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      actor: approveLog.actorName,
      note: approveLog.reason || undefined,
      status: "completed"
    });
    steps.push({
      label: "Campaign Live & Accepting Donations",
      status: campaign.status === "active" ? "current" : "completed"
    });
  } else if (rejectLog) {
    steps.push({
      label: "Under Moderation Review",
      status: "completed"
    });
    steps.push({
      label: "Campaign Rejected",
      timestamp: new Date(rejectLog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      actor: rejectLog.actorName,
      note: rejectLog.reason || undefined,
      status: "completed"
    });
  } else {
    steps.push({
      label: "Awaiting Moderation Review",
      status: "current"
    });
    steps.push({ label: "Approved / Rejected", status: "pending" });
    steps.push({ label: "Campaign Live", status: "pending" });
  }

  if (campaign.status === "completed") {
    steps.push({ label: "Campaign Completed", status: "completed" });
  } else if (campaign.status === "active") {
    steps.push({ label: "Campaign Completed", status: "pending" });
  }

  return steps;
}
