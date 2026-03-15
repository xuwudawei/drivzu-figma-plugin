// Entertainment templates: Relatable Moment (Meme Card), Quiz/Poll
// RICH visual effects: glass cards, multi-layer shadows, ambient blobs, grain

import {
  PlatformSpec, GRADIENT_TEAL, GRADIENT_ORANGE,
  WHITE, TEAL_500, TEAL_600, TEAL_400,
  SLATE_900, SLATE_600, SLATE_800,
  ORANGE_PRIMARY, ORANGE_400, ORANGE_300,
  RADIUS_MD, RADIUS_LG, RADIUS_XL,
  BrandGradient,
} from "../brand";
import { scaleValue, scaleFontSize, solidPaint, gradientPaint } from "../utils";
import {
  createFrame, createTextNode, createRect, createEllipse,
  createImagePlaceholder,
} from "../layout";
import { addLogoBar, addGradientStrip } from "./shared";
import { TemplateContent } from "./registry";
import {
  cardShadow, floatShadow, glowShadow, heroShadow,
  applyGlassEffect, addScatteredCircles, addAmbientBlobs,
  addGrainOverlay, addRadialGlow,
} from "../effects";

// ── Relatable Moment (Meme Card) ────────────────────────────────────────

export function buildMemeCard(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, WHITE, `Relatable Moment — ${platform.name}`);

  const pad = scaleValue(40, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Subtle teal-to-white gradient background
  const subtleBg: BrandGradient = {
    stops: [
      { color: { r: 0.941, g: 0.992, b: 0.980 }, position: 0 },
      { color: WHITE, position: 0.5 },
      { color: { r: 0.973, g: 0.980, b: 0.988 }, position: 1 },
    ],
    angleDeg: 160,
  };
  frame.fills = [gradientPaint(subtleBg)];

  // Ambient blobs for depth
  addAmbientBlobs(frame, width, height, [TEAL_400, ORANGE_300], {
    count: 2, opacity: 0.06, blur: 120,
  });

  // Teal gradient top banner with glass effect
  const bannerHeight = Math.round(height * 0.1);
  const banner = createRect(frame, {
    x: 0, y: 0, width, height: bannerHeight,
    gradient: GRADIENT_TEAL,
    name: "top-banner",
  });
  banner.effects = [...glowShadow(TEAL_500, 0.2)];

  const labelFontSize = scaleFontSize(21, width);
  createTextNode(frame, {
    text: content.subtitle || "Every learner driver knows this feeling...",
    fontSize: labelFontSize,
    fontWeight: "SemiBold",
    color: WHITE,
    x: pad, y: (bannerHeight - labelFontSize * 1.2) / 2,
    width: width - pad * 2,
    alignment: "CENTER",
    name: "banner-label",
  });

  // Large image placeholder with shadow and rounded corners
  const imgPad = scaleValue(36, width);
  const imgY = bannerHeight + scaleValue(24, width);
  const imgHeight = contentArea * 0.5;
  const imgPlaceholder = createImagePlaceholder(frame, {
    x: imgPad, y: imgY,
    width: width - imgPad * 2, height: imgHeight,
    radius: RADIUS_XL,
    borderColor: TEAL_500,
    borderWidth: 2,
    label: "Drop your meme or photo here",
    name: "meme-image",
  });
  imgPlaceholder.effects = [...heroShadow()];

  // Caption on glass card
  const cardPad = scaleValue(28, width);
  const captionFontSize = scaleFontSize(30, width);
  const cardY = imgY + imgHeight + scaleValue(20, width);
  const cardHeight = contentArea - cardY - scaleValue(16, width);

  const captionCard = figma.createFrame();
  captionCard.resize(width - cardPad * 2, cardHeight);
  captionCard.x = cardPad;
  captionCard.y = cardY;
  captionCard.cornerRadius = RADIUS_LG;
  applyGlassEffect(captionCard, { fillOpacity: 0.8, blurRadius: 12 });
  captionCard.name = "caption-card";
  frame.appendChild(captionCard);

  createTextNode(frame, {
    text: content.headline || content.caption || "When the instructor says 'just relax' but you're gripping the wheel like it owes you money",
    fontSize: captionFontSize,
    fontWeight: "Bold",
    color: SLATE_900,
    x: cardPad + scaleValue(20, width),
    y: cardY + scaleValue(20, width),
    width: width - cardPad * 2 - scaleValue(40, width),
    alignment: "CENTER",
    lineHeight: captionFontSize * 1.35,
    name: "caption",
  });

  // Rich gradient bar at bottom edge
  const gradBarHeight = scaleValue(5, width);
  const richGrad: BrandGradient = {
    stops: [
      { color: TEAL_600, position: 0 },
      { color: TEAL_400, position: 0.4 },
      { color: ORANGE_400, position: 0.7 },
      { color: ORANGE_PRIMARY, position: 1 },
    ],
    angleDeg: 90,
  };
  createRect(frame, {
    x: 0, y: contentArea - gradBarHeight, width, height: gradBarHeight,
    gradient: richGrad,
    name: "gradient-bar",
  });

  // Grain overlay
  addGrainOverlay(frame, width, height, { opacity: 0.02, density: 150 });

  addLogoBar(frame, width, height, { variant: "dark" });

  return frame;
}

// ── Quiz / Poll ─────────────────────────────────────────────────────────

