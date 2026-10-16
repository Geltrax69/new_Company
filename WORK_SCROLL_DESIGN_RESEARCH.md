# Work presentation — compact collection decision

Updated 16 October 2026. This direction replaces the long per-image sticky story, while retaining every product screen. Earlier design reports are historical.

## Decision

Use one compact inline gallery per project: a large stable preview, selected-screen explanation, previous/next controls and a contact sheet of actual screenshot thumbnails. All 32 images are available directly. Scrolling advances between projects; choosing a thumbnail advances the image. There is no modal, autoplay, pinning or forced scroll length.

The complete school collection contains 12 screens. Assigning 70svh of scroll to each screen made the school case more than 8,400px tall. A viewer plus a two-row desktop contact sheet presents the same material in a much smaller footprint. Visitors can scan the projects quickly and inspect a product in depth at their own pace.

## Options assessed

| Pattern | Decision |
| --- | --- |
| One scroll section per screenshot | Reject: complete catalog creates an overly long page |
| Fast automatic slideshow during a short scroll | Reject: screens can be skipped before they are readable |
| Hidden “more screens” disclosure | Reject: obscures the catalog the owner asked to expose |
| Fullscreen modal | Reject: separates the screens from the project context |
| Inline large preview plus all thumbnails | Use: complete, directly selectable, compact and readable |

Earlier research consulted [Instrument](https://www.instrument.com/work), [Build in Amsterdam](https://www.buildinamsterdam.com/) and [GSAP documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). The compact composition is a project-specific judgment, not a claim that those sites implement it. The earlier automated Build in Amsterdam capture stayed in its loading state; its full motion was not verified.

## Behavior

- Full data remains in `src/data/workStories.js`: 12 school, 4 federation, 8 scoreboard, 8 commerce. Catalog data matches all physical WebPs.
- Every image has a directly selectable thumbnail. The desktop school grid has two rows of six; phones use four columns.
- The selected image crossfades over 240ms and updates its description, count and selected thumbnail. Controls support Left/Right/Home/End, previous/next and touch swipe. No autoplay.
- Images retain their aspect ratio in a fixed-size stage. No rotation, scaling, independent translation or image-over-text effects.
- On phones the viewer precedes the changing explanation, keeping thumbnail and image positions stable when choosing another screen.
- Reduced motion keeps a brief 150ms opacity transition and removes the explanation entrance.
- Same-product details remain visible as clearly titled sections, with scope, year, image count and links.
- No new generated artwork, animation dependency or scroll engine. GSAP setup was removed from Work; shared source dependencies remain available elsewhere.

## Verification

The filesystem-backed coverage test still requires every source exactly once in the gallery data and catalog. Browser verification covers all thumbnail choices, keyboard/arrows, touch swipe, details anchors, responsive overflow and reduced motion. Measurements compare the same viewport before and after this change; they are layout measurements, not performance or conversion scores.

Verified results: all 32 selections, 4 details anchors, arrow/keyboard controls, touch swipe, 20 responsive project checks and reduced motion passed with no browser page errors. At 1440 × 900 the page reduced from 25,659px to 7,546px (70.6%); the school case reduced from 8,431px to 1,404px. At 390 × 900 the page reduced from 24,640px to 9,452px (61.6%); school reduced from 8,486px to 1,930px. The gallery change does not assert any measured conversion lift or award status.
