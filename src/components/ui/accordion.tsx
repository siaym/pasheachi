"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({
  question,
  answer,
  isOpen = false,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-slate-200 py-4 transition-colors dark:border-slate-800">
      <button
        type="button"
        className="flex w-full items-center justify-between py-2 text-left font-semibold text-slate-900 transition-all hover:text-[#10B981] dark:text-slate-100"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300",
            isOpen && "rotate-180 text-[#10B981]"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100 pt-2" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {answer}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { id: string; question: string; answer: string }[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id || null);

  return (
    <div className={cn("w-full divide-y divide-slate-200 dark:divide-slate-800", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}
