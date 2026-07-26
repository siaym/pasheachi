import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { WithdrawalsClient } from "./client";

export default async function WithdrawalsPage() {
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
            where: { status: "verified" }
          }
        }
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  let verifiedAmount = 0;
  user.campaigns.forEach(campaign => {
    campaign.transactions.forEach(trx => {
      verifiedAmount += trx.amount;
    });
  });

  const availableBalance = verifiedAmount;

  return <WithdrawalsClient availableBalance={availableBalance} />;
}
