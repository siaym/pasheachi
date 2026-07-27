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

  return (
    <UserInvestigationClient
      targetUser={JSON.parse(JSON.stringify(targetUser))}
      transactions={JSON.parse(JSON.stringify(allTransactions))}
      auditLogs={JSON.parse(JSON.stringify(auditLogs))}
      adminNotes={JSON.parse(JSON.stringify(adminNotes))}
    />
  );
}
