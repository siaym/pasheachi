"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateCampaignStoryAction(
  campaignId: string,
  description: string,
  coverImageUrl?: string
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { creator: true }
    });

    if (!campaign || campaign.creatorId !== user.id) {
      return { success: false, error: "Campaign not found or access denied." };
    }

    const updatedData: any = { description };
    if (coverImageUrl) {
      updatedData.coverImageUrl = coverImageUrl;
    }

    const updated = await prisma.campaign.update({
      where: { id: campaignId },
      data: updatedData,
    });

    revalidatePath(`/${campaign.creator.username}/${campaign.slug}`);
    revalidatePath(`/dashboard/campaigns/${campaignId}/story`);
    revalidatePath("/dashboard");

    return { success: true, campaign: updated };
  } catch (error: any) {
    console.error("Failed to update campaign story:", error);
    return { success: false, error: error.message || "Failed to update story" };
  }
}

export async function updateProfilePageAction(
  name: string,
  bio: string,
  avatarUrl?: string,
  coverUrl?: string
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        bio,
        avatarUrl: avatarUrl || user.avatarUrl,
        coverUrl: coverUrl || user.coverUrl,
      },
    });

    revalidatePath(`/${user.username}`);
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");

    return { success: true, user: updated };
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    return { success: false, error: error.message || "Failed to update profile" };
  }
}
