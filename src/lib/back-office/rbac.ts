export type RoleName = 
  | "SuperAdmin"
  | "FinanceOfficer"
  | "Moderator"
  | "TrustSafetyOfficer"
  | "SupportAgent"
  | "DataAnalyst"
  | "ContentManager"
  | "PlatformAdmin";

export type Permission = 
  | "campaign.view"
  | "campaign.approve"
  | "campaign.reject"
  | "campaign.pause"
  | "campaign.archive"
  | "campaign.feature"
  | "creator.view"
  | "creator.verify"
  | "creator.suspend"
  | "creator.ban"
  | "finance.view"
  | "finance.verify"
  | "withdrawal.view"
  | "withdrawal.approve"
  | "withdrawal.reject"
  | "trust.investigate"
  | "trust.blacklist"
  | "support.tickets"
  | "support.reply"
  | "reports.export"
  | "analytics.view"
  | "content.manage"
  | "settings.edit"
  | "roles.manage"
  | "system.manage";

export const ROLE_PERMISSIONS: Record<RoleName, Permission[]> = {
  SuperAdmin: [
    "campaign.view", "campaign.approve", "campaign.reject", "campaign.pause", "campaign.archive", "campaign.feature",
    "creator.view", "creator.verify", "creator.suspend", "creator.ban",
    "finance.view", "finance.verify", "withdrawal.view", "withdrawal.approve", "withdrawal.reject",
    "trust.investigate", "trust.blacklist",
    "support.tickets", "support.reply",
    "reports.export", "analytics.view", "content.manage", "settings.edit", "roles.manage", "system.manage"
  ],
  FinanceOfficer: [
    "finance.view", "finance.verify", "withdrawal.view", "withdrawal.approve", "withdrawal.reject",
    "reports.export", "analytics.view"
  ],
  Moderator: [
    "campaign.view", "campaign.approve", "campaign.reject", "campaign.pause", "campaign.feature",
    "creator.view", "creator.verify"
  ],
  TrustSafetyOfficer: [
    "campaign.view", "campaign.pause", "campaign.archive",
    "creator.view", "creator.suspend", "creator.ban",
    "trust.investigate", "trust.blacklist", "reports.export"
  ],
  SupportAgent: [
    "campaign.view", "creator.view", "support.tickets", "support.reply"
  ],
  DataAnalyst: [
    "campaign.view", "creator.view", "finance.view", "reports.export", "analytics.view"
  ],
  ContentManager: [
    "campaign.view", "campaign.feature", "content.manage"
  ],
  PlatformAdmin: [
    "settings.edit", "system.manage", "roles.manage", "reports.export"
  ]
};

export function hasPermission(userRoles: RoleName[], requiredPermission: Permission): boolean {
  if (userRoles.includes("SuperAdmin")) return true;
  return userRoles.some(role => ROLE_PERMISSIONS[role]?.includes(requiredPermission));
}
