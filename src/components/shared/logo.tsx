import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: "light" | "dark" | "auto";
}

export function Logo({ className, iconOnly = false, variant = "auto" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-3 font-bold tracking-tight transition-transform active:scale-95",
        className
      )}
    >
      {/* Two Strokes — two people on the same ground, one always beside the other. */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#D9D3C7] bg-[#FFFDF8] text-[#1D2927] transition-colors group-hover:border-[#A84D2A]">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
        >
          <path d="M9 23.5V10.3c0-1.75 1.1-2.8 2.4-2.8s2.35 1.05 2.35 2.8v13.2" stroke="currentColor" strokeWidth="4.3" strokeLinecap="round" />
          <path d="M19 23.5V8.5c0-1.75 1.08-2.8 2.35-2.8 1.3 0 2.4 1.05 2.4 2.8v15" stroke="#A84D2A" strokeWidth="4.3" strokeLinecap="round" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "text-xl font-bold tracking-[-0.04em]",
              variant === "light"
                ? "text-white"
                : variant === "dark"
                ? "text-slate-900"
                : "text-[#1D2927]"
            )}
          >
            Pashe<span className="text-[#A84D2A]">Achi</span>
          </span>
          <span className="mt-0.5 text-[10px] font-medium text-[#68726d]">
            পাশে আছি
          </span>
        </div>
      )}
    </Link>
  );
}
