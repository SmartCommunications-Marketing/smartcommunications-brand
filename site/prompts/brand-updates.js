/* Brand updates log (test, November 2026).
   The prompt builder adds only the updates newer than the date the reader's AI agent last learned the brand
   (their Claude brand kit or Copilot agent), so the agent doesn't have to rescan the whole brand guide.
   Add new entries at the top: date (YYYY-MM-DD) and one plain sentence or two. Keep them to rules an AI needs. */
window.SC_BRAND_UPDATES = {
  // the Claude brand kit release the team has: the default "last updated" date
  kitDate: "2026-11-16",
  updates: [
    { date: "2026-11-19", text: "AI writes the words; the creative team makes public-facing visuals." },
    { date: "2026-11-19", text: "There is now a Word letterhead template for business letters. Start letters from it." },
    { date: "2026-11-17", text: "Innovate27 location photos come finished, with the Innovate27 bar, logo and color treatment. Use those versions, not plain city photos." },
    { date: "2026-11-16", text: "Conversation Cloud is retired. Say “the Smart Communications platform” or name the product. Don't use the Conversation Cloud logo or the cloud motif." },
    { date: "2026-11-16", text: "Don't use raw stock photos. Use finished, approved backgrounds only." },
  ],
};
