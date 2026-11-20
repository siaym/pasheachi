import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminClientHub } from "./client";

export const dynamic = "force-dynamic";
export const revalidate = 5;

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
    rejectedTransactions,
    verifiedTransactionSum,
    todayVerifiedTransactionSum,
    totalCampaigns,
    activeCampaigns,
    completedCampaigns,
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
    prisma.transaction.count({ where: { status: "rejected" } }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { status: "verified" },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        status: "verified",
        date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
    // Campaign Counts
    prisma.campaign.count(),
    prisma.campaign.count({ where: { status: "active" } }),
    prisma.campaign.count({ where: { status: "completed" } }),
    prisma.campaign.count({ where: { status: "rejected" } }),
    // User Count
    prisma.user.count(),
    // Recent Lists for tables
    prisma.transaction.findMany({
      include: {
        campaign: {
          select: {
            id: true,
            title: true,
            slug: true,
            creator: {
              select: { username: true, name: true },
            },
          },
        },
      },
      orderBy: { date: "desc" },
      take: 100,
    }),
    prisma.campaign.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: { transactions: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        status: true,
        avatarUrl: true,
        location: true,
        createdAt: true,
        bkashNumber: true,
        nagadNumber: true,
        bankDetails: true,
        banReason: true,
        _count: {
          select: { campaigns: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  const pendingCampaignsCount = totalCampaigns - activeCampaigns - completedCampaigns - rejectedCampaigns;

  const stats = {
    totalTransactions,
    pendingTransactions,
    verifiedTransactions,
    rejectedTransactions,
    totalDonationVolume: verifiedTransactionSum._sum.amount || 0,
    todayDonationVolume: todayVerifiedTransactionSum._sum.amount || 0,
    verificationRate: totalTransactions > 0 ? Math.round((verifiedTransactions / totalTransactions) * 100) : 0,
    totalCampaigns,
    activeCampaigns,
    completedCampaigns,
    rejectedCampaigns,
    pendingCampaigns: pendingCampaignsCount > 0 ? pendingCampaignsCount : 0,
    totalUsers,
  };

  const formattedTransactions = recentTransactions.map((t) => ({
    id: t.id,
    donorName: t.donorName || "Anonymous",
    amount: t.amount,
    method: t.method || "bKash",
    phone: t.phone || "—",
    referenceId: t.referenceId || "—",
    message: t.message || null,
    date: new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    rawDate: t.date.toISOString(),
    campaignTitle: t.campaign?.title || "Campaign",
    campaignSlug: t.campaign?.slug || null,
    creatorUsername: t.campaign?.creator?.username || null,
    campaignId: t.campaignId,
    status: t.status || "pending",
  }));

  const formattedCampaigns = recentCampaigns.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    subtitle: c.subtitle,
    category: c.category,
    location: c.location,
    coverImageUrl: c.coverImageUrl,
    goalAmount: c.goalAmount || 0,
    raisedAmount: c.raisedAmount || 0,
    status: c.status,
    isFeatured: c.isFeatured,
    isPinned: c.isPinned,
    bkashNumber: c.bkashNumber,
    nagadNumber: c.nagadNumber,
    bankDetails: c.bankDetails,
    createdAt: new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    creator: c.creator,
    totalTransactions: c._count.transactions,
  }));

  const formattedUsers = recentUsers.map((u) => ({
    id: u.id,
    name: u.name,
    username: u.username,
    email: u.email || "—",
    role: u.role || "user",
    status: u.status || "active",
    avatarUrl: u.avatarUrl,
    location: u.location || "—",
    createdAt: new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    bkashNumber: u.bkashNumber,
    nagadNumber: u.nagadNumber,
    bankDetails: u.bankDetails,
    banReason: u.banReason,
    campaignsCount: u._count.campaigns,
  }));

  return (
    <AdminClientHub
      stats={stats}
      initialTransactions={formattedTransactions}
      initialCampaigns={formattedCampaigns}
      initialUsers={formattedUsers}
      initialAuditLogs={recentAuditLogs as any}
    />
  );
}
