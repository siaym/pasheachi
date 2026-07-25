"use client";

import { Container } from "@/components/layout/container";
import { FadeIn, RevealText } from "@/components/ui/motion";

export function DonorCommunity() {
  // A collage of community faces
  const faces = [
    { id: 1, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80", x: "10%", y: "20%", delay: 0.1 },
    { id: 2, src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80", x: "70%", y: "15%", delay: 0.3 },
    { id: 3, src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80", x: "85%", y: "60%", delay: 0.2 },
    { id: 4, src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80", x: "15%", y: "70%", delay: 0.4 },
    { id: 5, src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&q=80", x: "30%", y: "10%", delay: 0.5 },
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden border-b border-[#D9D3C7]">
      <Container variant="wide" className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <FadeIn>
            <div className="editorial-stamp mb-8">
              The People Beside You
            </div>
          </FadeIn>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-[#1D2927] max-w-2xl">
            <RevealText>A community of strangers,</RevealText>
            <RevealText><span className="italic text-[#8C7A5B] font-light">standing together</span></RevealText>
            <RevealText>when it matters most.</RevealText>
          </h2>
          <FadeIn delay={0.3}>
            <p className="mt-8 text-lg text-[#53605C] max-w-xl font-medium">
              Over 24,000 individuals have chosen to look beyond themselves to support a neighbor&apos;s dream, health, or education.
            </p>
          </FadeIn>
        </div>
      </Container>

      {/* Floating Portraits */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply filter grayscale">
        {faces.map((face) => (
          <FadeIn
            key={face.id}
            delay={face.delay}
            className="absolute rounded-full overflow-hidden border border-[#1D2927]"
            style={{ 
              left: face.x, 
              top: face.y, 
              width: "80px", 
              height: "80px" 
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={face.src} alt="Community Member" className="w-full h-full object-cover" />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
