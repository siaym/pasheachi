"use client";

import { useState } from "react";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { User, Mail, Smartphone, Landmark, Save, ShieldCheck, LogOut } from "lucide-react";


import { ImageUploader } from "@/components/shared/image-uploader";

import { updateProfilePageAction } from "../campaigns/[id]/actions";
import { updateWithdrawalAccountsAction } from "./actions";

export function ProfileClient({ user }: { user: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");
  const [coverUrl, setCoverUrl] = useState(user.coverUrl || "");

  const [bkashNumber, setBkashNumber] = useState(user.bkashNumber || "");
  const [nagadNumber, setNagadNumber] = useState(user.nagadNumber || "");
  const [bankDetails, setBankDetails] = useState(user.bankDetails || "");
  const [isSavingAccounts, setIsSavingAccounts] = useState(false);
  const [accountSuccess, setAccountSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSavedSuccess(false);
    const result = await updateProfilePageAction(name, bio, avatarUrl, coverUrl);
    setIsSaving(false);
    if (result.success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleSaveAccounts = async () => {
    setIsSavingAccounts(true);
    setAccountSuccess(false);
    const res = await updateWithdrawalAccountsAction({
      bkashNumber,
      nagadNumber,
      bankDetails,
    });
    setIsSavingAccounts(false);
    if (res.success) {
      setAccountSuccess(true);
      setTimeout(() => setAccountSuccess(false), 3000);
    }
  };



  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-6">
        <div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#1D2927] mb-2">Creator Profile</h2>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Manage your personal details and withdrawal accounts.
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="h-10 px-6 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] hover:bg-[#FAF8F3] hover:text-[#1D2927] font-mono text-[10px] font-bold uppercase tracking-widest transition-all shadow-ink flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Details */}
        <div className="lg:col-span-2 space-y-8">
          <FadeIn delay={0.1}>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 sm:p-8 space-y-8 shadow-sm">
              <h3 className="font-editorial text-2xl text-[#1D2927] border-b border-[#D9D3C7] pb-2">
                Personal Information
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUploader
                    value={avatarUrl}
                    onChange={setAvatarUrl}
                    label="Profile Avatar Photo"
                    aspectRatio="square"
                  />
                  <ImageUploader
                    value={coverUrl}
                    onChange={setCoverUrl}
                    label="Profile Cover Banner"
                    aspectRatio="banner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-lg text-[#1D2927] outline-none transition-colors"
                  />
                </div>


                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B] flex items-center gap-2">
                    <Mail className="h-3 w-3" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-lg text-[#1D2927] outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B]">
                    Bio (Optional)
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell supporters a bit about yourself..."
                    rows={4}
                    className="w-full bg-transparent border-b border-[#D9D3C7] focus:border-[#1D2927] py-2 font-editorial text-sm italic text-[#1D2927] outline-none transition-colors resize-none placeholder:text-[#D9D3C7]"
                  />
                </div>
              </div>
            </PaperLift>
          </FadeIn>
        </div>

        {/* Withdrawal Accounts */}
        <div className="space-y-6">
          <FadeIn delay={0.2}>
            <div className="flex items-center justify-between border-b-2 border-[#1D2927] pb-2 mb-6">
              <h3 className="font-editorial text-2xl text-[#1D2927]">
                Verified Payout Accounts
              </h3>
              <button
                onClick={handleSaveAccounts}
                disabled={isSavingAccounts}
                className="px-4 py-1.5 bg-[#1D2927] text-[#FAF8F3] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#A84D2A] transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                {isSavingAccounts ? "Saving..." : "Save Accounts"}
              </button>
            </div>

            {accountSuccess && (
              <div className="p-3 bg-[#E5EEE8] border border-[#355C52] text-[#355C52] font-mono text-xs font-bold mb-4">
                ✓ Payout account details updated successfully!
              </div>
            )}
            
            <div className="space-y-4">
              <PaperLift className="bg-[#FAF8F3] border border-[#1D2927] p-4 flex flex-col gap-3 shadow-ink">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#EAE5DB] p-2 rounded">
                      <Smartphone className="h-5 w-5 text-[#1D2927]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1D2927] text-sm">bKash Personal</div>
                      <div className="font-mono text-[10px] text-[#53605C] uppercase tracking-widest">Primary MFS</div>
                    </div>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-[#10B981]" />
                </div>
                <div className="border-t border-[#D9D3C7] pt-2">
                  <input
                    type="text"
                    placeholder="+880 17XXXXXXXX"
                    value={bkashNumber}
                    onChange={(e) => setBkashNumber(e.target.value)}
                    className="w-full h-9 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs text-[#1D2927] focus:outline-none focus:border-[#1D2927]"
                  />
                </div>
              </PaperLift>

              <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#EAE5DB] p-2 rounded">
                      <Smartphone className="h-5 w-5 text-[#53605C]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1D2927] text-sm">Nagad Personal</div>
                      <div className="font-mono text-[10px] text-[#53605C] uppercase tracking-widest">Secondary MFS</div>
                    </div>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-[#10B981]" />
                </div>
                <div className="border-t border-[#D9D3C7] pt-2">
                  <input
                    type="text"
                    placeholder="+880 19XXXXXXXX"
                    value={nagadNumber}
                    onChange={(e) => setNagadNumber(e.target.value)}
                    className="w-full h-9 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs text-[#1D2927] focus:outline-none focus:border-[#1D2927]"
                  />
                </div>
              </PaperLift>

              <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#EAE5DB] p-2 rounded">
                      <Landmark className="h-5 w-5 text-[#53605C]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1D2927] text-sm">Bank Transfer</div>
                      <div className="font-mono text-[10px] text-[#53605C] uppercase tracking-widest">Bank Details & Account Number</div>
                    </div>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-[#10B981]" />
                </div>
                <div className="border-t border-[#D9D3C7] pt-2">
                  <input
                    type="text"
                    placeholder="e.g. Dutch Bangla Bank, Acct: 1029384092"
                    value={bankDetails}
                    onChange={(e) => setBankDetails(e.target.value)}
                    className="w-full h-9 px-3 bg-[#F7F4ED] border border-[#D9D3C7] font-mono text-xs text-[#1D2927] focus:outline-none focus:border-[#1D2927]"
                  />
                </div>
              </PaperLift>
            </div>
            
            <p className="text-xs text-[#53605C] mt-6 italic bg-[#EAE5DB] p-4 border-l-2 border-[#1D2927]">
              Enter your verified Mobile Financial Service (MFS) or Bank account details above and click Save. All campaign withdrawal requests will be transferred to your designated account.
            </p>

            {/* Profile Session Log Out */}
            <div className="mt-8 border-t border-[#D9D3C7] pt-6">
              <PaperLift className="bg-[#FAF8F3] border border-[#A84D2A] p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-editorial text-xl text-[#1D2927]">Session Management</h4>
                  <p className="font-mono text-xs text-[#53605C] mt-0.5">End your creator session on this browser.</p>
                </div>
                <button
                  onClick={async () => {
                    const { logoutAction } = await import("@/app/(auth)/actions");
                    await logoutAction();
                  }}
                  className="h-10 px-6 bg-[#A84D2A] text-[#FAF8F3] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#843B20] transition-colors flex items-center gap-2 shadow-ink shrink-0"
                >
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </PaperLift>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

