import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Vote, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';

const DecisionCard = ({ decision }) => {
  const isClosed = decision.status === 'CLOSED';

  return (
    <div className="group relative bg-slate-900/90 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
              isClosed
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isClosed ? 'bg-rose-400' : 'bg-emerald-400 animate-pulse'}`} />
            <span>{decision.status}</span>
          </span>

          <span className="text-xs text-slate-500 flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(decision.createdAt).toLocaleDateString()}</span>
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
          {decision.title}
        </h3>

        <p className="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {decision.description || 'No description provided.'}
        </p>

        {decision.poll && (
          <div className="mb-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/50">
            <div className="flex items-center space-x-2 text-xs text-slate-300 font-medium mb-1">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span className="truncate">{decision.poll.question}</span>
            </div>
            <p className="text-xs text-slate-500">
              {decision.poll.options?.length || 0} Poll Options Available
            </p>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-medium">
            {decision.createdBy?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="truncate max-w-[100px]">{decision.createdBy?.name || 'Anonymous'}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to={`/decisions/${decision.id}`}
            className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <span>Details</span>
          </Link>
          <Link
            to={`/decisions/${decision.id}/vote`}
            className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-sm shadow-blue-500/20"
          >
            <Vote className="w-3.5 h-3.5" />
            <span>Vote</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DecisionCard;
