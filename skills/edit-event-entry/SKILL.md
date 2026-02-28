---
name: edit-event-entry
description: Use this skill when someone wants to modify an existing event in src/data/events.json (title, date/time, location, lineup, Partiful URL, image path, or status) without changing the schema.
---

# Edit Event Entry

## Overview
Use this skill for updates to existing events. It preserves JSON schema consistency and ensures the event still renders correctly.

## Workflow
1. Locate the event by unique `slug` in `src/data/events.json`.
2. Update only requested fields.
3. Keep field names exactly as defined in schema (`partifulUrl`, `datetime`, `status`, etc.).
4. If `image` changes, ensure file exists under `public/...`.
5. Run validation: `python3 skills/validate-event-update/scripts/validate_events.py`.
6. Run `npm run build`.

## Safe Edit Rules
- Do not change `id` unless explicitly requested.
- Keep `slug` stable unless user asks for a rename.
- `status` must be one of: `upcoming`, `past`, `cancelled`.
- `partifulUrl` should remain a Partiful URL.

## References
- `references/event-schema.md`
