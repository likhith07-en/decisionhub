import { useEffect, useState } from 'react';
import { fetchDecisions } from '../api/axiosClient';
import DecisionCard from '../components/DecisionCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';

export default function DashboardPage() {
  const { user, accessToken } = useAuth();
  const [decisions, setDecisions] = useState([]);
  const [loadingDecisions, setLoadingDecisions] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDecisions(accessToken)
      .then(setDecisions)
      .catch(() => setDecisions([]))
      .finally(() => setLoadingDecisions(false));
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col sm:pr-[60px]">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <IconSidebar />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
          <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Dashboard</h1>
                <p className="mt-1 text-slate-500">Welcome back, {user?.name || user?.email}!</p>
              </div>
              <Link
                to="/decisions/create"
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                New Decision
              </Link>
            </div>

            {/* Decisions grid */}
            {loadingDecisions ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              </div>
            ) : decisions.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {decisions.map((decision) => (
                  <DecisionCard key={decision.id} decision={decision} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                <p className="mb-4 text-slate-500">No decisions yet. Create your first poll!</p>
                <Link
                  to="/decisions/create"
                  className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
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
