import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import FinanceClientTable from "./finance-client";

export const dynamic = "force-dynamic";

export default async function FinanceAdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Fetch only finance related data
  const transactions = await prisma.transaction.findMany({
    include: { campaign: true },
    orderBy: { date: "desc" },
    take: 100,
  });

  const formattedTransactions = transactions.map((t) => ({
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Finance & Treasury</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Manage MFS verifications, statement matching, and withdrawals.
        </p>
      </div>

      <FinanceClientTable initialTransactions={formattedTransactions} />
    </div>
  );
}
