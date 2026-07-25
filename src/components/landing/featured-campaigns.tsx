import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { MOCK_CAMPAIGNS } from "@/data/mock";

export function FeaturedCampaigns() {
  const featured = MOCK_CAMPAIGNS.filter((c) => c.isFeatured).slice(0, 4);

  return (
    <section className="py-16 sm:py-24">
      <Container variant="wide">
        <SectionHeader
          badge="Featured Causes"
          title="Urgent & Inspiring Dreams"
          subtitle="Discover verified campaigns needing your support today to make a real-world difference."
          linkHref="/discover"
          linkText="View All Campaigns"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featured.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </Container>
    </section>
  );
}
