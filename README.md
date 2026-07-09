# Newspack Shots — Downloads

**→ [Download page](https://thomasguillot.github.io/newspack-shots-releases/)** — always points at the latest release.

A native macOS menu-bar screenshot and screen-recording app for the Newspack team. Every capture is automatically styled to the brand standard — Cobalt background, border, rounded corners, soft shadow — and an MCP server lets AI agents produce pixel-identical output.

**Requires macOS 26 (Tahoe) or later, Apple Silicon.**

> This repository hosts **downloads only** — grab the latest version from
> [**Releases**](../../releases/latest). The source code lives in a private
> repository.

## Install

1. Download the latest `Newspack-Shots-<version>.dmg` from [Releases](../../releases/latest).
2. Open it and drag **Newspack Shots** onto **Applications**. (If an older copy is running, quit it first from its menu-bar icon.)
3. The app is **unsigned** (no Apple Developer Program), so macOS blocks it on first launch. To allow it:
   - Double-click **Newspack Shots**; when macOS warns it "can't verify the developer," click **Done** (*not* "Move to Trash").
   - Open **System Settings → Privacy & Security**, scroll to the **Security** section.
   - Click **Open Anyway** next to *"Newspack Shots" was blocked to protect your Mac*, then authenticate and click **Open**.

   macOS only asks once — after that it launches normally.
4. Trigger your first capture and grant **Screen Recording** when prompted, then quit and relaunch the app once.

Upgrading? Just replace the app in Applications — permissions stay granted. Every release page lists the zip's SHA-256 so you can verify your download.

## What you get

- **⌃⇧1** full screen (with a display picker on multi-monitor setups; clean desktop by default — icons hidden, wallpaper replaced by the brand background) · **⌃⇧2** window (hover, ⇥ to cycle stacks, click) · **⌃⇧3** region (free drag with a pixel-precision magnifier; hold Space mid-drag to reposition, tap it to flip to the window picker and back) · **⌃⇧4** Timed Capture (select a region, then a countdown you can pause — stage open menus and other transient UI) · **⌃⇧5** Scrolling Capture (select the scrolling content, scroll — or let it auto-scroll — and get one tall stitched shot) · **⌃⇧6** Capture Text (OCR to clipboard, nothing saved) · **⌃⇧7** Record Screen (select a region or press Space for a window take, stage during the countdown, and get a styled 16:9 MP4 — clicks ripple in brand color, and the preview's scissors trim it) · **⌃⇧0** All-In-One (a floating toolbar with every capture mode plus Settings)
- Instant auto-save to your folder + clipboard, with a quick preview bottom-left that tidies itself (previews slide away after two minutes; the stack never outgrows your screen) — annotate only when you want to (arrows, rectangles, spotlight, numbered counters, and pixelate to redact emails, keys, and customer data)
- **Auto-updates** — the app checks this repo for new versions after launch and installs them in place (toggle in Settings, or **Check for Updates…** in the menu)

Screenshots never leave your Mac — no cloud, no upload, no analytics. The update check only talks to this repository's Releases.

## For AI agents (MCP)

The app doubles as an MCP server, so agents produce screenshots pixel-identical to yours. After installing the app (and granting Screen Recording), setup is automatic: on first launch it installs the team screenshot skill for Claude Code and registers the MCP server, keeping both up to date. It's on by default — toggle it under **Settings → General → "Set up AI agents"**.

Using another MCP client? It's a standard stdio server — register it manually:

```sh
claude mcp add newspack-shots -- "/Applications/Newspack Shots.app/Contents/MacOS/NewspackShots" --mcp
```

### Tools

| Tool | What it does |
|---|---|
| `capture_fullscreen()` | Styled shot of the main display |
| `capture_window(app, title_contains?)` | Styled shot of a named app's window — no interaction needed |
| `capture_region(x, y, width, height)` | Styled shot of exact screen coordinates (output canvas expands to 3:2) |
| `capture_scrolling(x, y, width, height, max_seconds?)` | Auto-scrolls a region and stitches the frames into one tall styled shot (needs the Accessibility permission; falls back to a single frame without it) |
| `record_screen(x, y, width, height, duration)` | Records a region as a styled MP4 on a 16:9 brand canvas — clicks ripple, clean desktop applies |
| `video_frames(path, times)` | Extracts still frames from a recording as PNGs so agents can verify what it actually shows |
| `style_image(input_path, output_path?)` | Apply the Newspack style to any existing image — the workhorse for browser screenshots |
| `annotate_image(input_path, annotations, output_path?)` | Draw brand-styled arrows, rectangles, spotlight, numbered counters — and pixelate, an irreversible mosaic for redacting secrets — via JSON |
| `compose_grid(input_paths, columns?, output_path?)` | Lay 2–12 raw captures into one styled masonry grid (reading order, columns auto or 2–4) — same padding, background, and rounded corners as a single shot |
| `read_text(x?, y?, width?, height?)` | OCR a screen region (or the whole display) and return the text in reading order — nothing styled or saved |
| `list_windows()` | List capturable windows (app, title, size, position) so agents don't guess `capture_window` arguments |

Capture, style, and annotate tools return the saved file's path; capture/style tools also report the canvas size and where the original capture sits on it, so you can convert capture coordinates into canvas coordinates when annotating.

### Website screenshots (recommended recipe)

1. Drive a browser (e.g. the chrome-devtools MCP: `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest`).
2. Resize the page to **1512×982**, emulate **device pixel ratio 2**.
3. Before scrolling or capturing, inject: `<style>::-webkit-scrollbar{display:none} *{scrollbar-width:none}</style>`
4. Screenshot the viewport, then call `style_image` on the result — the returned file is the deliverable.

When annotating, prefer arrows and numbered counters; there is deliberately no text type — put words in the surrounding document.

### The full agent skill

Automatic setup also installs the bundled Claude Code skill with the
complete team screenshot guidelines — your agent follows the house rules
automatically whenever you ask it for a Newspack screenshot. Manual
fallback if you prefer:

```sh
mkdir -p ~/.claude/skills/newspack-shots && \
  cp "/Applications/Newspack Shots.app/Contents/Resources/SKILL.md" \
     ~/.claude/skills/newspack-shots/SKILL.md
```

## License

Proprietary — © Automattic. Built for the Newspack team; provided as-is.
