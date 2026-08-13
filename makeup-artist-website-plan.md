# Makeup Artist Portfolio Website — Detailed Build Plan for AI Agent

**Goal:** Build a unique, mobile-first, glamorous yet professional portfolio website for a makeup artist. Primary purpose is to showcase high-resolution customer makeup photos (backstage + wedding), convert Instagram bio visitors into booked clients via a contact form, and rank well in search engines + AI answer engines. Look expensive and artistic — never generic “AI slop”.

**Target audience:** Brides, event clients, editorial/fashion clients discovering her via Instagram or Google (“makeup artist [city]”, “bridal makeup near me”, etc.).

**Core principles:**
- Mobile-first (70%+ of beauty traffic is mobile)
- Images are the hero — large, sharp, high-res
- Subtle, elegant motion that feels luxurious (parallax, horizontal drifts, reveals) without hurting Core Web Vitals
- SEO + structured data first-class so Google and AI providers (ChatGPT, Perplexity, Gemini) can recommend her
- Unique visual language so it does not look like a template or AI-generated site

---

## 1. Recommended Tech Stack

| Layer | Recommendation | Why |
|-------|----------------|-----|
| Framework | Next.js 15 (App Router) + TypeScript | Excellent SEO (SSR/SSG), image optimization, performance, easy deployment |
| Styling | Tailwind CSS + custom CSS variables | Fast iteration, mobile-first utilities, easy theming |
| Animations | CSS Scroll-Driven Animations (primary) + GSAP + ScrollTrigger (only where needed) | Zero-JS cost for most parallax/reveals; GSAP only for complex horizontal drifts or timelines. Avoid full Framer Motion / Motion unless React state animations are required |
| Images | Next.js `<Image>` + WebP/AVIF + blur placeholders + lazy loading | Automatic optimization, responsive srcset, prevents layout shift |
| Gallery | CSS Grid / native masonry (where supported) + custom lightbox (vanilla or very light library) | Performance over heavy JS masonry plugins |
| Forms | Server Actions or Formspree / Resend + honeypot | Simple contact form that works without heavy backend |
| Hosting | Vercel (or Netlify) | Free tier excellent for this, automatic image CDN, edge |
| Analytics | Plausible or Vercel Analytics (privacy-friendly) | Track form conversions without cookie banners killing mobile UX |

**Do not use:** Squarespace/Wix templates, heavy page builders, full Framer Motion for scroll effects, unoptimized original JPEGs.

---

## 2. Design Approach — Unique & Glamorous (Not Template)

### Visual Direction
- **Mood:** High-fashion editorial meets intimate bridal luxury. Think soft cinematic lighting, skin glow, gold/champagne accents on deep neutral or near-black backgrounds so makeup colors pop.
- **Color palette (example — customize with her actual brand):**
  - Background: deep charcoal / soft black `#0F0F0F` or warm off-black
  - Surface: soft cream / ivory `#F8F4F0` or muted blush
  - Accent: champagne gold `#C9A96E` or soft rose-gold
  - Text: near-white + muted taupe for secondary
  - Avoid pure white + pure black + neon gradients (classic AI-slop signals)
- **Typography:**
  - Display / headings: elegant serif with personality (e.g. “Playfair Display”, “Cormorant Garamond”, or a distinctive paid alternative if budget allows)
  - Body: clean, highly legible sans (e.g. “Inter”, “Satoshi”, or “Neue Montreal”)
  - Large, confident type sizes on mobile; generous line-height
- **Layout philosophy:**
  - Asymmetric / editorial grids rather than rigid centered columns
  - Large full-bleed or near-full-bleed images
  - Generous negative space so the work breathes
  - Subtle overlapping elements and soft shadows for depth
  - Horizontal “filmstrip” or drifting image rows that move on scroll
- **Avoid:**
  - Generic hero with “Hello, I’m [Name]” + stock photo
  - Overused gradient meshes, glassmorphism overload, identical card grids
  - Too many floating particles or heavy 3D
  - Cookie-cutter “portfolio” templates from Dribbble that every AI agent copies

### Mobile-first specifics
- Sticky bottom CTA bar on mobile (“Book a Session” / “Inquire”) that appears after first scroll
- Large touch targets (min 48px)
- Swipeable galleries and lightboxes
- Images load progressively; never block LCP with huge unoptimized files

---

## 3. Site Structure & Pages (All Indexable)

