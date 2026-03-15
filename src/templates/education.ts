// Education templates: Driving Tip, EDT Lesson Spotlight, Did You Know?
// RICH effects: glass panels, multi-layer shadows, ambient blobs, grain, glows

import {
  PlatformSpec, GRADIENT_TEAL, GRADIENT_ORANGE,
  WHITE, TEAL_50, TEAL_100, TEAL_200, TEAL_400, TEAL_500, TEAL_600, TEAL_900, TEAL_950,
  SLATE_900, SLATE_600, SLATE_800,
  ORANGE_PRIMARY, ORANGE_400, ORANGE_300,
  RADIUS_MD, RADIUS_LG, RADIUS_XL, RADIUS_PILL,
  BrandGradient,
} from "../brand";
import { scaleValue, scaleFontSize, gradientPaint } from "../utils";
import {
  createFrame, createTextNode, createRect, createEllipse,
  createGradientLine, setBackground,
} from "../layout";
import { addLogoBar, addCornerAccent, addGradientStrip, addWatermarkText } from "./shared";
import { TemplateContent } from "./registry";
import {
  cardShadow, floatShadow, glowShadow,
  applyGlassEffect, addAmbientBlobs, addScatteredCircles,
  addGrainOverlay, addRadialGlow,
} from "../effects";

// ── Driving Tip ─────────────────────────────────────────────────────────

export function buildDrivingTip(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, WHITE, `Driving Tip — ${platform.name}`);

  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;
  const leftWidth = Math.round(width * 0.4);
  const rightX = leftWidth;
  const rightWidth = width - leftWidth;
  const rightPad = scaleValue(40, width);

  // Right panel: warm subtle gradient
  const warmBg: BrandGradient = {
    stops: [
      { color: WHITE, position: 0 },
      { color: { r: 0.97, g: 0.99, b: 0.98 }, position: 1 },
    ],
    angleDeg: 180,
  };
  frame.fills = [gradientPaint(warmBg)];

  // Left panel: rich teal gradient
  const richTeal: BrandGradient = {
    stops: [
      { color: { r: 0.02, g: 0.45, b: 0.55 }, position: 0 },
      { color: TEAL_600, position: 0.5 },
      { color: TEAL_500, position: 1 },
    ],
    angleDeg: 170,
  };
  const leftPanel = createRect(frame, {
    x: 0, y: 0, width: leftWidth, height: contentArea,
    gradient: richTeal,
    name: "left-panel",
  });

  // Ambient blob on left panel
  addAmbientBlobs(frame, leftWidth, contentArea, [WHITE], {
    count: 2, opacity: 0.06, blur: 80,
  });

  // Large tip number
  const numFontSize = scaleFontSize(180, width);
  createTextNode(frame, {
    text: content.tipNumber || "1",
    fontSize: numFontSize,
    fontWeight: "ExtraBold",
    color: WHITE,
    x: scaleValue(12, width), y: contentArea * 0.25,
    width: leftWidth - scaleValue(24, width),
    alignment: "CENTER",
    lineHeight: numFontSize,
    name: "tip-number",
  });

  // Orange underline with glow
  const underlineW = scaleValue(80, width);
  const underlineY = contentArea * 0.25 + numFontSize + scaleValue(10, width);
  const underline = createRect(frame, {
    x: (leftWidth - underlineW) / 2, y: underlineY,
    width: underlineW, height: scaleValue(6, width),
    gradient: GRADIENT_ORANGE, radius: 3,
    name: "tip-underline",
  });
  underline.effects = [...glowShadow(ORANGE_PRIMARY, 0.3)];

  // Right panel content
  const overlineFontSize = scaleFontSize(15, width);
  const overlineY = contentArea * 0.14;
  createTextNode(frame, {
    text: "DRIVING TIP",
    fontSize: overlineFontSize,
    fontWeight: "Bold",
    color: TEAL_600,
    x: rightX + rightPad, y: overlineY,
    letterSpacing: scaleValue(3, width),
    name: "overline",
  });

  // Tip headline
  const headlineFontSize = scaleFontSize(38, width);
  const headlineY = overlineY + overlineFontSize + scaleValue(14, width);
  createTextNode(frame, {
    text: content.headline || "The 2-Second Rule",
    fontSize: headlineFontSize,
    fontWeight: "Bold",
    color: SLATE_900,
    x: rightX + rightPad, y: headlineY,
    width: rightWidth - rightPad * 2,
    lineHeight: headlineFontSize * 1.2,
    name: "headline",
  });

  // Decorative teal line under headline
  const hLineY = headlineY + headlineFontSize * 2.5 + scaleValue(8, width);
  const hLine = createGradientLine(frame, rightX + rightPad, hLineY, scaleValue(60, width), 3, GRADIENT_TEAL, "headline-accent");
  hLine.effects = [...glowShadow(TEAL_500, 0.15)];

  // Tip body
  const bodyFontSize = scaleFontSize(21, width);
  const bodyY = hLineY + scaleValue(16, width);
  createTextNode(frame, {
    text: content.subtitle || "Pick a fixed point ahead. When the car in front passes it, count 'one thousand, two thousand.' If you pass it before finishing, you're too close!",
    fontSize: bodyFontSize,
    fontWeight: "Regular",
    color: SLATE_600,
    x: rightX + rightPad, y: bodyY,
    width: rightWidth - rightPad * 2,
    lineHeight: bodyFontSize * 1.65,
    name: "body-text",
  });

  // Grain on right panel
  addGrainOverlay(frame, width, contentArea, { opacity: 0.015, density: 100 });

  addGradientStrip(frame, width, contentArea - 4, 4, GRADIENT_TEAL);
  addLogoBar(frame, width, height, { variant: "dark" });

  return frame;
}

