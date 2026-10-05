"use server";

import { prisma } from "@/lib/prisma";

export async function submitDonationAction(formData: FormData) {
  try {
    const campaignId = formData.get("campaignId") as string;
    const donorName = (formData.get("donorName") as string) || "Anonymous";
    const phone = formData.get("phone") as string;
    const amountStr = formData.get("amount") as string;
    const method = formData.get("method") as string;
    const referenceId = formData.get("referenceId") as string || null;
    const message = formData.get("message") as string || null;

    if (!campaignId || !amountStr || !method || !phone) {
      return { error: "Missing required fields" };
    }

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
        method,
        referenceId,
        message,
        status: "pending",
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to submit donation:", error);
    return { error: error.message || "Failed to submit donation" };
  }
}
