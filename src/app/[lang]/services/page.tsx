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
    tr: "İstanbul gelin makyajı fiyatları, profesyonel düğün makyajı, deneme seansı ve gelin makyaj modelleri. Gökçe Dila Çağlayan ile randevu ve detaylı bilgi.",
    en: "Istanbul bridal makeup prices, professional wedding makeup, trial sessions, and popular bridal makeup styles by Gökçe Dila Çağlayan.",
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

// FAQPage JSON-LD — AI ve Google için makine-okunabilir SSS
function FAQSchema({ lang }: { lang: string }) {
  const isTr = lang === "tr";
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": isTr
      ? [
          {
            "@type": "Question",
            "name": "Gelin makyajı ne kadar sürer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gelin makyajı uygulaması genellikle 2,5 ile 3 saat arasında sürmektedir. Profesyonel ürünler ve tekniklerle 12-16 saat boyunca kalıcı olacak şekilde uygulanır; nem, ter ve gözyaşına dayanıklıdır.",
            },
          },
          {
            "@type": "Question",
            "name": "İstanbul'un hangi ilçelerine gelin makyajı için geliyorsunuz?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "İstanbul'un tüm ilçelerine mobil hizmet sunuyorum: Kadıköy, Maltepe, Üsküdar, Ataşehir, Beşiktaş, Şişli, Sarıyer, Ümraniye, Pendik, Kartal ve daha fazlası. Lokasyon ücreti mesafeye göre belirlenir.",
            },
          },
          {
            "@type": "Question",
            "name": "Gelin makyajı randevusunu ne kadar önceden almalıyım?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Düğün tarihinden en az 3-6 ay önce deneme seansı için randevu almanızı öneririm. Yaz ve bahar dönemi yoğun olduğundan bu süreyi daha da erken tutmanız önerilir.",
            },
          },
          {
            "@type": "Question",
            "name": "Deneme seansı zorunlu mu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Deneme seansı zorunlu değil, ancak şiddetle tavsiye edilir. Düğün gününden önce 1,5-2 saatlik bir seansta birlikte look belirleyip detayları mükemmelleştiriyoruz.",
            },
          },
          {
            "@type": "Question",
            "name": "Grup makyajı (gelin ekibi) hizmeti veriyor musunuz?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet. Gelin ekibi, nişan partisi, gala gibi çok kişilik etkinlikler için grup makyajı hizmeti sunuyorum. Grup fiyatlandırması hakkında iletişime geçebilirsiniz.",
            },
          },
        ]
      : [
          {
            "@type": "Question",
            "name": "How long does bridal makeup take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bridal makeup application typically takes 2.5 to 3 hours. It is applied using professional products and techniques to last 12-16 hours, and is resistant to humidity, sweat, and tears.",
            },
          },
          {
            "@type": "Question",
            "name": "Which Istanbul districts do you travel to for bridal makeup?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "I offer mobile makeup services to all Istanbul districts including Kadıköy, Maltepe, Üsküdar, Ataşehir, Beşiktaş, Şişli, Sarıyer, Ümraniye, Pendik, Kartal and more. A location fee applies based on distance.",
            },
          },
          {
            "@type": "Question",
            "name": "How far in advance should I book my bridal makeup appointment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "I recommend booking a trial session at least 3 to 6 months before your wedding date. For peak spring and summer seasons, booking even earlier is strongly advised.",
            },
          },
          {
            "@type": "Question",
            "name": "Is a trial session required?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A trial session is not mandatory, but it is highly recommended. During a 1.5 to 2 hour pre-wedding session, we determine and perfect your look together before the big day.",
            },
          },
          {
            "@type": "Question",
            "name": "Do you offer group makeup services for bridal parties?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Group makeup services are available for bridal parties, galas, and multi-person events. Please get in touch for group pricing information.",
            },
          },
        ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <FAQSchema lang={lang} />
      <ServicesClient dict={dict} lang={lang} />
    </>
  );
}
