import { Link } from 'react-router-dom';
import { trackPartifulClick } from '../lib/analytics';
import { formatEventDate } from '../lib/date';
import { getPastEvents, getUpcomingEvents } from '../lib/eventsService';

export function HomePage(): JSX.Element {
  const featuredEvents = getUpcomingEvents(3);
  const pastEvents = getPastEvents().slice(0, 3);
  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-midnight text-slate-100">
      <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 sm:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/brand-inspiration.jpg')",
            filter: 'brightness(0.34) saturate(0.9)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/15 via-midnight/55 to-midnight" />
        <div className="relative mx-auto w-full max-w-6xl">
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl">
            Where music
            <br />
            <span className="text-acid">becomes community.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200">
            Group Therapy Events is a community-driven collective curating safe, inclusive spaces for connection through
            music, movement, and shared experiences.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('events')}
              className="bg-acid px-6 py-3 text-sm font-semibold text-midnight transition hover:bg-[#c49a58]"
            >
              View Upcoming Events
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Our World
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-24 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Who we are</h2>
            <p className="mt-6 text-lg text-slate-200">
              We&apos;re not a medical practice. We&apos;re a social movement: the idea that the best form of therapy can be found
              in authentic human connection, sound, and movement.
            </p>
            <p className="mt-4 text-base text-slate-400">Authentic, supportive, grounded, and slightly rebellious.</p>
          </div>
          <div className="h-[380px] overflow-hidden border border-white/10">
            <img
              src="/images/brand-inspiration.jpg"
              alt="Abstract landscape textures"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
          <article className="border border-white/10 bg-ink/30 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Parent Brand</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Group Therapy Events</h3>
            <p className="mt-3 text-slate-300">
              A lifestyle events collective on a mission to help people disconnect from digital overload and reconnect
              with each other through curated gatherings.
            </p>
          </article>
          <article className="border border-acid/35 bg-ink/30 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Flagship Series</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Chai Rave Club</h3>
            <p className="mt-3 text-slate-300">
              Our neon-traditional nightlife format where tea ritual meets underground electronic energy: aromatic,
              high-sensory, and community-first.
            </p>
            <Link to="/chai-rave" className="mt-4 inline-block text-sm font-semibold text-slate-200 hover:text-white">
              Explore Chai Rave Page
            </Link>
          </article>
        </div>
      </section>

      <section id="events" className="border-y border-white/10 bg-ink/60 px-6 py-24 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Upcoming events
          </h2>
          <div className="mt-12 space-y-5">
            {featuredEvents.map((event) => {
              const dateObj = new Date(event.datetime);
              const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(dateObj);
              const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObj).toUpperCase();

              return (
                <article
                  key={event.id}
                  className="grid gap-6 border border-white/10 bg-midnight/40 p-6 transition hover:border-white/30 md:grid-cols-[88px_1fr_auto] md:items-center"
                >
                  <div className="text-center">
                    <p className="font-display text-5xl font-bold text-acid">{day}</p>
                    <p className="text-xs tracking-[0.2em] text-slate-400">{month}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{event.location}</p>
                    <p className="text-sm text-slate-400">{formatEventDate(event.datetime, event.timezone)}</p>
                  </div>
                  <a
                    href={event.partifulUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackPartifulClick(event.title, event.slug)}
                    className="inline-flex items-center justify-center bg-acid px-5 py-3 text-sm font-semibold text-midnight transition hover:bg-[#c49a58]"
                  >
                    Open Partiful
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Recent past events
          </h2>
          <div className="mt-12 space-y-5">
            {pastEvents.map((event) => {
              const dateObj = new Date(event.datetime);
              const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(dateObj);
              const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObj).toUpperCase();

              return (
                <article
                  key={event.id}
                  className="grid gap-6 border border-white/10 bg-midnight/40 p-6 transition hover:border-white/30 md:grid-cols-[88px_1fr_auto] md:items-center"
                >
                  <div className="text-center">
                    <p className="font-display text-5xl font-bold text-slate-300">{day}</p>
                    <p className="text-xs tracking-[0.2em] text-slate-400">{month}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{event.location}</p>
                    <p className="text-sm text-slate-400">{formatEventDate(event.datetime, event.timezone)}</p>
                  </div>
                  <a
                    href={event.partifulUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackPartifulClick(event.title, event.slug)}
                    className="inline-flex items-center justify-center border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Open Partiful
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-slate-300">Questions, collabs, or artist submissions.</p>
          <Link to="/contact" className="border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
            Go to Contact Page
          </Link>
        </div>
      </section>
    </div>
  );
}
