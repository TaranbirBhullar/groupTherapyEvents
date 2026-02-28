---
name: validate-event-update
description: Use this skill before committing event-content changes. It validates src/data/events.json schema, uniqueness, image paths, and runs a production build check.
---

# Validate Event Update

## Overview
Use this as a preflight gate before commit/deploy when event content or event assets change.

## Workflow
1. Run JSON/path checks:
```bash
python3 skills/validate-event-update/scripts/validate_events.py
```
2. Run production build:
```bash
npm run build
```
3. If any error appears, fix data/assets and rerun both checks.

## What It Checks
- JSON is a list of objects.
- Required keys are present and typed.
- `id` and `slug` are unique.
- `datetime` parses as ISO timestamp.
- `status` is valid.
- `partifulUrl` points to `https://partiful.com/...`.
- `image` points to an existing file under `public/`.

## References
- `references/checklist.md`
