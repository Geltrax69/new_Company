# Simpedu — current design system

Updated 16 October 2026. The current implementation and maintenance brief is `SIMPEDU_CREATIVE_WORK_FIX_PROMPT.md`; earlier review documents are historical.

## Foundation

Use the self-hosted variable DM Sans and its OFL license under `public/fonts/`. `--font-body` is the consumed family token. Body copy is 16px, compact copy 15px, captions 13px; email inputs remain at least 16px. Headings use deliberate weight and tight tracking; supporting copy stays readable. Focus states are explicit and the main-content skip link is retained.

The general site remains light. The work experience uses warm paper #f5f3ee, dark green ink #19201c, sage #6f786b, and genuine project-specific UI colors. Large type and image composition supply emphasis rather than excessive cards, badges, or hardware frames.

## Work experience

`src/pages/Work.jsx` and `work.css` present four editorial chapters. Each has bold product statements, real project names, generated scenic backgrounds, authentic screenshot layers, concise product copy, and a deliberately styled “Explore the screens” action. Shared catalog data remains in `src/data/projects.js`.

`ScreenArtwork` reads actual source sizes and presentation crops from `src/data/workMedia.js`. Original product screenshots are preserved. The presentation removes embedded browser/status chrome where crop metadata is supplied. The generated assets under `public/images/showcase/` are illustrative atmosphere, never real-client installation photography. Exact prompts and placement rules are in ASSETS.md in that folder.

`WorkGallery` uses a native dialog with a large selected screenshot and numbered thumbnail filmstrip. It supports previous/next, arrows/Home/End, current state, Escape, focus restoration, and temporary background scroll locking. Content mounts when opened. There is no autoplay, Studio Display, hardware stand, generic dots, or details-based screenshot disclosure.

Desktop native scrolling drives background, product, and title transforms at different rates using the installed GSAP/ScrollTrigger. Queries disable and revert that setup for mobile and live reduced-motion changes. All content is readable without parallax. The gallery transition is removed under reduced motion.

## Homepage and navigation

The complete subscription/capability section and its data/state are removed. Our work links directly to the four product chapters and has no Graphic Design item. The home lead composition uses the same lightweight studio scenery and real screenshot layers. Existing responsive grid and shared four-project count behavior is preserved. Footer policy links remain absent until approved content exists.

## Enquiry flow

All demo CTAs route to Book. Book, careers, and lead capture use the same client submission utility and server email handler. Errors preserve input, announce a recoverable message, and allow retry. Only a JSON server/provider acceptance with a message reference produces success. The API runs under Vite development and the Vercel serverless entrypoint; keys stay server-side. Setup is documented in the current brief and `.env.example`.

## Verification rules

Check normal/reduced motion, mobile/desktop gallery operation and focus, image geometry, responsive widths, route changes, and enquiry failure/retry. Use mocked providers for automated email tests. Do not publish invented claims, testimonials, awards, performance scores, or generated product UI. Keep the latest verified metadata lifecycle and existing working site flows intact.
