---
name: add-event-entry
description: Use this skill when someone asks to add a brand-new event listing to this repository. It creates a valid event object in src/data/events.json, sets the Partiful link, and prepares the corresponding image folder/path under public/events/<slug>/.
---

# Add Event Entry

## Overview
Use this skill for new events only. It adds a correctly shaped record to `src/data/events.json` and prepares image assets so the event renders on the homepage and events pages.

## Workflow
1. Confirm required inputs: `slug`, `title`, `datetime`, `timezone`, `location`, `description`, `partifulUrl`, `status`.
2. Run `scripts/add_event.py` to append a valid event entry and auto-generate a new `id`.
3. Add/update the poster at `public/events/<slug>/poster.svg` (or another file path), and ensure `image` in JSON matches.
4. Run `python3 ../validate-event-update/scripts/validate_events.py` from repo root to check schema and paths.
5. Run `npm run build`.

## Quick Commands
From repository root:

```bash
python3 skills/add-event-entry/scripts/add_event.py \
  --slug moon-garden \
  --title "Moon Garden" \
  --datetime "2026-05-08T22:00:00" \
  --timezone "America/Los_Angeles" \
  --location "Seattle, WA" \
  --description "Late-night melodic and progressive sets." \
  --partiful-url "https://partiful.com/e/moon-garden" \
  --lineup "DJ A,DJ B" \
  --status upcoming
```

## Notes
- `partifulUrl` must point to Partiful for this project.
- Default image path is `/events/<slug>/poster.svg`.
- Event entries are sorted by `datetime` automatically.
- For edits to existing events, use `edit-event-entry`.

## References
- `references/event-schema.md`
