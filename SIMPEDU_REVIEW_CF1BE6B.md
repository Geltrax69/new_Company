# Simpedu review at cf1be6b

Reviewed 16 October 2026 after pulling latest main. Application source was not edited. The current commit fixes several prior findings but introduces a serious hero rendering regression.

## Fix before publishing

**P1 — Hero images are severely stretched.**

Home.jsx now adds correct intrinsic dimensions, but styles.css:588–589 sets responsive widths without `height: auto`. HTML height attributes therefore remain the rendered height. At 1366px the dashboard renders at 470×1325 and the phone at 132×2622. The hero is 1529px tall. At 390px the dashboard renders at 342×1325 and the phone at 109×2622; the hero is 1954px tall and the absolutely positioned phone extends above the section. This is visually broken despite the passing build and lack of horizontal overflow.

Keep the width/height attributes; add proportional CSS sizing:

```css
.hero-desktop,
.hero-phone,
.workflow-step img {
  height: auto;
}
```

Retain the workflow media stage and its contain/max-size constraints. The added workflow height rule also avoids letting HTML dimensions govern the image box. Inspect the phone's border/content ratio after repair.

A temporary browser-only hero override reduced the desktop hero from 1529px to 553px, the dashboard to 470×243, and the phone to approximately 132×277 including its border. This validates the fix direction, not a committed implementation. Re-test delayed loads and narrow layouts after applying it.

**P2 — Case-number fix disrupts the two-column project grid.**

styles.css:600 makes `.case-index` static but does not assign a full-width grid row. In Work.jsx:21–43, the school article has four grid items: index, copy, image pair, and gallery disclosure. They auto-place as index/copy in row one and images/disclosure in row two. At 1366px, copy begins at x=699 while the index sits alone at x=107; image panels start on the following row and the disclosure floats beside them. Commerce has the same index/copy auto-placement problem.

A minimal tested correction is:

```css
.case-index,
.case-more {
  grid-column: 1 / -1;
}
```

This gives the index its own row, copy and media a shared row, and the gallery disclosure a final full-width row. Explicit named grid areas are also reasonable. Check school and commerce independently on desktop; preserve normal single-column order on mobile. A temporary browser-only override confirmed the corrected column assignment.

**P2 — CycleWord timeout cleanup is still ineffective.**

CycleWord.jsx:12–16 returns a cleanup function from inside `setInterval`. The timer API ignores that return value; only the effect's cleanup is run by React. The 350ms timeout remains active on unmount or a preference change.

Initial reduced-motion behavior is now stable. However, switching to reduce during the fade still changed the text from `design` to `no-code` after the pending callback. The component also does not reset to the first word as its comment promises.

Keep the pending timeout handle in effect scope and clear both timers in the effect return. Under reduced motion render the first word with opacity 1, even if the previous state was mid-fade. Alternatively use a stable capability heading and remove this automatic cycling. Any sustained autoplay retained should have an accessible pause mechanism.

**P2 — Screenshot access is restored for only one project.**

The school disclosure opens and its labelled button selected screen 2 of 8 correctly. Work renders only one `case-more` disclosure. Federation, ScoreBoard, and Uniminute still show their lead compositions without access to the remaining catalog screens. Add accessible galleries or substantial case-study pages for those projects if the portfolio should expose the complete work. Preserve the distinct lead compositions.

## Confirmed improvements

- Workflow media stages now align all three desktop headings at the same measured y-position.
- Workflow horizontal gutters are restored.
- Federation and ScoreBoard images span the full measured 1152px article width, instead of half width.
- The Uniminute product-detail screenshot is correctly labelled Product details.
- School manual gallery selection works.
- The rotator stays still when reduced motion is enabled before mount.
- No horizontal overflow in 90 measurements: six routes × five widths × top/middle/bottom. Widths: 320, 390, 768, 1024, 1440px.
- Production build passes: 74 modules, JS 296.17KB / 100.93KB gzip, CSS 42.97KB / 9.07KB gzip. Font payload is separate.
- No uncaught page exceptions observed during the targeted checks.

## Remaining content and design work

Unverified testimonials/YC references, placeholder blog content, subscription-style copy, unsupported “instantly/in seconds” claims, clean product captures, and substantial case-study routes remain unresolved from the previous audit. These were not changed by the latest commit. Confirm factual evidence rather than inventing copy or metrics.

No new generated image is needed for the current regressions. Correct sizing and layout first. Existing image briefs in SIMPEDU_REDESIGN_PROMPT.md cover optional future hardware/scenery; real product UI should remain authentic.

## Copy-ready fix prompt

Fix the current React/Vite Simpedu site based on SIMPEDU_REVIEW_CF1BE6B.md. Preserve the intrinsic image dimensions but add proportional responsive heights to the hero images and check the workflow image box. Correct school/commerce grid placement by assigning index and gallery rows explicitly. Fix CycleWord's actual effect cleanup and guarantee a visible stable first word on live reduced-motion changes. Restore deliberate access to the remaining project screenshots without discarding distinct lead compositions.

Verify desktop and mobile screenshots, image aspect ratios, the first viewport, delayed loading, normal/reduced-motion transitions during an active fade, gallery keyboard selection, and page widths at top/middle/bottom. Keep the shared project catalog, truthful forms, working menu, local font, and other completed fixes. Do not treat a successful build or zero horizontal overflow as proof of visual correctness. Finish with measured checks and representative screenshots.

## Review boundaries

Source diff and local headless Chrome/Playwright review, including desktop/mobile hero, school project, workflow, gallery interaction, wide exhibit sizes, initial/live reduced motion, and responsive document width. Temporary browser CSS experiments were not saved into the source. Evidence and scripts: /tmp/simpedu-review-cf1be6b/. The temporary Vite server was stopped after review. No production deployment, real email delivery, Lighthouse/field performance, or complete WCAG/zoom audit was performed. This was a single sequential review, with no parallel assessment, native browser overlay, detector injection, or overlay live server. The earlier detector warning concerned dynamic image syntax in unused ImageCycle and is not a confirmed broken asset; the detector was not rerun for this narrow diff review.
