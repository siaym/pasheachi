import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { TransactionInvestigationClient } from "./client";

export default async function TransactionInvestigationPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { id } = await params;

  const transaction = await prisma.transaction.findUnique({
    where: { id },
    include: {
      campaign: {
        include: {
          creator: true,
        }
      }
    }
  });

  if (!transaction) notFound();

  const auditLogs = await prisma.auditLog.findMany({
    where: { resourceType: "Transaction", resourceId: id },
    orderBy: { createdAt: "desc" },
  });

  const adminNotes = await prisma.adminNote.findMany({
    where: { targetType: "Transaction", targetId: id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <TransactionInvestigationClient
      transaction={JSON.parse(JSON.stringify(transaction))}
      auditLogs={JSON.parse(JSON.stringify(auditLogs))}
      adminNotes={JSON.parse(JSON.stringify(adminNotes))}
    />
  );
}
