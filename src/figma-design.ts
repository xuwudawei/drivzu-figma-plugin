// Advanced Figma Design Layer — Layer 3 of the triple-layer design engine
// Adds editable Figma design elements on top of the AI+Canvas composite image

import {
  BrandGradient, TEAL_PRIMARY, TEAL_500, ORANGE_PRIMARY,
  ORANGE_400, WHITE, BLACK, SLATE_100, RADIUS_LG,
} from "./brand";
import { createTextNode, createRect, createGradientLine } from "./layout";
import { applyGlassEffect, addGrainOverlay } from "./effects";
import { solidPaint, gradientPaint, scaleValue, scaleFontSize } from "./utils";

// ── Design Config ────────────────────────────────────────────────────────

interface GlassPanelSpec {
  readonly x: number; readonly y: number;
  readonly w: number; readonly h: number;
  readonly radius: number;
}

interface TextLayoutSpec {
  readonly headlineY: number; readonly subtitleY: number;
  readonly headlineSize: number; readonly subtitleSize: number;
  readonly align: "LEFT" | "CENTER" | "RIGHT";
}

interface DesignConfig {
  readonly glassPanel: GlassPanelSpec | null;
  readonly cornerAccent: "top-left" | "top-right" | "bottom-left" | "bottom-right" | null;
  readonly dotGrid: boolean;
  readonly gradientBorder: boolean;
  readonly accentLine: { readonly y: number } | null;
  readonly textLayout: TextLayoutSpec;
}

function cfg(
  glassPanel: GlassPanelSpec | null,
  cornerAccent: DesignConfig["cornerAccent"],
  dotGrid: boolean,
  gradientBorder: boolean,
  accentLine: DesignConfig["accentLine"],
  textLayout: TextLayoutSpec,
): DesignConfig {
  return { glassPanel, cornerAccent, dotGrid, gradientBorder, accentLine, textLayout };
}

const tl = (hY: number, sY: number, hS: number, sS: number, a: TextLayoutSpec["align"]): TextLayoutSpec =>
  ({ headlineY: hY, subtitleY: sY, headlineSize: hS, subtitleSize: sS, align: a });

const DESIGN_CONFIGS: Readonly<Record<string, DesignConfig>> = {
  celebrations:    cfg({ x: 0.1,  y: 0.35, w: 0.8,  h: 0.3,  radius: 24 }, "top-right", false, false, null,        tl(0.4,  0.55, 48, 22, "CENTER")),
  education:       cfg({ x: 0.05, y: 0.5,  w: 0.9,  h: 0.4,  radius: 20 }, null,         true,  false, null,        tl(0.55, 0.7,  42, 20, "LEFT")),
  "social-proof":  cfg({ x: 0.08, y: 0.1,  w: 0.84, h: 0.35, radius: 20 }, null,         false, false, { y: 0.48 }, tl(0.15, 0.3,  44, 20, "CENTER")),
  entertainment:   cfg(null,                                                  null,         false, false, null,        tl(0.4,  0.56, 56, 24, "CENTER")),
  "behind-scenes": cfg({ x: 0.1,  y: 0.3,  w: 0.8,  h: 0.35, radius: 20 }, null,         false, true,  null,        tl(0.35, 0.5,  44, 20, "LEFT")),
  promotion:       cfg(null,                                                  null,         false, true,  null,        tl(0.35, 0.55, 54, 22, "CENTER")),
  engagement:      cfg({ x: 0.1,  y: 0.3,  w: 0.8,  h: 0.35, radius: 22 }, null,         true,  false, null,        tl(0.36, 0.52, 44, 20, "CENTER")),
  announcements:   cfg({ x: 0.06, y: 0.08, w: 0.88, h: 0.35, radius: 18 }, null,         false, false, { y: 0.46 }, tl(0.13, 0.28, 44, 20, "LEFT")),
};

const DEFAULT_CONFIG: DesignConfig = DESIGN_CONFIGS.celebrations;

// ── Category Resolver ────────────────────────────────────────────────────

const TEMPLATE_CATEGORY_MAP: Readonly<Record<string, string>> = {
  "pass-celebration": "celebrations", "testimonial-card": "social-proof",
  "stats-spotlight": "social-proof",  "driving-tip": "education",
  "edt-lesson": "education",         "did-you-know": "education",
  "meme-card": "entertainment",      "quiz-poll": "engagement",
  "instructor-feature": "behind-scenes", "platform-update": "announcements",
  "bold-cta": "promotion",           "special-offer": "promotion",
  "booking-reminder": "promotion",
};

