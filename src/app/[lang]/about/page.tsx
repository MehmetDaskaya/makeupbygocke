import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";

const BASE_URL = "https://makeupbygocke.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (hasLocale(lang) ? lang : "tr") as Locale;
  const titles: Record<Locale, string> = {
    tr: "Makyaj Sanatçısı Hakkında | Gökçe Dila Çağlayan | İstanbul",
    en: "About the Makeup Artist | Gökçe Dila Çağlayan | Istanbul",
  };
  const descriptions: Record<Locale, string> = {
    tr: "İstanbul'un gelin ve editöryal makyaj sanatçısı Gökçe Dila Çağlayan hakkında. Uzmanlık, sertifikalar, benzersiz sanat anlayışı ve profesyonel gelin makyajı deneyimi.",
    en: "About Istanbul bridal and editorial makeup artist Gökçe Dila Çağlayan. Expertise, certifications, unique artistic vision and professional bridal makeup experience.",
  };
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        tr: `${BASE_URL}/tr/about`,
        en: `${BASE_URL}/en/about`,
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}/about`,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

const PORTRAIT = "/images/gockecekim3.jpeg";
const BACKSTAGE: { src: string; altTr: string; altEn: string }[] = [
  {
    src: "/images/gockecekim5.jpeg",
    altTr: "Gökçe Dila Çağlayan - Set çekimi hazırlık anı",
    altEn: "Gökçe Dila Çağlayan - behind the scenes shoot preparation",
  },
  {
    src: "/images/gokcecekim4.jpeg",
    altTr: "Gökçe Dila Çağlayan - backstage makyaj uygulaması",
    altEn: "Gökçe Dila Çağlayan - backstage makeup application",
  },
];
const VIDEO = "/images/gockecekim7.mov";

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const base = `/${lang}`;

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-page__grid">
          {/* Portre */}
          <div className="about-page__portrait-wrap">
            <div className="about-page__portrait">
              <Image src={PORTRAIT} alt={lang === "tr" ? "Gökçe Dila Çağlayan - İstanbul makyaj sanatçısı portresi" : "Gökçe Dila Çağlayan - Istanbul makeup artist portrait"} fill unoptimized sizes="(max-width:1024px) 100vw, 36vw" priority />
            </div>
          </div>

          {/* İçerik */}
          <div className="about-page__content">
            <span className="label">{dict.about.title}</span>

            <h1 className="display-lg">{dict.about.headline}</h1>

            <div className="gold-line" style={{ maxWidth: "3rem" }} />

            <div>
              {dict.about.story.map((p: string, i: number) => (
                <p key={i} className="body-text" style={{ marginBottom: "1.25rem" }}>{p}</p>
              ))}
            </div>

            {/* Felsefe */}
            <div className="about-page__philosophy">
              <h2 className="display-sm mb-sm">{dict.about.philosophy.title}</h2>
              <p className="body-text" style={{ fontStyle: "italic" }}>"{dict.about.philosophy.text}"</p>
            </div>

            {/* Uzmanlık */}
            <div>
              <h2 className="display-sm mb-md">{dict.about.credentials.title}</h2>
              <ul className="about-page__credentials-list">
                {dict.about.credentials.items.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <Link href={`${base}/contact`} className="btn">{dict.nav.bookNow}</Link>
            </div>
          </div>
        </div>

        {/* Backstage Video & Fotoğraflar */}
        <div className="about-page__backstage">
          <div className="about-page__backstage-header">
            <span className="label mb-sm" style={{ display: "block" }}>{dict.about.backstageLabel || "KULİS VE SANATÇI ANLARI"}</span>
            <h2 className="display-md">{dict.about.backstageTitle || "Set & Backstage Çekim Kayıtları"}</h2>
          </div>
          <div className="about-page__backstage-grid">
            {/* Canlı Çekim Video Kartı */}
            <div className="backstage-img backstage-video-wrapper">
              <video
                src={VIDEO}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="backstage-video"
              />
              <span className="backstage-video-badge">LIVE SET</span>
            </div>

            {BACKSTAGE.map((item, i) => (
              <div key={i} className="backstage-img-wrap">
                <div className="backstage-img">
                  <Image src={item.src} alt={lang === "tr" ? item.altTr : item.altEn} fill unoptimized sizes="(max-width:768px) 100vw, 33vw" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
