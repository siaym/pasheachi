import type { Metadata } from "next";
import { fontHeading, fontBody, fontMono, fontBengali } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} ${fontBengali.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
