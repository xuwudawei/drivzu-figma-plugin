// Promotion templates: Bold CTA, Special Offer, Booking Reminder
// RICH effects: glass panels, ambient blobs, multi-layer shadows, glows, grain

import {
  PlatformSpec, GRADIENT_TEAL, GRADIENT_ORANGE,
  WHITE, TEAL_100, TEAL_400, TEAL_500, TEAL_600,
  SLATE_900, SLATE_600, SLATE_800,
  ORANGE_PRIMARY, ORANGE_400, ORANGE_300,
  RADIUS_LG, RADIUS_XL, RADIUS_PILL,
  BrandGradient,
} from "../brand";
import { scaleValue, scaleFontSize } from "../utils";
import {
  createFrame, createTextNode, createRect, createPillBadge,
  createEllipse, createGradientLine,
} from "../layout";
import { addLogoBar, addCornerAccent, addGradientStrip } from "./shared";
import { TemplateContent } from "./registry";
import {
  cardShadow, floatShadow, glowShadow, heroShadow,
  applyGlassEffect, addAmbientBlobs, addScatteredCircles,
  addGrainOverlay, addRadialGlow,
} from "../effects";

// ── Bold CTA ────────────────────────────────────────────────────────────

export function buildBoldCta(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, undefined, `Bold CTA — ${platform.name}`);

  const pad = scaleValue(60, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Rich multi-stop teal gradient
  const richTeal: BrandGradient = {
    stops: [
      { color: { r: 0.02, g: 0.42, b: 0.52 }, position: 0 },
      { color: TEAL_600, position: 0.35 },
      { color: TEAL_500, position: 0.65 },
      { color: { r: 0.12, g: 0.78, b: 0.7 }, position: 1 },
    ],
    angleDeg: 145,
  };
  frame.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: [[0.6, -0.4, 0.4], [0.4, 0.6, 0]], gradientStops: richTeal.stops.map(s => ({ position: s.position, color: { ...s.color, a: 1 } })) }];

  // Ambient blobs for depth
  addAmbientBlobs(frame, width, contentArea, [
    WHITE, { r: 0.1, g: 0.85, b: 0.75 }, ORANGE_300,
  ], { count: 4, opacity: 0.07, blur: 100 });

  // Scattered decorative elements
  addScatteredCircles(frame, width, contentArea, {
    count: 12,
    colors: [WHITE, TEAL_400],
    minSize: 8, maxSize: 60,
    opacity: 0.06,
  });

  // Corner accent with glow
  addCornerAccent(frame, width, height, "top-right", {
    gradient: GRADIENT_ORANGE, sizePercent: 0.22, opacity: 0.2,
  });

  // Headline
  const headlineFontSize = scaleFontSize(52, width);
  const headlineY = contentArea * 0.14;
  createTextNode(frame, {
    text: content.headline || "Your Driving Journey\nStarts Here",
    fontSize: headlineFontSize,
    fontWeight: "ExtraBold",
    color: WHITE,
    x: pad, y: headlineY,
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: headlineFontSize * 1.15,
    name: "headline",
  });

  // Subtitle
  const subtitleFontSize = scaleFontSize(24, width);
  const subtitleY = headlineY + headlineFontSize * 3 + scaleValue(20, width);
  createTextNode(frame, {
    text: content.subtitle || "Professional instructors. Flexible scheduling. First-time pass guarantee.",
    fontSize: subtitleFontSize,
    fontWeight: "Medium",
    color: TEAL_100,
    x: pad, y: subtitleY,
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: subtitleFontSize * 1.55,
    name: "subtitle",
  });

  // Radial glow behind CTA button
  const ctaY = subtitleY + subtitleFontSize * 4 + scaleValue(44, width);
  addRadialGlow(frame, width / 2, ctaY + scaleValue(30, width), width * 0.5, WHITE, 0.15);

  // CTA Button — glass + orange gradient
  const ctaText = content.ctaText || "Book Your First Lesson";
  const ctaFontSize = scaleFontSize(28, width);

  const ctaTextNode = figma.createText();
  ctaTextNode.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
  ctaTextNode.characters = ctaText;
  ctaTextNode.fontSize = ctaFontSize;
  ctaTextNode.fills = [{ type: "SOLID", color: WHITE }];

  const btnPadX = scaleValue(44, width);
  const btnPadY = scaleValue(20, width);
  const btnWidth = ctaTextNode.width + btnPadX * 2;
  const btnHeight = ctaTextNode.height + btnPadY * 2;
  const btnX = (width - btnWidth) / 2;

  const richOrangeGrad: BrandGradient = {
    stops: [
      { color: { r: 0.93, g: 0.35, b: 0.05 }, position: 0 },
      { color: ORANGE_PRIMARY, position: 0.5 },
      { color: ORANGE_400, position: 1 },
    ],
    angleDeg: 135,
  };
  const ctaBtn = createRect(frame, {
    x: btnX, y: ctaY,
    width: btnWidth, height: btnHeight,
    gradient: richOrangeGrad,
    radius: RADIUS_XL,
    name: "cta-button-bg",
  });
  ctaBtn.effects = [...heroShadow(ORANGE_PRIMARY)];

  ctaTextNode.x = btnX + btnPadX;
  ctaTextNode.y = ctaY + btnPadY;
  ctaTextNode.name = "cta-button-text";
  frame.appendChild(ctaTextNode);

  // URL below button
  const urlFontSize = scaleFontSize(18, width);
  createTextNode(frame, {
    text: "drivzu.ie",
    fontSize: urlFontSize,
    fontWeight: "Medium",
    color: WHITE,
    x: pad, y: ctaY + btnHeight + scaleValue(20, width),
    width: width - pad * 2,
    alignment: "CENTER",
    opacity: 0.7,
    name: "url",
  });

  addGrainOverlay(frame, width, contentArea, { opacity: 0.02, density: 150 });
  addLogoBar(frame, width, height, { variant: "white" });

  return frame;
}

