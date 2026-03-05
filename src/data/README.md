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
    "Another bullet.",
  ],
  // Array of strings. Each becomes a bullet point in the WHAT I BUILT section.

  "techDetails": ["Technical detail or decision.", "Another detail."],
  // Array of strings. Each becomes a bullet in the TECH DETAILS section.

  "outputs": ["The measurable or tangible output of the project."],
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

    "demo": "https://example.com",
    // Full URL to a live demo, or "" to show as LOCKED.
  },
}
```

### Adding a new project

1. Open `projects.json`.
2. Add a new object at the **top** of the array (so it appears first on the page).
3. Fill in all fields. Use `""` for any artifact URL you don't have yet.
4. Make sure `group` and `status` use only the allowed values listed above.
5. Keep `fileId` unique (e.g. pick an acronym from the project title).

---

## achievements.json

Contains all data for the **Achievements** page, grouped into **channels**.
Each channel renders as a separate section with its own visual style.
Edit this file to add, remove, or reorder certifications, CTF results, and HTB paths — no changes to page code are needed.

### Top-level structure

```jsonc
{
  "channels": [
    // One object per section rendered on the Achievements page.
    // Sections appear in the order they are listed here.
  ],
}
```

---

### Channel fields (shared by all types)

```jsonc
{
  "id": "ch-01",
  // Unique HTML id for the section. Used by HUD strip buttons to scroll to the section.
  // Convention: "ch-01", "ch-02", … Keep incrementing for new channels.

  "sys": "SYS//CERT",
  // Short label shown in the top-left corner of the section header.
  // Free text — convention is "SYS//<TOPIC>".

  "type": "certifications",
  // Controls which rendering template is used for the items array.
  // MUST be one of:
  //   "certifications"  → hero card(s) with chips and a credential link
  //   "ctf"             → ordered timeline list
  //   "htb"             → progress-bar path list with expandable detail panel

  "hudLabel": "CERTS",
  // Text shown inside the HUD strip button at the top of the page.
  // The item count is appended automatically: "CERTS: 1"

  "statusLine": "■ CERT // OUTPUT: VERIFIED",
  // Text shown in the footer status bar at the bottom of the section.
  // Free text.

  "title": "CTF TIMELINE",
  // (optional) Section heading rendered below the block header.
  // Used by "ctf" and "htb" types. Omit for "certifications".

  "intro": "Live-fire labs disguised as games…",
  // (optional) Short paragraph rendered below the title.
  // Used by "ctf". Omit for other types.

  "htbStatus": "ACTIVE",
  // (optional) Badge text rendered next to the title (e.g. "ACTIVE").
  // Used by "htb". Omit for other types.

  "items": [
    /* see per-type fields below */
  ],
}
```

---

### `type: "certifications"` — item fields

```jsonc
{
  "tag": "CJCA",
  // Short identifier shown in brackets above the cert title.
  // Usually the certification acronym.

  "title": "Certified Junior Cybersecurity Analyst",
  // Full certification name.

  "issuer": "Hack The Box Academy",
  // Name of the issuing organisation.

  "year": "2025",
  // Four-digit year the certification was awarded.

  "url": "https://academy.hackthebox.com/achievement/badge/cjca",
  // Link to the public credential or badge page.

  "urlLabel": "VIEW CERT →",
  // Label for the button that opens the URL. Free text.

  "chips": ["Enterprise Pentest", "Recon", "Web App Testing", "Windows/Linux"],
  // Array of skill chips displayed on the card.
  // The first 4 chips appear in row 1; any extras go in row 2.

  "chipsMore": ["Vulnerability Chaining", "Post-Exploitation"],
  // (optional) Extra chips hidden behind a "+N more" popover.
  // Use [] if there are no overflow chips.
}
```

---

### `type: "ctf"` — item fields

Items are rendered as an ordered timeline list, newest first by convention.

```jsonc
{
  "year": "2024",
  // Four-digit year of the competition.

  "place": "1st",
  // Placement string, e.g. "1st", "2nd", "4th". Free text.

  "name": "IOTSEC CTF I",
  // Competition name as it should appear on the page.

  "org": "TUM",
  // Organiser, institution, or regional context. Free text.

  "keywords": ["Block Ciphers", "Public Key", "Steganography"],
  // Array of topic/skill tags displayed as chips below the entry.
}
```

---

### `type: "htb"` — item fields

Items are rendered as an expandable progress-bar list (hover to see details).

```jsonc
{
  "name": "Penetration Tester Path",
  // Path name exactly as shown on HTB Academy.

  "status": "COMPLETE",
  // Controls the colour of the status badge.
  // MUST be one of:
  //   "COMPLETE"     → green badge
  //   "IN PROGRESS"  → yellow badge

  "fill": 100,
  // Numeric percentage (0–100) used to draw the progress bar.
  // Use a decimal like 81.4 for partial progress.

  "pct": "100%",
  // Human-readable percentage string shown next to the status badge.
  // Should match "fill" (e.g. fill: 81.4 → pct: "81.4%").

  "pipeline": "Recon → Enumerate → Exploit → PrivEsc → Pivot → Report",
  // Stage-by-stage workflow summary shown in the expanded detail panel.

  "practiced": "Web Testing · Nmap · Metasploit · Fuzzing",
  // Dot-separated list of tools and skills practiced in this path.

  "output": "Reproducible Findings · Risk Context · Remediation Notes",
  // Deliverable or learning outcome shown in the expanded detail panel.
}
```

---

### Adding a new channel

1. Open `achievements.json` and append a new object to the `channels` array.
2. Set `type` to one of `"certifications"`, `"ctf"`, or `"htb"`.
3. Choose a unique `id` continuing the `ch-XX` sequence.
4. The HUD strip and scroll offsets update automatically — no code changes needed.

### Adding a new entry to an existing channel

1. Find the channel by `id` or `type` and add a new object to its `items` array.
2. Follow the field reference for that type above.
3. The HUD item count updates automatically.
