# Simpedu creative work experience — implementation and maintenance prompt

Implemented 16 October 2026 in the actual React/Vite repository. This document supersedes older instructions that ask for a Studio Display, a plain “View more screenshots” disclosure, or the removed homepage subscription/capability grid.

## Requested changes delivered

- Removed the entire homepage “One subscription. Every capability.” section, including its tabs, tiles, data, and unused state.
- Removed Graphic Design from the Our work menu. That menu now links directly to the school, federation, scoring, and commerce chapters.
- Replaced the old work page, cube background, static rows, details disclosures, monitor stand, device shell, and dots with an editorial product story.
- The work opening uses large dark typography and a restrained sage second line. Four project chapters pair bold product statements with actual names, real UI, concise descriptions, and existing live links.
- Each chapter has a generated scenic background and authentic foreground screenshot layers. Scroll moves the background and product layers at different rates on desktop. The motion is tied to native scroll, not a forced scroll engine or long pin.
- “Explore the screens” opens a full-screen collection with a large selected screen, previous/next buttons, keyboard arrows/Home/End, numbered thumbnail filmstrip, a visible close button, native Escape handling, focus restoration, and scroll locking only while open.
- All four catalog collections remain available. There is no autoplay, monitor mockup, or camera-island shell. Presentation crop metadata removes embedded browser/status chrome where appropriate while preserving original source assets.
- Desktop parallax is gated by live reduced-motion and viewport queries. Mobile uses a composed static layout; reduced-motion users retain readable content and short state feedback. GSAP contexts and media setup revert on cleanup.
- Home's lead product scene reuses the generated studio background and authentic dashboard/phone screenshot layers.

## Creative direction and references

The owner's references were [The Romans](https://www.wearetheromans.com), [Santalarch](https://santalarch.com), and the [Framer University scroll examples](https://framer.university/blog/10-scroll-animations-to-make-your-website-stand-out). They informed the oversized typographic presence, editorial spacing, product-led story, and separated-depth movement. Do not copy their logos, writing, site assets, or company claims. The Romans desktop opening and source content from the references were inspected; Santalarch's initial automated screenshot was blank, so no claim of a complete visual/motion audit of that reference is made.

Use warm paper, dark green ink, and subdued sage for the interface. Let the authentic product UI carry its own colors. Image scale, scene depth, and typography create the richness. Avoid random gradients, extra badges, generic feature grids, a custom cursor, and a preloader.

## Exact image prompts and placement

The built-in ImageGen tool generated the two backgrounds. The exact prompts, optimized files, byte sizes, intended placements, and source/crop rules are in `public/images/showcase/ASSETS.md`. Keep generated backgrounds illustrative; never present them as real customer photography. Do not ask an image model to invent application screens, student records, testimonials, or project results.

## Resend: actual fix and setup

The previous localhost error was caused by Vite not serving the Vercel API function. The new Vite plugin serves `/api/send-email` during `npm run dev` using the same handler as production.

- `server/email.js`: validates enquiry type and data, escapes email content, builds the Resend payload, and only returns success with a provider message reference. Rejection, missing configuration, invalid input, and timeout return useful JSON errors.
- `api/send-email.js`: Vercel entrypoint using server-side environment variables.
- `vite.config.js`: local API middleware, reading server-only values from `.env`/`.env.local` and process environment. It parses bounded request bodies and forwards to the shared handler.
- `src/lib/submitInquiry.js`: common client submission, requiring actual JSON acceptance instead of treating an HTML fallback as success. Book, Apply, and lead capture use it. Failed requests retain input and allow retry.

Required server variables are `RESEND_API_KEY`, `EMAIL_SEND` (a bare verified sender address), and `EMAIL_SEND_MULTIPLE` (comma-separated recipient addresses). Use `.env.example` as a template. Never prefix secrets with `VITE_`, commit a real `.env`, or put credentials into source/client props. Production Vercel must have the same variable names configured; this workspace is not linked to a Vercel project, so remote production environment settings were not inspected or changed.

A read-only request to Resend's domains endpoint returned HTTP 200, and the configured sender domain was verified. No real test enquiry was sent. Provider payload and failure paths were tested with a mock transport. This confirms the wiring and configuration checks, not receipt in a real mailbox. Resend request fields follow the [official Send Email API](https://resend.com/docs/api-reference/emails/send-email).

Run locally:

```sh
npm install
npm run dev
```

Run validation:

```sh
npm test
npm run build
```

The Vite development command serves the API; a plain static file server or `vite preview` does not run production serverless functions. On Vercel, deploy the root repository with its Vite build and `api/` entrypoint, and configure the server environment there.

## Copy-ready continuation prompt

Continue the current Simpedu React/Vite implementation rather than following obsolete device/gallery requirements. Preserve the removed capability block, the product-only Work menu, four editorial chapters, generated scene backgrounds, authentic UI layers, native-scroll parallax, and full-screen screen collections. Keep mobile and reduced-motion content usable without any animation. Do not restore a Studio Display, generic carousel dots, or a details-based screenshot disclosure.

Use shared project data and crop metadata. Verify each screenshot crop visually; source captures have differing embedded chrome. If cleaner captures become available, replace the source/crop entry rather than hiding arbitrary product content. Avoid generating product UI. Keep background derivatives responsive and lightweight; load the collection content only when opened.

Preserve the shared server email handler and both local and Vercel API entrypoints. Never acknowledge an enquiry before server/provider acceptance. Test with mocked provider responses; do not send messages to external recipients merely as a design check. Read credentials only on the server. Keep real environment files out of Git.

When changing motion, use the installed GSAP and CSS, scoped cleanup, native scroll, and the live media-query lifecycle. Keep one coherent visual idea. Verify keyboard selection, thumbnail access, Escape, focus return, scroll unlock, route changes, viewport resizing, normal/reduced motion, and 320–1440px layout at top/middle/bottom. Run tests/build and report actual results; never infer award status or a performance score from a polished screenshot.

## Validation completed

- Eight automated tests passed with `npm test`, covering server payload/validation/failure and client refusal to treat HTML or failed responses as success.
- Production build passed: JS 340.61KB / 119.77KB gzip; CSS 48.39KB / 10.37KB gzip. The new desktop backgrounds total approximately 154KB and are shared across four exhibits; mobile derivatives total approximately 45KB. Existing font and product sources are separate.
- No overflow in 60 measurements: Home/Work/Book/Apply × 320/390/768/1024/1440px × top/middle/bottom. No uncaught page exceptions in these checks.
- Four galleries selected their second screens correctly. Desktop/mobile arrow navigation, Escape, and focus restoration passed. Normal desktop parallax moved; live reduced motion reverted all four background transforms to none.
- Removed capability selector count and Graphic Design Work-link count are both zero.
- Booking error/retry tests retained the email address, showed an error for mocked HTTP 502, and acknowledged only mocked JSON provider acceptance.
- Local endpoint returned JSON HTTP 405 for GET and HTTP 400 for an invalid enquiry, without sending email.
- Read-only Resend credential/domain check passed. No actual enquiry email was sent; live mailbox receipt was not claimed.
- A client-bundle check found no Resend API-key value. Real `.env` files remain ignored.
- Desktop/mobile product scenes and gallery screenshots were inspected in two bounded passes. Test evidence is under `/tmp/simpedu-premium/`; reference screenshots are under `/tmp/simpedu-reference/`.
- No production deployment, real email delivery, Lighthouse/field Core Web Vitals, or complete WCAG certification was performed. Local development remains running for review.