1. **Homepage** (`/`)
2. **Portfolio / Work** (`/portfolio`) — filterable by category
3. **Services** (`/services`) — bridal, events, editorial, trials, etc.
4. **About** (`/about`)
5. **Contact / Book** (`/contact`)
6. Optional later: Individual look case studies (`/portfolio/[slug]`) for deeper SEO

**Navigation:** Minimal — Logo | Work | Services | About | Contact. On mobile: hamburger or bottom tab bar if preferred. Keep it elegant.

**Footer:** NAP (Name, service area, phone), Instagram link, small copyright, schema-friendly business info.

---

## 4. Homepage — Detailed Component Spec

**Primary goal:** Instantly communicate “this is a high-end makeup artist” + show the strongest work + drive inquiry.

### Section order (mobile-optimized scroll experience)

1. **Hero**
   - Full-viewport or 90vh image (or short muted video loop of brush strokes / skin glow if available — keep under 2–3 MB)
   - Overlaid elegant name + one-line positioning (“Bridal & Editorial Makeup Artist | [City/Region]”)
   - Soft parallax on background image (CSS scroll-driven)
   - Subtle fade-in of text
   - Primary CTA button (“View Portfolio” / “Book Now”)

2. **Featured Looks / Horizontal Parallax Strip**
   - 4–8 of her strongest high-res images in a horizontal row
   - On scroll: the strip drifts slowly left-to-right or right-to-left (parallax speed different from page scroll)
   - Implementation preference: CSS `animation-timeline: scroll()` with `transform: translateX()` or GSAP ScrollTrigger if more control needed
   - Images large, slightly overlapping or with elegant spacing
   - Soft gradient fade on edges if needed

3. **Portfolio Grid Preview**
   - Masonry or asymmetric grid of 8–12 best images
   - Hover/tap: subtle scale + soft overlay with category label
   - Click → opens lightbox or goes to full portfolio filtered
   - Lazy load + priority on first few images

4. **Services Snapshot**
   - 3–4 cards (Bridal, Editorial, Events, Trials) with icon or small image + short description + link to Services page
   - Soft entrance animation on scroll (fade + slight upward translate via CSS view timeline)

5. **Social Proof**
   - 2–3 short client quotes (bridal preferred) + optional Instagram embed or “As seen on” if any
   - Keep light

6. **About Teaser**
   - Short paragraph + portrait photo of her (or working backstage)
   - Link to full About page

7. **Final CTA + Contact Form Preview**
   - Strong headline (“Ready for your perfect look?”)
   - Short form or prominent button that scrolls/links to full contact form
   - Trust signals (years of experience, “mobile service”, “product list available on request”)

**Parallax & motion rules (performance-critical):**
- Prefer pure CSS scroll-driven animations for simple parallax and reveals (0 KB JS, compositor thread)
- Use GSAP + ScrollTrigger only for:
  - Horizontal image drifts that need precise scrubbing
  - More complex multi-layer scenes
- Cap concurrent animated elements
- Respect `prefers-reduced-motion`
- Never animate layout properties (top/left/width); only transform + opacity
- Test on mid-range Android phones

---

## 5. Portfolio Page

- Filter pills: All | Bridal | Wedding Party | Editorial / Backstage | Events | Natural Glam (exact categories based on her actual work)
- Masonry or CSS Grid with varied aspect ratios (portrait heavy is good for beauty)
- Each image: high-quality, descriptive alt text, proper filename (e.g. `bridal-makeup-soft-glam-wedding-city.jpg`)
- Click opens full-screen lightbox with:
  - Swipe / keyboard navigation
  - Caption (look name + occasion if available)
  - Optional “Inquire about this look” CTA
- Pagination or “Load more” (prefer progressive loading over infinite scroll for SEO)
- SEO: unique H1, intro paragraph with location + specialty keywords, image schema where helpful

---

## 6. Services Page

- Clear packages or service types with short descriptions
- What is included, typical duration, travel policy
- Pricing: either ranges, “starting from”, or “inquire for quote” (many MUAs prefer soft pricing)
- Strong CTAs to contact form
- FAQ accordion (schema-ready) — common questions: trials, product brands used, cancellation, group rates, etc.

---

## 7. About Page

- Her story, approach to beauty, philosophy (keep authentic, not corporate)
- High-quality portrait or working photos
- Credentials, training, notable clients or publications if any
- Personal touch that makes her memorable

---

## 8. Contact / Booking Page

