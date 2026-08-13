"use client";

import Link from "next/link";

interface MobileCTADict { bookNow: string; }

export function MobileCTA({ dict, lang }: { dict: MobileCTADict; lang: string }) {
  return (
    <div className="mobile-cta">
      <Link href={`/${lang}/contact`}>{dict.bookNow}</Link>
    </div>
  );
}
