// Drivzu Brand Tokens — all values from globals.css and brand-identity.md
// Colors are in Figma's 0-1 RGB format

export interface RGB {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

export interface GradientStop {
  readonly color: RGB;
  readonly position: number;
}

export interface BrandGradient {
  readonly stops: readonly GradientStop[];
  readonly angleDeg: number;
}

// ── Primary Colors ──────────────────────────────────────────────────────

export const TEAL_PRIMARY: RGB = { r: 0.031, g: 0.569, b: 0.698 };   // #0891B2
export const TEAL_600: RGB     = { r: 0.051, g: 0.580, b: 0.533 };   // #0d9488
export const TEAL_700: RGB     = { r: 0.059, g: 0.463, b: 0.431 };   // #0f766e
export const TEAL_500: RGB     = { r: 0.078, g: 0.722, b: 0.651 };   // #14b8a6
export const TEAL_400: RGB     = { r: 0.176, g: 0.808, b: 0.745 };   // #2dd4bf
export const TEAL_300: RGB     = { r: 0.369, g: 0.871, b: 0.824 };   // #5eead4
export const TEAL_200: RGB     = { r: 0.600, g: 0.929, b: 0.890 };   // #99f6e4
export const TEAL_100: RGB     = { r: 0.800, g: 0.965, b: 0.941 };   // #ccfbf1
export const TEAL_50: RGB      = { r: 0.941, g: 0.992, b: 0.980 };   // #f0fdfa
export const TEAL_900: RGB     = { r: 0.043, g: 0.282, b: 0.271 };   // #0b4544 (approx)
export const TEAL_950: RGB     = { r: 0.016, g: 0.184, b: 0.180 };   // #042f2e

// ── Accent Colors ───────────────────────────────────────────────────────

export const ORANGE_PRIMARY: RGB = { r: 0.976, g: 0.451, b: 0.086 }; // #F97316
export const ORANGE_400: RGB     = { r: 0.984, g: 0.573, b: 0.235 }; // #fb923c
export const ORANGE_500: RGB     = { r: 0.976, g: 0.451, b: 0.086 }; // #f97316
export const ORANGE_300: RGB     = { r: 0.992, g: 0.698, b: 0.392 }; // #fdba74

// ── Neutrals ────────────────────────────────────────────────────────────

export const SLATE_900: RGB = { r: 0.059, g: 0.090, b: 0.165 };     // #0f172a
export const SLATE_800: RGB = { r: 0.118, g: 0.161, b: 0.231 };     // #1e293b
export const SLATE_700: RGB = { r: 0.204, g: 0.255, b: 0.333 };     // #334155
export const SLATE_600: RGB = { r: 0.278, g: 0.333, b: 0.412 };     // #475569
export const SLATE_500: RGB = { r: 0.392, g: 0.439, b: 0.502 };     // #64748b
export const SLATE_400: RGB = { r: 0.580, g: 0.616, b: 0.663 };     // #94a3b8
export const SLATE_300: RGB = { r: 0.796, g: 0.816, b: 0.847 };     // #cbd5e1
export const SLATE_200: RGB = { r: 0.886, g: 0.902, b: 0.922 };     // #e2e8f0
export const SLATE_100: RGB = { r: 0.945, g: 0.953, b: 0.965 };     // #f1f5f9
export const SLATE_50: RGB  = { r: 0.973, g: 0.980, b: 0.988 };     // #f8fafc
export const WHITE: RGB     = { r: 1, g: 1, b: 1 };
export const BLACK: RGB     = { r: 0, g: 0, b: 0 };

// ── Gradients (135deg) ──────────────────────────────────────────────────

export const GRADIENT_TEAL: BrandGradient = {
  stops: [
    { color: TEAL_600, position: 0 },
    { color: TEAL_500, position: 1 },
  ],
  angleDeg: 135,
};

export const GRADIENT_ORANGE: BrandGradient = {
  stops: [
    { color: ORANGE_PRIMARY, position: 0 },
    { color: ORANGE_400, position: 1 },
  ],
  angleDeg: 135,
};

export const GRADIENT_DARK: BrandGradient = {
  stops: [
    { color: SLATE_900, position: 0 },
    { color: SLATE_800, position: 1 },
  ],
  angleDeg: 135,
};

// ── Typography ──────────────────────────────────────────────────────────

export const FONT_PRIMARY = "Plus Jakarta Sans";
export const FONT_FALLBACK = "Inter";

export type FontWeight = "Regular" | "Medium" | "SemiBold" | "Bold" | "ExtraBold";

export const FONT_WEIGHTS: readonly FontWeight[] = [
  "Regular",
  "Medium",
  "SemiBold",
  "Bold",
  "ExtraBold",
];

// ── Border Radius ───────────────────────────────────────────────────────

export const RADIUS_SM = 8;
export const RADIUS_MD = 12;
export const RADIUS_LG = 16;
export const RADIUS_XL = 24;
export const RADIUS_PILL = 9999;

// ── Platform Dimensions ─────────────────────────────────────────────────

export interface PlatformSpec {
  readonly id: string;
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly label: string;
}

export const PLATFORMS: readonly PlatformSpec[] = [
  { id: "instagram-post",    name: "Instagram Post",    width: 1080, height: 1350, label: "1080×1350 (4:5)" },
  { id: "instagram-square",  name: "Instagram Square",  width: 1080, height: 1080, label: "1080×1080 (1:1)" },
  { id: "instagram-story",   name: "Instagram Story",   width: 1080, height: 1920, label: "1080×1920 (9:16)" },
  { id: "twitter",           name: "X / Twitter",       width: 1200, height: 675,  label: "1200×675 (16:9)" },
  { id: "linkedin",          name: "LinkedIn",          width: 1200, height: 627,  label: "1200×627 (1.91:1)" },
  { id: "facebook",          name: "Facebook",          width: 1080, height: 1350, label: "1080×1350 (4:5)" },
  { id: "tiktok-cover",      name: "TikTok Cover",      width: 1080, height: 1920, label: "1080×1920 (9:16)" },
];

// ── Template Metadata ───────────────────────────────────────────────────

export interface TemplateInfo {
  readonly id: string;
  readonly name: string;
  readonly pillar: string;
  readonly description: string;
  readonly accentColor: string;
}

export const PILLARS = [
  { id: "success-stories", name: "Success Stories", color: "#0891B2" },
  { id: "education",       name: "Education",       color: "#0d9488" },
  { id: "entertainment",   name: "Entertainment",   color: "#F97316" },
  { id: "behind-scenes",   name: "Behind the Scenes", color: "#475569" },
  { id: "promotion",       name: "Promotion",       color: "#f97316" },
] as const;

export const TEMPLATES: readonly TemplateInfo[] = [
  // Success Stories (30%)
  { id: "pass-celebration",  name: "Pass Celebration",    pillar: "success-stories", description: "Celebrate a student passing their test",       accentColor: "#0891B2" },
  { id: "testimonial-card",  name: "Testimonial Card",    pillar: "success-stories", description: "Share a student quote or review",              accentColor: "#0891B2" },
  { id: "stats-spotlight",   name: "Stats Spotlight",     pillar: "success-stories", description: "Highlight an impressive statistic",            accentColor: "#F97316" },
  // Education (25%)
  { id: "driving-tip",      name: "Driving Tip",         pillar: "education",       description: "Share a useful driving tip",                  accentColor: "#0d9488" },
  { id: "edt-lesson",       name: "EDT Lesson Spotlight", pillar: "education",       description: "Spotlight an EDT lesson",                    accentColor: "#F97316" },
  { id: "did-you-know",     name: "Did You Know?",       pillar: "education",       description: "Share an interesting driving fact",           accentColor: "#F97316" },
  // Entertainment (20%)
  { id: "meme-card",        name: "Relatable Moment",    pillar: "entertainment",   description: "Funny or relatable driving moment",          accentColor: "#F97316" },
  { id: "quiz-poll",        name: "Quiz / Poll",         pillar: "entertainment",   description: "Test your followers' driving knowledge",     accentColor: "#F97316" },
  // Behind the Scenes (15%)
  { id: "instructor-feature", name: "Instructor Feature", pillar: "behind-scenes",   description: "Feature one of your instructors",            accentColor: "#0891B2" },
  { id: "platform-update",  name: "Platform Update",     pillar: "behind-scenes",   description: "Announce a new feature or update",           accentColor: "#F97316" },
  // Promotion (10%)
  { id: "bold-cta",         name: "Bold CTA",            pillar: "promotion",       description: "Strong call-to-action for bookings",         accentColor: "#0891B2" },
  { id: "special-offer",    name: "Special Offer",       pillar: "promotion",       description: "Promote a limited time discount",            accentColor: "#F97316" },
  { id: "booking-reminder", name: "Booking Reminder",    pillar: "promotion",       description: "Gentle reminder to book a lesson",           accentColor: "#0891B2" },
];
