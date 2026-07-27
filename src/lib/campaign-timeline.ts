export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "milestone" | "donation" | "status" | "withdrawal";
  isCompleted: boolean;
}

export function generateCampaignTimeline(campaign: {
  createdAt?: string | Date | null;
  goalAmount?: number | null;
  raisedAmount?: number | null;
  transactions?: any[];
  status?: string | null;
}): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const createdDate = campaign.createdAt ? new Date(campaign.createdAt) : new Date();
  const goal = campaign.goalAmount || 1;
  const raised = campaign.raisedAmount || 0;
  const progressPercent = Math.min(100, Math.round((raised / goal) * 100));

  // 1. Created
  events.push({
    id: "evt-created",
    title: "Campaign Created",
    description: "Campaign was drafted and initiated in workspace.",
    date: createdDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    category: "status",
    isCompleted: true,
  });

  // 2. Approved / Published
  events.push({
    id: "evt-approved",
    title: "Campaign Published & Live",
    description: "Manual audit completed. Campaign went live for public contributions.",
    date: createdDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    category: "status",
    isCompleted: true,
  });

  // 3. First Donation
  const verifiedTx = (campaign.transactions || []).filter(t => t.status === "verified");
  if (verifiedTx.length > 0) {
    const firstTx = verifiedTx[verifiedTx.length - 1];
    events.push({
      id: "evt-first-donor",
      title: "First Donation Received",
      description: `${firstTx.donorName || 'Anonymous'} contributed ৳${firstTx.amount.toLocaleString()}.`,
      date: new Date(firstTx.date || createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      category: "donation",
      isCompleted: true,
    });
  }

  // 4. Milestone: 25% Funded
  if (progressPercent >= 25) {
    events.push({
      id: "evt-25-percent",
      title: "25% Funding Milestone Reached",
      description: "Initial momentum achieved with community backing.",
      date: "Milestone Reached",
      category: "milestone",
      isCompleted: true,
    });
  }

  // 5. Milestone: 50% Halfway Goal
  if (progressPercent >= 50) {
    events.push({
      id: "evt-50-percent",
      title: "Halfway Point (50% Funded)",
      description: "Reached 50% of total target funding.",
      date: "Milestone Reached",
      category: "milestone",
      isCompleted: true,
    });
  }

  // 6. Milestone: Goal Reached (100%)
  if (progressPercent >= 100) {
    events.push({
      id: "evt-100-percent",
      title: "100% Target Goal Reached! 🎉",
      description: "Full target amount successfully funded by community.",
      date: "Target Achieved",
      category: "milestone",
      isCompleted: true,
    });
  }

  return events;
}
