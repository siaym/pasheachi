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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const latestCampaigns = await prisma.campaign.findMany({
    include: {
      creator: true,
      transactions: true,
    },
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  const featuredCampaign = (await prisma.campaign.findFirst({
    where: { isFeatured: true },
    include: {
      creator: true,
      transactions: true,
    },
    orderBy: { createdAt: "desc" },
  })) || latestCampaigns[0];

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

  const totalRaisedResult = await prisma.transaction.aggregate({
    where: { status: "verified" },
    _sum: { amount: true },
  });
  const totalSupportersCount = await prisma.transaction.count({
    where: { status: "verified" },
  });
  const totalCampaignsCount = await prisma.campaign.count();

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
      <SuccessStories campaigns={latestCampaigns} />
      <DonorCommunity />
      <HowItWorks />
      <TrustSection />
      <FAQ />
      <Newsletter />
    </>
  );
}


