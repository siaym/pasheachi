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

export const revalidate = 10;

export default async function HomePage() {
  const [
    latestCampaigns,
    featuredCampaignDb,
    recentTransactions,
    totalRaisedResult,
    totalSupportersCount,
    totalCampaignsCount,
    completedCampaigns,
  ] = await Promise.all([
    prisma.campaign.findMany({
      include: { creator: true, transactions: true },
      take: 10,
      orderBy: { createdAt: "desc" },
    }),
    prisma.campaign.findFirst({
      where: { isFeatured: true },
      include: { creator: true, transactions: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.transaction.findMany({
      where: { status: "verified" },
      include: { campaign: true },
      take: 10,
      orderBy: { date: "desc" },
    }),
    prisma.transaction.aggregate({
      where: { status: "verified" },
      _sum: { amount: true },
    }),
    prisma.transaction.count({
      where: { status: "verified" },
    }),
    prisma.campaign.count(),
    prisma.campaign.findMany({
      where: { status: "completed" },
      include: { creator: true, transactions: true },
      take: 10,
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const featuredCampaign = featuredCampaignDb || latestCampaigns[0];

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

  const liveStats = {
    totalRaised: totalRaisedResult._sum.amount || 0,
    totalSupporters: totalSupportersCount || 0,
    totalCampaigns: totalCampaignsCount || 0,
    successRate: 100,
  };

  return (
    <>
      <Hero campaign={featuredCampaign} />
      <LiveActivity transactions={formattedTransactions} />
      <FeaturedStories campaigns={latestCampaigns} />
      <CommunityImpact stats={liveStats} />
      <PaperCategories />
      <SuccessStories campaigns={completedCampaigns} />
      <DonorCommunity />
      <HowItWorks />
      <TrustSection />
      <FAQ />
      <Newsletter />
    </>
  );
}


