"use client";

import { useState } from "react";
import Link from "next/link";
import { RevealProvider } from "@/components/RevealProvider";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function ServicesClient({ dict, lang }: { dict: any; lang: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const base = `/${lang}`;

  return (
    <RevealProvider>
      <div className="services-page">
        <div className="container">
          <div className="services-page__header reveal">
            <span className="label mb-sm" style={{ display: "block" }}>{dict.services.title}</span>
            <h1 className="display-lg">{dict.services.subtitle}</h1>
            <div className="gold-line mt-md" style={{ maxWidth: "12rem", margin: "1.5rem auto 0" }} />
          </div>

          <div className="service-items">
            {dict.services.items.map((s: any, i: number) => (
              <div key={i} className="service-item reveal">
                <div>
                  <span className="service-item__num">0{i + 1}</span>
                  <h2 className="service-item__title">{s.title}</h2>
                  <span className="service-item__duration">{s.duration}</span>
                </div>

                <div>
                  <p className="body-text mb-md">{s.description}</p>
                  <ul className="service-item__includes">
                    {s.includes.map((item: string, j: number) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Link href={`${base}/contact`} className="btn">{dict.services.inquire}</Link>
                </div>
              </div>
            ))}
          </div>

          <p className="services-pricing">{dict.services.pricing}</p>

          {/* FAQ */}
          <div className="faq">
            <div className="faq__header reveal">
              <span className="label mb-sm" style={{ display: "block" }}>{dict.services.faq.title}</span>
              <div className="gold-line" style={{ maxWidth: "8rem", margin: "0.75rem auto 0" }} />
            </div>

            <div className="faq__list">
              {dict.services.faq.items.map((f: any, i: number) => (
                <div key={i} className={`faq__item reveal${openFaq === i ? " open" : ""}`}>
                  <button className="faq__question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {f.question}
                    <span className="faq__icon">+</span>
                  </button>
                  <div className="faq__answer">
                    <p className="body-text">{f.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RevealProvider>
  );
}
