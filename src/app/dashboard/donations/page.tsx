import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DonorsClient } from "../donors/client";

export default async function DonationsPage() {
  const sessionUser = await getCurrentUser();

  if (!sessionUser) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: {
      campaigns: {
        include: {
          transactions: {
            orderBy: { date: 'desc' }
          }
        }
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  let totalRecorded = 0;
  const uniqueSupporters = new Set();
  
  const allDonations = user.campaigns.flatMap(campaign => 
    campaign.transactions.map(trx => {
      uniqueSupporters.add(trx.phone || trx.donorName);
      totalRecorded += trx.amount;
      
      return {
        id: trx.id,
        name: trx.donorName || "Anonymous",
        amount: trx.amount,
        method: trx.method,
        date: new Date(trx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        message: null,
        isAnonymous: !trx.donorName || trx.donorName.toLowerCase() === "anonymous",
        status: trx.status,
        campaignTitle: campaign.title,
      };
    })
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const stats = {
    totalSupporters: uniqueSupporters.size,
    totalRecorded
  };

  return <DonorsClient initialDonors={allDonations} stats={stats} />;
}
