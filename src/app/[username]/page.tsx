import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserProfileClient } from "@/components/profile/user-profile-client";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  const cleanUsername = username.replace(/^(@|%40)/, "").toLowerCase();
  
  // Fetch user from DB
  const user = await prisma.user.findUnique({
    where: { username: cleanUsername }
  });

  if (!user) {
    notFound();
  }

  // Get user's campaigns
  const userCampaigns = await prisma.campaign.findMany({
    where: {
      creator: { username: cleanUsername }
    },
    include: {
      creator: true,
      transactions: true
    }
  });

  return <UserProfileClient user={user as any} userCampaigns={userCampaigns as any} />;
}
