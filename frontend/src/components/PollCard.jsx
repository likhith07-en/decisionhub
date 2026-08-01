import React from 'react';
import { Vote, CheckCircle2, BarChart2 } from 'lucide-react';
import VoteButton from './VoteButton';

const PollCard = ({ poll, decisionId, selectedOptionId, onSelectOption, onVote, isSubmitting, hasVoted }) => {
  if (!poll) {
    return (
      <div className="p-6 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
        No active poll linked to this decision.
      </div>
    );
  }

  const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.voteCount || 0), 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center space-x-2 text-indigo-400 mb-2">
        <BarChart2 className="w-5 h-5" />
        <span className="text-xs font-semibold uppercase tracking-wider">Active Poll</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-6">{poll.question}</h3>

      <div className="space-y-3 mb-6">
        {poll.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const percentage = totalVotes > 0 ? Math.round((option.voteCount / totalVotes) * 100) : 0;

          return (
            <div
              key={option.id}
              onClick={() => !hasVoted && onSelectOption(option.id)}
              className={`relative overflow-hidden p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-950/50'
              } ${hasVoted ? 'cursor-default' : ''}`}
            >
              {/* Progress bar background */}
              {hasVoted && (
                <div
                  className="absolute left-0 top-0 bottom-0 bg-blue-600/20 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative flex items-center justify-between z-10">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-slate-600'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="font-medium text-slate-200">{option.optionText}</span>
                </div>

                {hasVoted && (
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">{percentage}%</span>
                    <span className="text-xs text-slate-400 block">{option.voteCount} votes</span>
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
