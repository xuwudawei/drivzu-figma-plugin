// Launch-ready content for all 51 templates
// Authentic copy for a brand-new Irish driving lesson booking platform
// Each template has multiple options — shuffled at generation time

import { TemplateContent } from "./templates/registry";

interface ContentOption {
  readonly content: TemplateContent;
}

let contentSeed = Date.now() % 10000;
function rand(): number {
  contentSeed = (contentSeed * 1103515245 + 12345) & 0x7fffffff;
  return contentSeed / 0x7fffffff;
}

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

// ═══════════════════════════════════════════════════════════════════════
// CELEBRATIONS (7)
// ═══════════════════════════════════════════════════════════════════════

const PASS_CELEBRATION: readonly ContentOption[] = [
  { content: { headline: "SHE PASSED!", name: "Sarah", subtitle: "First attempt. Zero drama. Absolute legend.", location: "Tallaght" } },
  { content: { headline: "OISÍN DID IT!", name: "Oisín", subtitle: "Nailed it first time. The roads aren't ready.", location: "Raheny" } },
  { content: { headline: "AOIFE'S FREE!", name: "Aoife", subtitle: "L-plates off. Full licence on. Let's go.", location: "Finglas" } },
  { content: { headline: "PASSED TODAY!", name: "James", subtitle: "From nervous wreck to test-day hero in 10 weeks.", location: "Churchtown" } },
  { content: { headline: "GET IN, NIAMH!", name: "Niamh", subtitle: "Zero faults on reversing. Examiners were impressed.", location: "Swords" } },
];

const ACHIEVEMENT_UNLOCKED: readonly ContentOption[] = [
  { content: { headline: "EDT COMPLETE", subtitle: "All 12 lessons done. Test day is booked. Let's have it." } },
  { content: { headline: "PERFECT SCORE", subtitle: "Zero faults on the driving test. That's not luck — that's preparation." } },
  { content: { headline: "NIGHT DRIVING: UNLOCKED", subtitle: "Mastered the roads after dark. No conditions can stop this one." } },
  { content: { headline: "FIRST SOLO DRIVE", subtitle: "No instructor. No L-plates. Just you and the open road." } },
];

const MILESTONE_REACHED: readonly ContentOption[] = [
  { content: { statNumber: "100", headline: "First 100 Learners", subtitle: "We said we'd help Ireland drive better. This is just the start." } },
  { content: { statNumber: "1,000", headline: "Lessons Booked", subtitle: "One thousand lessons booked through Drivzu. Each one a step closer to freedom." } },
  { content: { statNumber: "50+", headline: "Instructors Nationwide", subtitle: "RSA-approved instructors across Dublin, Cork, Galway, and growing." } },
  { content: { statNumber: "DAY 1", headline: "We're Live", subtitle: "Drivzu just launched. Ireland's newest way to book driving lessons." } },
];

const WELCOME_ABOARD: readonly ContentOption[] = [
  { content: { name: "You", headline: "Welcome to Drivzu", subtitle: "Book a lesson. Pass your test. It's really that simple." } },
  { content: { name: "Learners", headline: "You're In", subtitle: "First lesson booked. Your driving journey starts now." } },
  { content: { name: "Ireland", headline: "Hey Ireland, We're Here", subtitle: "A better way to book driving lessons. About time, right?" } },
];

const BIRTHDAY_WISH: readonly ContentOption[] = [
  { content: { name: "Everyone", headline: "Happy Birthday!", subtitle: "May your year be full of green lights and empty car parks." } },
  { content: { name: "Our Learners", headline: "Birthday Treat Inside", subtitle: "Check your inbox — we've got a little something for you." } },
  { content: { name: "17-Year-Olds", headline: "You Can FINALLY Learn to Drive", subtitle: "Happy birthday. Now let's get you behind the wheel." } },
];

const ANNIVERSARY: readonly ContentOption[] = [
  { content: { headline: "One Month of Drivzu", subtitle: "We launched 30 days ago. Here's what happened." } },
  { content: { headline: "One Year Driving!", subtitle: "It's been a year since you passed. How's the freedom?" } },
  { content: { headline: "Already?!", subtitle: "Time flies when you're not waiting on hold to book a lesson." } },
];

