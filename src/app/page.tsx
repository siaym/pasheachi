import { Hero } from "@/components/landing/hero";
import { LiveStats } from "@/components/landing/live-stats";
import { Categories } from "@/components/landing/categories";
import { FeaturedCampaigns } from "@/components/landing/featured-campaigns";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TrustSection } from "@/components/landing/trust-section";
import { SuccessStories } from "@/components/landing/success-stories";
import { FAQ } from "@/components/landing/faq";
import { Newsletter } from "@/components/landing/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LiveStats />
      <Categories />
      <FeaturedCampaigns />
      <HowItWorks />
      <TrustSection />
      <SuccessStories />
      <FAQ />
      <Newsletter />
    </>
  );
}
