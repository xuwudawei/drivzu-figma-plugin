// ═══════════════════════════════════════════════════════════════════════
// AI Prompts V2 — 51 template design briefs, text presets, canvas layouts
// Crafted for Gemini / Nano Banana Pro image generation
// ═══════════════════════════════════════════════════════════════════════

import { TemplateContent } from "./templates/registry";

// ── Brand Palette (overridable via brand kit) ────────────────────────
const TEAL = "#0d9488";
const ORANGE = "#F97316";
const DARK = "#0f172a";
const LIGHT = "#f0fdfa";

// ── Interfaces ───────────────────────────────────────────────────────

export interface TextPreset {
  readonly id: string;
  readonly headlineFont: string;
  readonly headlineColor: string;
  readonly headlineGlow: { readonly color: string; readonly blur: number } | null;
  readonly headlineShadow: { readonly color: string; readonly blur: number; readonly offsetY: number };
  readonly headlineGradient: readonly [string, string] | null;
  readonly headlineStroke: { readonly color: string; readonly width: number } | null;
  readonly subtitleFont: string;
  readonly subtitleColor: string;
  readonly labelFont: string;
  readonly labelColor: string;
  readonly labelBgColor: string | null;
}

export interface CanvasLayout {
  readonly headlineZone: {
    readonly x: number;
    readonly y: number;
    readonly maxWidth: number;
    readonly fontSize: number;
    readonly align: string;
  };
  readonly subtitleZone: {
    readonly x: number;
    readonly y: number;
    readonly maxWidth: number;
    readonly fontSize: number;
    readonly align: string;
  };
  readonly labelZone: {
    readonly x: number;
    readonly y: number;
    readonly fontSize: number;
  } | null;
  readonly logoBarHeight: number;
}

// ── AI Model Constants ───────────────────────────────────────────────

/**
 * Free-tier image model (no charges)
 * - gemini-2.5-flash-image = "Nano Banana" (FREE, 500 images/day)
 * - gemini-3-pro-image-preview = "Nano Banana Pro" (PAID, $0.134/image)
 */
export const AI_MODEL_FREE = "gemini-2.5-flash-image";
export const AI_MODEL_PRO = "gemini-3-pro-image-preview";

export function getAiModel(quality: "free" | "pro"): string {
  return quality === "pro" ? AI_MODEL_PRO : AI_MODEL_FREE;
}

// ── Aspect Ratios per Platform ───────────────────────────────────────

const ASPECT_RATIOS: Record<string, string> = {
  "instagram-post": "4:5",
  "instagram-square": "1:1",
  "instagram-story": "9:16",
  "twitter": "16:9",
  "linkedin": "16:9",
  "facebook": "4:5",
  "tiktok-cover": "9:16",
};

export function getAiAspectRatio(platformId: string): string {
  return ASPECT_RATIOS[platformId] || "4:5";
}

// ── Variation Suffixes ───────────────────────────────────────────────

const VARIATION_SUFFIXES: readonly string[] = [
  "",
  " Alternative composition. Shift focal point to lower-left. Cooler color temperature.",
  " Minimalist variation. 50% fewer elements. More negative space. Clean gradients.",
];

// ── Text Presets ─────────────────────────────────────────────────────

const PRESET_LUMINOUS_HERO: TextPreset = {
  id: "luminous-hero",
  headlineFont: "bold 64px",
  headlineColor: "#FFFFFF",
  headlineGlow: { color: TEAL, blur: 30 },
  headlineShadow: { color: "rgba(0,0,0,0.55)", blur: 18, offsetY: 6 },
  headlineGradient: ["#FFFFFF", "#e0f2f1"],
  headlineStroke: null,
  subtitleFont: "medium 28px",
  subtitleColor: "#e0f2f1",
  labelFont: "semibold 16px",
  labelColor: "#FFFFFF",
  labelBgColor: TEAL,
};

const PRESET_ELEGANT_MINIMAL: TextPreset = {
  id: "elegant-minimal",
  headlineFont: "semibold 52px",
  headlineColor: DARK,
  headlineGlow: null,
  headlineShadow: { color: "rgba(0,0,0,0.12)", blur: 2, offsetY: 1 },
  headlineGradient: null,
  headlineStroke: null,
  subtitleFont: "regular 24px",
  subtitleColor: "#475569",
  labelFont: "medium 14px",
  labelColor: TEAL,
  labelBgColor: null,
};

const PRESET_NEON_DATA: TextPreset = {
  id: "neon-data",
  headlineFont: "bold 72px",
  headlineColor: "#FFFFFF",
  headlineGlow: { color: TEAL, blur: 40 },
  headlineShadow: { color: TEAL, blur: 15, offsetY: 0 },
  headlineGradient: null,
  headlineStroke: null,
  subtitleFont: "medium 26px",
  subtitleColor: "#99f6e4",
  labelFont: "semibold 14px",
  labelColor: "#FFFFFF",
  labelBgColor: "rgba(13,148,136,0.6)",
};

const PRESET_POP_BOLD: TextPreset = {
  id: "pop-bold",
  headlineFont: "extrabold 60px",
  headlineColor: "#FFFFFF",
  headlineGlow: null,
  headlineShadow: { color: "rgba(0,0,0,0.7)", blur: 0, offsetY: 4 },
  headlineGradient: null,
  headlineStroke: { color: "#000000", width: 3 },
  subtitleFont: "bold 26px",
  subtitleColor: "#FFFFFF",
  labelFont: "bold 16px",
  labelColor: "#000000",
  labelBgColor: ORANGE,
};

const PRESET_URGENCY: TextPreset = {
  id: "urgency",
  headlineFont: "black 76px",
  headlineColor: ORANGE,
  headlineGlow: null,
  headlineShadow: { color: "rgba(0,0,0,0.65)", blur: 10, offsetY: 5 },
  headlineGradient: [ORANGE, "#FBBF24"],
  headlineStroke: null,
  subtitleFont: "bold 28px",
  subtitleColor: "#FFFFFF",
  labelFont: "bold 18px",
  labelColor: "#FFFFFF",
  labelBgColor: "#dc2626",
};

// Mapping from template ID to preset
const TEMPLATE_PRESET_MAP: Record<string, TextPreset> = {
  // Celebrations -> luminous-hero
  "pass-celebration": PRESET_LUMINOUS_HERO,
  "achievement-unlocked": PRESET_LUMINOUS_HERO,
  "milestone-reached": PRESET_LUMINOUS_HERO,
  "welcome-aboard": PRESET_LUMINOUS_HERO,
  "birthday-wish": PRESET_LUMINOUS_HERO,
  "anniversary": PRESET_LUMINOUS_HERO,
  "student-spotlight": PRESET_LUMINOUS_HERO,
  // Education -> neon-data
  "driving-tip": PRESET_NEON_DATA,
  "edt-lesson": PRESET_ELEGANT_MINIMAL,
  "did-you-know": PRESET_NEON_DATA,
  "safety-alert": PRESET_URGENCY,
  "road-rules": PRESET_NEON_DATA,
  "test-prep": PRESET_ELEGANT_MINIMAL,
  "faq-answer": PRESET_ELEGANT_MINIMAL,
  "pro-tip": PRESET_NEON_DATA,
  // Social Proof -> elegant-minimal
  "testimonial-card": PRESET_ELEGANT_MINIMAL,
  "stats-spotlight": PRESET_NEON_DATA,
  "before-after": PRESET_POP_BOLD,
  "review-highlight": PRESET_ELEGANT_MINIMAL,
  "case-study": PRESET_ELEGANT_MINIMAL,
  "social-counter": PRESET_NEON_DATA,
  // Entertainment -> pop-bold
  "meme-card": PRESET_POP_BOLD,
  "quiz-poll": PRESET_POP_BOLD,
  "this-or-that": PRESET_POP_BOLD,
  "caption-contest": PRESET_POP_BOLD,
  "relatable-moment": PRESET_POP_BOLD,
  "fun-fact": PRESET_NEON_DATA,
  // Behind Scenes -> elegant-minimal
  "instructor-feature": PRESET_ELEGANT_MINIMAL,
  "platform-update": PRESET_NEON_DATA,
  "day-in-life": PRESET_ELEGANT_MINIMAL,
  "office-tour": PRESET_ELEGANT_MINIMAL,
  "meet-founder": PRESET_ELEGANT_MINIMAL,
  // Promotion -> urgency
  "bold-cta": PRESET_LUMINOUS_HERO,
  "special-offer": PRESET_URGENCY,
  "flash-sale": PRESET_URGENCY,
  "referral-program": PRESET_LUMINOUS_HERO,
  "bundle-deal": PRESET_URGENCY,
  "seasonal-promo": PRESET_URGENCY,
  "limited-time": PRESET_URGENCY,
  // Engagement -> pop-bold
  "question-of-day": PRESET_POP_BOLD,
  "fill-in-blank": PRESET_POP_BOLD,
  "hot-take": PRESET_POP_BOLD,
  "debate": PRESET_NEON_DATA,
  "story-time": PRESET_ELEGANT_MINIMAL,
  "throwback": PRESET_LUMINOUS_HERO,
  // Announcements -> neon-data
  "new-feature": PRESET_NEON_DATA,
  "coming-soon": PRESET_LUMINOUS_HERO,
  "launch-day": PRESET_LUMINOUS_HERO,
  "event-invite": PRESET_NEON_DATA,
  "press-release": PRESET_ELEGANT_MINIMAL,
  "partnership": PRESET_ELEGANT_MINIMAL,
};

