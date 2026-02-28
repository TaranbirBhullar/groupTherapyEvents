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

  const hasArtistSocial = useMemo(
    () => [artist.instagram, artist.tiktok, artist.soundcloud].some((value) => value.trim().length > 0),
    [artist]
  );

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
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="font-display text-4xl font-semibold text-white">Contact</h1>
        <p className="max-w-2xl text-slate-300">
          Send a general note or submit an artist profile. Submissions are sent to {EMAIL_TO}.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-ink/50 p-6">
          <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
          <form className="mt-5 space-y-4" onSubmit={submitContact}>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Name</span>
              <input
                className="w-full rounded-md border border-white/15 bg-midnight px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                value={contact.name}
                onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Email</span>
              <input
                className="w-full rounded-md border border-white/15 bg-midnight px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                value={contact.email}
                onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Message</span>
              <textarea
                rows={5}
                className="w-full rounded-md border border-white/15 bg-midnight px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                value={contact.message}
                onChange={(e) => setContact((prev) => ({ ...prev, message: e.target.value }))}
              />
            </label>
            {contactError && <p className="text-sm text-red-300">{contactError}</p>}
            <button
              type="submit"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-midnight transition hover:bg-slate-200"
            >
              Send Contact Email
            </button>
          </form>
        </article>

        <article className="rounded-xl border border-white/10 bg-ink/50 p-6">
          <h2 className="text-2xl font-semibold text-white">Artist Join Form</h2>
          <form className="mt-5 space-y-4" onSubmit={submitArtist}>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Artist/Stage Name</span>
              <input
                className="w-full rounded-md border border-white/15 bg-midnight px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                value={artist.artistName}
                onChange={(e) => setArtist((prev) => ({ ...prev, artistName: e.target.value }))}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Contact Email</span>
              <input
                className="w-full rounded-md border border-white/15 bg-midnight px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                value={artist.contactEmail}
                onChange={(e) => setArtist((prev) => ({ ...prev, contactEmail: e.target.value }))}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Phone (optional)</span>
              <input
                className="w-full rounded-md border border-white/15 bg-midnight px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                value={artist.phone}
                onChange={(e) => setArtist((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block space-y-2">
                <span className="text-sm text-slate-300">Instagram</span>
                <input
                  className="w-full rounded-md border border-white/15 bg-midnight px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                  value={artist.instagram}
                  onChange={(e) => setArtist((prev) => ({ ...prev, instagram: e.target.value }))}
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-slate-300">TikTok</span>
                <input
                  className="w-full rounded-md border border-white/15 bg-midnight px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                  value={artist.tiktok}
                  onChange={(e) => setArtist((prev) => ({ ...prev, tiktok: e.target.value }))}
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-slate-300">SoundCloud</span>
                <input
                  className="w-full rounded-md border border-white/15 bg-midnight px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                  value={artist.soundcloud}
                  onChange={(e) => setArtist((prev) => ({ ...prev, soundcloud: e.target.value }))}
                />
              </label>
            </div>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Short Blurb (optional, max 500 chars)</span>
              <textarea
                rows={4}
                maxLength={500}
                className="w-full rounded-md border border-white/15 bg-midnight px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                value={artist.blurb}
                onChange={(e) => setArtist((prev) => ({ ...prev, blurb: e.target.value }))}
              />
            </label>
            <p className="text-xs text-slate-400">At least one social handle is required.</p>
            {artistError && <p className="text-sm text-red-300">{artistError}</p>}
            <button
              type="submit"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-midnight transition hover:bg-slate-200"
            >
              Send Artist Submission
            </button>
          </form>
        </article>
      </section>
    </div>
  );
}
