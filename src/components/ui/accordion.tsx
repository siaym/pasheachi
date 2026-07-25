"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
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
    <div className="border-b border-[#D9D3C7] py-4 transition-colors">
      <button
        type="button"
        className="flex w-full items-center justify-between py-2 text-left transition-all hover:text-[#A84D2A] text-[#1D2927] group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-editorial text-xl sm:text-2xl transition-colors">
          {question}
        </span>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1D2927] group-hover:border-[#A84D2A] group-hover:bg-[#FAF8F3] transition-all duration-300">
          {isOpen ? (
            <Minus className="h-4 w-4 text-[#A84D2A]" />
          ) : (
            <Plus className="h-4 w-4 text-[#1D2927] group-hover:text-[#A84D2A]" />
          )}
        </div>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100 pt-4 pb-2" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden text-sm sm:text-base leading-relaxed text-[#53605C] font-mono pr-10">
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
    <div className={cn("w-full divide-y divide-[#D9D3C7]", className)}>
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
