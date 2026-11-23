# S R S P & Co website — audit and improvement report

Site: Next.js 16 + Tailwind v4, static export (`output: "export"`), live domain `srspco.com`.
Covers everything done in this working session. Nothing has been committed to git yet.

---

## 1. Starting point (what the audit found)

The project built and linted without errors (0 errors, 23 warnings), but had these problems:

| Area | Finding |
|---|---|
| Page weight | `public/` was **19 MB**. The hero image was a 1.8 MB PNG used as a CSS background; team photos were about 1.5 MB each; office photos about 2 MB each. |
| SEO | No canonical URLs, Open Graph or Twitter tags, sitemap, robots.txt or structured data. Same generic title everywhere. |
| Accessibility | Menu button with no label, form fields with placeholders only, map overlay not usable by keyboard, low-contrast footer text, no skip link, no reduced-motion support. |
| Links | Dead `href="#"` social icons; footer "Our Services" links all pointed to `/services`. |
| Content | Footer said "© 2025"; team bios used out-of-date durations; 404 page had grammar errors. |
| Code quality | About 10 unused section components, 2 unused font packages, a self-referencing font variable in the CSS, duplicated contact forms, 233 inline font styles. |
| Reliability | Fonts came from Google at build time; a failed fetch broke the build intermittently. |

---

## 2. What was done

### 2.1 Images and performance
- Converted the hero, six team photos and two founder photos to WebP (hero 1.8 MB → 96 KB; team photos about 1.5 MB → 15–30 KB each).
- Downloaded the three page-banner photos (previously loaded from Unsplash) and hosted them locally as 60–80 KB WebP files.
- Removed the original large PNG/JPEG files and unused assets (default Next.js SVGs, `hero-bg.svg`, unused PNGs, an unused WebP). **`public/` went from 19 MB to under 1 MB.**
- Switched the hero and all page banners from CSS background images to real `<img>` tags with `fetchPriority="high"`.
- Added `loading="lazy"` to all below-the-fold images so the first visible image gets the bandwidth (fixed a bandwidth-contention problem on a slow connection).
- Turned off the `no-img-element` lint rule, since images are now pre-optimised and the site is a static export.

### 2.2 Fonts
- Replaced the Google Fonts download with **self-hosted fonts** (`src/app/fonts/`, 8 files, about 116 KB) via `next/font/local`. The build no longer needs internet access and can't fail on a font fetch.
- Removed the unused `@fontsource` packages and the self-referencing font variables in `globals.css`.

### 2.3 SEO
- New shared helper [src/lib/seo.ts](src/lib/seo.ts) (site URL, per-page metadata, structured-data builders) and [JsonLd component](src/components/seo/JsonLd.tsx).
- Per-page titles (all 58 characters or fewer) and descriptions (all under 170, most under 160), canonical URLs, Open Graph and Twitter tags on every page; services use the pattern "<Service> in Surat".
- New 1200×630 social-share image `public/og-image.jpg` (replaces a wrongly sized WebP).
- Structured data: AccountingService/ProfessionalService with address, geo position, opening hours, service area, firm registration number and the full service catalogue; WebSite; BreadcrumbList on inner pages; Service on each service page.
- `sitemap.xml` (16 URLs with priority and change frequency) and `robots.txt`.
- 404 page marked `noindex`; site language set to `en-IN`; keywords and robots directives added.
- Home hero text now mentions "Chartered Accountants in Surat" (the only visible SEO copy change).
- The site URL comes from `NEXT_PUBLIC_SITE_URL` and defaults to `https://srspco.com`; confirmed this domain is the live site.

### 2.4 Accessibility
- Skip-to-content link; `id="main-content"` on every page; focus now moves into the content when it is used (smooth-scroll handler fixed).
- Mobile menu button: label, `aria-expanded`, `aria-controls`; `aria-current` on the active nav link.
- Form fields: labels, `aria-required`, `aria-invalid`, `aria-describedby` (error messages), autocomplete hints.
- Map overlay is a real button; team-slider arrows and dots have labels and larger tap areas.
- Footer and small-text contrast raised; body text colour darkened from `#6B7280` to `#4B5563`; service-card numbers made solid green.
- Heading order fixed (footer and About headings).
- "Read More" links on service cards now have a screen-reader name that includes the service.
- Smooth scrolling and animations respect `prefers-reduced-motion`.
- Larger tap targets for footer links, breadcrumbs, "Read More", "Back to Services", "View Full Profile", phone and email links.
- Phone and email on the contact page are now `tel:` and `mailto:` links.
- Restored `suppressHydrationWarning` on `<body>` (browser extensions such as ColorZilla add attributes there and triggered a hydration warning in development).

