import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminClientHub } from "./client";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch real database records from Supabase PostgreSQL
  const transactions = await prisma.transaction.findMany({
    include: {
      campaign: true,
    },
    orderBy: { date: "desc" },
    take: 50,
  });

  const campaigns = await prisma.campaign.findMany({
    include: {
      creator: true,
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const formattedTransactions = transactions.map((t) => ({
    id: t.id,
    donorName: t.donorName,
    amount: t.amount,
    method: t.method,
    phone: t.phone || "N/A",
    date: new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    campaign: t.campaign?.title || "Campaign",
    status: t.status,
  }));

  const formattedCampaigns = campaigns.map((c) => ({
    id: c.id,
    title: c.title,
    creator: c.creator,
    goalAmount: c.goalAmount,
    raisedAmount: c.raisedAmount,
    category: c.category,
    status: c.status,
  }));

  return (
    <AdminClientHub
      initialTransactions={formattedTransactions}
      initialCampaigns={formattedCampaigns}
      initialUsers={users as any}
    />
  );
}
