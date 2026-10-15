# Simpedu: design audit and implementation prompt

Copy everything between START PROMPT and END PROMPT into the model implementing the redesign. This brief is based on the local repository, rendered desktop and mobile pages, and inspection of the existing image assets on 15 October 2026. No website implementation was changed during this audit.

START PROMPT

You are the creative director, senior frontend engineer, and motion designer redesigning Simpedu LLP's company website. Implement the redesign in this repository. Deliver a working, polished website, not just recommendations or a static concept.

The business goal: make visitors see the quality of the products Simpedu has built, understand what the company can build for them, and start a serious project conversation. The owner wants a confident, visually rich, memorable site with the craft associated with award-winning websites. Treat that as a quality ambition, never as an award claim or guarantee.

## 1. Read the project before changing it

The current stack is React 18, Vite 5, React Router 7, vanilla CSS, and GSAP 3.15. Keep this stack. Inspect package.json rather than assuming other animation or component libraries exist. Do not migrate to Next.js, add Tailwind, or rebuild the company as a fictional SaaS business.

Read applicable AGENTS.md instructions, DESIGN.md, src/App.jsx, src/styles.css, src/variables.css, index.html, src/pages/Home.jsx, src/pages/Work.jsx, src/pages/About.jsx, src/pages/Misc.jsx, src/pages/Love.jsx, src/pages/Blog.jsx, src/components/DeviceShowcase.jsx, ImageCycle.jsx, CycleWord.jsx, Reveal.jsx, NavBar.jsx, Footer.jsx, EmailForm.jsx, src/useScrollDrift.js, and api/send-email.js. Inspect the actual assets in public/work and public/frames. Render the existing site before editing it.

Apply the relevant available skills: redesign-existing-projects, design-taste-frontend, impeccable, better-typography, better-colors, make-interfaces-feel-better, 12-principles-of-animation, and accessible-animation. Use imagegen-frontend-web and image-to-code if producing visual reference images; use high-end-visual-design and gpt-taste for ideas only where compatible with this brief. Do not mechanically combine every aesthetic. Resolve conflicting skill suggestions in favor of this brief, product truth, accessibility, and measured performance. Do not install unrelated skills or invoke unrelated document, pet, plugin, or mobile-app workflows.

This is a replacement visual direction for a company portfolio. Keep genuine brand and product facts; replace the current template-like composition. Update DESIGN.md to document the final implemented system rather than preserving rules that caused the old look.

## 2. Fix the actual weaknesses

These findings come from the current code and rendered pages:

- The homepage presents a generic software-services pitch before meaningful product proof. Its first visual is a cropped school login screen, next to four colored rectangles representing graphic design. This undersells the company's work.
- The hero's isometric cube pattern competes with the words and has no specific relationship to Simpedu. Remove it from the main identity.
- The page mixes school software, sports systems, unlimited design requests, subscription capabilities, marketing, and freelancer complaints. Establish a coherent company story instead of carrying over all this copy.
- Home.jsx and Love.jsx contain named testimonials and YC affiliations with no supporting evidence in the repository. They are unverified, not established facts. Exclude them from the redesigned public presentation unless the owner supplies verification. Do not replace them with invented people or quotes.
- Home shows four deployed products; About shows three. There are four listed projects, but their deployment status requires confirmation. Distinguish portfolio count from verified deployment count. Avoid an unverified numerical claim while resolving this.
- Work.jsx repeats the same alternating device-and-copy row four times. There are no substantial case-study narratives or case-detail links. Different projects need different visual treatments and deeper proof.
- The Studio Display shell is an opaque RGB image, 2400×1846. Its pale rectangular background remains visible around the stand. In the rendered page it looks pasted in, with a heavy clipped shadow. The screen is painted above the shell using percentage insets.
- The iPhone shell is RGBA, 1736×3528. Both shell and screenshot are forced into one screen model with object-fit: cover. Mobile screenshots are 1206×2622 and include system chrome; some include browser controls. The Uniminute screenshot already includes a Dynamic Island. Separate screenshot content from hardware features to avoid duplicated notches, status areas, and browser UI.
- Desktop project screenshots include browser tabs and address bars. A screenshot of a browser inside a physical monitor makes the showcase feel like a screen capture rather than a finished presentation.
- DeviceShowcase cycles every 2.8 seconds; ImageCycle every 2.2 seconds; CycleWord every 2.6 seconds. These compete with reading. Device dots are clickable spans rather than keyboard-operable buttons. Their expanded hit regions overlap.
- DeviceShowcase's pointer tilt and crossfade run through GSAP; its CSS reduced-motion rule only neutralizes the device transform. Several animation paths lack full preference handling. Some background/drift effects check the preference only at mount.
- The homepage overflows horizontally at both 1440px desktop and 390px mobile. A desktop check measured document width 1580px at a 1440px viewport; serve-drift is one confirmed contributor. Investigate every contributor rather than adding a global clipping patch.
- CSS names Cosmica, but no matching font-face is defined in the inspected source. index.html requests DM Sans, which the body font stack does not use. The intended typography is not reliably loaded.
- Caption tokens start at 10px. The hero's muted rotating words need contrast measurement. Improve readability rather than treating tiny labels and pale text as premium design.
- Nav dropdowns rely on CSS hover. Footer Privacy and Terms links have no matching routes. Blog detail copy explicitly identifies itself as placeholder content.
- EmailForm.jsx reports success after a failed request. FormPage in Misc.jsx neither checks response.ok nor reports request failures truthfully. A rich design must also capture leads reliably.