// ── Canvas Layouts ───────────────────────────────────────────────────
// All values are 0-1 percentages of canvas dimensions

const LAYOUT_CENTER_HERO: CanvasLayout = {
  headlineZone: { x: 0.5, y: 0.35, maxWidth: 0.85, fontSize: 0.07, align: "center" },
  subtitleZone: { x: 0.5, y: 0.55, maxWidth: 0.75, fontSize: 0.035, align: "center" },
  labelZone: { x: 0.5, y: 0.2, fontSize: 0.02 },
  logoBarHeight: 0.12,
};

const LAYOUT_TOP_HEAVY: CanvasLayout = {
  headlineZone: { x: 0.5, y: 0.22, maxWidth: 0.85, fontSize: 0.065, align: "center" },
  subtitleZone: { x: 0.5, y: 0.42, maxWidth: 0.8, fontSize: 0.032, align: "center" },
  labelZone: { x: 0.5, y: 0.1, fontSize: 0.018 },
  logoBarHeight: 0.12,
};

const LAYOUT_BOTTOM_CARD: CanvasLayout = {
  headlineZone: { x: 0.5, y: 0.6, maxWidth: 0.85, fontSize: 0.06, align: "center" },
  subtitleZone: { x: 0.5, y: 0.75, maxWidth: 0.8, fontSize: 0.03, align: "center" },
  labelZone: { x: 0.5, y: 0.5, fontSize: 0.018 },
  logoBarHeight: 0.1,
};

const LAYOUT_LEFT_ALIGNED: CanvasLayout = {
  headlineZone: { x: 0.1, y: 0.3, maxWidth: 0.75, fontSize: 0.065, align: "left" },
  subtitleZone: { x: 0.1, y: 0.5, maxWidth: 0.7, fontSize: 0.032, align: "left" },
  labelZone: { x: 0.1, y: 0.18, fontSize: 0.018 },
  logoBarHeight: 0.12,
};

const LAYOUT_SPLIT_HALF: CanvasLayout = {
  headlineZone: { x: 0.5, y: 0.28, maxWidth: 0.9, fontSize: 0.075, align: "center" },
  subtitleZone: { x: 0.5, y: 0.68, maxWidth: 0.8, fontSize: 0.035, align: "center" },
  labelZone: null,
  logoBarHeight: 0.1,
};

const LAYOUT_STAT_FOCUS: CanvasLayout = {
  headlineZone: { x: 0.5, y: 0.4, maxWidth: 0.9, fontSize: 0.12, align: "center" },
  subtitleZone: { x: 0.5, y: 0.6, maxWidth: 0.8, fontSize: 0.035, align: "center" },
  labelZone: { x: 0.5, y: 0.22, fontSize: 0.02 },
  logoBarHeight: 0.1,
};

const TEMPLATE_LAYOUT_MAP: Record<string, CanvasLayout> = {
  // Celebrations
  "pass-celebration": LAYOUT_CENTER_HERO,
  "achievement-unlocked": LAYOUT_CENTER_HERO,
  "milestone-reached": LAYOUT_STAT_FOCUS,
  "welcome-aboard": LAYOUT_CENTER_HERO,
  "birthday-wish": LAYOUT_CENTER_HERO,
  "anniversary": LAYOUT_CENTER_HERO,
  "student-spotlight": LAYOUT_TOP_HEAVY,
  // Education
  "driving-tip": LAYOUT_TOP_HEAVY,
  "edt-lesson": LAYOUT_LEFT_ALIGNED,
  "did-you-know": LAYOUT_CENTER_HERO,
  "safety-alert": LAYOUT_CENTER_HERO,
  "road-rules": LAYOUT_LEFT_ALIGNED,
  "test-prep": LAYOUT_TOP_HEAVY,
  "faq-answer": LAYOUT_LEFT_ALIGNED,
  "pro-tip": LAYOUT_TOP_HEAVY,
  // Social Proof
  "testimonial-card": LAYOUT_BOTTOM_CARD,
  "stats-spotlight": LAYOUT_STAT_FOCUS,
  "before-after": LAYOUT_SPLIT_HALF,
  "review-highlight": LAYOUT_BOTTOM_CARD,
  "case-study": LAYOUT_LEFT_ALIGNED,
  "social-counter": LAYOUT_STAT_FOCUS,
  // Entertainment
  "meme-card": LAYOUT_SPLIT_HALF,
  "quiz-poll": LAYOUT_TOP_HEAVY,
  "this-or-that": LAYOUT_SPLIT_HALF,
  "caption-contest": LAYOUT_BOTTOM_CARD,
  "relatable-moment": LAYOUT_CENTER_HERO,
  "fun-fact": LAYOUT_CENTER_HERO,
  // Behind Scenes
  "instructor-feature": LAYOUT_BOTTOM_CARD,
  "platform-update": LAYOUT_TOP_HEAVY,
  "day-in-life": LAYOUT_LEFT_ALIGNED,
  "office-tour": LAYOUT_CENTER_HERO,
  "meet-founder": LAYOUT_BOTTOM_CARD,
  // Promotion
  "bold-cta": LAYOUT_CENTER_HERO,
  "special-offer": LAYOUT_CENTER_HERO,
  "flash-sale": LAYOUT_STAT_FOCUS,
  "referral-program": LAYOUT_TOP_HEAVY,
  "bundle-deal": LAYOUT_CENTER_HERO,
  "seasonal-promo": LAYOUT_CENTER_HERO,
  "limited-time": LAYOUT_STAT_FOCUS,
  // Engagement
  "question-of-day": LAYOUT_CENTER_HERO,
  "fill-in-blank": LAYOUT_TOP_HEAVY,
  "hot-take": LAYOUT_CENTER_HERO,
  "debate": LAYOUT_SPLIT_HALF,
  "story-time": LAYOUT_LEFT_ALIGNED,
  "throwback": LAYOUT_BOTTOM_CARD,
  // Announcements
  "new-feature": LAYOUT_TOP_HEAVY,
  "coming-soon": LAYOUT_CENTER_HERO,
  "launch-day": LAYOUT_CENTER_HERO,
  "event-invite": LAYOUT_LEFT_ALIGNED,
  "press-release": LAYOUT_LEFT_ALIGNED,
  "partnership": LAYOUT_CENTER_HERO,
};

// ── Design Prompts (51 templates) ────────────────────────────────────
// Each prompt is a rich creative-director brief with Scene, Spatial
// Zones, Style, and Constraints sections.

