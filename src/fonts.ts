// Font loading utilities for Drivzu brand fonts

import { FONT_PRIMARY, FONT_FALLBACK, FONT_WEIGHTS, FontWeight } from "./brand";

interface FontLoadResult {
  readonly family: string;
  readonly loaded: readonly FontWeight[];
  readonly failed: readonly FontWeight[];
  readonly usingFallback: boolean;
}

/**
 * Attempt to load all required font weights for the primary font.
 * Falls back to Inter if Plus Jakarta Sans isn't available.
 */
export async function loadAllFonts(): Promise<FontLoadResult> {
  const loaded: FontWeight[] = [];
  const failed: FontWeight[] = [];
  let usingFallback = false;

  // Try primary font first
  for (const weight of FONT_WEIGHTS) {
    try {
      await figma.loadFontAsync({ family: FONT_PRIMARY, style: weight });
      loaded.push(weight);
    } catch {
      failed.push(weight);
    }
  }

  // If primary font failed entirely, try fallback
  if (loaded.length === 0) {
    usingFallback = true;
    const fallbackLoaded: FontWeight[] = [];
    const fallbackFailed: FontWeight[] = [];

    for (const weight of FONT_WEIGHTS) {
      try {
        await figma.loadFontAsync({ family: FONT_FALLBACK, style: weight });
        fallbackLoaded.push(weight);
      } catch {
        fallbackFailed.push(weight);
      }
    }

    return {
      family: FONT_FALLBACK,
      loaded: fallbackLoaded,
      failed: fallbackFailed,
      usingFallback: true,
    };
  }

  return {
    family: FONT_PRIMARY,
    loaded,
    failed,
    usingFallback,
  };
}

/**
 * Get the font family name to use (primary or fallback).
 * Must be called after loadAllFonts().
 */
let resolvedFont: string | null = null;

export function getFont(): string {
  if (resolvedFont) return resolvedFont;
  return FONT_PRIMARY;
}

export function setResolvedFont(family: string): void {
  resolvedFont = family;
}

/**
 * Map a desired weight to the closest available weight.
 * ExtraBold → Bold → SemiBold → Medium → Regular
 */
const WEIGHT_FALLBACKS: Record<FontWeight, FontWeight[]> = {
  ExtraBold: ["Bold", "SemiBold", "Medium", "Regular"],
  Bold:      ["SemiBold", "Medium", "Regular"],
  SemiBold:  ["Bold", "Medium", "Regular"],
  Medium:    ["Regular", "SemiBold"],
  Regular:   ["Medium"],
};

export function resolveWeight(desired: FontWeight, available: readonly FontWeight[]): FontWeight {
  if (available.indexOf(desired) >= 0) return desired;
  const fallbacks = WEIGHT_FALLBACKS[desired] || [];
  for (const fb of fallbacks) {
    if (available.indexOf(fb) >= 0) return fb;
  }
  return available[0] || "Regular";
}
