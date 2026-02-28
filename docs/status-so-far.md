# Status So Far

## What Is Completed
- Built a static TypeScript + Vite + Tailwind website for Group Therapy Events.
- Configured for GitHub Pages deployment and custom domain support.
- Added consistent top banner/navigation across pages.
- Created and refined core pages:
  - Home
  - Events
  - Event detail
  - Chai Rave
  - About
  - Contact
- Aligned design system to a sharp, boxy, minimal visual style.
- Ensured event CTAs route to Partiful links.
- Added homepage section for recent past events (up to 3).
- Cleaned About/Contact social and contact info content.

## Event Data + Operations
- Event content is driven by `src/data/events.json`.
- Added skill workflows for contributors to run site, add/edit/validate events.
- Added `sync-partiful-events` skill to fetch organizer events and map into local data schema.

## Current UX Behavior
- Events page cards now only open Partiful from the button (not full-card click).
- Partiful buttons are aligned across event cards.
- Contact page has two submission paths:
  - General inquiry
  - Artist collaboration
- Form submissions use `mailto:` (no backend required in current phase).

## Important Constraints (Current Phase)
- No backend/API server yet.
- No auth/admin dashboard.
- Partiful is the source of truth for RSVP/ticket flow.

## Suggested Next Steps
1. Add a lightweight CI check for `npm run build` + event validation script.
2. Complete image strategy by storing all event posters locally under `public/events/...`.
3. Optionally add backend form handling when ready (to avoid mail client dependency).
