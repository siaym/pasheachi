import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MessagesClient } from "./client";

export default async function MessagesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const messages = await prisma.message.findMany({
    where: { recipientId: user.id },
    orderBy: { date: "desc" },
  });

  return <MessagesClient initialMessages={messages} />;
}
