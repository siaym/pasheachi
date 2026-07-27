import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileClient } from "../profile/client";
import { prisma } from "@/lib/prisma";

export default async function DashboardSettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id }
  });

  return <ProfileClient user={fullUser || user} />;
}