const STUDENT_SPOTLIGHT: readonly ContentOption[] = [
  { content: { name: "Roisín B.", headline: "Star Learner", subtitle: "Nervous beginner to confident driver in 8 weeks. Her words: 'I actually enjoy driving now.'" } },
  { content: { name: "Conor W.", headline: "Most Improved", subtitle: "Stalled every lesson for the first month. Parallel parked like a pro by the end." } },
  { content: { name: "Amara O.", headline: "EDT Champion", subtitle: "Completed all 12 lessons ahead of schedule. Test booked and ready." } },
];

// ═══════════════════════════════════════════════════════════════════════
// EDUCATION (8)
// ═══════════════════════════════════════════════════════════════════════

const DRIVING_TIP: readonly ContentOption[] = [
  { content: { tipNumber: "1", headline: "The 2-Second Rule", subtitle: "Car ahead passes a fixed point. Count 'one thousand, two thousand.' If you pass it before you finish, you're too close." } },
  { content: { tipNumber: "2", headline: "Mirror-Signal-Manoeuvre", subtitle: "Every. Single. Time. Check mirrors, signal, then move. This is tested on every driving test in Ireland." } },
  { content: { tipNumber: "3", headline: "Roundabouts Are Not Scary", subtitle: "Slow approach, yield to the right, pick your lane early. Don't panic — go at your own pace." } },
  { content: { tipNumber: "4", headline: "Dip Your Lights", subtitle: "See oncoming headlights? Dip yours. Full beam blinds other drivers for up to 3 seconds." } },
  { content: { tipNumber: "5", headline: "Hill Start Confidence", subtitle: "Find the biting point. Check mirrors. Release handbrake. Smooth. Practice on quiet hills until it's muscle memory." } },
];

const EDT_LESSON: readonly ContentOption[] = [
  { content: { lessonNumber: "1", headline: "Controls & Cockpit Drill", subtitle: "Mirrors, dashboard, steering, pedals — your first time behind the wheel starts here." } },
  { content: { lessonNumber: "3", headline: "Positioning & Turning", subtitle: "Where to sit on the road, how to read markings, turning left and right with confidence." } },
  { content: { lessonNumber: "6", headline: "Roundabouts Made Simple", subtitle: "Lane choice, yielding, signalling — the lesson that makes roundabouts click." } },
  { content: { lessonNumber: "9", headline: "Driving in Traffic", subtitle: "Lane discipline, safe following distance, merging — real roads, real conditions." } },
  { content: { lessonNumber: "12", headline: "Test Preparation", subtitle: "Mock test routes, common mistakes, managing nerves. This is the one before the big one." } },
];

const DID_YOU_KNOW: readonly ContentOption[] = [
  { content: { headline: "12 EDT lessons are mandatory before you can even sit your driving test in Ireland.", source: "RSA.ie" } },
  { content: { headline: "Nearly half of all Irish learners fail their driving test on the first attempt.", source: "RSA Statistics" } },
  { content: { headline: "Forgetting your L-plates can cost you a €120 fine. Every. Single. Trip.", source: "Road Traffic Act" } },
  { content: { headline: "The average learner needs about 40 hours of practice to be test-ready.", source: "RSA Guidelines" } },
  { content: { headline: "You must keep your N-plates on for 2 full years after passing. It's the law.", source: "RSA.ie" } },
];

const SAFETY_ALERT: readonly ContentOption[] = [
  { content: { headline: "Black Ice Warning", subtitle: "Temps dropping below zero. Slow down, increase distance, no sudden braking." } },
  { content: { headline: "Put the Phone Down", subtitle: "3 penalty points. €120 fine. Not worth the text. Pull over." } },
  { content: { headline: "Seatbelt Check", subtitle: "Every passenger. Every trip. Driver is responsible for all under-17s." } },
  { content: { headline: "Fog = Dipped Headlights", subtitle: "Not full beam. Reduce speed. Keep distance. Fog lights only under 100m visibility." } },
];

const ROAD_RULES: readonly ContentOption[] = [
  { content: { headline: "Yellow Box Junctions", subtitle: "Only enter if your exit is clear. Exception: turning right, blocked only by oncoming traffic." } },
  { content: { headline: "Bus Lanes", subtitle: "Operate during posted hours only. Taxis, cyclists, and motorbikes can also use them." } },
  { content: { headline: "Motorway Limits", subtitle: "120 km/h max. Learner drivers are NOT allowed on motorways — even with an instructor." } },
  { content: { headline: "Zebra Crossings", subtitle: "Pedestrians have right of way. Slow down, be ready to stop, never overtake at a crossing." } },
];

