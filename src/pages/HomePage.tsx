import { Link } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { getUpcomingEvents } from '../lib/eventsService';

export function HomePage(): JSX.Element {
  const featuredEvents = getUpcomingEvents(3);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-white/10 bg-ink p-8 shadow-neon">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Group Therapy Events</p>
        <h1 className="max-w-2xl font-display text-4xl font-bold text-white sm:text-5xl">
          Events For Connected Communities
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Discover upcoming gatherings, keep your crew in sync, and jump to each Partiful page in one click.
        </p>
        <div className="mt-6">
          <Link to="/events" className="rounded-lg border border-white/20 px-4 py-2 font-semibold text-slate-100 hover:bg-white/5">
            View All Events
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-ink p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Who It&apos;s For</p>
          <p className="text-slate-200">
            People who care about culture-forward events and friend groups that want one reliable place to plan together.
          </p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-ink p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Why It&apos;s Worth It</p>
          <p className="text-slate-200">
            Faster decisions and better turnout: key details are visible instantly, and every event links directly to
            Partiful without extra steps.
          </p>
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-white">Next 2-3 Events</h2>
          <Link to="/events" className="text-sm font-semibold text-slate-200 hover:text-white">See full calendar</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} priorityPartiful />
          ))}
        </div>
      </section>
    </div>
  );
}
