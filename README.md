# Home Workout Crew

A small static website for an online workout group: a calendar of the group's
workout plan, with each day linking out to (or embedding) the YouTube
workout video for that day. The plan currently runs Monday–Thursday
workouts / Friday–Sunday rest, and new weeks get appended over time.

## Structure

```
index.html            Primary page — the workout calendar
css/style.css          All styling (CSS custom properties at the top —
                        edit colors/fonts there)
js/data.js              The workout plan data. Edit this file to add weeks,
                        swap a video, or change notes — the calendar
                        re-renders from this automatically.
js/calendar.js          Renders the week/day grid from data.js
js/modal.js              Powers the click-to-expand embedded video player
pages/watch-party.html   The group's Google Meet link, plus a note about the
                        planned synced-playback upgrade (see below)
```

## The Google Meet link

The join link (`https://meet.google.com/uov-ratx-ayu`) appears in two spots:
the `.join-call-btn` in the header nav on both `index.html` and
`pages/watch-party.html`, and again as the main call-to-action on the watch
party page. If the group's Meet link ever changes, update the `href` in
those three places (search for `meet.google.com` to find them all).

It's plain HTML/CSS/JS with no build step — open `index.html` in a browser,
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
or `mobility` — see the `.cat-*` rules in `css/style.css`) and `category` is
the label actually shown on the card, so you can reuse a color for a new
instructor/series without touching the CSS.

A rest day is just `REST` (a shared constant). Leaving a day out of a week's
`days` object (instead of filling in `REST`) renders it as an open "not yet
scheduled" placeholder — that's how the current final week works, since only
Monday–Wednesday of Sep 28–30 are set. Add the missing days, or a new week
block with `week:` bumped by one, and the calendar picks it up automatically
— dates included — based on `PLAN_START_DATE` at the top of the file.

To embed a YouTube *playlist* instead of a single video, use `playlistId`
instead of `videoId`.

## Planned next features

- **Synced playback**: right now the group works out together over the
  Google Meet call above, with one person screen-sharing the day's video.
  A built-in synced player (so the video plays for everyone automatically,
  no screen share needed) would need a lightweight real-time layer — e.g.
  WebSockets or a hosted realtime service — and is left as a follow-up.
- Possible later additions: a sign-up/RSVP per session, a simple progress
  tracker, group chat or comments per workout day, account-free "who's
  coming Saturday" polling.

The site is intentionally split into small files (data vs. rendering vs.
styling) so new pages and features can be added without touching the
calendar logic.
