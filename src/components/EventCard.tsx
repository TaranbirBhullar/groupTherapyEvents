import type { Event } from '../types/event';
import { formatEventDate } from '../lib/date';
import { trackPartifulClick } from '../lib/analytics';

interface EventCardProps {
  event: Event;
  priorityPartiful?: boolean;
}

export function EventCard({ event, priorityPartiful = false }: EventCardProps): JSX.Element {
  const statusClass = event.status === 'cancelled'
    ? 'bg-white/5 text-slate-300 border border-white/20'
    : event.status === 'past'
      ? 'bg-white/5 text-slate-300 border border-white/20'
      : 'bg-white/5 text-slate-200 border border-white/20';

  return (
    <article className="relative overflow-hidden rounded-xl border border-white/10 bg-ink transition hover:border-white/20">
      <a
        href={event.partifulUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackPartifulClick(event.title, event.slug)}
        className="absolute inset-0 z-10"
        aria-label={`Open ${event.title} on Partiful`}
      />
      <img src={event.image} alt={event.title} className="h-52 w-full object-cover" />
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-white">{event.title}</h3>
          <span className={`rounded-full px-2 py-1 text-xs font-medium tracking-wide ${statusClass}`}>
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
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-midnight transition ${
              priorityPartiful ? 'bg-white hover:bg-slate-200' : 'bg-slate-300 hover:bg-slate-200'
            }`}
          >
            Open Partiful
          </a>
        </div>
      </div>
    </article>
  );
}
