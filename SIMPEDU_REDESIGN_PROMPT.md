# Simpedu: current implementation and next design prompt

This brief targets `/Users/lalitsingh/WORKS/simpedu_new_website`, the editable React/Vite company website. It replaces the previous document about a different compiled Next.js/ID-card website. Do not reconstruct this project from minified exports or introduce ID-card business claims based on the old document.

## What has now been fixed

The current code includes:

- Manual device galleries with labelled 44px buttons, selected state, screen status, left/right/Home/End navigation, meaningful image descriptions, and no autoplay. Only the selected screenshot is rendered.
- Fine-pointer-only device tilt, limited to about three degrees and disabled through a live reduced-motion preference. GSAP setup is reverted on cleanup.
- A clean code-native desktop frame with a 16:9 aperture, replacing the opaque-background Studio Display asset in the actual component. The phone screen sits beneath its genuine transparent hardware shell.
- Responsive service and project grids replacing scroll-drifting rows. Inputs can shrink/wrap, long labels can wrap, narrow grids collapse, and page sections keep their maximum content width. Do not bring back page-wide clipping as a substitute for fixing layout.
- Self-hosted variable DM Sans under `public/fonts/`, with its OFL license, matching the actual CSS family. The unused Google font request and unavailable Cosmica dependency have been removed. Supporting labels are larger; email inputs are at least 16px.
- A stable, darker hero emphasis and a clean hero background. The pale rotating headline and decorative cube animation were removed from the homepage hero.
- A shared catalog, `src/data/projects.js`, used by Home, About, and Work. Both counters derive from its four projects and say “projects in our portfolio,” rather than asserting an unverified deployment total.
- Removal of dead Privacy/Terms footer links and the demo-only login link. No legal policies have been invented. Approved policy content remains a separate owner dependency before adding those links back.
- Navigation disclosure labels, keyboard Escape handling, route-based closing, visible focus states, and a skip link. Email errors occupy space within their form, retain entered values, and expose an accessible alert.

The school service preview now uses the actual desktop dashboard. The work gallery starts with a useful teacher dashboard, not the login screen. Preserve these improvements while developing the larger presentation.

## Copy-ready implementation prompt

You are the design director, frontend engineer, and motion designer improving Simpedu LLP's company portfolio. Build on the actual React 18, Vite 5, React Router 7, vanilla CSS, and GSAP implementation. Read repository instructions, this file, DESIGN.md, and the current source before editing. Treat older audit documents as historical evidence; verify whether each issue is still present.

The owner's goal is to showcase the work confidently, make the company memorable, and attract project enquiries. Aim for award-caliber craft without implying that Simpedu has won awards. Keep the functional and responsive fixes above intact. Do not deliver another generic agency template or replace working code merely to change frameworks.

**1. Establish a product-led company identity.**

Simpedu's portfolio contains a school-management platform, Haryana Sepak Takraw Association's website/CMS, ScoreBoard Display, and Uniminute commerce. Use the shared catalog as the source for names, years, screenshots, and existing links. Verify adoption/deployment claims separately; four portfolio entries are not evidence of four live deployments. Do not invent clients, metrics, testimonials, awards, capabilities, delivery commitments, or native-app availability.

Retain a clear light canvas, dark ink, readable self-hosted typography, and restrained accent color. Use real product imagery to carry the project-specific colors. Build variation through image scale, alignment, composition, and spacing. Avoid decorative cubes, purple glows, badge clutter, a loading intro, cursor replacement, or the same rounded card treatment in every section. Keep body copy short and concrete.

**2. Make the first viewport show the work.**

Keep a concise message, browsing action, and enquiry action visible. Suggested copy direction: “Complex work. Beautifully simplified.” Explain the company in one short paragraph. Pair the message with a substantial real school dashboard and a supporting mobile view. At 1366×768, show both the message/action and meaningful product content; do not let oversized type or empty space consume the entire opening.

Use `/work/school/desktop-1.webp` as the initial desktop source and `/work/school/phone-7.webp` as a teacher view. These are existing assets, not a reason to generate fictional interface text. The desktop screenshot still includes browser chrome; request or capture a clean version before treating the final composition as production art. Sanitize personal data before recapturing.

**3. Give each project an individual composition.**

- School: teacher attendance and parent attendance, using `/work/school/phone-8.webp` and `/work/school/phone-4.webp`. Verify the relationship before claiming automatic synchronization. Show enough screen detail to read the workflow.
- Federation: a large desktop canvas with `/work/sepaktakraw/desktop-1.webp` and one supporting event/content detail. Avoid browser tabs and excessive hardware chrome.
- ScoreBoard: let `/work/scoreboard/desktop-1.webp` dominate a wide scene. The scoreboard is the product; the monitor or environment supports it.
- Uniminute: pair `/work/uniminute/phone-5.webp` with `/work/uniminute/phone-3.webp`. Obtain clean captures without Safari bars or an embedded duplicate camera island. Do not lead with the empty-cart screen.

