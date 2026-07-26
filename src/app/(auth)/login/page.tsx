"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <FadeIn className="w-full max-w-md relative z-10">
        <PaperLift className="bg-[#FAF8F3] border border-[#1D2927] p-8 sm:p-12 shadow-paper relative">
          {/* Header */}
          <div className="flex flex-col text-center space-y-4 mb-10">
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#1D2927]">
              Welcome Back
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
              Access your creator dashboard
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-[#F7F4ED] border-l-2 border-[#A84D2A] font-mono text-[10px] uppercase tracking-widest text-[#A84D2A]">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B]">
                Username or Email
              </label>
              <input
                type="text"
                name="identifier"
                required
                placeholder="siyam or siyam@example.com"
                className="w-full bg-transparent border-b border-[#D9D3C7] focus:border-[#1D2927] py-2 font-editorial text-lg italic text-[#1D2927] outline-none transition-colors placeholder:text-[#D9D3C7]"
              />
            </div>

            <div className="space-y-2 relative">
              <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-lg text-[#1D2927] outline-none transition-colors placeholder:text-[#D9D3C7]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 text-[#53605C] hover:text-[#1D2927] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#FAF8F3] hover:text-[#1D2927] transition-all shadow-ink disabled:opacity-50 mt-8"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Signup Redirect */}
          <div className="mt-8 text-center border-t border-[#D9D3C7] pt-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C]">
              Need to start a campaign?{" "}
              <Link href="/signup" className="font-bold text-[#A84D2A] hover:text-[#1D2927] underline decoration-[#D9D3C7] underline-offset-4 transition-colors">
                Create an Account
              </Link>
            </p>
          </div>
        </PaperLift>
      </FadeIn>
    </div>
  );
}
