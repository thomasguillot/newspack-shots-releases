# Newspack Shots — Downloads

A native macOS menu-bar screenshot app for the Newspack team. Every capture is automatically styled to the brand standard — Cobalt background, padding, rounded corners, soft shadow — and an MCP server lets AI agents produce pixel-identical output.

**Requires macOS 26 (Tahoe) or later, Apple Silicon.**

> This repository hosts **downloads only** — grab the latest version from
> [**Releases**](../../releases/latest). The source code lives in a private
> repository.

## Install

1. Download the latest `Newspack-Shots-<version>.zip` from [Releases](../../releases/latest) and unzip it.
2. Drag **Newspack Shots** into **Applications**. (If an older copy is running, quit it first from its menu-bar icon.)
3. The app is **unsigned** (no Apple Developer Program), so macOS blocks it on first launch. To allow it:
   - Double-click **Newspack Shots**; when macOS warns it "can't verify the developer," click **Done** (*not* "Move to Trash").
   - Open **System Settings → Privacy & Security**, scroll to the **Security** section.
   - Click **Open Anyway** next to *"Newspack Shots" was blocked to protect your Mac*, then authenticate and click **Open**.

   macOS only asks once — after that it launches normally.
4. Trigger your first capture and grant **Screen Recording** when prompted, then quit and relaunch the app once.

Upgrading? Just replace the app in Applications — permissions stay granted. Every release page lists the zip's SHA-256 so you can verify your download.

## What you get

- **⌃⇧1** full screen (with a display picker on multi-monitor setups) · **⌃⇧2** window (hover, ⇥ to cycle stacks, click) · **⌃⇧3** region (free drag with a pixel-precision magnifier)
- Instant auto-save to your folder + clipboard, with a quick preview bottom-left — annotate only when you want to (arrows, rectangles, spotlight, numbered counters)
- **For AI agents:** the app doubles as an MCP server — `capture_fullscreen`, `capture_window`, `capture_region`, `style_image`, `annotate_image`

Screenshots never leave your Mac — no cloud, no upload, no analytics.

## License

Proprietary — © Automattic. Built for the Newspack team; provided as-is.