const DESIGN_PROMPTS: Record<string, string> = {

  // ═══════════════════════════════════════════════════════════════════
  // CELEBRATIONS (7)
  // ═══════════════════════════════════════════════════════════════════

  "pass-celebration": [
    "Scene: A triumphant burst of celebration energy. Imagine an explosion of shimmering confetti",
    "and metallic streamers frozen mid-air against a rich teal-to-navy vertical gradient. Golden",
    "particles and orange sparkle dust swirl upward in graceful arcs. Bokeh circles in warm amber",
    "and cool teal float across the depth of field. Volumetric light rays pour down from the upper",
    "corners like stage spotlights at a championship moment. The overall feeling is pure joy —",
    "like the instant someone hears they passed their driving test.",
    "",
    "Spatial Zones: Upper 25% open for headline text with only scattered confetti. Center 35%",
    "is the hero area with the densest particle effects and light convergence. Lower 25% features",
    "a soft gradient darkening for subtitle readability. Bottom 15% is a clean teal bar for logo.",
    "",
    "Style: Behance-worthy celebration aesthetic. Mesh gradients blending " + TEAL + " into deep",
    "navy. Metallic gold foil textures on confetti. Subtle film grain overlay. Glassmorphism blur",
    "on background layers. Premium party atmosphere with editorial photography depth of field.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "achievement-unlocked": [
    "Scene: A grand ceremonial unlock moment. A luminous geometric shield or badge shape",
    "materializes at center, radiating concentric rings of teal light that pulse outward like",
    "a sonic boom. Crystalline shards and prismatic light fragments orbit the central glow.",
    "The background transitions from deep " + DARK + " at edges to warm " + TEAL + " radiance",
    "at center. Tiny star-like particles scatter across the composition like a digital galaxy.",
    "The mood is that victorious instant when a video game achievement banner appears.",
    "",
    "Spatial Zones: Upper 25% open sky area with faint star particles for headline. Center 35%",
    "dominated by the glowing badge shape and light rings. Lower 25% gradual fade to dark for",
    "subtitle overlay. Bottom 15% solid dark strip for branding.",
    "",
    "Style: Gaming-inspired premium aesthetic. Volumetric god-rays from the central shape.",
    "Chromatic aberration on light edges. Particle systems with varying sizes and opacities.",
    "Iridescent color shifts on crystal fragments. 4K detail on every light scatter.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "milestone-reached": [
    "Scene: An ascending pathway of glowing stepping stones leading toward a brilliant light",
    "source at the horizon. Each stone pulses with warm " + ORANGE + " energy where it was",
    "stepped on, transitioning to cool " + TEAL + " for stones yet to come. The landscape is",
    "abstract and ethereal — floating platforms in a dreamlike void of deep navy gradients.",
    "Firefly-like particles drift upward from the illuminated stones. A soft aurora of teal",
    "and gold weaves across the upper atmosphere, suggesting infinite possibility ahead.",
    "",
    "Spatial Zones: Upper 25% aurora sky, mostly clear for large stat numbers. Center 35%",
    "pathway convergence with the brightest illumination. Lower 25% darker ground plane for",
    "subtitle text. Bottom 15% deep " + DARK + " gradient for logo bar.",
    "",
    "Style: Ethereal fantasy meets modern data visualization. Smooth mesh gradients on the",
    "void background. Additive blending on light effects. Subtle noise texture on dark areas.",
    "Depth of field blur on distant stepping stones. Cinematic color grading.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "welcome-aboard": [
    "Scene: A warm, inviting doorway or portal made of soft teal light, opening into a world",
    "of warmth and possibility. The portal frame is constructed from elegant curved lines that",
    "glow with " + TEAL + " luminescence. Beyond it, a warm gradient of golden orange and soft",
    "amber creates an inviting depth. Small welcoming details float in the air — tiny sparkles,",
    "gentle lens flares, and delicate particle ribbons that suggest a red-carpet arrival. The",
    "surrounding space is a calm " + DARK + " that makes the warm portal glow feel like home.",
    "",
    "Spatial Zones: Upper 25% dark with subtle sparkles for welcome headline. Center 35%",
    "portal and warm glow as focal hero. Lower 25% transitional gradient for name/subtitle.",
    "Bottom 15% grounded dark area for logo placement.",
    "",
    "Style: Hospitality-inspired warmth with tech elegance. Warm backlighting through the",
    "portal. Frosted glass edges on the portal frame. Soft radial vignette. Velvet-smooth",
    "gradients. Golden hour color temperature on the warm side.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "birthday-wish": [
    "Scene: A festive explosion of colorful celebration. Imagine a shower of rounded confetti",
    "shapes in teal, orange, gold, and white cascading down from above. Soft balloon-like",
    "spheres in translucent " + TEAL + " and warm " + ORANGE + " float upward in the background.",
    "Ribbon curls catch the light with metallic sheens. The backdrop is a joyful gradient from",
    "light teal at top to warm peach at bottom. Tiny star bursts and glitter particles add",
    "a sense of sparkle and delight. The composition radiates pure birthday happiness.",
    "",
    "Spatial Zones: Upper 25% where confetti enters frame, clear enough for birthday message.",
    "Center 35% densest celebration with floating spheres and ribbons. Lower 25% softer warm",
    "gradient for personal message text. Bottom 15% clean area for brand mark.",
    "",
    "Style: Playful premium party design. Soft depth of field on background balloons.",
    "Metallic material rendering on ribbons. Pastel-meets-vibrant color harmony. Gentle",
    "paper grain texture. Rounded, friendly geometric shapes throughout.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "anniversary": [
    "Scene: An elegant and timeless composition celebrating endurance and partnership. Twin",
    "intertwined ribbons of light — one " + TEAL + " and one " + ORANGE + " — spiral upward",
    "through the frame in a graceful double helix. Where they cross, small bursts of golden",
    "light emanate. The background is a sophisticated deep navy with a subtle fabric texture,",
    "like premium gift wrapping. Scattered across the scene are tiny diamond-shaped sparkles",
    "that catch light at different angles. A soft radial glow at center adds warmth.",
    "",
    "Spatial Zones: Upper 25% where ribbon trails thin out, open for anniversary headline.",
    "Center 35% tightest ribbon interweaving with peak luminosity. Lower 25% ribbon trails",
    "widen with softer glow for subtitle. Bottom 15% dark elegant strip for logo.",
    "",
    "Style: Luxury editorial aesthetic. Silk-like light rendering on ribbons. Subtle metallic",
    "gold accents. Deep shadows with rich blacks. Cinematic lens flare at crossing points.",
    "Premium print-worthy color depth and contrast.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "student-spotlight": [
    "Scene: A dramatic spotlight effect casting a warm cone of golden-teal light down from",
    "above onto an abstract stage. The spotlight creates a perfect circle of illumination at",
    "center, with " + TEAL + " rim lighting creating a halo effect. The surrounding space is",
    "a rich, velvety " + DARK + " with subtle curtain-like fabric folds suggested by soft",
    "vertical gradients. Floating bokeh orbs in teal and amber drift through the light beam.",
    "Dust particles catch the light, adding cinematic atmosphere. The mood is that magical",
    "moment when a performer steps into the spotlight.",
    "",
    "Spatial Zones: Upper 25% above the spotlight source, open for student name. Center 35%",
    "brightest spotlight area for portrait placeholder. Lower 25% gradient for achievement",
    "description. Bottom 15% curtain fade for branding.",
    "",
    "Style: Theater-stage cinematography. Volumetric light cone with visible light rays.",
    "Shallow depth of field on bokeh. Rich velvet blacks. Stage-lighting color temperature.",
    "Subtle dust particle system for atmosphere.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  // ═══════════════════════════════════════════════════════════════════
  // EDUCATION (8)
  // ═══════════════════════════════════════════════════════════════════

  "driving-tip": [
    "Scene: A stylized aerial view of a winding road cutting through an abstract landscape.",
    "The road surface shimmers with " + TEAL + "-tinted asphalt and glowing lane markings that",
    "pulse with soft light. Motion blur streaks along the road edges suggest controlled speed.",
    "The surrounding terrain is a gradient of deep teal to dark navy, with topographic contour",
    "lines rendered as faint glowing threads. Small directional arrow particles flow along the",
    "road surface. A warm " + ORANGE + " glow emanates from the distant vanishing point.",
    "",
    "Spatial Zones: Upper 25% clear aerial sky zone for tip headline. Center 35% main road",
    "curve with strongest visual detail. Lower 25% road receding with gradient for subtitle.",
    "Bottom 15% darkened edge for logo bar.",
    "",
    "Style: Modern cartographic illustration meets motion design. Clean vector-inspired road",
    "geometry. Neon glow on lane markings. Topographic line art in background. Subtle grain",
    "texture. Flat-meets-3D hybrid rendering style.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "edt-lesson": [
    "Scene: A serene and organized learning environment rendered as an abstract composition.",
    "Soft geometric shapes — rounded rectangles, circles, and gentle grid patterns — float in",
    "an orderly arrangement against a clean gradient from white to " + LIGHT + ". Each shape",
    "casts a delicate shadow, creating layered depth. Thin " + TEAL + " accent lines connect",
    "shapes like a mind map. A subtle progress bar motif runs along one edge, suggesting",
    "structured advancement. The light is warm and even, like a well-lit classroom.",
    "",
    "Spatial Zones: Upper 25% cleanest area with minimal shapes for lesson title. Center 35%",
    "densest arrangement of educational shapes. Lower 25% opening up with lighter background",
    "for instructional subtitle. Bottom 15% clean white/teal strip for brand.",
    "",
    "Style: Swiss design system aesthetic. Precise geometric placement. Soft material shadows.",
    "Limited color palette with " + TEAL + " as sole accent. Generous whitespace. Grid-based",
    "composition. Clean, authoritative, and approachable simultaneously.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "did-you-know": [
    "Scene: A mysterious deep-space atmosphere with floating question-mark shaped nebulae.",
    "The background is a rich " + DARK + " with aurora-like bands of " + TEAL + " and " + ORANGE,
    "weaving through the darkness. Luminous particle clouds form abstract question-mark",
    "silhouettes that glow from within. Star-field sparkles of varying brightness scatter",
    "across the composition. A central area pulses with a soft teal glow, as if holding a",
    "secret about to be revealed. The mood is wonder and intellectual curiosity.",
    "",
    "Spatial Zones: Upper 25% star field fading to dark, open for intriguing headline.",
    "Center 35% brightest nebula formations and question-mark shapes. Lower 25% aurora",
    "bands providing contrast for answer text. Bottom 15% deep space for logo.",
    "",
    "Style: Space-documentary cinematography meets editorial design. Nebula gas cloud",
    "rendering with volumetric light. Subtle chromatic shifts. Star-field particle layering.",
    "Deep color saturation. Astronomical photography inspiration.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "safety-alert": [
    "Scene: An urgent, attention-commanding composition built around a bold triangular warning",
    "motif. The triangle pulses with " + ORANGE + " energy, surrounded by radiating concentric",
    "rings that create a radar-pulse effect. The background shifts from " + DARK + " at the",
    "edges to warm amber near the center. Sharp geometric alert shapes — diamonds, chevrons,",
    "and angular slashes — frame the composition with kinetic energy. Subtle red-to-orange",
    "gradient bands sweep diagonally across the background, creating visual urgency.",
    "",
    "Spatial Zones: Upper 25% dark with angular accents for safety message headline.",
    "Center 35% warning triangle and radiating rings as focal point. Lower 25% gradient",
    "transition zone for detail text. Bottom 15% darkened bar for logo.",
    "",
    "Style: Emergency broadcast design language. High contrast with sharp edges. Pulsing",
    "glow effects. Motion-suggesting diagonal compositions. Bold color saturation on alert",
    "tones. Graphic poster energy with premium rendering quality.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "road-rules": [
    "Scene: A precise, technical illustration of road infrastructure rendered beautifully.",
    "Clean road markings, lane dividers, and intersection geometry are shown from a stylized",
    "three-quarter aerial perspective. The roads are " + DARK + " with glowing " + TEAL,
    "markings that illuminate like embedded LEDs. A grid overlay suggests precision and order.",
    "Traffic flow is represented by flowing particle streams in " + ORANGE + ". The overall",
    "composition resembles a beautiful urban planning diagram brought to life with light.",
    "",
    "Spatial Zones: Upper 25% where roads converge to vanishing point, open for rule title.",
    "Center 35% detailed intersection area with glowing markings. Lower 25% road surface",
    "with flowing particles for explanation text. Bottom 15% dark edge for branding.",
    "",
    "Style: Technical illustration meets neon aesthetic. Blueprint precision with glowing",
    "accents. Isometric-inspired perspective. Clean vector geometry. Subtle grid texture.",
    "Data visualization color palette with teal primary and orange secondary.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "test-prep": [
    "Scene: An energetic study-session atmosphere with abstract representations of knowledge",
    "building. Stacked geometric blocks form an ascending staircase pattern, each block subtly",
    "glowing with " + TEAL + " edges. A checklist motif runs vertically with glowing checkmark",
    "shapes. The background is a warm cream-to-" + LIGHT + " gradient suggesting a bright study",
    "environment. Floating circular progress indicators at various completion levels add visual",
    "rhythm. Small lightning bolt shapes suggest brain power and quick recall.",
    "",
    "Spatial Zones: Upper 25% clear bright area for prep topic headline. Center 35%",
    "ascending blocks and progress indicators. Lower 25% softer gradient for instructions.",
    "Bottom 15% clean base for brand placement.",
    "",
    "Style: Productivity app aesthetic meets educational illustration. Clean flat shapes with",
    "subtle 3D depth. Friendly rounded corners on all elements. Warm neutral background with",
    "teal accent pops. Organized, motivating, and clear visual hierarchy.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "faq-answer": [
    "Scene: An elegant conversation-bubble composition. Large rounded speech bubbles in",
    "translucent " + TEAL + " and white float in a clean, airy space. The largest bubble sits",
    "at center with a subtle glassmorphism frosted-glass effect. Smaller satellite bubbles",
    "orbit around it at various distances. Thin connecting lines link related bubbles. The",
    "background is a serene gradient from " + LIGHT + " at top to soft grey at bottom. Gentle",
    "shadows anchor each bubble, and a warm directional light from upper-left creates depth.",
    "",
    "Spatial Zones: Upper 25% with smaller floating bubbles for question headline.",
    "Center 35% large central bubble area. Lower 25% response space with lighter background",
    "for answer text. Bottom 15% clean area for brand.",
    "",
    "Style: Modern UI/UX design aesthetic. Frosted glass material on bubbles. Soft drop",
    "shadows with blue tint. Clean sans-serif geometry. Generous whitespace. Conversational",
    "and approachable while maintaining professional polish.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "pro-tip": [
    "Scene: A sleek, premium composition centered around a glowing lightbulb icon that radiates",
    TEAL + " energy. The bulb shape is abstract and geometric — formed from intersecting light",
    "beams rather than a realistic rendering. Radiant lines extend outward like a starburst.",
    "The background is a sophisticated " + DARK + " with subtle circular bokeh in teal and gold.",
    "Small diamond-shaped sparkle accents suggest expertise and insider knowledge. A subtle",
    "spotlight effect illuminates the center, drawing the eye to the knowledge source.",
    "",
    "Spatial Zones: Upper 25% dark with scattered sparkles for tip label and headline.",
    "Center 35% lightbulb starburst as the hero element. Lower 25% gradient to darker for",
    "tip detail text. Bottom 15% solid dark for logo placement.",
    "",
    "Style: Premium editorial with tech-startup energy. Geometric light construction.",
    "Starburst with varying ray lengths and opacities. Rich dark palette with luminous",
    "accents. Subtle noise texture on darks. Sharp, confident, expert-level polish.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  // ═══════════════════════════════════════════════════════════════════
  // SOCIAL PROOF (6)
  // ═══════════════════════════════════════════════════════════════════

  "testimonial-card": [
    "Scene: An elegant, minimal background evoking trust and authenticity. Soft flowing",
    "fabric-like waves in white and " + LIGHT + " undulate gently across the frame, creating",
    "organic depth. A large translucent quotation-mark shape in pale teal floats subtly in the",
    "background, barely visible but structurally grounding. Warm natural light pours in from",
    "the upper-right, casting long soft shadows. The texture is like high-quality linen paper",
    "with visible fiber, suggesting a handwritten note of genuine praise.",
    "",
    "Spatial Zones: Upper 25% lightest area with fabric folds for attribution. Center 35%",
    "quote mark shape and cleanest reading area. Lower 25% deeper fabric shadows for the",
    "testimonial quote. Bottom 15% paper-textured strip for logo.",
    "",
    "Style: Editorial magazine spread aesthetic. Organic fabric rendering with subtle wrinkle",
    "detail. Warm side lighting. Linen paper grain texture. Muted, sophisticated color palette",
    "with teal as a whisper accent. Trustworthy, human, and refined.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "stats-spotlight": [
    "Scene: A dramatic data-visualization theater. Glowing " + TEAL + " neon accent lines",
    "trace abstract chart shapes — bar graphs, rising curves, and circular gauges — against a",
    "deep " + DARK + " backdrop. The lines pulse with energy where data points would be. A",
    "large circular gauge at center glows brightest, with its arc rendered as a thick luminous",
    "stroke. Floating particle numbers drift upward like data being processed. Holographic",
    "grid lines recede into perspective depth, creating a command-center atmosphere.",
    "",
    "Spatial Zones: Upper 25% dark void with faint grid for context label. Center 35%",
    "large stat number space with gauge as background frame. Lower 25% chart elements and",
    "particles for description. Bottom 15% deep dark for logo bar.",
    "",
    "Style: Bloomberg terminal meets sci-fi HUD. Neon-line data visualization with glow.",
    "Additive blending on overlapping light elements. Holographic color shifts at edges.",
    "Monospaced grid alignment. Dark mode premium with electric " + TEAL + " accents.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "before-after": [
    "Scene: A split-screen composition divided by a bold diagonal line of light. The left half",
    "is rendered in muted, desaturated tones with a cooler blue-grey palette and subtle grain —",
    "representing the before state. The right half bursts with warm, saturated " + TEAL + " and",
    ORANGE + " vibrancy with clean gradients — representing the after state. The dividing line",
    "is a sharp beam of white light with subtle prismatic edge effects. Abstract shapes on each",
    "side mirror each other but differ in energy and polish.",
    "",
    "Spatial Zones: Upper 25% spans both halves for comparison headline. Center 35%",
    "most dramatic contrast zone at the diagonal split. Lower 25% where both sides have",
    "readable gradient areas for labels. Bottom 15% unified dark bar for logo.",
    "",
    "Style: Transformation narrative design. Sharp contrast between muted and vibrant halves.",
    "The before side has film noir grain and desaturation. The after side has high-saturation",
    "mesh gradients and bloom effects. Diagonal composition creates dynamic energy.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "review-highlight": [
    "Scene: A warm, premium review-card atmosphere. Five abstract star shapes are arranged in",
    "a gentle arc, each rendered with a golden metallic sheen and subtle inner glow. They float",
    "above a soft backdrop of cream-to-" + LIGHT + " gradient with organic watercolor-like",
    "washes of pale teal. Delicate golden sparkle particles drift downward from the stars. A",
    "large frosted-glass card shape sits at center-bottom, providing a clean reading surface.",
    "The overall mood is five-star luxury hospitality.",
    "",
    "Spatial Zones: Upper 25% golden star arc area for reviewer name. Center 35%",
    "transition between stars and card for rating display. Lower 25% frosted card surface",
    "for review excerpt. Bottom 15% clean warm strip for brand.",
    "",
    "Style: Luxury hotel review aesthetic. Metallic gold material rendering on stars.",
    "Watercolor wash texture beneath. Frosted glass material on the card shape. Warm,",
    "aspirational lighting. Soft-focus background with sharp foreground detail.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "case-study": [
    "Scene: A structured, professional composition suggesting depth of analysis. Abstract",
    "document layers are stacked at a slight angle, with the frontmost layer featuring a",
    "clean " + LIGHT + " surface and thin " + TEAL + " header accent. Behind it, progressively",
    "more translucent layers recede with subtle shadow separation. A thin vertical timeline",
    "motif runs along the left edge with glowing node points. The background is a warm neutral",
    "grey with subtle linen texture. Professional, organized, and thorough.",
    "",
    "Spatial Zones: Upper 25% above the document stack for case study title. Center 35%",
    "document stack as visual metaphor. Lower 25% document content area for key finding.",
    "Bottom 15% neutral base for brand placement.",
    "",
    "Style: Corporate annual report design. Layered paper with realistic shadow and thickness.",
    "Timeline node glows in " + TEAL + ". Linen background texture. Conservative, trustworthy",
    "color palette. Information architecture made visual and beautiful.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "social-counter": [
    "Scene: A vibrant social-metric celebration. A large abstract counter display at center",
    "glows with " + TEAL + " neon energy, surrounded by floating social-interaction shapes —",
    "hearts, thumbs, share arrows — rendered as translucent glowing icons. The counter frame",
    "is a rounded rectangle with thick luminous borders. Behind it, a dark " + DARK + " void",
    "is filled with ascending particle streams representing growing numbers. Small confetti",
    "bursts at the top suggest a milestone being reached in real time.",
    "",
    "Spatial Zones: Upper 25% confetti zone, clear for metric label. Center 35% counter",
    "display frame for the big number. Lower 25% floating social icons for context.",
    "Bottom 15% deep dark for branding.",
    "",
    "Style: Social media dashboard meets gaming HUD. Neon-bordered UI elements. Additive",
    "glow blending. Upward particle motion. Translucent icon rendering. Electric and",
    "celebratory energy against a premium dark canvas.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  // ═══════════════════════════════════════════════════════════════════
  // ENTERTAINMENT (6)
  // ═══════════════════════════════════════════════════════════════════

  "meme-card": [
    "Scene: A fun, high-energy abstract gradient that screams social media virality. Bold,",
    "chunky geometric blobs in translucent " + TEAL + " and warm " + ORANGE + " overlap and",
    "intersect playfully. Rounded bubble shapes float upward like thoughts forming. The",
    "background pulses from a saturated teal at top-left to a warm orange at bottom-right.",
    "Playful squiggle lines and dots add hand-drawn energy. The whole composition feels like",
    "it is about to burst with humor — like the visual equivalent of barely contained laughter.",
    "",
    "Spatial Zones: Upper 25% blob-heavy zone for meme caption top. Center 35% open area",
    "between blobs for meme image. Lower 25% second blob cluster for bottom text.",
    "Bottom 15% simplified gradient for brand watermark.",
    "",
    "Style: Gen-Z social media aesthetic. Organic blob shapes with smooth edges. Saturated",
    "candy-color gradients. Hand-drawn squiggle accents. Rounded, bouncy geometry. Maximum",
    "personality and minimum corporate energy. Instagram Reels cover art energy.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "quiz-poll": [
    "Scene: A game-show stage atmosphere with radial light burst emanating from center.",
    "Rich " + ORANGE + " to deep amber gradient forms the base, with spotlights creating bright",
    "circular pools of light. Abstract answer-option shapes — four rounded rectangles arranged",
    "in a grid — glow with different intensities of " + TEAL + ". Sparkle particles and lens",
    "flares orbit the scene. A dramatic radial zoom effect from center outward creates kinetic",
    "energy. The mood is exciting, competitive, and impossible not to engage with.",
    "",
    "Spatial Zones: Upper 25% spotlight convergence for question text. Center 35% four-panel",
    "answer grid area with individual option glows. Lower 25% stage floor gradient for CTA.",
    "Bottom 15% dark stage edge for branding.",
    "",
    "Style: TV game show production design. Radial light burst with volumetric rays.",
    "Multiple colored spotlights. Reflective stage floor with streaks. High-energy motion.",
    "Warm orange dominance with cool teal answer accents.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "this-or-that": [
    "Scene: A dramatic versus-battle composition split vertically down the center. The left",
    "half is dominated by " + TEAL + " energy — swirling gradients, ascending particles, and",
    "angular geometric shards. The right half is ruled by " + ORANGE + " energy with matching",
    "intensity but contrasting shapes — curved, flowing forms. Where the two halves meet, a",
    "brilliant white lightning bolt or energy clash creates a searing vertical line of pure",
    "light. Sparks and particles fly outward from the collision point.",
    "",
    "Spatial Zones: Upper 25% above the clash for the versus question. Center 35%",
    "collision zone with peak energy. Lower 25% each half distinct for option labels.",
    "Bottom 15% unified dark bar for brand.",
    "",
    "Style: Esports tournament graphic energy. Versus-screen composition. Clash effects with",
    "particle explosion. Complementary color battle. Angular shards versus flowing curves.",
    "Maximum visual drama and competitive tension.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "caption-contest": [
    "Scene: An empty picture frame rendered in ornate gold with " + TEAL + " accent details,",
    "hanging on an abstract gallery wall. The wall behind is a sophisticated dark " + DARK,
    "with subtle damask wallpaper pattern. Dramatic gallery spotlights illuminate the empty",
    "frame from above. Small easel shapes and paintbrush silhouettes float decoratively in",
    "the margins. The empty frame center is a clean gradient from light grey to white,",
    "representing a blank canvas waiting to be captioned. Museum-quality presentation.",
    "",
    "Spatial Zones: Upper 25% above the frame for contest prompt. Center 35% empty frame",
    "as the hero element with the blank center. Lower 25% below frame for caption entry.",
    "Bottom 15% gallery floor gradient for brand.",
    "",
    "Style: Art gallery curation aesthetic. Ornate frame with gold leaf texture and teal",
    "filigree. Dramatic directional lighting from above. Dark, prestigious wall texture.",
    "Museum-quality presentation with playful contest energy.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "relatable-moment": [
    "Scene: A warm, cozy everyday-life atmosphere rendered in abstract form. Soft rounded",
    "shapes in warm tones — peach, cream, gentle " + TEAL + " — overlap like a comfortable",
    "arrangement of cushions or clouds. A central area is bathed in golden hour light, warm",
    "and familiar. Small everyday-object silhouettes — a coffee mug shape, a phone shape, a",
    "steering wheel — float as subtle ghostly outlines in the background. The whole image",
    "feels like a visual sigh of recognition — that feeling when someone gets you perfectly.",
    "",
    "Spatial Zones: Upper 25% warmest light area for relatable caption. Center 35% cozy",
    "shape cluster as visual comfort zone. Lower 25% softer fade for reaction prompt.",
    "Bottom 15% warm gradient base for brand.",
    "",
    "Style: Lifestyle brand editorial warmth. Soft organic shapes with plush material feel.",
    "Golden hour color grading. Gentle bokeh on background objects. Warm, inviting palette.",
    "Instagram lifestyle influencer aesthetic with premium rendering.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "fun-fact": [
    "Scene: A whimsical knowledge-explosion composition. A central starburst of mixed colors",
    "— " + TEAL + ", " + ORANGE + ", gold, and white — radiates outward like a mind being",
    "blown. Abstract brain-shaped nebulae and neural-pathway light threads weave through the",
    "explosion. Small scientific-looking shapes — atoms, spirals, lightning bolts — orbit the",
    "burst as visual footnotes. The background transitions from bright energy at center to",
    "deep " + DARK + " at corners. The mood is delightful surprise and intellectual joy.",
    "",
    "Spatial Zones: Upper 25% starburst rays thinning for fact headline. Center 35%",
    "explosion origin with peak visual density. Lower 25% settling particles for supporting",
    "detail. Bottom 15% dark corners converging for logo.",
    "",
    "Style: Pop-science illustration meets motion graphics. Starburst with varying ray styles.",
    "Neural pathway line art. Science-themed micro-illustrations. Bright, saturated core with",
    "dark vignette. Editorial infographic energy with entertainment personality.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  // ═══════════════════════════════════════════════════════════════════
  // BEHIND THE SCENES (5)
  // ═══════════════════════════════════════════════════════════════════

  "instructor-feature": [
    "Scene: A professional portrait-style background designed to frame a person without showing",
    "one. Soft bokeh lights in warm amber and cool " + TEAL + " float across a blurred studio",
    "environment. A gradient from neutral grey to subtle teal creates depth. Studio softbox",
    "light reflections appear as elongated rectangular bokeh shapes. The composition suggests a",
    "premium headshot session — clean, flattering, and professional. A subtle vignette draws",
    "attention toward the center where a face would appear.",
    "",
    "Spatial Zones: Upper 25% softest bokeh zone for name/title. Center 35% cleanest area",
    "for portrait overlay with best bokeh framing. Lower 25% darker gradient for bio text.",
    "Bottom 15% professional dark strip for credentials and brand.",
    "",
    "Style: Professional photography studio aesthetic. Multi-layered bokeh with varying sizes.",
    "Color-temperature split between warm fill and cool rim. Studio equipment reflections as",
    "abstract shapes. Flattering, warm, approachable. Headshot photographer's backdrop.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "platform-update": [
    "Scene: A futuristic tech-product launch environment. Glowing " + TEAL + " circuit-like",
    "patterns trace across a sleek " + DARK + " surface, forming abstract UI wireframes and",
    "interface elements. Floating holographic rectangles show abstract app screens with blurred",
    "content. Digital particle streams flow between the interface elements like data in transit.",
    "A central glowing ring represents the update being deployed. The atmosphere is that",
    "thrilling moment when a new software version goes live.",
    "",
    "Spatial Zones: Upper 25% circuit traces converging for update title. Center 35%",
    "holographic UI elements and glowing ring. Lower 25% particle streams settling for",
    "feature description. Bottom 15% dark tech surface for brand.",
    "",
    "Style: Silicon Valley product launch keynote. Holographic UI projections. Circuit-board",
    "trace patterns as decorative elements. Digital particle physics. Dark premium with",
    "electric " + TEAL + " illumination. Clean, futuristic, trustworthy tech aesthetic.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "day-in-life": [
    "Scene: A timeline-inspired composition showing the passage of a day through color. The",
    "background transitions horizontally from dawn pink-gold at left, through midday bright",
    LIGHT + " at center, to evening " + DARK + " with " + TEAL + " tones at right. Abstract",
    "clock shapes at different angles dot the composition, each showing a different stylized",
    "time. Flowing ribbon lines connect the time periods in smooth curves. Daily-life shapes",
    "— a sun, a car silhouette, a coffee cup, a moon — appear as soft translucent overlays.",
    "",
    "Spatial Zones: Upper 25% across the time gradient for day-in-life title. Center 35%",
    "midday brightness for main content. Lower 25% evening transition for reflection text.",
    "Bottom 15% night-sky dark for logo.",
    "",
    "Style: Editorial infographic meets lifestyle illustration. Horizontal time gradient.",
    "Abstract clock iconography. Flowing timeline ribbons. Translucent daily-life symbols.",
    "Warm-to-cool temperature shift. Narrative visual storytelling.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "office-tour": [
    "Scene: An inviting architectural interior rendered in abstract minimalism. Clean geometric",
    "shapes suggest a modern office space — rectangular desk forms, circular meeting table, and",
    "a large window frame letting in natural " + LIGHT + " toned light. The palette is warm",
    "neutrals with " + TEAL + " accent objects — a chair shape, a plant silhouette, a lamp",
    "form. Isometric perspective gives a playful birds-eye view. Long afternoon shadows create",
    "dramatic diagonal lines across the floor plane. Welcoming, organized, aspirational.",
    "",
    "Spatial Zones: Upper 25% window light zone for location/welcome text. Center 35%",
    "abstract office layout as visual tour centerpiece. Lower 25% floor shadow area for",
    "description. Bottom 15% grounded base for brand.",
    "",
    "Style: Architectural illustration meets modern isometric design. Clean geometric forms.",
    "Warm natural lighting with long shadows. Limited accent palette. Scandinavian design",
    "sensibility. Organized, human-centered space design visualization.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "meet-founder": [
    "Scene: A narrative origin-story atmosphere. A winding path of glowing " + TEAL + " light",
    "emerges from the bottom-left corner and leads toward a bright horizon at upper-right,",
    "symbolizing a founder journey. Along the path, small milestone marker shapes glow at",
    "intervals. The background shifts from deep " + DARK + " origins to bright, warm golden",
    "light at the destination. Constellation-like dot patterns connect to form abstract",
    "vision shapes. A single bright star burns at the path's end — the founding vision.",
    "",
    "Spatial Zones: Upper 25% bright horizon area for founder name. Center 35% path",
    "midpoint with milestone markers for portrait space. Lower 25% origin area, darker, for",
    "founding story quote. Bottom 15% deepest origin for brand mark.",
    "",
    "Style: Narrative journey illustration. Glowing path with emission light. Milestone",
    "node points with pulse effects. Constellation dot-line patterns. From-darkness-to-light",
    "gradient metaphor. Inspiring, personal, authentic founder-brand energy.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  // ═══════════════════════════════════════════════════════════════════
  // PROMOTION (7)
  // ═══════════════════════════════════════════════════════════════════

  "bold-cta": [
    "Scene: A powerful, forward-surging composition built around a massive arrow or chevron",
    "shape made of layered " + TEAL + " mesh gradients. The arrow points right and upward,",
    "suggesting momentum and action. Light rays stream along the arrow surface. Glassmorphism",
    "floating panels orbit the arrow like value propositions. The background is a dynamic",
    "gradient from " + DARK + " at bottom-left to bright teal at upper-right. Radial glow",
    "effects at the arrow tip create a sense of destination and aspiration.",
    "",
    "Spatial Zones: Upper 25% clear teal light for headline call-to-action. Center 35%",
    "arrow hero shape with glassmorphism panels. Lower 25% darker gradient for supporting",
    "value proposition. Bottom 15% dark anchor for brand and button.",
    "",
    "Style: Premium SaaS landing page hero. Mesh gradient arrow with depth. Glassmorphism",
    "floating cards. Directional composition forcing eye movement. Bold, confident, premium.",
    "Stripe/Linear marketing website energy in a social media format.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "special-offer": [
    "Scene: An exciting retail-energy explosion. A central starburst in " + ORANGE + " and",
    "gold radiates outward with sharp, dynamic rays. Scattered through the burst are abstract",
    "price-tag shapes, star shapes, and shimmering confetti rendered in metallic gold and warm",
    "amber. The background is a rich gradient from deep ruby-orange at center to " + DARK,
    "at the edges, creating maximum contrast for the central burst. Shimmer effects and",
    "sparkle particles add a sense of exclusive value and limited-time excitement.",
    "",
    "Spatial Zones: Upper 25% ray tips zone for offer headline. Center 35% starburst",
    "origin for price/percentage display. Lower 25% settling rays for promo code/details.",
    "Bottom 15% dark edge for brand urgency.",
    "",
    "Style: Black Friday / retail sale graphic energy. Explosive starburst composition.",
    "Metallic gold textures on price tags. High saturation orange palette. Sparkle particle",
    "effects. Urgent, exciting, you-must-act-now energy with premium rendering.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "flash-sale": [
    "Scene: An electrifying lightning-strike composition. A massive bolt of stylized lightning",
    "in brilliant " + ORANGE + "-to-white gradient crashes diagonally across the frame from",
    "upper-right to lower-left. The bolt illuminates everything around it with a blinding flash.",
    "Radiating shockwave rings expand from the strike point. Time-pressure elements — abstract",
    "clock fragment shapes — shatter and scatter outward. The background is " + DARK + " with",
    "crackling electrical arcs in " + TEAL + ". Speed lines and motion blur enhance urgency.",
    "",
    "Spatial Zones: Upper 25% above the bolt for FLASH SALE headline. Center 35% bolt",
    "strike point with shockwave for discount amount. Lower 25% electrical aftermath for",
    "timer/deadline. Bottom 15% darkened base for brand.",
    "",
    "Style: Action movie poster meets retail urgency. Stylized lightning with branch detail.",
    "Shockwave ring effects. Shattered clock fragments. Electrical arc rendering. Maximum",
    "energy, maximum speed, zero time to waste. Thriller movie poster composition.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "referral-program": [
    "Scene: A network-growth visualization showing connection and community. Two central",
    "glowing nodes in " + TEAL + " and " + ORANGE + " are connected by a bright beam of light.",
    "From each node, additional connections branch outward like a growing neural network or",
    "constellation. Each connection point glows warmly. The network expands across a dark",
    DARK + " canvas, suggesting infinite growth potential. Small gift-box shaped particles",
    "float near new connection points, representing referral rewards. The energy is inviting.",
    "",
    "Spatial Zones: Upper 25% network expansion area for program name. Center 35% twin",
    "nodes and primary connection for core message. Lower 25% branching network for",
    "reward details. Bottom 15% dark canvas for brand.",
    "",
    "Style: Data visualization art meets social network mapping. Glowing nodes with pulse",
    "animations implied. Connection lines with energy flow. Constellation aesthetic against",
    "dark void. Warm, community-driven, and rewarding atmosphere.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "bundle-deal": [
    "Scene: A premium gift-wrapping composition. Multiple abstract package shapes in varying",
    "sizes are artfully arranged, each wrapped in different " + TEAL + " gradient tones with",
    ORANGE + " ribbon accents that catch the light with metallic sheen. The packages are",
    "stacked and overlapping, suggesting abundant value. A warm spotlight from above creates",
    "dramatic shadows beneath the stack. Scattered around the base are small sparkle particles",
    "and confetti. The background is a warm, deep gradient suggesting a luxury retail display.",
    "",
    "Spatial Zones: Upper 25% above the package stack for bundle title. Center 35%",
    "package arrangement as value visualization. Lower 25% base with sparkles for pricing.",
    "Bottom 15% dark display surface for brand.",
    "",
    "Style: Luxury retail window display. Premium packaging materials with metallic ribbons.",
    "Dramatic top-down lighting. Rich, deep background gradient. Gift-giving excitement.",
    "Department store holiday display elegance with modern rendering.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "seasonal-promo": [
    "Scene: A seasonal transition composition that captures the feeling of change and new",
    "beginnings. Abstract natural elements — leaf shapes, sun rays, snowflake geometries, and",
    "flower petal forms — are arranged in a circular wreath pattern around a central open space.",
    "Each quadrant of the wreath subtly shifts color to suggest different seasonal palettes,",
    "with " + TEAL + " and " + ORANGE + " woven throughout. A radial gradient from warm center",
    "to cool edges creates depth. The composition celebrates time-limited seasonal opportunity.",
    "",
    "Spatial Zones: Upper 25% above the wreath for seasonal greeting. Center 35% wreath",
    "with open center for offer amount. Lower 25% below wreath for promo details.",
    "Bottom 15% gradient base for brand.",
    "",
    "Style: Botanical illustration meets modern seasonal design. Abstract nature elements with",
    "geometric precision. Circular wreath composition. Seasonal color shifts within brand",
    "palette. Festive but not kitschy. Elegant seasonal celebration.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "limited-time": [
    "Scene: A dramatic hourglass composition rendered in glowing light. A large abstract",
    "hourglass shape at center is constructed from " + TEAL + " neon outlines, with golden",
    ORANGE + " particles flowing through the narrow waist from top to bottom — time literally",
    "running out. The falling particles create a warm glow that intensifies at the bottom bulb.",
    "The background is deep " + DARK + " with subtle clock-tick marks radiating outward from",
    "the hourglass. Urgency pulses emanate from the hourglass edges.",
    "",
    "Spatial Zones: Upper 25% above hourglass for time-limited headline. Center 35%",
    "hourglass shape with flowing particles. Lower 25% warm bottom glow for offer details.",
    "Bottom 15% dark base for brand and deadline.",
    "",
    "Style: Conceptual time-art meets retail urgency. Neon-outline hourglass construction.",
    "Particle physics simulation on falling elements. Clock-tick radial pattern. Warm-to-cool",
    "temperature shift from bottom to top. Elegant urgency, not desperate urgency.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  // ═══════════════════════════════════════════════════════════════════
  // ENGAGEMENT (6)
  // ═══════════════════════════════════════════════════════════════════

  "question-of-day": [
    "Scene: An inviting conversation-starter composition. A large, beautifully rendered",
    "question-mark shape floats at center, constructed from layers of translucent " + TEAL,
    "and white glass-like material. The question mark casts a colorful caustic light pattern",
    "on the surface below it. Floating thought-bubble shapes in various sizes orbit the",
    "central question mark, each subtly glowing. The background is a warm gradient from",
    "golden amber to soft teal, suggesting an engaging golden-hour discussion.",
    "",
    "Spatial Zones: Upper 25% thought bubbles dispersing for question category label.",
    "Center 35% question mark hero element for the actual question. Lower 25% caustic",
    "light patterns for instruction/CTA. Bottom 15% warm base for brand.",
    "",
    "Style: 3D glass-material rendering meets editorial design. Translucent glass question",
    "mark with refraction effects. Caustic light projection. Floating thought bubbles with",
    "soft glow. Warm, inviting, conversation-starting atmosphere.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "fill-in-blank": [
    "Scene: A playful incomplete-puzzle composition. Abstract jigsaw-puzzle shaped negative",
    "spaces are cut out of a vibrant " + TEAL + "-to-" + ORANGE + " gradient surface, revealing",
    "a deep " + DARK + " void beneath. The missing pieces float nearby, slightly rotated and",
    "glowing at their edges, waiting to be placed. Small cursor-blink shapes flash near the",
    "blank spaces. The surrounding gradient surface has a subtle paper texture. The mood is",
    "inviting participation — your answer completes the picture.",
    "",
    "Spatial Zones: Upper 25% intact gradient for prompt introduction. Center 35% puzzle",
    "gaps as interactive focal area. Lower 25% floating pieces zone for engagement CTA.",
    "Bottom 15% solid base for brand.",
    "",
    "Style: Interactive puzzle-game aesthetic. Clean negative-space cutouts with glow edges.",
    "Paper texture on gradient surface. Floating pieces with subtle rotation and shadow.",
    "Playful, participatory, and visually incomplete by design.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "hot-take": [
    "Scene: A fiery, provocative composition radiating heat and bold opinions. Stylized flame",
    "shapes in " + ORANGE + " and amber rise from the bottom third, with heat-distortion",
    "ripple effects warping the air above. The background transitions from deep volcanic red",
    "at the base to a cooler " + DARK + " sky above, creating dramatic temperature contrast.",
    "Ember particles float upward through the frame. A central thermometer-like shape with its",
    "mercury maxed out pulses with energy. The mood is confidently controversial.",
    "",
    "Spatial Zones: Upper 25% cooler dark area for the hot-take statement. Center 35%",
    "heat distortion zone for the provocative opinion. Lower 25% flame zone for attribution.",
    "Bottom 15% volcanic dark for brand.",
    "",
    "Style: Editorial opinion piece meets fire photography. Stylized flame rendering with",
    "smooth gradient transitions. Heat distortion shader effects. Ember particle system.",
    "High drama, high energy, unapologetically bold and provocative.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "debate": [
    "Scene: A balanced, two-sided arena composition. The frame is divided by a thin neutral",
    "line at center, with " + TEAL + " atmosphere dominating the left podium side and " + ORANGE,
    "ruling the right. Each side features an abstract podium shape with a subtle spotlight.",
    "Between them, a neutral zone crackles with small energy sparks where ideas clash. Abstract",
    "speech-wave shapes emanate from each podium side. The background is a deep amphitheater",
    "gradient suggesting an audience in the darkness beyond.",
    "",
    "Spatial Zones: Upper 25% amphitheater dark for debate topic. Center 35% dual-podium",
    "clash zone for the two positions. Lower 25% audience gradient for voting CTA.",
    "Bottom 15% neutral dark for brand.",
    "",
    "Style: Political debate stage design. Symmetrical dual-composition. Contrasting color",
    "temperatures. Podium lighting with dramatic spots. Speech-wave visual metaphor. Balanced,",
    "fair, and designed for audience participation.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "story-time": [
    "Scene: A warm, intimate campfire-story atmosphere rendered in abstract form. A soft",
    "circular pool of warm golden-" + ORANGE + " light radiates from center-bottom, as if cast",
    "by an unseen campfire. Wispy smoke-like gradients in pale grey and " + TEAL + " curl",
    "upward from the light source, forming abstract narrative shapes. The surrounding space is",
    "a deep, cozy " + DARK + " like a night sky. Small star shapes peek through the upper",
    "darkness. The mood is that magical moment when someone says let me tell you a story.",
    "",
    "Spatial Zones: Upper 25% starry darkness for story title. Center 35% smoke and",
    "narrative shapes rising for story content. Lower 25% warm firelight pool for",
    "storyteller attribution. Bottom 15% night-dark for brand.",
    "",
    "Style: Storybook illustration meets ambient photography. Warm upward light source.",
    "Smoke-wisp rendering with organic flow. Star-field background. Intimate, warm, inviting",
    "color temperature. Cozy, narrative, and deeply human.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "throwback": [
    "Scene: A nostalgic, vintage-tinted composition evoking cherished memories. The frame is",
    "designed like a faded photograph with rounded corners and a wide vintage border in cream.",
    "The main image area features a warm sepia-to-" + TEAL + " duotone gradient with subtle",
    "film grain and light-leak effects bleeding in from the edges in warm " + ORANGE + ". Old",
    "film sprocket holes run along one edge as a decorative motif. A gentle Gaussian blur on",
    "the background creates that dreamy memory-lane feeling. Dust particle specks float across.",
    "",
    "Spatial Zones: Upper 25% vintage border for throwback date/label. Center 35% faded",
    "photo area for memory content. Lower 25% border area for caption/reflection.",
    "Bottom 15% aged paper strip for brand.",
    "",
    "Style: Vintage photography meets modern nostalgia design. Film grain overlay. Sepia",
    "duotone processing. Light leak effects. Rounded vintage corners. Film sprocket details.",
    "Warm, sentimental, respectfully retro without being corny.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  // ═══════════════════════════════════════════════════════════════════
  // ANNOUNCEMENTS (6)
  // ═══════════════════════════════════════════════════════════════════

  "new-feature": [
    "Scene: A sleek product-reveal atmosphere. A central glowing rectangle — representing a",
    "new feature card — emerges from a dark " + DARK + " environment, tilted at a dramatic",
    "angle with perspective. The card surface has a " + TEAL + " mesh gradient that shifts",
    "and shimmers. Behind it, subtle wireframe UI outlines suggest the broader product. Light",
    "rays fan outward from behind the card like a sunrise. Small floating UI component shapes",
    "— toggles, buttons, icons — orbit the main card, suggesting feature richness.",
    "",
    "Spatial Zones: Upper 25% light ray zone for feature category. Center 35% feature card",
    "reveal for feature name and visual. Lower 25% wireframe context for description.",
    "Bottom 15% dark base for brand.",
    "",
    "Style: Apple keynote product reveal aesthetic. Dramatic perspective tilt. Mesh gradient",
    "surface material. Wireframe blueprint background. Floating UI micro-components.",
    "Premium, clean, forward-looking tech product announcement.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "coming-soon": [
    "Scene: A mysterious fog-of-anticipation composition. Dense, luminous fog in " + TEAL,
    "and white rolls across the bottom two-thirds of the frame, partially concealing abstract",
    "shapes that hint at something big beneath the surface. Above the fog line, a clear dark",
    DARK + " sky has a single bright star or beacon burning with " + ORANGE + " intensity.",
    "Volumetric light beams cut through the fog from behind the hidden shapes. The mood is",
    "cinematic trailer energy — something extraordinary is about to be unveiled.",
    "",
    "Spatial Zones: Upper 25% clear sky with beacon for COMING SOON headline. Center 35%",
    "fog line with volumetric light for teaser date. Lower 25% dense fog with hidden shapes",
    "for mystery description. Bottom 15% deepest fog for brand.",
    "",
    "Style: Movie trailer atmosphere. Volumetric fog rendering with light scattering.",
    "Silhouette mystery behind fog. Single beacon point of interest. Atmospheric depth.",
    "Cinematic anticipation, curiosity-inducing, and impossible to scroll past.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "launch-day": [
    "Scene: A dramatic rocket-launch moment frozen in time. An abstract rocket or upward",
    "thrust shape made of pure " + TEAL + "-to-white light ascends from the bottom center,",
    "trailing a massive plume of " + ORANGE + " and gold particle exhaust. Shockwave rings",
    "expand outward from the launch point. The sky above transitions from deep " + DARK + " at",
    "the top to bright launch-flare white near the thrust. Celebration confetti mixed with",
    "exhaust particles creates a hybrid party-launch atmosphere.",
    "",
    "Spatial Zones: Upper 25% dark sky for launch announcement headline. Center 35%",
    "rocket ascent with maximum visual energy. Lower 25% exhaust plume zone for product",
    "description. Bottom 15% launch pad for brand.",
    "",
    "Style: Space launch photography meets celebration design. Upward thrust composition.",
    "Particle exhaust plume with warm gradient. Shockwave ring effects. Dramatic bottom-up",
    "lighting. Pure energy, pure momentum, and pure excitement.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "event-invite": [
    "Scene: An elegant event-invitation composition. A grand doorway or archway made of",
    "geometric " + TEAL + " light frames a warm, glowing interior space in golden " + ORANGE + ".",
    "The doorway is flanked by decorative pillar shapes with subtle art-deco patterns. A red",
    "carpet-like gradient leads from the bottom edge toward the doorway. Small floating",
    "envelope shapes and star particles drift through the air. The mood is exclusive access",
    "to something extraordinary — a formal invitation you would never decline.",
    "",
    "Spatial Zones: Upper 25% above the archway for event name. Center 35% archway",
    "and golden interior for event visual. Lower 25% red carpet approach for date/time.",
    "Bottom 15% elegant base for brand and RSVP.",
    "",
    "Style: Grand event venue entrance design. Art-deco geometric details. Red carpet gradient.",
    "Warm interior glow through archway. Floating invitation elements. Exclusive, prestigious,",
    "and elegantly welcoming. Gala invitation energy.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "press-release": [
    "Scene: A clean, authoritative newsroom-inspired composition. Abstract newspaper fold",
    "shapes layer diagonally across the frame in crisp white and light grey, with thin " + TEAL,
    "rule lines separating sections. A prominent horizontal banner shape in " + TEAL + " cuts",
    "across the upper third, suggesting a breaking-news ticker. The background is a professional",
    "warm grey with subtle halftone dot texture reminiscent of print media. Small microphone",
    "and camera silhouette shapes are scattered decoratively. The mood is credible newsworthy.",
    "",
    "Spatial Zones: Upper 25% news ticker banner for press release label. Center 35%",
    "layered newspaper shapes for headline. Lower 25% body text area with rule lines.",
    "Bottom 15% professional base for brand.",
    "",
    "Style: News media design meets corporate communications. Newspaper fold geometry.",
    "Halftone dot texture. Clean rule lines. Professional grey-and-teal palette. Credible,",
    "authoritative, and worthy of journalistic attention.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),

  "partnership": [
    "Scene: A symbolic union composition. Two distinct abstract shapes — one in " + TEAL,
    "and one in warm " + ORANGE + " — approach each other from opposite sides of the frame and",
    "merge at center, creating a beautiful blended form where their colors intermix. Where they",
    "join, a brilliant seam of white light emanates outward. The shapes have different but",
    "complementary geometries — one angular and precise, one curved and flowing — representing",
    "two different organizations becoming one force. Background is a prestigious " + DARK + ".",
    "",
    "Spatial Zones: Upper 25% above the shapes for partnership announcement headline.",
    "Center 35% shape merger zone with light seam for partner logos space. Lower 25%",
    "blended gradient for partnership description. Bottom 15% dark prestige for brand.",
    "",
    "Style: Corporate partnership announcement meets abstract art. Complementary shape",
    "merging. Color blending at intersection. Light emission from union point. Prestigious",
    "dark background. Two-becoming-one visual metaphor with elegant execution.",
    "",
    "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
  ].join(" "),
};

// ── Fallback prompt for unknown templates ────────────────────────────

const FALLBACK_PROMPT = [
  "Scene: A modern abstract gradient background blending " + TEAL + " and " + ORANGE,
  "tones with geometric shapes and light effects. Soft mesh gradients flow across a",
  DARK + " canvas with glassmorphism floating panels and subtle particle effects.",
  "Bokeh circles and volumetric light rays add depth and visual interest.",
  "",
  "Spatial Zones: Upper 25% open for headline text. Center 35% hero area with visual",
  "focal point. Lower 25% gradient zone for subtitle. Bottom 15% clean bar for logo.",
  "",
  "Style: Behance-worthy modern design. Mesh gradients, glassmorphism, grain texture.",
  "Premium social media aesthetic with clean composition and editorial quality.",
  "",
  "Constraints: No text, no letters, no numbers, no logos, no watermarks, no human faces.",
].join(" ");

// ── Prompt wrapper ───────────────────────────────────────────────────

function wrapPrompt(rawPrompt: string, platformId: string): string {
  var ratio = getAiAspectRatio(platformId);
  return [
    "Create a stunning social media post background image (" + ratio + " aspect ratio).",
    "NO TEXT in the image — this is a background only.",
    "",
    rawPrompt,
    "",
    "Technical: 4K detail level. Ready for social media use with text overlaid on top.",
  ].join("\n");
}

// ── Public API ───────────────────────────────────────────────────────

/**
 * Generate a rich AI design prompt for a template background image.
 * Includes creative-director-level scene, spatial zones, style, and constraints.
 */
export function getDesignPrompt(
  templateId: string,
  platformId: string,
  variationIndex?: number
): string {
  var rawPrompt = DESIGN_PROMPTS[templateId] || FALLBACK_PROMPT;

  var suffixIdx = (variationIndex != null && variationIndex >= 0 && variationIndex < VARIATION_SUFFIXES.length)
    ? variationIndex
    : 0;
  var suffix = VARIATION_SUFFIXES[suffixIdx];

  var finalPrompt = suffix ? rawPrompt + suffix : rawPrompt;
  return wrapPrompt(finalPrompt, platformId);
}

/**
 * Get the text rendering preset for a template.
 * Falls back to elegant-minimal for unknown template IDs.
 */
export function getTextPreset(templateId: string): TextPreset {
  return TEMPLATE_PRESET_MAP[templateId] || PRESET_ELEGANT_MINIMAL;
}

/**
 * Get the canvas layout configuration for a template.
 * All values are 0-1 percentages of canvas dimensions.
 * Falls back to center-hero layout for unknown template IDs.
 */
export function getCanvasLayout(templateId: string): CanvasLayout {
  return TEMPLATE_LAYOUT_MAP[templateId] || LAYOUT_CENTER_HERO;
}
