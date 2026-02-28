import eventsData from '../data/events.json';
import type { Event } from '../types/event';
import { toTimestamp } from './date';

const events = eventsData as Event[];

export function getAllEvents(): Event[] {
  return [...events].sort((a, b) => toTimestamp(a.datetime) - toTimestamp(b.datetime));
}

export function getUpcomingEvents(limit?: number): Event[] {
  const filtered = getAllEvents().filter((event) => event.status === 'upcoming');
  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered;
}

export function getPastEvents(): Event[] {
  return getAllEvents().filter((event) => event.status === 'past').reverse();
}

export function getEventBySlug(slug: string): Event | undefined {
  return getAllEvents().find((event) => event.slug === slug);
}
