"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const isUsernameAvailable = formData.username.length >= 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-100 bg-white p-8 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <Logo iconOnly className="h-12 w-12" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Join PasheAchi
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Start supporting dreams and launch your permanent profile
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name *"
            type="text"
            required
            placeholder="Siyam Ahmed"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Input
            label="Email Address *"
            type="email"
            required
            placeholder="siyam@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <Input
            label="Phone Number *"
            type="tel"
            required
            placeholder="01712345678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          {/* Username Input with URL Preview */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Claim Your Profile URL *
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs font-semibold text-slate-400 select-none">
                pasheachi.bro.bd/
              </span>
              <input
                type="text"
                required
                placeholder="siyam"
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
                  })
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-36 pr-10 text-sm text-slate-900 font-semibold focus:border-[#10B981] focus:outline-none focus:ring-4 focus:ring-[#10B981]/15 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
              />
              {isUsernameAvailable && (
                <CheckCircle2 className="absolute right-3.5 h-4 w-4 text-[#10B981]" />
              )}
            </div>
            {isUsernameAvailable && (
              <p className="text-xs text-[#10B981] font-semibold flex items-center gap-1">
                ✓ pasheachi.bro.bd/{formData.username} is available!
              </p>
            )}
          </div>

          <Input
            label="Password *"
            type="password"
            required
            placeholder="••••••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <div className="flex items-start gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              required
              className="mt-0.5 rounded border-slate-300 text-[#10B981] focus:ring-[#10B981]"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="font-semibold text-[#10B981] underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-semibold text-[#10B981] underline">
                Privacy Policy
              </Link>
            </span>
          </div>

          <Button size="lg" isLoading={loading} className="w-full font-bold mt-2">
            <span>Create Account</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#10B981] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
