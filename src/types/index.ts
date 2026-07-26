export type CategorySlug =
  | "medical"
  | "travel"
  | "education"
  | "creator"
  | "ngo"
  | "charity"
  | "sports"
  | "technology"
  | "animals"
  | "emergency"
  | "wedding"
  | "birthday"
  | "opensource";

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  iconName: string;
  description: string;
  activeCount: number;
  bgLight: string;
  textColor: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  coverUrl?: string;
  verified: boolean;
  verificationBadgeType?: "user" | "ngo" | "student" | "creator";
  bio: string;
  location: string;
  category: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
  followersCount: number;
  followingCount: number;
}

export interface Milestone {
  id: string;
  title: string;
  amount: number;
  completed: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  story: string;
  category: CategorySlug;
  goalAmount: number;
  raisedAmount: number;
  daysLeft: number;
  supportersCount: number;
  imageUrl: string;
  creator: User;
  isPinned?: boolean;
  isFeatured?: boolean;
  campaignType?: "flexible" | "fixed";
  fixedAmount?: number;
  status: "active" | "completed" | "pending" | "draft";
  milestones?: Milestone[];
  createdAt: string;
}

export interface Supporter {
  id: string;
  name: string;
  avatarUrl?: string;
  amount: number;
  message?: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  location: string;
  photoUrl: string;
  quote: string;
  amountRaised: number;
  supportersCount: number;
  campaignTitle: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
