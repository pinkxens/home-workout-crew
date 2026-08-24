/* ============================================================
   Workout plan data
   ------------------------------------------------------------
   Current schedule: Monday Aug 24 2026 through Wednesday Sep 30
   2026. Weekly pattern: Monday Dance, Tuesday Strength,
   Wednesday Pilates, Thursday Cardio, Friday Recovery (yoga),
   Saturday and Sunday rest.

   The final week (starting Sep 28) is partial: only Monday-
   Wednesday are set, so Thursday/Friday render as an open "not
   yet scheduled" placeholder until the next stretch is added.
   Saturday/Sunday still show as rest since that's fixed.

   To extend the plan, add a new week object to WEEKS (or fill in
   the remaining days of the last one); the calendar renders from
   this data automatically, dates included.
   ============================================================ */

// Monday of Week 1, in YYYY-MM-DD form.
const PLAN_START_DATE = "2026-08-24";

const WEEKDAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// type -> controls the pill color (see css `.cat-*` classes)
// category -> the label actually shown on the card
const VIDEOS = {
  joDanceMJ: { type: "dance", category: "Grow with Jo Dance", videoId: "b75piWv4OlE", title: "18-Minute Michael Jackson Dance Workout" },
  juiceToyaStanding: { type: "strength", category: "Juice & Toya Strength", videoId: "-vGcK_1glIk", title: "All-Standing Dumbbell Workout" },
  miraStandingPilates20: { type: "pilates", category: "Flow with Mira Pilates", videoId: "XJ6TWnwaQUA", title: "20-Minute Beginner Standing Pilates" },
  hasfitCardio20: { type: "cardio", category: "HASfit Cardio", videoId: "4KggZkh7i1s", title: "20-Minute Standing Low-Impact Cardio" },
  adrieneStandingYoga: { type: "yoga", category: "Yoga With Adriene", videoId: "niiuYG2NDRM", title: "15-Minute Standing Yoga" },
  joDance2000s: { type: "dance", category: "Grow with Jo Dance", videoId: "xnDhDaVxNng", title: "15-Minute 2000s Dance Workout" },
  joDanceJLo: { type: "dance", category: "Grow with Jo Dance", videoId: "C70NlH2Qhlg", title: "15-Minute JLo Dance Party" },
  joDanceBrunoMars: { type: "dance", category: "Grow with Jo Dance", videoId: "hjW2YqViE0M", title: "Bruno Mars Beginner Dance Party" },
  joCardioWalking30: { type: "cardio", category: "Grow with Jo Cardio", videoId: "yV4jyj8Hr1g", title: "Low-Impact 30-Minute Walking Workout" },
  joDanceRihannaBeyonce: { type: "dance", category: "Grow with Jo Dance", videoId: "V5QVJv_4cEA", title: "Rihanna vs. Beyoncé Dance Party" },
  miraStandingPilatesLegs: { type: "pilates", category: "Flow with Mira Pilates", videoId: "xyAHua-HDqs", title: "20-Minute Standing Pilates: Legs, Thighs, Glutes, Hips and Core" },
  bodyProjectStanding30: { type: "cardio", category: "Body Project Cardio", videoId: "gC_L9qAHVJ8", title: "30-Minute All-Standing Beginner Workout" },
  joDanceGospel: { type: "dance", category: "Grow with Jo Dance", videoId: "nLJhTkLhK5U", title: "Gospel Dance Party" },
  joStrengthPilatesAbs: { type: "strength", category: "Grow with Jo Strength", videoId: "H4ynOuuT8w4", title: "Full-Body Dumbbell Strength and Standing Pilates Abs" },
  joDanceRnB2000s: { type: "dance", category: "Grow with Jo Dance", videoId: "D-LubT53KKU", title: "15-Minute 2000s R&B Dance Workout" },
  joDanceMissyElliott: { type: "dance", category: "Grow with Jo Dance", videoId: "5uC8Ym0i42o", title: "Missy Elliott Dance Workout" }
};

const REST = { rest: true };

const WEEKS = [
  {
    week: 1,
    title: "Remainder of August",
    days: {
      Monday: { ...VIDEOS.joDanceMJ },
      Tuesday: { ...VIDEOS.juiceToyaStanding, note: "Complete the first 15 minutes of this workout." },
      Wednesday: { ...VIDEOS.miraStandingPilates20 },
      Thursday: { ...VIDEOS.hasfitCardio20 },
      Friday: { ...VIDEOS.adrieneStandingYoga },
      Saturday: REST,
      Sunday: REST
    }
  },
  {
    week: 2,
    title: "Into September",
    days: {
      Monday: { ...VIDEOS.joDance2000s },
      Tuesday: { ...VIDEOS.juiceToyaStanding, note: "Complete 20 minutes of this workout." },
      Wednesday: { ...VIDEOS.miraStandingPilates20 },
      Thursday: { ...VIDEOS.joDanceJLo },
      Friday: { ...VIDEOS.adrieneStandingYoga },
      Saturday: REST,
      Sunday: REST
    }
  },
  {
    week: 3,
    title: "September 7 to 13",
    days: {
      Monday: { ...VIDEOS.joDanceBrunoMars },
      Tuesday: { ...VIDEOS.juiceToyaStanding, note: "Complete 20 to 25 minutes of this workout." },
      Wednesday: { ...VIDEOS.miraStandingPilates20 },
      Thursday: { ...VIDEOS.joCardioWalking30 },
      Friday: { ...VIDEOS.adrieneStandingYoga },
      Saturday: REST,
      Sunday: REST
    }
  },
  {
    week: 4,
    title: "September 14 to 20",
    days: {
      Monday: { ...VIDEOS.joDanceRihannaBeyonce },
      Tuesday: { ...VIDEOS.juiceToyaStanding, note: "Complete the full 30-minute workout." },
      Wednesday: { ...VIDEOS.miraStandingPilatesLegs },
      Thursday: { ...VIDEOS.bodyProjectStanding30 },
      Friday: { ...VIDEOS.adrieneStandingYoga },
      Saturday: REST,
      Sunday: REST
    }
  },
  {
    week: 5,
    title: "September 21 to 27",
    days: {
      Monday: { ...VIDEOS.joDanceGospel },
      Tuesday: { ...VIDEOS.joStrengthPilatesAbs },
      Wednesday: { ...VIDEOS.miraStandingPilates20 },
      Thursday: { ...VIDEOS.joDanceRnB2000s },
      Friday: { ...VIDEOS.adrieneStandingYoga },
      Saturday: REST,
      Sunday: REST
    }
  },
  {
    week: 6,
    title: "September 28 to 30",
    days: {
      Monday: { ...VIDEOS.joDanceMissyElliott },
      Tuesday: { ...VIDEOS.juiceToyaStanding },
      Wednesday: { ...VIDEOS.miraStandingPilates20 },
      // Thursday Oct 1 / Friday Oct 2: not yet scheduled, leave unset.
      Saturday: REST,
      Sunday: REST
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
