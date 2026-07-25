"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { formatCompactNumber } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  isCompact?: boolean;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  isCompact = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000; // ms
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatted = isCompact
    ? formatCompactNumber(displayValue)
    : displayValue.toLocaleString("en-BD");

  return (
    <span ref={ref} className="font-extrabold tracking-tight">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
