"use client";

import { track } from "@vercel/analytics";

export function FloatContact({ dict }: { dict?: { tooltip?: string; aria?: string } }) {
  const handleClick = () => {
    try {
      track("instagram_dm_click", { location: "floating_button" });
    } catch {
      // Ignore if analytics fails or is blocked by adblocker
    }
  };

  const tooltipText = dict?.tooltip || "DM ile Yaz";
  const ariaText = dict?.aria || "Instagram DM ile iletişim";

  return (
    <a
      href="https://ig.me/m/makeupbygocke"
      target="_blank"
      rel="noopener noreferrer"
      className="float-contact"
      aria-label={ariaText}
      onClick={handleClick}
    >
      {/* Mesaj / DM ikonu - sade SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span className="float-contact__tooltip">{tooltipText}</span>
    </a>
  );
}
