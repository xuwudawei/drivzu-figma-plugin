// Success Stories: Pass Celebration, Testimonial Card, Stats Spotlight
// RICH effects: glass panels, multi-layer shadows, ambient blobs, grain, glows

import {
  PlatformSpec, GRADIENT_TEAL, GRADIENT_ORANGE, GRADIENT_DARK,
  WHITE, TEAL_100, TEAL_200, TEAL_400, TEAL_500, TEAL_600, TEAL_900,
  SLATE_900, SLATE_800, SLATE_400, SLATE_600,
  ORANGE_PRIMARY, ORANGE_400, ORANGE_300,
  RADIUS_MD, RADIUS_LG, RADIUS_XL, RADIUS_PILL,
  BrandGradient, RGB,
} from "../brand";
import { scaleValue, scaleFontSize, gradientPaint } from "../utils";
import {
  createFrame, createTextNode, createRect, createPillBadge,
  createImagePlaceholder, createEllipse, createGradientLine,
  createLogoNode, setBackground,
} from "../layout";
import { addLogoBar, addCornerAccent, addWatermarkText, addDotGrid } from "./shared";
import { TemplateContent } from "./registry";
import { MONOGRAM_BYTES } from "../logos";
import {
  cardShadow, floatShadow, glowShadow, heroShadow,
  applyGlassEffect, addAmbientBlobs, addScatteredCircles,
  addGrainOverlay, addRadialGlow,
} from "../effects";

// ── Pass Celebration ────────────────────────────────────────────────────

export function buildPassCelebration(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, undefined, `Pass Celebration — ${platform.name}`);

  const pad = scaleValue(60, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Rich teal gradient background
  const richTeal: BrandGradient = {
    stops: [
      { color: { r: 0.02, g: 0.45, b: 0.55 }, position: 0 },
      { color: TEAL_600, position: 0.4 },
      { color: TEAL_500, position: 0.7 },
      { color: { r: 0.12, g: 0.78, b: 0.7 }, position: 1 },
    ],
    angleDeg: 145,
  };
  frame.fills = [gradientPaint(richTeal)];

  // Ambient blobs for depth
  addAmbientBlobs(frame, width, contentArea, [
    WHITE, { r: 0.1, g: 0.85, b: 0.75 },
  ], { count: 3, opacity: 0.08, blur: 100 });

  // Scattered celebratory circles
  addScatteredCircles(frame, width, contentArea, {
    count: 15,
    colors: [WHITE, ORANGE_300, TEAL_200],
    minSize: 8, maxSize: 50,
    opacity: 0.08,
  });

  // "PASSED!" watermark
  addWatermarkText(frame, "PASSED!", width, height, {
    color: WHITE, opacity: 0.06, rotation: -5,
    fontSize: scaleValue(200, width),
  });

  // Radial glow behind photo area
  addRadialGlow(frame, width / 2, contentArea * 0.25, width * 0.7, WHITE, 0.12);

  // Image placeholder with hero shadow and thick white border
  const imgSize = scaleValue(300, width);
  const imgX = (width - imgSize) / 2;
  const imgY = contentArea * 0.07;

  const imgPlaceholder = createImagePlaceholder(frame, {
    x: imgX, y: imgY,
    width: imgSize, height: imgSize,
    radius: RADIUS_XL,
    borderColor: WHITE, borderWidth: 8,
    label: "Drop student photo here",
    name: "student-photo",
  });
  imgPlaceholder.effects = [...heroShadow({ r: 0, g: 0.3, b: 0.4 })];

  // Glass card for text content
  const cardY = imgY + imgSize + scaleValue(28, width);
  const cardH = contentArea - cardY - scaleValue(20, width);
  const cardPad = scaleValue(32, width);

  const textCard = figma.createFrame();
  textCard.resize(width - cardPad * 2, cardH);
  textCard.x = cardPad;
  textCard.y = cardY;
  textCard.cornerRadius = RADIUS_XL;
  applyGlassEffect(textCard, { fillOpacity: 0.18, blurRadius: 20, borderOpacity: 0.2 });
  textCard.name = "text-card";
  frame.appendChild(textCard);

  // Headline
  const nameText = content.name || "Sarah";
  const headlineFontSize = scaleFontSize(48, width);
  createTextNode(frame, {
    text: `Congratulations\n${nameText}!`,
    fontSize: headlineFontSize,
    fontWeight: "ExtraBold",
    color: WHITE,
    x: pad, y: cardY + scaleValue(20, width),
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: headlineFontSize * 1.15,
    name: "headline",
  });

  // Subtitle
  const subtitleFontSize = scaleFontSize(26, width);
  const subtitleY = cardY + scaleValue(20, width) + headlineFontSize * 2.5 + scaleValue(12, width);
  createTextNode(frame, {
    text: content.subtitle || "First-time pass — what a legend!",
    fontSize: subtitleFontSize,
    fontWeight: "SemiBold",
    color: TEAL_100,
    x: pad, y: subtitleY,
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: subtitleFontSize * 1.4,
    name: "subtitle",
  });

  // Orange pill badge for test centre
  if (content.location) {
    const pillFontSize = scaleFontSize(17, width);
    const pillY = subtitleY + subtitleFontSize * 2 + scaleValue(20, width);
    const pillBadge = createPillBadge(frame, `Test Centre: ${content.location}`, 0, pillY, {
      bgGradient: GRADIENT_ORANGE,
      textColor: WHITE,
      fontSize: pillFontSize,
      fontWeight: "SemiBold",
      paddingX: scaleValue(20, width),
      paddingY: scaleValue(8, width),
      name: "test-centre-pill",
    });
    // Center pill
    const estW = (`Test Centre: ${content.location}`).length * pillFontSize * 0.55 + scaleValue(40, width);
    for (let i = frame.children.length - 1; i >= 0; i--) {
      const n = frame.children[i];
      if (n.name === "test-centre-pill-bg" || n.name === "test-centre-pill-text") {
        n.x = n.x + (width - estW) / 2;
      }
    }
    pillBadge.bg.effects = [...floatShadow(ORANGE_PRIMARY)];
  }

  addGrainOverlay(frame, width, contentArea, { opacity: 0.02, density: 160 });
  addLogoBar(frame, width, height, { variant: "white" });

  return frame;
}

