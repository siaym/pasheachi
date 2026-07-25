import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";

export function PaperCategories() {
  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#FAF7F0] dark:bg-[#182220]">
      <Container variant="wide">
        <SectionHeader
          badge="Browse by Intent"
          title="Where Support Moves Lives"
          subtitle="From life-saving medical emergencies to educational tuition and open-source software, every category represents someone's goal."
          centered
        />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/discover?category=${cat.slug}`}
              className="paper-card p-5 flex flex-col justify-between group hover:border-[#A84D2A]"
            >
              <div>
                <span className="eyebrow mb-2">{cat.activeCount} ACTIVE</span>
                <h3 className="text-lg font-bold text-[#1D2927] group-hover:text-[#A84D2A] transition-colors dark:text-white">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-[#53605C] dark:text-slate-400 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D9D3C7] dark:border-slate-800 text-[11px] font-semibold text-[#A84D2A] flex items-center justify-between">
                <span>Explore Stories</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
