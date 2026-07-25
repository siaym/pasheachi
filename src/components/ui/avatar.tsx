import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const sizeClasses = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
  "2xl": "h-28 w-28 text-3xl",
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = "md", ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const getInitials = (n?: string) => {
      if (!n) return "P";
      const parts = n.trim().split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return n.substring(0, 2).toUpperCase();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold shadow-sm ring-2 ring-white dark:ring-slate-900",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || name || "Avatar"}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-[#10B981] to-[#4F46E5] text-white">
            {getInitials(name)}
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";