// ── Special Offer ───────────────────────────────────────────────────────

export function buildSpecialOffer(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, undefined, `Special Offer — ${platform.name}`);

  const pad = scaleValue(60, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Rich orange gradient
  const richOrange: BrandGradient = {
    stops: [
      { color: { r: 0.9, g: 0.3, b: 0.02 }, position: 0 },
      { color: ORANGE_PRIMARY, position: 0.35 },
      { color: ORANGE_400, position: 0.7 },
      { color: { r: 1.0, g: 0.65, b: 0.35 }, position: 1 },
    ],
    angleDeg: 145,
  };
  frame.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: [[0.6, -0.4, 0.4], [0.4, 0.6, 0]], gradientStops: richOrange.stops.map(s => ({ position: s.position, color: { ...s.color, a: 1 } })) }];

  // Ambient blobs
  addAmbientBlobs(frame, width, contentArea, [
    WHITE, { r: 1, g: 0.85, b: 0.6 },
  ], { count: 4, opacity: 0.07, blur: 100 });

  // Scattered shapes
  addScatteredCircles(frame, width, contentArea, {
    count: 10,
    colors: [WHITE, { r: 1, g: 0.9, b: 0.7 }],
    minSize: 10, maxSize: 50,
    opacity: 0.07,
  });

  // Corner accent
  addCornerAccent(frame, width, height, "top-left", {
    gradient: GRADIENT_TEAL, sizePercent: 0.18, opacity: 0.15,
  });

  // "LIMITED TIME" pill
  const pillY = contentArea * 0.09;
  const ltPill = createPillBadge(frame, "LIMITED TIME", (width - scaleValue(220, width)) / 2, pillY, {
    bgColor: SLATE_900,
    textColor: WHITE,
    fontSize: scaleFontSize(17, width),
    fontWeight: "Bold",
    paddingX: scaleValue(24, width),
    paddingY: scaleValue(10, width),
    name: "limited-pill",
  });
  ltPill.bg.effects = [...floatShadow()];

  // Offer value (massive)
  const offerFontSize = scaleFontSize(110, width);
  const offerY = pillY + scaleValue(68, width);

  // Radial glow behind offer
  addRadialGlow(frame, width / 2, offerY + offerFontSize / 2, width * 0.7, WHITE, 0.12);

  createTextNode(frame, {
    text: content.offerValue || "20% OFF",
    fontSize: offerFontSize,
    fontWeight: "ExtraBold",
    color: WHITE,
    x: pad, y: offerY,
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: offerFontSize * 1.05,
    name: "offer-value",
  });

  // Details
  const detailsFontSize = scaleFontSize(28, width);
  const detailsY = offerY + offerFontSize * 1.15 + scaleValue(14, width);
  createTextNode(frame, {
    text: content.headline || "Your First 3 Lessons",
    fontSize: detailsFontSize,
    fontWeight: "SemiBold",
    color: WHITE,
    x: pad, y: detailsY,
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: detailsFontSize * 1.4,
    name: "offer-details",
  });

  // Promo code box with glass effect
  if (content.promoCode) {
    const codeBoxY = detailsY + detailsFontSize * 2.5 + scaleValue(28, width);
    const codeBoxW = scaleValue(320, width);
    const codeBoxH = scaleValue(68, width);
    const codeBoxX = (width - codeBoxW) / 2;

    const codeBox = figma.createFrame();
    codeBox.resize(codeBoxW, codeBoxH);
    codeBox.x = codeBoxX;
    codeBox.y = codeBoxY;
    codeBox.cornerRadius = scaleValue(14, width);
    applyGlassEffect(codeBox, { fillOpacity: 0.2, blurRadius: 12, borderOpacity: 0.5, tint: WHITE });
    codeBox.name = "promo-code-box";
    frame.appendChild(codeBox);

    createTextNode(frame, {
      text: content.promoCode,
      fontSize: scaleFontSize(26, width),
      fontWeight: "Bold",
      color: WHITE,
      x: codeBoxX, y: codeBoxY + (codeBoxH - scaleFontSize(26, width)) / 2,
      width: codeBoxW,
      alignment: "CENTER",
      letterSpacing: 4,
      name: "promo-code-text",
    });
  }

  // "Book Now" text
  const bookFontSize = scaleFontSize(20, width);
  createTextNode(frame, {
    text: "Book Now at drivzu.ie",
    fontSize: bookFontSize,
    fontWeight: "Medium",
    color: WHITE,
    x: pad, y: contentArea - scaleValue(50, width) - bookFontSize,
    width: width - pad * 2,
    alignment: "CENTER",
    opacity: 0.85,
    name: "book-url",
  });

  addGrainOverlay(frame, width, contentArea, { opacity: 0.025, density: 160 });
  addLogoBar(frame, width, height, { variant: "white" });

  return frame;
}

