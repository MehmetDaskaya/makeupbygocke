"use client";

import Link from "next/link";
import { RevealProvider } from "@/components/RevealProvider";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface BlogPost {
  slug: string;
  date: string;
  readingTime: number;
  category: string;
  title: string;
  description: string;
}

const categoryLabels: Record<string, Record<string, string>> = {
  bridal: { tr: "Gelin Makyajı", en: "Bridal Makeup" },
  editorial: { tr: "Editöryal", en: "Editorial" },
  tips: { tr: "İpuçları", en: "Tips & Tricks" },
};

function formatDate(dateStr: string, lang: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogListClient({
  posts,
  lang,
  dict,
}: {
  posts: BlogPost[];
  lang: string;
  dict: any;
}) {
  const isTr = lang === "tr";
  const base = `/${lang}`;

  return (
    <RevealProvider>
      <div className="blog-page">
        <div className="container">
          {/* Header */}
          <div className="blog-page__header reveal">
            <span className="label mb-sm" style={{ display: "block" }}>
              {isTr ? "Makyaj Rehberi" : "Makeup Guide"}
            </span>
            <h1 className="display-lg">
              {isTr ? "Blog & İpuçları" : "Blog & Tips"}
            </h1>
            <div
              className="gold-line mt-md"
              style={{ maxWidth: "10rem", margin: "1.5rem auto 0" }}
            />
            <p className="body-text mt-lg" style={{ maxWidth: "520px", margin: "1.5rem auto 0" }}>
              {isTr
                ? "Gelin makyajından editöryal çekime, profesyonel makyajın perde arkasına dair notlar ve rehberler."
                : "Notes and guides on everything from bridal makeup to editorial shoots — the professional side of makeup artistry."}
            </p>
          </div>

          {/* Posts Grid */}
          <div className="blog-grid">
            {posts.map((post, i) => (
              <article key={post.slug} className={`blog-card reveal${i === 0 ? " blog-card--featured" : ""}`}>
                <Link href={`${base}/blog/${post.slug}`} className="blog-card__inner">
                  <div className="blog-card__meta">
                    <span className="blog-card__category">
                      {categoryLabels[post.category]?.[lang] ?? post.category}
                    </span>
                    <span className="blog-card__dot">·</span>
                    <span className="blog-card__date">{formatDate(post.date, lang)}</span>
                    <span className="blog-card__dot">·</span>
                    <span className="blog-card__read">
                      {post.readingTime} {isTr ? "dk okuma" : "min read"}
                    </span>
                  </div>
                  <h2 className="blog-card__title">{post.title}</h2>
                  <p className="blog-card__desc">{post.description}</p>
                  <span className="blog-card__cta">
                    {isTr ? "Devamını Oku" : "Read More"} →
                  </span>
                </Link>
              </article>
            ))}
          </div>

          {/* Back to home */}
          <div className="blog-page__back reveal">
            <Link href={base} className="btn btn--ghost">
              {isTr ? "← Ana Sayfa" : "← Home"}
            </Link>
          </div>
        </div>
      </div>
    </RevealProvider>
  );
}
