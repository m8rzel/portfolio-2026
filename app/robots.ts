import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://marcelwiskow.de/sitemap.xml",
    host: "https://marcelwiskow.de",
  };
}
