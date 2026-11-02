/* ============================================================
   Workout plan data
   ------------------------------------------------------------
   Current schedule: one calendar, Sunday November 1 through
   Monday November 30, 2026. Weekly pattern: Sunday rest, Monday
   Dance, Tuesday Strength, Wednesday Pilates/Barre (reset),
   Thursday Cardio/Full Body, Friday Abs/Core, Saturday rest,
   with some day-to-day variation based on whatever videos are
   available.

   Weeks run Sunday through Saturday (the U.S. calendar
   convention), so each week's anchor day is a Sunday.

   The calendar only displays days between PLAN_START_DATE and
   PLAN_END_DATE (inclusive); js/calendar.js skips rendering any
   day outside that range, so the final week block (which would
   otherwise run into December) stops cleanly at November 30.

   To extend the plan past November 30, move PLAN_END_DATE
   forward and add the new days/weeks; the calendar renders from
   this data automatically, dates included. By default a week's
   Sunday is computed from PLAN_START_DATE plus 7 days per week
   number, assuming no gaps. If there's a gap (a stretch with no
   scheduled activity), give that week an explicit `startDate`
   (YYYY-MM-DD, its Sunday) instead of relying on the week number;
   that overrides the automatic calculation for that week only.

   For a one-off non-workout day that isn't a weekend rest day (a
   holiday, an optional independent reset), use
   { off: true, label: "...", note: "..." } instead of a video
   entry or REST.

   If a video's owner has disabled embedding (shows as YouTube
   "Error 153" in the modal), add `noEmbed: true` to that video's
   entry; the modal then skips the iframe entirely and shows a
   "watch on YouTube" link instead, and the day card's hint text
   changes to match.
   ============================================================ */

// Sunday of Week 1, in YYYY-MM-DD form.
const PLAN_START_DATE = "2026-11-01";

// Last date the calendar should display (inclusive), in YYYY-MM-DD form.
const PLAN_END_DATE = "2026-11-30";

const WEEKDAY_ORDER = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// type -> controls the pill color (see css `.cat-*` classes)
// category -> the label actually shown on the card
const VIDEOS = {
  joDanceBrunoMars: { type: "dance", category: "Grow with Jo Dance", videoId: "hjW2YqViE0M", title: "Bruno Mars Beginner Dance Party" },
  joStrengthPilatesAbs: { type: "strength", category: "Grow with Jo Strength", videoId: "H4ynOuuT8w4", title: "Full-Body Dumbbell Strength and Standing Pilates Abs" },

  // November 2026 lineup (confirmed schedule).
  joReggaetonLowImpact: { type: "dance", category: "Grow with Jo Dance", videoId: "SUZSmgYJN8U", title: "Reggaeton Dance Party (Low Impact)" },
  youfirstLondonFullBodyTabata: { type: "cardio", category: "You1stLondon Cardio", videoId: "_iRmFwh3KlU", title: "20-Minute Full Body Tabata HIIT" },
  joDay1FullBody: { type: "strength", category: "Grow with Jo Strength", videoId: "tHlsF-ZBhEE", title: "Full Body Cardio & Weights (Day 1)" },
  joBeginnerPilatesWalk: { type: "pilates", category: "Grow with Jo Pilates", videoId: "3-Obdk1jjjQ", title: "Beginner Pilates Walk" },
  eleniFitFullBody: { type: "cardio", category: "Eleni Fit Cardio", videoId: "jFg0KkNuA70", title: "20-Minute Standing Full Body Workout for Beginners" },
  youfirstLondonBeginnerAbs: { type: "cardio", category: "You1stLondon Cardio", videoId: "DWqyEIdfhF0", title: "20-Minute Standing Abs (Beginner Friendly)" },
  afroleticsDance: { type: "dance", category: "Afroletics Dance", videoId: "WPq685nPIiY", title: "25-Minute Afro Dance Cardio" },
  youfirstLondonStandingAbs2: { type: "cardio", category: "You1stLondon Cardio", videoId: "ayA3MayxRh0", title: "20-Minute Standing Abs Workout" },
  eleniFitCardioAbs: { type: "cardio", category: "Eleni Fit Cardio", videoId: "C3oS4M2T04k", title: "30-Minute Standing Cardio Abs", note: "No jumping, no squats." },
  upToTheBeatYogaColdplay: { type: "yoga", category: "Up to the BEat Fit Yoga", videoId: "c7E1UJoYGA8", title: "Standing Yoga Flow (Coldplay Hits)" },
  seniorShapeBarre: { type: "pilates", category: "SeniorShape Barre", videoId: "FjKP298SV68", title: "Total Body Barre Workout (No Equipment)" },
  popsugarBollywoodDance: { type: "dance", category: "POPSUGAR Dance", videoId: "2TtctR6OlvQ", title: "30-Minute Bollywood Dance Cardio (with Kavita Rao)" },
  growwithjoStrengthVol2: { type: "strength", category: "Grow with Jo Strength", videoId: "VzwFkiZFjQo", title: "Strength, Core & Cardio (20-10-5 Method)" },
  taraAfroPilates: { type: "pilates", category: "Tara's Body Pilates", videoId: "lvXnwDcbbaY", title: "Afro Pilates: Core, Legs & Full Body (Low Impact)" },
  youfirstLondonFullBodyTabata2: { type: "cardio", category: "You1stLondon Cardio", videoId: "9envibSXSBQ", title: "20-Minute Full Body Tabata" },
  popsugarBoxingDance: { type: "dance", category: "POPSUGAR Dance", videoId: "PCbtJB2gs2U", title: "Boxing-Inspired Dance Workout (15 Minutes)" },
  growwithjoStrength20Min: { type: "strength", category: "Grow with Jo Strength", videoId: "hXBE20_RGfU", title: "20-Minute Strength Training" }
};

