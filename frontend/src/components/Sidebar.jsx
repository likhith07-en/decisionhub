import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Vote, 
  User, 
  X,
  Sparkles,
  BarChart3
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'New Decision', path: '/decisions/create', icon: PlusCircle },
    { name: 'Profile & Activity', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } pt-16 flex flex-col justify-between`}
      >
        <div className="px-4 py-6 space-y-6">
          <div className="flex items-center justify-between lg:hidden pb-4 border-b border-slate-800">
            <span className="font-semibold text-white">Menu</span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* AI Insight Box */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900 border border-indigo-500/20 shadow-lg">
          <div className="flex items-center space-x-2 text-indigo-400 mb-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider">AI Collaborative</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Create consensus with structured polls and real-time decision metrics.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
