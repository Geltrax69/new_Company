# Simpedu review: latest pull and next implementation brief

Reviewed local `main` at `9cdf6cd` on 15 October 2026. This is a review and handoff; no website implementation was edited. The review covers the current React/Vite repository, not the different website described by the newly revised redesign document.

## What actually changed

The pull fast-forwarded `dd6b0da` to `9cdf6cd`. The only website change replaced four graphic-design color swatches with the words “Social / Brand / Print / Digital,” plus corresponding CSS. The larger change rewrote `SIMPEDU_REDESIGN_PROMPT.md`.

**Important: that prompt now targets another checkout.** It names `/Users/lalitsingh/WORKS/simpedu_website`, describes a compiled Next.js export without `src/`, and asks for ID-card routes and a reconstructed source project. This repository is `/Users/lalitsingh/WORKS/simpedu_new_website`, has editable React source, a real Vite build, and four software projects. Do not follow the reconstruction instructions or present ID-card printing as a verified offering based on that document alone. Preserve it as received until its intended repository is clarified; use the current implementation and this report as the technical evidence for this checkout.

## Verified defects, in repair order

| Priority | Finding and evidence | Fix and acceptance check |
| --- | --- | --- |
| P1 | **Mobile navigation never opens.** `src/styles.css:480` sets `.nav-links { display: none }`; the open-state rule at line 497 changes opacity, visibility, and transform, but never display. At 390px, clicking Menu produced `aria-expanded=true` while the nav remained `display:none`. | Establish an explicit mobile open/closed rendering model. Test menu appearance, all destinations, Escape, focus return, and closing after selection. Hidden links must stay out of the tab order. |
| P1 | **Failed enquiries are presented as successful.** `src/components/EmailForm.jsx:25` sets done in catch; `src/pages/Misc.jsx:50` ignores response status and line 59 always sets done. Mocked HTTP 502 produced success messages in both the hero form and booking form. The shared FormPage also serves careers. | Only confirm after server acceptance. Preserve values on error; offer retry and a real email fallback. Mock success, non-2xx, and network rejection without sending real leads. |
| P1 | **Homepage overflows at every tested width.** Observed viewport→document widths: 1440→1580, 1024→1164, 768→908, 390→570, 320→570. At 320px the headline, paragraph, and CTA visibly clip. | Repair `serve-drift`, `services-drift`, grid min-width, fixed card widths, and form sizing. Bound intentional galleries locally. Do not conceal clipped content using a global overflow rule. Assert document width is no greater than the viewport after animation and scrolling. |
| P1 | **Desktop dropdowns cannot be opened by keyboard focus.** Focusing the trigger leaves the submenu hidden. `src/components/NavBar.jsx:16` and the hover-only CSS are the relevant implementation. | Use accessible disclosure buttons with expanded state, keyboard/click support, and clear focus states. Keep top-level route links separately if required. |
| P1 | **Reduced-motion preference does not stop the device carousel.** Under emulated reduce, the first gallery changed from slide 0 to slide 1 after 3 seconds. `src/components/DeviceShowcase.jsx:14` starts the interval unconditionally. | Centralize live preference handling. Stop autoplay, depth motion, and pinning under reduce. Offer short fades for manual selection. Pause any retained autoplay when offscreen or the tab is hidden, and provide a visible pause control. |
| P2 | **Gallery controls are inaccessible.** Work renders 28 clickable spans and zero gallery buttons. `src/components/DeviceShowcase.jsx:65`. CSS enlarges 6px dots with overlapping pseudo-element hit areas. | Replace with labelled buttons, current-slide state, non-overlapping touch targets, and meaningful descriptions of the product imagery. Default to manual navigation. |
| P2 | **Public footer destinations are unfinished.** `/privacy` and `/terms` both render the site's 404. Footer still exposes a login link, and login simply navigates to a local demo dashboard without authentication. | Add owner-approved policy content or remove unfinished links from promotion. Remove or clearly identify demo-only login/dashboard behavior; do not present it as an authenticated client portal. This is a product-integrity issue, not evidence of leaked protected data. |
| P2 | **Typography loading is inconsistent.** `src/variables.css:17` names Cosmica, while index.html loads DM Sans. No matching Cosmica font-face was found. | Load the intended licensed family or consistently adopt the available font. Remove unused requests, use supported weights and readable fallback metrics. |
| P2 | **Muted hero type has weak contrast.** `--color-ash` is #A1A1AA. Against white this computes to 2.56:1, below the usual 3:1 threshold for large text. Actual hero imagery changes the background and needs rendered-pair testing as well. | Choose a stronger text token and measure against the actual background. Avoid fading important copy toward invisibility as ambient decoration. |
| P2 | **Content integrity remains unresolved.** Home says four deployed products; About says three. Subscription copy, placeholder blog articles, and named reviews/YC affiliations remain. | Use shared project data, verify status and client evidence, and remove unverified claims from the public presentation. Count portfolio projects separately from verified deployments. |

