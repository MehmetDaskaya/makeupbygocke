"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import type { PortfolioImage } from "@/lib/portfolio-data";

interface LightboxProps {
  images: PortfolioImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  lang: string;
  dict: { inquire: string; close: string; prev: string; next: string };
}

export function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate, lang, dict }: LightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft"  && currentIndex > 0)              onNavigate(currentIndex - 1);
    if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!images[currentIndex]) return null;
  const img = images[currentIndex];
  const caption = lang === "tr" ? img.caption : img.captionEn;

  return (
    <div
      className={`lightbox${isOpen ? " open" : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Kapat */}
      <button className="lightbox__close" onClick={onClose} aria-label={dict.close}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Önceki */}
      {currentIndex > 0 && (
        <button className="lightbox__prev" onClick={e => { e.stopPropagation(); onNavigate(currentIndex - 1); }} aria-label={dict.prev}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      )}

      {/* Sonraki */}
      {currentIndex < images.length - 1 && (
        <button className="lightbox__next" onClick={e => { e.stopPropagation(); onNavigate(currentIndex + 1); }} aria-label={dict.next}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      )}

      {/* Görsel */}
      <div
        className="lightbox__img"
        onClick={e => e.stopPropagation()}
        onTouchStart={e => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={e => {
          if (touchStart === null) return;
          const diff = touchStart - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 60) {
            if (diff > 0 && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
            else if (diff < 0 && currentIndex > 0) onNavigate(currentIndex - 1);
          }
          setTouchStart(null);
        }}
      >
        <Image
          src={img.src}
          alt={lang === "tr" ? img.alt : img.altEn}
          width={800}
          height={img.aspect === "portrait" ? 1067 : img.aspect === "landscape" ? 600 : 800}
          style={{ objectFit: "contain", maxHeight: "75vh", width: "auto", maxWidth: "100%" }}
          quality={90}
        />

        {caption && (
          <div className="lightbox__caption">
            <p className="display-sm">{caption}</p>
            <a href={`/${lang}/contact`} className="label mt-sm" style={{ display: "inline-block", textDecoration: "underline", textUnderlineOffset: "4px" }}>
              {dict.inquire}
            </a>
          </div>
        )}

        <span className="lightbox__counter">{currentIndex + 1} / {images.length}</span>
      </div>
    </div>
  );
}
