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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D9D3C7] bg-[#F7F4ED] px-4 py-2 md:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isMain) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-5 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#F7F4ED] bg-[#A84D2A] text-white shadow-[0_7px_18px_rgba(132,59,32,.22)] active:scale-95"
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
                  ? "text-[#A84D2A]"
                  : "text-[#68726D] hover:text-[#1D2927]"
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
