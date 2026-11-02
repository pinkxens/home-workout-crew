# Home Workout Crew

A small static website for an online workout group: a calendar of the group's
workout plan, with each day linking out to (or embedding) the YouTube
workout video for that day. The plan currently runs Monday through Friday
workouts, Saturday and Sunday rest, and new weeks get appended over time.

## Structure

```
index.html               Primary page: the workout calendar
css/style.css             All styling (CSS custom properties at the top;
                          edit colors/fonts there)
js/data.js                 The workout plan data. Edit this file to add weeks,
                          swap a video, or change notes; the calendar
                          re-renders from this automatically.
js/calendar.js             Renders the week/day grid from data.js
js/modal.js                 Powers the click-to-expand embedded video player
pages/watch-party.html      The daily 6:30 AM ET call: join button, Meet link
pages/safety.html           Standing-workout safety guide and modifications
pages/survey.html           Group feedback survey (currently a coming-soon placeholder)
pages/resources.html        Body measurement template and other links
pages/guidelines.html       Getting started (photos, measurements, dietary
                          tracking) and the participation/liability disclaimer
```

## The Google Meet link and call time

The call runs every day at 6:30 AM ET, Monday through Friday. The join link
(`https://meet.google.com/uov-ratx-ayu`) and the "6:30 AM ET, Monday through
Friday" text appear in the `.call-banner` on every page, plus the header's
`.join-call-btn`, plus again as the main call to action on the watch party
page. If the call time or link ever changes, search for `meet.google.com`
and `6:30 AM ET` to find every spot that needs updating.

It's plain HTML/CSS/JS with no build step: open `index.html` in a browser,
or host the folder on any static host (GitHub Pages, Netlify, Vercel, S3,
etc.). Every internal link is a relative path, so the whole folder can be
moved or renamed freely.

## Editing the plan

Open `js/data.js`. Each week is an object with a `days` map keyed by weekday
name. A workout day looks like:

```js
Monday: { type: "dance", category: "Grow with Jo Dance", videoId: "SUZSmgYJN8U", title: "..." }
```

`type` picks the pill color (`dance`, `cardio`, `strength`, `pilates`, `yoga`,
or `mobility`; see the `.cat-*` rules in `css/style.css`) and `category` is
the label actually shown on the card, so you can reuse a color for a new
instructor or series without touching the CSS.

A rest day is just `REST` (a shared constant). For a one-off non-workout day
that isn't a weekend rest day (a holiday, an optional independent reset),
use `{ off: true, label: "...", note: "..." }` instead; it renders as a
plain, non-clickable card with that label and note, distinct from both
`REST` and the "not yet scheduled" placeholder. See week 4 (Thanksgiving
week) for an example.

Leaving a day out of a week's `days` object entirely renders it as an open
"not yet scheduled" placeholder, as long as that day falls within
`PLAN_START_DATE`/`PLAN_END_DATE` (see below); a day outside that range
(like Tuesday through Saturday of week 5 here) isn't rendered at all.

Weeks run Sunday through Saturday (`WEEKDAY_ORDER` starts with `"Sunday"`),
so the calendar's first displayed day is Sunday, November 1, 2026. The
calendar only shows one month at a time right now: `PLAN_END_DATE` (also at
the top of `js/data.js`) caps the last displayed day at November 30, 2026,
so the final week block stops cleanly there instead of spilling into
December placeholders. To extend the plan, move `PLAN_END_DATE` forward
and fill in the new days. Add a new week block with `week:` bumped by one,
and the calendar picks it up automatically, dates included, based on
`PLAN_START_DATE`: by default a week's Sunday is `PLAN_START_DATE` plus 7
days times `(week number - 1)`, assuming no gaps between weeks.

If there's ever a stretch with no scheduled activity, give the next week an
explicit `startDate` (its Sunday, `"YYYY-MM-DD"`) instead of relying on the
week number; that overrides the automatic calculation for that week only,
so the week number itself can just keep counting up. See any week below
for the pattern (every week currently sets `startDate` explicitly).

To embed a YouTube *playlist* instead of a single video, use `playlistId`
instead of `videoId`.

## The survey

`pages/survey.html` currently shows a "coming soon" placeholder. The
group's Google Form link is kept in an HTML comment at the top of that
file's `<main>` (`https://forms.gle/G5KnAuQLXaFuHVMEA`); to go live again,
swap the placeholder section back for a link/button to that URL (or a new
form link).

## Guidelines and the disclaimer

`pages/guidelines.html` holds the "getting started" content (before/after
photos, body measurements, dietary tracking) and the full participation and
liability disclaimer, anchored at `#disclaimer` and linked from every
page's footer. Edit that file directly to change the disclaimer language.

## Planned next features

- **Synced playback**: right now the group works out together over the
  Google Meet call above, with one person screen-sharing the day's video.
  A built-in synced player, so the video plays for everyone automatically
  with no screen share needed, would take a lightweight real-time layer
  (for example WebSockets or a hosted realtime service) and is left as a
  follow-up.
- Possible later additions: a sign-up/RSVP per session, a simple progress
  tracker, group chat or comments per workout day, account-free "who's
  coming Saturday" polling.

The site is intentionally split into small files (data vs. rendering vs.
styling) so new pages and features can be added without touching the
calendar logic.
