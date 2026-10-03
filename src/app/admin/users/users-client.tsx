"use client";

import { useState } from "react";
import { AdvancedTable } from "@/components/back-office/advanced-table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersClientTable({ initialUsers }: { initialUsers: User[] }) {
  const [users] = useState<User[]>(initialUsers);

  return (
    <AdvancedTable
      title="Platform Users Ledger"
      columns={[
        { header: "ID", accessorKey: (r) => r.id.slice(0, 8) + "..." },
        { header: "Name", accessorKey: "name" },
        { header: "Email", accessorKey: "email" },
        { 
          header: "Role", 
          accessorKey: "role",
          cell: (r) => (
            <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${r.role === 'SuperAdmin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {r.role || 'User'}
            </span>
          )
        },
        { header: "Joined", accessorKey: (r) => new Date(r.createdAt).toLocaleDateString() },
      ]}
      data={users}
      searchPlaceholder="Filter users by name or email..."
    />
  );
}
