"use client";

import { useState, useEffect, createContext, useContext, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/ui/motion";
import { WORKSPACES, WorkspaceId } from "@/lib/back-office/workspaces";
import { GlobalSearchModal } from "@/components/back-office/global-search";
import { 
  Building2, 
  Search, 
  ChevronDown, 
  Activity,
  LogOut,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { logoutAction } from "../(auth)/actions";

export interface AdminNavContextType {
  activeWorkspaceId: WorkspaceId | "LAUNCHER";
  activeNavItem: string;
  setWorkspace: (wsId: WorkspaceId | "LAUNCHER", tabId?: string) => void;
  setNavItem: (tabId: string) => void;
}

export const AdminNavContext = createContext<AdminNavContextType>({
  activeWorkspaceId: "SUPER_ADMIN",
  activeNavItem: "overview",
  setWorkspace: () => {},
  setNavItem: () => {},
});

export function useAdminNav() {
  return useContext(AdminNavContext);
}

function BackOfficeLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const workspaceParam = searchParams.get("workspace") as WorkspaceId | "LAUNCHER" | null;
  const tabParam = searchParams.get("tab");

  const [activeWorkspaceId, setActiveWorkspaceId] = useState<WorkspaceId | "LAUNCHER">(() => {
    if (workspaceParam === "LAUNCHER") return "LAUNCHER";
    if (workspaceParam && WORKSPACES[workspaceParam as WorkspaceId]) return workspaceParam as WorkspaceId;
    return "SUPER_ADMIN";
  });

  const [activeNavItem, setActiveNavItem] = useState<string>(() => tabParam || "overview");

  useEffect(() => {
    if (workspaceParam === "LAUNCHER") {
      setActiveWorkspaceId("LAUNCHER");
    } else if (workspaceParam && WORKSPACES[workspaceParam as WorkspaceId]) {
      setActiveWorkspaceId(workspaceParam as WorkspaceId);
    }
    if (tabParam) {
      setActiveNavItem(tabParam);
    }
  }, [workspaceParam, tabParam]);

  const setWorkspace = (wsId: WorkspaceId | "LAUNCHER", tabId: string = "overview") => {
    setActiveWorkspaceId(wsId);
    setActiveNavItem(tabId);
    if (wsId === "LAUNCHER") {
      const url = `/admin?workspace=LAUNCHER`;
      window.history.pushState({}, "", url);
    } else {
      const url = `/admin?workspace=${wsId}&tab=${tabId}`;
      window.history.pushState({}, "", url);
    }
  };

  const setNavItem = (tabId: string) => {
    setActiveNavItem(tabId);
    const ws = activeWorkspaceId === "LAUNCHER" ? "SUPER_ADMIN" : activeWorkspaceId;
    const url = `/admin?workspace=${ws}&tab=${tabId}`;
    window.history.pushState({}, "", url);
  };

  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const displayWorkspaceId: WorkspaceId = activeWorkspaceId === "LAUNCHER" ? "SUPER_ADMIN" : activeWorkspaceId;
  const currentWorkspace = WORKSPACES[displayWorkspaceId];

  const handleSelectWorkspace = (wsKey: WorkspaceId) => {
    setIsWorkspaceDropdownOpen(false);
    setWorkspace(wsKey, "overview");
  };

  const handleSelectNavItem = (tabId: string) => {
    setNavItem(tabId);
  };

  return (
    <AdminNavContext.Provider
      value={{
        activeWorkspaceId,
        activeNavItem,
        setWorkspace,
        setNavItem,
      }}
    >
      <div className="min-h-screen pt-16 pb-20 sm:pb-32 bg-[#F7F4ED]">
        {/* Global Command Search Modal */}
        <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        {/* Top Back Office Enterprise Bar */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-[#1D2927] text-[#FAF8F3] border-b border-[#355C52]/40 shadow-lg py-2.5 px-4 sm:px-8">
          <Container variant="wide" className="flex items-center justify-between gap-4">
            
            {/* Left Brand & Workspace Switcher */}
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="font-editorial text-xl font-bold tracking-tight text-[#FAF8F3] hover:text-[#A84D2A] transition-colors flex items-center gap-2"
              >
                <span>PasheAchi</span>
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-[#A84D2A] text-white rounded font-bold">Admin</span>
              </Link>

              <div className="h-5 w-px bg-[#53605C]/50 hidden sm:block"></div>

              {/* Workspace Switcher Component */}
              <div className="relative">
                <button
                  onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#253532] border border-[#53605C]/60 text-[#FAF8F3] hover:bg-[#355C52] transition-colors text-xs font-mono font-bold uppercase tracking-wider"
                >
                  <currentWorkspace.icon className="h-3.5 w-3.5 text-[#10B981]" />
                  <span>{currentWorkspace.name}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-70 ml-1" />
                </button>

                {/* Switcher Dropdown */}
                {isWorkspaceDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-[#FAF8F3] border-2 border-[#1D2927] text-[#1D2927] shadow-2xl z-50 divide-y divide-[#D9D3C7]">
                    <div className="p-2.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C7A5B] bg-[#EAE5DB]">
                      Switch Workspace
                    </div>
                    {(Object.keys(WORKSPACES) as WorkspaceId[]).map((wsKey) => {
                      const ws = WORKSPACES[wsKey];
                      const isCurrent = wsKey === displayWorkspaceId;
                      const Icon = ws.icon;
                      return (
                        <button
                          key={wsKey}
                          onClick={() => handleSelectWorkspace(wsKey)}
                          className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors ${
                            isCurrent ? "bg-[#1D2927] text-[#FAF8F3]" : "hover:bg-[#EAE5DB]"
                          }`}
                        >
                          <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${isCurrent ? "text-[#10B981]" : "text-[#A84D2A]"}`} />
                          <div>
                            <div className="font-bold text-xs font-mono uppercase">{ws.name}</div>
                            <div className={`text-[10px] font-mono leading-tight mt-0.5 ${isCurrent ? "text-[#D9D3C7]" : "text-[#53605C]"}`}>
                              {ws.description}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Center Search Shortcut */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-[#253532] border border-[#53605C]/60 text-[#D9D3C7] text-xs font-mono hover:text-white hover:border-[#10B981] transition-colors w-72 justify-between"
            >
              <span className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-[#10B981]" /> Search Everything...
              </span>
              <span className="bg-[#1D2927] px-1.5 py-0.5 text-[9px] border border-[#53605C] font-bold text-white">Ctrl + K</span>
            </button>

            {/* Right Controls & Profile */}
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-[#D9D3C7] hover:text-white transition-colors"
                title="Open Public Site"
              >
                <span>Live Site</span>
                <ExternalLink className="h-3 w-3" />
              </a>

              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#253532] border border-[#53605C]/60 text-xs font-mono text-[#D9D3C7]">
                <Activity className="h-3 w-3 text-[#10B981] animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-[#10B981]">Online</span>
              </div>

              <button
                onClick={() => logoutAction()}
                title="Log Out"
                className="p-1.5 hover:bg-[#A84D2A] text-white transition-colors border border-[#53605C]/60"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </Container>
        </div>

        {/* Main Workspace Layout */}
        <Container variant="wide" className="mt-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Active Workspace Sidebar */}
            <div className="w-full lg:w-64 shrink-0 space-y-6">
              <FadeIn>
                <div className="bg-[#FAF8F3] border-2 border-[#1D2927] p-4 shadow-paper space-y-4">
                  <div>
                    <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#8C7A5B] mb-1">
                      Active Workspace
                    </div>
                    <h3 className="font-editorial text-2xl text-[#1D2927] flex items-center gap-2">
                      <currentWorkspace.icon className="h-5 w-5 text-[#A84D2A]" />
                      {currentWorkspace.name}
                    </h3>
                  </div>

                  <nav className="space-y-1.5 pt-3 border-t border-[#D9D3C7]">
                    {currentWorkspace.navItems.map((item) => {
                      const isActive = activeNavItem === item.id;
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectNavItem(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                            isActive
                              ? "bg-[#1D2927] text-white border-[#1D2927] shadow-sm translate-x-1"
                              : "bg-white text-[#53605C] border-[#D9D3C7] hover:border-[#1D2927] hover:text-[#1D2927]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <ItemIcon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </div>
                        </button>
                      );
                    })}
                  </nav>

                  {/* Quick Switch Links to other workspaces */}
                  <div className="pt-4 border-t border-dashed border-[#D9D3C7] space-y-2 font-mono text-[10px]">
                    <span className="uppercase text-[#8C7A5B] font-bold block">Quick Jump:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => handleSelectWorkspace("FINANCE")}
                        className={`p-1.5 border text-center font-bold uppercase transition-colors ${activeWorkspaceId === "FINANCE" ? "bg-[#355C52] text-white border-[#355C52]" : "bg-white border-[#D9D3C7] hover:border-[#1D2927]"}`}
                      >
                        Finance
                      </button>
                      <button
                        onClick={() => handleSelectWorkspace("MODERATION")}
                        className={`p-1.5 border text-center font-bold uppercase transition-colors ${activeWorkspaceId === "MODERATION" ? "bg-[#8C7A5B] text-white border-[#8C7A5B]" : "bg-white border-[#D9D3C7] hover:border-[#1D2927]"}`}
                      >
                        Moderation
                      </button>
                      <button
                        onClick={() => handleSelectWorkspace("CONTENT")}
                        className={`p-1.5 border text-center font-bold uppercase transition-colors ${activeWorkspaceId === "CONTENT" ? "bg-[#A84D2A] text-white border-[#A84D2A]" : "bg-white border-[#D9D3C7] hover:border-[#1D2927]"}`}
                      >
                        Content
                      </button>
                      <button
                        onClick={() => handleSelectWorkspace("PLATFORM")}
                        className={`p-1.5 border text-center font-bold uppercase transition-colors ${activeWorkspaceId === "PLATFORM" ? "bg-[#1D2927] text-white border-[#1D2927]" : "bg-white border-[#D9D3C7] hover:border-[#1D2927]"}`}
                      >
                        Platform
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Main Workspace Stage */}
            <div className="flex-1 min-w-0">
              {children}
            </div>
          </div>
        </Container>
      </div>
    </AdminNavContext.Provider>
  );
}

export default function BackOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="p-8 text-xs font-mono">Loading Enterprise Back-Office...</div>}>
      <BackOfficeLayoutContent>{children}</BackOfficeLayoutContent>
    </Suspense>
  );
}
