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

  const campaignData = {
    ...campaign,
    documents: [
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
        id: `doc-nid-back-${campaign.id}`,
        type: "National ID (Back)",
        category: "Identity Verification",
        url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
        uploadedAt: campaign.createdAt,
        uploadedBy: campaign.creator?.name || "Creator",
        status: "verified",
        fileType: "image/jpeg",
        fileSize: "1.6 MB",
      },
      {
        id: `doc-medical-cert-${campaign.id}`,
        type: "Medical Certificate / Hospital Estimate",
        category: "Medical & Financial Evidence",
        url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
        uploadedAt: campaign.createdAt,
        uploadedBy: campaign.creator?.name || "Creator",
        status: "pending",
        fileType: "application/pdf",
        fileSize: "3.4 MB",
      },
      {
        id: `doc-prescription-${campaign.id}`,
        type: "Doctor Prescription & Clinical Notes",
        category: "Medical Evidence",
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        uploadedAt: campaign.createdAt,
        uploadedBy: campaign.creator?.name || "Creator",
        status: "verified",
        fileType: "image/png",
        fileSize: "2.1 MB",
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
    reports: [
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
