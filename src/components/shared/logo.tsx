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
        "group flex items-center gap-2.5 font-bold tracking-tight transition-transform active:scale-95",
        className
      )}
    >
      {/* The Side-by-Side Arch Symbol ("Pashe Achi") */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#059669] via-[#10B981] to-[#4F46E5] text-white shadow-md shadow-[#10B981]/25 transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
        >
          {/* Left Supporter Arch */}
          <path
            d="M6 24V14C6 9.58172 9.58172 6 14 6C17.3137 6 20.1504 8.01639 21.3431 10.8787"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Right Dreamer Arch (leaning beside) */}
          <path
            d="M26 24V16C26 12.6863 23.3137 10 20 10C17.2386 10 14.8878 11.8687 14.1953 14.4118"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Interlocking Connection Point */}
          <circle cx="14" cy="14" r="2" fill="currentColor" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "text-xl font-extrabold tracking-tight",
              variant === "light"
                ? "text-white"
                : variant === "dark"
                ? "text-slate-900"
                : "text-slate-900 dark:text-white"
            )}
          >
            Pashe<span className="text-[#10B981]">Achi</span>
          </span>
          <span className="mt-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            পাশে আছি
          </span>
        </div>
      )}
    </Link>
  );
}
