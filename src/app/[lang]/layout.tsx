import { notFound } from "next/navigation";
import { hasLocale, getDictionary, locales } from "./dictionaries";
import type { Locale } from "./dictionaries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { FloatContact } from "@/components/FloatContact";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";

const BASE_URL = "https://makeupbygocke.com";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (hasLocale(lang) ? lang : "tr") as Locale;

  const titles: Record<Locale, string> = {
    tr: "İstanbul Gelin Makyaj Sanatçısı | Gökçe Dila Çağlayan",
    en: "Istanbul Bridal Makeup Artist | Gökçe Dila Çağlayan",
  };
  const descriptions: Record<Locale, string> = {
    tr: "İstanbul'un gelin ve editöryal makyaj sanatçısı Gökçe Dila Çağlayan. Düğün makyajı, nişan, özel gün ve fotoğraf çekimi makyajı. Maltepe, Kadıköy, Küçükyalı ve tüm İstanbul genelinde hizmet.",
    en: "Istanbul bridal & editorial makeup artist Gökçe Dila Çağlayan. Wedding makeup, engagement, special events and photo shoot makeup. Serving all Istanbul districts.",
  };

  const ogImage = {
    url: `${BASE_URL}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: locale === "tr"
      ? "Gökçe Dila Çağlayan - İstanbul Gelin Makyaj Sanatçısı"
      : "Gökçe Dila Çağlayan - Istanbul Bridal Makeup Artist",
  };

  return {
    metadataBase: new URL(BASE_URL),
    verification: {
      google: "jS55Rt3-PE65bTFNLhqwc7JY34_yuzvYuVIoUigqUfQ",
    },
    title: {
      default: titles[locale],
      template: `%s | Gökçe Dila Çağlayan`,
    },
    description: descriptions[locale],
    keywords: locale === "tr"
      ? ["gelin makyajı", "istanbul makyaj sanatçısı", "düğün makyajı", "editöryal makyaj", "makyaj sanatçısı istanbul", "gelin makyajı maltepe", "gelin makyajı kadıköy", "makeupbygocke", "Gökçe Dila Çağlayan"]
      : ["bridal makeup istanbul", "istanbul makeup artist", "wedding makeup istanbul", "editorial makeup", "makeupbygocke"],
    authors: [{ name: "Gökçe Dila Çağlayan", url: BASE_URL }],
    creator: "Gökçe Dila Çağlayan",
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: "website",
      url: `${BASE_URL}/${locale}`,
      siteName: "Makeup by Gökçe",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? "en_US" : "tr_TR",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: [ogImage.url],
      creator: "@makeupbygocke",
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "tr": `${BASE_URL}/tr`,
        "en": `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/tr`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// JSON-LD Yapısal Veri — LocalBusiness + BeautyBusiness
function LocalBusinessSchema({ lang }: { lang: string }) {
  const isTr = lang === "tr";
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "BeautyBusiness"],
    "@id": `${BASE_URL}/${lang}`,
    "name": "Makeup by Gökçe | Gökçe Dila Çağlayan",
    "alternateName": ["makeupbygocke", "Gökçe Dila Çağlayan Makyaj"],
    "description": isTr
      ? "İstanbul'un gelin ve editöryal makyaj sanatçısı. Düğün, nişan, fotoğraf çekimi ve özel gün makyajı."
      : "Istanbul bridal and editorial makeup artist. Wedding, engagement, photo shoot and special event makeup.",
    "url": `${BASE_URL}/${lang}`,
    "logo": `${BASE_URL}/logo.png`,
    "image": `${BASE_URL}/og-image.jpg`,
    "telephone": null,
    "priceRange": "₺₺₺",
    "currenciesAccepted": "TRY",
    "paymentAccepted": isTr ? "Nakit, Kredi Kartı, EFT" : "Cash, Credit Card, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Maltepe",
      "addressRegion": "İstanbul",
      "addressCountry": "TR",
      "postalCode": "34840",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.9341",
      "longitude": "29.1868",
    },
    "areaServed": [
      { "@type": "City", "name": "İstanbul" },
      { "@type": "AdministrativeArea", "name": "Maltepe" },
      { "@type": "AdministrativeArea", "name": "Kadıköy" },
      { "@type": "AdministrativeArea", "name": "Küçükyalı" },
    ],
    "serviceType": isTr
      ? ["Gelin Makyajı", "Editöryal Makyaj", "Düğün Makyajı", "Fotoğraf Çekimi Makyajı", "Özel Gün Makyajı", "Deneme Seans Makyajı"]
      : ["Bridal Makeup", "Editorial Makeup", "Wedding Makeup", "Photo Shoot Makeup", "Special Event Makeup"],
    "knowsAbout": ["Gelin Makyajı", "Editöryal Makyaj", "Smokey Eye", "Natural Glow Makeup", "Académie de Leyan", "Altier Academy"],
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "09:00",
      "closes": "20:00",
    }],
    "sameAs": [
      "https://www.instagram.com/makeupbygocke/",
    ],
    "hasMap": "https://maps.google.com/?q=Maltepe,+%C4%B0stanbul",
    "founder": {
      "@type": "Person",
      "name": "Gökçe Dila Çağlayan",
      "jobTitle": isTr ? "Makyaj Sanatçısı" : "Makeup Artist",
      "worksFor": { "@type": "LocalBusiness", "name": "Makeup by Gökçe" },
      "sameAs": ["https://www.instagram.com/makeupbygocke/"],
      "knowsAbout": ["Gelin Makyajı", "Editöryal Makyaj", "Moda Makyajı"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <LocalBusinessSchema lang={lang} />
      </head>
      <body>
        <Navbar dict={dict.nav} lang={lang} />
        <main>{children}</main>
        <Footer dict={dict.footer} />
        <MobileCTA dict={dict.nav} lang={lang} />
        <FloatContact dict={dict.floatContact} />
        <Analytics />
      </body>
    </html>
  );
}