function resolveConfig(templateId: string): DesignConfig {
  const category = TEMPLATE_CATEGORY_MAP[templateId] ?? templateId;
  return DESIGN_CONFIGS[category] ?? DEFAULT_CONFIG;
}

// ── Shared Gradients ─────────────────────────────────────────────────────

const TEAL_TO_ORANGE: BrandGradient = {
  stops: [{ color: TEAL_PRIMARY, position: 0 }, { color: ORANGE_PRIMARY, position: 1 }],
  angleDeg: 135,
};

const ARC_GRADIENT: BrandGradient = {
  stops: [{ color: TEAL_500, position: 0 }, { color: ORANGE_400, position: 1 }],
  angleDeg: 135,
};

// ── Glass Panel Shadow Stack ─────────────────────────────────────────────

function glassPanelShadows(): readonly Effect[] {
  const shadow = (yOff: number, blur: number, alpha: number, spread = 0, color = BLACK): Effect => ({
    type: "DROP_SHADOW", color: { ...color, a: alpha },
    offset: { x: 0, y: yOff }, radius: blur, spread,
    visible: true, blendMode: "NORMAL",
  } as Effect);

  return [
    shadow(1, 3, 0.08),          // contact
    shadow(4, 16, 0.06),         // form
    shadow(8, 40, 0.04),         // ambient
    shadow(0, 30, 0.1, 4, TEAL_PRIMARY), // color glow
  ];
}

// ── Layer Builders ───────────────────────────────────────────────────────

function addGlassPanel(
  frame: FrameNode, spec: GlassPanelSpec, width: number, height: number
): void {
  const px = Math.round(spec.x * width);
  const py = Math.round(spec.y * height);
  const pw = Math.round(spec.w * width);
  const ph = Math.round(spec.h * height);

  const panel = figma.createRectangle();
  panel.x = px;
  panel.y = py;
  panel.resize(pw, ph);
  panel.cornerRadius = scaleValue(spec.radius, width);
  panel.name = "glass-panel";

  applyGlassEffect(panel, { fillOpacity: 0.15, blurRadius: 20, borderOpacity: 0.25 });

  panel.effects = [
    { type: "BACKGROUND_BLUR", radius: 20, visible: true } as Effect,
    ...glassPanelShadows(),
  ];

  frame.appendChild(panel);
}

function addGradientArc(
  frame: FrameNode,
  corner: NonNullable<DesignConfig["cornerAccent"]>,
  width: number, height: number
): void {
  const arcSize = Math.round(Math.min(width, height) * 0.18);
  const positions: Record<string, { x: number; y: number }> = {
    "top-left":     { x: -arcSize * 0.3, y: -arcSize * 0.3 },
    "top-right":    { x: width - arcSize * 0.7, y: -arcSize * 0.3 },
    "bottom-left":  { x: -arcSize * 0.3, y: height - arcSize * 0.7 },
    "bottom-right": { x: width - arcSize * 0.7, y: height - arcSize * 0.7 },
  };

  const pos = positions[corner];
  const arc = figma.createEllipse();
  arc.resize(arcSize, arcSize);
  arc.x = Math.round(pos.x);
  arc.y = Math.round(pos.y);
  arc.fills = [gradientPaint(ARC_GRADIENT, 0.6)];
  arc.name = "corner-arc";
  frame.appendChild(arc);
}

function addDotGrid(frame: FrameNode, width: number, height: number): void {
  const spacing = scaleValue(20, width);
  const dotR = scaleValue(3, width);
  const cols = Math.floor(width / spacing);
  const rows = Math.floor(height / spacing);
  const cap = Math.min(cols * rows, 300);

  const gridFrame = figma.createFrame();
  gridFrame.resize(width, height);
  gridFrame.x = 0;
  gridFrame.y = 0;
  gridFrame.fills = [];
  gridFrame.clipsContent = true;
  gridFrame.name = "dot-grid";

  let placed = 0;
  for (let r = 0; r < rows && placed < cap; r++) {
    for (let c = 0; c < cols && placed < cap; c++) {
      const dot = figma.createEllipse();
      const size = dotR * 2;
      dot.resize(size, size);
      dot.x = c * spacing + spacing / 2 - dotR;
      dot.y = r * spacing + spacing / 2 - dotR;
      dot.fills = [solidPaint(WHITE, 0.05)];
      dot.name = "dot";
      gridFrame.appendChild(dot);
      placed++;
    }
  }

  frame.appendChild(gridFrame);
}

