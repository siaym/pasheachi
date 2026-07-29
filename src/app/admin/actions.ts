"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
  revalidatePath("/discover", "layout");

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

  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
  revalidatePath("/discover", "layout");
  if (updatedCampaign.creator?.username && updatedCampaign.slug) {
    const uName = updatedCampaign.creator.username.toLowerCase();
    revalidatePath(`/${uName}/${updatedCampaign.slug}`, "layout");
    revalidatePath(`/${uName}/${updatedCampaign.slug}`, "page");
    revalidatePath(`/${updatedCampaign.creator.username}/${updatedCampaign.slug}`, "layout");
    revalidatePath(`/${updatedCampaign.creator.username}/${updatedCampaign.slug}`, "page");
  }

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
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const updated = await prisma.campaign.update({
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

    revalidatePath("/", "layout");
    revalidatePath("/admin", "layout");
    revalidatePath("/discover", "layout");
    revalidatePath("/", "page");
    revalidatePath("/admin", "page");
    revalidatePath("/discover", "page");

    return { success: true, campaign: updated };
  } catch (err: any) {
    console.error("Error toggling featured campaign:", err);
    return { error: err.message || "Failed to update featured status" };
  }
}

export async function toggleSuccessStoryAction(campaignId: string, isCompleted: boolean) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const updated = await prisma.campaign.update({
      where: { id: campaignId },
      data: { status: isCompleted ? "completed" : "active" }
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role || "SuperAdmin",
        action: isCompleted ? "MARK_SUCCESS_STORY" : "UNMARK_SUCCESS_STORY",
        resourceType: "Campaign",
        resourceId: campaignId,
        newValue: isCompleted ? "completed" : "active",
        reason: isCompleted ? "Marked as completed Success Story for homepage slider" : "Reverted to active status",
      }
    });

    revalidatePath("/", "layout");
    revalidatePath("/admin", "layout");
    revalidatePath("/", "page");
    revalidatePath("/admin", "page");

    return { success: true, campaign: updated };
  } catch (err: any) {
    console.error("Error toggling success story:", err);
    return { error: err.message || "Failed to update success story status" };
  }
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

// === USER MODERATION ACTIONS ===
export async function banUserAction(userId: string, isPermanent: boolean, banDurationDays: number | null, reason: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const expiresAt = isPermanent ? null : new Date(Date.now() + (banDurationDays || 7) * 24 * 60 * 60 * 1000);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: "banned",
        banReason: reason,
        banExpiresAt: expiresAt,
      }
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role || "SuperAdmin",
        action: "BAN_USER",
        resourceType: "User",
        resourceId: userId,
        newValue: `banned_${isPermanent ? 'permanent' : `${banDurationDays}days`}`,
        reason,
      }
    });

    await prisma.notification.create({
      data: {
        userId,
        type: "ACCOUNT_SUSPENDED",
        message: `Your account has been ${isPermanent ? 'permanently banned' : `suspended for ${banDurationDays} days`}. Reason: ${reason}`,
      }
    });

    revalidatePath("/admin", "layout");
    return { success: true, user: updatedUser };
  } catch (err: any) {
    return { error: err.message || "Failed to ban user" };
  }
}

export async function unbanUserAction(userId: string, reason: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: "active",
        banReason: null,
        banExpiresAt: null,
      }
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role || "SuperAdmin",
        action: "UNBAN_USER",
        resourceType: "User",
        resourceId: userId,
        newValue: "active",
        reason,
      }
    });

    revalidatePath("/admin", "layout");
    return { success: true, user: updatedUser };
  } catch (err: any) {
    return { error: err.message || "Failed to unban user" };
  }
}

export async function hardDeleteUserAction(userId: string, reason: string) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "SuperAdmin") return { error: "Forbidden: Super Admin privilege required for hard deletion." };

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role,
        action: "HARD_DELETE_USER",
        resourceType: "User",
        resourceId: userId,
        reason,
      }
    });

    await prisma.user.delete({
      where: { id: userId }
    });

    revalidatePath("/admin", "layout");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to hard delete user" };
  }
}

// === CAMPAIGN LIFECYCLE & HARD DELETE ===
export async function pauseCampaignAction(campaignId: string, reason: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const updated = await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        status: "paused",
        pausedAt: new Date(),
      }
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role || "SuperAdmin",
        action: "PAUSE_CAMPAIGN",
        resourceType: "Campaign",
        resourceId: campaignId,
        newValue: "paused",
        reason,
      }
    });

    revalidatePath("/admin", "layout");
    revalidatePath("/", "layout");
    return { success: true, campaign: updated };
  } catch (err: any) {
    return { error: err.message || "Failed to pause campaign" };
  }
}

export async function resumeCampaignAction(campaignId: string, reason: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const updated = await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        status: "active",
        pausedAt: null,
      }
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role || "SuperAdmin",
        action: "RESUME_CAMPAIGN",
        resourceType: "Campaign",
        resourceId: campaignId,
        newValue: "active",
        reason,
      }
    });

    revalidatePath("/admin", "layout");
    revalidatePath("/", "layout");
    return { success: true, campaign: updated };
  } catch (err: any) {
    return { error: err.message || "Failed to resume campaign" };
  }
}

