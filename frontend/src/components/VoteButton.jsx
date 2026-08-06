import React from 'react';

/**
 * VoteButton — theme-aware primary button.
 */
const VoteButton = ({ onClick, disabled, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 font-bold text-white shadow-app transition disabled:opacity-70 ${
        disabled && !isLoading
          ? 'shadow-none cursor-not-allowed'
          : 'bg-primary hover:bg-primary-hover'
      }`}
      style={disabled && !isLoading ? { backgroundColor: 'var(--disabled-bg)' } : {}}
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
