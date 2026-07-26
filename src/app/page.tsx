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

import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const campaigns = await prisma.campaign.findMany({
    include: {
      creator: true,
      transactions: true,
    },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  const recentTransactions = await prisma.transaction.findMany({
    where: { status: "verified" },
    include: { campaign: true },
    take: 10,
    orderBy: { date: "desc" },
  });

  const formattedTransactions = recentTransactions.map(t => {
    const diffInMinutes = Math.floor((new Date().getTime() - new Date(t.date).getTime()) / 60000);
    const timeString = diffInMinutes < 60 ? `${diffInMinutes} mins ago` : `${Math.floor(diffInMinutes / 60)} hours ago`;
    
    return {
      donorName: t.donorName,
      isAnonymous: t.donorName.toLowerCase() === 'anonymous' || t.donorName === '',
      amount: t.amount,
      campaignTitle: t.campaign.title,
      date: timeString,
    };
  });

  return (
    <>
      <Hero />
      <LiveActivity transactions={formattedTransactions} />
      <FeaturedStories campaigns={campaigns} />
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
