import { useEffect, useState } from 'react';
import { fetchDecisions } from '../api/axiosClient';
import DecisionCard from '../components/DecisionCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';

export default function DashboardPage() {
  const { user, accessToken } = useAuth();
  const [decisions, setDecisions] = useState([]);
  const [loadingDecisions, setLoadingDecisions] = useState(true);

  useEffect(() => {
    fetchDecisions(accessToken)
      .then(setDecisions)
      .catch(() => setDecisions([]))
      .finally(() => setLoadingDecisions(false));
  }, [accessToken]);

  return (
    <div className="page-shell min-h-screen flex flex-col sm:pr-[60px]">
      <Navbar />
      <IconSidebar />
      <div className="flex flex-1">
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-primary">Dashboard</h1>
                <p className="mt-1 text-secondary">Welcome back, {user?.name || user?.email}!</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/decisions/create"
                  className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-app transition hover:bg-primary-hover"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  New Decision
                </Link>
              </div>
            </div>

            {/* Quick Feature Cards for Analysis & Analytics */}
            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <Link
                to="/analysis"
                className="group relative flex items-start gap-4 rounded-3xl border border-border-default bg-surface p-5 shadow-sm transition-all duration-200 hover:border-primary-soft hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary transition group-hover:scale-105">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-text-primary group-hover:text-primary">Decision Analysis</h2>
                    <span className="text-xs font-semibold text-primary">View →</span>
                  </div>
                  <p className="mt-1 text-xs text-secondary line-clamp-2">
                    Review all polls you voted on, see whether your choice won or lost with color badges, and inspect vote distribution.
                  </p>
                </div>
              </Link>

              <Link
                to="/analytics"
                className="group relative flex items-start gap-4 rounded-3xl border border-border-default bg-surface p-5 shadow-sm transition-all duration-200 hover:border-primary-soft hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 transition group-hover:scale-105">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-text-primary group-hover:text-indigo-600">Creator Analytics</h2>
                    <span className="text-xs font-semibold text-indigo-600">View →</span>
                  </div>
                  <p className="mt-1 text-xs text-secondary line-clamp-2">
                    Track audience reach, view impressions, participation conversion, and vote counts for all decisions you created.
                  </p>
                </div>
              </Link>
            </div>

            {/* Decisions section */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-primary">All Decisions</h2>
              <span className="text-xs font-semibold text-muted">{decisions.length} Available</span>
            </div>

            {/* Decisions grid */}
            {loadingDecisions ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : decisions.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {decisions.map((decision) => (
                  <DecisionCard key={decision.id} decision={decision} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border-default bg-surface p-12 text-center">
                <p className="mb-4 text-secondary">No decisions yet. Create your first poll!</p>
                <Link
                  to="/decisions/create"
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-app transition hover:bg-primary-hover"
                >
                  Create Decision
                </Link>
              </div>
            )}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
