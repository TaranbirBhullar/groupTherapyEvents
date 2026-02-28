import { FormEvent, useMemo, useState } from 'react';

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

type ArtistFormState = {
  artistName: string;
  contactEmail: string;
  phone: string;
  instagram: string;
  tiktok: string;
  soundcloud: string;
  blurb: string;
};

type FormType = 'general' | 'artist' | null;

const EMAIL_TO = 'chairaveclub@gmail.com';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactPage(): JSX.Element {
  const [contact, setContact] = useState<ContactFormState>({
    name: '',
    email: '',
    message: ''
  });
  const [artist, setArtist] = useState<ArtistFormState>({
    artistName: '',
    contactEmail: '',
    phone: '',
    instagram: '',
    tiktok: '',
    soundcloud: '',
    blurb: ''
  });
  const [contactError, setContactError] = useState('');
  const [artistError, setArtistError] = useState('');
  const [activeForm, setActiveForm] = useState<FormType>(null);

  const hasArtistSocial = useMemo(
    () => [artist.instagram, artist.tiktok, artist.soundcloud].some((value) => value.trim().length > 0),
    [artist]
  );
  const inputClass =
    'w-full border border-white/20 bg-ink/50 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-white/60';
  const labelClass = 'mb-2 block text-xs uppercase tracking-[0.14em] text-slate-400';

  const openEmail = (subject: string, body: string): void => {
    const href = `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  const submitContact = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setContactError('');

    if (contact.name.trim().length < 2) {
      setContactError('Name should be at least 2 characters.');
      return;
    }
    if (!emailPattern.test(contact.email.trim())) {
      setContactError('Please enter a valid email.');
      return;
    }
    if (contact.message.trim().length < 10) {
      setContactError('Message should be at least 10 characters.');
      return;
    }

    const body = [
      'General Contact Submission',
      '',
      `Name: ${contact.name.trim()}`,
      `Email: ${contact.email.trim()}`,
      '',
      'Message:',
      contact.message.trim()
    ].join('\n');

    openEmail('Group Therapy Events - General Contact', body);
  };

  const submitArtist = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setArtistError('');

    if (artist.artistName.trim().length < 2) {
      setArtistError('Artist/stage name should be at least 2 characters.');
      return;
    }
    if (!emailPattern.test(artist.contactEmail.trim())) {
      setArtistError('Please enter a valid contact email.');
      return;
    }
    if (!hasArtistSocial) {
      setArtistError('Please provide at least one social handle/link.');
      return;
    }
    if (artist.blurb.length > 500) {
      setArtistError('Blurb should be 500 characters or less.');
      return;
    }

    const body = [
      'Artist Join Submission',
      '',
      `Artist Name: ${artist.artistName.trim()}`,
      `Contact Email: ${artist.contactEmail.trim()}`,
      `Phone: ${artist.phone.trim() || 'N/A'}`,
      '',
      'Social Handles',
      `Instagram: ${artist.instagram.trim() || 'N/A'}`,
      `TikTok: ${artist.tiktok.trim() || 'N/A'}`,
      `SoundCloud: ${artist.soundcloud.trim() || 'N/A'}`,
      '',
      'Blurb:',
      artist.blurb.trim() || 'N/A'
    ].join('\n');

    openEmail('Group Therapy Events - Artist Join Request', body);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Group Therapy Events</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">Contact</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Reach out for collaborations, partnerships, or general questions. We usually respond within 1-2 days.
        </p>
        <p className="mt-3 text-sm text-slate-400">
          All submissions route to{' '}
          <a href={`mailto:${EMAIL_TO}`} className="text-slate-200 underline underline-offset-4 hover:text-white">
            {EMAIL_TO}
          </a>
          .
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveForm((prev) => (prev === 'general' ? null : 'general'))}
          className={`border px-5 py-4 text-left transition ${
            activeForm === 'general'
              ? 'border-white/60 bg-white/10'
              : 'border-white/15 bg-ink/40 hover:border-white/35 hover:bg-ink/60'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">01</p>
          <p className="mt-2 text-lg font-medium text-white">General inquiry</p>
          <p className="mt-1 text-sm text-slate-300">Questions about events, partnerships, or media.</p>
        </button>

        <button
          type="button"
          onClick={() => setActiveForm((prev) => (prev === 'artist' ? null : 'artist'))}
          className={`border px-5 py-4 text-left transition ${
            activeForm === 'artist'
              ? 'border-white/60 bg-white/10'
              : 'border-white/15 bg-ink/40 hover:border-white/35 hover:bg-ink/60'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">02</p>
          <p className="mt-2 text-lg font-medium text-white">Artist collaboration</p>
          <p className="mt-1 text-sm text-slate-300">DJ, performer, or creative looking to collaborate.</p>
        </button>
      </section>

      {activeForm === 'general' && (
        <article className="border border-white/15 bg-ink/50 p-6 sm:p-8">
          <form className="space-y-5" onSubmit={submitContact}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>Name</span>
                <input
                  className={inputClass}
                  value={contact.name}
                  onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Email</span>
                <input
                  className={inputClass}
                  value={contact.email}
                  onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                />
              </label>
            </div>
            <label className="block">
              <span className={labelClass}>Message</span>
              <textarea
                rows={6}
                className={inputClass}
                value={contact.message}
                onChange={(e) => setContact((prev) => ({ ...prev, message: e.target.value }))}
              />
            </label>
            {contactError && <p className="text-sm text-rose-300">{contactError}</p>}
            <button type="submit" className="border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Send General Inquiry
            </button>
          </form>
        </article>
      )}

      {activeForm === 'artist' && (
        <article className="border border-white/15 bg-ink/50 p-6 sm:p-8">
          <form className="space-y-5" onSubmit={submitArtist}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>Artist / Stage Name</span>
                <input
                  className={inputClass}
                  value={artist.artistName}
                  onChange={(e) => setArtist((prev) => ({ ...prev, artistName: e.target.value }))}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Contact Email</span>
                <input
                  className={inputClass}
                  value={artist.contactEmail}
                  onChange={(e) => setArtist((prev) => ({ ...prev, contactEmail: e.target.value }))}
                />
              </label>
            </div>

            <label className="block">
              <span className={labelClass}>Phone (optional)</span>
              <input
                className={inputClass}
                value={artist.phone}
                onChange={(e) => setArtist((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-3">
              <label className="block">
                <span className={labelClass}>Instagram</span>
                <input
                  className={inputClass}
                  value={artist.instagram}
                  onChange={(e) => setArtist((prev) => ({ ...prev, instagram: e.target.value }))}
                />
              </label>
              <label className="block">
                <span className={labelClass}>TikTok</span>
                <input
                  className={inputClass}
                  value={artist.tiktok}
                  onChange={(e) => setArtist((prev) => ({ ...prev, tiktok: e.target.value }))}
                />
              </label>
              <label className="block">
                <span className={labelClass}>SoundCloud</span>
                <input
                  className={inputClass}
                  value={artist.soundcloud}
                  onChange={(e) => setArtist((prev) => ({ ...prev, soundcloud: e.target.value }))}
                />
              </label>
            </div>

            <label className="block">
              <span className={labelClass}>Short Blurb (optional, max 500 chars)</span>
              <textarea
                rows={5}
                maxLength={500}
                className={inputClass}
                value={artist.blurb}
                onChange={(e) => setArtist((prev) => ({ ...prev, blurb: e.target.value }))}
              />
            </label>

            <p className="text-xs text-slate-400">At least one social handle is required.</p>
            {artistError && <p className="text-sm text-rose-300">{artistError}</p>}
            <button type="submit" className="border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Send Artist Submission
            </button>
          </form>
        </article>
      )}
    </div>
  );
}
