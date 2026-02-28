# Event Schema (Edit Reference)

Expected object shape in `src/data/events.json`:
- `id`: string
- `slug`: string (unique)
- `title`: string
- `datetime`: ISO datetime string
- `timezone`: string
- `location`: string
- `lineup`: string[]
- `description`: string
- `partifulUrl`: string
- `image`: string
- `status`: `upcoming` | `past` | `cancelled`
