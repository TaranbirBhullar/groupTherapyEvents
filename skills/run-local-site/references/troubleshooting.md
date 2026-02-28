# Local Run Troubleshooting

## Port in use
If `5173` is in use, run:
```bash
npm run dev -- --host 127.0.0.1 --port 5174
```

## Dependency issues
Try a clean reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Build fails
Run:
```bash
npm run build
```
Fix the first error shown, then rerun.