const TEST_PREP: readonly ContentOption[] = [
  { content: { headline: "Top 5 Test Fails", subtitle: "Mirrors before manoeuvres. Roundabout positioning. Junction observation. Speed. Hesitation." } },
  { content: { headline: "What to Bring", subtitle: "Learner permit. Roadworthy car with L-plates. Insurance cert. NCT disc. Your confidence." } },
  { content: { headline: "Do a Mock Test", subtitle: "Drive your test route beforehand. It drops anxiety massively. Ask your instructor." } },
  { content: { headline: "Turnabout Technique", subtitle: "Tested frequently. Check all mirrors, signal, find a safe spot. Accuracy over speed." } },
];

const FAQ_ANSWER: readonly ContentOption[] = [
  { content: { headline: "How many lessons do I need?", subtitle: "12 EDT lessons are mandatory. Most learners do best with 20-30 hours total before the test." } },
  { content: { headline: "Can I pick my instructor?", subtitle: "Yes. Browse profiles, read reviews, book whoever suits you. That's the whole point of Drivzu." } },
  { content: { headline: "What if I fail?", subtitle: "Rebook after 2 weeks. Your instructor reviews the feedback and targets the weak spots. No stress." } },
  { content: { headline: "Automatic or manual?", subtitle: "We have both. Filter by transmission type when you book. Your choice." } },
];

const PRO_TIP: readonly ContentOption[] = [
  { content: { headline: "Smooth = Fast", subtitle: "Gentle inputs, smooth steering, progressive braking. The smoothest drivers are the safest." } },
  { content: { headline: "Talk to Yourself", subtitle: "'Checking mirrors, pedestrian ahead, slowing down.' Commentary driving builds real hazard awareness." } },
  { content: { headline: "Master the Biting Point", subtitle: "5 minutes in a car park. Just find and hold the clutch point. Prevents 80% of stalling." } },
  { content: { headline: "Eyes Up", subtitle: "Stop looking at the bonnet. Look 12 seconds ahead. The car follows your eyes." } },
];

// ═══════════════════════════════════════════════════════════════════════
// SOCIAL PROOF (6)
// ═══════════════════════════════════════════════════════════════════════

const TESTIMONIAL_CARD: readonly ContentOption[] = [
  { content: { quote: "Booked my first lesson in about 20 seconds. Why wasn't this a thing before?", name: "Emma K.", subtitle: "Drivzu Learner" } },
  { content: { quote: "My instructor was class. Patient, sound, actually made me look forward to lessons.", name: "Cian M.", subtitle: "First-Time Passer" } },
  { content: { quote: "I failed with another school. Switched to Drivzu, passed in 6 weeks. Wish I'd found it sooner.", name: "Saoirse O'B.", subtitle: "Passed 2026" } },
  { content: { quote: "No more ringing instructors who never answer. Just book, show up, drive. Simple.", name: "Ryan D.", subtitle: "Drivzu Learner" } },
  { content: { quote: "The app tracking my EDT progress is deadly. Always know exactly where I'm at.", name: "Méabh L.", subtitle: "EDT Learner" } },
];

const STATS_SPOTLIGHT: readonly ContentOption[] = [
  { content: { statNumber: "52%", headline: "of Irish Learners Fail First Time", subtitle: "We're here to change that. Better instructors. Better prep. Better odds." } },
  { content: { statNumber: "30 sec", headline: "To Book a Lesson", subtitle: "Pick an instructor, choose a time, done. No phone calls. No waiting." } },
  { content: { statNumber: "12", headline: "EDT Lessons Required", subtitle: "Before you can sit the test. We make every one count." } },
  { content: { statNumber: "4.9★", headline: "Instructor Rating", subtitle: "Our instructors are hand-picked and reviewed by every single student." } },
  { content: { statNumber: "50+", headline: "Instructors Ready", subtitle: "RSA-approved, background-checked, and ready to help you pass." } },
];

