import React from 'react';

/**
 * Loader — theme-aware, matches design system.
 */
const Loader = ({ fullScreen = false, message = 'Loading...' }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      {message && <p className="text-sm font-medium text-muted">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return <div className="flex h-40 items-center justify-center">{spinner}</div>;
};

export default Loader;
