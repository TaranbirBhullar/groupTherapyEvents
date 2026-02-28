import { Link, NavLink, Outlet } from 'react-router-dom';

export function SiteLayout(): JSX.Element {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-midnight/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-display text-base font-semibold tracking-wide text-white">Group Therapy Events</Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-slate-200">
            <NavLink to="/" className="hover:text-white">Home</NavLink>
            <NavLink to="/events" className="hover:text-white">Events</NavLink>
            <NavLink to="/about" className="hover:text-white">About</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 px-4 py-6 text-center text-sm text-slate-400">
        Group Therapy Events. Bringing events and communities together.
      </footer>
    </div>
  );
}
