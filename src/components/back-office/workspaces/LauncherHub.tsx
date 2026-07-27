"use client";

import { FadeIn, PaperLift } from "@/components/ui/motion";
import { WORKSPACES, WorkspaceId } from "@/lib/back-office/workspaces";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function LauncherHub({
  onSelectWorkspace,
  userRoles = ["SuperAdmin"]
}: {
  onSelectWorkspace: (wsId: WorkspaceId) => void;
  userRoles?: string[];
}) {
  return (
    <div className="space-y-8 pb-20">
      <FadeIn className="text-center space-y-3 border-b border-[#D9D3C7] pb-8">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#A84D2A] bg-[#FDF4F0] px-4 py-1 border border-[#A84D2A]">
          PasheAchi Enterprise OS Headquarters
        </span>
        <h1 className="font-editorial text-5xl sm:text-6xl text-[#1D2927]">
          Welcome Back, Siyam
        </h1>
        <p className="font-mono text-xs text-[#53605C] max-w-xl mx-auto">
          Select an authorized department workspace to enter the internal operating system.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(Object.keys(WORKSPACES) as WorkspaceId[]).map((wsKey) => {
          const ws = WORKSPACES[wsKey];
          const Icon = ws.icon;
          return (
            <PaperLift key={wsKey} className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 shadow-paper flex flex-col justify-between space-y-6 group hover:bg-[#F7F4ED] transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 border border-[#1D2927] bg-[#EAE5DB] text-[#1D2927] group-hover:bg-[#1D2927] group-hover:text-[#FAF8F3] transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#355C52] bg-[#E5EEE8] px-2 py-0.5 border border-[#355C52]">
                    Authorized
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-2xl text-[#1D2927]">{ws.name}</h3>
                  <p className="font-mono text-xs text-[#53605C] mt-1 leading-relaxed">
                    {ws.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectWorkspace(wsKey)}
                className="w-full h-10 bg-[#1D2927] text-[#FAF8F3] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-[#A84D2A] transition-colors shadow-ink"
              >
                <span>Launch {ws.shortName}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </PaperLift>
          );
        })}
      </div>
    </div>
  );
}
