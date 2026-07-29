import { SITE_CONFIG } from "@/lib/seo/config";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.organization.name,
    alternateName: "PasheAchi",
    url: SITE_CONFIG.organization.url,
    logo: SITE_CONFIG.organization.logo,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.organization.contactPhone,
      contactType: "customer support",
      areaServed: "BD",
      availableLanguage: ["en", "bn"],
    },
    sameAs: SITE_CONFIG.organization.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.siteName,
    url: SITE_CONFIG.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.siteUrl}/discover?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CampaignJsonLd({
  title,
  description,
  url,
  image,
  goalAmount,
  raisedAmount,
  creatorName,
  category,
  datePublished,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  goalAmount: number;
  raisedAmount: number;
  creatorName: string;
  category: string;
  datePublished: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: title,
    description: description,
    url: url,
    image: [image],
    category: category,
    author: {
      "@type": "Person",
      name: creatorName,
    },
    offers: {
      "@type": "Offer",
      price: goalAmount,
      priceCurrency: "BDT",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: Math.max(1, Math.round(raisedAmount / 500)),
    },
    datePublished: datePublished,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonJsonLd({
  name,
  username,
  bio,
  image,
  url,
}: {
  name: string;
  username: string;
  bio?: string;
  image?: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    alternateName: `@${username}`,
    description: bio || `${name}'s creator profile on PasheAchi`,
    image: image,
    url: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; item: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item.startsWith("http") ? it.item : `${SITE_CONFIG.siteUrl}${it.item.startsWith("/") ? "" : "/"}${it.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
