import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { CategoryCard } from "@/components/campaign/category-card";
import { CATEGORIES } from "@/lib/constants";

export function Categories() {
  return (
    <section id="categories" className="py-16 sm:py-24 bg-slate-50/50 dark:bg-slate-900/30">
      <Container variant="wide">
        <SectionHeader
          badge="Browse Causes"
          title="Support What Matters Most"
          subtitle="Explore active campaigns across 13 diverse categories—from medical treatments to open source software."
          linkHref="/discover"
          linkText="Explore All Categories"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
