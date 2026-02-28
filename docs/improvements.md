# Improvements and Iterations

This document tracks meaningful improvements made after the initial concept.

## Platform and Delivery
- Set up GitHub Pages-compatible Vite build/deploy workflow.
- Added support for custom domain (`www.grouptherapyevents.com`).
- Kept the app static-first while preserving a path for future backend integration.

## Design and UX Evolution
- Rebranded to **Group Therapy Events** across pages.
- Shifted visual style toward a darker, minimal, more elegant experience.
- Refined homepage messaging to clearly answer:
  - who this is for
  - why it is worth joining
- Unified shared top banner across pages for consistency.
- Applied a sharper, boxy visual system (less rounded UI) to better match brand tone.

## Navigation and Page Structure
- Added dedicated pages/routes for:
  - Home
  - Events
  - Event detail
  - Chai Rave
  - About
  - Contact
- Optimized homepage sections for fast access to upcoming events.

## Event Experience
- Ensured event interactions open Partiful links directly.
- Added homepage section to show up to 3 recent past events.
- Updated event data with real Partiful-backed event entries.

## Chai Rave Content
- Added standalone Chai Rave page.
- Integrated Instagram profile linkage and recap-oriented content direction.
- Simplified feed treatment based on usability feedback.

## Contact Flow
- Built separate Contact page with two submission paths:
  - General inquiry
  - Artist collaboration
- Added validation/sanity checks for form inputs.
- Implemented mailto-based delivery to `chairaveclub@gmail.com` (no backend required in phase 1).

## Contributor Enablement
- Added reusable repo-local skills for non-technical collaborators:
  - local setup/run guidance
  - add/edit event entry workflows
  - validation workflow
- Added **sync-partiful-events** skill to fetch latest organizer events and update local event data automatically.

## Current Direction
The project now balances:
- strong visual identity,
- lightweight operations for contributors,
- and a clean architecture that can later absorb backend features without reworking the entire frontend.
