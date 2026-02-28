import { Link } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { getUpcomingEvents } from '../lib/eventsService';

export function HomePage(): JSX.Element {
  const featuredEvents = getUpcomingEvents(3);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-cyanflash/30 bg-ink/70 p-8 shadow-neon">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyanflash">Bay Area Rave Signal</p>
        <h1 className="max-w-2xl font-display text-4xl font-extrabold text-white sm:text-5xl">
          Upcoming Raves With Fast Partiful Access
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Tap into the next events and open each Partiful page in one click. No friction, just the next dance floor.
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
            Ravers who want the next 2-3 events fast, plus crews who share lineups and need one clean link hub.
          </p>
        </article>
        <article className="rounded-2xl border border-acid/20 bg-ink/80 p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-acid">Why It&apos;s Worth It</p>
          <p className="text-slate-200">
            You skip hunt-and-scroll time by opening each event&apos;s Partiful in one click, with dates and location context
            visible immediately.
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
