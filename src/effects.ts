// Visual effects: multi-layer shadows, glow, glass, grain, decorative shapes

import { RGB } from "./brand";

// ── Multi-Layer Drop Shadows ────────────────────────────────────────────

export interface ShadowPreset {
  readonly effects: readonly Effect[];
}

/**
 * Elevated card shadow — 3-layer natural depth
 */
export function cardShadow(tintColor?: RGB): readonly Effect[] {
  const c = tintColor ?? { r: 0, g: 0, b: 0 };
  return [
    {
      type: "DROP_SHADOW",
      color: { ...c, a: 0.06 },
      offset: { x: 0, y: 2 },
      radius: 4,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
    {
      type: "DROP_SHADOW",
      color: { ...c, a: 0.08 },
      offset: { x: 0, y: 8 },
      radius: 24,
      spread: -4,
      visible: true,
      blendMode: "NORMAL",
    },
    {
      type: "DROP_SHADOW",
      color: { ...c, a: 0.05 },
      offset: { x: 0, y: 24 },
      radius: 48,
      spread: -8,
      visible: true,
      blendMode: "NORMAL",
    },
  ];
}

/**
 * Soft floating shadow (for badges, pills, buttons)
 */
export function floatShadow(tintColor?: RGB): readonly Effect[] {
  const c = tintColor ?? { r: 0, g: 0, b: 0 };
  return [
    {
      type: "DROP_SHADOW",
      color: { ...c, a: 0.12 },
      offset: { x: 0, y: 4 },
      radius: 12,
      spread: -2,
      visible: true,
      blendMode: "NORMAL",
    },
    {
      type: "DROP_SHADOW",
      color: { ...c, a: 0.06 },
      offset: { x: 0, y: 16 },
      radius: 32,
      spread: -4,
      visible: true,
      blendMode: "NORMAL",
    },
  ];
}

/**
 * Heavy hero shadow for large focal elements
 */
export function heroShadow(tintColor?: RGB): readonly Effect[] {
  const c = tintColor ?? { r: 0, g: 0, b: 0 };
  return [
    {
      type: "DROP_SHADOW",
      color: { ...c, a: 0.1 },
      offset: { x: 0, y: 4 },
      radius: 8,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
    {
      type: "DROP_SHADOW",
      color: { ...c, a: 0.15 },
      offset: { x: 0, y: 16 },
      radius: 40,
      spread: -8,
      visible: true,
      blendMode: "NORMAL",
    },
    {
      type: "DROP_SHADOW",
      color: { ...c, a: 0.08 },
      offset: { x: 0, y: 32 },
      radius: 64,
      spread: -12,
      visible: true,
      blendMode: "NORMAL",
    },
  ];
}

/**
 * Color-matched glow shadow (element color bleeds into shadow)
 */
export function glowShadow(color: RGB, intensity = 0.3): readonly Effect[] {
  return [
    {
      type: "DROP_SHADOW",
      color: { ...color, a: intensity },
      offset: { x: 0, y: 4 },
      radius: 20,
      spread: -2,
      visible: true,
      blendMode: "NORMAL",
    },
    {
      type: "DROP_SHADOW",
      color: { ...color, a: intensity * 0.5 },
      offset: { x: 0, y: 12 },
      radius: 40,
      spread: -4,
      visible: true,
      blendMode: "NORMAL",
    },
  ];
}

/**
 * Inner shadow for pressed/inset effect
 */
export function innerShadow(color?: RGB): readonly Effect[] {
  const c = color ?? { r: 0, g: 0, b: 0 };
  return [
    {
      type: "INNER_SHADOW",
      color: { ...c, a: 0.08 },
      offset: { x: 0, y: 2 },
      radius: 8,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
  ];
}

// ── Glass / Frosted Effect ──────────────────────────────────────────────

/**
 * Apply glassmorphism to a frame node:
 * - Semi-transparent white fill
 * - Background blur
 * - Subtle white border
 */
export function applyGlassEffect(
  node: RectangleNode | FrameNode,
  options: {
    readonly fillOpacity?: number;
    readonly blurRadius?: number;
    readonly borderOpacity?: number;
    readonly tint?: RGB;
  } = {}
): void {
  const fillOpacity = options.fillOpacity ?? 0.65;
  const blurRadius = options.blurRadius ?? 16;
  const borderOpacity = options.borderOpacity ?? 0.25;
  const tint = options.tint ?? { r: 1, g: 1, b: 1 };

  node.fills = [{
    type: "SOLID",
    color: tint,
    opacity: fillOpacity,
  }];

  node.effects = [
    {
      type: "BACKGROUND_BLUR",
      blurType: "NORMAL",
      radius: blurRadius,
      visible: true,
    },
    ...floatShadow(),
  ];

  node.strokes = [{
    type: "SOLID",
    color: { r: 1, g: 1, b: 1 },
    opacity: borderOpacity,
  }];
  node.strokeWeight = 1.5;
}

// ── Decorative Shapes ───────────────────────────────────────────────────

/**
 * Add scattered decorative circles to a frame for visual interest
 */
export function addScatteredCircles(
  frame: FrameNode,
  width: number,
  height: number,
  options: {
    readonly count?: number;
    readonly colors?: readonly RGB[];
    readonly minSize?: number;
    readonly maxSize?: number;
    readonly opacity?: number;
    readonly zone?: "full" | "top" | "bottom" | "left" | "right";
  } = {}
): void {
  const count = options.count ?? 8;
  const colors = options.colors ?? [
    { r: 1, g: 1, b: 1 },
  ];
  const minSize = options.minSize ?? 20;
  const maxSize = options.maxSize ?? 80;
  const opacity = options.opacity ?? 0.06;
  const zone = options.zone ?? "full";

  // Deterministic pseudo-random for consistency
  let seed = 42;
  function rand(): number {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  }

  for (let i = 0; i < count; i++) {
    const size = minSize + rand() * (maxSize - minSize);
    let x: number, y: number;

    switch (zone) {
      case "top":
        x = rand() * width;
        y = rand() * height * 0.4;
        break;
      case "bottom":
        x = rand() * width;
        y = height * 0.6 + rand() * height * 0.4;
        break;
      case "left":
        x = rand() * width * 0.4;
        y = rand() * height;
        break;
      case "right":
        x = width * 0.6 + rand() * width * 0.4;
        y = rand() * height;
        break;
      default:
        x = rand() * width;
        y = rand() * height;
    }

    const circle = figma.createEllipse();
    circle.resize(size, size);
    circle.x = x - size / 2;
    circle.y = y - size / 2;
    const color = colors[i % colors.length];
    circle.fills = [{ type: "SOLID", color, opacity }];
    circle.name = "deco-circle";
    frame.appendChild(circle);
  }
}

/**
 * Add floating blob shapes (large soft circles for ambient background)
 */
export function addAmbientBlobs(
  frame: FrameNode,
  width: number,
  height: number,
  colors: readonly RGB[],
  options: {
    readonly count?: number;
    readonly opacity?: number;
    readonly blur?: number;
  } = {}
): void {
  const count = options.count ?? 3;
  const opacity = options.opacity ?? 0.15;
  const blur = options.blur ?? 80;

  let seed = 137;
  function rand(): number {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  }

  for (let i = 0; i < count; i++) {
    const size = width * (0.4 + rand() * 0.4);
    const blob = figma.createEllipse();
    blob.resize(size, size);
    blob.x = rand() * width - size * 0.3;
    blob.y = rand() * height - size * 0.3;
    const color = colors[i % colors.length];
    blob.fills = [{ type: "SOLID", color, opacity }];
    blob.effects = [{
      type: "LAYER_BLUR",
      blurType: "NORMAL",
      radius: blur,
      visible: true,
    }];
    blob.name = "ambient-blob";
    frame.appendChild(blob);
  }
}

/**
 * Add a subtle grain/noise texture overlay using tiny scattered dots
 */
export function addGrainOverlay(
  frame: FrameNode,
  width: number,
  height: number,
  options: {
    readonly opacity?: number;
    readonly density?: number;
    readonly color?: RGB;
  } = {}
): void {
  const opacity = options.opacity ?? 0.03;
  const density = options.density ?? 200;
  const color = options.color ?? { r: 1, g: 1, b: 1 };

  let seed = 97;
  function rand(): number {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  }

  for (let i = 0; i < density; i++) {
    const dot = figma.createEllipse();
    const size = 2 + rand() * 3;
    dot.resize(size, size);
    dot.x = rand() * width;
    dot.y = rand() * height;
    dot.fills = [{ type: "SOLID", color, opacity: opacity * (0.5 + rand() * 0.5) }];
    dot.name = "grain";
    frame.appendChild(dot);
  }
}

/**
 * Add a radial gradient glow effect behind an area
 */
export function addRadialGlow(
  frame: FrameNode,
  centerX: number,
  centerY: number,
  size: number,
  color: RGB,
  opacity = 0.2
): void {
  const glow = figma.createEllipse();
  glow.resize(size, size);
  glow.x = centerX - size / 2;
  glow.y = centerY - size / 2;
  glow.fills = [{
    type: "GRADIENT_RADIAL",
    gradientTransform: [[1, 0, 0], [0, 1, 0]],
    gradientStops: [
      { position: 0, color: { ...color, a: opacity } },
      { position: 0.6, color: { ...color, a: opacity * 0.3 } },
      { position: 1, color: { ...color, a: 0 } },
    ],
  }];
  glow.effects = [{
    type: "LAYER_BLUR",
    blurType: "NORMAL",
    radius: size * 0.1,
    visible: true,
  }];
  glow.name = "radial-glow";
  frame.appendChild(glow);
}
