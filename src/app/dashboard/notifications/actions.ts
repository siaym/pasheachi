"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function markNotificationReadAction(notificationId: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    const notif = await prisma.notification.findUnique({ where: { id: notificationId } });
    
    if (!notif || notif.userId !== user.id) {
      return { error: "Unauthorized" };
    }

    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });

    revalidatePath("/dashboard/notifications");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update notification" };
  }
}

export async function clearAllNotificationsAction() {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    await prisma.notification.deleteMany({
      where: { userId: user.id }
    });

    revalidatePath("/dashboard/notifications");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to clear notifications" };
  }
}
