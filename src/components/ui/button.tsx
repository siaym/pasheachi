import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#10B981] text-white hover:bg-[#059669] shadow-md hover:shadow-glow-green hover:-translate-y-0.5",
        secondary:
          "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800",
        ghost:
          "text-[#10B981] hover:bg-[#ECFDF5] dark:hover:bg-[#10B981]/10",
        danger:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-red-500/20",
        outline:
          "border-2 border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white",
      },
      size: {
        sm: "h-8 px-4 text-xs font-semibold",
        md: "h-10 px-5 text-sm font-semibold",
        lg: "h-12 px-6 text-base font-semibold",
        xl: "h-14 px-8 text-lg font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