// ── EDT Lesson Spotlight ────────────────────────────────────────────────

export function buildEdtLesson(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, WHITE, `EDT Lesson — ${platform.name}`);

  const pad = scaleValue(60, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Subtle warm bg
  const warmBg: BrandGradient = {
    stops: [
      { color: WHITE, position: 0 },
      { color: { r: 0.99, g: 0.98, b: 0.97 }, position: 1 },
    ],
    angleDeg: 180,
  };
  frame.fills = [gradientPaint(warmBg)];

  // Ambient orange blob top
  addAmbientBlobs(frame, width, height * 0.3, [ORANGE_300], { count: 1, opacity: 0.05, blur: 100 });

  // Orange gradient banner with depth
  const bannerHeight = Math.round(height * 0.12);
  const richOrange: BrandGradient = {
    stops: [
      { color: { r: 0.93, g: 0.35, b: 0.05 }, position: 0 },
      { color: ORANGE_PRIMARY, position: 0.5 },
      { color: ORANGE_400, position: 1 },
    ],
    angleDeg: 100,
  };
  const banner = createRect(frame, {
    x: 0, y: 0, width, height: bannerHeight,
    gradient: richOrange,
    name: "banner",
  });
  banner.effects = [...glowShadow(ORANGE_PRIMARY, 0.15)];

  // "EDT LESSON" label
  const labelFontSize = scaleFontSize(22, width);
  createTextNode(frame, {
    text: "EDT LESSON",
    fontSize: labelFontSize,
    fontWeight: "Bold",
    color: WHITE,
    x: pad, y: (bannerHeight - labelFontSize * 1.4) / 2,
    letterSpacing: scaleValue(2, width),
    name: "edt-label",
  });

  // Lesson number circle with glow
  const lessonNum = content.lessonNumber || "1";
  const circleSize = scaleValue(56, width);
  const circleX = width - pad - circleSize;
  const circleY = (bannerHeight - circleSize) / 2;

  const numCircle = createEllipse(frame, {
    x: circleX, y: circleY,
    width: circleSize, height: circleSize,
    fill: WHITE,
    name: "lesson-circle",
  });
  numCircle.effects = [...floatShadow()];

  createTextNode(frame, {
    text: lessonNum,
    fontSize: scaleFontSize(26, width),
    fontWeight: "ExtraBold",
    color: ORANGE_PRIMARY,
    x: circleX, y: circleY + (circleSize - scaleFontSize(26, width) * 1.2) / 2,
    width: circleSize,
    alignment: "CENTER",
    name: "lesson-number",
  });

  // Lesson title
  const titleFontSize = scaleFontSize(42, width);
  const titleY = bannerHeight + scaleValue(36, width);
  createTextNode(frame, {
    text: content.headline || "Vehicle Controls & Cockpit Drill",
    fontSize: titleFontSize,
    fontWeight: "ExtraBold",
    color: SLATE_900,
    x: pad, y: titleY,
    width: width - pad * 2,
    lineHeight: titleFontSize * 1.2,
    name: "lesson-title",
  });

  // Bullet points with glass-backed checkmarks
  const bulletStartY = titleY + titleFontSize * 2.5 + scaleValue(28, width);
  const bulletFontSize = scaleFontSize(21, width);
  const checkSize = scaleValue(36, width);
  const bulletSpacing = scaleValue(58, width);

  const bullets = content.subtitle
    ? content.subtitle.split("|").map(b => b.trim())
    : ["Adjusting mirrors correctly", "Understanding dashboard instruments", "Steering wheel grip & pedal control", "Starting and stopping safely"];

  bullets.forEach((bullet, i) => {
    const by = bulletStartY + i * bulletSpacing;

    // Teal circle with gradient and shadow
    const checkBg = createEllipse(frame, {
      x: pad, y: by,
      width: checkSize, height: checkSize,
      gradient: GRADIENT_TEAL,
      opacity: 0.9,
      name: `bullet-circle-${i}`,
    });
    checkBg.effects = [...glowShadow(TEAL_500, 0.2)];

    createTextNode(frame, {
      text: "\u2713",
      fontSize: scaleFontSize(18, width),
      fontWeight: "Bold",
      color: WHITE,
      x: pad, y: by + (checkSize - scaleFontSize(18, width)) / 2,
      width: checkSize,
      alignment: "CENTER",
      name: `bullet-check-${i}`,
    });

    createTextNode(frame, {
      text: bullet,
      fontSize: bulletFontSize,
      fontWeight: "Medium",
      color: SLATE_600,
      x: pad + checkSize + scaleValue(14, width),
      y: by + (checkSize - bulletFontSize) / 2,
      width: width - pad * 2 - checkSize - scaleValue(14, width),
      name: `bullet-text-${i}`,
    });
  });

  addCornerAccent(frame, width, height, "bottom-left", {
    gradient: GRADIENT_TEAL, sizePercent: 0.15, opacity: 0.12,
  });

  addGrainOverlay(frame, width, contentArea, { opacity: 0.015, density: 100 });
  addLogoBar(frame, width, height, { variant: "dark" });

  return frame;
}

