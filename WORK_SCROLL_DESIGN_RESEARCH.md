# Work presentation — research and implementation decision

16 October 2026. This direction supersedes the earlier floating-image / giant-background-type implementation and the earlier premium review's motion recommendations.

## Decision

Use an editorial, sticky case-study sequence: a fixed image stage on the right, a scrolling narrative on the left, and one complete screenshot at a time. Four carefully selected screens explain each product. On phones, short laptop viewports and reduced motion, pair each explanation with its image in ordinary document flow.

The supplied products contain both detailed landscape dashboards and tall mobile screens. Their value needs explanation: office overview versus teacher actions, public federation site versus administration, referee controls versus venue display. A stable frame makes those relationships legible. Independent translation, tilting and foreground image overlap made the previous version feel arbitrary and could obscure text.

## Research consulted

- [Instrument — Work](https://www.instrument.com/work): project-led selection, clear project labels and stack/grid presentation options. Its content and initial browser rendering were inspected. No claim of copying its full transition system is made.
- [Build in Amsterdam](https://www.buildinamsterdam.com/): its agency portfolio was consulted for case-study positioning and presentation. The automated browser screenshot remained in its loading state; its complete motion was **not** verified. It is a positioning reference, not evidence for a particular animation.
- [GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): callbacks, contextual animation, scrubbed progress and native scrolling.
- [GSAP matchMedia documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/): conditional setup and reversion for desktop, viewport height and live reduced motion.
- The owner's Romans video, previously sampled, informed the desire for a scroll experience. The owner subsequently rejected the independently floating images; that correction takes precedence over literal imitation.

The chosen composition is an original fit for Simpedu's screenshots, not a claim that a reference uses this exact implementation.

| Pattern considered | Fit | Decision |
| --- | --- | --- |
| Floating collage / parallax layers | Distracts from dense UI and creates inconsistent alignment | Remove from Work and the shared opening composition |
| Long horizontal gallery | Makes portrait and landscape sizing awkward; changes the expected scroll axis | Reject |
| Perspective card stack / 3D rotation | Obscures UI and turns the showcase into a visual effect | Reject |
| Fullscreen pinned slideshow | Strong presence but makes four projects laborious and gives less room for explanation | Reject |
| Sticky image plus scrolling narrative | Stable viewing area, room for context, natural vertical reading | Implement |

## Exact choreography

1. Each case introduces its real product, category, year, summary and scope.
2. The desktop stage stays at 100px from the top. Its footprint does not change between screenshots.
3. Four narrative sections activate their corresponding screen when the explanation enters the reading zone. A 240ms opacity crossfade changes the screen; images do not translate, rotate or scale.
4. Numbered chapter links and the current counter provide direct navigation and orientation. The bottom progress rule alone tracks continuous scroll with a short scrub.
5. The last section includes enough trailing space to keep the stage aligned until its explanation is read.
6. Additional screenshots open in a secondary aligned grid after the case. Expansion focuses the first added screen; closing focuses the control area.
7. The shared Home/Work opening is one aligned product exhibit with a fixed frame and caption. Project-index hover/focus replaces that single image. Existing silver-loop art remains a subdued decorative background.

## Implementation boundaries

- `src/data/workStories.js`: curated screen order, real feature labels and explanatory copy. Update this file when the work changes.
- `src/pages/Work.jsx`: scoped ScrollTrigger callbacks, CSS-current state, case navigation, optional collection.
- `src/pages/work.css`: complete replacement of obsolete floating-layout rules with the editorial grid and responsive reading flow.
- `src/components/ProductComposition.jsx`, `src/premium.css`: shared single-image exhibit; removed independent depth transforms, tilted layers and the old parallax lifecycle.
- No additional dependency or generated image. Original screenshots and crop metadata remain intact. No invented awards, customer testimonials, performance improvements or usage metrics.

## Interface and motion review

Full review of the changed Work interaction and shared opening composition. React / vanilla CSS / installed GSAP. Existing forms and other pages received regression checks, not a fresh comprehensive content audit.

| Category | Before | After |
| --- | --- | --- |
| Typography | Screens could cross text; oversized backdrop competed for attention | Separate heading, narrative and image columns |
| Surfaces | Variable image positions, angles and sizes | One consistent stage and consistent corner treatments |
| Animation | Independent depth/rotation/scale | 240ms crossfade; only progress follows continuous scroll |
| Icons/controls | Indirect collection controls | Numbered story links, current-step cue, details link and explicit collection button |
| Performance | Multiple moving hero layers and per-image transforms | No hero scroll effects; case callbacks change classes only at story boundaries |

Resolved file findings: `src/pages/Work.jsx` — staging-one-focal-point, scoped cleanup, readable selected state; `src/pages/work.css` — consistent timing, active control scale, opacity-only screen transitions; `src/components/ProductComposition.jsx` — removal of independent floating layers.

Verification results are reported after browser checks. The implementation does not imply an award or a measured conversion improvement. Physical-device Safari and production hosting are outside the automated browser verification scope.

## Verification completed

- Production build passed: CSS 54.99 KB (11.26 KB gzip), JavaScript 344.79 KB (120.96 KB gzip). No new dependency.
- Existing test suite: 8 passed; mocked email/provider transport only.
- 120 responsive checks: five widths (320/390/768/1024/1440), eight routes, top/middle/bottom; no horizontal overflow.
- 28 story-screen checks across four products in forward and reverse order: stage x/y/width stays stable; active counter and screen match; every active image fits within its stage.
- Additional collection counts, expansion/collapse and focus passed for all three expandable projects. Federation's four selected screens already cover its catalog.
- Hero previews passed with mouse hover and keyboard focus. Old floating/depth elements are absent.
- Live reduced-motion changes, mobile fallback and short-viewport fallback passed. No page errors or missing local assets.
- Desktop and mobile browser screenshots inspected. A partial-screen wipe was replaced with a short crossfade; a premature final-stage release was corrected with calculated trailing space.
- Normal/reduced screenshots compared; screen transitions replayed at 10% animation speed through Chromium's Animation playback-rate control.

Verdict: Approve within the inspected Chromium scope. Physical Safari, screen-reader speech, production hosting and live email delivery were not verified by this design pass.
