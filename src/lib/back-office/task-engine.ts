export interface TaskItem {
  id: string;
  title: string;
  workspace: "Finance" | "Moderation" | "Trust & Safety" | "Support" | "Super Admin";
  assignedTo: string;
  priority: "HIGH" | "URGENT" | "NORMAL";
  dueDate: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  entityId?: string;
  entityType?: "Campaign" | "Transaction" | "Withdrawal" | "Ticket" | "Creator";
}

let MEMORY_TASKS: TaskItem[] = [
  {
    id: "TSK-101",
    title: "Verify bKash ৳15,000 manual transaction TRX-8H9I0J",
    workspace: "Finance",
    assignedTo: "Siyam Ahmed",
    priority: "HIGH",
    dueDate: "Today",
    status: "PENDING",
    entityId: "TRX-8H9I0J",
    entityType: "Transaction"
  },
  {
    id: "TSK-102",
    title: "Review NID evidence for Emergency Sylhet Flood Relief",
    workspace: "Moderation",
    assignedTo: "Rahim Ali",
    priority: "URGENT",
    dueDate: "Today",
    status: "PENDING",
    entityId: "CMP-092",
    entityType: "Campaign"
  },
  {
    id: "TSK-103",
    title: "Investigate multiple donation attempts from IP 103.145.78.12",
    workspace: "Trust & Safety",
    assignedTo: "Siyam Ahmed",
    priority: "HIGH",
    dueDate: "Tomorrow",
    status: "IN_PROGRESS",
    entityId: "103.145.78.12",
    entityType: "Creator"
  },
  {
    id: "TSK-104",
    title: "Reply to creator ticket TCK-101 regarding Nagad payout",
    workspace: "Support",
    assignedTo: "Farhana Akter",
    priority: "NORMAL",
    dueDate: "Today",
    status: "PENDING",
    entityId: "TCK-101",
    entityType: "Ticket"
  }
];

export function getTasks(): TaskItem[] {
  return MEMORY_TASKS;
}

export function assignTask(taskId: string, assignee: string) {
  MEMORY_TASKS = MEMORY_TASKS.map(t => t.id === taskId ? { ...t, assignedTo: assignee } : t);
}

export function completeTask(taskId: string) {
  MEMORY_TASKS = MEMORY_TASKS.map(t => t.id === taskId ? { ...t, status: "COMPLETED" } : t);
}
