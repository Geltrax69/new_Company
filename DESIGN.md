# Simpedu — implementation design notes

This document describes the current React/Vite site after the P2 repair pass. The site remains a light company portfolio; the broader art-direction brief is in SIMPEDU_REDESIGN_PROMPT.md.

## Typography and color

- Use self-hosted variable DM Sans, supplied under its OFL license in `public/fonts/`.
- The consumed family token is `--font-body`. There is no dependency on unavailable Cosmica files or a third-party font request.
- Base copy is 16px, compact body copy 15px, and captions 13px through rem-based tokens. Email inputs use 16px to avoid mobile focus zoom.
- Use the existing near-black/white neutral palette. Hero emphasis is Slate (#52525b), not the pale Ash token. The homepage hero no longer has the animated cube background.
- Headings balance; paragraphs use pretty wrapping. Changing numbers use tabular figures. Keep explicit visible focus states.

## Layout

- Sections have fluid width and a 1200px maximum, with 24px gutters. Do not override section maximums with a broad `main > *` rule.
- Services and portfolio summaries use two-column grids, collapsing to one column at 600px. The prior horizontally drifting rows are no longer attached to Home.
- Use shrinkable grid tracks and min-width: 0 on actual flex/grid items. Long names/tags wrap. Email rows wrap before their contents overflow.
- Narrow layouts collapse bento, process, and contact grids. No page-wide overflow clipping is used to conceal content.

## Product imagery and motion

- Home uses an authentic school dashboard as its service preview. School device galleries lead with the teacher dashboard.
- DeviceShowcase renders only the selected screen. Labelled 44px buttons support click, left/right arrows, Home/End, selected state, and a polite status message.
- Galleries do not autoplay. Selection uses a short fade; reduced motion retains a shorter fade.
- Phone screens sit behind the transparent shell. Desktop screens use a code-native 16:9 frame and stand, with no opaque stock backdrop.
- Optional fine-pointer tilt is limited to about three degrees, gated by the live reduced-motion preference, and cleaned up through GSAP matchMedia.
- Remaining desktop/browser-chrome and commerce capture quality are asset dependencies, with exact replacement prompts and placement in the redesign brief.

## Shared content and routes

- `src/data/projects.js` is the source for the four portfolio projects and their count. Home, About, and Work consume it. Count labels describe portfolio entries, not verified deployment status.
- Footer Privacy/Terms links are absent until approved policies exist. Do not fabricate policy content. The demo-only login route is no longer promoted by the footer.
- Navigation supports explicit disclosure toggles, Escape, route closing, and focus states. A skip link targets main content.
- Form errors stay in normal layout, retain entered data, and support retry. Only server acceptance should produce success feedback.

## Next design work

Follow SIMPEDU_REDESIGN_PROMPT.md for a larger product-led presentation, clean capture requests, optional generated backgrounds/hardware, case studies, and a flagship workflow sequence. Do not treat older audit findings as unresolved without checking the code.
