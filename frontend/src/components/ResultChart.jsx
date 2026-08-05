import React from 'react';

/**
 * ResultChart — light theme, matches original design system.
 */
const ResultChart = ({ results }) => {
  if (!results) return null;

  const { decisionTitle, pollQuestion, totalVotes, winningOption, winningVoteCount, options } = results;

  const barColors = [
    'bg-primary',
    'bg-violet-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-cyan-500',
  ];

  return (
    <div className="rounded-2xl border border-default bg-surface p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Live Poll Results
          </p>
          <h2 className="text-lg font-black tracking-tight text-primary">
            {pollQuestion || decisionTitle}
          </h2>
        </div>
        <span className="shrink-0 rounded-full bg-background px-3 py-1 text-xs font-semibold text-secondary">
          {totalVotes} vote{totalVotes !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Winner banner */}
      {winningVoteCount > 0 && (
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 text-lg">
            🏆
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-600">Leading Option</p>
            <p className="text-sm font-bold text-primary">{winningOption}</p>
            <p className="text-xs text-secondary">
              {winningVoteCount} vote{winningVoteCount !== 1 ? 's' : ''} —{' '}
              {totalVotes > 0 ? Math.round((winningVoteCount / totalVotes) * 100) : 0}%
            </p>
          </div>
        </div>
      )}

      {/* Breakdown bars */}
      <div className="space-y-4">
        {options?.map((opt, idx) => {
          const pct = totalVotes > 0 ? Math.round((opt.voteCount / totalVotes) * 100) : 0;
          const isWinner = opt.optionText === winningOption && winningVoteCount > 0;
          const colorClass = barColors[idx % barColors.length];

          return (
            <div key={opt.id || idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className={`font-semibold ${isWinner ? 'text-primary' : 'text-secondary'}`}>
                  {opt.optionText}
                  {isWinner && <span className="ml-2 text-xs">✓</span>}
                </span>
                <span className="font-bold text-secondary">
                  {pct}% <span className="text-xs font-normal text-secondary">({opt.voteCount})</span>
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-background">
                <div
                  className={`h-full rounded-full ${colorClass} transition-all duration-700 ease-out`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultChart;
