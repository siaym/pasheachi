"use client";

export function BackgroundSystem() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden aria-hidden">
      {/* LAYER 1: Warm paper lighting gradient (GPU accelerated) */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, rgba(168, 77, 42, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 85% 80%, rgba(53, 92, 82, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 0%, rgba(250, 248, 243, 0.9) 0%, transparent 75%)
          `
        }}
      />

      {/* LAYER 2: Subtle paper texture vignette */}
      <div 
        className="absolute inset-0 shadow-[inset_0_0_120px_rgba(29,41,39,0.03)]" 
      />
    </div>
  );
}

