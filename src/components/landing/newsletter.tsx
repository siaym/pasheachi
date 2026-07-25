"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="py-16 sm:py-20">
      <Container variant="wide">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#10B981] via-[#059669] to-[#4F46E5] p-8 sm:p-14 text-white shadow-xl">
          {/* Subtle overlay elements */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Stand Beside Dreams Everyday
              </h2>
              <p className="text-sm sm:text-base text-emerald-100">
                Join 15,000+ supporters. Receive weekly stories of hope, community impact reports, and featured campaign alerts.
              </p>
            </div>

            <div className="w-full max-w-md">
              {subscribed ? (
                <div className="flex items-center gap-3 rounded-2xl bg-white/20 p-4 backdrop-blur-md text-white font-semibold">
                  <CheckCircle2 className="h-6 w-6 text-emerald-200 shrink-0" />
                  <span>Thank you for joining our community! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 w-full rounded-2xl bg-white/90 px-4 text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 bg-slate-900 text-white hover:bg-slate-800 shrink-0 font-bold gap-2"
                  >
                    <span>Subscribe</span>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
