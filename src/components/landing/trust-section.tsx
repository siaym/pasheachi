import { CheckCircle2, ShieldCheck, Smartphone, Building2 } from "lucide-react";
import { Container } from "@/components/layout/container";

const safeguards = [
  { icon: Smartphone, title: "Payment review", description: "Every manual bKash, Nagad and Rocket transfer is checked against its transaction record." },
  { icon: ShieldCheck, title: "Identity review", description: "Campaign owners build a visible, permanent reputation with verified identity details." },
  { icon: Building2, title: "Payout controls", description: "Clear withdrawal steps and an audit trail make funds easy to understand." },
];

export function TrustSection() {
  return <section className="bg-[#1D2927] py-16 text-[#FFFDF8] sm:py-24"><Container variant="wide"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-[#DAB29E]">Trust is the product</p><h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">Clear enough to trust with someone&apos;s story.</h2><p className="mt-6 max-w-md text-sm leading-7 text-[#C2CBC4]">PasheAchi is designed for the moments when money needs to move with care. We explain what is checked, who is responsible, and what happens next.</p><div className="mt-8 space-y-3 text-sm text-[#DCE1D9]"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#DAB29E]" />Manual transaction review</span><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#DAB29E]" />Visible campaign identity</span></div></div><div className="divide-y divide-[#53605C] border-y border-[#53605C]">{safeguards.map(({ icon: Icon, title, description }) => <div key={title} className="flex gap-5 py-6"><Icon className="mt-1 h-5 w-5 shrink-0 text-[#DAB29E]" /><div><h3 className="text-xl font-bold">{title}</h3><p className="mt-2 max-w-lg text-sm leading-6 text-[#C2CBC4]">{description}</p></div></div>)}</div></div></Container></section>;
}
