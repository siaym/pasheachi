import { AnimatedCounter } from "@/components/shared/animated-counter";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  isCompact?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  value,
  label,
  prefix,
  suffix,
  isCompact = false,
  icon,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "glass-panel flex flex-col items-start rounded-2xl p-6 shadow-sm transition-transform hover:-translate-y-1",
        className
      )}
    >
      {icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#10B981]/15 text-[#10B981]">
          {icon}
        </div>
      )}
      <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          isCompact={isCompact}
        />
      </div>
      <span className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </div>
  );
}
