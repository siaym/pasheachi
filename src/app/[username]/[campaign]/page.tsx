import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CampaignDetailClient } from "./client";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ username: string; campaign: string }>;
}) {
  const { username, campaign: campaignSlug } = await params;
  const cleanUsername = username.replace(/^(@|%40)/, "").toLowerCase();

  const campaign = await prisma.campaign.findFirst({
    where: { 
      slug: campaignSlug,
      creator: { username: cleanUsername }
    },
    include: {
      creator: true,
      transactions: true
    }
  });

  if (!campaign) {
    notFound();
  }

  return (
    <CampaignDetailClient 
      campaign={campaign as any} 
      creator={campaign.creator as any} 
    />
  );
}
