import React from 'react';
import { Trophy, TrendingUp, Users, CheckCircle } from 'lucide-react';

const ResultChart = ({ results }) => {
  if (!results) return null;

  const { decisionTitle, pollQuestion, totalVotes, winningOption, winningVoteCount, options } = results;

  const colors = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-cyan-500 to-blue-600'
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Live Polling Results</span>
          <h2 className="text-xl font-bold text-white mt-1">{pollQuestion || decisionTitle}</h2>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
          <Users className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-200">{totalVotes} Total Votes</span>
        </div>
      </div>

      {/* Winner Banner */}
      {winningVoteCount > 0 && (
        <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Leading Option</span>
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-lg font-bold text-white">{winningOption}</p>
            <p className="text-xs text-slate-400">{winningVoteCount} votes recorded ({totalVotes > 0 ? Math.round((winningVoteCount / totalVotes) * 100) : 0}%)</p>
          </div>
        </div>
      )}

      {/* Options breakdown */}
      <div className="space-y-4">
        {options && options.map((opt, idx) => {
          const pct = totalVotes > 0 ? Math.round((opt.voteCount / totalVotes) * 100) : 0;
          const isWinner = opt.optionText === winningOption && winningVoteCount > 0;
          const colorClass = colors[idx % colors.length];

          return (
            <div key={opt.id || idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-200 flex items-center space-x-2">
                  <span>{opt.optionText}</span>
                  {isWinner && <CheckCircle className="w-4 h-4 text-amber-400" />}
                </span>
                <span className="font-bold text-slate-300">{pct}% ({opt.voteCount})</span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-700 ease-out`}
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
