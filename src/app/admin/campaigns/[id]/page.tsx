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

  return (
    <CampaignInvestigationClient
      campaign={JSON.parse(JSON.stringify(campaign))}
      auditLogs={JSON.parse(JSON.stringify(auditLogs))}
      adminNotes={JSON.parse(JSON.stringify(adminNotes))}
    />
  );
}
