"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { label: "Home", href: "/", icon: Home },
    { label: "Search", href: "/search", icon: Search },
    { label: "Create", href: "/create", icon: PlusCircle, isMain: true },
    { label: "Alerts", href: "/notifications", icon: Bell },
    { label: "Profile", href: "/dashboard", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 border-t border-slate-200 px-4 py-2 backdrop-blur-xl dark:bg-slate-950/95 dark:border-slate-800">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isMain) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#10B981] to-[#059669] text-white shadow-lg shadow-[#10B981]/30 active:scale-95"
              >
                <Icon className="h-7 w-7" />
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors",
                isActive
                  ? "text-[#10B981]"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
