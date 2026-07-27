export interface HealthScoreResult {
  score: number;
  grade: "A+" | "A" | "B" | "C" | "Needs Attention";
  suggestions: string[];
  breakdown: {
    storyCompleteness: number; // max 25
    coverPhoto: number; // max 20
    verificationStatus: number; // max 20
    updateFrequency: number; // max 15
    donorEngagement: number; // max 20
  };
}

export function calculateCampaignHealth(campaign: {
  description?: string | null;
  coverImageUrl?: string | null;
  bkashNumber?: string | null;
  nagadNumber?: string | null;
  bankDetails?: string | null;
  transactions?: any[];
  creator?: { avatarUrl?: string | null; bio?: string | null; verified?: boolean | null } | null;
  createdAt?: string | Date | null;
}): HealthScoreResult {
  let storyCompleteness = 0;
  let coverPhoto = 0;
  let verificationStatus = 0;
  let updateFrequency = 10;
  let donorEngagement = 0;

  const suggestions: string[] = [];

  // 1. Story Completeness (max 25)
  const storyLength = (campaign.description || "").trim().length;
  if (storyLength > 300) {
    storyCompleteness = 25;
  } else if (storyLength > 100) {
    storyCompleteness = 15;
    suggestions.push("Expand your campaign story to provide full detail for donors.");
  } else {
    storyCompleteness = 5;
    suggestions.push("Your campaign story is very short. Add details about how funds will be used.");
  }

  // 2. Cover Photo (max 20)
  if (campaign.coverImageUrl && campaign.coverImageUrl.length > 10) {
    coverPhoto = 20;
  } else {
    coverPhoto = 0;
    suggestions.push("Upload a high-quality cover photo to increase trust.");
  }

  // 3. Verification & Payment Setup (max 20)
  const hasPaymentMethod = campaign.bkashNumber || campaign.nagadNumber || campaign.bankDetails;
  if (hasPaymentMethod && campaign.creator?.verified) {
    verificationStatus = 20;
  } else if (hasPaymentMethod) {
    verificationStatus = 15;
    suggestions.push("Complete creator verification to gain the Verified badge.");
  } else {
    verificationStatus = 5;
    suggestions.push("Add at least one payment receiving method (bKash, Nagad, or Bank).");
  }

  // 4. Supporter & Donor Engagement (max 20)
  const donorCount = campaign.transactions?.length || 0;
  if (donorCount >= 10) {
    donorEngagement = 20;
  } else if (donorCount >= 3) {
    donorEngagement = 12;
    suggestions.push("Share your campaign link on Facebook and WhatsApp to reach 10+ supporters.");
  } else if (donorCount >= 1) {
    donorEngagement = 7;
    suggestions.push("Share your campaign with family and friends to build momentum.");
  } else {
    donorEngagement = 2;
    suggestions.push("Be the first to share your campaign link to receive your initial donation!");
  }

  // 5. Profile Completeness Bonus
  if (!campaign.creator?.bio) {
    suggestions.push("Complete your creator bio in Profile Settings.");
  }

  const score = storyCompleteness + coverPhoto + verificationStatus + updateFrequency + donorEngagement;

  let grade: HealthScoreResult["grade"] = "B";
  if (score >= 90) grade = "A+";
  else if (score >= 75) grade = "A";
  else if (score >= 60) grade = "B";
  else if (score >= 45) grade = "C";
  else grade = "Needs Attention";

  return {
    score,
    grade,
    suggestions: suggestions.slice(0, 4),
    breakdown: {
      storyCompleteness,
      coverPhoto,
      verificationStatus,
      updateFrequency,
      donorEngagement,
    },
  };
}
