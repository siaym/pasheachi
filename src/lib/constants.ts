import { Category, FAQItem } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Medical",
    slug: "medical",
    iconName: "Activity",
    description: "Help people access life-saving healthcare and surgeries.",
    activeCount: 324,
    bgLight: "#ECFDF5",
    textColor: "#059669",
  },
  {
    id: "cat-2",
    name: "Travel",
    slug: "travel",
    iconName: "Plane",
    description: "Support travel, tours, and global exploration dreams.",
    activeCount: 142,
    bgLight: "#EEF2FF",
    textColor: "#4F46E5",
  },
  {
    id: "cat-3",
    name: "Education",
    slug: "education",
    iconName: "GraduationCap",
    description: "Fund scholarships, tuition, books, and university fees.",
    activeCount: 289,
    bgLight: "#E0F2FE",
    textColor: "#0284C7",
  },
  {
    id: "cat-4",
    name: "Creator",
    slug: "creator",
    iconName: "Palette",
    description: "Back artists, YouTubers, writers, and digital creators.",
    activeCount: 512,
    bgLight: "#F3E8FF",
    textColor: "#9333EA",
  },
  {
    id: "cat-5",
    name: "NGO",
    slug: "ngo",
    iconName: "Building2",
    description: "Empower non-profits and community organizations.",
    activeCount: 98,
    bgLight: "#F0FDF4",
    textColor: "#16A34A",
  },
  {
    id: "cat-6",
    name: "Charity",
    slug: "charity",
    iconName: "HeartHandshake",
    description: "Direct aid for disaster relief, hunger, and winter clothes.",
    activeCount: 215,
    bgLight: "#FCE7F3",
    textColor: "#DB2777",
  },
  {
    id: "cat-7",
    name: "Sports",
    slug: "sports",
    iconName: "Trophy",
    description: "Sponsor athletes, sports equipment, and tournaments.",
    activeCount: 76,
    bgLight: "#FFEDD5",
    textColor: "#EA580C",
  },
  {
    id: "cat-8",
    name: "Technology",
    slug: "technology",
    iconName: "Laptop",
    description: "Fund laptops, hardware, AI projects, and gadgets.",
    activeCount: 184,
    bgLight: "#F1F5F9",
    textColor: "#475569",
  },
  {
    id: "cat-9",
    name: "Animals",
    slug: "animals",
    iconName: "PawPrint",
    description: "Support street animal rescue, shelters, and vet care.",
    activeCount: 63,
    bgLight: "#FEF3C7",
    textColor: "#D97706",
  },
  {
    id: "cat-10",
    name: "Emergency",
    slug: "emergency",
    iconName: "AlertTriangle",
    description: "Urgent emergency funds for accidents and crises.",
    activeCount: 120,
    bgLight: "#FEE2E2",
    textColor: "#DC2626",
  },
  {
    id: "cat-11",
    name: "Wedding",
    slug: "wedding",
    iconName: "Sparkles",
    description: "Help couples celebrate their dream wedding day.",
    activeCount: 45,
    bgLight: "#FFE4E6",
    textColor: "#E11D48",
  },
  {
    id: "cat-12",
    name: "Birthday",
    slug: "birthday",
    iconName: "Gift",
    description: "Group gifting for memorable birthday surprises.",
    activeCount: 88,
    bgLight: "#FEF9C3",
    textColor: "#CA8A04",
  },
  {
    id: "cat-13",
    name: "Open Source",
    slug: "opensource",
    iconName: "Code2",
    description: "Support open source developers maintaining free software.",
    activeCount: 167,
    bgLight: "#E0E7FF",
    textColor: "#4338CA",
  },
];

export const NAV_LINKS = [
  { label: "Discover", href: "/discover" },
  { label: "Categories", href: "/#categories" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "Help", href: "/help" },
];

export const PRESET_AMOUNTS = [50, 100, 250, 500, 1000];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How does PasheAchi work?",
    answer:
      "PasheAchi is a crowdfunding platform where anyone can create a permanent profile (@username) and launch unlimited campaigns. Whether you need funds for medical treatment, university tuition, travel, emergency relief, or an open-source project, friends and supporters can back your dream directly via bKash, Nagad, Rocket, or Bank Transfer.",
  },
  {
    id: "faq-2",
    question: "Is my money safe on PasheAchi?",
    answer:
      "Yes! Trust and safety are our highest priorities. In Phase 1, every transaction undergoes rigorous manual verification by our compliance team before being approved. Campaign creators undergo identity verification (NID/Passport/Student ID).",
  },
  {
    id: "faq-3",
    question: "What payment methods do you support?",
    answer:
      "We support all major mobile financial services in Bangladesh: bKash Send Money, Nagad Send Money, Rocket Send Money, and Direct Bank Transfer. In Phase 2, official merchant gateway integration will enable 1-click checkout.",
  },
  {
    id: "faq-4",
    question: "What are the platform fees?",
    answer:
      "Creating a profile and launching a campaign is 100% free. We charge a standard 5% platform fee on successfully raised funds to cover server costs, security auditing, and operations.",
  },
  {
    id: "faq-5",
    question: "How do I withdraw my funds?",
    answer:
      "Campaign owners can request withdrawals anytime from their Dashboard directly to their bKash, Nagad, Rocket account or bank account. Withdrawals are processed within 1-3 business days.",
  },
  {
    id: "faq-6",
    question: "Can I donate anonymously?",
    answer:
      "Yes! When supporting a campaign, simply check the 'Donate Anonymously' box. Your name will be hidden from the public campaign page and public donor lists.",
  },
  {
    id: "faq-7",
    question: "How do I verify my account?",
    answer:
      "Go to Settings → Verification to submit a photo of your Government NID, Passport, Student ID, or NGO Registration papers. Approved accounts receive a Verified Badge on their profile.",
  },
  {
    id: "faq-8",
    question: "What happens if a campaign doesn't reach its goal?",
    answer:
      "PasheAchi uses a flexible funding model. Campaign creators keep all funds raised (minus platform fee), even if the full goal isn't reached, allowing them to make immediate progress.",
  },
];
