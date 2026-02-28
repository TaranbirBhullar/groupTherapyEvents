import { Link } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { getUpcomingEvents } from '../lib/eventsService';

export function HomePage(): JSX.Element {
  const featuredEvents = getUpcomingEvents(3);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-cyanflash/30 bg-ink/70 p-8 shadow-neon">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyanflash">Group Therapy Events</p>
        <h1 className="max-w-2xl font-display text-4xl font-extrabold text-white sm:text-5xl">
          Elegant Event Discovery For Connected Communities
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Discover upcoming gatherings, keep your crew in sync, and jump to each Partiful page in one click.
        </p>
        <div className="mt-6">
          <Link to="/events" className="rounded-lg border border-acid px-4 py-2 font-semibold text-acid hover:bg-acid/10">
            View All Events
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-cyanflash/20 bg-ink/80 p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyanflash">Who It&apos;s For</p>
          <p className="text-slate-200">
            People who care about culture-forward events and friend groups that want one reliable place to plan together.
          </p>
        </article>
        <article className="rounded-2xl border border-acid/20 bg-ink/80 p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-acid">Why It&apos;s Worth It</p>
          <p className="text-slate-200">
            Faster decisions and better turnout: key details are visible instantly, and every event links directly to
            Partiful without extra steps.
          </p>
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-white">Next 2-3 Events</h2>
          <Link to="/events" className="text-sm font-semibold text-cyanflash">See full calendar</Link>
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
