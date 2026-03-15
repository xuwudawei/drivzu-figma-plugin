// Behind the Scenes: Instructor Feature, Platform Update
// RICH effects: glass panels, ambient blobs, multi-layer shadows, glows

import {
  PlatformSpec, GRADIENT_TEAL, GRADIENT_ORANGE,
  WHITE, TEAL_400, TEAL_500, TEAL_600,
  SLATE_50, SLATE_300, SLATE_600, SLATE_800, SLATE_900,
  ORANGE_PRIMARY, ORANGE_300,
  RADIUS_LG, RADIUS_XL, RADIUS_PILL,
  BrandGradient,
} from "../brand";
import { scaleValue, scaleFontSize, gradientPaint } from "../utils";
import {
  createFrame, createTextNode, createRect, createEllipse,
  createImagePlaceholder, createPillBadge, createGradientLine,
} from "../layout";
import { addLogoBar, addDecorativeArc } from "./shared";
import { TemplateContent } from "./registry";
import {
  cardShadow, floatShadow, glowShadow, heroShadow,
  applyGlassEffect, addAmbientBlobs, addScatteredCircles,
  addGrainOverlay, addRadialGlow,
} from "../effects";

// ── Instructor Feature ──────────────────────────────────────────────────

export function buildInstructorFeature(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, undefined, `Instructor Feature — ${platform.name}`);

  const pad = scaleValue(60, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Warm neutral gradient bg
  const warmBg: BrandGradient = {
    stops: [
      { color: SLATE_50, position: 0 },
      { color: WHITE, position: 0.4 },
      { color: { r: 0.96, g: 0.99, b: 0.98 }, position: 1 },
    ],
    angleDeg: 160,
  };
  frame.fills = [gradientPaint(warmBg)];

  // Ambient blobs
  addAmbientBlobs(frame, width, contentArea, [TEAL_400, ORANGE_300], {
    count: 2, opacity: 0.05, blur: 120,
  });

  // "MEET YOUR INSTRUCTOR" pill badge
  const pillFontSize = scaleFontSize(15, width);
  const pillY = contentArea * 0.06;
  const pillBadge = createPillBadge(frame, "MEET YOUR INSTRUCTOR", 0, pillY, {
    bgGradient: GRADIENT_TEAL,
    textColor: WHITE,
    fontSize: pillFontSize,
    fontWeight: "Bold",
    paddingX: scaleValue(24, width),
    paddingY: scaleValue(10, width),
    name: "instructor-badge",
  });

  // Center the pill
  const estPillW = "MEET YOUR INSTRUCTOR".length * pillFontSize * 0.6 + scaleValue(48, width);
  for (let i = frame.children.length - 1; i >= 0; i--) {
    const n = frame.children[i];
    if (n.name === "instructor-badge-bg" || n.name === "instructor-badge-text") {
      n.x = n.x + (width - estPillW) / 2;
    }
  }
  pillBadge.bg.effects = [...floatShadow(TEAL_500)];

  // Photo area with ring and hero shadow
  const imgSize = scaleValue(270, width);
  const imgX = (width - imgSize) / 2;
  const imgY = pillY + scaleValue(56, width);

  // Radial glow behind photo
  addRadialGlow(frame, width / 2, imgY + imgSize / 2, imgSize * 1.5, TEAL_500, 0.1);

  // Outer gradient ring
  const ringPad = scaleValue(10, width);
  const outerSize = imgSize + ringPad * 2;
  const outerEllipse = figma.createEllipse();
  outerEllipse.resize(outerSize, outerSize);
  outerEllipse.x = imgX - ringPad;
  outerEllipse.y = imgY - ringPad;
  outerEllipse.fills = [gradientPaint(GRADIENT_TEAL, 0.5)];
  outerEllipse.effects = [...heroShadow(TEAL_500)];
  outerEllipse.name = "photo-ring";
  frame.appendChild(outerEllipse);

  const imgPlaceholder = createImagePlaceholder(frame, {
    x: imgX, y: imgY,
    width: imgSize, height: imgSize,
    circular: true,
    borderColor: WHITE, borderWidth: 6,
    label: "Drop instructor photo",
    name: "instructor-photo",
  });

  // Glass card for name/info
  const cardY = imgY + imgSize + scaleValue(28, width);
  const cardH = contentArea - cardY - scaleValue(16, width);
  const cardPad = scaleValue(28, width);

  const infoCard = figma.createFrame();
  infoCard.resize(width - cardPad * 2, cardH);
  infoCard.x = cardPad;
  infoCard.y = cardY;
  infoCard.cornerRadius = RADIUS_XL;
  applyGlassEffect(infoCard, { fillOpacity: 0.6, blurRadius: 12, borderOpacity: 0.2 });
  infoCard.name = "info-card";
  frame.appendChild(infoCard);

  // Name
  const nameFontSize = scaleFontSize(42, width);
  createTextNode(frame, {
    text: content.name || "Paul Murphy",
    fontSize: nameFontSize,
    fontWeight: "ExtraBold",
    color: SLATE_900,
    x: pad, y: cardY + scaleValue(18, width),
    width: width - pad * 2,
    alignment: "CENTER",
    name: "instructor-name",
  });

  // Location/specialty
  const specFontSize = scaleFontSize(20, width);
  const specParts: string[] = [];
  if (content.location) specParts.push(content.location);
  if (content.specialty) specParts.push(content.specialty);
  const specText = specParts.length > 0 ? specParts.join(" \u00B7 ") : "Dublin South \u00B7 Automatic & Manual \u00B7 98% Pass Rate";

  createTextNode(frame, {
    text: specText,
    fontSize: specFontSize,
    fontWeight: "Medium",
    color: SLATE_600,
    x: pad, y: cardY + scaleValue(18, width) + nameFontSize + scaleValue(8, width),
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: specFontSize * 1.5,
    name: "instructor-specialty",
  });

  // Decorative orange curve
  const curveSize = scaleValue(300, width);
  const curveEllipse = figma.createEllipse();
  curveEllipse.resize(curveSize * 2, curveSize);
  curveEllipse.x = (width - curveSize * 2) / 2;
  curveEllipse.y = contentArea - curveSize * 0.2;
  curveEllipse.fills = [gradientPaint(GRADIENT_ORANGE, 0.08)];
  curveEllipse.name = "decorative-curve";
  frame.appendChild(curveEllipse);

  addGrainOverlay(frame, width, contentArea, { opacity: 0.015, density: 100 });
  addLogoBar(frame, width, height, { variant: "dark" });

  return frame;
}

