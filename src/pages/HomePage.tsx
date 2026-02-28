import { Link } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { getUpcomingEvents } from '../lib/eventsService';

export function HomePage(): JSX.Element {
  const featuredEvents = getUpcomingEvents(3);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-ink p-8">
        <p className="mb-3 text-sm font-medium text-slate-300">Group Therapy Events</p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold text-white sm:text-5xl">
          Find what&apos;s happening. Bring your people.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          A direct event board for community nights. Open each event&apos;s Partiful page in one click.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/events" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-midnight hover:bg-slate-200">
            Browse events
          </Link>
          <Link to="/events" className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5">
            View calendar
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-ink p-6">
          <p className="mb-2 text-sm font-semibold text-slate-300">Who it&apos;s for</p>
          <p className="text-slate-200">
            People who care about culture-forward events and friend groups that want one reliable place to plan together.
          </p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-ink p-6">
          <p className="mb-2 text-sm font-semibold text-slate-300">Why it&apos;s worth it</p>
          <p className="text-slate-200">
            Faster decisions and better turnout: key details are visible instantly, and every event links directly to
            Partiful without extra steps.
          </p>
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-white">Upcoming now</h2>
          <Link to="/events" className="text-sm font-medium text-slate-300 hover:text-white">See all</Link>
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