Preserve what is useful: real product screenshots, the education-to-sports company origin, the existing contact details, the compact codebase, and the already installed GSAP tooling.

## 3. Commit to one visual concept

Design read: an independent software company presenting its work to school leaders, sports organizations, and businesses commissioning software; a product gallery with editorial typography and cinematic, controlled motion.

Concept: “From everyday complexity to working software.” Let the movement from a human task to a useful interface organize the page. The products provide the color and personality. The surrounding site provides confidence and clarity.

Use a warm light canvas, dark ink, a controlled burnt-orange company accent, and silver hardware. Suggested starting primitives: canvas #F5F3EE, surface #EAE7E0, ink #171918, muted text #595D58, accent #B74725. Measure actual rendered contrast before approving any combination. Project-specific colors can appear inside their exhibits; they should not turn the entire site into four competing brands.

Build a 12-column desktop grid with a 1360–1440px maximum content width, fluid gutters of roughly 24–64px, and a 4-column mobile grid. Use generous spacing with purposeful changes in density. Alternate large work imagery, concise text, and quiet detail; do not repeat a card grid for every section.

Use one properly loaded, licensed display grotesk and a readable body face. Prefer supplied Cosmica assets if available; otherwise choose an available open-license alternative such as Manrope. Do not assume commercial fonts are available. Make the headline broad and confident, roughly 80–112px on large screens and 40–52px on phones, adjusted to real text. Body text should generally be 16–18px; supporting labels 12–14px. Use rem units, unitless line heights, balanced headings, and readable paragraph measures.

Avoid generic purple glows, decorative cubes, fake dashboard art, excessive glass, color-swatch placeholders, card-within-card layouts, massive rounded containers around every section, and gratuitous badges. Richness should come from strong composition, real product detail, credible materials, and choreography.

## 4. Rebuild the homepage around the work

Use this sequence, adapting exact spacing after rendering:

1. **Navigation.** Simpedu wordmark, Work, Capabilities, Company, and a clear “Start a project” CTA. Retain access to legitimate existing pages through an appropriate navigation hierarchy. De-emphasize unfinished or unverified content without silently deleting working routes.

2. **Hero.** Suggested headline: “Complex work. Beautifully simplified.” Suggested supporting copy: “We’re Simpedu LLP. We design and build software for schools, sports organizations, and businesses.” Primary browsing action: “Explore our work.” Secondary action: “Start a project.” Put a substantial, carefully composed view of real product UI in the first viewport. At 1366×768 the headline, action, and a meaningful part of the product should be visible. Avoid a huge empty opening or a forced email form before visitors have seen the work. Use a useful product screen rather than a login form.

3. **Selected work as the centerpiece.** Show all four projects with individual compositions. Give each a large visual, project name, what it does, the team's contribution where known, and a clear path into its case study. Include live links only where verified. Preserve the existing destinations in project data and check them before changing or promoting them.

   - **Simpedu / school platform:** an attendance, fees, or academic workflow from the existing screenshots, with a main phone and one supporting detail. Verify how the Simpedu and EduConnect names should relate; do not invent separate products.
   - **Haryana Sepak Takraw Association:** a large desktop website view with supporting athlete, event, or content-management detail if available. Let the actual sports content carry the composition.
   - **ScoreBoard Display:** let the scoreboard dominate a widescreen composition, with an authentic controller view if available. It should communicate a venue display system, not merely another desktop website.
   - **Uniminute:** a mobile commerce sequence showing catalogue, product, and checkout screens where available. Avoid leading with Safari controls or unsupported claims about checkout speed.

4. **Company point of view and capability.** Briefly tell the education origin and expansion into other fields. Group supported capabilities around software design, development, integration, deployment, and support. Connect each capability to a real example. Remove unverified subscription language and broad promises carried over from the old template.

