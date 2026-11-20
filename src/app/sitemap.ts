import type { MetadataRoute } from "next";
import { wedding } from "@/lib/wedding";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = wedding.siteUrl.trim().replace(/\/$/, "");
  if (!siteUrl) return [];
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-11-20"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