// ── Platform Update ─────────────────────────────────────────────────────

export function buildPlatformUpdate(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, undefined, `Platform Update — ${platform.name}`);

  const pad = scaleValue(60, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Rich dark gradient
  const richDark: BrandGradient = {
    stops: [
      { color: { r: 0.04, g: 0.06, b: 0.12 }, position: 0 },
      { color: SLATE_900, position: 0.35 },
      { color: SLATE_800, position: 0.7 },
      { color: { r: 0.1, g: 0.13, b: 0.2 }, position: 1 },
    ],
    angleDeg: 145,
  };
  frame.fills = [gradientPaint(richDark)];

  // Ambient blobs
  addAmbientBlobs(frame, width, contentArea, [TEAL_500, ORANGE_PRIMARY], {
    count: 3, opacity: 0.07, blur: 100,
  });

  // Decorative arc with glow
  addDecorativeArc(frame, width, height, {
    gradient: GRADIENT_TEAL, opacity: 0.1, position: "bottom-right",
  });

  // Scattered circles
  addScatteredCircles(frame, width, contentArea, {
    count: 8,
    colors: [TEAL_400, WHITE],
    minSize: 10, maxSize: 50,
    opacity: 0.04,
  });

  // "NEW" pill badge with glow
  const pillFontSize = scaleFontSize(16, width);
  const pillY = contentArea * 0.14;
  const newBadge = createPillBadge(frame, "NEW", pad, pillY, {
    bgGradient: GRADIENT_ORANGE,
    textColor: WHITE,
    fontSize: pillFontSize,
    fontWeight: "Bold",
    paddingX: scaleValue(22, width),
    paddingY: scaleValue(8, width),
    name: "new-badge",
  });
  newBadge.bg.effects = [...glowShadow(ORANGE_PRIMARY, 0.35)];

  // Feature name
  const featureFontSize = scaleFontSize(46, width);
  const featureY = pillY + scaleValue(56, width);
  createTextNode(frame, {
    text: content.featureName || content.headline || "Instant Booking",
    fontSize: featureFontSize,
    fontWeight: "ExtraBold",
    color: WHITE,
    x: pad, y: featureY,
    width: width - pad * 2,
    lineHeight: featureFontSize * 1.15,
    name: "feature-name",
  });

  // Gradient accent line
  const hLineY = featureY + featureFontSize * 1.5 + scaleValue(16, width);
  const hLine = createGradientLine(frame, pad, hLineY, scaleValue(80, width), 4, GRADIENT_TEAL);
  hLine.effects = [...glowShadow(TEAL_500, 0.2)];

  // Description
  const descFontSize = scaleFontSize(23, width);
  createTextNode(frame, {
    text: content.description || content.subtitle || "Book your next lesson in under 30 seconds. Choose your instructor, pick a time slot, confirm — done!",
    fontSize: descFontSize,
    fontWeight: "Regular",
    color: SLATE_300,
    x: pad, y: hLineY + scaleValue(24, width),
    width: width - pad * 2,
    lineHeight: descFontSize * 1.6,
    name: "feature-description",
  });

  addGrainOverlay(frame, width, contentArea, { opacity: 0.02, density: 150, color: WHITE });
  addLogoBar(frame, width, height, { variant: "white" });

  return frame;
}

