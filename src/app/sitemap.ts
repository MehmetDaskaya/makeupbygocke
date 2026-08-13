import type { MetadataRoute } from "next";

const baseUrl = "https://gockedila.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["tr", "en"];
  const pages = ["", "/portfolio", "/services", "/about", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : page === "/portfolio" ? 0.9 : 0.7,
        alternates: {
          languages: {
            tr: `${baseUrl}/tr${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      });
    }
  }

  return entries;
}
