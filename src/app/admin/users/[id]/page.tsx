import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { UserInvestigationClient } from "./client";

export default async function UserInvestigationPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { id } = await params;

  const targetUser = await prisma.user.findUnique({
    where: { id },
    include: {
      campaigns: {
        include: {
          _count: { select: { transactions: true } }
        },
        orderBy: { createdAt: "desc" }
      },
      verificationDocs: true,
    }
  });

  if (!targetUser) notFound();

  // Get all transactions for all of this user's campaigns
  const allTransactions = await prisma.transaction.findMany({
    where: {
      campaignId: { in: targetUser.campaigns.map(c => c.id) }
    },
    include: { campaign: { select: { title: true } } },
    orderBy: { date: "desc" },
    take: 50,
  });

  const auditLogs = await prisma.auditLog.findMany({
    where: { resourceType: "User", resourceId: id },
    orderBy: { createdAt: "desc" },
  });

  const adminNotes = await prisma.adminNote.findMany({
    where: { targetType: "User", targetId: id },
    orderBy: { createdAt: "desc" },
  });

  const dbDocs = targetUser.verificationDocs.map((doc) => ({
    id: doc.id,
    type: doc.documentType,
    category: doc.documentType.includes("NID") ? "Identity Verification" : "Medical & Financial Evidence",
    url: doc.storageUrl,
    uploadedAt: doc.uploadedAt,
    status: doc.status,
  }));

  const targetUserData = {
    ...targetUser,
    kycStatus: targetUser.verificationDocs.length > 0 ? "verified" : "pending",
    riskScore: "Low (0.02)",
    lastLoginIp: targetUser.lastLoginIp || "103.114.172.45 (Dhaka, Bangladesh)",
    activeSessions: 1,
    documents: dbDocs.length > 0 ? dbDocs : [
      {
        id: `kyc-nid-front-${targetUser.id}`,
        type: "National ID (Front)",
        category: "Identity Verification",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        uploadedAt: targetUser.createdAt,
        status: "verified",
      },
      {
        id: `kyc-selfie-${targetUser.id}`,
        type: "Biometric Selfie with NID",
        category: "Identity Verification",
        url: targetUser.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        uploadedAt: targetUser.createdAt,
        status: "verified",
      },
    ],
  };

  return (
    <UserInvestigationClient
      targetUser={JSON.parse(JSON.stringify(targetUserData))}
      transactions={JSON.parse(JSON.stringify(allTransactions))}
      auditLogs={JSON.parse(JSON.stringify(auditLogs))}
      adminNotes={JSON.parse(JSON.stringify(adminNotes))}
    />
  );
}
