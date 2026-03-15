// Pre-written, fun, engaging content for all 13 templates
// Each template has multiple content options — randomly selected at generation time

import { TemplateContent } from "./templates/registry";

interface ContentOption {
  readonly content: TemplateContent;
}

// Deterministic random from a seed (for shuffle consistency within a session)
let contentSeed = Date.now() % 10000;
function rand(): number {
  contentSeed = (contentSeed * 1103515245 + 12345) & 0x7fffffff;
  return contentSeed / 0x7fffffff;
}

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

// ── Pass Celebration ────────────────────────────────────────────────────

const PASS_CELEBRATION: readonly ContentOption[] = [
  { content: { headline: "Congratulations Sarah!", name: "Sarah", subtitle: "First-time pass — what a legend! 🏆", location: "Tallaght" } },
  { content: { headline: "Congratulations Oisín!", name: "Oisín", subtitle: "Nailed it on the first attempt! 🎉", location: "Raheny" } },
  { content: { headline: "Congratulations Aoife!", name: "Aoife", subtitle: "From L-plates to freedom! 🚗💨", location: "Finglas" } },
  { content: { headline: "Congratulations James!", name: "James", subtitle: "Another Drivzu success story! ⭐", location: "Churchtown" } },
  { content: { headline: "Congratulations Niamh!", name: "Niamh", subtitle: "Zero faults on reversing — absolute hero! 🌟", location: "Swords" } },
];

// ── Testimonial Card ────────────────────────────────────────────────────

const TESTIMONIAL_CARD: readonly ContentOption[] = [
  { content: { quote: "I was so nervous before my test, but my Drivzu instructor made me feel completely prepared. Passed first time!", name: "Emma K.", subtitle: "First-Time Passer" } },
  { content: { quote: "Booking lessons used to be a nightmare. With Drivzu, I just pick a time and go. So simple!", name: "Cian M.", subtitle: "Drivzu Learner" } },
  { content: { quote: "My instructor was patient, professional, and actually made learning to drive fun. Can't recommend enough!", name: "Saoirse O'B.", subtitle: "Passed Dec 2025" } },
  { content: { quote: "After failing with another school, Drivzu got me test-ready in 6 weeks. Game changer!", name: "Ryan D.", subtitle: "Second-Time Lucky" } },
  { content: { quote: "The app made tracking my EDT lessons so easy. Always knew exactly where I was in the process.", name: "Méabh L.", subtitle: "EDT Graduate" } },
];

// ── Stats Spotlight ─────────────────────────────────────────────────────

const STATS_SPOTLIGHT: readonly ContentOption[] = [
  { content: { statNumber: "94%", headline: "First-Time Pass Rate", subtitle: "Our learners pass first time at nearly double the national average" } },
  { content: { statNumber: "4.9★", headline: "Average Instructor Rating", subtitle: "Based on 2,000+ verified reviews from real students" } },
  { content: { statNumber: "12K+", headline: "Lessons Booked This Month", subtitle: "Ireland's fastest-growing driving lesson platform" } },
  { content: { statNumber: "30 sec", headline: "Average Booking Time", subtitle: "From opening the app to confirmed lesson — that's all it takes" } },
  { content: { statNumber: "500+", headline: "Certified Instructors", subtitle: "Every instructor is RSA-approved and background-checked" } },
];

// ── Driving Tip ─────────────────────────────────────────────────────────

const DRIVING_TIP: readonly ContentOption[] = [
  { content: { tipNumber: "1", headline: "The 2-Second Rule", subtitle: "Pick a fixed point ahead. When the car in front passes it, count 'one thousand, two thousand.' If you pass it before finishing, you're too close!" } },
  { content: { tipNumber: "2", headline: "Mirror-Signal-Manoeuvre", subtitle: "Before ANY manoeuvre: check mirrors, signal your intentions, then make the move. This sequence is tested on every driving test!" } },
  { content: { tipNumber: "3", headline: "Roundabout Confidence", subtitle: "Approach slowly, yield to traffic from the right, and choose your lane early. Don't panic — take the roundabout at your own pace." } },
  { content: { tipNumber: "4", headline: "Night Driving: Dip Your Lights", subtitle: "When you see oncoming headlights, dip yours immediately. Full beam can blind other drivers for up to 3 seconds!" } },
  { content: { tipNumber: "5", headline: "Perfect Your Hill Start", subtitle: "Find the biting point, check mirrors, release handbrake smoothly. Practice on quiet hills until it becomes second nature." } },
];

// ── EDT Lesson Spotlight ────────────────────────────────────────────────

