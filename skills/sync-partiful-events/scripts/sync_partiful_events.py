#!/usr/bin/env python3
"""Sync published events from a Partiful organizer page into src/data/events.json."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import unicodedata
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

PARTIFUL_API = "https://api.partiful.com/getPublishedEvents"


@dataclass
class IcsDetails:
    location: str | None = None
    description: str | None = None
    url: str | None = None


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Sync events.json from Partiful organizer page")
    parser.add_argument("--organizer-url", required=True, help="Partiful organizer URL, e.g. https://partiful.com/u/<userId>")
    parser.add_argument("--events-file", default="src/data/events.json")
    parser.add_argument("--public-dir", default="public")
    parser.add_argument("--max-events", type=int, default=0, help="Optional cap for imported events")
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


def extract_user_id(organizer_url: str) -> str:
    parsed = urlparse(organizer_url)
    if not parsed.scheme:
        organizer_url = organizer_url.strip()
        if re.fullmatch(r"[A-Za-z0-9_-]{10,}", organizer_url):
            return organizer_url
        raise ValueError("organizer-url must be a valid URL or raw userId")

    parts = [p for p in parsed.path.split("/") if p]
    if len(parts) >= 2 and parts[0] == "u":
        return parts[1]
    raise ValueError("Could not parse userId from organizer URL. Expected /u/<userId>")


def run_curl(args: list[str], timeout: int) -> bytes:
    cmd = ["curl", "-fsSL", "--max-time", str(timeout), *args]
    completed = subprocess.run(cmd, check=True, capture_output=True)
    return completed.stdout


def http_json(url: str, payload: dict[str, Any], timeout: int = 30) -> dict[str, Any]:
    body = json.dumps(payload, separators=(",", ":"))
    out = run_curl(["-H", "content-type: application/json", "--data", body, url], timeout=timeout)
    return json.loads(out.decode("utf-8"))


def fetch_published_events(user_id: str) -> list[dict[str, Any]]:
    payload = {"data": {"params": {"userId": user_id}}}
    raw = http_json(PARTIFUL_API, payload)
    events = raw.get("result", {}).get("data", [])
    if not isinstance(events, list):
        raise ValueError("Unexpected Partiful response shape")
    return events


def unfold_ics_lines(text: str) -> list[str]:
    lines = text.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    unfolded: list[str] = []
    for line in lines:
        if line.startswith((" ", "\t")) and unfolded:
            unfolded[-1] += line[1:]
        else:
            unfolded.append(line)
    return unfolded


def unescape_ics_value(value: str) -> str:
    return (
        value.replace("\\n", "\n")
        .replace("\\,", ",")
        .replace("\\;", ";")
        .replace("\\\\", "\\")
        .strip()
    )


def fetch_ics_details(calendar_url: str | None) -> IcsDetails:
    if not calendar_url:
        return IcsDetails()

    text = run_curl([calendar_url], timeout=30).decode("utf-8", errors="replace")

    details = IcsDetails()
    for line in unfold_ics_lines(text):
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        main_key = key.split(";", 1)[0].upper()
        val = unescape_ics_value(value)
        if main_key == "LOCATION" and not details.location:
            details.location = val
        elif main_key == "DESCRIPTION" and not details.description:
            details.description = val
        elif main_key == "URL" and not details.url:
            details.url = val
    return details


def normalize_description(text: str | None) -> str:
    if not text:
        return "Partiful event listing."

    text = text.strip()
    text = re.sub(r"^View this event on Partiful at\s+https?://\S+\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    if len(text) <= 360:
        return text

    clipped = text[:357].rsplit(" ", 1)[0].strip()
    return f"{clipped}..."


def slugify(text: str) -> str:
    ascii_text = (
        unicodedata.normalize("NFKD", text)
        .encode("ascii", "ignore")
        .decode("ascii")
        .lower()
    )
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_text).strip("-")
    return slug or "event"


def parse_iso(value: str) -> datetime:
    if value.endswith("Z"):
        value = value[:-1] + "+00:00"
    dt = datetime.fromisoformat(value)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt


def compute_status(start_date: str, raw_status: str | None) -> str:
    status = (raw_status or "").upper()
    if "CANCEL" in status:
        return "cancelled"
    return "past" if parse_iso(start_date) <= datetime.now(timezone.utc) else "upcoming"


def ensure_unique_slug(base_slug: str, used: set[str], event_id: str) -> str:
    slug = base_slug
    if slug in used:
        suffix = re.sub(r"[^a-z0-9]", "", event_id.lower())[:6] or "evt"
        slug = f"{base_slug}-{suffix}"
    i = 2
    while slug in used:
        slug = f"{base_slug}-{i}"
        i += 1
    used.add(slug)
    return slug


def write_placeholder(path: Path, title: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    safe_title = title.replace("&", "and")
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" fill="none">\n  <rect width="1200" height="800" fill="#10141B"/>\n  <text x="60" y="700" fill="#FFFFFF" font-size="64" font-family="sans-serif" font-weight="700">{safe_title}</text>\n</svg>\n'''
    path.write_text(svg, encoding="utf-8")


def guess_extension(content_type: str | None) -> str:
    if not content_type:
        return ".jpg"
    ct = content_type.lower()
    if "png" in ct:
        return ".png"
    if "webp" in ct:
        return ".webp"
    if "gif" in ct:
        return ".gif"
    if "svg" in ct:
        return ".svg"
    return ".jpg"


def fetch_content_type(url: str, timeout: int = 30) -> str | None:
    cmd = ["curl", "-fsSLI", "--max-time", str(timeout), url]
    completed = subprocess.run(cmd, check=True, capture_output=True, text=True)
    for raw_line in completed.stdout.splitlines():
        line = raw_line.strip()
        if line.lower().startswith("content-type:"):
            return line.split(":", 1)[1].strip()
    return None


def save_event_image(image_url: str | None, public_dir: Path, slug: str, title: str, dry_run: bool = False) -> str:
    if dry_run:
        return f"/events/{slug}/poster.svg"

    event_dir = public_dir / "events" / slug
    event_dir.mkdir(parents=True, exist_ok=True)

    if not image_url:
        fallback = event_dir / "poster.svg"
        write_placeholder(fallback, title)
        return f"/events/{slug}/poster.svg"

    try:
        content_type = fetch_content_type(image_url, timeout=45)
        data = run_curl([image_url], timeout=45)
        ext = guess_extension(content_type)
        target = event_dir / f"poster{ext}"
        target.write_bytes(data)
        return f"/events/{slug}/poster{ext}"
    except Exception:
        fallback = event_dir / "poster.svg"
        write_placeholder(fallback, title)
        return f"/events/{slug}/poster.svg"


def main() -> int:
    args = parse_args()
    user_id = extract_user_id(args.organizer_url)

    partiful_events = fetch_published_events(user_id)
    if args.max_events > 0:
        partiful_events = partiful_events[: args.max_events]

    public_dir = Path(args.public_dir)
    used_slugs: set[str] = set()
    mapped_events: list[dict[str, Any]] = []

    for event in partiful_events:
        event_id = str(event.get("id", "")).strip()
        title = str(event.get("title", "Untitled Event")).strip()
        start_date = str(event.get("startDate", "")).strip()
        timezone_name = str(event.get("timezone", "America/Los_Angeles")).strip()
        if not event_id or not start_date:
            continue

        slug = ensure_unique_slug(slugify(title), used_slugs, event_id)

        ics = fetch_ics_details(event.get("calendarFile"))
        location = ics.location or "Location TBA"
        partiful_url = ics.url or f"https://partiful.com/e/{event_id}"
        description = normalize_description(ics.description)

        image_url = None
        image_obj = event.get("image")
        if isinstance(image_obj, dict):
            image_url = image_obj.get("url")

        image_path = save_event_image(image_url, public_dir, slug, title, dry_run=args.dry_run)

        mapped_events.append(
            {
                "id": event_id,
                "slug": slug,
                "title": title,
                "datetime": start_date,
                "timezone": timezone_name,
                "location": location,
                "lineup": [],
                "description": description,
                "partifulUrl": partiful_url,
                "image": image_path,
                "status": compute_status(start_date, str(event.get("status", ""))),
            }
        )

    mapped_events.sort(key=lambda e: e["datetime"])

    if args.dry_run:
        print(f"Would sync {len(mapped_events)} events from organizer {user_id}:")
        for e in mapped_events:
            print(f"- {e['datetime']} | {e['title']} | {e['status']}")
        return 0

    events_file = Path(args.events_file)
    events_file.parent.mkdir(parents=True, exist_ok=True)
    events_file.write_text(json.dumps(mapped_events, indent=2) + "\n", encoding="utf-8")

    print(f"Synced {len(mapped_events)} events to {events_file}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
