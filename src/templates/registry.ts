// Template Registry — maps template IDs to builder functions

import { PlatformSpec } from "../brand";
import { buildPassCelebration, buildTestimonialCard, buildStatsSpotlight } from "./success-stories";
import { buildDrivingTip, buildEdtLesson, buildDidYouKnow } from "./education";
import { buildMemeCard, buildQuizPoll } from "./entertainment";
import { buildInstructorFeature, buildPlatformUpdate } from "./behind-scenes";
import { buildBoldCta, buildSpecialOffer, buildBookingReminder } from "./promotion";

// ── Types ───────────────────────────────────────────────────────────────

export interface TemplateContent {
  readonly headline?: string;
  readonly subtitle?: string;
  readonly ctaText?: string;
  readonly name?: string;
  readonly statNumber?: string;
  readonly tipNumber?: string;
  readonly lessonNumber?: string;
  readonly quote?: string;
  readonly source?: string;
  readonly question?: string;
  readonly answers?: readonly string[];
  readonly caption?: string;
  readonly location?: string;
  readonly specialty?: string;
  readonly featureName?: string;
  readonly description?: string;
  readonly offerValue?: string;
  readonly promoCode?: string;
}

export type TemplateBuilder = (
  platform: PlatformSpec,
  content: TemplateContent
) => FrameNode;

// ── Registry ────────────────────────────────────────────────────────────

const TEMPLATE_BUILDERS: Record<string, TemplateBuilder> = {
  // Success Stories
  "pass-celebration": buildPassCelebration,
  "testimonial-card": buildTestimonialCard,
  "stats-spotlight":  buildStatsSpotlight,
  // Education
  "driving-tip":     buildDrivingTip,
  "edt-lesson":      buildEdtLesson,
  "did-you-know":    buildDidYouKnow,
  // Entertainment
  "meme-card":       buildMemeCard,
  "quiz-poll":       buildQuizPoll,
  // Behind the Scenes
  "instructor-feature": buildInstructorFeature,
  "platform-update":    buildPlatformUpdate,
  // Promotion
  "bold-cta":          buildBoldCta,
  "special-offer":     buildSpecialOffer,
  "booking-reminder":  buildBookingReminder,
};

/**
 * Build a template by ID for a given platform and content
 */
export function buildTemplate(
  templateId: string,
  platform: PlatformSpec,
  content: TemplateContent
): FrameNode {
  const builder = TEMPLATE_BUILDERS[templateId];
  if (!builder) {
    throw new Error(`Unknown template: ${templateId}`);
  }
  return builder(platform, content);
}
