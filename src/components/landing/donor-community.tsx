import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { Heart, ShieldCheck, Award, Users } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

const TOP_SUPPORTERS = [
  { name: "Arif Ahmed", count: "42 Dreams Supported", amount: "৳85,000", tag: "Community Hero" },
  { name: "Nusrat Jahan", count: "28 Dreams Supported", amount: "৳52,000", tag: "Returning Supporter" },
  { name: "Anonymous Donor", count: "19 Dreams Supported", amount: "৳45,000", tag: "Anonymous Hero" },
  { name: "Dr. Farhan Kabir", count: "15 Dreams Supported", amount: "৳38,000", tag: "Medical Patron" },
];

export function DonorCommunity() {
  return (
    <section className="py-16 sm:py-24 bg-[#F7F4ED] dark:bg-[#121A19]">
      <Container variant="wide">
        <SectionHeader
          badge="Donor Recognition"
          title="The Community Beside You"
          subtitle="Donating is not a transaction—it is an act of trust and human solidarity. We honor those who stand beside others."
          centered
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOP_SUPPORTERS.map((supporter, idx) => (
            <div key={idx} className="paper-card p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAE5DB] text-[#A84D2A] font-bold">
                  <Heart className="h-5 w-5 fill-[#A84D2A]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1D2927] dark:text-white">
                    {supporter.name}
                  </h4>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#355C52]">
                    {supporter.tag}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D9D3C7] dark:border-slate-800 space-y-1">
                <div className="text-xs font-semibold text-[#53605C]">
                  {supporter.count}
                </div>
                <div className="text-lg font-bold text-[#1D2927] dark:text-white">
                  {supporter.amount} contributed
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
