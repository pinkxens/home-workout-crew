/* ============================================================
   Workout plan data
   ------------------------------------------------------------
   Current schedule: Monday Aug 24 2026 through Wednesday Sep 30
   2026. Each week runs Monday-Thursday workouts, Friday-Sunday
   rest. The final week (starting Sep 28) is partial — Thursday
   Oct 1 onward isn't scheduled yet, so those days render as an
   open "not yet scheduled" placeholder until more weeks are added.

   To extend the plan, add a new week object to WEEKS (or fill in
   the remaining days of the last one) — the calendar renders from
   this data automatically, dates included.
   ============================================================ */

// Monday of Week 1, in YYYY-MM-DD form.
const PLAN_START_DATE = "2026-08-24";

const WEEKDAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// type -> controls the pill color (see css `.cat-*` classes)
// category -> the label actually shown on the card
const VIDEOS = {
  joDanceMJ: { type: "dance", category: "Grow with Jo Dance", videoId: "b75piWv4OlE", title: "Michael Jackson Dance Workout — 18 Minutes" },
  hasfitCardio20: { type: "cardio", category: "HASfit Cardio", videoId: "4KggZkh7i1s", title: "20-Minute Standing Low-Impact Cardio" },
  miraStandingPilates20: { type: "pilates", category: "Flow with Mira Pilates", videoId: "XJ6TWnwaQUA", title: "20-Minute Beginner Standing Pilates" },
  bodyProjectStanding: { type: "cardio", category: "Body Project Cardio", videoId: "gC_L9qAHVJ8", title: "All-Standing Beginner Low-Impact Workout" },
  joDance2000s: { type: "dance", category: "Grow with Jo Dance", videoId: "xnDhDaVxNng", title: "2000s Dance Workout — 15 Minutes" },
  juiceToyaStanding: { type: "strength", category: "Juice & Toya Strength", videoId: "-vGcK_1glIk", title: "All-Standing Full-Body Dumbbell Workout" },
  adrieneStandingYoga: { type: "yoga", category: "Yoga With Adriene", videoId: "niiuYG2NDRM", title: "15-Minute Therapeutic Standing Yoga" },
  joDanceJLo: { type: "dance", category: "Grow with Jo Dance", videoId: "C70NlH2Qhlg", title: "JLo Dance Party — 15 Minutes" },
  joDanceBrunoMars: { type: "dance", category: "Grow with Jo Dance", videoId: "hjW2YqViE0M", title: "Bruno Mars Beginner Dance Party" },
  joCardioWalking30: { type: "cardio", category: "Grow with Jo Cardio", videoId: "yV4jyj8Hr1g", title: "Low-Impact 30-Minute Walking Workout" },
  joDanceRihannaBeyonce: { type: "dance", category: "Grow with Jo Dance", videoId: "V5QVJv_4cEA", title: "Rihanna vs. Beyoncé Dance Party" },
  joStrengthPilatesAbs: { type: "strength", category: "Grow with Jo Strength", videoId: "H4ynOuuT8w4", title: "Full-Body Dumbbell Strength and Standing Pilates Abs" },
  miraStandingPilatesLegs: { type: "pilates", category: "Flow with Mira Pilates", videoId: "xyAHua-HDqs", title: "20-Minute Standing Pilates — Legs, Thighs, Glutes, Hips and Core" },
  joDanceRnB2000s: { type: "dance", category: "Grow with Jo Dance", videoId: "D-LubT53KKU", title: "2000s R&B Dance Workout — 15 Minutes" },
  joDanceGospel: { type: "dance", category: "Grow with Jo Dance", videoId: "nLJhTkLhK5U", title: "Gospel Dance Party Workout" },
  joDanceMissyElliott: { type: "dance", category: "Grow with Jo Dance", videoId: "5uC8Ym0i42o", title: "Missy Elliott Dance Workout" },
  adrieneStandingYoga10: { type: "yoga", category: "Yoga With Adriene", videoId: "Td6zFtZPkJ4", title: "10-Minute Standing Yoga" }
};

const REST = { rest: true };

