import type { Metadata } from "next";
import { fontHeading, fontSerif, fontBody, fontMono, fontBengali, fontScript } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { BackgroundSystem } from "@/components/layout/background-system";
import "./globals.css";

import { constructMetadata } from "@/lib/seo/metadata";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata();

import { getCurrentUser } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const navUser = user ? { id: user.id, username: user.username, name: user.name, role: user.role } : null;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontHeading.variable} ${fontSerif.variable} ${fontBody.variable} ${fontMono.variable} ${fontBengali.variable} ${fontScript.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="flex min-h-screen flex-col bg-[#F7F4ED] text-[#1D2927] antialiased">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <BackgroundSystem />
        <Navbar user={navUser as any} />
        <main className="flex-1 pb-16 md:pb-0 relative z-10">{children}</main>
        <Footer />
        <MobileNav user={navUser as any} />
      </body>
    </html>
  );
}

