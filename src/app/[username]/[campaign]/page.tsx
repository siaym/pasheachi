import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CampaignDetailClient } from "./client";
import { constructMetadata } from "@/lib/seo/metadata";
import { CampaignJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string; campaign: string }>;
}) {
  const { username, campaign: campaignSlug } = await params;
  const cleanUsername = decodeURIComponent(username).replace(/^@/, "").toLowerCase();

  const campaign = await prisma.campaign.findFirst({
    where: {
      slug: campaignSlug,
      status: { in: ["active", "completed"] },
      creator: { username: cleanUsername },
    },
    select: { title: true, description: true, category: true, location: true, coverImageUrl: true, createdAt: true, slug: true, creator: { select: { username: true, name: true } } },
  });

  if (!campaign) {
    return constructMetadata({ title: "Campaign Not Found", noIndex: true });
  }

  const uName = campaign.creator?.username ? campaign.creator.username.toLowerCase() : cleanUsername;
  const canonicalUrl = `/${uName}/${campaign.slug}`;

  return constructMetadata({
    title: `${campaign.title} | PasheAchi`,
    description: campaign.description.slice(0, 160),
    keywords: [campaign.category, campaign.location, campaign.title, "Crowdfunding Bangladesh", "PasheAchi"],
    image: campaign.coverImageUrl || undefined,
    canonicalUrlRelative: canonicalUrl,
    authorName: campaign.creator?.name || "Campaign Creator",
    publishedTime: campaign.createdAt.toISOString(),
  });
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ username: string; campaign: string }>;
}) {
  const { username, campaign: campaignSlug } = await params;
  const decodedUsername = decodeURIComponent(username);
  const cleanUsername = decodedUsername.replace(/^@/, "").toLowerCase();

  // Canonical URL redirection (e.g., /@siyam/test-3329 or /Siyam/test-3329 -> /siyam/test-3329)
  if (decodedUsername !== cleanUsername) {
    redirect(`/${cleanUsername}/${campaignSlug}`);
  }

  const campaignRaw = await prisma.campaign.findFirst({
    where: { 
      slug: campaignSlug,
      status: { in: ["active", "completed"] },
      creator: { username: cleanUsername }
    },
    include: {
      creator: true,
      _count: { select: { transactions: { where: { status: "verified" } } } }
    }
  });

  let campaign = null;
  if (campaignRaw) {
    campaign = {
      ...campaignRaw,
      transactions: { length: campaignRaw._count?.transactions || 0 }
    } as any;
  }

  if (!campaign) {
    notFound();
  }

  // Calculate live verified raised amount from database verified transactions
  const verifiedTxSum = await prisma.transaction.aggregate({
    where: {
      campaignId: campaign.id,
      status: "verified"
    },
    _sum: { amount: true }
  });

  const liveRaisedAmount = verifiedTxSum._sum.amount ?? campaign.raisedAmount ?? 0;

  const campaignWithLiveAmount = {
    ...campaign,
    raisedAmount: liveRaisedAmount
  };

  // Fetch verified support messages
  const supportMessages = await prisma.transaction.findMany({
    where: {
      campaignId: campaign.id,
      status: "verified",
      message: { not: null }
    },
    select: {
      donorName: true,
      message: true,
      date: true,
    },
    orderBy: { date: "desc" },
    take: 20
  });

  const canonicalPath = `/${cleanUsername}/${campaign.slug}`;

  return (
    <>
      <CampaignJsonLd
        title={campaign.title}
        description={campaign.description.slice(0, 200)}
        url={`https://pasheachi.bro.bd${canonicalPath}`}
        image={campaign.coverImageUrl || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0"}
        goalAmount={campaign.goalAmount || 0}
        raisedAmount={liveRaisedAmount}
        creatorName={campaign.creator?.name || "Creator"}
        category={campaign.category}
        datePublished={campaign.createdAt.toISOString()}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Discover", item: "/discover" },
          { name: campaign.category, item: `/discover?category=${encodeURIComponent(campaign.category)}` },
          { name: campaign.title, item: canonicalPath },
        ]}
      />
      <CampaignDetailClient 
        campaign={campaignWithLiveAmount as any} 
        creator={campaign.creator as any} 
        supportMessages={supportMessages}
      />
    </>
  );
}

