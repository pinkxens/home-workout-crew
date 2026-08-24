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

  WEEKS.forEach((week) => {
    const weekBlock = document.createElement("section");
    weekBlock.className = "week-block";
    weekBlock.setAttribute("aria-label", `Week ${week.week}: ${week.title}`);

    const firstDay = getDateForDay(week.week, "Monday");
    const lastDay = getDateForDay(week.week, "Sunday");

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
      const date = getDateForDay(week.week, weekday);

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

      const dayEl = document.createElement(entry.rest ? "div" : "button");
      dayEl.className = "day-card" + (entry.rest ? " is-rest" : "") + (isSameDate(date, today) ? " is-today" : "");

      if (entry.rest) {
        dayEl.innerHTML = `
          <div class="day-name">${weekday}</div>
          <div class="day-date">${formatDate(date)}</div>
          <div class="rest-label">😴 Rest day</div>
        `;
      } else {
        dayEl.type = "button";
        dayEl.innerHTML = `
          <div class="day-name">${weekday}</div>
          <div class="day-date">${formatDate(date)}</div>
          <span class="category-pill cat-${entry.type}">${entry.category}</span>
          <div class="workout-title">${entry.title}</div>
          <div class="play-hint">▶ Tap to watch</div>
        `;
        dayEl.addEventListener("click", () => {
          Modal.open({
            title: entry.title,
            metaText: `${entry.category} · ${formatFullDate(date)}`,
            note: entry.note,
            videoId: entry.videoId,
            playlistId: entry.playlistId
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