5. **One process section.** Discovery, scope, build, launch/support. Merge the duplicate “How we work” and “How it works” sections. Do not promise 24–48-hour delivery or a 48-hour quote unless confirmed.

6. **Contact and footer.** A confident closing headline, “Tell us what you want to build,” with a short, working enquiry flow and clear email access. Preserve factual company and contact information. Product-specific demo requests can use a separate context-aware CTA. Make every displayed link resolve to a real destination.

Aim for approximately 60% of the homepage's visual attention to go to actual work. If verified customer outcomes are unavailable, show the workflow, scope, and implementation detail. Do not fill the gap with fake metrics or generic testimonials.

## 5. Make the work worth opening

Add reusable case-study detail routes, such as /work/:slug, keeping the existing /work route intact. Use shared project data so Home, Work, and details cannot drift in names, images, years, and status.

Each case study should show: the project and audience; the problem being addressed; Simpedu's verified role; several large UI views; one useful workflow explained visually; relevant implementation detail supported by available information; and a next-project or contact action. Label unknown information in the development handoff, not as public claims. Do not invent client outcomes, team sizes, technologies, adoption numbers, or awards.

## 6. Repair the iPhone and Studio Display presentation

Treat hardware as a framing device for the software. Do not let hardware occupy the entire design budget.

First classify every source screenshot: app-only, OS status area, browser chrome, existing device notch, useful crop, and source aspect ratio. Prefer fresh, permission-safe captures of actual products without browser chrome. Use existing clean screenshots when they are adequate. Mask personal or sensitive information in new captures.

For reusable device composites, separate screen content, bezel/hardware, and contact shadow. Use a real transparent shell with a correctly measured screen aperture. Keep the hardware foreground above the screen where it should occlude the display. Do not place app content over a camera cutout. Remove a notch embedded in a source capture before adding another through the shell.

The desktop screenshot's common 16:9 ratio differs from the Studio Display's approximately 16:9.8 screen region. Capture at the intended viewport or use a deliberate contain/crop treatment. Do not stretch interfaces. Reserve object-fit: cover for intentional, reviewed crops; it is not a universal solution for readable UI.

Replace the opaque Studio Display asset with a transparent, cleanly isolated source where possible. Check permission to use externally sourced mockups. If an accurate hardware source is unavailable, use a precise, understated browser-free screen frame as a temporary implementation rather than a distorted generated monitor. Record the missing final asset clearly.

Use consistent camera angle, light direction, metal finish, and shadow softness across hardware scenes. Keep UI crisp at the rendered size and target pixel density. Use one main device and at most one supporting device per exhibit. Let several screenshots appear directly without hardware so the portfolio has visual variation.

Do not default to autoplay galleries. Use deliberately selected lead screens with accessible manual screen selection. Provide labelled buttons, current-screen indication, keyboard support, meaningful image descriptions, and non-overlapping touch targets. Decorative shells should have empty alt text; the product presentation needs a meaningful accessible description.

## 7. Create a motion system, including one signature moment

Motion should explain the product and make transitions feel considered. Use the existing GSAP and CSS. Preserve native scrolling by default. Do not introduce a preloader that delays content, cursor replacement, scroll hijacking, or a WebGL background without a specific demonstrated need.

- **Hero entrance:** readable headline first, then supporting copy and the product scene. Use a short line reveal and a modest image settle, approximately 500–800ms, with 30–50ms stagger where useful. Do not keep the main content invisible while waiting for a timeline.
- **Signature sequence:** on desktop, give one flagship workflow a short scroll-controlled story: its real source screen, one enlarged useful detail, then the complete interface in context. Tie copy to those same states. Keep text readable throughout. A single brief pinned sequence is acceptable if it adds clarity; budget about one extra viewport of scrolling and provide normal-flow mobile and reduced-motion layouts. Do not pin every project.
- **Work entrances:** restrained mask reveals or 24–40px movement. Choose one entrance grammar and keep it consistent.
- **Interaction feedback:** roughly 150–250ms for buttons, links, and controls; small arrow movement and pressed feedback. Optional device tilt is limited to fine pointers and approximately 2–3 degrees, with inexpensive setters and proper cleanup.
- **Gallery changes:** user-controlled crossfades around 200–350ms; respect reading time. If any long-running autoplay remains, provide a visible pause control and pause when hidden or offscreen.
- **Reduced motion:** use live preference handling. Remove pinning, depth movement, large transforms, tilt, and autoplay; keep short fades, focus, and state feedback. A CSS rule that cancels a transform while a GSAP loop keeps running is insufficient.

