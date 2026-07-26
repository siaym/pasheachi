import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DonationsClient } from "./client";

export default async function CampaignDonationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      transactions: {
        orderBy: { date: 'desc' }
      }
    }
  });

  if (!campaign) {
    notFound();
  }

  return (
    <DonationsClient 
      initialTransactions={campaign.transactions as any} 
      campaignId={id} 
    />
  );
}