Place selected work immediately after the opening; capability and process come afterward. Consolidate duplicate process sections. Review the remaining subscription-style copy and unverified reviews before public promotion. Preserve genuine company and contact facts.

Add case-study detail routes only with useful content: audience, problem, verified contribution, large screen views, a supported workflow, and next-project/contact navigation. Reuse project data instead of duplicating names and counts. Keep useful existing routes accessible.

**4. Add one signature motion sequence.**

After the opening, introduce the flagship school workflow: overview → teacher action → parent-facing view, if supported by verified product behavior. A short desktop scroll sequence may focus one useful detail at a time. Keep the text visible and preserve ordinary navigation. Budget no more than about one additional viewport of scrolling. On mobile and reduced motion, use a normal-flow sequence or accessible manual selector with the same information.

An optional interactive ScoreBoard preview can let visitors increment a demonstration score and see the output update with a short digit transition. Label it “Interactive preview”; it must not imply a live event or measured production latency. Confirm scoring rules before implementing match logic. Offer reset and clear accessible labels.

Keep the rest quiet: short entrance choreography, consistent reveals, manual gallery transitions, and 150–250ms action feedback. Do not restore continuous gallery autoplay. Pause optional work when hidden/offscreen, honor live reduced-motion changes, and clean up timers, animation contexts, and event listeners.

**5. Finish and verify.**

Preserve truthful form failure/retry behavior and the existing server-side email integration. Use mocked responses for tests; do not send unsolicited test leads. Do not expose environment secrets. Policy links can return only when approved content exists; do not generate legal commitments as decorative site content.

Verify 320, 375, 390, 600, 768, 900, 1024, and 1440px widths. Check page top, intermediate scroll positions, and page bottom; assert that document width fits the viewport. Test keyboard navigation, menu Escape/route closing, gallery selection/focus, reduced motion, 200% zoom, font loading, failed requests and retries, route changes, and image loading. Run the production build. Report measured lab checks honestly; no invented Lighthouse or field performance results.

Keep meaningful content available if optional motion fails. Use responsive image derivatives, stable aspect ratios, appropriate eager/lazy loading, and readable screen scale. Avoid adding large libraries for effects already possible with CSS/GSAP. Deliver screenshots, updated design notes, an asset manifest, and precise remaining dependencies.

## Optional image prompts and exact placement

These assets are not required to complete the P2 fixes. Prefer accurate licensed hardware sources where available. Generate hardware/backgrounds only; composite authentic product UI separately. Reject warped geometry, baked checkerboards, double camera islands, illegible generated text, and inconsistent light direction.

**Monitor hardware plate.** Target: `public/frames/studio-display-transparent.webp`, used only if it materially improves the current code-native desktop frame in `DeviceShowcase.jsx` or a new hero scene.

> Premium photorealistic commercial hardware plate of one silver Apple Studio Display, exact frontal elevation, accurate thin black bezel, centered aluminum stand, physically correct 16:9 screen, entire device visible with generous margin. Blank uniform charcoal display reserved for separately composited authentic software. Soft upper-left studio key light, precise metal edges, restrained reflections. Isolated on a genuinely transparent background, no floor, no opaque rectangle, no checkerboard, no broad baked shadow. No UI, browser tabs, text, extra devices, props, or watermark.

Prepare a real screen mask; put the UI behind the bezel and keep the contact shadow separate. A blank-screen image alone is not a usable transparent aperture. Preserve the current code-native frame until the replacement passes inspection.

**Phone hardware plate.** Target: `public/frames/iphone-transparent.webp`, replacing the current phone shell only after aperture and camera-island validation.

> One accurately proportioned titanium iPhone Pro, straight-on front view, symmetrical hardware, full device visible, realistic black bezel and one camera island, crisp metal edges. Blank neutral display for later compositing of real application content. Match soft upper-left studio lighting and restrained reflections of the silver monitor. Genuine transparent background with no backdrop, floor, pattern, text, app UI, hands, duplicate phones, or watermark.

Pair with app-only captures. Do not place a screenshot containing hardware features inside another shell with the same features.

**ScoreBoard atmosphere.** Target: `public/images/showcase/scoreboard-venue.avif`; place behind the ScoreBoard project exhibit only, never behind primary copy across the entire website.

> Editorial architectural photograph of an empty indoor sepak takraw hall, authentic net, believable court markings and roof trusses, warm overhead lighting, charcoal shadows, fine photographic texture. Camera near the sideline. Clear dark negative space in the upper-right reserved for a separately composited real scoreboard. No people, scoreboard, numbers, signs, brands, text, UI, neon effects, or watermark. Landscape 16:9, restrained commercial realism.

This is illustrative scenery, not evidence of a client installation. Keep the real scoreboard dominant. On mobile use a deliberate crop or omit the scene. Keep live website headings, project names, buttons, and any interactive score as HTML, not generated image text.

**Company photography.** Use real supplied photographs of the team/work; no generation prompt is appropriate for pretending fictional people are Simpedu employees.
