import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  linkHref?: string;
  linkText?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  linkHref,
  linkText = "See All",
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 mb-10 sm:mb-12",
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className={cn("flex flex-col gap-2", centered && "items-center")}>
        {badge && (
          <span className="inline-flex items-center rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#047857] dark:bg-[#10B981]/15 dark:text-[#6EE7B7]">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {linkHref && (
        <Link
          href={linkHref}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#10B981] hover:text-[#059669] transition-colors group mt-2 sm:mt-0"
        >
          <span>{linkText}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
