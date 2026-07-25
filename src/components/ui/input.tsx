import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            "flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-4 focus:ring-[#10B981]/15 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#10B981]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/15",
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