const BEFORE_AFTER: readonly ContentOption[] = [
  { content: { headline: "Week 1 vs Week 8", subtitle: "From stalling at every junction to smooth lane changes. That's what good instruction looks like." } },
  { content: { headline: "Before Drivzu / After Drivzu", subtitle: "Phone calls and no-shows → instant booking and rated instructors. That's the upgrade." } },
  { content: { headline: "First Lesson / Last Lesson", subtitle: "White-knuckle grip on the wheel → cruising with one hand and the radio on." } },
];

const REVIEW_HIGHLIGHT: readonly ContentOption[] = [
  { content: { quote: "The booking system alone is worth switching for. Everything else is a bonus.", name: "Eoin T.", subtitle: "★★★★★" } },
  { content: { quote: "Recommended Drivzu to my sister. She passed first time too. Says it all really.", name: "Alannah R.", subtitle: "★★★★★" } },
  { content: { quote: "Finally a driving school that feels like it was built in this decade.", name: "Jack F.", subtitle: "★★★★★" } },
];

const CASE_STUDY: readonly ContentOption[] = [
  { content: { headline: "From Anxious to Confident", subtitle: "Ciara refused to drive. 10 weeks of patient instruction later, she passed first time." } },
  { content: { headline: "The 6-Week Challenge", subtitle: "Marcus wanted his licence before summer. 3 lessons a week. He got it." } },
  { content: { headline: "New to Ireland, New to Irish Roads", subtitle: "Priya moved from India. Drivzu matched her with an instructor who specialises in international learners." } },
];

const SOCIAL_COUNTER: readonly ContentOption[] = [
  { content: { statNumber: "LIVE", headline: "Drivzu Just Launched", subtitle: "Ireland's newest driving lesson platform is here. Be one of the first." } },
  { content: { statNumber: "GROWING", headline: "Join the Early Crew", subtitle: "New learners signing up every day. Get in early, get the best instructors." } },
  { content: { statNumber: "FREE", headline: "To Sign Up", subtitle: "No subscription. No commitment. Just book lessons when you want them." } },
];

// ═══════════════════════════════════════════════════════════════════════
// ENTERTAINMENT (6)
// ═══════════════════════════════════════════════════════════════════════

const MEME_CARD: readonly ContentOption[] = [
  { content: { headline: "Instructor: 'Just relax'", subtitle: "Me: gripping the wheel like it owes me rent" } },
  { content: { headline: "Me checking mirrors on a straight empty road", subtitle: "For the 47th time. Better safe than sorry." } },
  { content: { headline: "Perfect parallel park. Nobody around to see it.", subtitle: "The driving equivalent of a tree falling in a forest." } },
  { content: { headline: "Instructor hits the dual brake before I even see the hazard", subtitle: "The trust issues start here." } },
  { content: { headline: "'How's the driving going?'", subtitle: "Me, who stalled 3 times this morning: Grand yeah." } },
];

const QUIZ_POLL: readonly ContentOption[] = [
  { content: { question: "Speed limit in a residential area?", answers: ["30 km/h", "50 km/h", "60 km/h", "80 km/h"] } },
  { content: { question: "When should you use hazard lights?", answers: ["Heavy rain", "Broken down", "Double parking", "Never"] } },
  { content: { question: "Flashing amber at a pelican crossing means?", answers: ["Stop", "Speed up", "Yield to pedestrians", "Ignore it"] } },
  { content: { question: "Minimum legal tyre tread depth in Ireland?", answers: ["0.6 mm", "1.0 mm", "1.6 mm", "2.0 mm"] } },
];

const THIS_OR_THAT: readonly ContentOption[] = [
  { content: { headline: "Manual", subtitle: "Automatic" } },
  { content: { headline: "Morning Lessons", subtitle: "Evening Lessons" } },
  { content: { headline: "Country Roads", subtitle: "City Driving" } },
  { content: { headline: "Roundabouts", subtitle: "Parallel Parking" } },
];

const CAPTION_CONTEST: readonly ContentOption[] = [
  { content: { headline: "Caption this driving moment", subtitle: "Best caption wins a free lesson. Drop yours below." } },
  { content: { headline: "What's this driver thinking?", subtitle: "Wrong answers only. Most creative gets featured." } },
  { content: { headline: "Caption this parking job", subtitle: "We've all been there. Give us your best." } },
];

