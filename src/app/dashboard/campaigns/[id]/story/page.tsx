import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { StoryEditClient } from "./client";

export default async function CampaignStoryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  const campaign = await prisma.campaign.findFirst({
    where: {
      id,
      creatorId: user.id,
    },
  });

  if (!campaign) {
    notFound();
  }

  return <StoryEditClient campaign={campaign} />;
}
