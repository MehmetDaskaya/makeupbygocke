import { notFound } from "next/navigation";
import { hasLocale, getDictionary, locales } from "./dictionaries";
import type { Locale } from "./dictionaries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { FloatContact } from "@/components/FloatContact";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "tr";

  const titles: Record<Locale, string> = {
    tr: "Gökçe Dila Çağlayan | Gelin & Editöryal Makyaj Sanatçısı | İstanbul",
    en: "Gökçe Dila Çağlayan | Bridal & Editorial Makeup Artist | Istanbul",
  };
  const descriptions: Record<Locale, string> = {
    tr: "İstanbul'da profesyonel gelin ve editöryal makyaj sanatçısı. Maltepe, Kadıköy, Küçükyalı genelinde hizmet.",
    en: "Professional bridal and editorial makeup artist in Istanbul. Serving Maltepe, Kadıköy, Küçükyalı.",
  };

  return {
    title: { default: titles[locale], template: `%s | Gökçe Dila Çağlayan` },
    description: descriptions[locale],
    openGraph: { title: titles[locale], description: descriptions[locale], type: "website" },
    alternates: { languages: { tr: "/tr", en: "/en" } },
  };
}

import { Analytics } from "@vercel/analytics/react";

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
