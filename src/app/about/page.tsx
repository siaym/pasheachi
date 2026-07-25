import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { Heart, ShieldCheck, Users, Sparkles, Mail, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 sm:py-20">
      <Container variant="standard">
        {/* Editorial Hero */}
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ECFDF5] px-4 py-1.5 text-xs font-extrabold text-[#047857] dark:bg-[#10B981]/15 dark:text-[#6EE7B7]">
            <Heart className="h-4 w-4" />
            <span>"পাশে আছি" — I'm Beside You</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Empowering Every Bangladeshi to Reach Their Dreams
          </h1>

          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            PasheAchi was created to break down financial barriers. Whether it's urgent medical surgery, university tuition, travel, emergency relief, or open-source software—our mission is to connect dreamers with generous supporters across the nation.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#10B981] dark:bg-emerald-950/50">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              One Profile, Unlimited Campaigns
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Every user receives a permanent address (<code className="text-[#10B981] font-mono">pasheachi.bro.bd/username</code>) to build trust and showcase all past & active causes in one place.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5] dark:bg-indigo-950/50">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Manual Verification for Ultimate Trust
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Phase 1 enforces strict manual transaction matching against bKash, Nagad, and Rocket statements, ensuring zero fraudulent claims.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-[#F59E0B] dark:bg-amber-950/50">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Inclusive Causes for All
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              PasheAchi is not just for charities or NGOs. Students, software developers, travelers, artists, and families can raise money for any honest goal.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#10B981] dark:bg-emerald-950/50">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Mobile-First Bangladesh Design
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Optimized for 4G mobile connections, low bandwidth, and 375px screens so anyone in Dhaka, Chittagong, Sylhet, or remote villages can participate effortlessly.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl font-bold">Have Questions or Partnerships?</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Our team is based in Dhaka, Bangladesh. Reach out for press inquiries, NGO onboarding, or support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold pt-2 text-[#10B981]">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> support@pasheachi.bro.bd
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Dhaka, Bangladesh
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}
