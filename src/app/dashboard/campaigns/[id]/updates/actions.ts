"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addUpdate(campaignId: string, title: string, content: string) {
  try {
    const update = await prisma.update.create({
      data: {
        title,
        content,
        campaignId,
      }
    });

    revalidatePath(`/dashboard/campaigns/${campaignId}/updates`);
    revalidatePath(`/[username]/[campaign]`); // Assuming this is needed too if public page shows updates
    return { success: true, update };
  } catch (error) {
    console.error("Failed to add update:", error);
    return { success: false, error: "Failed to add update" };
  }
}
