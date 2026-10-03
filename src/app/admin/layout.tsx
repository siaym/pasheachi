"use client";

import { useState, useEffect, createContext, useContext, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/container";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { WORKSPACES, WorkspaceId } from "@/lib/back-office/workspaces";
import { GlobalSearchModal } from "@/components/back-office/global-search";
import { 
  Building2, 
  Search, 
  Bell, 
  ShieldCheck, 
  ChevronDown, 
  Activity,
  LogOut,
  Sliders,
  Users
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
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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
      <div className="min-h-screen pt-16 pb-20 sm:pb-32 bg-slate-50">
        {/* Global Command Search Modal */}
        <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        {/* Top Back Office Enterprise Bar */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-slate-900 text-white border-b border-slate-200/20 shadow-md py-2 px-4 sm:px-8">

          <Container variant="wide" className="flex items-center justify-between gap-4">
            
            {/* Workspace Switcher Component */}
            <div className="relative">
              <button
                onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-900 hover:bg-emerald-600 transition-colors rounded-md text-xs font-medium font-bold uppercase tracking-wider text-white"
              >
                <currentWorkspace.icon className="h-4 w-4 text-blue-600" />
                <span>Workspace: {currentWorkspace.name}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>

              {/* Switcher Dropdown */}
              {isWorkspaceDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 text-slate-900 shadow-md rounded-xl z-50 divide-y divide-slate-200">
                  <div className="p-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100">
                    Select Enterprise Workspace
                  </div>
                  {(Object.keys(WORKSPACES) as WorkspaceId[]).map((wsKey) => {
                    const ws = WORKSPACES[wsKey];
                    const isCurrent = wsKey === displayWorkspaceId;
                    const Icon = ws.icon;
                    return (
                      <button
                        key={wsKey}
                        onClick={() => handleSelectWorkspace(wsKey)}
                        className={`w-full text-left p-3 flex items-start gap-3 transition-colors ${isCurrent ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'}`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${isCurrent ? 'text-blue-600' : 'text-slate-900'}`} />
                        <div>
                          <div className="font-bold text-xs font-mono uppercase">{ws.name}</div>
                          <div className={`text-[10px] font-mono leading-tight mt-0.5 ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                            {ws.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Center Search Shortcut */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-white border border-slate-200 text-slate-900 text-slate-300 text-xs font-mono hover:text-white transition-colors w-80 justify-between"
            >
              <span className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-slate-400" /> Search Back Office...
              </span>
              <span className="bg-slate-900 px-2 py-0.5 text-[9px] border border-slate-600 font-bold text-white">Ctrl + K</span>
            </button>

            {/* Right System Health & Admin Profile */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-white border border-slate-200 text-slate-900 text-xs font-medium uppercase tracking-wider text-slate-300">
                <Activity className="h-3 w-3 text-[#10B981] animate-pulse" />
                <span>System: 100% Operational</span>
              </div>

              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-1.5 hover:bg-slate-800 text-white transition-colors border border-slate-600"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-600" />
              </button>

              <div className="flex items-center gap-2 text-xs font-medium text-white border-l border-slate-600 pl-3">
                <span className="font-bold text-blue-600">SuperAdmin</span>
                <span className="bg-slate-800 px-1.5 py-0.5 border border-slate-600 text-[9px] font-bold text-slate-300">ID: usr-admin-1</span>
                <span className="text-[10px] text-slate-300 hidden sm:inline">(saifulsiam10000@gmail.com)</span>
              </div>

              <button
                onClick={() => logoutAction()}
                title="Log Out"
                className="p-1.5 hover:bg-blue-600 text-white transition-colors border border-slate-600 ml-2"
              >
                <LogOut className="h-4 w-4" />
              </button>


            </div>
          </Container>
        </div>

        {/* Notifications Drawer Overlay */}
        {isNotificationsOpen && (
          <div className="fixed top-28 right-4 z-50 bg-white border border-slate-200 p-4 max-w-sm w-full shadow-md rounded-xl space-y-3 text-xs font-medium">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="font-bold uppercase tracking-wider text-slate-900">System Alerts</span>
              <button onClick={() => setIsNotificationsOpen(false)} className="text-[10px] text-slate-400 uppercase">Close</button>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 bg-blue-50 border border-blue-600 text-blue-600">
                <div className="font-bold text-[10px] uppercase">Finance Alert</div>
                <div>18 manual MFS transactions pending verification.</div>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 text-slate-900">
                <div className="font-bold text-[10px] uppercase text-slate-400">Moderation</div>
                <div>12 new campaigns submitted for NID review.</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Workspace Layout */}
        <Container variant="wide" className="mt-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Active Workspace Sidebar */}
            <div className="w-full lg:w-64 shrink-0 space-y-6">
              <FadeIn>
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 shadow-sm space-y-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Active Workspace
                    </div>
                    <h3 className="font-sans font-semibold tracking-tight text-xl text-slate-900 flex items-center gap-2">
                      <currentWorkspace.icon className="h-5 w-5 text-blue-600" />
                      {currentWorkspace.name}
                    </h3>
                  </div>

                  <nav className="space-y-1 pt-2 border-t border-slate-200">
                    {currentWorkspace.navItems.map((item) => {
                      const isActive = activeNavItem === item.id;
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectNavItem(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium font-bold uppercase tracking-wider transition-colors border ${isActive ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-transparent hover:border-slate-200 hover:text-slate-900'}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <ItemIcon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </div>
                          {item.badge !== undefined && (
                            <span className={`px-1.5 py-0.2 text-[9px] ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
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
    <Suspense fallback={<div className="p-8 text-xs font-medium">Loading Enterprise Back-Office...</div>}>
      <BackOfficeLayoutContent>{children}</BackOfficeLayoutContent>
    </Suspense>
  );
}


