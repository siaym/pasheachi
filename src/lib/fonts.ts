import { Plus_Jakarta_Sans, Inter, JetBrains_Mono, Noto_Sans_Bengali } from "next/font/google";

export const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const fontBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
