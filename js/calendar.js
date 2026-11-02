/* ============================================================
   Calendar rendering: builds the week-by-week grid from
   js/data.js and wires up the video modal.
   ============================================================ */

function formatDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatFullDate(date) {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function isSameDate(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function renderWeeks() {
  const container = document.getElementById("weeks-container");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const planStart = new Date(PLAN_START_DATE + "T00:00:00");
  const planEnd = new Date(PLAN_END_DATE + "T00:00:00");

  WEEKS.forEach((week) => {
    const weekBlock = document.createElement("section");
    weekBlock.className = "week-block";
    weekBlock.setAttribute("aria-label", `Week ${week.week}: ${week.title}`);

    const firstDayRaw = getDateForDay(week, "Sunday");
    const lastDayRaw = getDateForDay(week, "Saturday");
    const firstDay = firstDayRaw < planStart ? planStart : firstDayRaw;
    const lastDay = lastDayRaw > planEnd ? planEnd : lastDayRaw;

    const header = document.createElement("div");
    header.className = "week-block-header";
    header.innerHTML = `
      <span class="week-number">Week ${week.week}</span>
      <span class="week-title">${week.title}</span>
      <span class="week-range">${formatDate(firstDay)} – ${formatDate(lastDay)}</span>
    `;
    weekBlock.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "day-grid";

    WEEKDAY_ORDER.forEach((weekday) => {
      const entry = week.days[weekday];
      const date = getDateForDay(week, weekday);

      if (date < planStart || date > planEnd) {
        // Outside the plan's displayed range (e.g. the days after the
        // final week's last scheduled day): render nothing at all.
        return;
      }

      if (!entry) {
        // No data yet for this day: show an open placeholder rather than
        // guessing it's a rest day.
        const placeholderEl = document.createElement("div");
        placeholderEl.className = "day-card is-unscheduled";
        placeholderEl.innerHTML = `
          <div class="day-name">${weekday}</div>
          <div class="day-date">${formatDate(date)}</div>
          <div class="unscheduled-label">Not yet scheduled</div>
        `;
        grid.appendChild(placeholderEl);
        return;
      }

      const isInactive = entry.rest || entry.off;
      const dayEl = document.createElement(isInactive ? "div" : "button");
      dayEl.className = "day-card" + (entry.rest ? " is-rest" : "") + (entry.off ? " is-off" : "") + (isSameDate(date, today) ? " is-today" : "");

      if (entry.rest) {
        dayEl.innerHTML = `
          <div class="day-name">${weekday}</div>
          <div class="day-date">${formatDate(date)}</div>
          <div class="rest-label">😴 Rest day</div>
        `;
      } else if (entry.off) {
        // A one-off non-workout day (holiday, optional independent reset):
        // shown as a plain card with no video and nothing to click.
        dayEl.innerHTML = `
          <div class="day-name">${weekday}</div>
          <div class="day-date">${formatDate(date)}</div>
          <div class="off-label">🌿 ${entry.label}</div>
          ${entry.note ? `<div class="off-note">${entry.note}</div>` : ""}
        `;
      } else {
        dayEl.type = "button";
        dayEl.innerHTML = `
          <div class="day-name">${weekday}</div>
          <div class="day-date">${formatDate(date)}</div>
          <span class="category-pill cat-${entry.type}">${entry.category}</span>
          <div class="workout-title">${entry.title}</div>
          <div class="play-hint">${entry.noEmbed ? "↗ Opens on YouTube" : "▶ Tap to watch"}</div>
        `;
        dayEl.addEventListener("click", () => {
          Modal.open({
            title: entry.title,
            metaText: `${entry.category} · ${formatFullDate(date)}`,
            note: entry.note,
            videoId: entry.videoId,
            playlistId: entry.playlistId,
            noEmbed: entry.noEmbed
          });
        });
      }

      grid.appendChild(dayEl);
    });

    weekBlock.appendChild(grid);
    container.appendChild(weekBlock);
  });
}

function renderGuidelines() {
  const list = document.getElementById("guidelines-list");
  GUIDELINES.forEach((g) => {
    const li = document.createElement("li");
    li.textContent = g;
    list.appendChild(li);
  });
}

renderWeeks();
renderGuidelines();
