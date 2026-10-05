"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function verifyTransactionAsCreatorAction(transactionId: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const tx = await prisma.transaction.findUnique({ 
    where: { id: transactionId },
    include: { campaign: true }
  });

  if (!tx) return { error: "Transaction not found" };

  if (tx.campaign.creatorId !== user.id) {
    return { error: "You can only verify transactions for your own campaigns" };
  }

  await prisma.transaction.update({
    where: { id: transactionId },
    data: { status: "verified" }
  });

  // Recalculate exact total raised amount for campaign from all verified transactions
  const verifiedSum = await prisma.transaction.aggregate({
    where: { campaignId: tx.campaignId, status: "verified" },
    _sum: { amount: true }
  });

  const updatedCampaign = await prisma.campaign.update({
    where: { id: tx.campaignId },
    data: { raisedAmount: verifiedSum._sum.amount || 0 },
    include: { creator: true }
  });

  revalidatePath("/", "layout");
  revalidatePath("/dashboard", "layout");
  revalidatePath("/discover", "layout");
  
  if (updatedCampaign.creator?.username && updatedCampaign.slug) {
    const uName = updatedCampaign.creator.username.toLowerCase();
    revalidatePath(`/${uName}/${updatedCampaign.slug}`, "layout");
    revalidatePath(`/${uName}/${updatedCampaign.slug}`, "page");
  }

  return { success: true };
}
