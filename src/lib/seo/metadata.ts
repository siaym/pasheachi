import type { Metadata } from "next";
import { SITE_CONFIG } from "./config";

interface MetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonicalUrlRelative?: string;
  type?: "website" | "article" | "profile";
  authorName?: string;
  publishedTime?: string;
}

export function constructMetadata({
  title,
  description,
  keywords,
  image,
  noIndex = false,
  canonicalUrlRelative,
  type = "website",
  authorName,
  publishedTime,
}: MetadataOptions = {}): Metadata {
  const metaTitle = title
    ? `${title} | ${SITE_CONFIG.siteName}`
    : SITE_CONFIG.defaultTitle;

  const metaDescription = description || SITE_CONFIG.defaultDescription;
  const metaKeywords = keywords || SITE_CONFIG.defaultKeywords;
  const metaImage = image || SITE_CONFIG.defaultImage;

  const canonical = canonicalUrlRelative
    ? `${SITE_CONFIG.siteUrl}${canonicalUrlRelative.startsWith("/") ? "" : "/"}${canonicalUrlRelative}`
    : SITE_CONFIG.siteUrl;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: authorName ? [{ name: authorName }] : [{ name: SITE_CONFIG.organization.name }],
    creator: SITE_CONFIG.siteName,
    publisher: SITE_CONFIG.siteName,
    metadataBase: new URL(SITE_CONFIG.siteUrl),
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: SITE_CONFIG.siteName,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: "en_BD",
      type: type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: SITE_CONFIG.twitterHandle,
      site: SITE_CONFIG.twitterHandle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon.png", type: "image/png", sizes: "64x64" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      shortcut: ["/favicon.ico"],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    ...(SITE_CONFIG.verifications.google || SITE_CONFIG.verifications.bing
      ? {
          verification: {
            google: SITE_CONFIG.verifications.google,
            yandex: SITE_CONFIG.verifications.bing,
          },
        }
      : {}),
  };
}
