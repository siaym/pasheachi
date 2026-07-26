import { User as PrismaUser, Campaign as PrismaCampaign, Transaction, Milestone } from "@prisma/client";

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

export type User = PrismaUser;
export type Campaign = PrismaCampaign & {
  creator: User;
  transactions?: Transaction[];
  milestones?: Milestone[];
};

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
