// Utility functions for Figma node creation

import { RGB, BrandGradient } from "./brand";

/**
 * Convert hex color string to Figma 0-1 RGB
 */
export function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
  };
}

/**
 * Create a Figma solid paint from RGB
 */
export function solidPaint(color: RGB, opacity = 1): SolidPaint {
  return { type: "SOLID", color, opacity };
}

/**
 * Create a Figma gradient paint from BrandGradient definition
 */
export function gradientPaint(gradient: BrandGradient, opacity = 1): GradientPaint {
  const rad = (gradient.angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const cx = 0.5;
  const cy = 0.5;
  const len = 0.5;

  const handlePositions: [Vector, Vector, Vector] = [
    { x: cx - cos * len, y: cy - sin * len },
    { x: cx + cos * len, y: cy + sin * len },
    { x: cx - sin * len, y: cy + cos * len },
  ];

  return {
    type: "GRADIENT_LINEAR",
    gradientTransform: [
      [handlePositions[1].x - handlePositions[0].x, handlePositions[2].x - handlePositions[0].x, handlePositions[0].x],
      [handlePositions[1].y - handlePositions[0].y, handlePositions[2].y - handlePositions[0].y, handlePositions[0].y],
    ],
    gradientStops: gradient.stops.map((s) => ({
      position: s.position,
      color: { ...s.color, a: opacity },
    })),
  };
}

/**
 * Scale a base value proportionally for a given frame size.
 * baseWidth is the "design" width (typically 1080 for Instagram Post).
 */
export function scaleValue(value: number, frameWidth: number, baseWidth = 1080): number {
  return Math.round(value * (frameWidth / baseWidth));
}

/**
 * Scale font size proportionally, with a minimum floor
 */
export function scaleFontSize(size: number, frameWidth: number, baseWidth = 1080, minSize = 12): number {
  return Math.max(minSize, Math.round(size * (frameWidth / baseWidth)));
}

/**
 * Calculate proportional dimensions for elements
 */
export function scaleForPlatform(
  frameWidth: number,
  frameHeight: number,
  baseWidth = 1080,
  baseHeight = 1350
): { sx: number; sy: number; s: number } {
  const sx = frameWidth / baseWidth;
  const sy = frameHeight / baseHeight;
  const s = Math.min(sx, sy);
  return { sx, sy, s };
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Create a radial gradient paint (for glow effects)
 */
export function radialGlowPaint(color: RGB, opacity = 0.1): GradientPaint {
  return {
    type: "GRADIENT_RADIAL",
    gradientTransform: [
      [1, 0, 0],
      [0, 1, 0],
    ],
    gradientStops: [
      { position: 0, color: { ...color, a: opacity } },
      { position: 1, color: { ...color, a: 0 } },
    ],
  };
}
