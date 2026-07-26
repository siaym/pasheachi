import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { WithdrawalsClient } from "./client";

export default async function CampaignWithdrawalsPage({
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

  // Calculate available balance (mock withdrawal logic: 90% of verified raised minus any existing mock withdrawals)
  const availableBalance = campaign.raisedAmount; 

  return (
    <WithdrawalsClient 
      availableBalance={availableBalance} 
      bkash={campaign.bkashNumber || undefined}
      nagad={campaign.nagadNumber || undefined}
      bankDetails={campaign.bankDetails || undefined}
    />
  );
}
