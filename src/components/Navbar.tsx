"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavDict {
  portfolio: string;
  services: string;
  about: string;
  contact: string;
  bookNow: string;
  language: string;
}

export function Navbar({ dict, lang }: { dict: NavDict; lang: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const otherLang = lang === "tr" ? "en" : "tr";
  const base = `/${lang}`;

  const links = [
    { href: `${base}/portfolio`, label: dict.portfolio },
    { href: `${base}/services`, label: dict.services },
    { href: `${base}/about`, label: dict.about },
    { href: `${base}/contact`, label: dict.contact },
  ];

  // Unscrolled = hero üzerinde → beyaz logo + beyaz yazılar
  // Scrolled   = içerik üzerinde → koyu logo + koyu yazılar + beyaz bg
  const logoSrc = scrolled ? "/logo.png" : "/logo-white.png";

  return (
    <>
      <header className={`navbar${scrolled ? " scrolled" : " hero-state"}`}>
        <div className="container navbar__inner">
          {/* LOGO — scroll durumuna göre değişir */}
          <Link href={base} className="navbar__logo-link" aria-label="Ana Sayfa">
            <Image
              src={logoSrc}
              alt="Gökçe Dila Çağlayan Logo"
              width={52}
              height={52}
              priority
              unoptimized
              className="navbar__logo-img"
            />
            <span className="navbar__brand-text">
              <span>makeup</span>
              <span className="brand-line2">by gocke</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav>
            <ul className="navbar__links">
              {links.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
              <li><Link href={`/${otherLang}`} className="navbar__lang">{dict.language}</Link></li>
              <li><Link href={`${base}/contact`} className="navbar__book">{dict.bookNow}</Link></li>
            </ul>
          </nav>

          {/* Mobile: lang + hamburger */}
          <div className="navbar__mobile-right">
            <Link href={`/${otherLang}`} className="navbar__lang">{dict.language}</Link>
            <button
              className="navbar__burger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menüyü aç"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="mobile-menu__brand">
          <Image src="/logo.png" alt="Logo" width={60} height={60} unoptimized className="navbar__logo-img" />
        </div>

        <ul className="mobile-menu__links">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="gold-line" />
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
          <Link href={`${base}/contact`} onClick={() => setMenuOpen(false)} className="btn btn--gold">
            {dict.bookNow}
          </Link>
        </div>
      </div>
    </>
  );
}