// ── Did You Know? ───────────────────────────────────────────────────────

export function buildDidYouKnow(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, undefined, `Did You Know? — ${platform.name}`);

  const pad = scaleValue(60, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Rich dark teal gradient
  const richDark: BrandGradient = {
    stops: [
      { color: { r: 0.01, g: 0.10, b: 0.10 }, position: 0 },
      { color: TEAL_950, position: 0.4 },
      { color: { r: 0.03, g: 0.22, b: 0.21 }, position: 1 },
    ],
    angleDeg: 150,
  };
  frame.fills = [gradientPaint(richDark)];

  // Ambient blobs
  addAmbientBlobs(frame, width, contentArea, [TEAL_600, ORANGE_PRIMARY], {
    count: 3, opacity: 0.06, blur: 120,
  });

  // Large question mark watermark
  addWatermarkText(frame, "?", width, height, {
    color: TEAL_900, opacity: 0.12, rotation: 0,
    fontSize: scaleValue(500, width),
  });

  // Scattered circles
  addScatteredCircles(frame, width, contentArea, {
    count: 10,
    colors: [TEAL_400, ORANGE_400],
    minSize: 6, maxSize: 40,
    opacity: 0.06,
  });

  // Radial glow behind text
  addRadialGlow(frame, width / 2, contentArea * 0.45, width * 0.8, TEAL_500, 0.08);

  // "DID YOU KNOW?" header with decorative line
  const headerFontSize = scaleFontSize(30, width);
  const headerY = contentArea * 0.16;
  createTextNode(frame, {
    text: "DID YOU KNOW?",
    fontSize: headerFontSize,
    fontWeight: "ExtraBold",
    color: ORANGE_400,
    x: pad, y: headerY,
    width: width - pad * 2,
    alignment: "CENTER",
    letterSpacing: scaleValue(4, width),
    name: "header",
  });

  // Decorative line under header
  const lineW = scaleValue(80, width);
  const lineY = headerY + headerFontSize + scaleValue(12, width);
  const hLine = createRect(frame, {
    x: (width - lineW) / 2, y: lineY,
    width: lineW, height: 3,
    gradient: GRADIENT_ORANGE, radius: 2,
    name: "header-line",
  });
  hLine.effects = [...glowShadow(ORANGE_PRIMARY, 0.2)];

  // Glass card for fact text
  const cardPad = scaleValue(32, width);
  const cardY = lineY + scaleValue(32, width);
  const cardH = contentArea * 0.38;

  const factCard = figma.createFrame();
  factCard.resize(width - cardPad * 2, cardH);
  factCard.x = cardPad;
  factCard.y = cardY;
  factCard.cornerRadius = RADIUS_XL;
  applyGlassEffect(factCard, { fillOpacity: 0.1, blurRadius: 20, borderOpacity: 0.15, tint: TEAL_400 });
  factCard.name = "fact-card";
  frame.appendChild(factCard);

  // Fact text
  const factFontSize = scaleFontSize(34, width);
  createTextNode(frame, {
    text: content.headline || "Ireland's driving test has a 52% pass rate — nearly half of all candidates fail on their first attempt!",
    fontSize: factFontSize,
    fontWeight: "SemiBold",
    color: WHITE,
    x: cardPad + scaleValue(24, width),
    y: cardY + scaleValue(24, width),
    width: width - cardPad * 2 - scaleValue(48, width),
    alignment: "CENTER",
    lineHeight: factFontSize * 1.5,
    name: "fact-text",
  });

  // Source attribution
  if (content.source) {
    const srcFontSize = scaleFontSize(15, width);
    createTextNode(frame, {
      text: `Source: ${content.source}`,
      fontSize: srcFontSize,
      fontWeight: "Regular",
      color: TEAL_400,
      x: pad, y: cardY + cardH + scaleValue(20, width),
      width: width - pad * 2,
      alignment: "CENTER",
      opacity: 0.7,
      name: "source",
    });
  }

  addGrainOverlay(frame, width, contentArea, { opacity: 0.025, density: 160, color: WHITE });
  addLogoBar(frame, width, height, { variant: "white" });

  return frame;
}
