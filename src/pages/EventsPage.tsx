import { EventCard } from '../components/EventCard';
import { getPastEvents, getUpcomingEvents } from '../lib/eventsService';

export function EventsPage(): JSX.Element {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Group Therapy Events</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">Events</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Explore upcoming and past sessions. Each event links directly to its Partiful page for RSVP details.
        </p>
      </header>

      <section className="space-y-4 border border-white/15 bg-ink/50 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-white">Upcoming Events</h2>
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="space-y-4 border border-white/15 bg-ink/50 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-white">Past Events</h2>
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {past.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
