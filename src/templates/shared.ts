// Shared template components: logo bar, corner accents, gradient strips

import {
  SLATE_900, WHITE, TEAL_600, TEAL_500, ORANGE_PRIMARY, ORANGE_400,
  GRADIENT_TEAL, GRADIENT_ORANGE,
  RGB, BrandGradient,
} from "../brand";
import { solidPaint, gradientPaint, scaleValue, scaleFontSize } from "../utils";
import { createRect, createTextNode, createLogoNode, createGradientLine } from "../layout";
import { MOTION_COMBO_BYTES } from "../logos";

// ── Logo Bar ────────────────────────────────────────────────────────────

export interface LogoBarOptions {
  readonly variant?: "dark" | "white";
}

/**
 * Add the standard Drivzu logo bar to the bottom of a frame.
 * Dark variant: Slate 900 bg, white text/logo
 * White variant: White bg, dark text/logo
 */
export function addLogoBar(
  frame: FrameNode,
  width: number,
  height: number,
  options: LogoBarOptions = {}
): void {
  const variant = options.variant ?? "dark";
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const barY = height - barHeight;
  const padding = scaleValue(32, width);

  const bgColor = variant === "dark" ? SLATE_900 : WHITE;
  const textColor = variant === "dark" ? WHITE : SLATE_900;

  // Background
  createRect(frame, {
    x: 0,
    y: barY,
    width,
    height: barHeight,
    fill: bgColor,
    name: "logo-bar-bg",
  });

  // Thin gradient line at top of bar
  createGradientLine(frame, 0, barY, width, 3, GRADIENT_TEAL, "logo-bar-accent");

  // Logo (motion combo)
  const logoHeight = Math.round(barHeight * 0.45);
  const logoY = barY + (barHeight - logoHeight) / 2;
  createLogoNode(frame, MOTION_COMBO_BYTES, {
    x: padding,
    y: logoY,
    height: logoHeight,
    variant: "motion-combo",
    name: "logo-bar-logo",
  });

  // URL text
  const urlFontSize = scaleFontSize(18, width, 1080, 12);
  const urlNode = createTextNode(frame, {
    text: "drivzu.ie",
    fontSize: urlFontSize,
    fontWeight: "Medium",
    color: textColor,
    x: 0,
    y: barY + (barHeight - urlFontSize * 1.4) / 2,
    name: "logo-bar-url",
  });

  // Right-align the URL
  urlNode.x = width - padding - urlNode.width;
}

// ── Corner Accent ───────────────────────────────────────────────────────

export type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

/**
 * Add a decorative quarter-circle gradient accent to a corner
 */
export function addCornerAccent(
  frame: FrameNode,
  width: number,
  height: number,
  position: CornerPosition = "top-right",
  options: {
    readonly gradient?: BrandGradient;
    readonly sizePercent?: number;
    readonly opacity?: number;
  } = {}
): void {
  const gradient = options.gradient ?? GRADIENT_TEAL;
  const sizePct = options.sizePercent ?? 0.18;
  const opacity = options.opacity ?? 0.3;
  const size = Math.round(Math.min(width, height) * sizePct);

  const ellipse = figma.createEllipse();
  ellipse.resize(size * 2, size * 2);
  ellipse.fills = [gradientPaint(gradient, opacity)];
  ellipse.name = `accent-${position}`;

  switch (position) {
    case "top-left":
      ellipse.x = -size;
      ellipse.y = -size;
      break;
    case "top-right":
      ellipse.x = width - size;
      ellipse.y = -size;
      break;
    case "bottom-left":
      ellipse.x = -size;
      ellipse.y = height - size;
      break;
    case "bottom-right":
      ellipse.x = width - size;
      ellipse.y = height - size;
      break;
  }

  frame.appendChild(ellipse);
}

// ── Gradient Strip ──────────────────────────────────────────────────────

/**
 * Add a full-width gradient strip (often used as a top or bottom accent)
 */
export function addGradientStrip(
  frame: FrameNode,
  width: number,
  y: number,
  stripHeight: number,
  gradient: BrandGradient = GRADIENT_TEAL
): RectangleNode {
  return createRect(frame, {
    x: 0,
    y,
    width,
    height: stripHeight,
    gradient,
    name: "gradient-strip",
  });
}

// ── Watermark Text ──────────────────────────────────────────────────────

/**
 * Add large watermark text (semi-transparent, rotated)
 */
export function addWatermarkText(
  frame: FrameNode,
  text: string,
  width: number,
  height: number,
  options: {
    readonly color?: RGB;
    readonly opacity?: number;
    readonly rotation?: number;
    readonly fontSize?: number;
  } = {}
): TextNode {
  const fontSize = options.fontSize ?? Math.round(width * 0.25);
  return createTextNode(frame, {
    text,
    fontSize,
    fontWeight: "ExtraBold",
    color: options.color ?? WHITE,
    opacity: options.opacity ?? 0.08,
    x: width * 0.05,
    y: height * 0.15,
    width: width * 0.9,
    alignment: "CENTER",
    rotation: options.rotation ?? -5,
    name: "watermark",
  });
}

// ── Decorative Dot Grid ─────────────────────────────────────────────────

/**
 * Add a decorative dotted grid pattern
 */
export function addDotGrid(
  frame: FrameNode,
  x: number,
  y: number,
  gridWidth: number,
  gridHeight: number,
  options: {
    readonly color?: RGB;
    readonly opacity?: number;
    readonly dotSize?: number;
    readonly spacing?: number;
  } = {}
): void {
  const color = options.color ?? WHITE;
  const opacity = options.opacity ?? 0.05;
  const dotSize = options.dotSize ?? 6;
  const spacing = options.spacing ?? 30;

  const cols = Math.floor(gridWidth / spacing);
  const rows = Math.floor(gridHeight / spacing);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dot = figma.createEllipse();
      dot.resize(dotSize, dotSize);
      dot.x = x + col * spacing;
      dot.y = y + row * spacing;
      dot.fills = [solidPaint(color, opacity)];
      dot.name = "dot";
      frame.appendChild(dot);
    }
  }
}

// ── Decorative Arc/Swoosh ───────────────────────────────────────────────

/**
 * Add a large decorative arc (quarter ellipse) as a design element
 */
export function addDecorativeArc(
  frame: FrameNode,
  width: number,
  height: number,
  options: {
    readonly gradient?: BrandGradient;
    readonly opacity?: number;
    readonly position?: "bottom-right" | "bottom-left";
  } = {}
): void {
  const gradient = options.gradient ?? GRADIENT_TEAL;
  const opacity = options.opacity ?? 0.15;
  const position = options.position ?? "bottom-right";
  const arcSize = Math.round(Math.min(width, height) * 0.6);

  const ellipse = figma.createEllipse();
  ellipse.resize(arcSize * 2, arcSize * 2);
  ellipse.fills = [gradientPaint(gradient, opacity)];
  ellipse.name = "decorative-arc";

  if (position === "bottom-right") {
    ellipse.x = width - arcSize * 0.7;
    ellipse.y = height - arcSize * 0.7;
  } else {
    ellipse.x = -arcSize * 1.3;
    ellipse.y = height - arcSize * 0.7;
  }

  frame.appendChild(ellipse);
}
