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
      {/* Symbol: The Intersecting Horizon Pillars ("Pashe Achi") */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E293B] text-[#FDFBF7] shadow-md transition-transform group-hover:scale-105 dark:bg-[#FDFBF7] dark:text-[#1E293B]">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
        >
          {/* Supporter Leaning Pillar */}
          <rect
            x="8"
            y="7"
            width="5.5"
            height="18"
            rx="2.5"
            transform="rotate(6 8 7)"
            fill="currentColor"
          />
          {/* Dreamer Grounded Pillar */}
          <rect
            x="18.5"
            y="7"
            width="5.5"
            height="18"
            rx="2.5"
            fill="#C25E00"
          />
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
                : "text-[#1E293B] dark:text-[#FDFBF7]"
            )}
          >
            Pashe<span className="text-[#C25E00]">Achi</span>
          </span>
          <span className="mt-0.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
            পাশে আছি
          </span>
        </div>
      )}
    </Link>
  );
}
