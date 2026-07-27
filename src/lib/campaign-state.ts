export type CampaignState = 
  | "DRAFT"
  | "SUBMITTED"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "LIVE"
  | "GOAL_REACHED"
  | "COMPLETED"
  | "ARCHIVED";

export interface StateTransitionRule {
  from: CampaignState;
  to: CampaignState[];
  actionLabel: string;
}

export const CAMPAIGN_STATE_TRANSITIONS: Record<CampaignState, CampaignState[]> = {
  DRAFT: ["SUBMITTED"],
  SUBMITTED: ["PENDING_REVIEW", "DRAFT"],
  PENDING_REVIEW: ["APPROVED", "DRAFT"],
  APPROVED: ["LIVE"],
  LIVE: ["GOAL_REACHED", "COMPLETED", "ARCHIVED"],
  GOAL_REACHED: ["COMPLETED", "LIVE"],
  COMPLETED: ["ARCHIVED"],
  ARCHIVED: [],
};

export const CAMPAIGN_STATE_BADGES: Record<CampaignState, { label: string; color: string; bg: string }> = {
  DRAFT: { label: "Draft", color: "#53605C", bg: "#EAE5DB" },
  SUBMITTED: { label: "Submitted", color: "#8C7A5B", bg: "#FAF8F3" },
  PENDING_REVIEW: { label: "Pending Audit", color: "#A84D2A", bg: "#FDF4F0" },
  APPROVED: { label: "Approved", color: "#355C52", bg: "#E5EEE8" },
  LIVE: { label: "Live", color: "#355C52", bg: "#E5EEE8" },
  GOAL_REACHED: { label: "Goal Reached", color: "#A84D2A", bg: "#FDF4F0" },
  COMPLETED: { label: "Completed", color: "#1D2927", bg: "#EAE5DB" },
  ARCHIVED: { label: "Archived", color: "#8C7A5B", bg: "#FAF8F3" },
};

export function canTransitionState(from: CampaignState, to: CampaignState): boolean {
  return CAMPAIGN_STATE_TRANSITIONS[from]?.includes(to) || false;
}

export function parseCampaignState(statusStr: string): CampaignState {
  const normalized = (statusStr || "").toUpperCase();
  if (normalized === "ACTIVE" || normalized === "LIVE") return "LIVE";
  if (normalized === "COMPLETED") return "COMPLETED";
  if (normalized === "PENDING") return "PENDING_REVIEW";
  if (normalized === "DRAFT") return "DRAFT";
  return "LIVE";
}
