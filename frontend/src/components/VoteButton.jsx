import React from 'react';
import { Vote, Loader2 } from 'lucide-react';

const VoteButton = ({ onClick, disabled, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg ${
        disabled
          ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/25 active:scale-[0.99]'
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Submitting Vote...</span>
        </>
      ) : (
        <>
          <Vote className="w-5 h-5" />
          <span>Submit Official Vote</span>
        </>
      )}
    </button>
  );
};

export default VoteButton;
