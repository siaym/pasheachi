import { Hero } from "@/components/landing/hero";
import { LiveActivity } from "@/components/landing/live-activity";
import { FeaturedStories } from "@/components/landing/featured-stories";
import { CommunityImpact } from "@/components/landing/community-impact";
import { PaperCategories } from "@/components/landing/paper-categories";
import { SuccessStories } from "@/components/landing/success-stories";
import { DonorCommunity } from "@/components/landing/donor-community";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TrustSection } from "@/components/landing/trust-section";
import { FAQ } from "@/components/landing/faq";
import { Newsletter } from "@/components/landing/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LiveActivity />
      <FeaturedStories />
      <CommunityImpact />
      <PaperCategories />
      <SuccessStories />
      <DonorCommunity />
      <HowItWorks />
      <TrustSection />
      <FAQ />
      <Newsletter />
    </>
  );
}
