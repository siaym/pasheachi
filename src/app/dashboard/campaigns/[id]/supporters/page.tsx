import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { SupportersClient } from "./client";

export default async function CampaignSupportersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      transactions: {
        where: { status: "verified" },
        orderBy: { date: 'desc' }
      }
    }
  });

  if (!campaign) {
    notFound();
  }

  const supporters = campaign.transactions.map(trx => ({
    id: trx.id,
    name: trx.donorName || "Anonymous",
    amount: trx.amount,
    date: trx.date.toISOString(),
    avatar: trx.donorName ? trx.donorName.charAt(0).toUpperCase() : "?"
  }));

  return <SupportersClient supporters={supporters} />;
}
