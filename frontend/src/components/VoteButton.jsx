import React from 'react';

/**
 * VoteButton — matches original primary button design system.
 */
const VoteButton = ({ onClick, disabled, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 font-bold text-white shadow-lg transition disabled:opacity-70 ${
        disabled && !isLoading
          ? 'bg-slate-300 shadow-none cursor-not-allowed'
          : 'bg-blue-600 shadow-blue-200 hover:bg-blue-700'
      }`}
    >
      {isLoading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Submitting Vote...</span>
        </>
      ) : (
        <span>Submit Vote</span>
      )}
    </button>
  );
};

export default VoteButton;
