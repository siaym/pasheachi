import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import CampaignAnalyticsPage from "../campaigns/[id]/analytics/page";

export default async function GeneralDashboardAnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const mainCampaign = await prisma.campaign.findFirst({
    where: { creatorId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return <CampaignAnalyticsPage />;
}
