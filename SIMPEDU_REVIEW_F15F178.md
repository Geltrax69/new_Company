# Simpedu verification at f15f178

Reviewed 16 October 2026 after pulling latest main. The four regressions reported in SIMPEDU_REVIEW_CF1BE6B.md are now fixed in the tested implementation. No new blocking visual regression was found in the sampled checks. This is a local review, not a production certification.

## Verified fixed

- **Hero proportions:** at 1366px the dashboard renders at 470×243 and the phone at approximately 132×277 including its border. Hero height is 553px, down from the broken 1529px. At 390px the dashboard renders at 342×177; the phone at about 109×229. Both screenshots visually preserve their proportions.
- **Loading stability:** deliberately delaying the hero dashboard at 390px caused zero movement in the following workflow section. This measures that specific image-load scenario, not a field CLS score.
- **Project grid placement:** school index and gallery now span their own rows; copy and image pair occupy the intended shared row. Desktop/mobile school screenshots were inspected. The same shared rules address the commerce index placement.
- **Gallery access:** all four projects expose a screenshot disclosure. Click and ArrowRight selection reached screen 3 in every gallery: 3/8, 3/4, 3/8, 3/8.
- **Reduced motion:** capability text stays static on initial reduced-motion load. Switching to reduced motion during a fade kept the first word visible instead of allowing the previous timeout to select the next word. Source cleanup now clears both interval and pending timeout.
- **Earlier fixes retained:** workflow headings align, and federation/ScoreBoard lead images remain full article width, measured at 1152px.

## Remaining confirmed issue

**P2 — Route descriptions leak into pages without their own description.**

Location: `src/useDocumentTitle.js:8`, plus pages calling the hook without a description, such as Book in `src/pages/Misc.jsx`.

Reproduction: navigate from Work to Book demo using the header link. The document title changes, but meta description remains “Products built by Simpedu LLP — school management, sports federation CMS, live scoreboards and e-commerce.” A direct fresh load of pages that do not supply a description may have no description at all, since index.html contains no default description.

Fix: always write an explicit route description or a genuine default in useDocumentTitle. Give Book, Apply, blog detail, and 404 an intentional value. Add a static default description to index.html as well; remember that client-side updates alone do not establish how every crawler/share client will see the page. Define real social-sharing metadata for the deployment when approved assets and the production URL are available.

## Existing content and design backlog

These are unchanged from earlier reviews, not new regressions introduced by this commit:

1. Home and Love still publish unverified named testimonials and YC references. Verify evidence or replace with truthful project proof.
2. Subscription-service language, repeated process sections, and placeholder blog articles remain. Align them with the actual business and remove unfinished editorial content from public promotion.
3. “Instantly” and “in seconds” claims require product evidence. The form fallback address `hello@simpedu.in` also needs owner confirmation against the other published contact addresses.
4. Desktop and commerce source captures still include browser/system chrome. Obtain clean authentic captures; generated fake UI is not a suitable replacement.
5. Substantial case-study detail pages are still absent. These would add more credibility than another decorative animation.
6. The capability rotator now respects reduced motion, but normal-mode automatic cycling still has no visible pause. A stable heading is the simpler accessible design choice, or provide a pause control.

No new generated image is necessary for the remaining metadata issue. Optional image briefs and placements are already in SIMPEDU_REDESIGN_PROMPT.md.

## Next implementation prompt

Preserve the verified hero, grid, gallery, reduced-motion, font, form, and shared-catalog fixes in the current React/Vite site. Fix the route-description lifecycle by always applying an explicit route description or a meaningful default, including direct loads and client navigation. Verify Work → Book → About and fresh Book/Apply loads. Add approved sharing metadata/assets only when the production URL and real assets are known.

Then consolidate the truthful company narrative: verified projects, clear capabilities, one process section, and useful case studies. Do not publish invented testimonials, adoption numbers, awards, speed claims, or unconfirmed email addresses. Keep existing product UI authentic, request cleaner captures, and use the current image briefs only when hardware/scenery is useful. Keep the completed responsive behavior and galleries intact.

## Checks and boundaries

- Production build passed: 74 modules; JS 296.67KB / 100.99KB gzip; CSS 43.06KB / 9.09KB gzip. Font payload is separate.
- No horizontal document overflow in 90 measurements: Home, Work, About, Services, Book, Apply × 320/390/768/1024/1440px × top/middle/bottom.
- No uncaught page exceptions observed in the targeted visual checks. Browser evidence included desktop/mobile hero and school project, workflow alignment, delayed image loading, all four galleries, and live reduced-motion changes.
- Headless local Chrome through Playwright against Vite. Evidence: `/tmp/simpedu-review-f15f178/`. The older single-gallery test selectors were adapted to the four-gallery DOM; selector failures during adaptation were test-harness issues, not application failures. The final interaction and layout run completed successfully.
- Application source was not edited. No live deployment, real email delivery, full accessibility/zoom certification, or Lighthouse/field performance measurement. Single sequential review; no parallel assessment, browser overlay, detector injection, or overlay live server. The temporary Vite server was stopped after review. This narrow verification reused source/browser evidence rather than rerunning the old unused-ImageCycle detector warning.