function addAccentLine(
  frame: FrameNode, lineSpec: { readonly y: number }, width: number, height: number
): void {
  const lineY = Math.round(lineSpec.y * height);
  const margin = Math.round(width * 0.08);
  const accentGrad: BrandGradient = {
    stops: [
      { color: TEAL_PRIMARY, position: 0 },
      { color: TEAL_PRIMARY, position: 0.7 },
      { color: TEAL_PRIMARY, position: 1 },
    ],
    angleDeg: 0,
  };

  const line = createGradientLine(
    frame, margin, lineY, width - margin * 2, scaleValue(3, width), accentGrad, "accent-line"
  );
  line.opacity = 0.6;
}

function addGradientBorderFrame(frame: FrameNode, width: number, height: number): void {
  const inset = scaleValue(14, width);
  const border = createRect(frame, {
    x: inset, y: inset,
    width: width - inset * 2, height: height - inset * 2,
    radius: RADIUS_LG, name: "gradient-border",
  });

  border.fills = [];
  border.strokes = [gradientPaint(TEAL_TO_ORANGE, 1)];
  border.strokeWeight = 2;
  border.strokeAlign = "INSIDE";
}

// ── Text Helpers ─────────────────────────────────────────────────────────

function addTextLayer(
  frame: FrameNode, text: string, layout: TextLayoutSpec,
  width: number, height: number,
  opts: { readonly yFrac: number; readonly size: number; readonly weight: "Bold" | "Regular"; readonly opacity: number; readonly name: string }
): TextNode {
  const fontSize = scaleFontSize(opts.size, width);
  const margin = Math.round(width * 0.1);
  const textWidth = width - margin * 2;
  const lhMultiplier = opts.weight === "Bold" ? 1.15 : 1.4;

  return createTextNode(frame, {
    text, fontSize, fontWeight: opts.weight,
    color: opts.weight === "Bold" ? WHITE : SLATE_100,
    x: margin,
    y: Math.round(opts.yFrac * height),
    width: textWidth,
    alignment: layout.align,
    lineHeight: Math.round(fontSize * lhMultiplier),
    letterSpacing: opts.weight === "Bold" ? -0.5 : 0,
    opacity: opts.opacity,
    name: opts.name,
  });
}

// ── Main Export ──────────────────────────────────────────────────────────

/**
 * Add the Figma design layer (Layer 3) on top of the composite image.
 * The composite image should already exist as frame.children[0].
 *
 * Adds: glass panel, shadows, decorative vectors, texture,
 * gradient border, and editable text nodes.
 */
export function addDesignLayer(
  frame: FrameNode,
  templateId: string,
  width: number,
  height: number,
  content: { readonly headline?: string; readonly subtitle?: string }
): void {
  const config = resolveConfig(templateId);

  // 1. Dot grid (behind glass panel)
  if (config.dotGrid) {
    addDotGrid(frame, width, height);
  }

  // 2. Glassmorphism panel with multi-shadow depth
  if (config.glassPanel) {
    addGlassPanel(frame, config.glassPanel, width, height);
  }

  // 3. Corner accent arc
  if (config.cornerAccent) {
    addGradientArc(frame, config.cornerAccent, width, height);
  }

  // 4. Accent line
  if (config.accentLine) {
    addAccentLine(frame, config.accentLine, width, height);
  }

  // 5. Texture overlay (grain)
  addGrainOverlay(frame, width, height, { opacity: 0.04, density: 150, color: WHITE });

  // 6. Gradient border frame
  if (config.gradientBorder) {
    addGradientBorderFrame(frame, width, height);
  }

  // 7. Editable text nodes (on top of everything)
  const tl = config.textLayout;
  if (content.headline) {
    addTextLayer(frame, content.headline, tl, width, height, {
      yFrac: tl.headlineY, size: tl.headlineSize, weight: "Bold", opacity: 1, name: "headline",
    });
  }
  if (content.subtitle) {
    addTextLayer(frame, content.subtitle, tl, width, height, {
      yFrac: tl.subtitleY, size: tl.subtitleSize, weight: "Regular", opacity: 0.85, name: "subtitle",
    });
  }
}
