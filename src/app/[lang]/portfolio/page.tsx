import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { PortfolioClient } from "./PortfolioClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (hasLocale(lang) ? lang : "tr") as Locale;

  const titles: Record<Locale, string> = {
    tr: "Portfolyo | Gökçe Dila Çağlayan",
    en: "Portfolio | Gökçe Dila Çağlayan",
  };

  const descriptions: Record<Locale, string> = {
    tr: "Gelin makyajı, editöryal çekim ve özel gün makyajı portfolyosu. İstanbul'un en iyi makyaj sanatçısı Gökçe Dila Çağlayan.",
    en: "Bridal makeup, editorial shoot, and special event makeup portfolio. Istanbul's finest makeup artist Gökçe Dila Çağlayan.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
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
