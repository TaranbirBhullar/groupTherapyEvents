export function AboutPage(): JSX.Element {
  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-ink p-8">
      <h1 className="font-display text-3xl font-semibold text-white">About Group Therapy Events</h1>
      <p className="max-w-3xl text-slate-200">
        Group Therapy Events is a public event board designed to connect scenes and communities through a clean event
        discovery experience. Every listing routes directly to Partiful for RSVP details.
      </p>
      <p className="text-slate-300">Questions or collabs: hello@grouptherapyevents.com</p>
      <div className="flex gap-4 text-sm font-semibold">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
      </div>
    </div>
  );
}
