import { Container } from "@/components/layout/container";
import { FadeIn, PaperLift, RevealText, InkDivider } from "@/components/ui/motion";
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Smartphone,
  Paperclip,
  Check
} from "lucide-react";

export default function TrustPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 sm:pb-32 relative">
      <Container variant="wide" className="relative z-10">
        
        {/* Editorial Header */}
        <div className="mb-16 md:mb-24 max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#1D2927] mb-6 flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Trust & Safety Audit
            </div>
          </FadeIn>
          
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-medium leading-[1.1] text-[#1D2927] mb-8">
            <RevealText>Bank-Grade Trust &</RevealText>
            <RevealText>Anti-Fraud Security</RevealText>
          </h1>
          
          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-[#53605C] max-w-3xl mx-auto leading-relaxed">
              How PasheAchi protects donors, verifies manual transactions, and ensures complete campaign transparency. Every transaction is a signed entry in our ledger.
            </p>
          </FadeIn>
        </div>

        <InkDivider className="mb-20" />

        {/* Protection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-8 h-full space-y-4 hover:border-[#1D2927] transition-colors relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#1D2927]"></div>
              <div className="flex h-12 w-12 items-center justify-center bg-[#EAE5DB] text-[#1D2927] mb-6 border border-[#D9D3C7]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-editorial text-2xl font-medium text-[#1D2927]">
                Manual Transaction Audit
              </h3>
              <p className="text-sm leading-relaxed text-[#53605C] font-mono">
                Every bKash, Nagad, and Rocket transfer is matched against daily provider statements before funds appear as verified on any campaign.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-8 h-full space-y-4 hover:border-[#1D2927] transition-colors relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#A84D2A]"></div>
              <div className="flex h-12 w-12 items-center justify-center bg-[#EAE5DB] text-[#A84D2A] mb-6 border border-[#D9D3C7]">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="font-editorial text-2xl font-medium text-[#1D2927]">
                Identity Verification
              </h3>
              <p className="text-sm leading-relaxed text-[#53605C] font-mono">
                Creators upload government-issued NID, Passport, Student ID, or NGO Registration papers before ever withdrawing funds.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-[#FAF8F3] border border-[#D9D3C7] p-8 h-full space-y-4 hover:border-[#1D2927] transition-colors relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#8C7A5B]"></div>
              <div className="flex h-12 w-12 items-center justify-center bg-[#EAE5DB] text-[#8C7A5B] mb-6 border border-[#D9D3C7]">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="font-editorial text-2xl font-medium text-[#1D2927]">
                Phone Verification
              </h3>
              <p className="text-sm leading-relaxed text-[#53605C] font-mono">
                Mandatory SMS verification for all registered users prevents spam, bots, and ghost accounts from interacting with campaigns.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Verification Levels (Dossier Layout) */}
        <FadeIn delay={0.4}>
          <div className="max-w-4xl mx-auto space-y-8 mb-24">
            <h2 className="font-editorial text-4xl text-[#1D2927] text-center mb-12">
              Clearance Levels
            </h2>

            <div className="space-y-4">
              {/* Level 1 */}
              <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#D9D3C7]"></div>
                <div className="flex items-center gap-6 pl-4">
                  <span className="font-editorial text-4xl text-[#D9D3C7]">L1</span>
                  <div>
                    <h4 className="font-bold text-[#1D2927] font-mono uppercase tracking-widest text-sm mb-1">Phone & Email Verified</h4>
                    <p className="text-xs font-mono text-[#53605C]">Basic clearance required for all accounts</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#53605C] px-3 py-1 bg-[#EAE5DB] border border-[#D9D3C7]">
                  <Check className="h-3 w-3" /> Cleared
                </div>
              </PaperLift>

              {/* Level 2 */}
              <PaperLift className="bg-[#FAF8F3] border-2 border-[#1D2927] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative shadow-paper">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#1D2927]"></div>
                <div className="flex items-center gap-6 pl-4">
                  <span className="font-editorial text-4xl text-[#1D2927]">L2</span>
                  <div>
                    <h4 className="font-bold text-[#1D2927] font-mono uppercase tracking-widest text-sm mb-1">NID / Passport Verified</h4>
                    <p className="text-xs font-mono text-[#53605C]">Government identity document checked and logged</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927] px-3 py-1 bg-[#EAE5DB] border border-[#1D2927]">
                  <CheckCircle2 className="h-3 w-3" /> Verified Creator
                </div>
              </PaperLift>

              {/* Level 3 */}
              <PaperLift className="bg-[#FAF8F3] border-2 border-[#A84D2A] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative shadow-paper">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#A84D2A]"></div>
                <div className="flex items-center gap-6 pl-4">
                  <span className="font-editorial text-4xl text-[#A84D2A]">L3</span>
                  <div>
                    <h4 className="font-bold text-[#1D2927] font-mono uppercase tracking-widest text-sm mb-1">NGO / Organization</h4>
                    <p className="text-xs font-mono text-[#53605C]">Official organizational registration audit passed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#A84D2A] px-3 py-1 bg-[#EAE5DB] border border-[#A84D2A]">
                  <CheckCircle2 className="h-3 w-3" /> Verified NGO
                </div>
              </PaperLift>
            </div>
          </div>
        </FadeIn>

        {/* Report Concern Callout */}
        <FadeIn delay={0.5}>
          <div className="max-w-4xl mx-auto bg-[#1D2927] text-[#F7F4ED] p-8 sm:p-10 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8 shadow-ink">
            {/* Decorative Tape */}
            <div className="absolute -top-3 right-1/4 w-16 h-6 bg-[#EAE5DB] opacity-80 rotate-[2deg] z-20"></div>

            <div className="space-y-3 z-10 relative">
              <h4 className="font-editorial text-3xl flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-[#A84D2A]" />
                <span>Suspect Fraud or Abuse?</span>
              </h4>
              <p className="font-mono text-xs leading-relaxed text-[#D9D3C7] max-w-lg">
                If you discover a suspicious campaign, report it immediately. Our safety team acts within 2 hours to freeze accounts and audit transactions.
              </p>
            </div>
            
            <a
              href="mailto:safety@pasheachi.bro.bd"
              className="shrink-0 h-12 px-8 bg-[#A84D2A] text-[#F7F4ED] font-bold text-xs uppercase tracking-widest flex items-center justify-center hover:bg-[#843B20] transition-colors z-10 relative shadow-paper"
            >
              File a Report
            </a>
          </div>
        </FadeIn>

      </Container>
    </div>
  );
}
