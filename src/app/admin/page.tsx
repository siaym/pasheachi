import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminClientHub } from "./client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // === LIVE DATABASE AGGREGATIONS ===
  const [
    totalTransactions,
    pendingTransactions,
    verifiedTransactions,
    transactionSum,
    todayTransactionSum,
    totalCampaigns,
    activeCampaigns,
    rejectedCampaigns,
    totalUsers,
    recentTransactions,
    recentCampaigns,
    recentUsers,
    recentAuditLogs,
  ] = await Promise.all([
    // Transaction Counts
    prisma.transaction.count(),
    prisma.transaction.count({ where: { status: "pending" } }),
    prisma.transaction.count({ where: { status: "verified" } }),
    prisma.transaction.aggregate({ _sum: { amount: true } }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }
      }
    }),
    // Campaign Counts
    prisma.campaign.count(),
    prisma.campaign.count({ where: { status: "active" } }),
    prisma.campaign.count({ where: { status: "rejected" } }),
    // User Count
    prisma.user.count(),
    // Recent Lists for tables
    prisma.transaction.findMany({
      include: { campaign: true },
      orderBy: { date: "desc" },
      take: 50,
    }),
    prisma.campaign.findMany({
      include: { creator: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  const stats = {
    totalTransactions,
    pendingTransactions,
    verifiedTransactions,
    totalDonationVolume: transactionSum._sum.amount || 0,
    todayDonationVolume: todayTransactionSum._sum.amount || 0,
    verificationRate: totalTransactions > 0 ? Math.round((verifiedTransactions / totalTransactions) * 100) : 0,
    totalCampaigns,
    activeCampaigns,
    rejectedCampaigns,
    pendingCampaigns: totalCampaigns - activeCampaigns - rejectedCampaigns,
    totalUsers,
  };

  const formattedTransactions = recentTransactions.map((t) => ({
    id: t.id,
    donorName: t.donorName,
    amount: t.amount,
    method: t.method,
    phone: t.phone || "N/A",
    date: new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    campaign: t.campaign?.title || "Campaign",
    campaignId: t.campaignId,
    status: t.status,
  }));

  const formattedCampaigns = recentCampaigns.map((c) => ({
    id: c.id,
    title: c.title,
    creator: c.creator,
    goalAmount: c.goalAmount,
    raisedAmount: c.raisedAmount,
    category: c.category,
    status: c.status,
    isFeatured: c.isFeatured,
    isPinned: c.isPinned,
  }));

  return (
    <AdminClientHub
      stats={stats}
      initialTransactions={formattedTransactions}
      initialCampaigns={formattedCampaigns}
      initialUsers={recentUsers as any}
      initialAuditLogs={recentAuditLogs as any}
    />
  );
}
