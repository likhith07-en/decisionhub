import React from 'react';
import VoteButton from './VoteButton';

/**
 * PollCard — theme-aware, matches design system.
 */
const PollCard = ({ poll, decisionId, selectedOptionId, onSelectOption, onVote, isSubmitting, hasVoted }) => {
  if (!poll) {
    return (
      <div className="rounded-2xl border border-dashed border-border-default p-8 text-center text-muted">
        No active poll linked to this decision.
      </div>
    );
  }

  const totalVotes = poll.options?.reduce((sum, opt) => sum + (opt.voteCount || 0), 0) || 0;

  return (
    <div className="rounded-2xl border border-border-default bg-surface p-6 shadow-sm">
      {/* Poll header */}
      <div className="mb-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-muted">Active Poll</p>
        <h3 className="text-xl font-black tracking-tight text-text-primary">{poll.question}</h3>
        {totalVotes > 0 && (
          <p className="mt-1 text-xs text-muted">{totalVotes} vote{totalVotes !== 1 ? 's' : ''} cast</p>
        )}
      </div>

      {/* Options */}
      <div className="mb-5 space-y-3">
        {poll.options?.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const percentage = totalVotes > 0 ? Math.round((option.voteCount / totalVotes) * 100) : 0;

          return (
            <div
              key={option.id}
              onClick={() => !hasVoted && onSelectOption(option.id)}
              className={`relative overflow-hidden rounded-2xl border p-4 transition ${
                !hasVoted ? 'cursor-pointer' : 'cursor-default'
              } ${
                isSelected
                  ? 'border-primary bg-primary-soft'
                  : 'border-border-default bg-background hover:border-primary-soft hover:bg-surface'
              }`}
              style={isSelected ? { boxShadow: '0 0 0 2px var(--primary-soft)' } : {}}
            >
              {/* Progress bar fill when voted */}
              {hasVoted && (
                <div
                  className="absolute left-0 top-0 bottom-0 transition-all duration-700"
                  style={{ width: `${percentage}%`, backgroundColor: 'var(--primary-soft)' }}
                />
              )}

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      isSelected
                        ? 'border-primary bg-primary'
                        : 'border-border-default bg-surface'
                    }`}
                  >
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                  <span className="text-sm font-semibold text-text-primary">{option.optionText}</span>
                </div>

                {hasVoted && (
                  <div className="text-right">
                    <span className="text-sm font-bold text-text-primary">{percentage}%</span>
                    <span className="block text-xs text-muted">{option.voteCount} vote{option.voteCount !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!hasVoted && (
        <VoteButton
          onClick={onVote}
          disabled={!selectedOptionId || isSubmitting}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
};

export default PollCard;
