import { 
  Building2, 
  Wallet, 
  ShieldCheck, 
  FileText, 
  Settings,
  Megaphone,
  Users,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Globe,
  Sliders
} from "lucide-react";

export type WorkspaceId = 
  | "SUPER_ADMIN"
  | "FINANCE"
  | "MODERATION"
  | "CONTENT"
  | "PLATFORM";

export interface WorkspaceConfig {
  id: WorkspaceId;
  name: string;
  shortName: string;
  icon: any;
  color: string;
  bgColor: string;
  description: string;
  requiredPermission: string;
  navItems: {
    name: string;
    id: string;
    icon: any;
    badge?: number;
  }[];
}

export const WORKSPACES: Record<WorkspaceId, WorkspaceConfig> = {
  SUPER_ADMIN: {
    id: "SUPER_ADMIN",
    name: "Executive Command",
    shortName: "Admin",
    icon: Building2,
    color: "#1D2927",
    bgColor: "#FAF8F3",
    description: "Executive control, action items, system health, revenue & cross-departmental operations.",
    requiredPermission: "system.manage",
    navItems: [
      { name: "Command Dashboard", id: "overview", icon: Building2 },
      { name: "All Campaigns", id: "campaigns", icon: Megaphone },
      { name: "Creators & Users", id: "creators", icon: Users },
      { name: "Audit Trail", id: "audit_logs", icon: FileText },
      { name: "Feature Controls", id: "flags", icon: Sliders },
    ]
  },
  FINANCE: {
    id: "FINANCE",
    name: "Finance & Treasury",
    shortName: "Finance",
    icon: Wallet,
    color: "#355C52",
    bgColor: "#E5EEE8",
    description: "Manual MFS verification (bKash/Nagad/Rocket), bank statement matching & payouts.",
    requiredPermission: "finance.verify",
    navItems: [
      { name: "Finance Ledger", id: "overview", icon: Wallet },
      { name: "MFS Verification Queue", id: "verification_queue", icon: CheckCircle2 },
      { name: "Statement Import", id: "statement_import", icon: FileSpreadsheet },
      { name: "Withdrawals Queue", id: "withdrawals", icon: Clock },
    ]
  },
  MODERATION: {
    id: "MODERATION",
    name: "Campaign Moderation",
    shortName: "Moderation",
    icon: ShieldCheck,
    color: "#8C7A5B",
    bgColor: "#FAF8F3",
    description: "Review campaign filings, identity documents inspection & creator verification.",
    requiredPermission: "campaign.approve",
    navItems: [
      { name: "Moderation Desk", id: "overview", icon: ShieldCheck },
      { name: "Pending Approvals", id: "pending_campaigns", icon: Megaphone },
      { name: "Creator NID & Identity", id: "nid_verification", icon: Users },
    ]
  },
  CONTENT: {
    id: "CONTENT",
    name: "Content & CMS",
    shortName: "Content",
    icon: FileText,
    color: "#8C7A5B",
    bgColor: "#FAF8F3",
    description: "Homepage banners, featured dreams curation, success stories & email communication.",
    requiredPermission: "content.manage",
    navItems: [
      { name: "Homepage Curator", id: "homepage", icon: Globe },
      { name: "Email Center", id: "emails", icon: FileText },
    ]
  },
  PLATFORM: {
    id: "PLATFORM",
    name: "Platform Configuration",
    shortName: "Platform",
    icon: Settings,
    color: "#1D2927",
    bgColor: "#FAF8F3",
    description: "System parameters, verification requirements, SEO configuration & maintenance mode.",
    requiredPermission: "settings.edit",
    navItems: [
      { name: "Verification Rules", id: "overview", icon: Settings },
      { name: "Maintenance & Flags", id: "maintenance", icon: Sliders },
      { name: "Security & Sessions", id: "security", icon: ShieldCheck },
    ]
  }
};