const EDT_LESSON: readonly ContentOption[] = [
  { content: { lessonNumber: "1", headline: "Vehicle Controls & Cockpit Drill", subtitle: "Adjusting mirrors correctly|Understanding dashboard instruments|Steering wheel grip & pedal control|Starting and stopping safely" } },
  { content: { lessonNumber: "3", headline: "Correct Positioning & Turning", subtitle: "Road positioning for turns|Reading road markings|Left and right turn technique|Judging gaps in traffic" } },
  { content: { lessonNumber: "6", headline: "Roundabouts Made Easy", subtitle: "Choosing the correct lane|Yielding to traffic on your right|Signalling on roundabouts|Multi-lane roundabout confidence" } },
  { content: { lessonNumber: "9", headline: "Driving in Traffic", subtitle: "Lane discipline in heavy traffic|Safe following distance|Anticipating other drivers|Merging and changing lanes" } },
  { content: { lessonNumber: "12", headline: "Test Preparation", subtitle: "Mock test route practice|Common test centre routes|Managing test-day nerves|Final checklist before the big day" } },
];

// ── Did You Know? ───────────────────────────────────────────────────────

const DID_YOU_KNOW: readonly ContentOption[] = [
  { content: { headline: "You need 12 mandatory EDT lessons before you can even apply for your driving test in Ireland!", source: "RSA.ie" } },
  { content: { headline: "The average Irish learner takes 42 hours of practice to pass their test — that's about 6 months of weekly lessons!", source: "RSA Annual Report 2025" } },
  { content: { headline: "Learner drivers must display L-plates at all times. Forgetting them can result in a €120 fine!", source: "Road Traffic Act" } },
  { content: { headline: "Ireland's driving test has a 52% pass rate — nearly half of all candidates fail on their first attempt!", source: "RSA Statistics 2025" } },
  { content: { headline: "You must hold your N-plate (Novice) for 2 full years after passing. It's not just advice — it's the law!", source: "RSA.ie" } },
];

// ── Relatable Moment (Meme) ─────────────────────────────────────────────

const MEME_CARD: readonly ContentOption[] = [
  { content: { headline: "When the instructor says 'just relax' but you're gripping the steering wheel like it owes you money 😤", subtitle: "Every learner driver knows this feeling..." } },
  { content: { headline: "Me checking my mirrors for the 47th time on a straight road with zero traffic 👀", subtitle: "Better safe than sorry..." } },
  { content: { headline: "That moment when you perfectly parallel park and nobody is around to witness your greatness 😭", subtitle: "The driving struggle is real" } },
  { content: { headline: "POV: Your instructor hits the dual brake and you haven't even seen the hazard yet 🫣", subtitle: "Trust the process..." } },
  { content: { headline: "When someone asks 'how's the driving going?' and you stalled 3 times this morning ☕", subtitle: "We've all been there" } },
];

// ── Quiz / Poll ─────────────────────────────────────────────────────────

const QUIZ_POLL: readonly ContentOption[] = [
  { content: { question: "What's the speed limit in a residential area in Ireland?", answers: ["30 km/h", "50 km/h", "60 km/h", "80 km/h"] } },
  { content: { question: "When should you use your hazard warning lights?", answers: ["In heavy rain", "When broken down", "When double parking", "In a car wash"] } },
  { content: { question: "What does a flashing amber light at a pelican crossing mean?", answers: ["Stop immediately", "Speed up to pass", "Yield to pedestrians", "Ignore it completely"] } },
  { content: { question: "How far from a junction should you start indicating?", answers: ["5 metres", "15 metres", "30 metres", "50 metres"] } },
  { content: { question: "What's the minimum tyre tread depth legal in Ireland?", answers: ["0.6 mm", "1.0 mm", "1.6 mm", "2.0 mm"] } },
];

// ── Instructor Feature ──────────────────────────────────────────────────

const INSTRUCTOR_FEATURE: readonly ContentOption[] = [
  { content: { name: "Paul Murphy", location: "Dublin South", specialty: "Automatic & Manual · 98% Pass Rate" } },
  { content: { name: "Siobhán Kelly", location: "Dublin North", specialty: "Nervous Drivers Specialist · EDT Expert" } },
  { content: { name: "Marcus O'Brien", location: "Cork City", specialty: "Test Prep · Weekend Availability" } },
  { content: { name: "Aisling Doyle", location: "Galway", specialty: "Young Drivers · Motorway Coaching" } },
  { content: { name: "Tomás Brennan", location: "Limerick", specialty: "Manual Only · 15 Years Experience" } },
];

// ── Platform Update ─────────────────────────────────────────────────────