export async function softDeleteCampaignAction(campaignId: string, reason: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const updated = await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        status: "archived",
        deletedAt: new Date(),
      }
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role || "SuperAdmin",
        action: "SOFT_DELETE_CAMPAIGN",
        resourceType: "Campaign",
        resourceId: campaignId,
        newValue: "archived",
        reason,
      }
    });

    revalidatePath("/admin", "layout");
    revalidatePath("/", "layout");
    return { success: true, campaign: updated };
  } catch (err: any) {
    return { error: err.message || "Failed to soft delete campaign" };
  }
}

export async function hardDeleteCampaignAction(campaignId: string, reason: string) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "SuperAdmin") return { error: "Forbidden: Super Admin privilege required for permanent hard deletion." };

    // Record final audit log before cascade delete
    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role,
        action: "HARD_DELETE_CAMPAIGN",
        resourceType: "Campaign",
        resourceId: campaignId,
        reason,
      }
    });

    // Cascade delete campaign and all related items
    await prisma.campaign.delete({
      where: { id: campaignId }
    });

    revalidatePath("/admin", "layout");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to hard delete campaign" };
  }
}

// === VERIFICATION SETTINGS ===
export async function getVerificationSettingsAction() {
  let settings = await prisma.verificationSettings.findUnique({ where: { id: "default" } });
  if (!settings) {
    settings = await prisma.verificationSettings.create({
      data: { id: "default" }
    });
  }
  return settings;
}

export async function updateVerificationSettingsAction(data: Record<string, boolean>) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "SuperAdmin") return { error: "Forbidden: Super Admin privilege required." };

    const updated = await prisma.verificationSettings.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data }
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role,
        action: "UPDATE_VERIFICATION_SETTINGS",
        resourceType: "PlatformSettings",
        resourceId: "default",
        reason: "Updated required verification document settings",
      }
    });

    revalidatePath("/admin", "layout");
    return { success: true, settings: updated };
  } catch (err: any) {
    return { error: err.message || "Failed to update verification settings" };
  }
}

// === EMAIL CENTER ACTIONS ===
export async function sendManualEmailAction(payload: {
  recipientType: string;
  customEmail?: string;
  subject: string;
  body: string;
  templateName?: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Unauthorized" };

    let recipientEmails: string[] = [];

    if (payload.recipientType === "single" && payload.customEmail) {
      recipientEmails = [payload.customEmail];
    } else if (payload.recipientType === "all_creators") {
      const creators = await prisma.user.findMany({
        where: { campaigns: { some: {} } },
        select: { email: true }
      });
      recipientEmails = creators.map(c => c.email).filter(Boolean) as string[];
    } else if (payload.recipientType === "all_donors") {
      const donors = await prisma.user.findMany({ select: { email: true } });
      recipientEmails = donors.map(d => d.email).filter(Boolean) as string[];
    } else {
      recipientEmails = [payload.customEmail || "user@example.com"];
    }

    // Persist email logs
    for (const email of recipientEmails) {
      await prisma.emailLog.create({
        data: {
          recipientEmail: email,
          recipientName: email.split("@")[0],
          subject: payload.subject,
          body: payload.body,
          templateName: payload.templateName || "Custom Email",
          status: "sent",
          senderId: user.id,
        }
      });
    }

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role || "SuperAdmin",
        action: "SEND_MANUAL_EMAIL",
        resourceType: "EmailCenter",
        resourceId: payload.recipientType,
        reason: `Dispatched email '${payload.subject}' to ${recipientEmails.length} recipients`,
      }
    });

    revalidatePath("/admin", "layout");
    return { success: true, count: recipientEmails.length };
  } catch (err: any) {
    return { error: err.message || "Failed to send email" };
  }
}

export async function getEmailLogsAction() {
  const logs = await prisma.emailLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return logs;
}

// === FEATURE FLAGS ===
export async function getFeatureFlagsAction() {
  const flags = await prisma.featureFlag.findMany();
  return flags;
}

export async function toggleFeatureFlagAction(key: string, enabled: boolean) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "SuperAdmin") return { error: "Forbidden: Super Admin privilege required." };

    const flag = await prisma.featureFlag.upsert({
      where: { key },
      update: { enabled },
      create: { id: key, key, enabled, description: `Controls ${key} system functionality` }
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role,
        action: enabled ? "ENABLE_FEATURE_FLAG" : "DISABLE_FEATURE_FLAG",
        resourceType: "FeatureFlag",
        resourceId: key,
        newValue: enabled ? "enabled" : "disabled",
      }
    });

    revalidatePath("/admin", "layout");
    return { success: true, flag };
  } catch (err: any) {
    return { error: err.message || "Failed to toggle feature flag" };
  }
}

// === GLOBAL SEARCH ===
export async function globalSearchAction(query: string) {
  if (!query || query.trim().length === 0) {
    return { campaigns: [], users: [], transactions: [], withdrawals: [] };
  }

  const q = query.trim();

  const [campaigns, users, transactions, withdrawals] = await Promise.all([
    prisma.campaign.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { category: { contains: q } },
          { id: { contains: q } },
        ]
      },
      take: 10,
    }),
    prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          { username: { contains: q } },
          { email: { contains: q } },
        ]
      },
      take: 10,
    }),
    prisma.transaction.findMany({
      where: {
        OR: [
          { donorName: { contains: q } },
          { phone: { contains: q } },
          { referenceId: { contains: q } },
          { id: { contains: q } },
        ]
      },
      take: 10,
    }),
    prisma.withdrawal.findMany({
      where: {
        OR: [
          { accountDetails: { contains: q } },
          { id: { contains: q } },
        ]
      },
      take: 10,
    }),
  ]);

  return { campaigns, users, transactions, withdrawals };
}
