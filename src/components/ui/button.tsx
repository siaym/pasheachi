import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A84D2A] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#1D2927] text-[#F7F4ED] hover:bg-[#121A19] shadow-sm hover:-translate-y-0.5 dark:bg-[#F7F4ED] dark:text-[#1D2927] dark:hover:bg-slate-200",
        accent:
          "bg-[#A84D2A] text-white hover:bg-[#843B20] shadow-sm hover:-translate-y-0.5",
        secondary:
          "border border-[#D9D3C7] bg-[#FAF7F0] text-[#1D2927] hover:bg-[#F3EFE6] hover:border-[#9B9488] dark:bg-[#1D2927] dark:border-slate-800 dark:text-[#F7F4ED] dark:hover:bg-slate-800",
        ghost:
          "text-[#1D2927] hover:bg-[#EAE5DB] hover:text-[#A84D2A] dark:text-[#F7F4ED] dark:hover:bg-slate-800",
        danger:
          "bg-red-800 text-white hover:bg-red-900 shadow-sm",
        outline:
          "border-2 border-[#1D2927] text-[#1D2927] hover:bg-[#1D2927] hover:text-white dark:border-[#F7F4ED] dark:text-[#F7F4ED]",
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
