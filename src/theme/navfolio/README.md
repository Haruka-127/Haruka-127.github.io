# astro-navfolio theme sources

This site uses the actual astro-navfolio theme sources, vendored here for a reproducible static build.

## Upstream versions

- [dodolalorc/astro-navfolio](https://github.com/dodolalorc/astro-navfolio/tree/70aa71ddd9f7ee4af38fa5810b320820712f1885), branch `v1`, commit `70aa71ddd9f7ee4af38fa5810b320820712f1885`.
  - `components/cards/{IntroCard,ProfileCard}.astro`
  - `components/layout/DashboardFlow.astro`
  - `components/widgets/DoingCard.astro`
  - `components/Icon.astro`
  - The floating header styling in `src/styles/global.css` is adapted from `BlogTopNav.astro`.
- [navfolio/theme-default](https://github.com/navfolio/theme-default/tree/0be2d98a2550afab644cdca2b129245027615638), commit `0be2d98a2550afab644cdca2b129245027615638`.
  - `components/BaseLayout.astro`
  - `styles/{global,fonts,palettes,markdown-layouts}.css` (unmodified).

Both upstream MIT licenses are included alongside this file. The theme CSS also retains its original Bear Blog attribution.

## Site adaptations

- `Icon` uses Lucide’s numeric size type to satisfy the project’s strict TypeScript settings.
- Japanese paragraph rendering uses the existing build-time `BudouxText` component.
- `DashboardFlow` has slots for interests and achievements instead of the unused blog heatmap; mobile ordering includes those sections.
- `DoingCard` displays project titles, summaries and existing detail links.
- Profile, introduction and project props are mapped from `src/data/` in `src/data/navigation.ts`.
- The Home / Projects page navigation (rendered with an active page at build time), contact links and profile-specific styles live outside this directory.
- The original theme's green-soft palette and locally bundled Maple Mono font are used. Japanese text falls back to Japanese system fonts without Chinese font downloads or subset build tooling.

To update, compare these pinned upstream versions against a new release, retain the site adaptations above, and run `npm run check` and `npm run build`. Do not overwrite this directory blindly.
