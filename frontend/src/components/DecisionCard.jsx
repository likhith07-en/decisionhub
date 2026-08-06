import { Link } from 'react-router-dom';

export default function DecisionCard({ decision }) {
  const isOpen = decision.status === 'OPEN' || decision.status === 'Active' || decision.status === 'ACTIVE';
  const isClosed = decision.status === 'CLOSED' || decision.status === 'Completed' || decision.status === 'COMPLETED';

  return (
    <Link
      to={`/decisions/${decision.id}`}
      className="group block rounded-2xl border border-border-default bg-surface p-5 shadow-sm transition hover:border-primary-soft hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-text-primary transition group-hover:text-primary">
          {decision.title}
        </h3>
        <span
          className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
          style={{
            backgroundColor: isOpen ? 'var(--status-open-bg)' : isClosed ? 'var(--status-closed-bg)' : 'var(--surface-alt)',
            color: isOpen ? 'var(--status-open-text)' : isClosed ? 'var(--status-closed-text)' : 'var(--text-secondary)',
          }}
        >
          {decision.status}
        </span>
      </div>

      {decision.description && (
        <p className="mb-3 line-clamp-2 text-sm text-muted">{decision.description}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-muted">
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
