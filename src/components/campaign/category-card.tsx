"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  // Dynamically grab Lucide Icon component or fallback
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    category.iconName
  ] || Icons.Heart;

  return (
    <Link
      href={`/discover?category=${category.slug}`}
      className={cn(
        "group flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700",
        className
      )}
    >
      <div
        className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: category.bgLight, color: category.textColor }}
      >
        <IconComponent className="h-7 w-7" />
      </div>

      <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-[#10B981] dark:text-slate-100">
        {category.name}
      </h3>
      <span className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
        {category.activeCount} active
      </span>
    </Link>
  );
}
