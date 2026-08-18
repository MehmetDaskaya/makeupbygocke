import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { ServicesClient } from "./ServicesClient";

const BASE_URL = "https://makeupbygocke.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (hasLocale(lang) ? lang : "tr") as Locale;

  const titles: Record<Locale, string> = {
    tr: "Gelin Makyajı Fiyatları & Hizmetler | İstanbul | Gökçe Dila Çağlayan",
    en: "Bridal Makeup Prices & Services | Istanbul | Gökçe Dila Çağlayan",
  };

  const descriptions: Record<Locale, string> = {
    tr: "İstanbul gelin makyajı, düğün makyajı, editöryal çekim makyajı ve özel gün hizmetleri. Deneme seansı ve fiyat bilgisi için iletişime geçin. Maltepe, Kadıköy, Küçükyalı ve tüm İstanbul.",
    en: "Istanbul bridal makeup, wedding makeup, editorial shoot makeup and special event services. Contact for trial sessions and pricing. Serving all Istanbul districts.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages: {
        tr: `${BASE_URL}/tr/services`,
        en: `${BASE_URL}/en/services`,
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}/services`,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return <ServicesClient dict={dict} lang={lang} />;
}