const RELATABLE_MOMENT: readonly ContentOption[] = [
  { content: { headline: "Finding out your test centre has wide roads", subtitle: "Some centres just hit different." } },
  { content: { headline: "Silently judging someone else's parallel park", subtitle: "We're all experts from the passenger seat." } },
  { content: { headline: "When roundabouts finally click", subtitle: "One day it just makes sense and you feel like a genius." } },
];

const FUN_FACT: readonly ContentOption[] = [
  { content: { headline: "Ireland has over 100,000 km of roads — enough to circle the Earth 2.5 times", source: "TII" } },
  { content: { headline: "Ireland's first driving test was introduced in 1964. Before that, anyone could just drive.", source: "Road Traffic Act 1961" } },
  { content: { headline: "The most failed manoeuvre on the Irish test? The turnabout. Practice it.", source: "RSA Examiner Reports" } },
];

// ═══════════════════════════════════════════════════════════════════════
// BEHIND THE SCENES (5)
// ═══════════════════════════════════════════════════════════════════════

const INSTRUCTOR_FEATURE: readonly ContentOption[] = [
  { content: { name: "Paul Murphy", location: "Dublin South", specialty: "Automatic & Manual · Nervous Driver Specialist" } },
  { content: { name: "Siobhán Kelly", location: "Dublin North", specialty: "EDT Expert · Incredible Patience" } },
  { content: { name: "Marcus O'Brien", location: "Cork City", specialty: "Test Prep Pro · Weekend Availability" } },
  { content: { name: "Aisling Doyle", location: "Galway", specialty: "Young Drivers · First-Lesson Specialist" } },
  { content: { name: "Tomás Brennan", location: "Limerick", specialty: "15 Years Experience · Manual Only" } },
];

const PLATFORM_UPDATE: readonly ContentOption[] = [
  { content: { featureName: "Instant Booking", description: "Pick an instructor. Choose a time. Confirmed in seconds. No phone calls ever." } },
  { content: { featureName: "EDT Progress Tracker", description: "See exactly where you are in your 12 EDT lessons. What's done, what's next, when's your test." } },
  { content: { featureName: "Instructor Reviews", description: "Real reviews from real learners. See ratings before you book. No surprises." } },
  { content: { featureName: "Flexible Rescheduling", description: "Life happens. Reschedule your lesson with a tap. No penalty if you give 24 hours notice." } },
];

const DAY_IN_LIFE: readonly ContentOption[] = [
  { content: { headline: "A Day with Instructor Paul", subtitle: "6am start. 8 lessons. 3 test preps. 1 first-time pass celebration. This is the job." } },
  { content: { headline: "Building Drivzu", subtitle: "Late nights, user feedback, constant iteration. Here's what goes into making this work." } },
  { content: { headline: "Test Centre Morning", subtitle: "Nervous energy. Last-minute tips. The moment of truth. Every test morning tells a story." } },
];

const OFFICE_TOUR: readonly ContentOption[] = [
  { content: { headline: "Inside Drivzu HQ", subtitle: "Where we're building Ireland's easiest way to book driving lessons." } },
  { content: { headline: "Where It All Happens", subtitle: "Customer support, app development, instructor onboarding — the team behind the app." } },
  { content: { headline: "Startup Life", subtitle: "Two screens, too much coffee, and a mission to fix driving education in Ireland." } },
];

const MEET_FOUNDER: readonly ContentOption[] = [
  { content: { name: "David", headline: "Why I Built Drivzu", subtitle: "Because booking a driving lesson shouldn't be harder than the lesson itself." } },
  { content: { name: "The Team", headline: "Meet Drivzu", subtitle: "We're learners, drivers, and builders who think Ireland deserves better." } },
];

// ═══════════════════════════════════════════════════════════════════════
// PROMOTION (7)
// ═══════════════════════════════════════════════════════════════════════

const BOLD_CTA: readonly ContentOption[] = [
  { content: { headline: "Book Your First\nDriving Lesson", subtitle: "Professional instructors. Flexible times. Book in 30 seconds.", ctaText: "Start at drivzu.ie" } },
  { content: { headline: "Stop Waiting.\nStart Driving.", subtitle: "Ireland's easiest way to book driving lessons is live.", ctaText: "Book Now" } },
  { content: { headline: "Learn to Drive.\nActually Enjoy It.", subtitle: "Top-rated instructors. Real reviews. No hassle booking.", ctaText: "Try Drivzu Free" } },
  { content: { headline: "Your Licence\nStarts Here", subtitle: "From first lesson to test day — Drivzu has you covered.", ctaText: "Book at drivzu.ie" } },
];

