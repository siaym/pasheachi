import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { UpdatesClient } from "./client";

export default async function CampaignUpdatesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      updates: {
        orderBy: { date: 'desc' }
      }
    }
  });

  if (!campaign) {
    notFound();
  }

  return <UpdatesClient updates={campaign.updates as any} campaignId={id} />;
}
