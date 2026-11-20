import type { MetadataRoute } from "next";
import { wedding } from "@/lib/wedding";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = wedding.siteUrl.trim().replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
