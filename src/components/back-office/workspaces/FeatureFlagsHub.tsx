"use client";

import { useState, useEffect, useTransition } from "react";
import { PaperLift } from "@/components/ui/motion";
import { getFeatureFlagsAction, toggleFeatureFlagAction } from "@/app/admin/actions";
import { ToggleLeft, ToggleRight, Sliders } from "lucide-react";

export function FeatureFlagsHub({ showToast }: { showToast: (msg: string) => void }) {
  const [isPending, startTransition] = useTransition();
  const [flags, setFlags] = useState<Record<string, boolean>>({
    campaign_creation: true,
    new_registrations: true,
    donations: true,
    withdrawals: true,
    email_sending: true,
    document_upload: true,
    messaging: true,
    maintenance_mode: false,
  });

  useEffect(() => {
    getFeatureFlagsAction().then((dbFlags) => {
      if (dbFlags && dbFlags.length > 0) {
        const flagMap: Record<string, boolean> = { ...flags };
        dbFlags.forEach((f: any) => {
          flagMap[f.key] = f.enabled;
        });
        setFlags(flagMap);
      }
    });
  }, []);

  const handleToggle = (key: string) => {
    const nextVal = !flags[key];
    setFlags((prev) => ({ ...prev, [key]: nextVal }));
    startTransition(async () => {
      const res = await toggleFeatureFlagAction(key, nextVal);
      if (res.success) {
        showToast(`Feature flag '${key}' set to ${nextVal ? 'ENABLED' : 'DISABLED'}!`);
      } else {
        showToast(`Error: ${res.error || "Failed to toggle feature flag"}`);
      }
    });
  };

  const featureItems = [
    { key: "campaign_creation", title: "Campaign Creation Engine", desc: "Allows creators to draft and submit new campaigns." },
    { key: "new_registrations", title: "New User Registration", desc: "Allows new visitors to create donor or creator accounts." },
    { key: "donations", title: "Live MFS & Bank Donations", desc: "Enables public donation flow and transaction logging." },
    { key: "withdrawals", title: "Withdrawal Requests", desc: "Enables campaign creators to request payout transfers." },
    { key: "email_sending", title: "Resend Email Dispatcher", desc: "Enables automated and manual email delivery system." },
    { key: "document_upload", title: "Document Upload Engine", desc: "Enables NID and medical certificate file attachments." },
    { key: "messaging", title: "Creator Direct Messaging", desc: "Enables public messaging to campaign creators." },
    { key: "maintenance_mode", title: "System Maintenance Mode", desc: "Pauses public campaign submissions for scheduled updates." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4">
        <div>
          <h3 className="font-editorial text-2xl text-[#1D2927] flex items-center gap-2">
            <Sliders className="h-6 w-6 text-[#1D2927]" /> Super Admin Live Feature Flags
          </h3>
          <p className="font-mono text-xs text-[#53605C]">
            Control core platform features live in real-time without deploying code.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featureItems.map((item) => {
          const isEnabled = flags[item.key];
          return (
            <PaperLift key={item.key} className="bg-[#FAF8F3] border border-[#D9D3C7] p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-xs font-bold text-[#1D2927]">{item.title}</div>
                  <p className="font-mono text-[10px] text-[#53605C] mt-1">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(item.key)}
                  disabled={isPending}
                  className={`flex items-center gap-1.5 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest border transition-all ${
                    isEnabled
                      ? "bg-[#1D2927] text-[#FAF8F3] border-[#1D2927]"
                      : "bg-[#A84D2A] text-[#FAF8F3] border-[#A84D2A]"
                  }`}
                >
                  {isEnabled ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                  {isEnabled ? "ACTIVE" : "PAUSED"}
                </button>
              </div>
            </PaperLift>
          );
        })}
      </div>
    </div>
  );
}
