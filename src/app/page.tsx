import { Hero } from "@/components/landing/hero";
import { LiveActivity } from "@/components/landing/live-activity";
import { FeaturedStories } from "@/components/landing/featured-stories";
import { PaperCategories } from "@/components/landing/paper-categories";
import { DonorCommunity } from "@/components/landing/donor-community";
import { LiveStats } from "@/components/landing/live-stats";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TrustSection } from "@/components/landing/trust-section";
import { SuccessStories } from "@/components/landing/success-stories";
import { FAQ } from "@/components/landing/faq";
import { Newsletter } from "@/components/landing/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LiveActivity />
      <FeaturedStories />
      <PaperCategories />
      <DonorCommunity />
      <LiveStats />
      <HowItWorks />
      <TrustSection />
      <SuccessStories />
      <FAQ />
      <Newsletter />
    </>
  );
}
