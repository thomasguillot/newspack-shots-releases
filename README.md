# Newspack Shots — Downloads

A native macOS menu-bar screenshot app for the Newspack team. Every capture is automatically styled to the brand standard — Cobalt background, padding, rounded corners, soft shadow — and an MCP server lets AI agents produce pixel-identical output.

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

- **⌃⇧1** full screen (with a display picker on multi-monitor setups) · **⌃⇧2** window (hover, ⇥ to cycle stacks, click) · **⌃⇧3** region (free drag with a pixel-precision magnifier) · **⌃⇧4** timed 5s capture (for open menus and other transient UI)
- Instant auto-save to your folder + clipboard, with a quick preview bottom-left — annotate only when you want to (arrows, rectangles, spotlight, numbered counters)
- **Auto-updates** — the app checks this repo for new versions after launch and installs them in place (toggle in Settings, or **Check for Updates…** in the menu)

Screenshots never leave your Mac — no cloud, no upload, no analytics. The update check only talks to this repository's Releases.

## For AI agents (MCP)

The app doubles as an MCP server, so agents produce screenshots pixel-identical to yours. After installing the app (and granting Screen Recording), just use the menu bar icon → **Set Up AI Agents…** — one click installs the team screenshot skill for Claude Code and registers the MCP server. The app keeps the installed skill up to date automatically.

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
| `style_image(input_path, output_path?)` | Apply the Newspack style to any existing image — the workhorse for browser screenshots |
| `annotate_image(input_path, annotations, output_path?)` | Draw brand-styled arrows, rectangles, spotlight, and numbered counters via JSON |

All tools return the saved file's path; capture/style tools also report the canvas size and where the original capture sits on it, so you can convert capture coordinates into canvas coordinates when annotating.

### Website screenshots (recommended recipe)

1. Drive a browser (e.g. the chrome-devtools MCP: `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest`).
2. Resize the page to **1512×982**, emulate **device pixel ratio 2**.
3. Before scrolling or capturing, inject: `<style>::-webkit-scrollbar{display:none} *{scrollbar-width:none}</style>`
4. Screenshot the viewport, then call `style_image` on the result — the returned file is the deliverable.

When annotating, prefer arrows and numbered counters; there is deliberately no text type — put words in the surrounding document.

### The full agent skill

**Set Up AI Agents…** also installs the bundled Claude Code skill with the
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
