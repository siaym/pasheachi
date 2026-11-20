import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserProfileClient } from "@/components/profile/user-profile-client";
import { constructMetadata } from "@/lib/seo/metadata";
import { PersonJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const cleanUsername = decodeURIComponent(username).replace(/^@/, "").toLowerCase();

  const user = await prisma.user.findUnique({
    where: { username: cleanUsername },
    include: { _count: { select: { campaigns: true } } },
  });

  if (!user) {
    return constructMetadata({ title: "Creator Not Found", noIndex: true });
  }

  const title = `${user.name} (@${user.username}) | PasheAchi`;
  const description = user.bio || `Support ${user.name}'s crowdfunding campaigns on PasheAchi.`;

  return constructMetadata({
    title,
    description,
    image: user.avatarUrl || undefined,
    canonicalUrlRelative: `/${cleanUsername}`,
    type: "profile",
    authorName: user.name,
  });
}

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

  // Fetch user from DB with only public profile fields
  const user = await prisma.user.findUnique({
    where: { username: cleanUsername },
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      location: true,
      avatarUrl: true,
      coverUrl: true,
      createdAt: true,
    },
  });

  if (!user) {
    notFound();
  }

  // Get user's public campaigns only
  const userCampaignsRaw = await prisma.campaign.findMany({
    where: {
      creator: { username: cleanUsername },
      status: { in: ["active", "completed"] },
      deletedAt: null,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      location: true,
      coverImageUrl: true,
      goalAmount: true,
      raisedAmount: true,
      status: true,
      isPinned: true,
      creator: {
        select: {
          username: true,
          name: true,
          avatarUrl: true,
        },
      },
      _count: {
        select: { transactions: { where: { status: "verified" } } },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const userCampaigns = userCampaignsRaw.map((c) => ({
    ...c,
    transactions: { length: c._count?.transactions || 0 },
  }));

  return (
    <>
      <PersonJsonLd
        name={user.name}
        username={user.username}
        bio={user.bio || undefined}
        image={user.avatarUrl || undefined}
        url={`https://pasheachi.bro.bd/${cleanUsername}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Creators", item: "/discover" },
          { name: user.name, item: `/${cleanUsername}` },
        ]}
      />
      <UserProfileClient user={user as any} userCampaigns={userCampaigns as any} />
    </>
  );
}

