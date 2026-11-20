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
        status: { in: ["active", "completed"] },
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
          { location: { contains: query, mode: "insensitive" } },
        ]
      },
      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
        raisedAmount: true,
        creator: {
          select: {
            username: true,
            name: true,
          }
        }
      },
      take: 20
    });

    users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { username: { contains: query, mode: "insensitive" } },
        ]
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatarUrl: true,
        location: true,
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
