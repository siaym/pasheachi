import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import UsersClientTable from "./users-client";

export const dynamic = "force-dynamic";

export default async function UsersAdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Management</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Manage platform users, roles, and view creator profiles.
        </p>
      </div>

      <UsersClientTable initialUsers={users as any[]} />
    </div>
  );
}
