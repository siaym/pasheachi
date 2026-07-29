"use client";

import { useState, useEffect, useTransition } from "react";
import { PaperLift } from "@/components/ui/motion";
import { getVerificationSettingsAction, updateVerificationSettingsAction } from "@/app/admin/actions";
import { ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

export function VerificationSettingsHub({ showToast }: { showToast: (msg: string) => void }) {
  const [isPending, startTransition] = useTransition();
  const [settings, setSettings] = useState<Record<string, boolean>>({
    requireNid: true,
    requireSelfie: true,
    requireMedicalCert: true,
    requireHospitalQuotation: true,
    requireIncomeProof: false,
    requireGuardianDoc: false,
    requireSupportingImages: true,
    requireAdditionalAttachments: false,
  });

  useEffect(() => {
    getVerificationSettingsAction().then((data) => {
      if (data) {
        setSettings({
          requireNid: data.requireNid,
          requireSelfie: data.requireSelfie,
          requireMedicalCert: data.requireMedicalCert,
          requireHospitalQuotation: data.requireHospitalQuotation,
          requireIncomeProof: data.requireIncomeProof,
          requireGuardianDoc: data.requireGuardianDoc,
          requireSupportingImages: data.requireSupportingImages,
          requireAdditionalAttachments: data.requireAdditionalAttachments,
        });
      }
    });
  }, []);

  const handleToggle = (key: string) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    startTransition(async () => {
      const res = await updateVerificationSettingsAction(updated);
      if (res.success) {
        showToast("Platform document verification settings updated live!");
      } else {
        showToast(`Error: ${res.error || "Failed to update settings"}`);
      }
    });
  };

  const docToggles = [
    { key: "requireNid", label: "Require National ID (NID Front/Back)", desc: "Mandatory government NID scan for campaign creator verification." },
    { key: "requireSelfie", label: "Require Biometric Selfie with NID", desc: "Creator holding NID document next to face for identity match." },
    { key: "requireMedicalCert", label: "Require Medical Certificate", desc: "Official medical report for healthcare & surgery campaigns." },
    { key: "requireHospitalQuotation", label: "Require Hospital Cost Estimate", desc: "Detailed hospital invoice or cost quotation breakdown." },
    { key: "requireIncomeProof", label: "Require Income / Financial Proof", desc: "Bank statement or salary slip proving financial need." },
    { key: "requireGuardianDoc", label: "Require Guardian Authorization", desc: "Guardian NID & consent form for minor campaign creators." },
    { key: "requireSupportingImages", label: "Require Supporting Clinical Images", desc: "Patient clinical photos or evidence supporting campaign claim." },
    { key: "requireAdditionalAttachments", label: "Require Additional Attachments", desc: "Utility bills or local government recommendation letters." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4">
        <div>
          <h3 className="font-editorial text-2xl text-[#1D2927] flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-[#355C52]" /> Platform Document Verification Settings
          </h3>
          <p className="font-mono text-xs text-[#53605C]">
            Super Admin global toggles for required campaign & creator verification documents.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docToggles.map((item) => {
          const isEnabled = settings[item.key];
          return (
            <PaperLift key={item.key} className="bg-[#FAF8F3] border border-[#D9D3C7] p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-xs font-bold text-[#1D2927] flex items-center gap-2">
                    {isEnabled ? (
                      <CheckCircle2 className="h-4 w-4 text-[#355C52]" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-[#8C7A5B]" />
                    )}
                    {item.label}
                  </div>
                  <p className="font-mono text-[10px] text-[#53605C] mt-1">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(item.key)}
                  disabled={isPending}
                  className={`px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest border transition-all ${
                    isEnabled
                      ? "bg-[#355C52] text-[#FAF8F3] border-[#355C52]"
                      : "bg-[#F7F4ED] text-[#53605C] border-[#D9D3C7]"
                  }`}
                >
                  {isEnabled ? "REQUIRED (ON)" : "OPTIONAL (OFF)"}
                </button>
              </div>
            </PaperLift>
          );
        })}
      </div>
    </div>
  );
}
