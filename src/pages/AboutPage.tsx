export function AboutPage(): JSX.Element {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-ink p-8">
        <h1 className="font-display text-3xl font-semibold text-white">About Group Therapy Events</h1>
        <p className="mt-4 max-w-3xl text-slate-200">
          Group Therapy Events is a community-focused events collective dedicated to radical connection, mental
          wellness, and shared experiences. We are not a medical practice. We are an events production house built on
          the belief that music, movement, and authentic interaction can be powerful social therapy.
        </p>
        <p className="mt-4 text-slate-300">
          Mission: curate safe, inclusive spaces where people reconnect with themselves and each other.
        </p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-ink p-8">
        <h2 className="text-2xl font-semibold text-white">Chai Rave Club</h2>
        <p className="mt-4 max-w-3xl text-slate-200">
          Chai Rave Club is our flagship event series: an immersive nightlife experience that bridges tea culture and
          underground electronic music. It brings the warmth of chai ritual and the kinetic energy of rave culture into
          one space.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-sm border border-white/10 bg-midnight/50 p-4">
            <p className="text-sm font-semibold text-white">Open Spaces</p>
            <p className="mt-2 text-sm text-slate-300">Hosted in unique, airy architectural venues.</p>
          </article>
          <article className="rounded-sm border border-white/10 bg-midnight/50 p-4">
            <p className="text-sm font-semibold text-white">The Ritual</p>
            <p className="mt-2 text-sm text-slate-300">Serving chai as the communal anchor point.</p>
          </article>
          <article className="rounded-sm border border-white/10 bg-midnight/50 p-4">
            <p className="text-sm font-semibold text-white">The Sound</p>
            <p className="mt-2 text-sm text-slate-300">Curated underground electronic music at peak energy.</p>
          </article>
        </div>
        <p className="mt-5 text-sm text-slate-400">
          Brand voice: bold and empathetic. Design direction: grounded and earthy meets electric and nocturnal.
        </p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-ink p-8">
        <p className="text-slate-300">Questions or collabs: hello@grouptherapyevents.com</p>
        <div className="mt-4 flex gap-4 text-sm font-semibold">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
        </div>
      </section>
    </div>
  );
}
