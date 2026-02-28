import { Link } from 'react-router-dom';
import type { Event } from '../types/event';
import { formatEventDate } from '../lib/date';
import { trackPartifulClick } from '../lib/analytics';

interface EventCardProps {
  event: Event;
  priorityPartiful?: boolean;
}

export function EventCard({ event, priorityPartiful = false }: EventCardProps): JSX.Element {
  const statusClass = event.status === 'cancelled'
    ? 'bg-red-500/20 text-red-200 border border-red-400/30'
    : event.status === 'past'
      ? 'bg-slate-500/20 text-slate-200 border border-slate-300/20'
      : 'bg-acid/20 text-acid border border-acid/40';

  return (
    <article className="relative overflow-hidden rounded-xl border border-white/10 bg-ink shadow-neon transition">
      <Link to={`/events/${event.slug}`} className="absolute inset-0 z-10" aria-label={`View details for ${event.title}`} />
      <img src={event.image} alt={event.title} className="h-52 w-full object-cover" />
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-white">{event.title}</h3>
          <span className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass}`}>
            {event.status}
          </span>
        </div>
        <p className="text-sm text-slate-300">{formatEventDate(event.datetime, event.timezone)}</p>
        <p className="text-sm text-slate-400">{event.location}</p>
        <p className="text-sm text-slate-300">{event.description}</p>
        <div className="relative z-20 flex items-center gap-3">
          <a
            href={event.partifulUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackPartifulClick(event.title, event.slug)}
            className={`rounded-lg px-4 py-2 text-sm font-bold uppercase tracking-wide text-midnight transition ${
              priorityPartiful ? 'bg-acid hover:bg-slate-300' : 'bg-cyanflash hover:bg-slate-400'
            }`}
          >
            Open on Partiful
          </a>
          <Link
            to={`/events/${event.slug}`}
            className="rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-white/40"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
