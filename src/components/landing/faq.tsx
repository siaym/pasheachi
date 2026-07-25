import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { Accordion } from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/50 dark:bg-slate-900/30">
      <Container variant="content">
        <SectionHeader
          badge="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about starting a campaign, manual verification, fees, and safety."
          centered
        />

        <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </Container>
    </section>
  );
}
