"use client";

import Link from "next/link";
import Image from "next/image";
import { RevealProvider } from "@/components/RevealProvider";

/* eslint-disable @typescript-eslint/no-explicit-any */

const imgs = {
  hero: "/images/gockecekim1.jpeg",
  strip: [
    { src: "/images/bridal.jpeg" },
    { src: "/images/eyeliner.jpeg" },
    { src: "/images/oyku2.jpeg" },
    { src: "/images/cilek1.jpeg" },
  ],
  gridLarge: "/images/beyazmodel.jpeg",
  gridSmall1: "/images/bridal2.jpeg",
  gridSmall2: "/images/yesil1.jpeg",
  about: "/images/gockecekim2.jpeg",
};

export function HomeClient({ dict, lang }: { dict: any; lang: string }) {
  const base = `/${lang}`;

  // Dictionary items for featured strip cards
  const featuredItems = dict.featured.items || [
    { tag: "BRIDAL COUTURE", title: "Lüks Gelin İmzası · Soft Glam" },
    { tag: "EDITORIAL", title: "Vogue Beauty Concept" },
    { tag: "NATURAL GLOW", title: "Zarif & Işıltılı Dokunuş" },
    { tag: "HIGH FASHION", title: "Kreatif Çekim Koleksiyonu" }
  ];

  return (
    <RevealProvider>
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero__bg">
          <Image
            src={imgs.hero}
            alt="Gökçe Dila Çağlayan - Makyaj Sanatçısı"
            fill
            priority
            unoptimized
            sizes="100vw"
            style={{ objectPosition: "center 25%" }}
          />
        </div>
        <div className="hero__vignette" />

        {/* Sol Üst Tagline */}
        <div className="hero__eyebrow-topleft">
          <span className="gold-line--left" />
          <span className="label">{dict.hero.tagline}</span>
        </div>

        {/* Sağ Taraf İçerik Kutusu (Makyaj yapılan yüzün açıkta kalması için) */}
        <div className="hero__content container">
          <div className="hero__right-box">
            <h1 className="hero__title">
              Gökçe Dila<br />Çağlayan
            </h1>

            <p className="hero__subtitle">
              {dict.hero.subtitle}&nbsp;&nbsp;·&nbsp;&nbsp;{dict.hero.location}
            </p>

            <div className="hero__cta-row">
              <Link href={`${base}/contact`} className="btn btn--hero-prominent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{dict.nav.bookNow}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero__scroll-hint">
          <span>{lang === "tr" ? "KAYDIR" : "SCROLL"}</span>
        </div>
      </section>

      {/* ─── SECTION 2: SEÇKİN ÇALIŞMALAR ─── */}
      <section className="featured">
        <div className="container">
          <div className="featured__header reveal">
            <div>
              <span className="label mb-sm" style={{ display: "block" }}>{dict.featured.label || "Seçkin Çalışmalar"}</span>
              <h2 className="display-lg">{dict.featured.subtitle}</h2>
            </div>
            <Link href={`${base}/portfolio`} className="btn--ghost">{dict.portfolioPreview.viewAll} &rarr;</Link>
          </div>

          <div className="featured__grid stagger">
            {imgs.strip.map((img, i) => {
              const item = featuredItems[i] || { tag: "", title: "" };
              return (
                <Link key={i} href={`${base}/portfolio`} className="featured__card">
                  <div className="featured__card-img">
                    <Image src={img.src} alt={item.title} fill unoptimized sizes="(max-width:768px) 50vw, 25vw" />
                    <div className="featured__card-overlay">
                      <span className="featured__card-tag">{item.tag}</span>
                      <p className="display-sm">{item.title}</p>
                    </div>
                  </div>
                  <div className="featured__card-meta">
                    <span className="featured__card-tag">{item.tag}</span>
                    <p className="featured__card-title">{item.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: MAGAZINE SPREAD ─── */}
      <section className="spread">
        <div className="container">
          <div className="spread__header reveal">
            <span className="label mb-sm" style={{ display: "block" }}>{dict.portfolioPreview.label || "Öne Çıkan Seçki"}</span>
            <h2 className="display-lg">{dict.portfolioPreview.subtitle}</h2>
          </div>

          <div className="spread__grid stagger">
            <div className="spread__main">
              <Image src={imgs.gridLarge} alt={dict.portfolioPreview.mainTitle} fill unoptimized sizes="(max-width:1024px) 100vw, 58vw" />
              <div className="spread__caption">
                <span className="label mb-sm" style={{ display: "block" }}>{dict.portfolioPreview.mainTag}</span>
                <h3 className="display-md">{dict.portfolioPreview.mainTitle}</h3>
                <p className="body-small mt-sm">{dict.portfolioPreview.mainText}</p>
              </div>
            </div>

            <div className="spread__side">
              <div className="spread__thumb">
                <Image src={imgs.gridSmall1} alt={dict.portfolioPreview.side1Title} fill unoptimized sizes="(max-width:1024px) 100vw, 42vw" />
                <div className="spread__thumb-caption">
                  <span className="label" style={{ display: "block", marginBottom: "0.25rem" }}>{dict.portfolioPreview.side1Tag}</span>
                  <p className="display-sm">{dict.portfolioPreview.side1Title}</p>
                </div>
              </div>
              <div className="spread__thumb">
                <Image src={imgs.gridSmall2} alt={dict.portfolioPreview.side2Title} fill unoptimized sizes="(max-width:1024px) 100vw, 42vw" />
                <div className="spread__thumb-caption">
                  <span className="label" style={{ display: "block", marginBottom: "0.25rem" }}>{dict.portfolioPreview.side2Tag}</span>
                  <p className="display-sm">{dict.portfolioPreview.side2Title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: HİZMETLER ─── */}
      <section className="services">
        <div className="container">
          <div className="services__header reveal">
            <span className="label mb-sm" style={{ display: "block" }}>{dict.servicesSnapshot.title}</span>
            <h2 className="display-lg">{dict.servicesSnapshot.subtitle}</h2>
          </div>

          <div className="services__grid stagger">
            {[
              dict.servicesSnapshot.bridal,
              dict.servicesSnapshot.editorial,
              dict.servicesSnapshot.event,
              dict.servicesSnapshot.trial,
            ].map((s: any, i: number) => (
              <div key={i} className="services__card">
                <span className="services__num">0{i + 1}</span>
                <h3 className="services__title">{s.title}</h3>
                <p className="body-text">{s.description}</p>
                <Link href={`${base}/services`} className="btn--ghost">{dict.servicesSnapshot.learnMore} &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4.5: PREMIUM MARKALAR VE HİJYEN ─── */}
      <section className="brand-hygiene">
        <div className="container">
          <div className="brand-hygiene__header reveal">
            <span className="label mb-sm" style={{ display: "block" }}>{dict.brandHygiene.title}</span>
            <h2 className="display-lg">{dict.brandHygiene.subtitle}</h2>
            <div className="gold-line mt-md" style={{ maxWidth: "12rem", margin: "1.5rem auto 0" }} />
          </div>

          <div className="brand-hygiene__grid stagger">
            <div className="brand-hygiene__card">
              <div className="brand-hygiene__icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="brand-hygiene__card-title">{dict.brandHygiene.brandsTitle}</h3>
              <p className="body-text">{dict.brandHygiene.brandsDesc}</p>
              <div className="brand-hygiene__logos">
                <span>MAC</span>
                <span>CHARLOTTE TILBURY</span>
                <span>MAKE UP FOR EVER</span>
                <span>HUDA BEAUTY</span>
                <span>DIOR</span>
                <span>KRYOLAN</span>
                <span>SEPHORA</span>
              </div>
            </div>

            <div className="brand-hygiene__card">
              <div className="brand-hygiene__icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="brand-hygiene__card-title">{dict.brandHygiene.hygieneTitle}</h3>
              <p className="body-text">{dict.brandHygiene.hygieneDesc}</p>
              <ul className="brand-hygiene__checklist">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {lang === "tr" ? "Tek Kullanımlık Aplikatörler" : "Single-Use Disposable Applicators"}
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {lang === "tr" ? "Sıfır Çift Daldırma (Zero Double-Dipping)" : "Strict Zero Double-Dipping Policy"}
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {lang === "tr" ? "Steril Fırça ve Aletler" : "Sanitized & Sterilized Tools"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: SANATÇI HAKKINDA ─── */}
      <section className="about-teaser">
        <div className="container">
          <div className="about-teaser__grid">
            <div className="about-teaser__img reveal-left">
              <Image src={imgs.about} alt={lang === "tr" ? "Gökçe Dila Çağlayan - İstanbul gelin makyaj sanatçısı" : "Gökçe Dila Çağlayan - Istanbul bridal makeup artist"} fill unoptimized sizes="(max-width:1024px) 100vw, 42vw" />
            </div>

            <div className="about-teaser__content reveal">
              <span className="label">{dict.aboutTeaser.title}</span>
              <h2 className="display-lg">{dict.aboutTeaser.subtitle}</h2>
              <span className="about-teaser__divider" />
              <p className="body-text">{dict.aboutTeaser.text}</p>
              <div>
                <Link href={`${base}/about`} className="btn">{dict.aboutTeaser.cta}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: REZERVASYON CTA ─── */}
      <section className="final-cta">
        <div className="container--narrow text-center">
          <div className="gold-line mb-lg reveal" />
          <h2 className="display-lg reveal">{dict.finalCta.title}</h2>
          <p className="body-text mt-md mb-lg reveal">{dict.finalCta.subtitle}</p>
          <Link href={`${base}/contact`} className="btn btn--gold reveal">{dict.finalCta.cta}</Link>

          <div className="final-cta__trust reveal">
            {dict.finalCta.trustItems.map((item: string, i: number) => (
              <span key={i} className="final-cta__trust-item">{item}</span>
            ))}
          </div>
        </div>
      </section>
    </RevealProvider>
  );
}