const SPECIAL_OFFER: readonly ContentOption[] = [
  { content: { offerValue: "20% OFF", headline: "Your First Lesson", promoCode: "LAUNCH20" } },
  { content: { offerValue: "€10 OFF", headline: "Any Lesson This Week", promoCode: "EARLYBIRD" } },
  { content: { offerValue: "FREE", headline: "First Lesson on Us", promoCode: "TRYDRIVZU" } },
  { content: { offerValue: "2 FOR 1", headline: "Bring a Friend", promoCode: "BRINGMATE" } },
];

const FLASH_SALE: readonly ContentOption[] = [
  { content: { headline: "Launch Week Sale!", offerValue: "30% OFF", subtitle: "First 100 bookings get 30% off. Use code LAUNCH30." } },
  { content: { headline: "This Weekend Only", offerValue: "€15 OFF", subtitle: "Book a Saturday or Sunday lesson and save. Limited spots." } },
  { content: { headline: "Early Bird Deal", offerValue: "25% OFF", subtitle: "New learners only. Your first 5 lessons at launch pricing." } },
];

const REFERRAL_PROGRAM: readonly ContentOption[] = [
  { content: { headline: "Share Drivzu, Get Rewarded", subtitle: "Refer a friend. You both get €10 off your next lesson.", promoCode: "REFER10" } },
  { content: { headline: "Your Friends Need This Too", subtitle: "Share your link. They get 20% off. You get a free lesson.", promoCode: "TELLAMATE" } },
  { content: { headline: "The More the Merrier", subtitle: "Every friend who books = €15 credit for you. No limit.", promoCode: "DRIVZUFAM" } },
];

const BUNDLE_DEAL: readonly ContentOption[] = [
  { content: { headline: "EDT Complete Bundle", offerValue: "Save €120", subtitle: "All 12 EDT lessons + 2 bonus test prep sessions. Best value going." } },
  { content: { headline: "Starter Pack", offerValue: "Save €50", subtitle: "5 lessons + EDT tracker setup. Perfect for day-one learners." } },
  { content: { headline: "Test-Ready Package", offerValue: "Save €80", subtitle: "8 lessons + mock test + test-day support. Built to pass." } },
];

const SEASONAL_PROMO: readonly ContentOption[] = [
  { content: { headline: "Summer Driving Deal", subtitle: "Long evenings = more practice. Book 5 lessons, get the 6th free." } },
  { content: { headline: "Back to College Special", subtitle: "Freshers — get your licence sorted. Student discount all September." } },
  { content: { headline: "New Year, New Licence", subtitle: "Make this the year. January bookings 20% off." } },
];

const LIMITED_TIME: readonly ContentOption[] = [
  { content: { headline: "Launch Pricing Ends Soon", offerValue: "30% OFF", subtitle: "Early bird rates won't last. Lock in your lessons now." } },
  { content: { headline: "Last Few Spots", offerValue: "€20 OFF", subtitle: "This week's discounted slots are nearly gone. Move fast." } },
  { content: { headline: "Today Only", offerValue: "FREE Lesson", subtitle: "Book today and your second lesson is free. One day only." } },
];

// ═══════════════════════════════════════════════════════════════════════
// ENGAGEMENT (6)
// ═══════════════════════════════════════════════════════════════════════

const QUESTION_OF_DAY: readonly ContentOption[] = [
  { content: { headline: "What was your biggest fear learning to drive?" } },
  { content: { headline: "Manual or automatic — and would you change your choice?" } },
  { content: { headline: "One piece of advice for a brand-new learner?" } },
  { content: { headline: "How many lessons before you felt confident?" } },
];

const FILL_IN_BLANK: readonly ContentOption[] = [
  { content: { headline: "The hardest part of learning to drive was ___" } },
  { content: { headline: "I knew I was ready for my test when ___" } },
  { content: { headline: "My instructor always says ___" } },
  { content: { headline: "The best thing about passing was ___" } },
];

