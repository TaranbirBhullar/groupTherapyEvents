#!/usr/bin/env python3
import json
from datetime import datetime
from pathlib import Path

EVENTS_FILE = Path("src/data/events.json")
ALLOWED_STATUS = {"upcoming", "past", "cancelled"}
REQUIRED_KEYS = {
    "id": str,
    "slug": str,
    "title": str,
    "datetime": str,
    "timezone": str,
    "location": str,
    "lineup": list,
    "description": str,
    "partifulUrl": str,
    "image": str,
    "status": str,
}


def is_iso_datetime(value: str) -> bool:
    try:
        datetime.fromisoformat(value)
        return True
    except ValueError:
        return False


def main() -> int:
    if not EVENTS_FILE.exists():
        print(f"ERROR: Missing file: {EVENTS_FILE}")
        return 1

    data = json.loads(EVENTS_FILE.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        print("ERROR: src/data/events.json must be a JSON array")
        return 1

    errors = []
    ids = set()
    slugs = set()

    for idx, event in enumerate(data):
        prefix = f"event[{idx}]"
        if not isinstance(event, dict):
            errors.append(f"{prefix}: must be an object")
            continue

        for key, expected_type in REQUIRED_KEYS.items():
            if key not in event:
                errors.append(f"{prefix}: missing key '{key}'")
                continue
            if not isinstance(event[key], expected_type):
                errors.append(f"{prefix}: key '{key}' must be {expected_type.__name__}")

        if isinstance(event.get("lineup"), list):
            for item in event["lineup"]:
                if not isinstance(item, str):
                    errors.append(f"{prefix}: lineup values must be strings")

        event_id = event.get("id")
        if isinstance(event_id, str):
            if event_id in ids:
                errors.append(f"{prefix}: duplicate id '{event_id}'")
            ids.add(event_id)

        slug = event.get("slug")
        if isinstance(slug, str):
            if slug in slugs:
                errors.append(f"{prefix}: duplicate slug '{slug}'")
            slugs.add(slug)

        dt = event.get("datetime")
        if isinstance(dt, str) and not is_iso_datetime(dt):
            errors.append(f"{prefix}: datetime must be ISO format, got '{dt}'")

        status = event.get("status")
        if isinstance(status, str) and status not in ALLOWED_STATUS:
            errors.append(f"{prefix}: invalid status '{status}'")

        url = event.get("partifulUrl")
        if isinstance(url, str) and not url.startswith("https://partiful.com/"):
            errors.append(f"{prefix}: partifulUrl must start with https://partiful.com/")

        image = event.get("image")
        if isinstance(image, str):
            if not image.startswith("/"):
                errors.append(f"{prefix}: image must be absolute web path starting with '/', got '{image}'")
            image_file = Path("public") / image.lstrip("/")
            if not image_file.exists():
                errors.append(f"{prefix}: image file not found at {image_file}")

    if errors:
        print("Event validation failed:")
        for err in errors:
            print(f"- {err}")
        return 1

    print(f"Validation passed: {len(data)} events checked")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
