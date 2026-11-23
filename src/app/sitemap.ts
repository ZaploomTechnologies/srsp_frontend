import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about/", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact/", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy-policy/", priority: 0.2, changeFrequency: "yearly" },
    { path: "/disclaimer/", priority: 0.2, changeFrequency: "yearly" },
  ];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), lastModified, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
