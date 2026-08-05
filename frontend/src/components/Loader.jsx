import React from 'react';

/**
 * Loader — light theme, matches original design system.
 */
const Loader = ({ fullScreen = false, message = 'Loading...' }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      {message && <p className="text-sm font-medium text-slate-500">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return <div className="flex h-40 items-center justify-center">{spinner}</div>;
};

export default Loader;