// ── Booking Reminder ────────────────────────────────────────────────────

export function buildBookingReminder(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, undefined, `Booking Reminder — ${platform.name}`);

  const pad = scaleValue(60, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Warm white gradient
  const warmBg: BrandGradient = {
    stops: [
      { color: WHITE, position: 0 },
      { color: { r: 0.96, g: 0.99, b: 0.98 }, position: 0.5 },
      { color: { r: 0.97, g: 0.98, b: 0.99 }, position: 1 },
    ],
    angleDeg: 170,
  };
  frame.fills = [{ type: "GRADIENT_LINEAR", gradientTransform: [[0.5, -0.3, 0.3], [0.3, 0.5, 0]], gradientStops: warmBg.stops.map(s => ({ position: s.position, color: { ...s.color, a: 1 } })) }];

  // Ambient blobs
  addAmbientBlobs(frame, width, contentArea, [TEAL_400, ORANGE_300], {
    count: 2, opacity: 0.04, blur: 120,
  });

  // Teal gradient accent bar top
  const accentHeight = Math.round(height * 0.07);
  const richTeal: BrandGradient = {
    stops: [
      { color: TEAL_600, position: 0 },
      { color: TEAL_500, position: 0.5 },
      { color: TEAL_400, position: 1 },
    ],
    angleDeg: 90,
  };
  const topBar = addGradientStrip(frame, width, 0, accentHeight, richTeal);
  topBar.effects = [...glowShadow(TEAL_500, 0.15)];

  // Clock icon with glow
  const clockSize = scaleValue(90, width);
  const clockX = (width - clockSize) / 2;
  const clockY = accentHeight + contentArea * 0.1;

  addRadialGlow(frame, width / 2, clockY + clockSize / 2, clockSize * 2, TEAL_500, 0.08);

  const clockBg = createEllipse(frame, {
    x: clockX, y: clockY,
    width: clockSize, height: clockSize,
    gradient: GRADIENT_TEAL,
    opacity: 0.15,
    name: "clock-bg",
  });
  clockBg.effects = [...floatShadow(TEAL_500)];

  const handWidth = scaleValue(4, width);
  const handCenterX = clockX + clockSize / 2;
  const handCenterY = clockY + clockSize / 2;

  createRect(frame, {
    x: handCenterX - handWidth / 2,
    y: handCenterY - clockSize * 0.32,
    width: handWidth, height: clockSize * 0.32,
    fill: TEAL_500, radius: handWidth,
    name: "clock-minute",
  });
  createRect(frame, {
    x: handCenterX,
    y: handCenterY - handWidth / 2,
    width: clockSize * 0.22, height: handWidth,
    fill: TEAL_500, radius: handWidth,
    name: "clock-hour",
  });
  createEllipse(frame, {
    x: handCenterX - handWidth, y: handCenterY - handWidth,
    width: handWidth * 2, height: handWidth * 2,
    fill: TEAL_500,
    name: "clock-center",
  });

  // Glass card for content
  const cardPad = scaleValue(28, width);
  const cardY = clockY + clockSize + scaleValue(28, width);
  const cardH = contentArea - cardY - scaleValue(16, width);

  const contentCard = figma.createFrame();
  contentCard.resize(width - cardPad * 2, cardH);
  contentCard.x = cardPad;
  contentCard.y = cardY;
  contentCard.cornerRadius = RADIUS_XL;
  applyGlassEffect(contentCard, { fillOpacity: 0.5, blurRadius: 12, borderOpacity: 0.15 });
  contentCard.name = "content-card";
  frame.appendChild(contentCard);

  // Headline
  const headlineFontSize = scaleFontSize(38, width);
  createTextNode(frame, {
    text: content.headline || "Your Next Lesson\nIs Waiting!",
    fontSize: headlineFontSize,
    fontWeight: "Bold",
    color: SLATE_900,
    x: pad, y: cardY + scaleValue(24, width),
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: headlineFontSize * 1.2,
    name: "headline",
  });

  // Subtitle
  const subtitleFontSize = scaleFontSize(22, width);
  const subtitleY = cardY + scaleValue(24, width) + headlineFontSize * 2.8 + scaleValue(12, width);
  createTextNode(frame, {
    text: content.subtitle || "Don't let your skills go rusty. Book your next session in seconds.",
    fontSize: subtitleFontSize,
    fontWeight: "Regular",
    color: SLATE_600,
    x: pad, y: subtitleY,
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: subtitleFontSize * 1.55,
    name: "subtitle",
  });

  // CTA pill with glow
  const ctaText = content.ctaText || "Book Now";
  const ctaFontSize = scaleFontSize(22, width);
  const ctaY = subtitleY + subtitleFontSize * 3.5 + scaleValue(28, width);

  const ctaPill = createPillBadge(frame, ctaText, 0, ctaY, {
    bgGradient: GRADIENT_ORANGE,
    textColor: WHITE,
    fontSize: ctaFontSize,
    fontWeight: "Bold",
    paddingX: scaleValue(40, width),
    paddingY: scaleValue(16, width),
    name: "cta-pill",
  });

  // Center and add glow
  const estCtaW = ctaText.length * ctaFontSize * 0.6 + scaleValue(80, width);
  for (let i = frame.children.length - 1; i >= 0; i--) {
    const n = frame.children[i];
    if (n.name === "cta-pill-bg" || n.name === "cta-pill-text") {
      n.x = n.x + (width - estCtaW) / 2;
    }
  }
  ctaPill.bg.effects = [...heroShadow(ORANGE_PRIMARY)];

  addGrainOverlay(frame, width, contentArea, { opacity: 0.015, density: 100 });
  addLogoBar(frame, width, height, { variant: "dark" });

  return frame;
}
