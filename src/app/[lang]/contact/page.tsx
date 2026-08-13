import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { ContactClient } from "./ContactClient";
import { RevealProvider } from "@/components/RevealProvider";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (hasLocale(lang) ? lang : "tr") as Locale;
  const titles: Record<Locale, string> = {
    tr: "İletişim | Gökçe Dila Çağlayan",
    en: "Contact | Gökçe Dila Çağlayan",
  };
  const descriptions: Record<Locale, string> = {
    tr: "Gelin makyajı ve profesyonel makyaj randevusu için iletişime geçin. İstanbul - Maltepe, Kadıköy, Küçükyalı.",
    en: "Get in touch for bridal makeup and professional makeup appointments. Istanbul - Maltepe, Kadıköy, Küçükyalı.",
  };
  return { title: titles[locale], description: descriptions[locale] };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <RevealProvider>
      <div className="contact-page">
        <div className="container">
          <div className="contact-page__header reveal">
            <span className="label mb-sm" style={{ display: "block" }}>{dict.contact.title}</span>
            <h1 className="display-lg">{dict.contact.subtitle}</h1>
            <div className="gold-line mt-md" style={{ maxWidth: "12rem", margin: "1.5rem auto 0" }} />
          </div>

          <div className="contact-page__grid">
            {/* Form */}
            <div className="reveal">
              <ContactClient dict={dict} />
            </div>

            {/* Bilgiler */}
            <div className="contact-info reveal">
              <div className="contact-info__card">
                <div className="contact-info__item">
                  <span className="contact-info__key">{dict.contact.info.phoneLabel}</span>
                  <p className="contact-info__val">
                    <a href="tel:+905xxxxxxxxx">{dict.contact.info.phone}</a>
                  </p>
                </div>
                <div className="contact-info__item">
                  <span className="contact-info__key">{dict.contact.info.instagramLabel}</span>
                  <p className="contact-info__val">
                    <a href="https://www.instagram.com/makeupbygocke/" target="_blank" rel="noopener noreferrer">
                      @makeupbygocke
                    </a>
                  </p>
                </div>
                <div className="contact-info__item">
                  <span className="contact-info__key">{dict.contact.info.areaLabel}</span>
                  <p className="contact-info__val">{dict.contact.info.area}</p>
                </div>
                <div className="contact-info__item">
                  <span className="contact-info__key">{dict.contact.info.hoursLabel}</span>
                  <p className="contact-info__val">{dict.contact.info.hours}</p>
                </div>
              </div>

              <div>
                <span className="label mb-sm" style={{ display: "block" }}>{dict.contact.info.responseLabel}</span>
                <p className="body-text">{dict.contact.info.response}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealProvider>
  );
}
