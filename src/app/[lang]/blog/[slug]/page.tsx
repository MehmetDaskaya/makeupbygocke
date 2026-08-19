import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import type { Locale } from "../../dictionaries";
import { BlogPostClient } from "./BlogPostClient";
import { blogPosts } from "@/lib/blog-data";

const BASE_URL = "https://makeupbygocke.com";

export async function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    ["tr", "en"].map((lang) => ({ lang, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = (hasLocale(lang) ? lang : "tr") as Locale;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post[locale].title,
    description: post[locale].description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        tr: `${BASE_URL}/tr/blog/${slug}`,
        en: `${BASE_URL}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post[locale].title,
      description: post[locale].description,
      type: "article",
      publishedTime: post.date,
      authors: ["Gökçe Dila Çağlayan"],
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const dict = await getDictionary(lang);

  // JSON-LD Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post[locale].title,
    "description": post[locale].description,
    "author": {
      "@type": "Person",
      "name": "Gökçe Dila Çağlayan",
      "url": `${BASE_URL}/${locale}`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Makeup by Gökçe",
      "url": BASE_URL,
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "url": `${BASE_URL}/${locale}/blog/${slug}`,
    "image": `${BASE_URL}/og-image.jpg`,
    "inLanguage": locale === "tr" ? "tr-TR" : "en-US",
    "about": {
      "@type": "Thing",
      "name": locale === "tr" ? "Gelin Makyajı" : "Bridal Makeup",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostClient
        post={{
          slug: post.slug,
          date: post.date,
          readingTime: post.readingTime,
          category: post.category,
          title: post[locale].title,
          description: post[locale].description,
          content: post[locale].content,
        }}
        lang={lang}
        dict={dict}
      />
    </>
  );
}
