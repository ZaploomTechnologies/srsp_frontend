import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CONTACT } from "@/lib/contact";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://srspco.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "S R S P & Co — Chartered Accountants in Surat",
    template: "%s",
  },
  description:
    "Professional chartered accounting services in Surat. Accuracy, Integrity, and Commitment — S R S P & Co.",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "S R S P & Co",
    title: "S R S P & Co — Chartered Accountants in Surat",
    description:
      "Taxation, audit, accounting, compliance and financial advisory services in Surat.",
    images: [{ url: "/images/office-reception.webp", width: 1200, height: 800 }],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "S R S P & Co",
  description: "Chartered Accountants in Surat — taxation, audit, accounting, compliance and advisory.",
  url: SITE_URL,
  telephone: `+91${CONTACT.phone.replace(/\D/g, "")}`,
  email: CONTACT.email.toLowerCase(),
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.line1,
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    postalCode: "395017",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
