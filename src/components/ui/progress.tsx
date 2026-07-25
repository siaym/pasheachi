"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 - 100
  size?: "sm" | "md" | "lg";
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, size = "md", ...props }, ref) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);

    const heightClasses = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-3.5",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",
          heightClasses[size],
          className
        )}
        {...props}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] transition-all duration-700 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