const HOT_TAKE: readonly ContentOption[] = [
  { content: { headline: "Roundabouts are easier than traffic lights. Fight me." } },
  { content: { headline: "Everyone should learn manual first. Even if they'll drive auto." } },
  { content: { headline: "The driving test should include motorway driving." } },
  { content: { headline: "Parallel parking is the most overrated skill on the test." } },
];

const DEBATE: readonly ContentOption[] = [
  { content: { headline: "Morning vs Evening Lessons", subtitle: "Early birds say quieter roads. Night owls say they're more alert. Who's right?" } },
  { content: { headline: "Instructor's Car vs Your Own", subtitle: "Familiar car or dual controls? The eternal learner debate." } },
  { content: { headline: "Theory First vs Practical First", subtitle: "Learn the rules first or get behind the wheel ASAP?" } },
];

const STORY_TIME: readonly ContentOption[] = [
  { content: { headline: "My Test Day", subtitle: "Turned up an hour early. Sat in the car park. Listened to calming music. Passed first time." } },
  { content: { headline: "The Lesson It Clicked", subtitle: "Lesson 7. Instructor said 'trust the car.' Suddenly roundabouts made sense." } },
  { content: { headline: "First Solo Drive", subtitle: "Just me, my music, and the open road. That's freedom." } },
];

const THROWBACK: readonly ContentOption[] = [
  { content: { headline: "Remember Your First Lesson?", subtitle: "Sweaty palms. Nervous laugh. Relief when it was over. We all started somewhere." } },
  { content: { headline: "L-Plate Days", subtitle: "When L-plates felt like a badge of shame. Now they're a badge of progress." } },
  { content: { headline: "Before You Could Drive", subtitle: "Waiting for lifts. Missing the bus. Depending on everyone else. Never again." } },
];

// ═══════════════════════════════════════════════════════════════════════
// ANNOUNCEMENTS (6)
// ═══════════════════════════════════════════════════════════════════════

const NEW_FEATURE: readonly ContentOption[] = [
  { content: { headline: "Instant Booking is Live", subtitle: "No more phone calls. No more waiting. Book your lesson in 30 seconds flat." } },
  { content: { headline: "Instructor Reviews Are Here", subtitle: "See real ratings from real learners before you book. Full transparency." } },
  { content: { headline: "EDT Tracker Launched", subtitle: "Track your 12 EDT lessons, see what's done, know what's next. All in the app." } },
];

const COMING_SOON: readonly ContentOption[] = [
  { content: { headline: "Something Big Is Coming", subtitle: "We're building something that'll change how Ireland learns to drive. Stay tuned." } },
  { content: { headline: "New Cities Loading...", subtitle: "Dublin was just the start. Where should Drivzu go next? Tell us." } },
  { content: { headline: "App Update Incoming", subtitle: "Faster booking. Smarter matching. Better everything. Dropping soon." } },
];

const LAUNCH_DAY: readonly ContentOption[] = [
  { content: { headline: "Drivzu Is Live!", subtitle: "Ireland's newest way to book driving lessons. We're here and we're ready." } },
  { content: { headline: "We Just Launched", subtitle: "After months of building, testing, and perfecting — Drivzu is officially live." } },
  { content: { headline: "It's Go Time", subtitle: "Book your first lesson at drivzu.ie. The easiest booking experience in Ireland." } },
];

const EVENT_INVITE: readonly ContentOption[] = [
  { content: { headline: "Free Road Safety Webinar", subtitle: "Live Q&A with RSA-approved instructors this Saturday. All learners welcome." } },
  { content: { headline: "Drivzu Launch Event", subtitle: "Meet instructors, see the app in action, grab launch discounts. This Saturday." } },
  { content: { headline: "Learner Meetup", subtitle: "Connect with fellow learners, share tips, hear from recent passers. Free food included." } },
];

const PRESS_RELEASE: readonly ContentOption[] = [
  { content: { headline: "Drivzu Officially Launches", subtitle: "Ireland's newest driving lesson platform goes live. Book at drivzu.ie." } },
  { content: { headline: "A Better Way to Learn to Drive", subtitle: "Drivzu launches to fix the broken driving lesson booking experience in Ireland." } },
  { content: { headline: "Drivzu Partners with RSA Instructors", subtitle: "Every instructor on the platform is RSA-approved and background-checked." } },
];

