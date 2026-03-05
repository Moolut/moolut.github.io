# src/data/

This folder contains the source data files for the portfolio pages.
Edit these files to add, remove, or update content — no changes to page code are needed.

---

## projects.json

Each entry in the array represents one project card + modal in the **Projects** page.
Entries are displayed **top-to-bottom in the order they appear in the file** (latest first).

### Full field reference

```jsonc
{
  // ── IDENTITY ────────────────────────────────────────────────────────────────

  "fileId": "UI",
  // Short uppercase prefix used to generate the display ID (e.g. "UI-001").
  // Keep it 2–4 characters. Must be unique across all entries.
  // Examples: "UI", "HW", "SC", "ASM", "CPP"

  "type": "PROJECT",
  // Badge shown on the card. Free text — use any label that fits.
  // Suggested values: "PROJECT" | "THESIS" | "COLLECTION" | "WRITEUPS" | "RESEARCH"

  "status": "COMPLETE",
  // Controls the colour of the status dot on the card.
  // MUST be one of:
  //   "COMPLETE"     → green  (#4dff91)
  //   "IN PROGRESS"  → yellow (#f0d030)
  //   "ARCHIVED"     → red    (#ff5050)

  "group": "SOFTWARE",
  // Determines which filter tab the card appears under.
  // MUST be one of:
  //   "SECURITY"
  //   "EMBEDDED"
  //   "SOFTWARE"
  // Every card always appears under the "ALL" tab regardless of group.

  // ── CARD CONTENT ────────────────────────────────────────────────────────────

  "title": "repo-name — Short human title",
  // Shown as the card heading and the modal title.
  // Convention: "repo-name — Brief description"

  "year": "2025",
  // Four-digit year string. Shown on the card.

  "context": "Course",
  // Short label for the project origin. Free text.
  // Examples: "Personal" | "Thesis" | "Course" | "Internship" | "Research"

  "problem": "One-sentence description of the challenge.",
  // Shown in the card's PROBLEM row. Keep to one sentence.

  "result": "One-sentence description of the outcome.",
  // Shown in the card's RESULT row. Keep to one sentence.

  // ── MODAL CONTENT ───────────────────────────────────────────────────────────

  "overview": "2–4 sentence paragraph giving context and goal of the project.",
  // Shown at the top of the modal. Aim for 2–4 sentences.

  "whatIBuilt": [
    "Bullet describing a concrete deliverable or system.",
    "Another bullet."
  ],
  // Array of strings. Each becomes a bullet point in the WHAT I BUILT section.

  "techDetails": [
    "Technical detail or decision.",
    "Another detail."
  ],
  // Array of strings. Each becomes a bullet in the TECH DETAILS section.

  "outputs": [
    "The measurable or tangible output of the project."
  ],
  // Array of strings. Each becomes a bullet in the RESULTS section.

  "tools": ["Tool A", "Tool B"],
  // Array of tool/tech names shown in the TOOLS grid inside the modal.
  // Each entry becomes one chip.

  "tags": ["Tag A", "Tag B"],
  // Array of topic tags shown on the card (overflow hidden, revealed on hover)
  // and inside the modal. Each entry becomes one chip.

  // ── ARTIFACTS ───────────────────────────────────────────────────────────────

  "artifacts": {
    "github": "https://github.com/Moolut/repo",
    // Full URL to the GitHub repository, or "" to show as LOCKED.

    "report": "",
    // Full URL to a PDF/hosted report, or "" to show as LOCKED.

    "video": "",
    // Full URL to a demo video, or "" to show as LOCKED.

    "demo": "https://example.com"
    // Full URL to a live demo, or "" to show as LOCKED.
  }
}
```

### Adding a new project

1. Open `projects.json`.
2. Add a new object at the **top** of the array (so it appears first on the page).
3. Fill in all fields. Use `""` for any artifact URL you don't have yet.
4. Make sure `group` and `status` use only the allowed values listed above.
5. Keep `fileId` unique (e.g. pick an acronym from the project title).
