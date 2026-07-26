"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MOCK_USERS } from "@/data/mock";
import {
  User,
  ShieldCheck,
  CreditCard,
  Lock,
  Globe,
  Upload,
  CheckCircle2,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "verification" | "payment">("profile");
  const [saved, setSaved] = useState(false);
  const user = MOCK_USERS.siyam;

  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio || "",
    location: user.location || "",
    website: "",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-slate-50/50 dark:bg-slate-950">
      <Container variant="standard">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Account Settings
          </h1>
          <p className="text-xs text-slate-500">
            Manage your profile, identity verification, and withdrawal payout methods
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Side Tabs (Left 4 cols) */}
          <div className="md:col-span-4 space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "profile"
                  ? "bg-[#10B981] text-white shadow-md shadow-[#10B981]/25"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile Settings</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("verification")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "verification"
                  ? "bg-[#10B981] text-white shadow-md shadow-[#10B981]/25"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Identity & NID Verification</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("payment")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "payment"
                  ? "bg-[#10B981] text-white shadow-md shadow-[#10B981]/25"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span>Withdrawal Accounts</span>
            </button>
          </div>

          {/* Form Content (Right 8 cols) */}
          <div className="md:col-span-8">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <form onSubmit={handleSave} className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Public Profile
                  </h3>

                  {/* Avatar Upload */}
                  <div className="flex items-center gap-4">
                    <Avatar src={user.avatarUrl || undefined} name={user.name} size="xl" />
                    <div>
                      <Button size="sm" variant="secondary" type="button" className="font-bold text-xs">
                        Change Photo
                      </Button>
                      <p className="text-[10px] text-slate-400 mt-1">JPG or PNG. Max 2MB</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Profile URL
                      </label>
                      <div className="flex items-center">
                        <span className="text-xs font-semibold text-slate-400 mr-2">
                          pasheachi.bro.bd/
                        </span>
                        <input
                          type="text"
                          value={formData.username}
                          disabled
                          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 text-sm font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-[#10B981] focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                      />
                    </div>

                    <Input
                      label="Location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />

                    <Input
                      label="Website URL"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    {saved && (
                      <span className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Changes saved successfully!
                      </span>
                    )}
                    <Button size="md" type="submit" className="font-bold gap-2 ml-auto">
                      <Save className="h-4 w-4" /> Save Changes
                    </Button>
                  </div>
                </form>
              )}

              {/* Verification Tab */}
              {activeTab === "verification" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Identity & NID Verification
                    </h3>
                    <Badge variant="verified">✓ Verified Level 2</Badge>
                  </div>

                  <p className="text-xs text-slate-500">
                    Upload government identity papers (NID / Passport) to unlock higher withdrawal limits and receive the Verified Creator badge.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                      <Upload className="h-8 w-8 text-[#10B981] mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        NID Front Side
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">Uploaded ✓</p>
                    </div>

                    <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                      <Upload className="h-8 w-8 text-[#10B981] mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        NID Back Side
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">Uploaded ✓</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Accounts Tab */}
              {activeTab === "payment" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Saved Withdrawal Numbers
                  </h3>
                  <div className="space-y-3">
                    <Input label="bKash Personal Number" defaultValue="01712345678" />
                    <Input label="Nagad Personal Number" defaultValue="01912345678" />
                    <Input label="Bank Account Details" defaultValue="DBBL Acc: 1234567890" />
                  </div>
                  <Button size="md" className="font-bold">
                    Save Payout Accounts
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
