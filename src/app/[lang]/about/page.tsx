import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (hasLocale(lang) ? lang : "tr") as Locale;
  const titles: Record<Locale, string> = {
    tr: "Hakkımda | Gökçe Dila Çağlayan",
    en: "About | Gökçe Dila Çağlayan",
  };
  const descriptions: Record<Locale, string> = {
    tr: "Makyaj sanatçısı Gökçe Dila Çağlayan hakkında.",
    en: "About makeup artist Gökçe Dila Çağlayan.",
  };
  return { title: titles[locale], description: descriptions[locale] };
}

const PORTRAIT = "/images/gockecekim3.jpeg";
const BACKSTAGE = [
  "/images/gockecekim5.jpeg",
  "/images/gokcecekim4.jpeg",
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
          <div className="about-page__portrait">
            <Image src={PORTRAIT} alt="Gökçe Dila Çağlayan" fill unoptimized sizes="(max-width:1024px) 100vw, 36vw" priority />
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

            {BACKSTAGE.map((src, i) => (
              <div key={i} className="backstage-img">
                <Image src={src} alt="Backstage moment" fill unoptimized sizes="(max-width:768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
