"use client";

import { useState } from "react";
import Link from "next/link";
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


export default function BackOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<WorkspaceId>("SUPER_ADMIN");
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("overview");

  const currentWorkspace = WORKSPACES[activeWorkspaceId];

  return (
    <div className="min-h-screen pt-16 pb-20 sm:pb-32 bg-[#F7F4ED]">
      {/* Global Command Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Top Back Office Enterprise Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#1D2927] text-[#F7F4ED] border-b border-[#D9D3C7]/20 shadow-md py-2 px-4 sm:px-8">

        <Container variant="wide" className="flex items-center justify-between gap-4">
          
          {/* Workspace Switcher Component */}
          <div className="relative">
            <button
              onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 bg-[#2F3E3B] border border-[#53605C] hover:bg-[#355C52] transition-colors rounded-none font-mono text-xs font-bold uppercase tracking-widest text-[#F7F4ED]"
            >
              <currentWorkspace.icon className="h-4 w-4 text-[#A84D2A]" />
              <span>Workspace: {currentWorkspace.name}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </button>

            {/* Switcher Dropdown */}
            {isWorkspaceDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#FAF8F3] border-2 border-[#1D2927] text-[#1D2927] shadow-paper z-50 divide-y divide-[#D9D3C7]">
                <div className="p-2 font-mono text-[9px] font-bold uppercase tracking-widest text-[#8C7A5B] bg-[#EAE5DB]">
                  Select Enterprise Workspace
                </div>
                {(Object.keys(WORKSPACES) as WorkspaceId[]).map((wsKey) => {
                  const ws = WORKSPACES[wsKey];
                  const isCurrent = wsKey === activeWorkspaceId;
                  const Icon = ws.icon;
                  return (
                    <button
                      key={wsKey}
                      onClick={() => {
                        setActiveWorkspaceId(wsKey);
                        setActiveNavItem("overview");
                        setIsWorkspaceDropdownOpen(false);
                      }}
                      className={`w-full text-left p-3 flex items-start gap-3 transition-colors ${isCurrent ? 'bg-[#1D2927] text-[#F7F4ED]' : 'hover:bg-[#F7F4ED]'}`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${isCurrent ? 'text-[#A84D2A]' : 'text-[#1D2927]'}`} />
                      <div>
                        <div className="font-bold text-xs font-mono uppercase">{ws.name}</div>
                        <div className={`text-[10px] font-mono leading-tight mt-0.5 ${isCurrent ? 'text-[#D9D3C7]' : 'text-[#53605C]'}`}>
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
            className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-[#2F3E3B] border border-[#53605C] text-[#D9D3C7] text-xs font-mono hover:text-[#F7F4ED] transition-colors w-80 justify-between"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-[#8C7A5B]" /> Search Back Office...
            </span>
            <span className="bg-[#1D2927] px-2 py-0.5 text-[9px] border border-[#53605C] font-bold text-[#F7F4ED]">Ctrl + K</span>
          </button>

          {/* Right System Health & Admin Profile */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-[#2F3E3B] border border-[#53605C] font-mono text-[10px] uppercase text-[#D9D3C7]">
              <Activity className="h-3 w-3 text-[#10B981] animate-pulse" />
              <span>System: 100% Operational</span>
            </div>

            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-1.5 hover:bg-[#2F3E3B] text-[#F7F4ED] transition-colors border border-[#53605C]"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#A84D2A]" />
            </button>

            <div className="flex items-center gap-2 font-mono text-xs text-[#F7F4ED] border-l border-[#53605C] pl-3">
              <span className="font-bold text-[#A84D2A]">SuperAdmin</span>
              <span className="text-[10px] text-[#D9D3C7] hidden sm:inline">(saifulsiam10000@gmail.com)</span>
            </div>

            <button
              onClick={() => logoutAction()}
              title="Log Out"
              className="p-1.5 hover:bg-[#A84D2A] text-[#F7F4ED] transition-colors border border-[#53605C] ml-2"
            >
              <LogOut className="h-4 w-4" />
            </button>


          </div>
        </Container>
      </div>

      {/* Notifications Drawer Overlay */}
      {isNotificationsOpen && (
        <div className="fixed top-28 right-4 z-50 bg-[#FAF8F3] border-2 border-[#1D2927] p-4 max-w-sm w-full shadow-paper space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-[#D9D3C7] pb-2">
            <span className="font-bold uppercase tracking-widest text-[#1D2927]">System Alerts</span>
            <button onClick={() => setIsNotificationsOpen(false)} className="text-[10px] text-[#8C7A5B] uppercase">Close</button>
          </div>
          <div className="space-y-2">
            <div className="p-2.5 bg-[#FDF4F0] border border-[#A84D2A] text-[#A84D2A]">
              <div className="font-bold text-[10px] uppercase">Finance Alert</div>
              <div>18 manual MFS transactions pending verification.</div>
            </div>
            <div className="p-2.5 bg-[#FAF8F3] border border-[#D9D3C7] text-[#1D2927]">
              <div className="font-bold text-[10px] uppercase text-[#8C7A5B]">Moderation</div>
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
              <PaperLift className="bg-[#FAF8F3] border border-[#1D2927] p-4 shadow-sm space-y-4">
                <div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8C7A5B] mb-1">
                    Active Workspace
                  </div>
                  <h3 className="font-editorial text-xl text-[#1D2927] flex items-center gap-2">
                    <currentWorkspace.icon className="h-5 w-5 text-[#A84D2A]" />
                    {currentWorkspace.name}
                  </h3>
                </div>

                <nav className="space-y-1 pt-2 border-t border-[#D9D3C7]">
                  {currentWorkspace.navItems.map((item) => {
                    const isActive = activeNavItem === item.id;
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveNavItem(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors border ${isActive ? 'bg-[#1D2927] text-[#F7F4ED] border-[#1D2927]' : 'bg-[#FAF8F3] text-[#53605C] border-transparent hover:border-[#D9D3C7] hover:text-[#1D2927]'}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <ItemIcon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className={`px-1.5 py-0.2 text-[9px] ${isActive ? 'bg-[#A84D2A] text-[#FAF8F3]' : 'bg-[#EAE5DB] text-[#1D2927]'}`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </PaperLift>
            </FadeIn>
          </div>

          {/* Main Workspace Stage */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}
