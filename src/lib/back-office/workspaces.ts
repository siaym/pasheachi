import { 
  Building2, 
  Wallet, 
  ShieldCheck, 
  ShieldAlert, 
  Headphones, 
  BarChart3, 
  FileText, 
  Settings,
  Megaphone,
  Users,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
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
    name: "Super Admin",
    shortName: "Admin",
    icon: Building2,
    color: "#1D2927",
    bgColor: "#FAF8F3",
    description: "Complete platform control, system health, revenue & cross-departmental operations.",
    requiredPermission: "system.manage",
    navItems: [
      { name: "Executive Dashboard", id: "overview", icon: Building2 },
      { name: "All Campaigns", id: "campaigns", icon: Megaphone, badge: 14 },
      { name: "Creator Profiles", id: "creators", icon: Users },
      { name: "Audit Logs", id: "audit_logs", icon: FileText },
      { name: "Feature Flags", id: "flags", icon: Sliders },
    ]
  },
  FINANCE: {
    id: "FINANCE",
    name: "Finance & Treasury",
    shortName: "Finance",
    icon: Wallet,
    color: "#355C52",
    bgColor: "#E5EEE8",
    description: "Manual MFS verification, statement matching, duplicate detection & withdrawal payouts.",
    requiredPermission: "finance.verify",
    navItems: [
      { name: "Finance Overview", id: "overview", icon: Wallet },
      { name: "Manual MFS Verification", id: "verification_queue", icon: CheckCircle2, badge: 18 },
      { name: "Statement Import", id: "statement_import", icon: FileSpreadsheet },
      { name: "Withdrawals Queue", id: "withdrawals", icon: Clock, badge: 5 },
      { name: "Financial Audit", id: "audit", icon: FileText },
    ]
  },
  MODERATION: {
    id: "MODERATION",
    name: "Campaign Moderation",
    shortName: "Moderation",
    icon: ShieldCheck,
    color: "#8C7A5B",
    bgColor: "#FAF8F3",
    description: "Review campaign submissions, government ID evidence & creator verification.",
    requiredPermission: "campaign.approve",
    navItems: [
      { name: "Moderation Desk", id: "overview", icon: ShieldCheck },
      { name: "Pending Approval", id: "pending_campaigns", icon: Megaphone, badge: 12 },
      { name: "NID / Passport Review", id: "nid_verification", icon: Users, badge: 7 },
      { name: "Moderation Log", id: "log", icon: FileText },
    ]
  },
  CONTENT: {
    id: "CONTENT",
    name: "Content & CMS",
    shortName: "Content",
    icon: FileText,
    color: "#8C7A5B",
    bgColor: "#FAF8F3",
    description: "Platform homepage banners, featured stories, announcement bar & email templates.",
    requiredPermission: "content.manage",
    navItems: [
      { name: "CMS Manager", id: "overview", icon: FileText },
      { name: "Homepage Curator", id: "homepage", icon: Globe },
      { name: "Email Templates", id: "emails", icon: FileText },
    ]
  },
  PLATFORM: {
    id: "PLATFORM",
    name: "Platform Configuration",
    shortName: "Platform",
    icon: Settings,
    color: "#1D2927",
    bgColor: "#FAF8F3",
    description: "System parameters, gateway limits, maintenance mode, security keys & sessions.",
    requiredPermission: "settings.edit",
    navItems: [
      { name: "System Config", id: "overview", icon: Settings },
      { name: "Maintenance & Flags", id: "maintenance", icon: Sliders },
      { name: "Security & Sessions", id: "security", icon: ShieldCheck },
    ]
  }
};
