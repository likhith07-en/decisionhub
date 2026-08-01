import React from 'react';

const Loader = ({ fullScreen = false, message = 'Loading...' }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500/20 rounded-full animate-ping"></div>
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      {message && <p className="text-sm font-medium text-slate-400">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return <div className="py-12 flex justify-center">{spinner}</div>;
};

export default Loader;
