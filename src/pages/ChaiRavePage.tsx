import { Link } from 'react-router-dom';
import { chaiRaveInstagramProfile } from '../data/chaiRaveInstagram';
import { formatEventDate } from '../lib/date';
import { getPastEvents } from '../lib/eventsService';

export function ChaiRavePage(): JSX.Element {
  const pastEvents = getPastEvents().slice(0, 4);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-white/10 bg-ink p-8">
        <p className="text-sm uppercase tracking-[0.16em] text-slate-400">Flagship Series</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white">Chai Rave Club</h1>
        <p className="mt-4 max-w-3xl text-slate-200">
          Chai Rave Club blends tea ritual and underground electronic music into one high-sensory format: open spaces,
          peak-energy sound, and community-led nightlife.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Recent Events</h2>
          <Link to="/events" className="text-sm font-medium text-slate-300 hover:text-white">
            View all events
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {pastEvents.map((event) => (
            <article key={event.id} className="rounded-sm border border-white/10 bg-midnight/40 p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                {formatEventDate(event.datetime, event.timezone)}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{event.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{event.location}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Instagram</h2>
        </div>
        <div className="mx-auto max-w-xl rounded-sm border border-white/10 bg-midnight/40 p-6 text-center">
          <p className="text-sm text-slate-300">Follow recent drops and event media on Instagram.</p>
          <a
            href={chaiRaveInstagramProfile}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded border border-white/20 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
          >
            Open @chairaveclub
          </a>
          <div className="mt-3 text-xs text-slate-400">{chaiRaveInstagramProfile}</div>
        </div>
      </section>
    </div>
  );
}
