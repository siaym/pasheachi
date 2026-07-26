"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

export function WorkspaceNav({ id }: { id: string }) {
  const pathname = usePathname();
  
  const CAMPAIGN_TABS = [
    { name: "Overview", href: `/dashboard/campaigns/${id}` },
    { name: "Story", href: `/dashboard/campaigns/${id}/story` },
    { name: "Updates", href: `/dashboard/campaigns/${id}/updates` },
    { name: "Supporters", href: `/dashboard/campaigns/${id}/supporters` },
    { name: "Donations", href: `/dashboard/campaigns/${id}/donations` },
    { name: "Analytics", href: `/dashboard/campaigns/${id}/analytics` },
    { name: "Withdrawals", href: `/dashboard/campaigns/${id}/withdrawals` },
    { name: "Settings", href: `/dashboard/campaigns/${id}/settings` },
  ];

  return (
    <FadeIn delay={0.1}>
      <div className="border-b border-[#D9D3C7] flex overflow-x-auto hide-scrollbar">
        {CAMPAIGN_TABS.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors relative",
                isActive
                  ? "text-[#1D2927]"
                  : "text-[#53605C] hover:text-[#1D2927] hover:bg-[#FAF8F3]"
              )}
            >
              {tab.name}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1D2927]" />
              )}
            </Link>
          );
        })}
      </div>
    </FadeIn>
  );
}