export function buildQuizPoll(platform: PlatformSpec, content: TemplateContent): FrameNode {
  const { width, height } = platform;
  const frame = createFrame(width, height, undefined, `Quiz Poll — ${platform.name}`);

  const pad = scaleValue(50, width);
  const barHeight = Math.max(60, Math.round(height * 0.08));
  const contentArea = height - barHeight;

  // Rich multi-stop gradient background
  const richOrange: BrandGradient = {
    stops: [
      { color: { r: 0.93, g: 0.35, b: 0.05 }, position: 0 },
      { color: ORANGE_PRIMARY, position: 0.35 },
      { color: ORANGE_400, position: 0.7 },
      { color: { r: 1.0, g: 0.65, b: 0.3 }, position: 1 },
    ],
    angleDeg: 145,
  };
  frame.fills = [gradientPaint(richOrange)];

  // Ambient decorative blobs
  addAmbientBlobs(frame, width, contentArea, [
    WHITE,
    { r: 1, g: 0.85, b: 0.6 },
  ], { count: 4, opacity: 0.07, blur: 100 });

  // Scattered decorative circles
  addScatteredCircles(frame, width, contentArea, {
    count: 12,
    colors: [WHITE, { r: 1, g: 0.9, b: 0.7 }],
    minSize: 10, maxSize: 60,
    opacity: 0.07,
  });

  // Large radial glow behind header area
  addRadialGlow(frame, width / 2, contentArea * 0.12, width * 0.8, WHITE, 0.1);

  // "POP QUIZ" header with glow
  const headerFontSize = scaleFontSize(44, width);
  const headerY = contentArea * 0.07;
  const headerText = createTextNode(frame, {
    text: "POP QUIZ",
    fontSize: headerFontSize,
    fontWeight: "ExtraBold",
    color: WHITE,
    x: pad, y: headerY,
    width: width - pad * 2,
    alignment: "CENTER",
    letterSpacing: scaleValue(6, width),
    name: "quiz-header",
  });

  // Decorative line under header
  const lineW = scaleValue(120, width);
  const lineY = headerY + headerFontSize + scaleValue(10, width);
  const headerLine = createRect(frame, {
    x: (width - lineW) / 2, y: lineY,
    width: lineW, height: scaleValue(4, width),
    fill: WHITE, radius: 2, opacity: 0.5,
    name: "header-line",
  });

  // Question text
  const questionFontSize = scaleFontSize(28, width);
  const questionY = lineY + scaleValue(24, width);
  createTextNode(frame, {
    text: content.question || content.headline || "What's the speed limit in a residential area in Ireland?",
    fontSize: questionFontSize,
    fontWeight: "SemiBold",
    color: WHITE,
    x: pad, y: questionY,
    width: width - pad * 2,
    alignment: "CENTER",
    lineHeight: questionFontSize * 1.45,
    name: "question",
  });

  // Answer options with glass effect + shadows
  const answers = content.answers && content.answers.length > 0
    ? content.answers
    : ["30 km/h", "50 km/h", "60 km/h", "80 km/h"];

  const letters = ["A", "B", "C", "D"];
  const optionStartY = questionY + questionFontSize * 3.5 + scaleValue(28, width);
  const optionHeight = scaleValue(68, width);
  const optionSpacing = scaleValue(14, width);
  const optionWidth = width - pad * 2;
  const letterCircleSize = scaleValue(42, width);

  answers.slice(0, 4).forEach((answer, i) => {
    const optY = optionStartY + i * (optionHeight + optionSpacing);

    // Glass card background
    const optionBg = figma.createFrame();
    optionBg.resize(optionWidth, optionHeight);
    optionBg.x = pad;
    optionBg.y = optY;
    optionBg.cornerRadius = RADIUS_LG;
    applyGlassEffect(optionBg, {
      fillOpacity: 0.85,
      blurRadius: 16,
      borderOpacity: 0.35,
    });
    optionBg.effects = [
      ...cardShadow({ r: 0.8, g: 0.3, b: 0 }),
    ];
    optionBg.name = `option-card-${i}`;
    frame.appendChild(optionBg);

    // Teal letter circle with glow shadow
    const circleX = pad + scaleValue(16, width);
    const circleY = optY + (optionHeight - letterCircleSize) / 2;

    const letterBg = createEllipse(frame, {
      x: circleX, y: circleY,
      width: letterCircleSize, height: letterCircleSize,
      gradient: GRADIENT_TEAL,
      name: `letter-bg-${i}`,
    });
    letterBg.effects = [...glowShadow(TEAL_500, 0.25)];

    createTextNode(frame, {
      text: letters[i],
      fontSize: scaleFontSize(20, width),
      fontWeight: "Bold",
      color: WHITE,
      x: circleX,
      y: circleY + (letterCircleSize - scaleFontSize(20, width) * 1.2) / 2,
      width: letterCircleSize,
      alignment: "CENTER",
      name: `letter-${i}`,
    });

    // Answer text
    const answerFontSize = scaleFontSize(21, width);
    createTextNode(frame, {
      text: answer,
      fontSize: answerFontSize,
      fontWeight: "SemiBold",
      color: SLATE_900,
      x: circleX + letterCircleSize + scaleValue(16, width),
      y: optY + (optionHeight - answerFontSize * 1.2) / 2,
      width: optionWidth - letterCircleSize - scaleValue(64, width),
      name: `answer-${i}`,
    });
  });

  // Subtle grain overlay
  addGrainOverlay(frame, width, contentArea, { opacity: 0.025, density: 180 });

  addLogoBar(frame, width, height, { variant: "white" });

  return frame;
}
