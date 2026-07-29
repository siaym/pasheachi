"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateWithdrawalAccountsAction(payload: {
  bkashNumber?: string;
  nagadNumber?: string;
  bankDetails?: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        bkashNumber: payload.bkashNumber || null,
        nagadNumber: payload.nagadNumber || null,
        bankDetails: payload.bankDetails || null,
      }
    });

    revalidatePath("/dashboard/profile");
    return { success: true, user: updated };
  } catch (err: any) {
    return { error: err.message || "Failed to update withdrawal accounts" };
  }
}
