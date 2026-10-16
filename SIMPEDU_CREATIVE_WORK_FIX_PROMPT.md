# Simpedu creative work experience — implementation and maintenance prompt

Implemented 16 October 2026 in the actual React/Vite repository. This document supersedes older instructions that ask for a Studio Display, a plain “View more screenshots” disclosure, or the removed homepage subscription/capability grid.

## Current direction — compact inline galleries

The complete current specification is in `WORK_SCROLL_DESIGN_RESEARCH.md`. Each project has one large bounded viewer, a selected-screen explanation, previous/next controls and a thumbnail grid. All 32 WebPs remain available directly: 12 school, 4 federation, 8 scoreboard and 8 commerce. Do not reintroduce one scroll section per image: it makes the page unnecessarily long.

Keep the full sequence in `src/data/workStories.js` and the catalog in `src/data/projects.js`. Buttons select any image with a 240ms crossfade. Support keyboard Left/Right/Home/End and touch swipe, without autoplay, scroll locking or fullscreen modals. Preserve selected-state labels and live screen feedback. On phones the image viewer and thumbnails precede the changing explanation to keep their position stable.

Reduced motion keeps a short 150ms fade and removes the explanation entrance animation. There is no GSAP scroll setup in Work anymore. Page scroll moves between projects, not through mandatory screenshot steps.

Keep the clearly named product-details sections and their working same-project anchors, plus the shared single-image Home/Work exhibit and the white/graphite visual theme. No image is hidden behind an expansion control.

## Exact image prompts and placement

The built-in ImageGen tool generated the retained background assets. The current case-study pass does not require new imagery. The exact prompts, optimized files, byte sizes, intended placements, and source/crop rules are in `public/images/showcase/ASSETS.md`. Keep generated backgrounds illustrative; never present them as real customer photography. Do not ask an image model to invent application screens, student records, testimonials, or project results.

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

Continue the current Simpedu React/Vite compact galleries. Preserve one stable image viewer per project, selected-screen copy, all-source thumbnails and previous/next navigation. All 32 source WebPs must remain in the sequence and accessible without expansion: 12 school, 4 federation, 8 scoreboard, 8 commerce. Use the filesystem coverage test to catch missing images.

Keep 240ms opacity transitions, keyboard Left/Right/Home/End, touch swipe and selected-state labels. No autoplay, one-section-per-image scrolling, scroll pinning, modal gallery or independent floating/tilting images. On phones keep the viewer before the changing explanation; preserve reduced-motion feedback. Keep project-details anchors clearly within their named product.

Update `src/data/workStories.js` and catalog data when products change. Retain ScreenArtwork, real screenshots and source-specific crops. Preserve the shared Home/Work exhibit and neutral site theme. Existing generation prompts are in `public/images/showcase/ASSETS.md`; no new image is required for the gallery change.

Keep the previously removed capability block, Graphic Design Work-menu item and hardware frames removed. Preserve shared Resend behavior and server-only secrets. Use mocked transport for email tests.

Verify all 32 thumbnail selections, arrows and keyboard controls, swipe, stable viewer geometry, page height, all details anchors, responsive widths 320–1440px, reduced motion and route navigation. Run tests and production build. Report measured results only.
