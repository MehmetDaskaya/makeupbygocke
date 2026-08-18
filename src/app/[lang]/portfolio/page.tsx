import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { PortfolioClient } from "./PortfolioClient";

const BASE_URL = "https://makeupbygocke.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (hasLocale(lang) ? lang : "tr") as Locale;

  const titles: Record<Locale, string> = {
    tr: "Gelin Makyajı Portfolyosu | İstanbul | Gökçe Dila Çağlayan",
    en: "Bridal Makeup Portfolio | Istanbul | Gökçe Dila Çağlayan",
  };

  const descriptions: Record<Locale, string> = {
    tr: "İstanbul makyaj sanatçısı Gökçe Dila Çağlayan'ın gelin makyajı, editöryal çekim ve özel gün portfolyosu. 200'den fazla mutlu gelin. Düğün, nişan ve davet makyajı fotoğrafları.",
    en: "Portfolio of Istanbul makeup artist Gökçe Dila Çağlayan — bridal, editorial and special occasion makeup. Over 200 happy brides. Wedding, engagement and event makeup photography.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `${BASE_URL}/${locale}/portfolio`,
      languages: {
        tr: `${BASE_URL}/tr/portfolio`,
        en: `${BASE_URL}/en/portfolio`,
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}/portfolio`,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return <PortfolioClient dict={dict} lang={lang} />;
}
