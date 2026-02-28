# Event Schema

Required fields in `src/data/events.json`:
- `id` string (auto-generated like `evt_005`)
- `slug` string (kebab-case, unique)
- `title` string
- `datetime` ISO datetime string (`YYYY-MM-DDTHH:mm:ss`)
- `timezone` IANA timezone (example: `America/Los_Angeles`)
- `location` string
- `lineup` string[]
- `description` string
- `partifulUrl` string (`https://partiful.com/...`)
- `image` string path from web root (`/events/<slug>/poster.svg`)
- `status` one of: `upcoming`, `past`, `cancelled`

Asset convention:
- image files live in `public/events/<slug>/`
