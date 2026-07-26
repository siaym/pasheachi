import { Container } from "@/components/layout/container";
import { FadeIn, PaperLift, RevealText, InkDivider } from "@/components/ui/motion";
import { 
  Heart, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Mail, 
  MapPin,
  Paperclip
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 sm:pb-32 relative">
      <Container variant="wide" className="relative z-10">
        
        {/* Editorial Header */}
        <div className="mb-16 md:mb-24 max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#A84D2A] mb-6 flex items-center justify-center gap-2">
              <Heart className="h-4 w-4" />
              "পাশে আছি" — I'm Beside You
            </div>
          </FadeIn>
          
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-medium leading-[1.1] text-[#1D2927] mb-8">
            <RevealText>Empowering Every</RevealText>
            <RevealText>Bangladeshi to Reach</RevealText>
            <RevealText>Their Dreams</RevealText>
          </h1>
          
          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-[#53605C] max-w-3xl mx-auto leading-relaxed">
              PasheAchi was created to break down financial barriers. Whether it's urgent medical surgery, university tuition, travel, emergency relief, or open-source software—our mission is to connect dreamers with generous supporters across the nation.
            </p>
          </FadeIn>
        </div>

        <InkDivider className="mb-20" />

        {/* The 4 Pillars (Dossier Files) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24 max-w-5xl mx-auto">
          
          <FadeIn delay={0.1}>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-8 sm:p-10 shadow-paper relative h-full">
              <div className="absolute -top-3 -left-3 z-20 text-[#8C7A5B] rotate-[-15deg]">
                <Paperclip className="h-8 w-8 stroke-[1.5]" />
              </div>
              <div className="flex h-16 w-16 items-center justify-center border-2 border-dashed border-[#1D2927] rounded-full text-[#1D2927] mb-8">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="font-editorial text-3xl font-medium text-[#1D2927] mb-4">
                One Profile, Unlimited Campaigns
              </h3>
              <p className="text-base leading-relaxed text-[#53605C]">
                Every user receives a permanent address (<code className="bg-[#EAE5DB] px-2 py-0.5 font-mono text-sm text-[#1D2927]">pasheachi.bro.bd/username</code>) to build trust and showcase all past & active causes in one single, verified place.
              </p>
            </PaperLift>
          </FadeIn>

          <FadeIn delay={0.2}>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-8 sm:p-10 shadow-paper relative h-full">
              <div className="absolute -top-3 right-8 w-16 h-6 bg-[#EAE5DB] opacity-80 rotate-[2deg] z-20"></div>
              <div className="flex h-16 w-16 items-center justify-center border-2 border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] rounded-full mb-8">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="font-editorial text-3xl font-medium text-[#1D2927] mb-4">
                Manual Verification for Ultimate Trust
              </h3>
              <p className="text-base leading-relaxed text-[#53605C]">
                We enforce strict manual transaction matching against bKash, Nagad, and Rocket statements. Every single offline transfer is audited by a human, ensuring zero fraudulent claims on our platform.
              </p>
            </PaperLift>
          </FadeIn>

          <FadeIn delay={0.3}>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-8 sm:p-10 shadow-paper relative h-full">
              <div className="flex h-16 w-16 items-center justify-center border-2 border-dashed border-[#A84D2A] rounded-full text-[#A84D2A] mb-8">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-editorial text-3xl font-medium text-[#1D2927] mb-4">
                Inclusive Causes for All
              </h3>
              <p className="text-base leading-relaxed text-[#53605C]">
                PasheAchi is not just for charities or NGOs. Students, software developers, travelers, artists, and families can raise money for any honest goal. Your dreams are valid here.
              </p>
            </PaperLift>
          </FadeIn>

          <FadeIn delay={0.4}>
            <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-8 sm:p-10 shadow-paper relative h-full">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#EAE5DB] opacity-80 rotate-[-1deg] z-20"></div>
              <div className="flex h-16 w-16 items-center justify-center border-2 border-[#8C7A5B] rounded-full text-[#8C7A5B] mb-8">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-editorial text-3xl font-medium text-[#1D2927] mb-4">
                Mobile-First Bangladesh Design
              </h3>
              <p className="text-base leading-relaxed text-[#53605C]">
                Optimized for 4G mobile connections, low bandwidth, and 375px screens so anyone in Dhaka, Chittagong, Sylhet, or remote villages can participate effortlessly.
              </p>
            </PaperLift>
          </FadeIn>
        </div>

        {/* Contact Manifesto */}
        <FadeIn delay={0.5}>
          <div className="max-w-4xl mx-auto bg-[#1D2927] text-[#F7F4ED] p-10 sm:p-16 relative overflow-hidden shadow-ink">
            {/* Background texture */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            
            <div className="relative z-10 text-center space-y-8">
              <h2 className="font-editorial text-4xl sm:text-5xl">Partnerships & Press</h2>
              
              <p className="font-mono text-sm leading-relaxed text-[#D9D3C7] max-w-xl mx-auto">
                Our team is based in Dhaka, Bangladesh. We are actively looking for NGO partners, open-source contributors, and journalists who want to tell the story of a connected Bangladesh.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 font-mono text-xs font-bold uppercase tracking-widest text-[#F7F4ED] pt-8 border-t border-[#53605C]">
                <a href="mailto:support@pasheachi.bro.bd" className="flex items-center gap-3 hover:text-[#A84D2A] transition-colors">
                  <Mail className="h-5 w-5" /> support@pasheachi.bro.bd
                </a>
                <span className="hidden sm:inline text-[#53605C]">|</span>
                <span className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" /> Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
