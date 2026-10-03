"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import {
  Building2,
  Megaphone,
  Wallet,
  FileText,
  Settings,
  Users,
  LogOut,
  ChevronRight
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: Building2 },
  { name: "Finance", href: "/admin/finance", icon: Wallet },
  { name: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 md:min-h-screen flex flex-col shrink-0">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 text-white font-semibold text-lg tracking-tight">
            <Building2 className="h-5 w-5 text-blue-500" />
            PasheAchi Admin
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center justify-between text-xs font-medium text-slate-500 hover:text-slate-300 px-3 py-2">
            <span>Return to Site</span>
            <LogOut className="h-3 w-3" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 shrink-0">
          <div className="flex items-center text-sm font-medium text-slate-500">
            <span>Admin</span>
            <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
            <span className="text-slate-900 capitalize">
              {pathname === "/admin" ? "Dashboard" : pathname.split("/").pop()}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 flex-1 overflow-auto">
          <Suspense fallback={<div className="text-sm font-medium text-slate-500">Loading module...</div>}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
