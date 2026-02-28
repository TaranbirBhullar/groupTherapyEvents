---
name: sync-partiful-events
description: Use this skill when someone wants to refresh src/data/events.json from a Partiful organizer page (for example https://partiful.com/u/<userId>). It fetches latest published events, maps fields to this repo schema, and downloads poster images into public/events/<slug>/.
---

# Sync Partiful Events

## Overview
Use this skill to update event content quickly from a Partiful organizer page, without hand-editing JSON.

It will:
- fetch published events from Partiful,
- map each event into this repo's `Event` schema,
- derive `status` (`upcoming`, `past`, `cancelled`),
- download event images into `public/events/<slug>/poster.*`,
- rewrite `src/data/events.json`.

## Workflow
1. Run a preview first:
```bash
python3 skills/sync-partiful-events/scripts/sync_partiful_events.py \
  --organizer-url "https://partiful.com/u/HWqivFb5eG8AVy0Y6qp5" \
  --dry-run
```
2. Apply update:
```bash
python3 skills/sync-partiful-events/scripts/sync_partiful_events.py \
  --organizer-url "https://partiful.com/u/HWqivFb5eG8AVy0Y6qp5"
```
3. Verify the app:
```bash
npm run build
```

## Notes
- This script intentionally rewrites `src/data/events.json` from the Partiful source of truth.
- It stores local images under `public/events/<slug>/` for stable GitHub Pages hosting.
- If image download fails, it creates a local SVG placeholder so the site still builds.
