---
name: Newspack Shots — Downloads
description: The download page for Newspack Shots, styled as the macOS desktop the captures come from.
colors:
  primary-600: "#003DA5"
  primary-500: "#2055B0"
  primary-700: "#00296E"
  primary-900: "#001437"
  primary-000: "#DFE7F4"
  primary-050: "#BFCFE9"
  primary-100: "#9FB6DD"
  secondary-500: "#26D07C"
  neutral-000: "#FFFFFF"
  neutral-300: "#DDDDDD"
  surface: "#F6F8FC"
  surface-chrome: "#E9EEF6"
  ink: "#001437"
  ink-soft: "#43536F"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(2.6rem, 6.5vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.8rem, 4vw, 2.6rem)"
    fontWeight: 700
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
rounded:
  chip: "4px"
  code: "5px"
  keycap: "10px"
  window: "12px"
  pill: "999px"
spacing:
  gap: "40px"
  card: "24px"
  section: "clamp(72px, 9vw, 144px)"
components:
  button-download:
    backgroundColor: "{colors.secondary-500}"
    textColor: "{colors.primary-900}"
    rounded: "{rounded.pill}"
    padding: "14px 34px"
  menubar-download:
    backgroundColor: "{colors.secondary-500}"
    textColor: "{colors.primary-900}"
    rounded: "{rounded.pill}"
    padding: "4px 14px"
  keycap:
    backgroundColor: "{colors.neutral-000}"
    textColor: "{colors.primary-600}"
    rounded: "{rounded.keycap}"
    padding: "14px 18px"
  window:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.window}"
  titlebar:
    backgroundColor: "{colors.surface-chrome}"
    textColor: "{colors.ink-soft}"
    height: "40px"
  tool-chip:
    backgroundColor: "{colors.primary-000}"
    textColor: "{colors.primary-600}"
    rounded: "{rounded.code}"
    padding: "2px 8px"
  eyebrow-chip:
    backgroundColor: "rgba(0, 0, 0, 0.9)"
    textColor: "{colors.neutral-000}"
    rounded: "{rounded.chip}"
    padding: "3px 10px"
---

# Design System: Newspack Shots — Downloads

## 1. Overview

**Creative North Star: "The Page Is the Desktop"**

The site is the macOS desktop the captures come from. A real menu bar sits fixed at the top (the place the app actually lives), the surface is the cobalt brand wallpaper with a soft top light and a deeper floor, and content floats as macOS windows: traffic lights, tinted chrome, deep desktop shadows. The hero window holds an actual styled capture wearing the app's exact output recipe. The page still demonstrates the product; now it does so by being the environment the product works in.

The register is product: the page exists so a teammate can grab the DMG and clear the unsigned-app install in under a minute. Personality is playful, punchy, bold, and it lives in desktop details: pressable keycaps, annotation-counter callouts, the self-dragging marquee headline, the live menu-bar clock. It explicitly rejects generic SaaS landing patterns, corporate stiffness, and dev-tool brutalism.

**Key Characteristics:**
- Committed color: the cobalt wallpaper (Primary 600 falling to Primary 900, 5% film grain) carries roughly half the surface; windows are cobalt-tinted light; emerald is the only action color.
- Desktop-literal: menu bar anatomy (with a live clock), window chrome, and shadows follow macOS, not web convention.
- Self-demonstrating: a display headline wearing the region-selection marquee, and a real styled capture in the hero window.
- Extreme type scale: display at 5rem/800 against 0.85rem labels; scale does the drama, not effects.
- Responsive motion, never staged: hover, press, and one-time staggered scroll reveals; nothing auto-plays.

## 2. Colors

The palette is brand.newspack.com verbatim (Primary Cobalt, Secondary Emerald, Neutral), plus two cobalt-tinted light surfaces for window interiors.

