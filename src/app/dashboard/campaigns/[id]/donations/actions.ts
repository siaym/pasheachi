"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function verifyOwnership(campaignId: string) {
  const user = await getCurrentUser();
  if (!user) return false;

  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId }
  });

  if (!campaign || campaign.creatorId !== user.id) {
    return false;
  }

  return true;
}

export async function verifyTransactionAction(transactionId: string, campaignId: string) {
  if (!(await verifyOwnership(campaignId))) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: "verified" }
    });

    revalidatePath(`/dashboard/campaigns/${campaignId}/donations`);
    revalidatePath(`/dashboard/campaigns/${campaignId}`);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to verify transaction" };
  }
}

export async function rejectTransactionAction(transactionId: string, campaignId: string) {
  if (!(await verifyOwnership(campaignId))) {
    return { error: "Unauthorized" };
  }

  try {
    // We can either update status to "rejected" or just delete it.
    // Let's delete it to keep it clean, or update status if we want a record.
    await prisma.transaction.delete({
      where: { id: transactionId }
    });

    revalidatePath(`/dashboard/campaigns/${campaignId}/donations`);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to reject transaction" };
  }
}

export async function addManualTransactionAction(formData: FormData) {
  const campaignId = formData.get("campaignId") as string;
  
  if (!(await verifyOwnership(campaignId))) {
    return { error: "Unauthorized" };
  }

  try {
    const donorName = (formData.get("donorName") as string) || "Anonymous";
    const phone = (formData.get("phone") as string) || "Cash";
    const amountStr = formData.get("amount") as string;
    
    const amount = parseFloat(amountStr);
    
    if (isNaN(amount) || amount <= 0) {
      return { error: "Invalid amount" };
    }

    await prisma.transaction.create({
      data: {
        campaignId,
        donorName,
        phone,
        amount,
        method: "cash",
        status: "verified", // Manual entries are verified automatically
      }
    });

    revalidatePath(`/dashboard/campaigns/${campaignId}/donations`);
    revalidatePath(`/dashboard/campaigns/${campaignId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add manual transaction:", error);
    return { error: error.message || "Failed to add manual transaction" };
  }
}
