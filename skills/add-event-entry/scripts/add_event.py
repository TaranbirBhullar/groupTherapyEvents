#!/usr/bin/env python3
import argparse
import json
import os
import re
from datetime import datetime
from pathlib import Path

ALLOWED_STATUS = {"upcoming", "past", "cancelled"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Add a new event entry to src/data/events.json")
    parser.add_argument("--events-file", default="src/data/events.json")
    parser.add_argument("--slug", required=True)
    parser.add_argument("--title", required=True)
    parser.add_argument("--datetime", required=True, dest="dt")
    parser.add_argument("--timezone", required=True)
    parser.add_argument("--location", required=True)
    parser.add_argument("--description", required=True)
    parser.add_argument("--partiful-url", required=True)
    parser.add_argument("--lineup", default="")
    parser.add_argument("--status", default="upcoming", choices=sorted(ALLOWED_STATUS))
    parser.add_argument("--image", default="")
    return parser.parse_args()


def load_events(path: Path):
    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)
    if not isinstance(data, list):
        raise ValueError("events file must contain a JSON array")
    return data


def next_event_id(events) -> str:
    nums = []
    for e in events:
        m = re.match(r"^evt_(\d+)$", str(e.get("id", "")))
        if m:
            nums.append(int(m.group(1)))
    return f"evt_{(max(nums) + 1) if nums else 1:03d}"


def ensure_datetime(value: str) -> None:
    datetime.fromisoformat(value)


def ensure_slug(value: str) -> None:
    if not re.match(r"^[a-z0-9]+(?:-[a-z0-9]+)*$", value):
        raise ValueError("slug must be kebab-case (lowercase letters, numbers, hyphens)")


def create_placeholder_svg(path: Path, title: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        return
    safe_title = title.replace("&", "and")
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" fill="none">
  <rect width="1200" height="800" fill="#10141B"/>
  <text x="60" y="700" fill="#FFFFFF" font-size="72" font-family="sans-serif" font-weight="700">{safe_title}</text>
</svg>
'''
    path.write_text(svg, encoding="utf-8")


def main() -> int:
    args = parse_args()
    ensure_slug(args.slug)
    ensure_datetime(args.dt)

    if not args.partiful_url.startswith("https://partiful.com/"):
        raise ValueError("partiful-url must start with https://partiful.com/")

    events_path = Path(args.events_file)
    events = load_events(events_path)

    slugs = {str(e.get("slug", "")) for e in events}
    if args.slug in slugs:
        raise ValueError(f"slug already exists: {args.slug}")

    image_path = args.image.strip() or f"/events/{args.slug}/poster.svg"
    lineup = [x.strip() for x in args.lineup.split(",") if x.strip()]

    new_event = {
        "id": next_event_id(events),
        "slug": args.slug,
        "title": args.title,
        "datetime": args.dt,
        "timezone": args.timezone,
        "location": args.location,
        "lineup": lineup,
        "description": args.description,
        "partifulUrl": args.partiful_url,
        "image": image_path,
        "status": args.status,
    }

    events.append(new_event)
    events.sort(key=lambda e: e.get("datetime", ""))

    events_path.write_text(json.dumps(events, indent=2) + "\n", encoding="utf-8")

    if image_path.startswith("/events/"):
        local_image = Path("public") / image_path.lstrip("/")
        create_placeholder_svg(local_image, args.title)
        print(f"Prepared image path: {local_image}")

    print(f"Added event: {new_event['id']} ({new_event['slug']})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
