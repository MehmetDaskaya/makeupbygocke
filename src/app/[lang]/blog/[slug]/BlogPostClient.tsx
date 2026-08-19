"use client";

import Link from "next/link";
import { RevealProvider } from "@/components/RevealProvider";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface PostData {
  slug: string;
  date: string;
  readingTime: number;
  category: string;
  title: string;
  description: string;
  content: string;
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

// Markdown-lite renderer — converts ## headings, **bold**, tables, and newlines
function renderContent(content: string) {
  const paragraphs = content.split(/\n\n+/);

  return paragraphs.map((block, i) => {
    // H2
    if (block.startsWith("## ")) {
      return <h2 key={i} className="blog-post__h2">{block.replace("## ", "")}</h2>;
    }
    // H3
    if (block.startsWith("### ")) {
      return <h3 key={i} className="blog-post__h3">{block.replace("### ", "")}</h3>;
    }
    // --- divider
    if (block.trim() === "---") {
      return <hr key={i} className="blog-post__divider" />;
    }
    // Table (markdown pipe table)
    if (block.includes("|") && block.includes("\n")) {
      const rows = block.split("\n").filter((r) => r.trim() && !r.match(/^[\|\s-]+$/));
      const cells = (row: string) =>
        row
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
      const [header, ...body] = rows;
      return (
        <div key={i} className="blog-post__table-wrap">
          <table className="blog-post__table">
            <thead>
              <tr>
                {cells(header).map((c, j) => (
                  <th key={j}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri}>
                  {cells(row).map((c, j) => (
                    <td key={j}>{inlineBold(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    // Bullet list
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="blog-post__list">
          {items.map((item, j) => (
            <li key={j}>{inlineBold(item.replace("- ", ""))}</li>
          ))}
        </ul>
      );
    }
    // Numbered list
    if (/^\d+\./.test(block)) {
      const items = block.split("\n").filter((l) => /^\d+\./.test(l));
      return (
        <ol key={i} className="blog-post__list blog-post__list--ordered">
          {items.map((item, j) => (
            <li key={j}>{inlineBold(item.replace(/^\d+\.\s/, ""))}</li>
          ))}
        </ol>
      );
    }
    // Regular paragraph
    return (
      <p key={i} className="blog-post__p">
        {inlineBold(block)}
      </p>
    );
  });
}

function inlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function BlogPostClient({
  post,
  lang,
  dict: _dict,
}: {
  post: PostData;
  lang: string;
  dict: any;
}) {
  const isTr = lang === "tr";
  const base = `/${lang}`;

  return (
    <RevealProvider>
      <div className="blog-post-page">
        <div className="container blog-post-page__container">
          {/* Breadcrumb */}
          <nav className="blog-post__breadcrumb reveal" aria-label="breadcrumb">
            <Link href={base}>{isTr ? "Ana Sayfa" : "Home"}</Link>
            <span> / </span>
            <Link href={`${base}/blog`}>{isTr ? "Blog" : "Blog"}</Link>
            <span> / </span>
            <span>{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="blog-post__header reveal">
            <div className="blog-post__meta">
              <span className="blog-card__category">
                {categoryLabels[post.category]?.[lang] ?? post.category}
              </span>
              <span className="blog-card__dot">·</span>
              <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
              <span className="blog-card__dot">·</span>
              <span>
                {post.readingTime} {isTr ? "dk okuma" : "min read"}
              </span>
            </div>
            <h1 className="blog-post__title">{post.title}</h1>
            <p className="blog-post__lead">{post.description}</p>
            <div className="gold-line" style={{ maxWidth: "8rem", margin: "2rem 0 0" }} />
          </header>

          {/* Article Body */}
          <article className="blog-post__body reveal">
            {renderContent(post.content)}
          </article>

          {/* Author box */}
          <aside className="blog-post__author reveal">
            <div className="blog-post__author-avatar">GD</div>
            <div>
              <p className="blog-post__author-name">Gökçe Dila Çağlayan</p>
              <p className="blog-post__author-bio">
                {isTr
                  ? "İstanbul gelin ve editöryal makyaj sanatçısı. Académie de Leyan ve Altier Academy mezunu."
                  : "Istanbul bridal and editorial makeup artist. Graduate of Académie de Leyan and Altier Academy."}
              </p>
            </div>
          </aside>

          {/* CTA */}
          <div className="blog-post__cta reveal">
            <p className="blog-post__cta-text">
              {isTr
                ? "Gelin makyajı hakkında daha fazla bilgi almak veya randevu oluşturmak için iletişime geçin."
                : "Get in touch to learn more about bridal makeup or to book your appointment."}
            </p>
            <div className="blog-post__cta-actions">
              <Link href={`${base}/contact`} className="btn">
                {isTr ? "Randevu Al" : "Book Now"}
              </Link>
              <Link href={`${base}/blog`} className="btn btn--ghost">
                {isTr ? "← Tüm Yazılar" : "← All Posts"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </RevealProvider>
  );
}
