# Review of Simpedu at 83ae309

Pulled latest main and reviewed the new hero and project compositions. This is an audit only; application source was not edited.

## Results that held

- Production build passes: 74 modules; JS 293.29KB / 99.98KB gzip, CSS 42.49KB / 8.99KB gzip. The self-hosted font is separate.
- No document overflow in 168 measurements: eight routes × seven viewport widths × top/middle/bottom. Widths: 320, 390, 768, 900, 1024, 1366, 1440px.
- Mobile menu opens and Escape closes it.
- A mocked booking API 502 displays an error rather than success. No real email was sent.
- No uncaught page exceptions observed in the sampled checks.
- The hero now leads with real product work; this is a useful direction to retain.

## Findings

| Priority | Finding | Evidence | Required fix |
| --- | --- | --- | --- |
| P1 | Hero image causes a visible loading shift on mobile | Home.jsx:135–145 has no image dimensions or reserved ratio. With the desktop screenshot delayed at 390px, the hero grows from 629px to 806px and pushes the next section from y=694 to y=871: 177px movement. | Set the desktop image's intrinsic width=2560 and height=1325, reserve the stack's aspect ratio, and provide dimensions for the phone. Repeat the delayed-load check. This measurement is displacement, not a field CLS score. |
| P2 | Workflow captions do not align on desktop | styles.css:615–618 leaves image heights unconstrained. At 1440px the dashboard is 196px high; phone images are 609px. Their heading positions differ by 413px. | Put every image inside a common media stage, e.g. a 360–420px desktop region, using contain rather than cropping. Align heading/caption rows. Give mobile its own compact, readable presentation. |
| P2 | New workflow section loses the page gutters | styles.css:614 sets padding:80px 0, replacing the standard 24px horizontal section padding. | Preserve 24px mobile gutters and the page grid; vary only vertical padding. Check heading and paragraph edges at 320px. |
| P2 | Case numbers float halfway down the project | styles.css:600 changes font size but inherits position:absolute, top:50%, left:50%, and translate from the original .case-index rule. The federation number appears between copy and image. | Reset position/inset/transform, or remove decorative numbering. Keep sequence labels in normal flow if retained. |
| P2 | “Wide” federation and ScoreBoard exhibits remain half-width | Work.jsx:42–69 uses case-wide/case-hero-img, but .case still inherits two columns. Browser computed 560px image width in a 1152px article. | Give those two exhibits explicit grid areas or a full-row image spanning both columns. School and commerce can retain paired compositions. Do not let a naming convention stand in for a real layout rule. |
| P2 | Manual screenshot access disappeared | Work.jsx now renders static images only. Browser finds zero .device-dots buttons. The accessible DeviceShowcase component is still imported but unused. | Preserve distinct lead compositions, then expose the remaining real screens in an accessible inline gallery or useful case-study detail pages. If intentionally removing gallery access, document that product decision. |
| P2 | Commerce image is mislabeled | Work.jsx:88–89 labels /work/uniminute/phone-3.webp as Checkout. The asset shows a burger product-detail screen, not checkout. | Rename alt/caption to Product details, or provide a verified checkout capture. Never invent a checkout image. |
| P2 | Reduced-motion preference still leaves rotating capability text | CycleWord.jsx:8–12 runs an interval plus delayed state changes without a preference gate or pause control. Under reduced motion, capability text changed from design to no-code after 3.1s. | Prefer a stable capability heading. Otherwise honor the live preference, clear interval and timeout on cleanup, and provide pause for sustained automatic cycling. |

## Remaining content and finish work

- Home still contains subscription-style services/copy, duplicate process content, and an unverified YC testimonial. Love still publishes the review dataset. Verify evidence before promoting claims; otherwise replace with truthful project proof.
- New workflow text says “in seconds” and “updates instantly.” The screenshots alone do not establish delivery speed or synchronization behavior. Use plain supported descriptions until verified.
- New product compositions still use captures containing browser tabs and phone browser controls. Request clean product captures; do not generate synthetic UI text.
- There are still no substantial case-study detail routes. This limits the site's ability to explain the company's contribution.
- Basic sharing/identity metadata remains unfinished: index.html has no Open Graph image tags or favicon declaration. Route descriptions are client-managed, and pages without an explicit description can inherit the previous route's value through useDocumentTitle.js. Define an explicit default and real share assets appropriate to the deployment.
- Form failure copy points to hello@simpedu.in, while the contact section promotes humanresource@simpedu.in and support@simpedu.in. The repository does not prove whether the hello inbox exists; use an owner-confirmed address consistently.

## Fix prompt

Work on the actual React/Vite Simpedu repository at the current main. Read this review, DESIGN.md, and the current implementation prompt. Preserve the responsive grids, local font, truthful form errors, working menu, shared four-project catalog, and product-led direction.

First reserve image geometry so delayed hero/workflow loads do not displace surrounding content. Then align workflow media/captions in a shared desktop stage, restore mobile gutters, reset the old absolute case-index positioning, and make the intended federation/ScoreBoard imagery actually span the wide grid. Preserve readable mobile variants rather than shrinking a desktop composition.

Keep distinct project lead images while restoring deliberate access to remaining screenshots through accessible galleries or useful case detail pages. Correct the Uniminute product-detail caption. Replace the capability rotator with stable text or implement live reduced-motion and timer cleanup. Do not add animation to hide layout errors.

Resolve unsupported public claims and placeholder editorial content using verified company information; do not invent evidence. Request clean captures where browser/system chrome is embedded. New generated hardware or scenery is optional and should follow the existing asset briefs; it is not needed to fix these defects.

Verify the production build, delayed-image loading, desktop/mobile caption alignment, image proportions, all intended screen-selection controls, reduced motion, navigation, error/retry behavior, and document width at the top/middle/bottom across 320–1440px. Report measured results and remaining content dependencies. Do not claim awards, verified synchronization, or field performance without supporting evidence.

## Boundaries

Local source review plus headless Chrome/Playwright against Vite. Browser screenshot evidence: desktop hero at 1366px, mobile hero, desktop/mobile workflow, and federation exhibit. Relevant scripts/results/screenshots are retained under /tmp/simpedu-review-83ae309/. The Impeccable detector returned one dynamic-source warning in the unused ImageCycle component; it is not counted as a verified broken image. No independent parallel review, visible-browser overlay, detector injection, or overlay live server was used. No live deployment, real email delivery, Lighthouse/field Core Web Vitals, or complete WCAG/zoom audit was performed. The temporary Vite server was stopped after review. Application code remains unchanged.
