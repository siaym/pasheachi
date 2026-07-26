"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { 
  ShieldCheck, 
  FileSpreadsheet, 
  Users, 
  Megaphone, 
  LayoutDashboard,
  LogOut,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Campaign Approvals", href: "/admin/campaigns", icon: Megaphone, badge: 12 },
  { name: "Verification Queue", href: "/admin/verification", icon: ShieldCheck, badge: 23 },
  { name: "Bulk Checker", href: "/admin/bulk-checker", icon: FileSpreadsheet },
  { name: "User Management", href: "/admin/users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen pt-40 pb-20 sm:pb-32 bg-[#F8FAFC]">
      <Container variant="wide">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Admin Sidebar Navigation */}
          <div className="w-full lg:w-64 shrink-0">
            <FadeIn>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3A8A] mb-6 pl-4 border-l-2 border-[#1E3A8A] flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Admin Console
              </div>
              
              <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
                {ADMIN_NAV.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between gap-3 px-4 py-3 text-sm font-bold tracking-wide transition-all whitespace-nowrap",
                        isActive 
                          ? "bg-[#1E3A8A] text-[#F8FAFC] shadow-ink" 
                          : "text-[#53605C] hover:text-[#1E3A8A] hover:bg-[#EFF6FF]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={cn("h-4 w-4", isActive ? "text-[#F8FAFC]" : "text-[#94A3B8]")} />
                        {item.name}
                      </div>
                      {item.badge && (
                        <span className={cn(
                          "px-2 py-0.5 text-[10px] font-mono rounded-full",
                          isActive ? "bg-[#3B82F6] text-white" : "bg-red-100 text-red-600"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-8 pt-8 border-t border-[#D9D3C7] hidden lg:block">
                <button className="flex items-center gap-3 px-4 py-3 text-sm font-bold tracking-wide text-red-600 hover:bg-red-50 w-full transition-colors text-left">
                  <LogOut className="h-4 w-4" />
                  Exit Console
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Main Admin Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>

        </div>
      </Container>
    </div>
  );
}