// ── Testimonial Card ────────────────────────────────────────────────────

export function buildTestimonialCard(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, undefined, `Testimonial Card — ${platform.name}`);

  const pad = scaleValue(60, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Warm white gradient bg
  const warmBg: BrandGradient = {
    stops: [
      { color: { r: 0.98, g: 0.99, b: 1.0 }, position: 0 },
      { color: WHITE, position: 0.4 },
      { color: { r: 0.95, g: 0.99, b: 0.98 }, position: 1 },
    ],
    angleDeg: 160,
  };
  frame.fills = [gradientPaint(warmBg)];

  // Ambient blobs
  addAmbientBlobs(frame, width, contentArea, [TEAL_400, ORANGE_300], {
    count: 2, opacity: 0.05, blur: 120,
  });

  // Orange corner accent with glow
  addCornerAccent(frame, width, height, "bottom-right", {
    gradient: GRADIENT_ORANGE, sizePercent: 0.22, opacity: 0.18,
  });

  // Large teal-200 opening quote mark
  const quoteFontSize = scaleFontSize(180, width);
  const quoteDecor = createTextNode(frame, {
    text: "\u201C",
    fontSize: quoteFontSize,
    fontWeight: "ExtraBold",
    color: TEAL_200,
    x: pad, y: contentArea * 0.04,
    opacity: 0.6,
    name: "decorative-quote",
  });

  // Glass quote card
  const cardX = scaleValue(28, width);
  const cardY = contentArea * 0.04 + quoteFontSize * 0.55;
  const cardW = width - cardX * 2;
  const cardH = contentArea * 0.52;

  const quoteCard = figma.createFrame();
  quoteCard.resize(cardW, cardH);
  quoteCard.x = cardX;
  quoteCard.y = cardY;
  quoteCard.cornerRadius = RADIUS_XL;
  applyGlassEffect(quoteCard, { fillOpacity: 0.55, blurRadius: 12, borderOpacity: 0.2, tint: { r: 0.97, g: 1, b: 0.99 } });
  quoteCard.name = "quote-card";
  frame.appendChild(quoteCard);

  // Quote text
  const textFontSize = scaleFontSize(30, width);
  createTextNode(frame, {
    text: content.quote || content.headline || "Drivzu made learning to drive so easy. My instructor was patient, professional, and made it fun!",
    fontSize: textFontSize,
    fontWeight: "SemiBold",
    color: SLATE_900,
    x: cardX + scaleValue(28, width),
    y: cardY + scaleValue(24, width),
    width: cardW - scaleValue(56, width),
    alignment: "LEFT",
    lineHeight: textFontSize * 1.55,
    name: "quote-text",
  });

  // Teal gradient divider
  const dividerY = cardY + cardH + scaleValue(24, width);
  const divLine = createGradientLine(frame, pad, dividerY, width - pad * 2, 4, GRADIENT_TEAL, "quote-divider");
  divLine.effects = [...glowShadow(TEAL_500, 0.15)];

  // Attribution
  const attrY = dividerY + scaleValue(24, width);
  const monoSize = scaleValue(52, width);

  // Monogram circle with teal gradient bg
  const attrCircle = createEllipse(frame, {
    x: pad, y: attrY,
    width: monoSize, height: monoSize,
    gradient: GRADIENT_TEAL,
    opacity: 0.2,
    name: "attr-monogram-bg",
  });
  attrCircle.effects = [...floatShadow(TEAL_500)];

  if (MONOGRAM_BYTES.length > 0) {
    createLogoNode(frame, MONOGRAM_BYTES, {
      x: pad + monoSize * 0.15, y: attrY + monoSize * 0.15,
      height: monoSize * 0.7,
      variant: "monogram",
      name: "attr-monogram",
    });
  }

  const nameFontSize = scaleFontSize(22, width);
  createTextNode(frame, {
    text: content.name || "Happy Student",
    fontSize: nameFontSize,
    fontWeight: "Bold",
    color: SLATE_900,
    x: pad + monoSize + scaleValue(16, width),
    y: attrY + monoSize * 0.1,
    name: "attr-name",
  });

  createTextNode(frame, {
    text: content.subtitle || "Drivzu Learner",
    fontSize: scaleFontSize(16, width),
    fontWeight: "Regular",
    color: SLATE_600,
    x: pad + monoSize + scaleValue(16, width),
    y: attrY + monoSize * 0.1 + nameFontSize + scaleValue(4, width),
    name: "attr-role",
  });

  addGrainOverlay(frame, width, contentArea, { opacity: 0.015, density: 120 });
  addLogoBar(frame, width, height, { variant: "dark" });

  return frame;
}

