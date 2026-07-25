import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C25E00] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#1E293B] text-[#FDFBF7] hover:bg-[#0F172A] shadow-md hover:-translate-y-0.5 dark:bg-[#FDFBF7] dark:text-[#1E293B] dark:hover:bg-slate-200",
        accent:
          "bg-[#C25E00] text-white hover:bg-[#A34E00] shadow-md hover:-translate-y-0.5",
        secondary:
          "border border-[#EADECC] bg-[#FFFFFF] text-[#1E293B] hover:bg-[#F4F0EA] hover:border-slate-300 dark:bg-[#1E293B] dark:border-slate-800 dark:text-[#FDFBF7] dark:hover:bg-slate-800",
        ghost:
          "text-[#1E293B] hover:bg-[#F4F0EA] dark:text-[#FDFBF7] dark:hover:bg-slate-800",
        danger:
          "bg-red-700 text-white hover:bg-red-800 shadow-sm",
        outline:
          "border-2 border-[#1E293B] text-[#1E293B] hover:bg-[#1E293B] hover:text-white dark:border-[#FDFBF7] dark:text-[#FDFBF7]",
      },
      size: {
        sm: "h-8 px-4 text-xs font-semibold",
        md: "h-10 px-5 text-sm font-semibold",
        lg: "h-12 px-6 text-base font-bold",
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
