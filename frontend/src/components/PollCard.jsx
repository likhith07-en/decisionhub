import React from 'react';
import VoteButton from './VoteButton';

/**
 * PollCard — light theme, matches original design system.
 */
const PollCard = ({ poll, decisionId, selectedOptionId, onSelectOption, onVote, isSubmitting, hasVoted }) => {
  if (!poll) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
        No active poll linked to this decision.
      </div>
    );
  }

  const totalVotes = poll.options?.reduce((sum, opt) => sum + (opt.voteCount || 0), 0) || 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Poll header */}
      <div className="mb-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-600">Active Poll</p>
        <h3 className="text-xl font-black tracking-tight text-slate-900">{poll.question}</h3>
        {totalVotes > 0 && (
          <p className="mt-1 text-xs text-slate-400">{totalVotes} vote{totalVotes !== 1 ? 's' : ''} cast</p>
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
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                  : 'border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white'
              }`}
            >
              {/* Progress bar fill when voted */}
              {hasVoted && (
                <div
                  className="absolute left-0 top-0 bottom-0 bg-blue-100/60 transition-all duration-700"
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{option.optionText}</span>
                </div>

                {hasVoted && (
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">{percentage}%</span>
                    <span className="block text-xs text-slate-400">{option.voteCount} vote{option.voteCount !== 1 ? 's' : ''}</span>
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
