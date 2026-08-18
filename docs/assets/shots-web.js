// ── generated from StyleSettings.swift — do not edit ──
const STYLE = {
  border: 128,
  borderColorHex: "#001437",
  desktopBackgroundHex: "#00296E",
  cornerRadius: 10,
  shadowEnabled: true,
  aspectW: 3,
  aspectH: 2,
  shadowLayers: [
    { offsetX: 0, offsetY: 0, blur: 20, opacity: 0.1 },
    { offsetX: 0, offsetY: 25, blur: 30, opacity: 0.15 }
  ],
  referenceWidth: 1512,
  styleScaleMin: 0.35,
  styleScaleMax: 1.25,
  grid: {
    minImages: 2,
    maxImages: 12,
    minColumns: 2,
    maxColumns: 6,
    autoColumns: { "2": 2, "3": 3, "4": 2, "5": 3, "6": 3, "default": 4 }
  }
};
// ── end generated ──

// Canvas shadowBlur and CoreGraphics setShadow blur don't share a definition,
// but dev/diff.html shows flat background and image pixels byte-identical, the shadow ring within a channel delta of 2 at 1:1, and corner antialiasing as the only real divergence; no scaling needed.
const SHADOW_CALIBRATION = 1;

const aspectRatio = () => (STYLE.aspectH > 0 ? STYLE.aspectW / STYLE.aspectH : 0);

function styleScale(pointW, pointH, ratio) {
  const refRatio = ratio > 0 ? ratio : 1.5;
  const span = Math.max(pointW, pointH * refRatio);
  return Math.min(Math.max(span / STYLE.referenceWidth, STYLE.styleScaleMin), STYLE.styleScaleMax);
}

function canvasSize(w, h, border, ratio) {
  let width = w + border * 2;
  let height = h + border * 2;
  if (ratio > 0) {
    if (width / height < ratio) width = height * ratio;
    else height = width / ratio;
  }
  return { width: Math.round(width), height: Math.round(height) };
}

function layout(imgW, imgH, scale, ratioCanvas) {
  const aspect = aspectRatio();
  const k = styleScale(imgW / scale, imgH / scale, aspect);
  const pad = STYLE.border * k * scale;
  const canvas = canvasSize(imgW, imgH, pad, ratioCanvas ? aspect : 0);
  const frame = {
    x: Math.round((canvas.width - imgW) / 2),
    y: Math.round((canvas.height - imgH) / 2),
    width: imgW,
    height: imgH
  };
  return { canvas, frame, k };
}

async function toImageBitmap(input, label) {
  if (typeof ImageBitmap !== "undefined" && input instanceof ImageBitmap) return input;
  if (input instanceof Blob) {
    try {
      return await createImageBitmap(input);
    } catch {
      throw new Error(`${label}: input is not a decodable image`);
    }
  }
  throw new Error(`${label}: input must be a Blob/File or ImageBitmap`);
}

function makeCanvas(w, h) {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(w, h);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

async function toPNGBlob(canvas) {
  if (canvas.convertToBlob) return canvas.convertToBlob({ type: "image/png" });
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG encoding failed"))), "image/png"));
}

function tilePath(ctx, rect, radius) {
  ctx.beginPath();
  ctx.roundRect(rect.x, rect.y, rect.width, rect.height,
                Math.min(radius, rect.width / 2, rect.height / 2));
}

function drawTile(ctx, image, rect, k, scale) {
  const radius = STYLE.cornerRadius * k * scale;
  if (STYLE.shadowEnabled) {
    for (const layer of STYLE.shadowLayers) {
      ctx.save();
      ctx.shadowOffsetX = layer.offsetX * k * scale;
      ctx.shadowOffsetY = layer.offsetY * k * scale;
      ctx.shadowBlur = layer.blur * k * scale * SHADOW_CALIBRATION;
      ctx.shadowColor = `rgba(0, 0, 0, ${layer.opacity})`;
      ctx.fillStyle = STYLE.borderColorHex;
      tilePath(ctx, rect, radius);
      ctx.fill();
      ctx.restore();
    }
  }
  ctx.save();
  tilePath(ctx, rect, radius);
  ctx.clip();
  ctx.drawImage(image, rect.x, rect.y, rect.width, rect.height);
  ctx.restore();
}

export async function styleImage(input, { scale = 1, ratioCanvas = false } = {}) {
  const image = await toImageBitmap(input, "styleImage");
  const { canvas: size, frame, k } = layout(image.width, image.height, scale, ratioCanvas);
  const canvas = makeCanvas(size.width, size.height);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = STYLE.borderColorHex;
  ctx.fillRect(0, 0, size.width, size.height);
  drawTile(ctx, image, frame, k, scale);
  return toPNGBlob(canvas);
}

export async function composeGrid(inputs, { scale = 1, columns, ratioCanvas = false } = {}) {
  const g = STYLE.grid;
  if (!Array.isArray(inputs) || inputs.length < g.minImages || inputs.length > g.maxImages) {
    throw new Error(`composeGrid: needs ${g.minImages}-${g.maxImages} images, got ${Array.isArray(inputs) ? inputs.length : typeof inputs}`);
  }
  const images = await Promise.all(inputs.map((i) => toImageBitmap(i, "composeGrid")));
  const aspect = aspectRatio();

  const requested = columns ?? g.autoColumns[String(images.length)] ?? g.autoColumns.default;
  const cols = Math.min(Math.max(requested, g.minColumns), g.maxColumns,
                        Math.max(images.length, g.minColumns));

  const cellWidth = Math.min(...images.map((i) => i.width));
  const scaled = images.map((i) => ({
    width: cellWidth,
    height: Math.round((i.height * cellWidth) / i.width)
  }));

  const blockHeights = new Array(cols).fill(0);
  scaled.forEach((s, i) => { blockHeights[i % cols] += s.height; });
  const k = styleScale((cellWidth * cols) / scale, Math.max(...blockHeights) / scale, aspect);
  const pad = STYLE.border * k * scale;
  const gutter = Math.round(pad / 2);
  const margin = gutter * 2;

  const columnY = new Array(cols).fill(margin);
  let frames = scaled.map((s, i) => {
    const col = i % cols;
    const f = { x: margin + col * (cellWidth + gutter), y: columnY[col], width: s.width, height: s.height };
    columnY[col] += s.height + gutter;
    return f;
  });
  const contentBottom = Math.max(...columnY.map((y) => y - gutter));
  let size = {
    width: margin * 2 + cellWidth * cols + gutter * (cols - 1),
    height: contentBottom + margin
  };
  if (ratioCanvas && aspect > 0) {
    const expanded = canvasSize(size.width, size.height, 0, aspect);
    const dx = Math.round((expanded.width - size.width) / 2);
    const dy = Math.round((expanded.height - size.height) / 2);
    frames = frames.map((f) => ({ ...f, x: f.x + dx, y: f.y + dy }));
    size = expanded;
  }

  const canvas = makeCanvas(size.width, size.height);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = STYLE.borderColorHex;
  ctx.fillRect(0, 0, size.width, size.height);
  images.forEach((image, i) => drawTile(ctx, image, frames[i], k, scale));
  return toPNGBlob(canvas);
}
