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
pages/watch-party.html      The daily 7 AM ET call: join button, Meet link
pages/safety.html           Standing-workout safety guide and modifications
pages/survey.html           Link out to the group feedback survey
pages/resources.html        Body measurement template and other links
```

## The Google Meet link and call time

The call runs every day at 7:00 AM ET, Monday through Friday. The join link
(`https://meet.google.com/uov-ratx-ayu`) and the "7:00 AM ET, Monday through
Friday" text appear in the `.call-banner` on every page, plus the header's
`.join-call-btn`, plus again as the main call to action on the watch party
page. If the call time or link ever changes, search for `meet.google.com`
and `7:00 AM ET` to find every spot that needs updating.

It's plain HTML/CSS/JS with no build step: open `index.html` in a browser,
or host the folder on any static host (GitHub Pages, Netlify, Vercel, S3,
etc.). Every internal link is a relative path, so the whole folder can be
moved or renamed freely.

## Editing the plan

Open `js/data.js`. Each week is an object with a `days` map keyed by weekday
name. A workout day looks like:

```js
Monday: { type: "dance", category: "Grow with Jo Dance", videoId: "b75piWv4OlE", title: "..." }
```

`type` picks the pill color (`dance`, `cardio`, `strength`, `pilates`, `yoga`,
or `mobility`; see the `.cat-*` rules in `css/style.css`) and `category` is
the label actually shown on the card, so you can reuse a color for a new
instructor or series without touching the CSS.

A rest day is just `REST` (a shared constant). Leaving a day out of a week's
`days` object (instead of filling in `REST`) renders it as an open "not yet
scheduled" placeholder; that's how the current final week works, since only
Monday through Wednesday of Sep 28 to 30 are set. Add the missing days, or a
new week block with `week:` bumped by one, and the calendar picks it up
automatically, dates included, based on `PLAN_START_DATE` at the top of the
file.

To embed a YouTube *playlist* instead of a single video, use `playlistId`
instead of `videoId`.

## The survey

`pages/survey.html` links out to the group's Google Form
(`https://forms.gle/G5KnAuQLXaFuHVMEA`). To point it at a different form,
search for `forms.gle` in that file and swap the link.

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
