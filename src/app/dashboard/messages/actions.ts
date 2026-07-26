"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function markMessageReadAction(messageId: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    const message = await prisma.message.findUnique({ where: { id: messageId } });
    
    if (!message || message.recipientId !== user.id) {
      return { error: "Unauthorized" };
    }

    await prisma.message.update({
      where: { id: messageId },
      data: { isRead: true }
    });

    revalidatePath("/dashboard/messages");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update message" };
  }
}

export async function deleteMessageAction(messageId: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    const message = await prisma.message.findUnique({ where: { id: messageId } });
    
    if (!message || message.recipientId !== user.id) {
      return { error: "Unauthorized" };
    }

    await prisma.message.delete({
      where: { id: messageId }
    });

    revalidatePath("/dashboard/messages");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete message" };
  }
}
