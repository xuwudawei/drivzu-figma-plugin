// Figma node factory functions for template building

import { RGB, BrandGradient, FontWeight, RADIUS_MD, RADIUS_PILL } from "./brand";
import { solidPaint, gradientPaint } from "./utils";
import { getFont, resolveWeight } from "./fonts";

// ── Types ───────────────────────────────────────────────────────────────

export interface TextOptions {
  readonly text: string;
  readonly fontSize: number;
  readonly fontWeight: FontWeight;
  readonly color: RGB;
  readonly x: number;
  readonly y: number;
  readonly width?: number;
  readonly height?: number;
  readonly alignment?: "LEFT" | "CENTER" | "RIGHT";
  readonly verticalAlignment?: "TOP" | "CENTER" | "BOTTOM";
  readonly lineHeight?: number;
  readonly letterSpacing?: number;
  readonly opacity?: number;
  readonly rotation?: number;
  readonly name?: string;
}

export interface RectOptions {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly fill?: RGB;
  readonly gradient?: BrandGradient;
  readonly radius?: number | readonly [number, number, number, number];
  readonly opacity?: number;
  readonly strokeColor?: RGB;
  readonly strokeWidth?: number;
  readonly strokeDash?: readonly number[];
  readonly name?: string;
}

export interface ImagePlaceholderOptions {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly radius?: number;
  readonly borderColor?: RGB;
  readonly borderWidth?: number;
  readonly label?: string;
  readonly circular?: boolean;
  readonly name?: string;
}

export interface LogoOptions {
  readonly x: number;
  readonly y: number;
  readonly height: number;
  readonly variant: "motion-combo" | "wordmark" | "monogram";
  readonly name?: string;
}

export interface EllipseOptions {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly fill?: RGB;
  readonly gradient?: BrandGradient;
  readonly opacity?: number;
  readonly name?: string;
}

// ── Available Font Weights (set after loading) ──────────────────────────

let availableWeights: readonly FontWeight[] = ["Regular", "Medium", "SemiBold", "Bold", "ExtraBold"];

export function setAvailableWeights(weights: readonly FontWeight[]): void {
  availableWeights = weights;
}

// ── Node Factories ──────────────────────────────────────────────────────

/**
 * Create a text node with full styling
 */
export function createTextNode(parent: FrameNode, opts: TextOptions): TextNode {
  const node = figma.createText();
  const weight = resolveWeight(opts.fontWeight, availableWeights);
  node.fontName = { family: getFont(), style: weight };
  node.characters = opts.text;
  node.fontSize = opts.fontSize;
  node.fills = [solidPaint(opts.color, opts.opacity ?? 1)];

  if (opts.alignment) node.textAlignHorizontal = opts.alignment;
  if (opts.verticalAlignment) node.textAlignVertical = opts.verticalAlignment;

  if (opts.lineHeight !== undefined) {
    node.lineHeight = { value: opts.lineHeight, unit: "PIXELS" };
  }
  if (opts.letterSpacing !== undefined) {
    node.letterSpacing = { value: opts.letterSpacing, unit: "PIXELS" };
  }

  node.x = opts.x;
  node.y = opts.y;

  if (opts.width !== undefined) {
    node.resize(opts.width, opts.height ?? node.height);
    node.textAutoResize = "HEIGHT";
  }

  if (opts.rotation !== undefined) {
    node.rotation = opts.rotation;
  }

  if (opts.name) node.name = opts.name;

  parent.appendChild(node);
  return node;
}

/**
 * Create a rectangle/rounded rect with solid or gradient fill
 */
export function createRect(parent: FrameNode, opts: RectOptions): RectangleNode {
  const node = figma.createRectangle();
  node.x = opts.x;
  node.y = opts.y;
  node.resize(opts.width, opts.height);

  if (opts.gradient) {
    node.fills = [gradientPaint(opts.gradient, opts.opacity ?? 1)];
  } else if (opts.fill) {
    node.fills = [solidPaint(opts.fill, opts.opacity ?? 1)];
  }

  if (opts.radius !== undefined) {
    if (typeof opts.radius === "number") {
      node.cornerRadius = opts.radius;
    } else {
      node.topLeftRadius = opts.radius[0];
      node.topRightRadius = opts.radius[1];
      node.bottomRightRadius = opts.radius[2];
      node.bottomLeftRadius = opts.radius[3];
    }
  }

  if (opts.strokeColor) {
    node.strokes = [solidPaint(opts.strokeColor)];
    node.strokeWeight = opts.strokeWidth ?? 2;
    if (opts.strokeDash) {
      node.dashPattern = [...opts.strokeDash];
    }
  }

  if (opts.name) node.name = opts.name;

  parent.appendChild(node);
  return node;
}

/**
 * Create a frame with background fill (solid or gradient)
 */
export function createFrame(
  width: number,
  height: number,
  fill?: RGB | BrandGradient,
  name?: string
): FrameNode {
  const frame = figma.createFrame();
  frame.resize(width, height);
  frame.clipsContent = true;

  if (fill) {
    if ("stops" in fill) {
      frame.fills = [gradientPaint(fill)];
    } else {
      frame.fills = [solidPaint(fill)];
    }
  }

  if (name) frame.name = name;
  return frame;
}

/**
 * Apply a background fill to an existing frame
 */