P1 here means release-important; no P0 outage or uncaught route exception was found in the sampled checks. These are grouped root causes, not an exhaustive accessibility certification.

## What still prevents the “wow” impression

1. **The first screen still sells categories rather than demonstrating craft.** Replacing swatches with four words is more honest but does not provide portfolio evidence. The login form screenshot is a weak lead image. Put a useful school dashboard and mobile workflow in the opening composition, then move services below selected work.
2. **The cube background consumes visual attention without adding meaning.** Replace it with negative space and a strong product silhouette. A distinctive layout and coherent image direction will create more identity than another decorative effect.
3. **Work is a repeated template.** Four alternating device/copy rows feel like a feature list. School, federation CMS, venue scoring, and commerce should each have a different visual composition, bound by the same type and grid.
4. **The monitor looks pasted in.** The pale rectangular background around its stand and heavy shadow remain visible. Browser tabs are embedded in the displayed website. Repair source assets and compositing before adding more tilt.
5. **The work has no depth to open.** There are no case-study detail routes; `/work/simpedu` returns 404. That is missing portfolio functionality, not a broken existing link. Add deliberate case studies with useful workflow detail and verified contribution statements.
6. **Motion is frequent but not expressive.** Three independent cycling systems compete for reading time. There is no clear product moment that visitors will remember. A single useful interaction can establish more craft than adding animation to every section.

Maintain the real product screenshots, company origin, working project links where verified, and small existing stack. The page loads without observed exceptions, and the production build passes. These are useful foundations, but they do not establish production performance or portfolio quality.

## Exact image placement plan

No new generated image is required to repair the major bugs. Most improvement should use existing product screens with better capture, cropping, composition, and scale.

| Place | Main visual | Existing source to start with | Production requirement |
| --- | --- | --- | --- |
| Home hero, directly below the headline/actions or within an open editorial composition | School dashboard in one large display, with a smaller parent/teacher phone view | `/work/school/desktop-1.webp` plus `/work/school/phone-2.webp` or `phone-7.webp` | Re-capture desktop without browser tabs; sanitize visible data. Use a dedicated mobile composition with one main artifact. At 1366×768 show both the message/action and meaningful product content. |
| Home school exhibit and school case study | Teacher attendance action beside a parent attendance view | `/work/school/phone-8.webp` and `/work/school/phone-4.webp` | Show as two readable workflow panels. Verify their relationship before claiming real-time synchronization. Current visible sample values must not be presented as measured client outcomes. |
| Federation exhibit, after school | Large website canvas plus one event/content detail | `/work/sepaktakraw/desktop-1.webp` and a reviewed detail from the remaining screenshots | Remove browser chrome; avoid fitting a whole desktop page into a tiny phone or forcing full UI into a thumbnail. |
| ScoreBoard exhibit, third project | Scoreboard as a dominant wide display with an optional illustrative sports-hall environment | `/work/scoreboard/desktop-1.webp` | The actual scoreboard should dominate. A synthetic venue is atmosphere, never evidence of a real installation. |
| Commerce exhibit, fourth project | Product discovery and product-detail phone pairing | `/work/uniminute/phone-5.webp` and `phone-3.webp` | Obtain clean captures without Safari bars or an embedded duplicate hardware island. Do not lead with `phone-4.webp`, which is an empty cart. |
| Company section | Authentic people/building/process material, if supplied | No verified team photography identified | Use truthful typography and product detail until genuine photos are available. Never generate employees and present them as the team. |

Source masters can live under `public/source-assets/` if suitable for the repository, but avoid deploying unnecessarily huge originals. Suggested optimized delivery files: `public/images/showcase/school-hero-desktop.avif`, `school-hero-mobile.avif`, `scoreboard-venue.avif`; reusable hardware under `public/frames/`. Choose actual dimensions and compression after rendering at target pixel density. Keep an asset manifest explaining sources and replacements.

