import { Link, NavLink, Outlet } from 'react-router-dom';

export function SiteLayout(): JSX.Element {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-cyanflash/20 bg-midnight/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-display text-xl font-extrabold tracking-wide text-white">ChaiRave</Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-slate-200">
            <NavLink to="/" className="hover:text-cyanflash">Home</NavLink>
            <NavLink to="/events" className="hover:text-cyanflash">Events</NavLink>
            <NavLink to="/about" className="hover:text-cyanflash">About</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-cyanflash/20 px-4 py-6 text-center text-sm text-slate-400">
        ChaiRave. Find the next floor, then jump straight to Partiful.
      </footer>
    </div>
  );
}
