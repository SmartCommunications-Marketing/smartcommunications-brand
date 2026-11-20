/* The AI assistant switch. (The prompt library tab was removed in November 2026; prompts-data.js and prompts.js are kept for reference.) */
(function () {
  "use strict";
  const AI = window.SC_ASSISTANT;
  const $ = (s) => document.querySelector(s);
  const NOTES = {
    claude: "Prompts start with a line that loads the Smart Communications brand skills, so Claude writes on brand and can tidy up decks and internal documents in the approved templates.",
    other: "Prompts start with a short brand brief instead (voice, product names, colors and fonts), so Copilot writes on brand. They work the same way in ChatGPT or Gemini.",
  };
  function sync() {
    document.querySelectorAll("#pl-assistant button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ai === AI.mode)));
    $("#pl-assistant-note").textContent = NOTES[AI.mode];
  }
  $("#pl-assistant").addEventListener("click", (e) => {
    const b = e.target.closest("[data-ai]");
    if (b) AI.set(b.dataset.ai);
  });
  AI.onChange(sync);
  sync();
})();
