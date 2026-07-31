import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchDecisions } from '../api/axiosClient';
import DecisionCard from '../components/DecisionCard';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, logout, accessToken } = useAuth();
  const [decisions, setDecisions] = useState([]);
  const [loadingDecisions, setLoadingDecisions] = useState(true);

  useEffect(() => {
    fetchDecisions(accessToken)
      .then(setDecisions)
      .catch(() => setDecisions([]))
      .finally(() => setLoadingDecisions(false));
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.98),_rgba(241,245,249,0.95))] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-6xl flex-col gap-6"
      >
        <header className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Workspace overview</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Your community decisions</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={logout}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Log out
              </button>
              <Link
                to="/signup"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Create account
              </Link>
            </div>
          </div>
        </header>

        <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-black tracking-tight text-slate-900">Live decisions</h3>
              <p className="text-sm text-slate-500">The latest group polls appear here with elegant motion and clarity.</p>
            </div>
            <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">{decisions.length} active</div>
          </div>

          {loadingDecisions ? (
            <div className="flex h-40 items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          ) : decisions.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {decisions.map((decision) => <DecisionCard key={decision.id} decision={decision} />)}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500 lg:col-span-2">
              No decisions available yet. New community polls will appear here.
            </div>
          )}
        </section>
      </motion.div>
    </div>
  );
}
