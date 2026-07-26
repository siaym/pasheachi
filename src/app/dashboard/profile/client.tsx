"use client";

import { useState } from "react";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { User, Mail, Smartphone, Landmark, Save, ShieldCheck } from "lucide-react";

export function ProfileClient({ user }: { user: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
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
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Avatar Placeholder */}
                  <div className="h-24 w-24 rounded-full bg-[#EAE5DB] border-2 border-[#1D2927] flex items-center justify-center overflow-hidden shrink-0">
                    <User className="h-10 w-10 text-[#53605C]" />
                  </div>
                  <div className="space-y-2 flex-1">
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
            <h3 className="font-editorial text-2xl text-[#1D2927] border-b-2 border-[#1D2927] pb-2 mb-6">
              Verified Accounts
            </h3>
            
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
                <div className="border-t border-[#D9D3C7] pt-3 mt-1 font-mono text-sm tracking-wider text-[#1D2927]">
                  +880 1712 *** 345
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
                <div className="border-t border-[#D9D3C7] pt-3 mt-1 font-mono text-sm tracking-wider text-[#1D2927]">
                  +880 1912 *** 678
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
                      <div className="font-mono text-[10px] text-[#53605C] uppercase tracking-widest">Dutch Bangla Bank</div>
                    </div>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-[#10B981]" />
                </div>
                <div className="border-t border-[#D9D3C7] pt-3 mt-1 font-mono text-sm tracking-wider text-[#1D2927]">
                  Acct: ****4092
                </div>
              </PaperLift>
            </div>
            
            <p className="text-xs text-[#53605C] mt-6 italic bg-[#EAE5DB] p-4 border-l-2 border-[#1D2927]">
              To add or change withdrawal accounts, please contact PasheAchi support with your verification documents.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