### Primary
- **Primary 600** (#003DA5): the wallpaper and the page identity. The desktop field at the top of the page, falling in a single vertical gradient to Primary 900 at the floor.
- **Primary 900** (#001437): the wallpaper's floor, the capture canvas inside the hero window, and dark text on emerald.
- **Primary 700** (#00296E): inline `kbd` chips on the wallpaper.
- **Primary 000 / 050 / 100** (#DFE7F4 / #BFCFE9 / #9FB6DD): the text-on-cobalt ladder: lead-ins and story text, callout body copy, footnotes and footer.

### Secondary
- **Secondary 500** (#26D07C): the action color. Both download CTAs, links, callout counters, install-step discs, annotation strokes. Text on emerald is always dark (Primary 900), never white.

### Neutral
- **Surface / Surface-chrome** (#F6F8FC / #E9EEF6): window body and titlebar, cobalt-tinted so light surfaces stay in the brand's blood.
- **Ink / Ink-soft** (#001437 / #43536F): heading and body text inside windows.
- **Neutral 000** (#FFFFFF): headings on cobalt and the keycap face.
- **Neutral 300** (#DDDDDD): the keycap's hard pressed edge.

### Named Rules
**The Wallpaper Rule.** The page background is the cobalt wallpaper, always. Light surfaces exist only inside window chrome; there is no white page.

**The Emerald Action Rule.** Secondary 500 marks action and capture. It never decorates, and text on it is always dark.

## 3. Typography

**One Family:** Inter variable (woff2, 100–900), falling back to -apple-system, BlinkMacSystemFont, sans-serif. Mono (ui-monospace stack) only for MCP tool names.

**Character:** Confident single-family hierarchy. Heavy (700) tightened headings; relaxed 1.6 body. `text-wrap: balance` on headings, `pretty` on paragraphs.

### Hierarchy
- **Display** (800, `clamp(2.6rem, 6.5vw, 5rem)`, 1.08, -0.035em): the `h1` only.
- **Headline** (700, `clamp(1.8rem, 4vw, 2.6rem)`, -0.025em): section `h2`s, left-aligned under an eyebrow chip.
- **Title** (600, 1.05rem): callout and shortcut `h3`s.
- **Body** (400, 1rem, 1.6): copy; capped at 52–62ch depending on surface.
- **Label** (400, 0.85rem): menu bar, requirements, footnotes, footer. Tabular numerals for versions and the clock.

### Named Rules
**The Eyebrow Chip Rule.** Every section opens with a caption chip (white on black 90%, radius 4): the app's own annotation-caption vocabulary doing navigation work.

## 4. Elevation

Depth is macOS depth. Windows carry the desktop shadow (`0 24px 60px rgba(0,10,28,0.40), 0 3px 10px rgba(0,10,28,0.25)` plus a 1px dark border); the styled capture inside the hero window carries the app's exact two-layer recipe in container units; keycaps have a hard un-blurred pressed edge. Everything else sits flat on the wallpaper.

### Shadow Vocabulary
- **Window shadow** (`0 24px 60px rgba(0,10,28,0.40), 0 3px 10px rgba(0,10,28,0.25)`): every floating window.
- **Capture shadow** (`0 0 1.077cqw rgba(0,0,0,0.10), 0 1.3463cqw 1.6155cqw rgba(0,0,0,0.15)`): the app's recipe, only on styled shots inside a canvas.
- **Keycap edge** (`0 4px 0 #DDDDDD`): the pressed edge; collapses to `0 1px 0` when hovered/pressed.
- **CTA hover glow** (`0 6px 24px rgba(38, 208, 124, 0.35)`): under the download pill on hover.

### Named Rules
**The macOS Shadow Rule.** A shadow is allowed only if macOS or the app itself would draw it: window, capture, icon, keycap. No decorative ambient shadows on flat wallpaper elements.

## 5. Components

Tactile and confident. Components either sit directly on the wallpaper (callouts, keycaps, story text) or live inside window chrome (tools, install steps, the hero capture).

### Menu Bar (signature)
- Fixed, 44px, translucent light glass (`rgba(246,248,252,0.82)` + 20px backdrop blur), 1px hairline bottom. This is the one purposeful glass surface on the page.
- Left: app icon + name, then nav items styled as menu titles. Hover: cobalt 10% pill; active section (scroll-spy): solid cobalt pill with white text.
- Right: version (tabular), small emerald Download pill, static 9:41 clock. Mobile collapses to icon + name + Download.

### Windows
- 12px radius, `--surface` body, `--surface-chrome` titlebar with traffic lights (#FF5F57 / #FEBC2E / #28C840) and a centered 0.8rem title.
- Hero window: contains the Primary 900 canvas replaying the app's styling recipe with static annotation marks; clicking replays the annotation draw (box, arrow, chip, counters).
- Content windows: agent session (the MCP toolbox as three labeled clusters: Capture / Style &amp; compose / Annotate &amp; verify, each tool's mono cobalt name above its description, no chip boxes), install (numbered steps).

### The Selection Marquee Headline (signature)
- Part of the display headline sits inside the app's region-selection chrome: a 1px white box and a size label (black 65% chip) that reports the marquee's real on-screen size via JS. The typography wears the product.
- On load it drags itself into place once (700ms quart-out, after fonts settle): the frame grows from the top-left corner via clip-path while the label rides the bottom-right corner, its numbers counting the rectangle's true current size. Reduced motion and no-JS get the settled state.

### Buttons
- One shape: the emerald pill, dark text. Large in the hero (14px 34px), small in the menu bar (4px 14px). Hover: 1px lift + emerald glow; menu-bar variant brightens instead.

### Keycaps
- White face, cobalt legend, 10px radius, hard `0 4px 0` Neutral 300 edge. Hovering the shortcut item presses the key (3px travel, edge collapses). Inline `kbd` in copy is a small Primary 700 chip.

### Callouts (signature)
- Feature facts on the wallpaper led by 28px emerald annotation counters; hover summons a 1px white selection marquee at -10px inset. No card boxes.

### Install Steps
- Inside a window: 36px emerald discs with dark numbers, connected by a 2px emerald spine, body text in ink-soft, bolded terms in ink.

## 6. Do's and Don'ts

### Do:
- **Do** keep the wallpaper cobalt (a single #003DA5 to #001437 vertical gradient) and put light surfaces only inside window chrome.
- **Do** reproduce macOS anatomy faithfully: traffic lights, titlebar proportions, menu bar behavior, desktop shadows.
- **Do** reproduce the app's capture recipe (canvas 1857/1238, radius `0.5385cqw`, the two-layer shadow) whenever showing a screenshot.
- **Do** put dark text (Primary 900) on emerald, never white.
- **Do** keep motion responsive: hover, press, and one-time scroll reveals only; honor `prefers-reduced-motion` by landing on finished states.
- **Do** keep a Download action visible at all times (hero pill + persistent menu-bar pill).

### Don't:
- **Don't** build generic SaaS landing patterns: hero-metric templates, identical icon-heading-text card grids, gradient text, stock illustration.
- **Don't** go corporate/enterprise: stiff, dense, jargon-heavy copy or layouts.
- **Don't** drift into dev-tool brutalism: terminal-dark themes, monospace-everything, neon-on-black.
- **Don't** add auto-playing choreography, draggable windows, or any hover-only functionality.
- **Don't** use glass anywhere except the menu bar, or shadows macOS wouldn't draw.
- **Don't** use side-stripe borders, modals, or em dashes in copy.
