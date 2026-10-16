# Simpedu creative work experience — implementation and maintenance prompt

Implemented 16 October 2026 in the actual React/Vite repository. This document supersedes older instructions that ask for a Studio Display, a plain “View more screenshots” disclosure, or the removed homepage subscription/capability grid.

## Current direction — sticky case studies

The owner rejected the previous independently floating image layers. The new authoritative research and decision are in `WORK_SCROLL_DESIGN_RESEARCH.md`. The earlier Romans-inspired image overlap is historical, not the implementation target.

Four projects use a stable editorial grid: one image stage stays in place while all product screens have narrative sections that explain the work and select the matching screenshot. Crossfades take 240ms. There is no independent translation, rotation, scale, giant text behind images, forced scroll engine or pinned fullscreen slideshow. Only the progress rule tracks continuous scroll. Numbered screen links and a details link support direct navigation.

`src/data/workStories.js` defines each project's meaningful screen sequence and explanatory copy. Update that file when products change. All 32 product WebPs are included in the main sequence by default: 12 school, 4 federation, 8 scoreboard and 8 commerce. No expansion control hides images. The numbered navigation scrolls horizontally when needed and keeps the current screen visible. Project details have their own visible heading, product name, metadata, description and links.

Mobile, short viewports and live reduced motion receive the full narrative with each image directly beside/below its description in ordinary flow. The CSS/GSAP media lifecycle must revert on preference/viewport changes and route exit.

Home and Work now share one aligned product exhibit. Work's index can preview one project via hover or keyboard focus. The previous floating dashboard, phone and scoreboard layers have been removed. Retain the site's DM Sans / white / graphite theme, authentic UI and subtle silver-loop backdrop.

The homepage capability/subscription section, Graphic Design Work-menu item, modal gallery and hardware frames remain removed. Keep existing shared form/API behavior.

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

Continue the current Simpedu React/Vite site using `WORK_SCROLL_DESIGN_RESEARCH.md` as the motion/design decision. Preserve the sticky case-study sequence: project introduction, the complete product sequence on the left, one stable image stage on the right, and 240ms crossfades as the narrative reaches the reading zone. Keep numbered direct navigation, active-step cues, details links and a clearly titled details section for the same product. Do not restore floating, tilting, scaling or image-over-text compositions.

Maintain the curated source/label/description data in `src/data/workStories.js`; keep the full catalog and original crop metadata. On mobile, short viewports and live reduced motion, show each image with its explanation in normal document flow. Scope and clean up ScrollTriggers. Align the last section so the stage remains in view through its explanation.

Keep the single aligned ProductComposition shared by Home and Work, white/graphite tokens, clear focus states and actual screenshots. No new generated art is required. Existing image prompts and placement rules are in `public/images/showcase/ASSETS.md`. Do not generate product UI, awards, testimonials or unsupported metrics.

Preserve the removed homepage capability block and Graphic Design menu item, plus the working shared Resend handler, Vite middleware and Vercel entrypoint. Keep secrets server-side and test email with mocked transport.

Verify all 32 screens across all four cases, forward and reverse scrolling, stable stage geometry, current-screen state, direct navigation, image fit, complete asset coverage, details anchors and focus, responsive widths from 320–1440px, short viewports, live reduced motion, Home and route cleanup. Inspect normal and fallback browser screenshots. Run tests/build and report only verified results.
