import { EventCard } from '../components/EventCard';
import { getPastEvents, getUpcomingEvents } from '../lib/eventsService';

export function EventsPage(): JSX.Element {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-display text-3xl font-semibold text-white">Upcoming events</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-white">Past events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {past.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