export function setBackground(frame: FrameNode, fill: RGB | BrandGradient, opacity = 1): void {
  if ("stops" in fill) {
    frame.fills = [gradientPaint(fill, opacity)];
  } else {
    frame.fills = [solidPaint(fill, opacity)];
  }
}

/**
 * Create an image placeholder with dashed border
 */
export function createImagePlaceholder(parent: FrameNode, opts: ImagePlaceholderOptions): FrameNode {
  const placeholder = figma.createFrame();
  placeholder.x = opts.x;
  placeholder.y = opts.y;
  placeholder.resize(opts.width, opts.height);
  placeholder.fills = [solidPaint({ r: 0.95, g: 0.95, b: 0.95 }, 0.5)];
  placeholder.clipsContent = true;

  if (opts.circular) {
    placeholder.cornerRadius = opts.width / 2;
  } else if (opts.radius) {
    placeholder.cornerRadius = opts.radius;
  }

  if (opts.borderColor) {
    placeholder.strokes = [solidPaint(opts.borderColor)];
    placeholder.strokeWeight = opts.borderWidth ?? 3;
    placeholder.dashPattern = [12, 8];
  }

  if (opts.name) placeholder.name = opts.name;

  // Add label text
  if (opts.label) {
    const labelNode = figma.createText();
    const weight = resolveWeight("Medium", availableWeights);
    labelNode.fontName = { family: getFont(), style: weight };
    labelNode.characters = opts.label;
    labelNode.fontSize = Math.max(14, Math.min(24, opts.width / 15));
    labelNode.fills = [solidPaint({ r: 0.6, g: 0.6, b: 0.6 })];
    labelNode.textAlignHorizontal = "CENTER";
    labelNode.resize(opts.width - 40, labelNode.height);
    labelNode.textAutoResize = "HEIGHT";
    labelNode.x = 20;
    labelNode.y = (opts.height - labelNode.height) / 2;
    placeholder.appendChild(labelNode);
  }

  parent.appendChild(placeholder);
  return placeholder;
}

/**
 * Create a logo image node from embedded bytes
 */
export function createLogoNode(
  parent: FrameNode,
  bytes: Uint8Array,
  opts: LogoOptions
): RectangleNode | null {
  if (bytes.length === 0) return null;

  const image = figma.createImage(bytes);
  const aspectRatios: Record<string, number> = {
    "motion-combo": 480 / 120,  // ~4:1
    "wordmark": 480 / 80,       // ~6:1
    "monogram": 1,               // 1:1
  };

  const ratio = aspectRatios[opts.variant] || 4;
  const width = opts.height * ratio;

  const rect = figma.createRectangle();
  rect.x = opts.x;
  rect.y = opts.y;
  rect.resize(width, opts.height);
  rect.fills = [{
    type: "IMAGE",
    imageHash: image.hash,
    scaleMode: "FIT",
  }];

  if (opts.name) rect.name = opts.name;

  parent.appendChild(rect);
  return rect;
}

/**
 * Create an ellipse node
 */
export function createEllipse(parent: FrameNode, opts: EllipseOptions): EllipseNode {
  const node = figma.createEllipse();
  node.x = opts.x;
  node.y = opts.y;
  node.resize(opts.width, opts.height);

  if (opts.gradient) {
    node.fills = [gradientPaint(opts.gradient, opts.opacity ?? 1)];
  } else if (opts.fill) {
    node.fills = [solidPaint(opts.fill, opts.opacity ?? 1)];
  }

  if (opts.name) node.name = opts.name;

  parent.appendChild(node);
  return node;
}

/**
 * Create a pill-shaped badge (rounded rect with text)
 */
export function createPillBadge(
  parent: FrameNode,
  text: string,
  x: number,
  y: number,
  options: {
    readonly bgColor?: RGB;
    readonly bgGradient?: BrandGradient;
    readonly textColor: RGB;
    readonly fontSize: number;
    readonly fontWeight: FontWeight;
    readonly paddingX?: number;
    readonly paddingY?: number;
    readonly name?: string;
  }
): { bg: RectangleNode; text: TextNode } {
  const paddingX = options.paddingX ?? 24;
  const paddingY = options.paddingY ?? 10;

  // Create text first to measure
  const textNode = figma.createText();
  const weight = resolveWeight(options.fontWeight, availableWeights);
  textNode.fontName = { family: getFont(), style: weight };
  textNode.characters = text;
  textNode.fontSize = options.fontSize;
  textNode.fills = [solidPaint(options.textColor)];

  const bgWidth = textNode.width + paddingX * 2;
  const bgHeight = textNode.height + paddingY * 2;

  const bg = createRect(parent, {
    x,
    y,
    width: bgWidth,
    height: bgHeight,
    fill: options.bgColor,
    gradient: options.bgGradient,
    radius: RADIUS_PILL,
    name: options.name ? `${options.name}-bg` : undefined,
  });

  textNode.x = x + paddingX;
  textNode.y = y + paddingY;
  if (options.name) textNode.name = `${options.name}-text`;
  parent.appendChild(textNode);

  return { bg, text: textNode };
}

/**
 * Create a gradient line/divider
 */
export function createGradientLine(
  parent: FrameNode,
  x: number,
  y: number,
  width: number,
  height: number,
  gradient: BrandGradient,
  name?: string
): RectangleNode {
  return createRect(parent, {
    x, y, width, height,
    gradient,
    radius: height / 2,
    name: name ?? "gradient-divider",
  });
}
