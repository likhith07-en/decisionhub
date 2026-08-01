import React from 'react';
import { Vote } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Vote className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-slate-300">DecisionHub Platform</span>
        </div>
        <p>&copy; {new Date().getFullYear()} DecisionHub Enterprise. All rights reserved.</p>
        <div className="flex items-center space-x-6 text-xs text-slate-400">
          <span>Enterprise Architecture</span>
          <span>Clean Code Standard</span>
          <span>Spring Security JWT</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
