# Simpedu — current design system

Updated 16 October 2026. The current implementation and maintenance brief is `SIMPEDU_CREATIVE_WORK_FIX_PROMPT.md`; earlier review documents are historical.

## Foundation

Use the self-hosted variable DM Sans and its OFL license under `public/fonts/`. `--font-body` is the consumed family token. Body copy is 16px, compact copy 15px, captions 13px; email inputs remain at least 16px. Headings use deliberate weight and tight tracking; supporting copy stays readable. Focus states are explicit and the main-content skip link is retained.

The general site remains light. The work experience uses the same white, graphite, and cool gray tokens as the rest of the site, and genuine project-specific UI colors. Large type and image composition supply emphasis rather than excessive cards, badges, or hardware frames.

## Work experience

The current direction is documented in `WORK_SCROLL_DESIGN_RESEARCH.md`. It supersedes the floating-image scroll and giant sticky typography treatments.

`src/pages/Work.jsx` presents four curated case studies. Real product information leads into an editorial two-column layout: narrative on the left, one fixed paired-screen stage on the right. Every source WebP is part of the main story: school 12, federation 4, scoreboard 8 and commerce 8. Nothing is hidden behind an expansion button. The individual screen copy lives in `src/data/workStories.js`; `src/data/workScenes.js` groups those screens into meaningful pairs. The full catalog remains in `src/data/projects.js`.

Desktop CSS sticky holds the stage while narrative sections select one composed pair at a time. The pairings reduce 32 single-image scroll steps to 16 scenes: school 6 paired scenes, federation 4 single screens, scoreboard 8 single screens, commerce 4 paired scenes. Whole scenes crossfade over 240ms; they do not independently translate, rotate or scale. Numbered links, a current counter and a scroll progress rule provide orientation. The final step has trailing space to avoid releasing the stage prematurely. Each case ends with a clearly titled project-details section containing the product name, scope, year, full image count and relevant links. Details anchors target that section, with room beneath the sticky navigation.

Below 901px, below 650px viewport height, or under live reduced motion, every narrative step includes its paired composition in natural flow. Native scrolling and contextual cleanup are retained. The default unenhanced layout is readable without animation setup.

`PairedScreens` renders actual app UI in restrained phone frames against a dark stage, mixed web/phone pairs against the light studio backdrop, and stepped web-window pairs. Every screen links to the original full-size WebP. No product UI or replacement mockup was generated. `ScreenArtwork` retains authentic image sizes and source-specific crop metadata. `ProductComposition` is a single aligned exhibit shared by Home and Work, with hover/keyboard project previews in Work. The existing silver-loop art remains a subtle backdrop there and in Home's process visual; no new generated image is needed. Exact prompts are in `public/images/showcase/ASSETS.md`.

`src/premium.css` retains shared typography, controls, navigation and footer. Keep white/graphite tokens and clear focus states. Never restore independent floating-image choreography from older review documents.

## Homepage and navigation

The complete subscription/capability section and its data/state are removed. Our work links directly to the four product chapters and has no Graphic Design item. The home lead composition uses the same lightweight silver-loop scenery and real screenshot layers. Existing responsive grid and shared four-project count behavior is preserved. Footer policy links remain absent until approved content exists.

## Enquiry flow

All demo CTAs route to Book. Book, careers, and lead capture use the same client submission utility and server email handler. Errors preserve input, announce a recoverable message, and allow retry. Only a JSON server/provider acceptance with a message reference produces success. The API runs under Vite development and the Vercel serverless entrypoint; keys stay server-side. Setup is documented in the current brief and `.env.example`.

## Verification rules

Check normal/reduced motion, mobile/desktop scroll choreography, expansion and focus, image geometry, responsive widths, route changes, and enquiry failure/retry. Use mocked providers for automated email tests. Do not publish invented claims, testimonials, awards, performance scores, or generated product UI. Keep the latest verified metadata lifecycle and existing working site flows intact.

Projects 2 (HSTA) and 3 (ScoreBoard) retain their original unframed single-screen presentation and full original screen order. Pairing applies only to Simpedu and Uniminute.
