# Simpedu creative work experience — implementation and maintenance prompt

Implemented 16 October 2026 in the actual React/Vite repository. This document supersedes older instructions that ask for a Studio Display, a plain “View more screenshots” disclosure, or the removed homepage subscription/capability grid.

## Current scroll direction — supersedes the modal gallery

The owner clarified that a normal gallery is not the desired experience and supplied this [9.4-second Romans reference video](https://inspiration-library.b-cdn.net/inspo-video/big-wearetheromans-1791719044763-30527.mp4). It was viewed directly in Chromium and inspected as 47 time-indexed images at 0.2-second intervals, with larger views around 3 and 6 seconds. This was a sampled motion analysis, not an examination of every encoded frame.

Observed sequence: the page enters a dark section; a huge two-line headline holds near the viewport center; foreground images rise across it, alternating left/right/center and landscape/portrait sizes; captions travel with images; the headline remains behind them until the section ends. The important mechanism is persistent typography plus a moving, overlapping image track, not a carousel transition.

The current premium pass keeps the scroll structure and brings it into the existing site's theme:

- Shared DM Sans, white, graphite and cool gray; no isolated dark-green portfolio theme. `src/premium.css` refines common navigation, buttons, page headings, footer and Home. Existing form behavior and backend are preserved.
- `ProductComposition` supplies the same generated silver ribbon and authentic dashboard, commerce and scoreboard layers to Home and Work. The sculpture is illustrative brand art. Screens are never generated. Hovering or focusing Work's project index previews that specific project; no autoplay.
- Four real project chapters retain oversized two-line sticky statements. Screens pass in front with alternating positions, refined frames and shadows, captions, and shorter gaps.
- Foreground screen translation, small rotation and scale changes are tied to native scrolling with a 0.25-second scrub. Scroll-linked transforms use `ease: none` so input maps consistently to progress; this is not a time-based linear entrance. Each sticky stage has a small progress rule.
- “There’s more to this story” inserts the remaining screenshots inline and focuses the first new image. “Back to the selection” collapses to four views and focuses project details. Chapter skip links and the footer contact anchor work.
- On small screens, type and layouts adapt and screen rotation is removed. Live reduced-motion removes sticky overlap and parallax, preserves the normal reading flow, and disables preview movement.
- Shared buttons have restrained hover and pressed states. The heavy inset button treatment is removed. Home's unsupported named testimonial was replaced with an unattributed, factual studio approach statement.
- The homepage capability/subscription grid, Graphic Design Work-menu item, modal gallery, hardware shells, carousel dots and monitor stands remain removed.

Use the installed frontend design, animation principles, and accessible motion skills where relevant. Do not apply unrelated skills or replace the existing React/Vite/CSS stack. Do not copy reference logos, exact writing, photos, or unsubstantiated company claims.

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

Continue the current Simpedu React/Vite site. Maintain the Romans-inspired scroll choreography implemented in `src/pages/Work.jsx` and `src/pages/work.css`: large stationary two-line type, real product screens passing in front, alternating placement and scale, and captions moving with each screen. Keep four real product chapters and all existing catalog screenshots. Match the white/graphite site theme, refined DM Sans hierarchy and current image framing in `src/premium.css`. Preserve the shared ProductComposition on Home and Work and its project-index hover/keyboard previews. Do not turn this back into a modal, slider, ordinary static card grid, monitor mockup, or “View more screenshots” disclosure.

Use CSS sticky for the typography and the installed GSAP/ScrollTrigger for modest foreground depth. Keep native scroll and scoped cleanup. On small screens preserve the same scroll concept with shorter offsets. Under live prefers-reduced-motion, remove sticky/parallax and use normal document flow. Keep meaningful headings, alt text, visible focus, per-project skip links, and expansion focus on the first newly added screenshot. Test expansion and collapse at every chapter because inserted content changes scroll geometry.

Preserve `ScreenArtwork` and source-specific crop metadata. Do not generate application UI, customer records, quotes, metrics, or awards. The generated silver-loop backdrop is the current brand asset; the older studio/arena files are retained historical variants. Exact reusable background prompts are in `public/images/showcase/ASSETS.md`. Use silver-loop scenery behind portrait UI and on Home; leave landscape product screens large and readable.

Keep the removed homepage capability block and Graphic Design menu item removed. Preserve Resend's shared server handler, Vite middleware, Vercel entrypoint, and server-only secrets. Test email with mocked transport; acknowledge success only after provider acceptance.

Verify the headline remains at the same viewport position while images move across it. Check 320, 390, 768, 1024, and 1440px; all four chapters; expansion/collapse and focus; reduced motion and live preference changes; route navigation and Home. Inspect actual browser screenshots of motion at multiple scroll positions and a reduced-motion screenshot. Run `npm test` and `npm run build`. Report verified outcomes, without inventing awards, scores, or email delivery.
