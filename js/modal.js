/* ============================================================
   Workout detail modal — click-to-expand embedded YouTube player
   ============================================================ */

const Modal = (() => {
  const overlay = document.getElementById("workout-modal");
  const closeBtn = document.getElementById("modal-close");
  const iframe = document.getElementById("modal-iframe");
  const titleEl = document.getElementById("modal-title");
  const metaEl = document.getElementById("modal-meta");
  const noteEl = document.getElementById("modal-note");
  const ytLink = document.getElementById("modal-yt-link");

  function open({ title, metaText, note, videoId, playlistId }) {
    titleEl.textContent = title;
    metaEl.textContent = metaText || "";

    if (note) {
      noteEl.textContent = note;
      noteEl.hidden = false;
    } else {
      noteEl.textContent = "";
      noteEl.hidden = true;
    }

    if (playlistId) {
      iframe.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0`;
      ytLink.href = `https://www.youtube.com/playlist?list=${playlistId}`;
    } else if (videoId) {
      iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;
      ytLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    } else {
      iframe.src = "";
      ytLink.href = "#";
    }

    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    overlay.hidden = true;
    iframe.src = ""; // stop playback
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) close();
  });

  return { open, close };
})();