Scope GSAP selectors to components and revert contexts and matchMedia setup on cleanup. Clear timers, including delayed callbacks in CycleWord. Use transform/opacity wherever possible. Avoid the existing continuously animated background-position pattern. Do not animate blur or broad shadows across large surfaces. Reserve will-change for elements that need it while active.

Use GSAP's documented media-query lifecycle: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/

## 8. Image-generation prompts, only where useful

Do not generate fictional screenshots, client imagery, testimonials, logos, or a fake team. Keep actual UI as real image layers or live frontend. Generation is appropriate for hardware, controlled environments, and design references. Prompts below are production briefs, not permission to replace the portfolio with synthetic product work.

**A. iPhone hardware plate, transparent, portrait 2:3.**

“Create a premium photorealistic product mockup of one accurately proportioned contemporary iPhone Pro in natural titanium, straight-on front view, no perspective distortion. Entire device visible with generous margin, exact bilateral geometry, subtle brushed metal edge, realistic black bezel and a physically plausible single camera island. Uniform blank neutral display suitable for replacement with a real app screenshot. Soft large studio key light from upper left, restrained specular highlights. Isolated on transparent background. No text, no app UI, no hands, no props, no watermark. Keep the device frontal so a rectangular screen layer can be composited precisely.”

Export a genuinely transparent asset if the generator supports it. Prepare and inspect the screen mask separately. Reject malformed geometry; use a licensed real mockup instead if necessary.

**B. Studio Display hardware plate, transparent, landscape 4:3.**

“Create a premium photorealistic front elevation of a single Apple Studio Display with accurate thin black bezel, silver aluminum body and centered stand. Entire monitor and stand visible with breathing room. Camera exactly centered at screen height, no keystone distortion. Blank neutral screen reserved for a real website screenshot. Consistent soft studio light from upper left, precise metal texture, restrained edge highlights. Isolated on transparent background, with no baked rectangular backdrop and no floor. No UI, no browser chrome, no keyboard, no laptop, no text, no watermark.”

Keep a separate shadow layer. Validate actual screen proportions and the aperture before compositing.

**C. Optional atmospheric background for the live-score exhibit, landscape 16:9.**

“Editorial photograph of an empty indoor sepak takraw court, authentic net, court markings, and high-ceiling sports-hall proportions. Camera near sideline, warm overhead lighting, deep charcoal shadows, subtle photographic grain, believable materials. Clear dark negative space on the right half reserved for a separately composited real scoreboard interface. No people, no signage, no branding, no generated scoreboard, no text. Restrained cinematic realism rather than neon science fiction.”

This is illustrative scenery, not evidence of a real Simpedu installation. Keep it secondary to the actual scoreboard and never imply it documents a client venue.

**D. Optional website section-reference prompt.**

“Design ONE horizontal desktop website section for Simpedu LLP, an independent software company. Section: [hero / school project exhibit / sports website exhibit / live scoring exhibit / commerce exhibit / company and capabilities / process / contact]. Visual concept: everyday complexity becoming working software. Warm off-white canvas #F5F3EE, near-black #171918, restrained burnt orange #B74725, silver hardware, precise editorial grotesk typography. Incorporate supplied real product screenshots without inventing their contents. Large readable hierarchy, generous negative space, strong alignment, and one clear focal point. Each project uses its own authentic screen colors within the consistent company identity. Avoid purple glow, meaningless 3D shapes, generic service-card grids, badge clutter, and excessive containers. Flat website presentation, not a laptop photograph. 1600×1000 reference image showing this section only.”

Generate each requested section reference separately; never compress the whole website into one tall board. Use supplied references when available. Keep final website text, controls, and UI content as real HTML. Do not ship a screenshot of a website as the website.

## 9. Optimize and finish the functional experience

Fix root causes of horizontal overflow, including transformed service/company rows, fixed widths, min-content sizing, and mobile form layout. Intentional galleries may scroll within their own bounded container. Never conceal broken content with a global overflow-x: hidden patch.

Use AVIF/WebP derivatives, responsive srcset/sizes, correct intrinsic dimensions, and stable aspect-ratio boxes. Load the actual LCP image eagerly with appropriate priority; lazy-load below-fold imagery. Avoid requesting every screen of every case study on initial load. Poster images must work before video or optional enhancement. Retain source masters separately from delivery assets.

Use properly loaded WOFF2 fonts with the required weights, font-display, and sensible fallback metrics. Remove the currently unused font request. Split below-fold or route-specific code where measurement warrants it. The audited build was approximately 335KB JS / 118KB gzip before redesign; use it as a comparison point, not evidence that current user performance is good or bad.

