import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import { HomeClient } from "./HomeClient";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return <HomeClient dict={dict} lang={lang} />;
}
