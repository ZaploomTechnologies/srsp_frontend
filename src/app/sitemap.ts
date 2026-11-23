import type { MetadataRoute } from "next";
import { services } from "@/lib/services";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://srspco.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "about", "services", "contact", "privacy-policy", "disclaimer"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}/${p ? `${p}/` : ""}` })),
    ...services.map((s) => ({ url: `${SITE_URL}/services/${s.slug}/` })),
  ];
}
