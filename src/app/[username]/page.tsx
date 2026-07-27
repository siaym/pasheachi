import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserProfileClient } from "@/components/profile/user-profile-client";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  const decodedUsername = decodeURIComponent(username);
  const cleanUsername = decodedUsername.replace(/^@/, "").toLowerCase();

  // Canonical URL redirection (e.g., /@siyam or /Siyam -> /siyam)
  if (decodedUsername !== cleanUsername) {
    redirect(`/${cleanUsername}`);
  }

  
  // Fetch user from DB
  const user = await prisma.user.findUnique({
    where: { username: cleanUsername }
  });

  if (!user) {
    notFound();
  }

  // Get user's public campaigns only
  const userCampaigns = await prisma.campaign.findMany({
    where: {
      creator: { username: cleanUsername },
      status: { in: ["active", "completed"] }
    },
    include: {
      creator: true,
      transactions: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return <UserProfileClient user={user as any} userCampaigns={userCampaigns as any} />;
}

