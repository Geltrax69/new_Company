# Homepage cube field

The homepage uses Aceternity UI's official Background Cubes Grid, installed with
`npx shadcn@latest add @aceternity/background-cubes-grid`.

Source and API: https://ui.aceternity.com/components/background-cubes-grid
Registry: https://ui.aceternity.com/registry/background-cubes-grid.json

## Setup

The existing app was React JSX with plain CSS. It now supports TypeScript for
new components, Tailwind CSS v4 through its Vite plugin, and shadcn registry
installation through `components.json`. Existing JSX remains supported.
Tailwind's theme and utility layers are imported without Preflight so the
established site typography, layout, and form reset remain intact.

## Placement and behavior

- `HomeCubes.tsx` wraps the official component behind the homepage hero only.
- Use the light isometric variant, neutral cube faces, and a restrained crest.
- Preserve the Simpedu headline, authentic product screenshot, and route links.
- The white veil in `premium.css` protects text contrast and fades into the page.
- Pointer movement drives the waves; idle waves are disabled.
- Three.js and Motion load in a separate chunk on suitable pointer devices.
- Offscreen and hidden-tab scenes unmount and dispose their WebGL resources.
- Touch devices and reduced-motion users receive a static CSS cube pattern.
- A component error boundary retains the static pattern if WebGL cannot start.
- No generated imagery is needed; the field is rendered geometry.

`npm run typecheck`, `npm run build`, and `npm test` validate the integration.
The WebGL chunk is intentionally lazy and is larger than Vite's default 500 KB
warning threshold; it is not part of the initial application bundle.