- Simple, fast form fields (keep to 4–6 max):
  - Name
  - Email
  - Phone (optional but useful)
  - Event type / date (date picker)
  - Message / details
  - Honeypot field for spam
- Submit → email notification + thank-you message / page
- Display: phone (click-to-call), Instagram, service area, response time expectation
- Embed Google Map only if she has a studio or clear service area; otherwise text “Mobile services across [region]”
- NAP consistency with any Google Business Profile

---

## 9. Performance Requirements

- LCP < 2.5 s (prioritize hero image)
- CLS ≈ 0 (reserve space for images, use aspect-ratio)
- INP low (avoid heavy main-thread JS during scroll)
- Total JS budget for animations ideally < 40–50 KB gzipped
- All images: WebP/AVIF, multiple sizes via Next.js Image, blurhash or LQIP
- Preload critical hero image
- Fonts: subset + `font-display: swap` or optional

---

## 10. SEO & AI-Discoverability Plan

### On-page
- Unique title tags & meta descriptions per page (include primary service + city/region)
- Proper heading hierarchy (one H1)
- Descriptive alt text on every portfolio image (include “bridal makeup”, “soft glam”, location if relevant)
- Internal linking between homepage → portfolio categories → services → contact
- XML sitemap + robots.txt
- Canonical URLs
- Fast Core Web Vitals (ranking signal)

### Structured Data (JSON-LD)
- `LocalBusiness` or more specific `BeautySalon` / `ProfessionalService` on homepage & contact
- `Service` schema for each major offering
- `FAQPage` on services/contact
- `ImageObject` or `Photograph` where useful for portfolio pieces
- `BreadcrumbList`
- AggregateRating if reviews exist later

### Content strategy for ranking + AI
- Location + service keywords naturally in copy (“bridal makeup artist in [City]”, “wedding makeup [region]”)
- Clear service-area language
- FAQ content that answers real client questions (helps AI Overviews and featured snippets)
- Keep pages crawlable (no client-side only rendering of main content)

### Technical
- Server-side or static rendering for all key pages
- Open Graph + Twitter cards with beautiful portfolio images
- Instagram bio link → homepage (or a clean /link page later if needed)

---

## 11. Content & Asset Requirements (Owner must provide)

- 20–60+ high-resolution portfolio photos (organize into categories)
- Preferred color palette / logo / brand fonts if existing
- Short bio + artist statement
- List of services + approximate pricing approach
- 3–5 real client testimonials (with permission)
- City / service area + phone + Instagram handle
- Any before/after pairs (with permission)
- Favicon + social share image

**Image guidelines for agent:**
- Never upload original 10+ MB files
- Generate multiple sizes
- Maintain aspect ratios and color fidelity (skin tones critical)

---

## 12. Implementation Phases for the Agent

**Phase 1 — Foundation**
- Next.js project + Tailwind + basic layout + design tokens
- Homepage structure + hero + one parallax strip
- Mobile navigation
- Basic SEO setup (metadata, sitemap)

**Phase 2 — Portfolio & Motion**
- Full portfolio grid + lightbox
- CSS scroll-driven + selective GSAP effects
- Image optimization pipeline

**Phase 3 — Remaining pages + Form**
- Services, About, Contact
- Working contact form + email delivery
- Schema markup

**Phase 4 — Polish & Launch**
- Performance audit (Lighthouse / Web Vitals)
- Accessibility (keyboard, reduced motion, contrast)
- Cross-device testing
- Final unique visual refinements so it does not look generic
- Deploy + connect custom domain
- Submit sitemap to Google Search Console

---

## 13. Success Metrics

- Fast load on mobile 4G
- Visitors from Instagram bio can see 3+ strong looks within 10 seconds of scrolling
- Contact form submissions > 0 within first weeks
- Pages indexed in Google
- Site does not look like every other AI-generated beauty template

---

## 14. Notes for the Building Agent

- Prioritize beauty of the images over fancy effects.
- When in doubt about motion, make it subtler and more elegant.
- Write real, human copy placeholders — avoid “Unlock your inner glow” style AI marketing language.
- Make the site feel like it was art-directed by someone who understands makeup and light.
- Leave clear comments in code for future content updates (adding new photos should be easy).
- Document how to add new portfolio images and categories.

This plan is intentionally detailed so a capable coding agent can execute without constant clarification while still producing a distinctive, high-converting result. Adjust city, exact colors, and service list once real brand assets are provided.
