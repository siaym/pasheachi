import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CampaignDetailClient } from "./client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ username: string; campaign: string }>;
}) {
  const { username, campaign: campaignSlug } = await params;
  const decodedUsername = decodeURIComponent(username);
  const cleanUsername = decodedUsername.replace(/^@/, "").toLowerCase();

  // Canonical URL redirection (e.g., /@siyam/test-3329 or /Siyam/test-3329 -> /siyam/test-3329)
  if (decodedUsername !== cleanUsername) {
    redirect(`/${cleanUsername}/${campaignSlug}`);
  }


  const campaign = await prisma.campaign.findFirst({
    where: { 
      slug: campaignSlug,
      status: { in: ["active", "completed"] },
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

