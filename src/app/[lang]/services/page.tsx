import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { ServicesClient } from "./ServicesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (hasLocale(lang) ? lang : "tr") as Locale;

  const titles: Record<Locale, string> = {
    tr: "Hizmetler | Gökçe Dila Çağlayan",
    en: "Services | Gökçe Dila Çağlayan",
  };

  const descriptions: Record<Locale, string> = {
    tr: "Gelin makyajı, editöryal makyaj, özel gün makyajı ve deneme seansı hizmetleri. İstanbul'da profesyonel makyaj.",
    en: "Bridal makeup, editorial makeup, special event makeup, and trial session services. Professional makeup in Istanbul.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
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
