"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";

export function RevealProvider({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const targets = ref.current.querySelectorAll(
      ".reveal, .reveal-left, .reveal-scale, .stagger"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