## Optional generation prompts

Use these only for hardware/background support. Real software UI remains a separate authentic layer. A licensed accurate mockup is preferable to AI hardware with warped geometry. Reject malformed stands, doubled notches, baked checkerboards, and inconsistent camera angles.

**1. Replacement monitor shell — use in DeviceShowcase and the desktop hero.**

> Premium commercial product photograph of one Apple Studio Display, exact frontal elevation, accurate silver aluminum body, thin black bezel, centered stand and physically correct 16:9 screen. Entire monitor and stand visible with generous margin. Uniform charcoal blank display for subsequent compositing of a real website screenshot. Soft large studio light from upper left, restrained highlights, precise believable geometry. Isolated on a genuinely transparent background; no floor, no opaque rectangle, no checkerboard pattern, no broad baked shadow. No UI, words, browser chrome, keyboard, props, watermarks, or additional devices. Export a high-resolution transparent hardware plate.

The screen still needs a measured aperture/mask. Place the real UI behind the bezel; preserve the 16:9 screen ratio. Keep any contact shadow separate from the hardware and the page background.

**2. Replacement phone shell — use for school and commerce exhibits.**

> Photorealistic studio hardware plate of one contemporary titanium iPhone Pro, straight-on front camera, accurate proportions, symmetrical geometry, crisp metal edges, realistic black bezel and one correctly placed camera island. Full device visible, generous margin, uniform charcoal blank display for precise replacement with an authentic app screenshot. Soft key light from upper left matching the silver monitor campaign, restrained natural reflections. Genuine transparent background, no floor or opaque backdrop. No app UI, letters, hands, extra devices, logos added to the screen, or watermark.

Do not use a screenshot that already includes a Dynamic Island inside another hardware island. Prepare the screen layer and edge mask separately. Generated blank-screen hardware is not automatically a correctly masked reusable mockup.

**3. ScoreBoard venue background — only behind the real scoreboard exhibit.**

> Editorial architectural photograph of an empty indoor sepak takraw sports hall, authentic net, believable court markings, realistic roof trusses and warm overhead lights. Camera near the sideline. Charcoal shadows, restrained warm highlights, subtle photographic texture, uncluttered composition. Reserve a clear dark area in the upper-right for a separately composited scoreboard display; do not generate a display or any numbers. No people, signage, brand marks, text, UI, neon effects, or watermark. Landscape 16:9, premium realistic photography.

Keep this background subdued enough that the real score remains the focal point. On mobile, crop intentionally or omit the environment. Do not use an image/video dependency to keep the score itself invisible while loading.

## Two motion moments worth building

**A. Flagship workflow reveal, between the hero and the other selected projects.**

At desktop, a brief optional pinned sequence progresses from a large school dashboard, to a teacher attendance action, to the corresponding parent attendance view if that relationship is verified. Use the real screens above. Three concise captions explain the task, action, and useful view. Use modest scale/translation and a short connecting line or highlight. Keep headline and navigation stable. Budget at most about one extra viewport of scroll; do not require several screenfuls to reveal three screens.

On touch/mobile and reduced motion, show the same three states in normal flow or an accessible click-controlled selector. All information must be visible without scrubbing. No lock, delayed CTA, custom cursor, or mandatory smooth-scroll engine.

**B. Interactive scoring demonstration, inside the ScoreBoard exhibit.**

Provide a small clearly labelled “Interactive preview” with a court-side score control and a large output. A button press changes the number with a short vertical digit transition and briefly highlights the corresponding display. Include reset and meaningful labels; avoid announcing every frame through a live region. It must be obvious this is an illustrative preview, not a live match or a latency benchmark. Keep the authentic screenshot nearby as product evidence. Confirm supported scoring rules before implementing detailed match logic.

This gives visitors something worth trying and communicates the product. It is a stronger candidate for a memorable signature than more rotating headlines. Under reduced motion, update numbers immediately with a small color/state cue. Use CSS/GSAP already installed; do not add a 3D engine for this interaction.

Other motion should support these moments: short headline entrance, one consistent work reveal, 150–250ms action feedback, manual gallery fades, and optional fine-pointer tilt of about 2–3 degrees. Pause offscreen work and clean up all timelines, delayed callbacks, observers, and event listeners on route changes. Respond to reduced-motion preference changes live.

