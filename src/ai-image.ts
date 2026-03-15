// AI Image Generation — handles image bytes received from UI
// The UI (iframe) makes the actual API calls; this module processes the results

// Base64 lookup table
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const B64_LOOKUP = new Uint8Array(128);
for (let i = 0; i < B64.length; i++) B64_LOOKUP[B64.charCodeAt(i)] = i;

/**
 * Convert base64 string to Uint8Array for Figma's createImage()
 */
export function base64ToBytes(base64: string): Uint8Array {
  // Remove padding
  let len = base64.length;
  while (len > 0 && base64.charAt(len - 1) === "=") len--;

  const outLen = (len * 3) >> 2;
  const bytes = new Uint8Array(outLen);
  let j = 0;

  for (let i = 0; i < len; i += 4) {
    const a = B64_LOOKUP[base64.charCodeAt(i)];
    const b = i + 1 < len ? B64_LOOKUP[base64.charCodeAt(i + 1)] : 0;
    const c = i + 2 < len ? B64_LOOKUP[base64.charCodeAt(i + 2)] : 0;
    const d = i + 3 < len ? B64_LOOKUP[base64.charCodeAt(i + 3)] : 0;

    bytes[j++] = (a << 2) | (b >> 4);
    if (j < outLen) bytes[j++] = ((b & 15) << 4) | (c >> 2);
    if (j < outLen) bytes[j++] = ((c & 3) << 6) | d;
  }

  return bytes;
}

/**
 * Create a Figma image from base64 data and apply as fill to a rectangle
 */
export function applyAiBackground(
  frame: FrameNode,
  imageBytes: Uint8Array,
  width: number,
  height: number
): RectangleNode {
  const image = figma.createImage(imageBytes);

  const bgRect = figma.createRectangle();
  bgRect.resize(width, height);
  bgRect.x = 0;
  bgRect.y = 0;
  bgRect.fills = [{
    type: "IMAGE",
    imageHash: image.hash,
    scaleMode: "FILL",
  }];
  bgRect.name = "ai-background";

  // Insert at the bottom of the frame (behind all other content)
  if (frame.children.length > 0) {
    frame.insertChild(0, bgRect);
  } else {
    frame.appendChild(bgRect);
  }

  return bgRect;
}

/**
 * Apply a semi-transparent overlay on top of AI background for text readability
 */
export function applyDarkOverlay(
  frame: FrameNode,
  width: number,
  height: number,
  opacity = 0.35,
  insertIndex = 1
): RectangleNode {
  const overlay = figma.createRectangle();
  overlay.resize(width, height);
  overlay.x = 0;
  overlay.y = 0;
  overlay.fills = [{
    type: "SOLID",
    color: { r: 0, g: 0, b: 0 },
    opacity,
  }];
  overlay.name = "readability-overlay";

  if (insertIndex < frame.children.length) {
    frame.insertChild(insertIndex, overlay);
  } else {
    frame.appendChild(overlay);
  }

  return overlay;
}

/**
 * Apply a gradient overlay (dark at bottom for text, transparent at top for image)
 */
export function applyGradientOverlay(
  frame: FrameNode,
  width: number,
  height: number,
  insertIndex = 1
): RectangleNode {
  const overlay = figma.createRectangle();
  overlay.resize(width, height);
  overlay.x = 0;
  overlay.y = 0;
  overlay.fills = [{
    type: "GRADIENT_LINEAR",
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0, color: { r: 0, g: 0, b: 0, a: 0 } },
      { position: 0.4, color: { r: 0, g: 0, b: 0, a: 0.15 } },
      { position: 0.7, color: { r: 0, g: 0, b: 0, a: 0.45 } },
      { position: 1, color: { r: 0, g: 0, b: 0, a: 0.7 } },
    ],
  }];
  overlay.name = "gradient-overlay";

  if (insertIndex < frame.children.length) {
    frame.insertChild(insertIndex, overlay);
  } else {
    frame.appendChild(overlay);
  }

  return overlay;
}
