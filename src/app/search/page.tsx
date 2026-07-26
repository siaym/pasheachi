import { prisma } from "@/lib/prisma";
import { SearchClient } from "./client";
import { Suspense } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: query = "" } = await searchParams;

  let campaigns: any[] = [];
  let users: any[] = [];

  if (query) {
    campaigns = await prisma.campaign.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
        ]
      },
      include: { creator: true },
      take: 10
    });

    users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { username: { contains: query, mode: "insensitive" } },
        ]
      },
      take: 10
    });
  }

  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-20 relative bg-[#FDFBF7]"></div>}>
      <SearchClient 
        initialQuery={query}
        campaigns={campaigns}
        users={users}
      />
    </Suspense>
  );
}
