export const SITE_CONFIG = {
  siteName: "PasheAchi (পাশে আছি)",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://pasheachi.bro.bd",
  defaultTitle: "PasheAchi — Support Every Dream | Crowdfunding Bangladesh",
  defaultDescription:
    "PasheAchi is Bangladesh's dedicated crowdfunding platform where anyone can receive direct financial support for medical treatments, education, travel, emergencies, open source projects, and personal dreams.",
  defaultKeywords: [
    "Crowdfunding Bangladesh",
    "PasheAchi",
    "Fundraising Bangladesh",
    "bKash donation",
    "Nagad donation",
    "Medical fundraising BD",
    "Open source sponsorship Bangladesh",
    "Bangladesh crowdfunding platform",
    "Emergency medical assistance BD",
    "Student education fundraising",
  ],
  defaultImage: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=1200&h=630&q=80",
  twitterHandle: "@PasheAchiBD",
  organization: {
    name: "PasheAchi Foundation",
    url: "https://pasheachi.bro.bd",
    logo: "https://pasheachi.bro.bd/icon.svg",
    contactPhone: "+880 1712 345678",
    address: "Dhaka, Bangladesh",
    sameAs: [
      "https://facebook.com/PasheAchiBD",
      "https://twitter.com/PasheAchiBD",
      "https://linkedin.com/company/pasheachi",
      "https://instagram.com/pasheachi",
    ],
  },
  verifications: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
  },
};
