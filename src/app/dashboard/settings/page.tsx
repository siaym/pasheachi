import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsClient } from "./client";
import { prisma } from "@/lib/prisma";

export default async function DashboardSettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id }
  });

  return <SettingsClient user={fullUser || user} />;
}
