import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
      <div className="w-16 h-16 rounded-3xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/20">
        <Vote className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-extrabold text-white tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-slate-300 mt-2">Page Not Found</h2>
      <p className="text-slate-400 max-w-sm mx-auto mt-2 text-sm">
        The decision matrix page you are seeking does not exist or has been archived.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};

export default NotFound;
