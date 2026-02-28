import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { chaiRaveInstagramPosts, chaiRaveInstagramProfile } from '../data/chaiRaveInstagram';
import { formatEventDate } from '../lib/date';
import { getPastEvents } from '../lib/eventsService';

export function ChaiRavePage(): JSX.Element {
  const pastEvents = getPastEvents().slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalPosts = chaiRaveInstagramPosts.length;

  const currentPost = useMemo(
    () => (totalPosts > 0 ? chaiRaveInstagramPosts[activeIndex] : null),
    [activeIndex, totalPosts]
  );

  const nextPost = (): void => {
    if (totalPosts === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalPosts);
  };

  const prevPost = (): void => {
    if (totalPosts === 0) return;
    setActiveIndex((prev) => (prev - 1 + totalPosts) % totalPosts);
  };

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
          <h2 className="text-2xl font-semibold text-white">Instagram Recap Carousel</h2>
          <a
            href={chaiRaveInstagramProfile}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-slate-300 hover:text-white"
          >
            Open Instagram
          </a>
        </div>
        {currentPost ? (
          <div className="space-y-4 overflow-hidden rounded-sm border border-white/10 bg-midnight/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prevPost}
                className="rounded border border-white/20 px-3 py-1 text-sm text-slate-200 hover:bg-white/10"
              >
                Prev
              </button>
              <p className="text-sm text-slate-300">
                {activeIndex + 1} / {totalPosts} • {currentPost.label}
              </p>
              <button
                type="button"
                onClick={nextPost}
                className="rounded border border-white/20 px-3 py-1 text-sm text-slate-200 hover:bg-white/10"
              >
                Next
              </button>
            </div>

            <iframe
              title={`Chai Rave Instagram post ${activeIndex + 1}`}
              src={`${currentPost.url.replace(/\/$/, '')}/embed`}
              className="h-[620px] w-full rounded-sm border border-white/10 bg-midnight/60"
              loading="lazy"
              allowTransparency
            />

            <div className="flex flex-wrap gap-2">
              {chaiRaveInstagramPosts.map((post, index) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded border px-2 py-1 text-xs ${
                    index === activeIndex
                      ? 'border-acid text-acid'
                      : 'border-white/20 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-sm border border-white/10 bg-midnight/40 p-6">
            <p className="text-slate-300">
              Add post URLs to <code>src/data/chaiRaveInstagram.ts</code> to activate the carousel.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
