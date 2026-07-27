"use client";

import { useState } from "react";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { ShieldCheck, Lock, Bell, LogOut, KeyRound, Smartphone, AlertTriangle } from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";
import { useTransition } from "react";

export function SettingsClient({ user }: { user: any }) {
  const [isPending, startTransition] = useTransition();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMsg("New passwords do not match.");
      return;
    }
    setMsg("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9D3C7] pb-6">
        <div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#1D2927] mb-2">Account Settings</h2>
          <p className="font-mono text-xs uppercase tracking-widest text-[#53605C]">
            Manage security credentials, email alerts, and session controls.
          </p>
        </div>
      </div>

      {msg && (
        <div className="bg-[#FAF8F3] border border-[#1D2927] p-4 text-xs font-mono text-[#1D2927]">
          {msg}
        </div>
      )}

      {/* Password & Security Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <FadeIn delay={0.1}>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-[#D9D3C7] pb-4">
                <KeyRound className="h-5 w-5 text-[#A84D2A]" />
                <h3 className="font-editorial text-2xl text-[#1D2927]">Change Password</h3>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#8C7A5B] mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-10 px-3 border border-[#D9D3C7] bg-[#F7F4ED] focus:outline-none focus:border-[#1D2927]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#8C7A5B] mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full h-10 px-3 border border-[#D9D3C7] bg-[#F7F4ED] focus:outline-none focus:border-[#1D2927]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#8C7A5B] mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-10 px-3 border border-[#D9D3C7] bg-[#F7F4ED] focus:outline-none focus:border-[#1D2927]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="h-10 px-6 bg-[#1D2927] text-[#FAF8F3] font-bold text-[10px] uppercase tracking-widest hover:bg-[#FAF8F3] hover:text-[#1D2927] border border-[#1D2927] transition-all shadow-ink"
                >
                  Update Security Credentials
                </button>
              </form>
            </PaperLift>
          </FadeIn>
        </div>

        {/* Danger Zone & Logout */}
        <div className="lg:col-span-4 space-y-6">
          <FadeIn delay={0.2}>
            <PaperLift className="bg-[#FAF8F3] border border-[#A84D2A] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#A84D2A]">
                <LogOut className="h-5 w-5" />
                <h3 className="font-editorial text-xl text-[#1D2927]">Account Session</h3>
              </div>
              <p className="font-mono text-xs text-[#53605C]">
                Sign out of your PasheAchi creator session safely on this device.
              </p>
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="w-full h-12 bg-[#A84D2A] text-[#FAF8F3] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#843B20] transition-colors flex items-center justify-center gap-2 shadow-ink"
              >
                <LogOut className="h-4 w-4" />
                {isPending ? "Signing out..." : "Log Out of PasheAchi"}
              </button>
            </PaperLift>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
