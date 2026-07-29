import { prisma } from "@/lib/prisma";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorEmail?: string;
  actorRole: string;
  action: string;
  resourceType: string;
  resourceId: string;
  ipAddress?: string;
  userAgent?: string;
  oldValue?: string;
  newValue?: string;
  reason?: string;
}

export async function logAuditEvent(entry: Omit<AuditLogEntry, "id" | "timestamp">) {
  const created = await prisma.auditLog.create({
    data: {
      actorName: entry.actorName,
      actorRole: entry.actorRole,
      action: entry.action,
      resourceType: entry.resourceType,
      resourceId: entry.resourceId,
      oldValue: entry.oldValue,
      newValue: entry.newValue,
      reason: entry.reason,
      ipAddress: entry.ipAddress || "103.114.172.45",
    }
  });

  return created;
}

export async function getAuditLogs(): Promise<AuditLogEntry[]> {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return logs.map((l) => ({
    id: l.id,
    timestamp: new Date(l.createdAt).toISOString().replace("T", " ").slice(0, 19),
    actorName: l.actorName,
    actorEmail: "admin@pasheachi.org",
    actorRole: l.actorRole,
    action: l.action,
    resourceType: l.resourceType,
    resourceId: l.resourceId,
    ipAddress: l.ipAddress || "103.114.172.45",
    userAgent: "Secure Admin Client",
    oldValue: l.oldValue || undefined,
    newValue: l.newValue || undefined,
    reason: l.reason || undefined,
  }));
}