### 2.5 Code quality (this round)
1. **One shared contact form.** The two nearly identical 270-line forms were replaced by [ContactForm.tsx](src/components/forms/ContactForm.tsx) with `light` (home) and `dark` (contact page) variants. Both pages look the same as before. The career form was updated to use the same WhatsApp helper.
2. **Safer WhatsApp links.** One helper, `openWhatsApp()`, opens the chat with `noopener,noreferrer`.
3. **Contact details come from one place** ([src/lib/contact.ts](src/lib/contact.ts)): address, phone (display, `tel:` and `wa.me` forms), email and firm registration number are now used by the footer, contact page, contact meta description, privacy policy, disclaimer and structured data.
4. **Slow-page investigation (item 5).** See section 4.
- Removed unused components (`CaseStudies`, `Empowering`, `Newsletter`, `Pricing`, `Testimonials`, `TrustBar`, `StarRating`). The disabled blog/career code was kept on purpose.
- Fixed lint warnings (unused imports and variables).

### 2.6 Content fixes
- Copyright year now updates automatically.
- Footer "Our Services" links go to specific service pages (Finance Management, Tax Planning → Income Tax, Book Keeping & Accountancy).
- Removed dead social icons (no real URLs were available).
- Removed out-of-date durations from team bios.
- Rewrote the 404 page copy.

---

## 3. Verification performed

| Check | Result |
|---|---|
| ESLint | 0 errors, 0 warnings |
| TypeScript | clean |
| `next build` | passes, 23 static pages (incl. `robots.txt`, `sitemap.xml`) |
| Link check (built HTML, ~680 references) | all internal links and anchors resolve; no empty `#` links |
| External links (25 URLs) | all return 200 |
| Click-through of every distinct internal link | every link lands on the right page; anchors scroll to the target |
| Interaction tests (35) | all pass: both forms (empty, invalid and valid input; WhatsApp URL and message contents), team slider, map overlay, mobile menu (open/close/navigate), logo, hero and service buttons, skip link, `tel:`/`mailto:` |
| Hit-testing of every link/button/field, desktop and phone | nothing covered or blocked |
| Horizontal overflow, broken images, JavaScript errors | none found |

Lighthouse (mobile, simulated): accessibility rose from 87–96 to 96–100 (home 100), SEO is 100 on all pages checked, best-practices 96–100. Performance: home 97–99, services 87–93, about 77–86, contact 80–90 (varies run to run).

---

## 4. The slow inner pages (item 5)

- **Symptom:** About, Services and Contact showed "Largest Contentful Paint" of 4–6 s in Lighthouse's simulated slow-phone test.
- **What the recorded data said:** the banner image itself arrived and rendered within about 0.4 s. The long figure was mostly simulation.
- **What real throttling showed:** with real slow-4G + 4× CPU throttling every page, including the home page, took about 3 s to show content. So About was not special.
- **Real cause found:** on a slow connection the About page downloaded about 750 KB of images at once, including photos far below the fold. They competed with the banner, which then took about 3.5 s instead of about 0.3 s.
- **Fix:** banners/hero are real images with high priority; all other images are lazy-loaded.
- **Result (real throttling):** home 3.7 s → 2.5 s; About 4.3 s → 3.1 s; Services and Contact about 3.1–3.4 s. On simulated: About 6.2 s → 4.1 s.
- **What remains:** about 3 s on a very slow phone is now mostly the cost of the page's CSS, scripts and fonts. Further gains would need fewer font weights, trimming scripts or a CDN with long cache times. On normal connections the pages load in well under a second.

---

## 5. Not done / needs a decision from you

**Needs you**
- Add the site to Google Search Console and submit `https://srspco.com/sitemap.xml`; claim and complete your Google Business Profile.
- Replace remaining Unsplash photos (service cards and service pages) with real photos of your office and team.
- Send real Instagram/Facebook/LinkedIn URLs to restore social icons (and add them to structured data).
- Verify these claims yourself: the "ICAI Code of Ethics — 13th Edition (effective April 1, 2026)" statement, the advocate enrolment number shown publicly, and the firm registration number. Check publicly displayed content against ICAI advertising rules.
- Decide whether the blog and career pages return. They are disabled in this code but live on the current site; deploying this version turns them into 404s, so set up redirects from the old addresses.

**Possible next code work**
- Contact form backend: the form only opens WhatsApp, so a visitor without WhatsApp sends nothing. Options: email, database, or both.
- Analytics (if added, update the privacy policy, which currently says there is no tracking).
- Floating call/WhatsApp button on mobile.
- Replace 233 inline `fontFamily` styles with theme classes; remove the large commented-out Hero block and the disabled blog/career code or move it to a branch.
- Turn the link/button checks into a saved automated test that runs before each deploy.
- Sitemap `lastModified` currently equals the build time; use real dates.
- Hosting settings (long image/font cache times, security headers) depend on where it is deployed.
- Reduce font weights (8 files) or scripts if more speed on very slow phones is needed.

**Known limits of this audit**
- Tested in Chrome only (no Safari/Firefox, no real phone).
- WhatsApp was tested by checking the link the form builds, not by opening WhatsApp.
- Lighthouse performance numbers vary between runs; treat them as ±10.
- The Google Map's content was not verified beyond seeing it load.

---

## 6. Housekeeping before deploying
- `next.config.ts` still carries your uncommitted `output: "export"` / `trailingSlash` change.
- Many files are modified or deleted and nothing is committed. Review and commit together.
- Set `NEXT_PUBLIC_SITE_URL` if the production domain is anything other than `https://srspco.com`.