const WEEKS = [
  {
    week: 1,
    title: "Remainder of August",
    days: {
      Monday: { ...VIDEOS.joDanceMJ },
      Tuesday: { ...VIDEOS.hasfitCardio20 },
      Wednesday: { ...VIDEOS.miraStandingPilates20 },
      Thursday: { ...VIDEOS.bodyProjectStanding, note: "Complete the first 20 minutes of this workout." },
      Friday: REST,
      Saturday: REST,
      Sunday: REST
    }
  },
  {
    week: 2,
    title: "Into September",
    days: {
      Monday: { ...VIDEOS.joDance2000s },
      Tuesday: { ...VIDEOS.juiceToyaStanding, note: "Do the first 20 minutes of this workout." },
      Wednesday: { ...VIDEOS.adrieneStandingYoga },
      Thursday: { ...VIDEOS.joDanceJLo },
      Friday: REST,
      Saturday: REST,
      Sunday: REST
    }
  },
  {
    week: 3,
    title: "September 7 – 13",
    days: {
      Monday: { ...VIDEOS.joDanceBrunoMars },
      Tuesday: { ...VIDEOS.juiceToyaStanding, note: "Complete 20–25 minutes of this workout." },
      Wednesday: { ...VIDEOS.miraStandingPilates20 },
      Thursday: { ...VIDEOS.joCardioWalking30 },
      Friday: REST,
      Saturday: REST,
      Sunday: REST
    }
  },
  {
    week: 4,
    title: "September 14 – 20",
    days: {
      Monday: { ...VIDEOS.joDanceRihannaBeyonce },
      Tuesday: { ...VIDEOS.juiceToyaStanding, note: "Do the full 30-minute workout." },
      Wednesday: { ...VIDEOS.adrieneStandingYoga },
      Thursday: { ...VIDEOS.bodyProjectStanding, note: "Do the full 30-minute workout." },
      Friday: REST,
      Saturday: REST,
      Sunday: REST
    }
  },
  {
    week: 5,
    title: "September 21 – 27",
    days: {
      Monday: { ...VIDEOS.joDanceGospel },
      Tuesday: { ...VIDEOS.joStrengthPilatesAbs },
      Wednesday: { ...VIDEOS.miraStandingPilatesLegs },
      Thursday: { ...VIDEOS.joDanceRnB2000s },
      Friday: REST,
      Saturday: REST,
      Sunday: REST
    }
  },
  {
    week: 6,
    title: "September 28 – 30",
    days: {
      Monday: { ...VIDEOS.joDanceMissyElliott },
      Tuesday: { ...VIDEOS.juiceToyaStanding, note: "Do the full 30-minute workout." },
      Wednesday: { ...VIDEOS.adrieneStandingYoga10 }
      // Thursday Oct 1 onward: not yet scheduled — leave unset.
      // Add Thursday/Friday/Saturday/Sunday here (or a new week 7)
      // once the next stretch of the plan is set.
    }
  }
];

const GUIDELINES = [
  "Start with 2–5 lb dumbbells or water bottles.",
  "Maintain approximately 5–6 out of 10 effort for the first month.",
  "Pause videos whenever necessary — Jo's pace is optional.",
  "Increase either the weight, duration, or intensity, but only one at a time.",
  "If a Pilates or strength day leaves you very sore, swap in one of the cardio or dance videos instead and move strength to another day.",
  "Sharp pain, dizziness, or unusual shortness of breath means stop; ordinary muscle fatigue is different from joint pain."
];

// Compute the real calendar date (YYYY-MM-DD) for a given week (1-based) and weekday name.
function getDateForDay(weekNumber, weekdayName) {
  const start = new Date(PLAN_START_DATE + "T00:00:00");
  const weekdayIndex = WEEKDAY_ORDER.indexOf(weekdayName);
  const offsetDays = (weekNumber - 1) * 7 + weekdayIndex;
  const d = new Date(start);
  d.setDate(d.getDate() + offsetDays);
  return d;
}

if (typeof module !== "undefined") {
  module.exports = { PLAN_START_DATE, WEEKDAY_ORDER, WEEKS, GUIDELINES, getDateForDay };
}
