---
name: run-local-site
description: Use this skill when someone needs to set up this repository and run it locally for development. It installs dependencies, starts the Vite dev server, and verifies production build readiness.
---

# Run Local Site

## Overview
Use this skill for local setup and day-to-day preview work. It is aimed at contributors who are not deeply technical.

## Workflow
1. From repo root, run setup/start script:
```bash
bash skills/run-local-site/scripts/start_local.sh
```
2. Open `http://127.0.0.1:5173/`.
3. Make content/code changes and verify hot reload.
4. Before commit, run build check:
```bash
npm run build
```

## Manual Commands
If someone prefers step-by-step commands:
```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

## Troubleshooting
See `references/troubleshooting.md`.
