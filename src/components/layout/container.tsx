import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "content" | "standard" | "wide" | "full";
}

const variantClasses = {
  content: "max-w-3xl",
  standard: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-[1440px]",
};

export function Container({
  className,
  variant = "wide",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
