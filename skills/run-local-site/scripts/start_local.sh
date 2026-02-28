#!/usr/bin/env bash
set -euo pipefail

if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found. Install Node.js LTS first: https://nodejs.org/"
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
else
  echo "Dependencies already present (node_modules exists)."
fi

echo "Starting dev server on http://127.0.0.1:5173/"
npm run dev -- --host 127.0.0.1 --port 5173
