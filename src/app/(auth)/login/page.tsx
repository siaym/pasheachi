"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);

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
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sign in to manage your campaigns and support causes
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email or Phone Number"
            type="text"
            required
            placeholder="siyam@email.com or 017XXXXXXXX"
            value={formData.identifier}
            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-9 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input type="checkbox" className="rounded border-slate-300 text-[#10B981] focus:ring-[#10B981]" />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="font-semibold text-[#10B981] hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button size="lg" isLoading={loading} className="w-full font-bold">
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {/* Social Signin Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 dark:bg-slate-900">or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="md" className="w-full text-xs font-semibold">
            Google
          </Button>
          <Button variant="secondary" size="md" className="w-full text-xs font-semibold">
            Facebook
          </Button>
        </div>

        {/* Signup Redirect */}
        <p className="text-center text-xs text-slate-500">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold text-[#10B981] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