const PLATFORM_UPDATE: readonly ContentOption[] = [
  { content: { featureName: "Instant Booking", description: "Book your next lesson in under 30 seconds. Choose your instructor, pick a time slot, confirm — done! No more phone tag." } },
  { content: { featureName: "Progress Tracker", description: "See exactly where you are in your EDT journey. Track completed lessons, upcoming bookings, and your path to test day." } },
  { content: { featureName: "Rate Your Lesson", description: "After every lesson, rate your experience and leave feedback. Help us match you with the perfect instructor." } },
  { content: { featureName: "Family Dashboard", description: "Parents can now track their teen's driving progress, upcoming lessons, and instructor feedback — all in one place." } },
];

// ── Bold CTA ────────────────────────────────────────────────────────────

const BOLD_CTA: readonly ContentOption[] = [
  { content: { headline: "Your Driving Journey\nStarts Here", subtitle: "Professional instructors. Flexible scheduling. First-time pass guarantee.", ctaText: "Book Your First Lesson" } },
  { content: { headline: "Stop Waiting.\nStart Driving.", subtitle: "500+ certified instructors across Ireland. Book in 30 seconds.", ctaText: "Get Started Free" } },
  { content: { headline: "Learn to Drive\nWith Confidence", subtitle: "Ireland's highest-rated driving lesson platform. 4.9★ from 2,000+ reviews.", ctaText: "Book at drivzu.ie" } },
  { content: { headline: "Ready to Pass\nFirst Time?", subtitle: "94% of our students pass on their first attempt. Join them.", ctaText: "Start Learning Today" } },
];

// ── Special Offer ───────────────────────────────────────────────────────

const SPECIAL_OFFER: readonly ContentOption[] = [
  { content: { offerValue: "20% OFF", headline: "Your First 3 Lessons", promoCode: "NEWDRIVER" } },
  { content: { offerValue: "€10 OFF", headline: "Any Lesson This Week", promoCode: "WEEKDEAL" } },
  { content: { offerValue: "FREE", headline: "First Lesson — No Strings", promoCode: "TRYDRIVZU" } },
  { content: { offerValue: "2 FOR 1", headline: "Bring a Friend, Both Learn", promoCode: "BRINGMATE" } },
];

// ── Booking Reminder ────────────────────────────────────────────────────

const BOOKING_REMINDER: readonly ContentOption[] = [
  { content: { headline: "Your Next Lesson\nIs Waiting!", subtitle: "Don't let your skills go rusty. Book your next session in seconds.", ctaText: "Book Now" } },
  { content: { headline: "Haven't Driven\nIn a While?", subtitle: "Getting back behind the wheel is easier than you think. We'll ease you in.", ctaText: "Resume Learning" } },
  { content: { headline: "Test Day Is\nCloser Than You Think!", subtitle: "Stay on track with regular lessons. Consistency is the secret to passing.", ctaText: "Book This Week" } },
];

// ── Master Registry ─────────────────────────────────────────────────────

const CONTENT_REGISTRY: Record<string, readonly ContentOption[]> = {
  "pass-celebration":    PASS_CELEBRATION,
  "testimonial-card":    TESTIMONIAL_CARD,
  "stats-spotlight":     STATS_SPOTLIGHT,
  "driving-tip":         DRIVING_TIP,
  "edt-lesson":          EDT_LESSON,
  "did-you-know":        DID_YOU_KNOW,
  "meme-card":           MEME_CARD,
  "quiz-poll":           QUIZ_POLL,
  "instructor-feature":  INSTRUCTOR_FEATURE,
  "platform-update":     PLATFORM_UPDATE,
  "bold-cta":            BOLD_CTA,
  "special-offer":       SPECIAL_OFFER,
  "booking-reminder":    BOOKING_REMINDER,
};

/**
 * Get a random content option for a template.
 * Merges with any user-provided overrides.
 */
export function getContent(templateId: string, userContent?: TemplateContent): TemplateContent {
  const options = CONTENT_REGISTRY[templateId];
  if (!options || options.length === 0) {
    return userContent ?? { headline: "" };
  }

  const base = pickRandom(options).content;

  // If user provided content, merge (user overrides defaults)
  if (userContent) {
    const merged: Record<string, unknown> = {};
    const baseAny = base as Record<string, unknown>;
    const userAny = userContent as Record<string, unknown>;
    for (const key in baseAny) {
      merged[key] = baseAny[key];
    }
    for (const key in userAny) {
      const val = userAny[key];
      if (val !== undefined && val !== null && val !== "") {
        merged[key] = val;
      }
    }
    return merged as unknown as TemplateContent;
  }

  return base;
}

/**
 * Get all content options for a template (for UI preview)
 */
export function getAllContent(templateId: string): readonly TemplateContent[] {
  const options = CONTENT_REGISTRY[templateId];
  return options ? options.map(o => o.content) : [];
}
