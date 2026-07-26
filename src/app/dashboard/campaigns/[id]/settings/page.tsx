import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { SettingsClient } from "./client";

export default async function CampaignSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
  });

  if (!campaign) {
    notFound();
  }

  return <SettingsClient campaign={campaign} />;
}