Aim for LCP ≤2.5s, INP ≤200ms, and CLS ≤0.1 at the 75th percentile in real use. Lighthouse is a lab diagnostic and cannot establish a field INP result. Measure production builds and report tooling, viewport, network/CPU conditions, and observed values honestly. These target thresholds follow https://web.dev/articles/vitals .

Keep semantic landmarks, one clear H1 per page, heading hierarchy, focus-visible states, a skip link, readable contrast, and usable zoom behavior. Prefer 44px touch targets without overlapping hit regions. Support hover, focus, touch, Escape, and focus restoration in navigation. Mobile menu state should close after route selection.

Fix lead forms: check HTTP status, display real failure feedback, retain submitted values on error, allow retry, and only acknowledge receipt after actual server acceptance. Test with mocked success, non-2xx responses, and network failure without sending real test leads. Preserve /api/send-email and its deployment requirements. Do not expose secrets to client code.

Audit every existing route. Remove placeholder articles and unverified reviews from public promotion until genuine content is available. Preserve useful routes and give unfinished destinations an honest treatment. Resolve Privacy and Terms links without inventing legal policies. Do not publish invented company commitments.

## 10. Implementation order and completion criteria

Start with shared project data, truthful content, typography, tokens, and asset preparation. Build the static composition and responsive hierarchy next. Repair hardware compositing, add case studies, then implement the motion layer. Finish contact flow, navigation, route integrity, and measured optimization. Keep changes reviewable. Make ordinary design and implementation decisions without repeatedly asking for approval.

If a factual answer is missing, continue independent work, use honest neutral wording, and list the precise question in the handoff. If an external generated asset is missing, deliver a polished version using real screenshots and clean screen frames, supply the exact asset brief, and identify the remaining replacement. Never substitute random stock images or fabricated metrics.

Verify the homepage, work index, every case study, capabilities, company, and enquiry flow. Capture desktop at 1440×900 and 1366×768, and mobile at 390×844 and 320px width. Check normal and reduced motion, keyboard-only navigation, 200% zoom, direct route loads, back navigation, long project titles, form failure, image loading, and resizing across breakpoints. Ensure useful page content stays available if optional animations fail.

Run npm run build. Check console errors, missing assets, duplicate/overlapping hardware features, stretched screens, clipped shadows, unintended horizontal scrolling, broken links, and animation cleanup on route changes. Test substantive behavior changes; avoid tests that merely mirror styling choices. Use one batched visual review and one confirmation pass after fixes rather than open-ended polishing.

Deliver the implemented site, updated DESIGN.md, an asset manifest identifying real screenshots versus generated illustrative material, representative desktop/mobile screenshots, a concise change summary, measured checks, and remaining factual/asset dependencies. Do not call it finished if the work still leads with generic service boxes, product screens remain unreadable, forms falsely succeed, or mobile layout breaks.

END PROMPT

## Audit evidence and limits

- Inspected local source, tokens, routes, screenshot assets, and both hardware shells. Rendered Home, Work, About, and Services at desktop size, and Home at mobile size. Visually inspected desktop Home, mobile Home, device showcase, Studio Display, and an asset contact sheet. Other rendered pages received basic runtime checks, not exhaustive visual review.
- Build passed: 76 modules, CSS 37.17KB / 7.76KB gzip, JS 334.93KB / 117.71KB gzip. No page exceptions observed during the sampled route checks. No Lighthouse or field Core Web Vitals measurement was performed.
- Confirmed Home document overflow at desktop and mobile; one desktop observation was 1580px document width against 1440px viewport width. Motion changes layout bounds over time, so this is an observation, not a constant invariant.
- Deterministic Impeccable scan returned one warning at src/components/ImageCycle.jsx:24. It flags a dynamic image src as potentially broken; the inspected image rendered successfully. Treat this warning as a false positive for that observed asset, not evidence of a broken source.
- Review target: Simpedu marketing site. Ignore list: no custom ignores supplied. Assessment independence: one sequential source/browser review; no independent parallel assessment was performed. Browser fallback: headless local Chrome through Playwright because no native browser automation tool was exposed; bundled headless Chromium was unavailable. No visible browser overlay, detector injection, or detector live server was used. No production website or external client relationship was verified.
- Temporary audit screenshots and scan output are under /tmp/simpedu-audit and /tmp/simpedu-detect.json. They were retained as review evidence. The temporary Vite server was stopped after the audit. No application source changes were made; this document is the handoff artifact.

Reference guidance: [GSAP media-query lifecycle](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/), [Core Web Vitals definitions and thresholds](https://web.dev/articles/vitals), [reduced-motion preference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).
