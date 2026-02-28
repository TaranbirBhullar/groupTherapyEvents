export function AboutPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Group Therapy Events</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">About Us</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          A community-focused events collective dedicated to connection, mental wellness, and shared experiences
          through music and movement.
        </p>
      </header>

      <section className="border border-white/15 bg-ink/50 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Who We Are</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Group Therapy Events</h2>
        <p className="mt-4 max-w-3xl text-slate-200">
          Group Therapy Events is not a medical practice. We are a social movement and events production house built
          on the belief that authentic human interaction can be therapy in modern life.
        </p>
        <p className="mt-4 max-w-3xl text-slate-300">
          Mission: curate safe, inclusive spaces where people disconnect from noise and reconnect with themselves and
          each other.
        </p>
      </section>

      <section className="border border-white/15 bg-ink/50 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Flagship Series</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Chai Rave Club</h2>
        <p className="mt-4 max-w-3xl text-slate-200">
          Chai Rave Club bridges tea ritual and underground electronic music into one immersive format: warm
          hospitality, high-energy sound, and community-first nightlife.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="border border-white/10 bg-midnight/40 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Open Spaces</p>
            <p className="mt-2 text-sm text-slate-300">Hosted in unique, airy architectural venues.</p>
          </article>
          <article className="border border-white/10 bg-midnight/40 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">The Ritual</p>
            <p className="mt-2 text-sm text-slate-300">Serving chai as the communal anchor point.</p>
          </article>
          <article className="border border-white/10 bg-midnight/40 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">The Sound</p>
            <p className="mt-2 text-sm text-slate-300">Curated underground electronic music at peak energy.</p>
          </article>
        </div>
      </section>

      <section className="border border-white/15 bg-ink/50 p-6 sm:p-8">
        <p className="text-sm text-slate-300">
          Questions or collabs:{' '}
          <a href="mailto:chairaveclub@gmail.com" className="text-slate-100 underline underline-offset-4 hover:text-white">
            chairaveclub@gmail.com
          </a>
        </p>
        <div className="mt-4 flex gap-4 text-sm font-semibold">
          <a href="https://www.instagram.com/chairaveclub" target="_blank" rel="noreferrer" className="border border-white/20 px-3 py-2 hover:bg-white/10">
            Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
