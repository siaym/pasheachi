"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function verifyCampaignAction(campaignId: string, newStatus: "approved" | "rejected", reason: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign) return { error: "Campaign not found" };

  const oldStatus = campaign.status;

  await prisma.campaign.update({
    where: { id: campaignId },
    data: { status: newStatus === "approved" ? "active" : "rejected" }
  });

  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role || "SuperAdmin",
      action: newStatus === "approved" ? "APPROVE_CAMPAIGN" : "REJECT_CAMPAIGN",
      resourceType: "Campaign",
      resourceId: campaignId,
      oldValue: oldStatus,
      newValue: newStatus,
      reason,
    }
  });

  return { success: true };
}

export async function verifyTransactionAction(transactionId: string, newStatus: "verified" | "rejected" | "flagged", reason: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const tx = await prisma.transaction.findUnique({ where: { id: transactionId } });
  if (!tx) return { error: "Transaction not found" };

  const oldStatus = tx.status;

  await prisma.transaction.update({
    where: { id: transactionId },
    data: { status: newStatus }
  });

  // If verifying, update campaign raised amount
  if (newStatus === "verified" && oldStatus === "pending") {
    await prisma.campaign.update({
      where: { id: tx.campaignId },
      data: { raisedAmount: { increment: tx.amount } }
    });
  }

  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role || "SuperAdmin",
      action: newStatus === "verified" ? "VERIFY_TRANSACTION" : newStatus === "rejected" ? "REJECT_TRANSACTION" : "FLAG_TRANSACTION",
      resourceType: "Transaction",
      resourceId: transactionId,
      oldValue: oldStatus,
      newValue: newStatus,
      reason,
    }
  });

  return { success: true };
}

export async function addAdminNoteAction(targetType: string, targetId: string, content: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const note = await prisma.adminNote.create({
    data: {
      targetType,
      targetId,
      content,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.role || "SuperAdmin",
    }
  });

  return { success: true, note };
}

export async function getAdminNotesAction(targetType: string, targetId: string) {
  const notes = await prisma.adminNote.findMany({
    where: { targetType, targetId },
    orderBy: { createdAt: "desc" },
  });
  return notes;
}

export async function toggleFeaturedCampaignAction(campaignId: string, isFeatured: boolean) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  await prisma.campaign.update({
    where: { id: campaignId },
    data: { isFeatured },
  });

  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role || "SuperAdmin",
      action: isFeatured ? "FEATURE_CAMPAIGN" : "UNFEATURE_CAMPAIGN",
      resourceType: "Campaign",
      resourceId: campaignId,
      newValue: isFeatured ? "featured" : "standard",
      reason: isFeatured ? "Featured story enabled for homepage showcase" : "Removed from featured stories",
    }
  });

  return { success: true };
}


export async function getAuditLogsAction(resourceType?: string, resourceId?: string) {
  const where: any = {};
  if (resourceType) where.resourceType = resourceType;
  if (resourceId) where.resourceId = resourceId;

  const logs = await prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return logs;
}
