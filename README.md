# Group Therapy Events

Static TypeScript website for promoting events with fast Partiful access.

## Local development

```bash
npm install
npm run dev
```

## Content editing

- Update event text/data in `src/data/events.json`.
- Add images under `public/events/<event-slug>/` and reference them via `/events/...` path.

## Contributor skills

Repo-local skills for non-technical updates live in `skills/`:

- `skills/run-local-site`: install deps and run local dev server
- `skills/add-event-entry`: add a new event with correct schema/path conventions
- `skills/edit-event-entry`: safely update an existing event
- `skills/validate-event-update`: validate event JSON/assets before commit

## Analytics

Set `VITE_GA_MEASUREMENT_ID` in a local `.env.local` file or GitHub repo secret.

## Deploy

Push to `main`; GitHub Actions builds and deploys to GitHub Pages.
