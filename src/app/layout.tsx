import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL, SITE_NAME, OG_IMAGE, organizationJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const plusJakarta = localFont({
  variable: "--font-jakarta",
  display: "swap",
  src: [
    { path: "./fonts/jakarta-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jakarta-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jakarta-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/jakarta-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/jakarta-800.woff2", weight: "800", style: "normal" },
  ],
});

const dmSans = localFont({
  variable: "--font-dm",
  display: "swap",
  src: [
    { path: "./fonts/dm-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/dm-600.woff2", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "S R S P & Co — Chartered Accountants in Surat",
    template: "%s | S R S P & Co",
  },
  description:
    "S R S P & Co is a firm of Chartered Accountants in Surat offering income tax, GST, audit, accounting, company law and financial advisory services.",
  applicationName: SITE_NAME,
  keywords: [
    "chartered accountant in Surat",
    "CA firm Surat",
    "GST consultant Surat",
    "income tax filing Surat",
    "audit services Surat",
    "company law consultancy",
    "S R S P & Co",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: "/",
    title: "S R S P & Co — Chartered Accountants in Surat",
    description:
      "Taxation, audit, accounting, compliance and financial advisory services in Surat.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "S R S P & Co — Chartered Accountants in Surat",
    description:
      "Taxation, audit, accounting, compliance and financial advisory services in Surat.",
    images: [OG_IMAGE.url],
  },
  formatDetection: { telephone: true, email: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${plusJakarta.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