const PARTNERSHIP: readonly ContentOption[] = [
  { content: { headline: "Instructor Partnership", subtitle: "RSA-approved instructors: join Drivzu and fill your calendar. We handle the bookings." } },
  { content: { headline: "Student Driving Packages", subtitle: "College students get exclusive rates on Drivzu. University partnerships launching now." } },
  { content: { headline: "Insurance Partner Deal", subtitle: "Pass with Drivzu, get a discount on your first year of car insurance. Details at drivzu.ie" } },
];

const BOOKING_REMINDER: readonly ContentOption[] = [
  { content: { headline: "Your Next Lesson\nIs One Tap Away", subtitle: "Don't let your skills go cold. Book your next session now.", ctaText: "Book Now" } },
  { content: { headline: "Been a While?", subtitle: "Getting back behind the wheel is easier than you think. We'll ease you in.", ctaText: "Book a Lesson" } },
  { content: { headline: "Test Day Won't\nWait Forever", subtitle: "Stay consistent. Regular lessons are the secret to passing.", ctaText: "Book This Week" } },
];

// ═══════════════════════════════════════════════════════════════════════
// MASTER REGISTRY
// ═══════════════════════════════════════════════════════════════════════

const CUSTOM_POST: readonly ContentOption[] = [
  { content: { headline: "Your Custom Post", subtitle: "Describe your idea and AI will design it for you." } },
];

const CONTENT_REGISTRY: Record<string, readonly ContentOption[]> = {
  "custom-post":            CUSTOM_POST,
  "pass-celebration":       PASS_CELEBRATION,
  "achievement-unlocked":   ACHIEVEMENT_UNLOCKED,
  "milestone-reached":      MILESTONE_REACHED,
  "welcome-aboard":         WELCOME_ABOARD,
  "birthday-wish":          BIRTHDAY_WISH,
  "anniversary":            ANNIVERSARY,
  "student-spotlight":      STUDENT_SPOTLIGHT,
  "driving-tip":            DRIVING_TIP,
  "edt-lesson":             EDT_LESSON,
  "did-you-know":           DID_YOU_KNOW,
  "safety-alert":           SAFETY_ALERT,
  "road-rules":             ROAD_RULES,
  "test-prep":              TEST_PREP,
  "faq-answer":             FAQ_ANSWER,
  "pro-tip":                PRO_TIP,
  "testimonial-card":       TESTIMONIAL_CARD,
  "stats-spotlight":        STATS_SPOTLIGHT,
  "before-after":           BEFORE_AFTER,
  "review-highlight":       REVIEW_HIGHLIGHT,
  "case-study":             CASE_STUDY,
  "social-counter":         SOCIAL_COUNTER,
  "meme-card":              MEME_CARD,
  "quiz-poll":              QUIZ_POLL,
  "this-or-that":           THIS_OR_THAT,
  "caption-contest":        CAPTION_CONTEST,
  "relatable-moment":       RELATABLE_MOMENT,
  "fun-fact":               FUN_FACT,
  "instructor-feature":     INSTRUCTOR_FEATURE,
  "platform-update":        PLATFORM_UPDATE,
  "day-in-life":            DAY_IN_LIFE,
  "office-tour":            OFFICE_TOUR,
  "meet-founder":           MEET_FOUNDER,
  "bold-cta":               BOLD_CTA,
  "special-offer":          SPECIAL_OFFER,
  "flash-sale":             FLASH_SALE,
  "referral-program":       REFERRAL_PROGRAM,
  "bundle-deal":            BUNDLE_DEAL,
  "seasonal-promo":         SEASONAL_PROMO,
  "limited-time":           LIMITED_TIME,
  "question-of-day":        QUESTION_OF_DAY,
  "fill-in-blank":          FILL_IN_BLANK,
  "hot-take":               HOT_TAKE,
  "debate":                 DEBATE,
  "story-time":             STORY_TIME,
  "throwback":              THROWBACK,
  "new-feature":            NEW_FEATURE,
  "coming-soon":            COMING_SOON,
  "launch-day":             LAUNCH_DAY,
  "event-invite":           EVENT_INVITE,
  "press-release":          PRESS_RELEASE,
  "partnership":            PARTNERSHIP,
  "booking-reminder":       BOOKING_REMINDER,
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
