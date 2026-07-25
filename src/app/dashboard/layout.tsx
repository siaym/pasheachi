"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { FadeIn, PaperLift } from "@/components/ui/motion";
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Settings, 
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

const DASHBOARD_NAV = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Donor Records", href: "/dashboard/donors", icon: Users },
  { name: "Withdrawals", href: "/dashboard/withdrawals", icon: Wallet },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen pt-32 pb-20 sm:pb-32 bg-[#F8FAFC]">
      <Container variant="wide">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Dashboard Navigation Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <FadeIn>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#53605C] mb-6 pl-4 border-l-2 border-[#A84D2A]">
                Creator Ledger
              </div>
              
              <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
                {DASHBOARD_NAV.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-bold tracking-wide transition-all whitespace-nowrap",
                        isActive 
                          ? "bg-[#1D2927] text-[#F7F4ED] shadow-ink" 
                          : "text-[#53605C] hover:text-[#1D2927] hover:bg-[#EAE5DB]"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isActive ? "text-[#F7F4ED]" : "text-[#8C7A5B]")} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </FadeIn>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>

        </div>
      </Container>
    </div>
  );
}