## Copy-ready follow-up prompt for the implementation model

> Work in the actual React/Vite repository `simpedu_new_website`, starting from the current `main`. Read `SIMPEDU_REVIEW_FOLLOWUP.md` and applicable repository instructions before editing. The newly revised `SIMPEDU_REDESIGN_PROMPT.md` describes a different compiled Next.js/ID-card site; do not use its repository, route, or business assumptions as facts for this checkout. Keep React, Vite, React Router, vanilla CSS, GSAP, and the existing lead API.
>
> First fix the confirmed mobile-menu display bug, false-success forms, overflow across 320–1440px widths, keyboard dropdowns, gallery controls, and reduced-motion autoplay. Verify with browser interactions and mocked HTTP success/failure; do not send test leads. Make no unsupported testimonials, deployment counts, speed claims, or portal authentication claims.
>
> Then make the company portfolio product-led: a real useful school dashboard in the opening, a large selected-work gallery with four different compositions, reusable project data, substantial case-study routes, one concise capability/process narrative, and a working project enquiry. Remove competing decorative cubes and generic service placeholders from the main first impression. Use a coherent warm neutral/ink identity, correctly loaded typography, meaningful image scale, and deliberate spacing. Preserve legitimate current destinations and genuine company information.
>
> Follow the exact image placement plan in the review. Repair the opaque Studio Display background, screen/bezel layering, browser chrome, image fit, and duplicate phone hardware. Prefer clean captures and accurate transparent hardware plates. Keep real screenshots separate from synthetic scenery. Use optional generation prompts only when an asset improves the composition; record what was generated and where it is used.
>
> Build one main signature workflow sequence and an optional labelled scoring preview using the motion specifications above. Keep native scrolling, useful static/reduced-motion layouts, and visible content when optional motion fails. Do not add animation indiscriminately or imply that elaborate motion guarantees awards.
>
> Check every real public route, 320/390/768/1024/1440px layouts, keyboard/focus, menu navigation, form failure/retry, direct loads, gallery selection, reduced motion, source-image readability, console errors, and missing assets. Run the production build and report measured performance rather than invented scores. Update DESIGN.md and provide representative screenshots, an asset manifest, verified checks, and precise remaining factual/asset questions. Implement the work completely within scope rather than returning another general plan.

## Verification and limits

The local production build passes: 76 modules; JS 334.89KB / 117.69KB gzip; CSS 37.54KB / 7.82KB gzip. No uncaught page exceptions were observed in the sampled checks. No broken loaded images were observed during the initial route checks; this is not a guarantee for deferred images not yet requested.

Routes inspected: Home, Work, About, Services, Book, Apply, Blog, Love, Privacy, Terms, and a prospective work-detail route. Viewports: 1440, 1024, 768, 390, 320px. Visual inspections: desktop Home, narrow mobile Home, Studio Display composition, and a contact sheet of school/commerce sources. Browser tests covered mobile menu display, desktop focus dropdown, mocked 502 forms, and gallery autoplay under reduced motion. A first immediate form observation raced the asynchronous fetch result; a bounded follow-up waited for completion and confirmed the hero false-success defect.

The Impeccable detector returned one dynamic-image warning at ImageCycle.jsx:24. The corresponding source rendered successfully during inspection, so the warning is not counted as a verified broken image. The context helper reported missing PRODUCT.md; no context or design drift repair was performed.

Indicative technical review scores, based on this sample rather than certification: Accessibility 1/4; Performance 2/4 (limited to code/build evidence); Responsive 1/4; Tokens/theming 2/4; Implementation integrity 1/4. Total 7/20. Lack of a dark mode is not itself counted as a defect. No Lighthouse run, field Core Web Vitals result, real email delivery test, hosting deep-link test, or live production audit was performed.

Audit target: current Simpedu marketing checkout. No custom detector ignores. One sequential source/browser assessment, not independent parallel reviews. Native browser automation was unavailable; used local headless Chrome through Playwright, without visible-browser overlays, detector injection, or an overlay live server. Temporary evidence retained in `/tmp/simpedu-review-latest/`, `/tmp/simpedu-detect-current.json`, and `/tmp/simpedu-context-current.txt`. The temporary Vite audit server was stopped after review. Application source and the received redesign document were left unchanged.
