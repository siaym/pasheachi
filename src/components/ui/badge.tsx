import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-slate-200 bg-slate-100 text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100",
        primary:
          "bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] dark:bg-[#064E3B]/40 dark:text-[#6EE7B7] dark:border-[#047857]",
        secondary:
          "bg-[#EEF2FF] text-[#3730A3] border border-[#C7D2FE] dark:bg-[#312E81]/40 dark:text-[#A5B4FC] dark:border-[#3730A3]",
        accent:
          "bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] dark:bg-[#78350F]/40 dark:text-[#FCD34D] dark:border-[#B45309]",
        verified:
          "bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-sm",
        active:
          "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
        completed:
          "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
        pending:
          "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
        draft:
          "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, variant, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {variant === "verified" && !icon ? (
        <ShieldCheck className="h-3.5 w-3.5 fill-white text-[#4F46E5]" />
      ) : (
        icon
      )}
      <span>{children}</span>
    </div>
  );
}

export { Badge, badgeVariants };
