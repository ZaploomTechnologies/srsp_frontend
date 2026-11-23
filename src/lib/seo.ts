import type { Metadata } from "next";
import { CONTACT } from "@/lib/contact";
import { services } from "@/lib/services";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://srspco.com";
export const SITE_NAME = "S R S P & Co";
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "S R S P & Co — Chartered Accountants, Surat",
};

/** Absolute URL for a site path such as "/about/". */
export const absoluteUrl = (path = "/") => `${SITE_URL}${path}`;

/** Per-page metadata with canonical URL and matching Open Graph / Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

const orgId = `${SITE_URL}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AccountingService", "ProfessionalService"],
        "@id": orgId,
        name: SITE_NAME,
        alternateName: "SRSP & Co Chartered Accountants",
        description:
          "Chartered Accountants in Surat offering taxation, audit, accounting, compliance and financial advisory services.",
        url: SITE_URL,
        logo: absoluteUrl("/og-image.jpg"),
        image: absoluteUrl("/og-image.jpg"),
        telephone: `+91${CONTACT.phone.replace(/\D/g, "")}`,
        email: CONTACT.email.toLowerCase(),
        identifier: "ICAI Firm Registration No. 153921W",
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.address.line1,
          addressLocality: "Surat",
          addressRegion: "Gujarat",
          postalCode: "395017",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: 21.1621, longitude: 72.8096 },
        areaServed: [
          { "@type": "City", name: "Surat" },
          { "@type": "State", name: "Gujarat" },
          { "@type": "Country", name: "India" },
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "19:00",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              url: absoluteUrl(`/services/${s.slug}/`),
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function serviceJsonLd(service: { title: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}/`),
    provider: { "@id": orgId },
    areaServed: { "@type": "City", name: "Surat" },
  };
}
