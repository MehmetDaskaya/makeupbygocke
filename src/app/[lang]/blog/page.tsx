import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { BlogListClient } from "./BlogListClient";
import { blogPosts } from "@/lib/blog-data";

const BASE_URL = "https://makeupbygocke.com";

export async function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (hasLocale(lang) ? lang : "tr") as Locale;

  const titles: Record<Locale, string> = {
    tr: "Makyaj Rehberi & Blog | Gökçe Dila Çağlayan",
    en: "Makeup Guide & Blog | Gökçe Dila Çağlayan",
  };

  const descriptions: Record<Locale, string> = {
    tr: "Gelin makyajı nasıl seçilir, makyaj kalıcılığı sırları ve editöryal makyaj rehberi. İstanbul makyaj sanatçısı Gökçe Dila Çağlayan'dan profesyonel ipuçları.",
    en: "How to choose bridal makeup, makeup longevity secrets, and an editorial makeup guide. Professional tips from Istanbul makeup artist Gökçe Dila Çağlayan.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: {
        tr: `${BASE_URL}/tr/blog`,
        en: `${BASE_URL}/en/blog`,
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}/blog`,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  const dict = await getDictionary(lang);
  const posts = blogPosts.map((p) => ({
    slug: p.slug,
    date: p.date,
    readingTime: p.readingTime,
    category: p.category,
    title: p[locale].title,
    description: p[locale].description,
  }));

  return <BlogListClient posts={posts} lang={lang} dict={dict} />;
}
