import { Link } from 'react-router-dom';

export default function DecisionCard({ decision }) {
  const statusColors = {
    OPEN: 'bg-green-100 text-green-700',
    CLOSED: 'bg-red-100 text-red-700',
    // Legacy/fallback variants
    Active: 'bg-green-100 text-green-700',
    Completed: 'bg-primary-soft text-primary-hover',
    ACTIVE: 'bg-green-100 text-green-700',
    COMPLETED: 'bg-primary-soft text-primary-hover',
    'In Review': 'bg-amber-100 text-amber-700',
  };

  const statusClass = statusColors[decision.status] || 'bg-background text-secondary';

  return (
    <Link
      to={`/decisions/${decision.id}`}
      className="group block rounded-2xl border border-default bg-surface p-5 shadow-sm transition hover:border-primary-soft hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-primary transition group-hover:text-blue-600">
          {decision.title}
        </h3>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass}`}>
          {decision.status}
        </span>
      </div>

      {decision.description && (
        <p className="mb-3 line-clamp-2 text-sm text-secondary">{decision.description}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-secondary">
        {decision.votesCount !== undefined && (
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {decision.votesCount} vote{decision.votesCount !== 1 ? 's' : ''}
          </span>
        )}
        {decision.optionsCount !== undefined && (
          <span>{decision.optionsCount} options</span>
        )}
      </div>
    </Link>
  );
}
