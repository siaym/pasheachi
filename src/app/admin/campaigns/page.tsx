import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import CampaignsClientTable from "./campaigns-client";

export const dynamic = "force-dynamic";

export default async function CampaignsAdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Fetch only campaign related data
  const campaigns = await prisma.campaign.findMany({
    include: { creator: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const formattedCampaigns = campaigns.map((c) => ({
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Campaign Moderation</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Review campaign submissions, government ID evidence, and approve fundraisers.
        </p>
      </div>

      <CampaignsClientTable initialCampaigns={formattedCampaigns} />
    </div>
  );
}
