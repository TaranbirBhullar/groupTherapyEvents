import { Link, useParams } from 'react-router-dom';
import { formatEventDate } from '../lib/date';
import { trackPartifulClick } from '../lib/analytics';
import { getEventBySlug } from '../lib/eventsService';

export function EventDetailPage(): JSX.Element {
  const { slug } = useParams();
  const event = slug ? getEventBySlug(slug) : undefined;

  if (!event) {
    return (
      <div className="space-y-4 border border-red-300/30 bg-red-950/30 p-6">
        <h1 className="font-display text-2xl font-bold">Event not found</h1>
        <Link to="/events" className="text-slate-200 hover:text-white">Back to events</Link>
      </div>
    );
  }

  return (
    <article className="overflow-hidden border border-white/10 bg-ink/80">
      <img src={event.image} alt={event.title} className="h-72 w-full object-cover sm:h-96" />
      <div className="space-y-6 p-6 sm:p-8">
        <header className="space-y-3">
          <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">{event.title}</h1>
          <p className="text-base text-slate-200">{formatEventDate(event.datetime, event.timezone)} • {event.location}</p>
        </header>

        <p className="max-w-3xl text-slate-200">{event.description}</p>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Lineup</p>
          <ul className="flex flex-wrap gap-2">
            {event.lineup.map((artist) => (
              <li key={artist} className="border border-slate-300/30 px-3 py-1 text-sm text-slate-200">
                {artist}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={event.partifulUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackPartifulClick(event.title, event.slug)}
            className="bg-acid px-5 py-3 text-sm font-bold uppercase tracking-wide text-midnight hover:bg-lime-300"
          >
            Open on Partiful
          </a>
          <Link to="/events" className="border border-slate-300/30 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-white/60">
            Back to Events
          </Link>
        </div>
      </div>
    </article>
  );
}
