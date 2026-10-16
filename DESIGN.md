# Simpedu — current design system

Updated 16 October 2026. The current implementation and maintenance brief is `SIMPEDU_CREATIVE_WORK_FIX_PROMPT.md`; earlier review documents are historical.

## Foundation

Use the self-hosted variable DM Sans and its OFL license under `public/fonts/`. `--font-body` is the consumed family token. Body copy is 16px, compact copy 15px, captions 13px; email inputs remain at least 16px. Headings use deliberate weight and tight tracking; supporting copy stays readable. Focus states are explicit and the main-content skip link is retained.

The general site remains light. The work experience uses the same white, graphite, and cool gray tokens as the rest of the site, and genuine project-specific UI colors. Large type and image composition supply emphasis rather than excessive cards, badges, or hardware frames.

## Work experience

The authoritative current direction is `WORK_SCROLL_DESIGN_RESEARCH.md`: compact inline project galleries. This replaces the long sticky story and earlier floating-image layouts.

`src/pages/Work.jsx` presents one bounded image viewer per project, an explanation for the selected screen, previous/next controls and a thumbnail grid containing every source. The complete sequences live in `src/data/workStories.js`, with 12 school, 4 federation, 8 scoreboard and 8 commerce screens. The catalog in `src/data/projects.js` matches the physical files. No expansion is required to access images.

Screens crossfade over 240ms, without autoplay, pinning, independent movement or per-image scroll distance. Keyboard Left/Right/Home/End and touch swipe select screens. All thumbnails remain direct buttons with labels and selected state. On phones the viewer precedes the changing explanation, so selecting a thumbnail keeps the image area stable. Reduced motion uses 150ms opacity feedback and removes the text entrance.

The full project-details sections remain explicit anchor targets with the product name, scope, metadata and links. Page scrolling moves between projects; it does not advance every screenshot. `ScreenArtwork` preserves actual aspect ratios and crop metadata.

`ProductComposition` remains the aligned single-product exhibit shared by Home and Work. Work's index supports hover/keyboard previews. Existing decorative silver-loop art is retained; no new asset or dependency is required. `src/premium.css` keeps the shared white/graphite theme, typography, controls and navigation.

## Homepage and navigation

The complete subscription/capability section and its data/state are removed. Our work links directly to the four product chapters and has no Graphic Design item. The home lead composition uses the same lightweight silver-loop scenery and real screenshot layers. Existing responsive grid and shared four-project count behavior is preserved. Footer policy links remain absent until approved content exists.

## Enquiry flow

All demo CTAs route to Book. Book, careers, and lead capture use the same client submission utility and server email handler. Errors preserve input, announce a recoverable message, and allow retry. Only a JSON server/provider acceptance with a message reference produces success. The API runs under Vite development and the Vercel serverless entrypoint; keys stay server-side. Setup is documented in the current brief and `.env.example`.

## Verification rules

Check normal/reduced motion, mobile/desktop scroll choreography, expansion and focus, image geometry, responsive widths, route changes, and enquiry failure/retry. Use mocked providers for automated email tests. Do not publish invented claims, testimonials, awards, performance scores, or generated product UI. Keep the latest verified metadata lifecycle and existing working site flows intact.
