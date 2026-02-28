# Group Therapy Events: Original Idea

## Project Purpose
Group Therapy Events is a public-facing website for promoting rave/community events and directing attendees to RSVP on Partiful.

The original idea was to keep the site simple, fast, and low-maintenance:
- Static website hosted on GitHub Pages.
- TypeScript-based frontend.
- Tailwind CSS for styling.
- No backend in phase 1.
- No auth or admin dashboard.

## Core Product Goals
1. Make it easy for visitors to quickly find and open upcoming events.
2. Keep event management lightweight for non-technical team members.
3. Preserve a clear brand identity focused on music, connection, and community.
4. Stay deployment-friendly for GitHub-based workflows.

## Initial Content Model
Event content is stored in `src/data/events.json` so collaborators can update:
- title
- date/time
- location
- description
- image
- Partiful URL
- status

This allows edits without touching app logic.

## Brand Direction (Initial)
The website was designed around two layers:
- **Parent brand**: Group Therapy Events (community-first, grounded, supportive)
- **Flagship series**: Chai Rave Club (high-energy, neon-traditional, sensory nightlife)

## Phase-1 Constraints
The first version intentionally excluded:
- ticketing flows (Partiful handles RSVP)
- custom backend APIs
- CMS/admin system
- authentication/permissions

The main success metric for phase 1 is straightforward: visitors can discover events and click out to Partiful quickly.
