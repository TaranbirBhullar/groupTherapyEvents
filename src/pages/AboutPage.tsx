export function AboutPage(): JSX.Element {
  return (
    <div className="space-y-6 rounded-3xl border border-cyanflash/20 bg-ink/80 p-8">
      <h1 className="font-display text-3xl font-bold text-white">About ChaiRave</h1>
      <p className="max-w-3xl text-slate-200">
        ChaiRave is a public event board for rave communities. We keep event discovery simple and direct each listing
        to its Partiful page for RSVP and attendance details.
      </p>
      <p className="text-slate-300">Questions or collabs: hello@chairave.com</p>
      <div className="flex gap-4 text-sm font-semibold">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
      </div>
    </div>
  );
}