// ── Stats Spotlight ─────────────────────────────────────────────────────

export function buildStatsSpotlight(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, undefined, `Stats Spotlight — ${platform.name}`);

  const pad = scaleValue(60, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Rich dark gradient
  const richDark: BrandGradient = {
    stops: [
      { color: { r: 0.04, g: 0.06, b: 0.12 }, position: 0 },
      { color: SLATE_900, position: 0.35 },
      { color: SLATE_800, position: 0.7 },
      { color: { r: 0.12, g: 0.15, b: 0.22 }, position: 1 },
    ],
    angleDeg: 145,
  };
  frame.fills = [gradientPaint(richDark)];

  // Ambient teal blobs
  addAmbientBlobs(frame, width, contentArea, [TEAL_600, ORANGE_PRIMARY], {
    count: 3, opacity: 0.06, blur: 120,
  });

  // Dot grid with glow
  addDotGrid(frame, width * 0.55, scaleValue(30, width), width * 0.4, height * 0.3, {
    color: WHITE, opacity: 0.04, dotSize: scaleValue(4, width), spacing: scaleValue(20, width),
  });

  // Big radial glow behind stat
  addRadialGlow(frame, width / 2, contentArea * 0.32, width * 0.9, ORANGE_PRIMARY, 0.08);

  // Massive stat number
  const statFontSize = scaleFontSize(140, width);
  const statY = contentArea * 0.12;
  const statNode = createTextNode(frame, {
    text: content.statNumber || "94%",
    fontSize: statFontSize,
    fontWeight: "ExtraBold",
    color: ORANGE_PRIMARY,
    x: pad, y: statY,
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: statFontSize * 1.0,
    name: "stat-number",
  });

  // Metric label
  const labelFontSize = scaleFontSize(32, width);
  const labelY = statY + statFontSize + scaleValue(16, width);
  createTextNode(frame, {
    text: content.headline || "First-Time Pass Rate",
    fontSize: labelFontSize,
    fontWeight: "Medium",
    color: WHITE,
    x: pad, y: labelY,
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: labelFontSize * 1.3,
    name: "metric-label",
  });

  // Gradient line separator with glow
  const lineY = labelY + labelFontSize * 1.8 + scaleValue(28, width);
  const lineWidth = scaleValue(220, width);
  const divLine = createGradientLine(
    frame, (width - lineWidth) / 2, lineY, lineWidth, 4, GRADIENT_TEAL, "stat-divider"
  );
  divLine.effects = [...glowShadow(TEAL_500, 0.2)];

  // Context subtitle
  const ctxFontSize = scaleFontSize(22, width);
  createTextNode(frame, {
    text: content.subtitle || "Our learners pass first time at nearly double the national average",
    fontSize: ctxFontSize,
    fontWeight: "Regular",
    color: SLATE_400,
    x: pad, y: lineY + scaleValue(30, width),
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: ctxFontSize * 1.5,
    name: "context-subtitle",
  });

  addGrainOverlay(frame, width, contentArea, { opacity: 0.02, density: 160, color: WHITE });
  addLogoBar(frame, width, height, { variant: "white" });

  return frame;
}
