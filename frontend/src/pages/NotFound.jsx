import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      {/* Logo mark */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[2rem] bg-primary-soft text-primary">
        <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
            <circle cx="10" cy="24" r="4" fill="currentColor" stroke="none" />
            <circle cx="24" cy="10" r="4" fill="currentColor" stroke="none" />
            <circle cx="38" cy="24" r="4" fill="currentColor" stroke="none" />
            <circle cx="24" cy="38" r="4" fill="currentColor" stroke="none" />
            <path d="M13 21L21 13" />
            <path d="M27 13L35 21" />
            <path d="M13 27L21 35" />
            <path d="M27 35L35 27" />
          </g>
        </svg>
      </div>

      <h1 className="text-7xl font-black tracking-tight text-primary">404</h1>
      <h2 className="mt-2 text-xl font-bold text-secondary">Page Not Found</h2>
      <p className="mt-2 max-w-sm text-sm text-secondary">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/dashboard"
        className="mt-8 flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-app transition hover:bg-primary-hover"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Return to Dashboard
      </Link>
    </div>
  );
}
