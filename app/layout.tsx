import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://beats-peach.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PulseTok Analytics | TikTok Analytics for Creators & Teams",
  description:
    "Track TikTok views, engagement, and content performance with real-time analytics, audience insights, and growth recommendations.",
  keywords: ["TikTok analytics", "creator growth", "social media dashboard", "content performance", "PulseTok"],
  authors: [{ name: "Sajid Ali", url: "https://github.com/sajidnagari" }],
  openGraph: {
    title: "PulseTok Analytics",
    description: "TikTok analytics platform that helps creators and teams grow faster.",
    url: siteUrl,
    siteName: "PulseTok Analytics",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseTok Analytics",
    description: "TikTok analytics platform for creators, agencies, and brands.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-slate-100 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
