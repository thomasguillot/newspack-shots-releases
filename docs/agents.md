# Newspack Shots for agents without the app

You are an agent that needs Newspack-styled screenshots but cannot run
the Newspack Shots macOS app (wrong OS, older macOS, or no Mac at all).
This guide gets you from a bare browser to on-brand output.

What you can do from here: capture websites to spec, apply the Primary
Dark style to stills, and compose grids. What still needs the app on a
capable Mac (macOS 26+, Apple Silicon): window and region captures of a
real screen, scrolling captures, screen recordings, styled video, and
annotations.

## 1. Capture to spec

Screenshots are taken in a browser you control (Playwright or similar).

- Viewport: 1512×982, device pixel ratio 2 (output pixels: 3024×1964).
- Capture the viewport, not the full page, unless a taller crop is the
  point.
- Before every capture, hide non-content chrome by injecting CSS:
  scrollbars, cookie banners, dev/debug bars. Baseline:

      ::-webkit-scrollbar { display: none !important; }
      html { scrollbar-width: none !important; }

  plus `display: none` for any site-specific banner selectors you find.
- Let fonts and images settle before shooting (wait for network idle
  plus a beat for animations).
- Save as PNG. This raw capture is what the styling step wants: never
  style an already-styled image.

## 2. Style a still

Fetch the module from this site and call it inside any browser page you
control:

    const { styleImage } = await import(
      "https://thomasguillot.github.io/newspack-shots-releases/assets/shots-web.js");
    const styled = await styleImage(rawBlob);

- `rawBlob`: your raw capture as a Blob/File or ImageBitmap.
- The default treatment matches the Mac app: browser captures carry no
  density metadata, so they are styled at 1x regardless of the pixel
  ratio they were captured at. Only pass `scale: 2` for a file the app
  itself would read as Retina (144 DPI).
- `ratioCanvas: true` expands the canvas to 3:2 with the capture
  centred; the default keeps the capture's shape with even padding.
- Returns a PNG Blob.

In Playwright, hand the bytes in and out as base64:

    const styledB64 = await page.evaluate(async (rawB64) => {
      const raw = await fetch(`data:image/png;base64,${rawB64}`).then(r => r.blob());
      const { styleImage } = await import(
        "https://thomasguillot.github.io/newspack-shots-releases/assets/shots-web.js");
      const blob = await styleImage(raw);
      const buf = new Uint8Array(await blob.arrayBuffer());
      let s = ""; buf.forEach(b => s += String.fromCharCode(b));
      return btoa(s);
    }, rawPngBase64);

## 3. Compose a grid

    const { composeGrid } = await import(
      "https://thomasguillot.github.io/newspack-shots-releases/assets/shots-web.js");
    const grid = await composeGrid([rawA, rawB, rawC]);

- 2–12 raw images, in reading order. Pass raw captures, never styled
  output.
- `columns` forces a column count (2–6); omit for the automatic choice.
- Tiles scale down to the narrowest source; nothing is upscaled.

## 4. What this is not

The output matches the app's Primary Dark style: the shadow tracks the
app within a channel delta of 1 at 1:1 calibration, and the only
measured divergence is corner antialiasing. Only the Primary Dark style
is available here. For other styles, window captures, recordings,
styled video, or annotations, hand the task to someone running the
Newspack Shots app:
https://thomasguillot.github.io/newspack-shots-releases/
