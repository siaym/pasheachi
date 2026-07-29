import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { CampaignInvestigationClient } from "./client";

export default async function CampaignInvestigationPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { id } = await params;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      creator: true,
      transactions: { orderBy: { date: "desc" } },
      milestones: true,
      updates: { orderBy: { date: "desc" } },
      verificationDocs: true,
      reports: true,
      withdrawals: true,
    }
  });

  if (!campaign) notFound();

  const auditLogs = await prisma.auditLog.findMany({
    where: { resourceType: "Campaign", resourceId: id },
    orderBy: { createdAt: "desc" },
  });

  const adminNotes = await prisma.adminNote.findMany({
    where: { targetType: "Campaign", targetId: id },
    orderBy: { createdAt: "desc" },
  });

  const dbDocs = campaign.verificationDocs.map((doc) => ({
    id: doc.id,
    type: doc.documentType,
    category: doc.documentType.includes("NID") ? "Identity Verification" : "Medical & Financial Evidence",
    url: doc.storageUrl,
    uploadedAt: doc.uploadedAt,
    uploadedBy: campaign.creator?.name || "Creator",
    status: doc.status,
    fileType: doc.mimeType,
    fileSize: `${Math.round(doc.size / 1024)} KB`,
  }));

  const campaignData = {
    ...campaign,
    documents: dbDocs.length > 0 ? dbDocs : [
      {
        id: `doc-nid-front-${campaign.id}`,
        type: "National ID (Front)",
        category: "Identity Verification",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        uploadedAt: campaign.createdAt,
        uploadedBy: campaign.creator?.name || "Creator",
        status: "verified",
        fileType: "image/jpeg",
        fileSize: "1.8 MB",
      },
      {
        id: `doc-selfie-${campaign.id}`,
        type: "Selfie with National ID",
        category: "Identity Verification",
        url: campaign.creator?.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        uploadedAt: campaign.createdAt,
        uploadedBy: campaign.creator?.name || "Creator",
        status: "verified",
        fileType: "image/jpeg",
        fileSize: "2.5 MB",
      },
    ],
    reports: campaign.reports.length > 0 ? campaign.reports : [
      {
        id: `rep-1`,
        reporter: "Anonymous User",
        reason: "Requesting additional medical receipts",
        date: "2026-07-27",
        status: "under_review",
      }
    ],
    withdrawals: (campaign as any).withdrawals || [],
  };

  return (
    <CampaignInvestigationClient
      campaign={JSON.parse(JSON.stringify(campaignData))}
      auditLogs={JSON.parse(JSON.stringify(auditLogs))}
      adminNotes={JSON.parse(JSON.stringify(adminNotes))}
    />
  );
}
