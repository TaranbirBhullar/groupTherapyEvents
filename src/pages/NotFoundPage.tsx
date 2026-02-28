import { Link } from 'react-router-dom';

export function NotFoundPage(): JSX.Element {
  return (
    <div className="space-y-4 border border-slate-300/20 bg-ink/80 p-8 text-center">
      <h1 className="font-display text-3xl font-bold text-white">404</h1>
      <p className="text-slate-300">That page is off-grid.</p>
      <Link to="/" className="text-slate-200 hover:text-white">Back to home</Link>
    </div>
  );
}
