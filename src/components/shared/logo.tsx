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
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#10B981] via-[#059669] to-[#4F46E5] text-white shadow-md shadow-[#10B981]/20 transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
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
