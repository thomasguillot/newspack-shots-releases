# Newspack Shots — Downloads

This repo hosts only the GitHub Pages download site (`docs/index.html`, a single self-contained page) and the README for Newspack Shots releases. The app's source lives in a private repository.

## Design Context

Design work on the site is governed by two root files:

- **PRODUCT.md**: strategy. Register is `product` (the page serves the download task), personality is playful/punchy/bold. Core principles: the page is the demo; download first, delight second; Newspack blood; punchy, not loud; agents are users too.
- **DESIGN.md**: visual spec. Creative North Star is "The Page Is the Desktop": the site is the macOS desktop the captures come from (fixed menu bar, cobalt wallpaper, content in macOS window chrome, the hero window holding a real styled capture). Tokens live in its YAML frontmatter; `.impeccable/design.json` carries shadows, motion, and component snippets.

Read both before changing anything visual in `docs/index.html`. Keep WCAG AA contrast and honor `prefers-reduced-motion`. No em dashes in site copy.