const REST = { rest: true };

const WEEKS = [
  {
    week: 1,
    title: "November 1 to 7",
    startDate: "2026-11-01",
    days: {
      Sunday: REST,
      Monday: { ...VIDEOS.joReggaetonLowImpact },
      Tuesday: { ...VIDEOS.joDay1FullBody },
      Wednesday: { ...VIDEOS.seniorShapeBarre },
      Thursday: { ...VIDEOS.eleniFitFullBody },
      Friday: { ...VIDEOS.youfirstLondonBeginnerAbs },
      Saturday: REST
    }
  },
  {
    week: 2,
    title: "November 8 to 14",
    startDate: "2026-11-08",
    days: {
      Sunday: REST,
      Monday: { ...VIDEOS.popsugarBollywoodDance },
      Tuesday: { ...VIDEOS.joStrengthPilatesAbs },
      Wednesday: { ...VIDEOS.upToTheBeatYogaColdplay },
      Thursday: { ...VIDEOS.youfirstLondonFullBodyTabata },
      Friday: { ...VIDEOS.youfirstLondonStandingAbs2 },
      Saturday: REST
    }
  },
  {
    week: 3,
    title: "November 15 to 21",
    startDate: "2026-11-15",
    days: {
      Sunday: REST,
      Monday: { ...VIDEOS.afroleticsDance },
      Tuesday: { ...VIDEOS.growwithjoStrengthVol2 },
      Wednesday: { ...VIDEOS.taraAfroPilates },
      Thursday: { ...VIDEOS.youfirstLondonFullBodyTabata2 },
      Friday: { ...VIDEOS.eleniFitCardioAbs },
      Saturday: REST
    }
  },
  {
    week: 4,
    title: "November 22 to 28 (Thanksgiving week)",
    startDate: "2026-11-22",
    days: {
      Sunday: REST,
      Monday: { ...VIDEOS.popsugarBoxingDance },
      Tuesday: { ...VIDEOS.growwithjoStrength20Min },
      Wednesday: { ...VIDEOS.joBeginnerPilatesWalk },
      Thursday: { off: true, label: "Thanksgiving: no workout", note: "No live group call or scheduled workout today." },
      Friday: { off: true, label: "Day after Thanksgiving: no workout", note: "No live group call or scheduled workout today." },
      Saturday: REST
    }
  },
  {
    week: 5,
    title: "November 29 and 30",
    startDate: "2026-11-29",
    days: {
      Sunday: REST,
      Monday: { ...VIDEOS.joDanceBrunoMars }
      // This is the last week of the plan: Tuesday Dec 1 onward is
      // intentionally not included. See PLAN_END_DATE above.
    }
  }
];

const GUIDELINES = [
  "Form first, then range of motion, speed, and weight, in that order.",
  "Start with body weight, water bottles, or 2 to 5 lb dumbbells; the last reps should feel challenging but controlled.",
  "Keep a sturdy chair or counter nearby for balance. Never feel obligated to keep pace with the instructor.",
  "For the first two weeks: dance or cardio around 4 to 5 out of 10 effort, strength or Pilates around 5 to 6 out of 10, Friday recovery around 2 to 3 out of 10.",
  "If Tuesday strength leaves your legs significantly sore, replace Wednesday Pilates with gentle standing mobility instead of pushing through it.",
  "Sharp pain, dizziness, a sudden pop, or unusual shortness of breath means stop. Call 911 for chest pressure or pain."
];

// Returns the Sunday (as a Date) of the given week object: its explicit
// startDate if set, otherwise computed from PLAN_START_DATE and week number.
function getWeekMonday(week) {
  if (week.startDate) {
    return new Date(week.startDate + "T00:00:00");
  }
  const start = new Date(PLAN_START_DATE + "T00:00:00");
  const d = new Date(start);
  d.setDate(d.getDate() + (week.week - 1) * 7);
  return d;
}

// Compute the real calendar date (as a Date) for a given week object and weekday name.
function getDateForDay(week, weekdayName) {
  const sunday = getWeekMonday(week);
  const weekdayIndex = WEEKDAY_ORDER.indexOf(weekdayName);
  const d = new Date(sunday);
  d.setDate(d.getDate() + weekdayIndex);
  return d;
}

if (typeof module !== "undefined") {
  module.exports = { PLAN_START_DATE, PLAN_END_DATE, WEEKDAY_ORDER, WEEKS, GUIDELINES, getWeekMonday, getDateForDay };
}
