import type { MetadataRoute } from "next";

const BASE_URL = "https://makeupbygocke.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["tr", "en"];
  const pages = [
    { path: "",           priority: 1.0, freq: "weekly" as const },
    { path: "/portfolio", priority: 0.9, freq: "monthly" as const },
    { path: "/services",  priority: 0.8, freq: "monthly" as const },
    { path: "/about",     priority: 0.7, freq: "monthly" as const },
    { path: "/contact",   priority: 0.7, freq: "monthly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.freq,
        priority: locale === "tr" ? page.priority : page.priority * 0.9, // TR sayfaları öncelikli
        alternates: {
          languages: {
            tr: `${BASE_URL}/tr${page.path}`,
            en: `${BASE_URL}/en${page.path}`,
          },
        },
      });
    }
  }

  return entries;
}
