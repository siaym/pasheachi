import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_CONFIG } from "@/lib/seo/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.siteUrl;

  // 1. Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/discover`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/trust`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 2. Fetch Active Published Campaigns
  const campaigns = await prisma.campaign.findMany({
    where: {
      status: { in: ["active", "completed"] },
      deletedAt: null,
    },
    include: { creator: { select: { username: true } } },
  });

  const campaignRoutes: MetadataRoute.Sitemap = campaigns.map((campaign) => {
    const uName = campaign.creator?.username ? campaign.creator.username.toLowerCase() : "creator";
    return {
      url: `${baseUrl}/${uName}/${campaign.slug}`,
      lastModified: campaign.updatedAt || campaign.createdAt,
      changeFrequency: "daily",
      priority: campaign.isFeatured ? 0.9 : 0.8,
    };
  });

  // 3. Fetch Active Creators
  const creators = await prisma.user.findMany({
    where: {
      status: "active",
      campaigns: { some: {} },
    },
    select: { username: true, updatedAt: true },
  });

  const creatorRoutes: MetadataRoute.Sitemap = creators.map((creator) => ({
    url: `${baseUrl}/${creator.username.toLowerCase()}`,
    lastModified: creator.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...campaignRoutes, ...creatorRoutes];
}
