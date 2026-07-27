export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  resourceType: string;
  resourceId: string;
  ipAddress: string;
  userAgent: string;
  oldValue?: string;
  newValue?: string;
  reason?: string;
}

const MEMORY_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "LOG-9081",
    timestamp: "2026-07-27 18:45:12",
    actorName: "Siyam Ahmed",
    actorEmail: "siyam@pasheachi.bro.bd",
    actorRole: "SuperAdmin",
    action: "VERIFY_TRANSACTION",
    resourceType: "Transaction",
    resourceId: "TRX-9F2A1B",
    ipAddress: "103.145.78.12",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    oldValue: "PENDING",
    newValue: "VERIFIED",
    reason: "Matched bKash statement ID 9F2A1B"
  },
  {
    id: "LOG-9082",
    timestamp: "2026-07-27 17:12:05",
    actorName: "Audit Bot",
    actorEmail: "system@pasheachi.bro.bd",
    actorRole: "System",
    action: "APPROVE_CAMPAIGN",
    resourceType: "Campaign",
    resourceId: "CMP-092",
    ipAddress: "127.0.0.1",
    userAgent: "Internal Worker Process",
    oldValue: "SUBMITTED",
    newValue: "LIVE",
    reason: "Manual verification documents approved"
  }
];

export function logAuditEvent(entry: Omit<AuditLogEntry, "id" | "timestamp">): AuditLogEntry {
  const newLog: AuditLogEntry = {
    id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    ...entry
  };
  MEMORY_AUDIT_LOGS.unshift(newLog);
  return newLog;
}

export function getAuditLogs(): AuditLogEntry[] {
  return MEMORY_AUDIT_LOGS;
}
