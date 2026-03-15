// AI prompt templates for generating stunning social media backgrounds
// These prompts are crafted for Gemini / Nano Banana Pro image generation

import { TemplateContent } from "./templates/registry";

interface AiPromptConfig {
  readonly backgroundPrompt: string;
  readonly style: string;
  readonly mood: string;
}

const BRAND_STYLE = "modern, clean, professional, teal (#0d9488) and orange (#F97316) color scheme, minimalist, premium feel";

/**
 * Generate an AI prompt for a template's background image.
 * The prompt creates a beautiful background WITHOUT text (text is overlaid by Figma).
 */
export function getAiPrompt(templateId: string, content: TemplateContent): string {
  const configs: Record<string, AiPromptConfig> = {
    "pass-celebration": {
      backgroundPrompt: "A celebratory abstract background with confetti particles, sparkles, and light rays. Teal (#0d9488) gradient with golden orange (#F97316) confetti accents floating in the air. Bokeh light effects.",
      style: "celebration, achievement, joy",
      mood: "triumphant, exciting, warm",
    },
    "testimonial-card": {
      backgroundPrompt: "An elegant, minimal abstract background with soft flowing fabric-like waves in white and light teal (#f0fdfa). Subtle paper texture with warm natural lighting. Soft shadows and depth.",
      style: "elegant, testimonial, trust",
      mood: "warm, professional, inviting",
    },
    "stats-spotlight": {
      backgroundPrompt: "A dramatic dark abstract background with geometric shapes, glowing teal (#0d9488) neon accent lines and particles on a deep navy (#0f172a) backdrop. Data visualization aesthetic with flowing light streams.",
      style: "data, powerful, dramatic",
      mood: "impressive, authoritative, modern",
    },
    "driving-tip": {
      backgroundPrompt: "A stylized abstract road scene from aerial view with smooth curves and teal-tinted asphalt. Motion blur effects suggesting speed and movement. Geometric road markings with a modern, clean aesthetic.",
      style: "educational, motion, road",
      mood: "helpful, dynamic, clear",
    },
    "edt-lesson": {
      backgroundPrompt: "A modern learning environment abstract background with soft gradient from white to light teal. Floating geometric shapes suggesting education — circles, rounded rectangles, gentle grid pattern. Clean and organized.",
      style: "educational, structured, clean",
      mood: "focused, organized, approachable",
    },
    "did-you-know": {
      backgroundPrompt: "A mysterious, deep teal (#042f2e) abstract background with floating question mark shapes made of light particles. Subtle aurora-like glow effects in teal and orange. Stars and sparkle effects.",
      style: "mysterious, curiosity, discovery",
      mood: "intriguing, surprising, engaging",
    },
    "meme-card": {
      backgroundPrompt: "A fun, vibrant abstract gradient background blending from teal (#14b8a6) to warm orange (#fb923c). Playful geometric shapes, emoji-like floating elements, rounded blobs, and bubble patterns. Energetic and youthful.",
      style: "fun, playful, social media",
      mood: "humorous, relatable, lighthearted",
    },
    "quiz-poll": {
      backgroundPrompt: "An engaging quiz show abstract background with radial light burst emanating from center. Rich orange (#F97316) to deep amber gradient with glowing question mark silhouettes. Game show spotlight effects with floating sparkle particles.",
      style: "game show, interactive, exciting",
      mood: "challenging, fun, competitive",
    },
    "instructor-feature": {
      backgroundPrompt: "A professional portrait-style abstract background with soft bokeh lights. Warm gradient from neutral grey to subtle teal tint. Studio lighting feel with elegant out-of-focus city lights. Clean and professional.",
      style: "portrait, professional, warm",
      mood: "trustworthy, approachable, skilled",
    },
    "platform-update": {
      backgroundPrompt: "A futuristic tech abstract background with glowing teal (#0d9488) circuit-like patterns on dark navy (#0f172a). Floating UI elements, holographic effects, digital particle streams. Modern app interface aesthetic.",
      style: "tech, innovation, futuristic",
      mood: "exciting, cutting-edge, sleek",
    },
    "bold-cta": {
      backgroundPrompt: "A powerful, dynamic abstract background with bold teal (#0d9488) to vibrant teal-green gradient. Sweeping curved light rays, glass morphism floating shapes, and radial glow effects. Premium and aspirational.",
      style: "bold, premium, call-to-action",
      mood: "confident, aspirational, urgent",
    },
    "special-offer": {
      backgroundPrompt: "An exciting sale/discount abstract background with burst/explosion effect from center. Rich orange (#F97316) and gold gradient with scattered price tag shapes, star bursts, and shimmer effects. Retail energy.",
      style: "sale, urgency, value",
      mood: "exciting, urgent, valuable",
    },
    "booking-reminder": {
      backgroundPrompt: "A calm, gentle abstract background with soft teal gradient, floating clock/time-related geometric shapes. Warm morning light feel, subtle paper grain texture. Clean and organized with gentle motion.",
      style: "reminder, gentle, time",
      mood: "encouraging, gentle, helpful",
    },
  };

  const config = configs[templateId] || {
    backgroundPrompt: "A modern abstract gradient background in teal and orange tones with geometric shapes and light effects.",
    style: "modern, professional",
    mood: "clean, premium",
  };

  return [
    `Create a stunning social media post background image. NO TEXT in the image — this is a background only.`,
    ``,
    `Visual: ${config.backgroundPrompt}`,
    ``,
    `Style requirements:`,
    `- ${BRAND_STYLE}`,
    `- Style: ${config.style}`,
    `- Mood: ${config.mood}`,
    `- No text, no words, no letters, no watermarks — purely visual/abstract`,
    `- High quality, 4K detail level`,
    `- Ready for social media use with text overlaid on top`,
    `- Leave clear space in the center and bottom for text overlay`,
  ].join("\n");
}

/**
 * Map platform aspect ratios to Gemini API aspect ratio strings
 */
export function getAiAspectRatio(platformId: string): string {
  const ratios: Record<string, string> = {
    "instagram-post": "4:5",
    "instagram-square": "1:1",
    "instagram-story": "9:16",
    "twitter": "16:9",
    "linkedin": "16:9",
    "facebook": "4:5",
    "tiktok-cover": "9:16",
  };
  return ratios[platformId] || "4:5";
}

/**
 * Free-tier image model (no charges)
 * - gemini-2.5-flash-image = "Nano Banana" (FREE, 500 images/day)
 * - gemini-3-pro-image-preview = "Nano Banana Pro" (PAID, $0.134/image)
 * - gemini-3.1-flash-image-preview = "Nano Banana 2" (PAID, $0.067/image)
 */
export const AI_MODEL_FREE = "gemini-2.5-flash-image";
export const AI_MODEL_PRO = "gemini-3-pro-image-preview";

export function getAiModel(quality: "free" | "pro"): string {
  return quality === "pro" ? AI_MODEL_PRO : AI_MODEL_FREE;
}
