"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function BackgroundSystem() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Subtle parallax values for different layers to create depth
  const yLayer3 = useTransform(scrollY, [0, 2000], [0, 50]);
  const yLayer4 = useTransform(scrollY, [0, 2000], [0, 15]);
  const yLayer7 = useTransform(scrollY, [0, 2000], [0, -25]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      
      {/* LAYER 1: Warm handmade cotton paper is the body background color */}

      {/* LAYER 2: Paper fibers */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "multiply",
        }}
      />

      {/* LAYER 3: Blurred archival newspaper collage (visible mostly around edges) 
          UPDATED: extreme blur (40px) and lower opacity to make it completely atmospheric and unreadable */}
      <motion.div 
        className="absolute inset-[-10%] w-[120%] h-[120%] opacity-[0.03] grayscale blur-[40px] mix-blend-overlay"
        style={{
          y: yLayer3,
          backgroundImage: `url("https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2000&auto=format&fit=crop")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // Only reveal the newspaper slightly at the edges, keeping the center clean
          maskImage: "radial-gradient(ellipse at center, transparent 50%, black 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 50%, black 100%)",
        }}
      />

      {/* LAYER 4: Ink dust */}
      <motion.div 
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          y: yLayer4,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* LAYER 5: Paper grain & Layer 6: Soft radial lighting */}
      <div 
        className="absolute inset-0 opacity-100 mix-blend-soft-light"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 25%, rgba(168, 77, 42, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 85% 75%, rgba(53, 92, 82, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 10%, rgba(253, 248, 243, 0.8) 0%, transparent 80%)
          `
        }}
      />

      {/* LAYER 7: Very subtle paper folds */}
      <motion.div 
        className="absolute inset-[-10%] w-[120%] h-[120%] opacity-[0.02] mix-blend-multiply"
        style={{
          y: yLayer7,
          background: `linear-gradient(45deg, transparent 45%, #1D2927 49%, transparent 51%), linear-gradient(-45deg, transparent 45%, #1D2927 49%, transparent 51%)`,
          backgroundSize: "100vw 100vh",
        }}
      />

      {/* Vignette edge burn */}
      <div 
        className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(29,41,39,0.04)]" 
      />
    </div>
  );
}
