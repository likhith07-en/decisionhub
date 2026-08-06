import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getCreatorAnalytics } from '../services/decisionStorage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';

const BAR_COLORS = [
  '#2563eb', // Blue
  '#8b5cf6', // Violet
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#06b6d4', // Cyan
];

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('ALL'); // ALL, OPEN, CLOSED
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user?.email]);

  const loadData = () => {
    setLoading(true);
    try {
      const data = getCreatorAnalytics(user?.email);
      setAnalyticsData(data);
    } catch (err) {
      console.error('Failed to load creator analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const {
    totalDecisions = 0,
    totalViews = 0,
    totalReach = 0,
    totalVotes = 0,
    activeDecisions = 0,
    closedDecisions = 0,
    conversionRate = 0,
    avgVotesPerPoll = '0.0',
    decisions = [],
  } = analyticsData || {};

  const filteredDecisions = decisions.filter((dec) => {
    const matchesSearch =
      dec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dec.poll?.question?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filterTab === 'OPEN') return dec.status === 'OPEN';
    if (filterTab === 'CLOSED') return dec.status === 'CLOSED';
    return true;
  });

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
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-black tracking-tight text-primary">Creator Analytics</h1>
                </div>
                <p className="mt-1 text-secondary">
                  Audience reach, page views, participant engagement, and vote metrics for all decisions you published.
                </p>
              </div>

              <Link
                to="/decisions/create"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-app transition hover:bg-primary-hover"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                New Decision
              </Link>
            </div>

            {/* KPI Cards: Reach, Views, Voted, Conversion */}
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {/* People Reached */}
              <div className="rounded-2xl border border-border-default bg-surface p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">People Reached</p>
                  <span className="rounded-lg bg-primary-soft p-1.5 text-primary">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-text-primary">{totalReach}</span>
                  <span className="text-xs font-medium text-muted">impressions</span>
                </div>
                <p className="mt-1 text-[11px] text-muted">Estimated platform reach</p>
              </div>

              {/* Total Views */}
              <div className="rounded-2xl border border-border-default bg-surface p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Total Views</p>
                  <span className="rounded-lg bg-indigo-500/10 p-1.5 text-indigo-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-indigo-600">{totalViews}</span>
                  <span className="text-xs font-medium text-muted">views</span>
                </div>
                <p className="mt-1 text-[11px] text-muted">Direct page impressions</p>
              </div>

              {/* People Voted */}
              <div className="rounded-2xl border border-border-default bg-surface p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">People Voted</p>
                  <span className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-600">{totalVotes}</span>
                  <span className="text-xs font-medium text-muted">votes cast</span>
                </div>
                <p className="mt-1 text-[11px] text-muted">{avgVotesPerPoll} avg votes/decision</p>
              </div>

              {/* Engagement / Conversion Rate */}
              <div className="rounded-2xl border border-border-default bg-surface p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Vote Rate</p>
                  <span className="rounded-lg bg-amber-500/10 p-1.5 text-amber-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-amber-600">{conversionRate}%</span>
                  <span className="text-xs font-medium text-muted">conversion</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-surface-alt">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${Math.min(conversionRate, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Filter and Search */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-1.5 rounded-2xl border border-border-default bg-surface p-1.5 shadow-sm">
                {[
                  { id: 'ALL', label: `All Decisions (${totalDecisions})` },
                  { id: 'OPEN', label: `🟢 Active (${activeDecisions})` },
                  { id: 'CLOSED', label: `🔒 Closed (${closedDecisions})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterTab(tab.id)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                      filterTab === tab.id
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-muted hover:bg-surface-alt hover:text-text-primary'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your decisions..."
                  className="app-input py-2 pl-9 pr-4 text-xs"
                />
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Decision Grid */}
            {loading ? (
              <div className="flex h-48 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : filteredDecisions.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredDecisions.map((dec) => {
                  const votes = dec.votesCount || 0;
                  const views = dec.views || 1;
                  const reach = dec.reach || views * 3;
                  const decConversion = Math.round((votes / views) * 100);

                  // Find leader
                  let leader = null;
                  if (dec.poll?.options) {
                    let maxV = -1;
                    dec.poll.options.forEach((o) => {
                      if ((o.voteCount || 0) > maxV) {
                        maxV = o.voteCount || 0;
                        leader = o;
                      }
                    });
                  }

                  return (
                    <motion.div
                      key={dec.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group relative flex flex-col justify-between rounded-2xl border border-border-default bg-surface p-5 shadow-sm transition-all duration-200 hover:border-primary-soft hover:shadow-md"
                    >
                      <div>
                        {/* Status & Options count */}
                        <div className="mb-3 flex items-center justify-between">
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold"
                            style={{
                              backgroundColor:
                                dec.status === 'OPEN' ? 'var(--status-open-bg)' : 'var(--status-closed-bg)',
                              color:
                                dec.status === 'OPEN' ? 'var(--status-open-text)' : 'var(--status-closed-text)',
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{
                                backgroundColor:
                                  dec.status === 'OPEN' ? 'var(--status-open-text)' : 'var(--status-closed-text)',
                              }}
                            />
                            {dec.status}
                          </span>

                          <span className="text-[11px] text-muted">
                            {new Date(dec.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-text-primary transition group-hover:text-primary">
                          {dec.title}
                        </h3>

                        {/* Poll Question */}
                        {dec.poll?.question && (
                          <div className="mt-2 rounded-xl bg-surface-alt p-3 text-xs">
                            <p className="font-bold text-primary">Attached Poll:</p>
                            <p className="mt-0.5 text-text-primary">{dec.poll.question}</p>
                            <p className="mt-1 text-[11px] text-muted">
                              {dec.poll.options?.length || 0} voting options configured
                            </p>
                          </div>
                        )}

                        {/* Metric Strip for this Decision */}
                        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-border-default bg-surface p-3 text-center">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Reach</p>
                            <p className="mt-0.5 text-sm font-black text-text-primary">{reach}</p>
                          </div>
                          <div className="border-x border-border-default">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Views</p>
                            <p className="mt-0.5 text-sm font-black text-indigo-600">{views}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Votes</p>
                            <p className="mt-0.5 text-sm font-black text-emerald-600">{votes}</p>
                          </div>
                        </div>

                        {/* Leading Option */}
                        {leader && votes > 0 && (
                          <p className="mt-3 text-xs text-muted">
                            🏆 Leading Choice:{' '}
                            <strong className="text-text-primary">{leader.optionText}</strong> ({leader.voteCount} votes)
                          </p>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-5 flex items-center justify-between border-t border-border-default pt-4">
                        <span className="text-[11px] font-semibold text-muted">
                          {decConversion}% conversion
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedDecision(dec)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                            View Analytics
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border-default bg-surface p-12 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary">No Created Decisions Found</h3>
                <p className="mx-auto mt-1 max-w-sm text-sm text-secondary">
                  {searchTerm || filterTab !== 'ALL'
                    ? 'No decisions match your active filter criteria.'
                    : 'You haven’t created any decisions yet. Create a decision with a poll to start gathering votes and reach metrics!'}
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link
                    to="/decisions/create"
                    className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-app transition hover:bg-primary-hover"
                  >
                    Create Your First Decision
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Footer />
        </main>
      </div>

      {/* Decision Analytics Modal */}
      <AnimatePresence>
        {selectedDecision && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-sm"
              style={{ backgroundColor: 'var(--overlay)' }}
              onClick={() => setSelectedDecision(null)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border-default bg-surface p-6 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedDecision(null)}
                className="absolute right-5 top-5 rounded-xl p-2 text-muted hover:bg-surface-alt hover:text-text-primary"
                aria-label="Close modal"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header */}
              <div className="mb-4">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold"
                  style={{
                    backgroundColor:
                      selectedDecision.status === 'OPEN' ? 'var(--status-open-bg)' : 'var(--status-closed-bg)',
                    color:
                      selectedDecision.status === 'OPEN' ? 'var(--status-open-text)' : 'var(--status-closed-text)',
                  }}
                >
                  {selectedDecision.status}
                </span>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-text-primary">
                  {selectedDecision.title}
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Created on {new Date(selectedDecision.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              {/* Funnel Metrics Grid */}
              <div className="mb-6 grid grid-cols-4 gap-3 rounded-2xl border border-border-default bg-surface-alt p-4 text-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Total Reach</p>
                  <p className="mt-1 text-lg font-black text-text-primary">{selectedDecision.reach || selectedDecision.views * 3 || 35}</p>
                  <span className="text-[10px] text-muted">Feed impressions</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Total Views</p>
                  <p className="mt-1 text-lg font-black text-indigo-600">{selectedDecision.views || 12}</p>
                  <span className="text-[10px] text-muted">Direct visits</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Total Votes</p>
                  <p className="mt-1 text-lg font-black text-emerald-600">{selectedDecision.votesCount || 0}</p>
                  <span className="text-[10px] text-muted">Participants</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Engagement</p>
                  <p className="mt-1 text-lg font-black text-amber-600">
                    {Math.round(((selectedDecision.votesCount || 0) / (selectedDecision.views || 1)) * 100)}%
                  </p>
                  <span className="text-[10px] text-muted">Vote conversion</span>
                </div>
              </div>

              {/* Poll Question */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Poll Question</p>
                <h3 className="mt-1 text-lg font-black text-text-primary">
                  {selectedDecision.poll?.question || 'Attached Decision Poll'}
                </h3>
              </div>

              {/* Options Vote Distribution Chart */}
              <div className="mb-6 rounded-2xl border border-border-default bg-surface p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-text-primary">Option Vote Distribution</h4>
                  <span className="text-xs font-semibold text-muted">
                    {selectedDecision.votesCount || 0} total votes
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedDecision.poll?.options?.map((opt, idx) => {
                    const total = selectedDecision.votesCount || 0;
                    const pct = total > 0 ? Math.round(((opt.voteCount || 0) / total) * 100) : 0;
                    const color = BAR_COLORS[idx % BAR_COLORS.length];

                    return (
                      <div key={opt.id || idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            <span className="font-bold text-text-primary">{opt.optionText}</span>
                          </div>
                          <span className="font-bold text-text-primary">
                            {pct}%{' '}
                            <span className="font-normal text-muted">({opt.voteCount || 0} votes)</span>
                          </span>
                        </div>

                        {/* Bar */}
                        <div className="h-3 w-full overflow-hidden rounded-full bg-surface-alt">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-border-default pt-4">
                <button
                  onClick={() => setSelectedDecision(null)}
                  className="rounded-xl border border-border-default bg-surface px-4 py-2 text-xs font-bold text-muted hover:bg-surface-alt"
                >
                  Close
                </button>
                <Link
                  to={`/decisions/${selectedDecision.id}`}
                  className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-primary-hover"
                >
                  View Decision Details
                </Link>
                <Link
                  to={`/decisions/${selectedDecision.id}/vote`}
                  className="rounded-xl border border-primary bg-primary-soft px-4 py-2 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
                >
                  Open Voting Session
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
