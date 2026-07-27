import type { Metadata } from "next";
import { fontHeading, fontSerif, fontBody, fontMono, fontBengali, fontScript } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { BackgroundSystem } from "@/components/layout/background-system";
import "./globals.css";

export const metadata: Metadata = {
  title: "PasheAchi — Support Every Dream | Crowdfunding Bangladesh",
  description:
    "PasheAchi (পাশে আছি) is a platform where anyone can receive financial support for medical treatments, education, travel, emergencies, open source projects, and personal dreams.",
  keywords: [
    "Crowdfunding Bangladesh",
    "PasheAchi",
    "Fundraising Bangladesh",
    "bKash donation",
    "Nagad donation",
    "Medical fundraising BD",
    "Open source sponsorship",
  ],
  authors: [{ name: "PasheAchi Team" }],
  openGraph: {
    title: "PasheAchi — Stand Beside Every Dream",
    description: "Support creators, students, emergency treatments, and personal dreams across Bangladesh.",
    url: "https://pasheachi.bro.bd",
    siteName: "PasheAchi",
    locale: "en_BD",
    type: "website",
  },
};

import { getCurrentUser } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontHeading.variable} ${fontSerif.variable} ${fontBody.variable} ${fontMono.variable} ${fontBengali.variable} ${fontScript.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-[#F7F4ED] text-[#1D2927] antialiased">
        <BackgroundSystem />
        <Navbar user={user as any} />
        <main className="flex-1 pb-16 md:pb-0 relative z-10">{children}</main>
        <Footer />
        <MobileNav user={user as any} />
      </body>
    </html>
  );
}

