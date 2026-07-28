import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://dri-growth-site.sgolovko7.chatgpt.site/sitemap.xml",
  };
}
