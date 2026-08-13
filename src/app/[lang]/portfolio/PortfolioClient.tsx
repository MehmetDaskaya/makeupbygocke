"use client";

import { useState } from "react";
import Image from "next/image";
import { RevealProvider } from "@/components/RevealProvider";
import { Lightbox } from "@/components/Lightbox";
import { portfolioImages, type PortfolioCategory } from "@/lib/portfolio-data";

/* eslint-disable @typescript-eslint/no-explicit-any */

const CATEGORIES: Array<{ key: string; filterKey: PortfolioCategory | "all" }> = [
  { key: "all",       filterKey: "all" },
  { key: "bridal",    filterKey: "bridal" },
  { key: "wedding",   filterKey: "wedding" },
  { key: "editorial", filterKey: "editorial" },
  { key: "event",     filterKey: "event" },
  { key: "natural",   filterKey: "natural" },
];

export function PortfolioClient({ dict, lang }: { dict: any; lang: string }) {
  const [active, setActive] = useState<PortfolioCategory | "all">("all");
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIdx, setLbIdx]   = useState(0);

  const filtered = active === "all"
    ? portfolioImages
    : portfolioImages.filter(img => img.category === active);

  return (
    <RevealProvider>
      <div className="portfolio-page">
        <div className="container">
          {/* Header */}
          <div className="portfolio-page__header reveal">
            <span className="label mb-sm" style={{ display: "block" }}>{dict.portfolio.title}</span>
            <h1 className="display-lg">{dict.portfolio.subtitle}</h1>
            <div className="gold-line mt-md" style={{ maxWidth: "12rem", margin: "1.5rem auto 0" }} />
          </div>

          {/* Tam Boyut Canlı Set Video Banner */}
          <div className="portfolio-video-banner reveal">
            <div className="portfolio-video-container">
              <video
                src="/images/gockecekim7.mov"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="portfolio-video-element"
              />
              <div className="portfolio-video-overlay">
                <span className="label color-gold" style={{ display: "block", marginBottom: "0.5rem" }}>
                  LIVE SET & BACKSTAGE
                </span>
                <h2 className="display-md" style={{ color: "#FFFFFF" }}>
                  {lang === "tr" ? "Canlı Çekim & Kulis Atmosferi" : "Live Shoot & Backstage Atmosphere"}
                </h2>
                <p className="body-small" style={{ color: "rgba(255,255,255,0.82)", marginTop: "0.4rem" }}>
                  {lang === "tr"
                    ? "Set ortamından canlı makyaj tasarımı ve hazırlık anları"
                    : "Behind-the-scenes makeup artistry and set moments"}
                </p>
              </div>
            </div>
          </div>

          {/* Filtre Butonları */}
          <div className="portfolio-filters reveal">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`portfolio-filter-btn${active === cat.filterKey ? " active" : ""}`}
                onClick={() => setActive(cat.filterKey)}
              >
                {dict.portfolio.filters[cat.key]}
              </button>
            ))}
          </div>

          {/* Fotoğraf Galerisi Grid */}
          <div className="portfolio-grid">
            {filtered.map((img, i) => (
              <div key={img.id} className="portfolio-item" onClick={() => { setLbIdx(i); setLbOpen(true); }}>
                <Image
                  src={img.src}
                  alt={lang === "tr" ? img.alt : img.altEn}
                  fill
                  unoptimized
                  sizes="(max-width:768px) 50vw, 25vw"
                />
                <div className="portfolio-item__overlay">
                  <p className="display-sm">{lang === "tr" ? (img.caption || img.alt) : (img.captionEn || img.altEn)}</p>
                  <span className="label mt-sm" style={{ display: "block" }}>{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        images={filtered.map(img => ({ ...img }))}
        currentIndex={lbIdx}
        isOpen={lbOpen}
        onClose={() => setLbOpen(false)}
        onNavigate={setLbIdx}
        lang={lang}
        dict={dict.portfolio}
      />
    </RevealProvider>
  );
}
