# Simpedu — current design system

Updated 16 October 2026. The current implementation and maintenance brief is `SIMPEDU_CREATIVE_WORK_FIX_PROMPT.md`; earlier review documents are historical.

## Foundation

Use the self-hosted variable DM Sans and its OFL license under `public/fonts/`. `--font-body` is the consumed family token. Body copy is 16px, compact copy 15px, captions 13px; email inputs remain at least 16px. Headings use deliberate weight and tight tracking; supporting copy stays readable. Focus states are explicit and the main-content skip link is retained.

The general site remains light. The work experience uses near-black #0c0e0d, warm white #f5f3ee, muted green #b8c89f, a pale green #d1ecaa closing section, and genuine project-specific UI colors. Large type and image composition supply emphasis rather than excessive cards, badges, or hardware frames.

## Work experience

`src/pages/Work.jsx` and `work.css` present four scroll collections inspired by the owner's Romans video. Giant two-line uppercase headings hold in a native CSS sticky stage while staggered foreground product screens pass in front. Alternating positions and widths create the sequence; captions move with the screens. GSAP/ScrollTrigger adds small scroll-linked vertical offsets without scroll hijacking or pin spacers.

Four selected screens appear initially in each chapter. “Keep exploring” adds the rest inline, focuses the first new screen, and scrolls it into view. Collapse returns focus to details. Skip links bypass each image sequence. The former WorkGallery modal is removed.

`ScreenArtwork` reads source dimensions and presentation crops from `src/data/workMedia.js`; originals remain intact. Existing generated studio scenery supports portrait screenshots and Home. No new image generation is required. Backgrounds are illustrative; exact prompts are in `public/images/showcase/ASSETS.md`.

Small screens retain the sticky scroll concept with smaller motion offsets. Live reduced-motion changes revert GSAP and replace sticky overlap with normal document flow. Images are never initially hidden. Scoped matchMedia contexts clean up on expansion, preference changes, and route unmount.

## Homepage and navigation

The complete subscription/capability section and its data/state are removed. Our work links directly to the four product chapters and has no Graphic Design item. The home lead composition uses the same lightweight studio scenery and real screenshot layers. Existing responsive grid and shared four-project count behavior is preserved. Footer policy links remain absent until approved content exists.

## Enquiry flow

All demo CTAs route to Book. Book, careers, and lead capture use the same client submission utility and server email handler. Errors preserve input, announce a recoverable message, and allow retry. Only a JSON server/provider acceptance with a message reference produces success. The API runs under Vite development and the Vercel serverless entrypoint; keys stay server-side. Setup is documented in the current brief and `.env.example`.

## Verification rules

Check normal/reduced motion, mobile/desktop scroll choreography, expansion and focus, image geometry, responsive widths, route changes, and enquiry failure/retry. Use mocked providers for automated email tests. Do not publish invented claims, testimonials, awards, performance scores, or generated product UI. Keep the latest verified metadata lifecycle and existing working site flows intact.
