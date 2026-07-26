"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

function generateSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  
  // Append a short random string to ensure uniqueness
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${baseSlug}-${randomSuffix}`;
}

export async function createCampaignAction(formData: FormData) {
  const user = await getCurrentUser();
  
  if (!user) {
    return { error: "You must be logged in to create a campaign." };
  }

  try {
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const category = formData.get("category") as string;
    const campaignType = formData.get("campaignType") as string;
    const story = formData.get("story") as string;
    
    // Numbers and calculation
    const goalAmountRaw = formData.get("goalAmount") as string;
    const fixedAmountRaw = formData.get("fixedAmount") as string;
    const targetParticipantsRaw = formData.get("targetParticipants") as string;
    
    let goalAmount = 0;
    let fixedAmount = null;
    let targetParticipants = null;

    if (campaignType === "fixed") {
      fixedAmount = parseFloat(fixedAmountRaw) || 0;
      targetParticipants = parseInt(targetParticipantsRaw) || 0;
      goalAmount = fixedAmount * targetParticipants;
    } else {
      goalAmount = parseFloat(goalAmountRaw) || 0;
    }

    // Payment Info
    const bkashNumber = formData.get("bkashNumber") as string || null;
    const nagadNumber = formData.get("nagadNumber") as string || null;
    const bankDetails = formData.get("bankDetails") as string || null;

    if (!bkashNumber && !nagadNumber && !bankDetails) {
      return { error: "You must provide at least one payment method." };
    }

    // Mock Image URL for MVP
    const coverImageUrl = "https://images.unsplash.com/photo-1593113565694-c6aa1b50ba0b?q=80&w=2000&auto=format&fit=crop";

    const slug = generateSlug(title);

    const campaign = await prisma.campaign.create({
      data: {
        slug,
        title,
        subtitle,
        category,
        location: user.location || "Bangladesh", // Fallback location
        description: story,
        coverImageUrl,
        goalAmount,
        campaignType,
        fixedAmount,
        targetParticipants,
        bkashNumber,
        nagadNumber,
        bankDetails,
        creatorId: user.id,
        status: "active", // In a real app, this might be "pending"
      }
    });

    return { success: true, campaignId: campaign.id };
  } catch (error: any) {
    console.error("Failed to create campaign:", error);
    return { error: error.message || "Failed to create campaign" };
  }
}
