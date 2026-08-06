import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getVotedDecisionsList } from '../services/decisionStorage';
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

export default function AnalysisPage() {
  const { user } = useAuth();
  const [votedDecisions, setVotedDecisions] = useState([]);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('ALL'); // ALL, LEADING, TRAILING, OPEN, CLOSED
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user?.email]);

  const loadData = () => {
    setLoading(true);
    try {
      const data = getVotedDecisionsList(user?.email);
      setVotedDecisions(data);
    } catch (err) {
      console.error('Failed to load analysis data:', err);
    } finally {
      setLoading(false);
    }
  };

  // KPIs
  const totalVotesCast = votedDecisions.length;
  const winningDecisions = votedDecisions.filter((d) => d.outcome.isWinning).length;
  const trailingDecisions = totalVotesCast - winningDecisions;
  const winRate = totalVotesCast > 0 ? Math.round((winningDecisions / totalVotesCast) * 100) : 0;

  // Filtered list
  const filteredList = votedDecisions.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.poll?.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userVote?.optionText?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === 'LEADING') return item.outcome.isWinning;
    if (filterTab === 'TRAILING') return !item.outcome.isWinning;
    if (filterTab === 'OPEN') return item.status === 'OPEN';
    if (filterTab === 'CLOSED') return item.status === 'CLOSED';
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-black tracking-tight text-primary">Decision Analysis</h1>
                </div>
                <p className="mt-1 text-secondary">
                  Track every decision you voted on, verify whether your choice won or is leading, and analyze vote distributions.
                </p>
              </div>

              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl border border-border-default bg-surface px-4 py-2.5 text-sm font-bold text-text-primary shadow-sm transition hover:bg-surface-alt"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Explore More Decisions
              </Link>
            </div>

            {/* KPI Cards */}
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-border-default bg-surface p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Voted Decisions</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-text-primary">{totalVotesCast}</span>
                  <span className="text-xs font-medium text-muted">polls</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-surface-alt">
                  <div className="h-full rounded-full bg-primary" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Won / Leading</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-600">{winningDecisions}</span>
                  <span className="text-xs font-medium text-emerald-600/70">choices</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-emerald-500/20">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${winRate}%` }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Lost / Trailing</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-amber-600">{trailingDecisions}</span>
                  <span className="text-xs font-medium text-amber-600/70">choices</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-amber-500/20">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${100 - winRate}%` }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-border-default bg-surface p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Success Rate</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-primary">{winRate}%</span>
                  <span className="text-xs font-medium text-muted">win ratio</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-surface-alt">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${winRate}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 rounded-2xl border border-border-default bg-surface p-1.5 shadow-sm">
                {[
                  { id: 'ALL', label: 'All Votes' },
                  { id: 'LEADING', label: '🏆 Won / Leading' },
                  { id: 'TRAILING', label: '📊 Lost / Trailing' },
                  { id: 'OPEN', label: '🟢 Active' },
                  { id: 'CLOSED', label: '🔒 Closed' },
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

              {/* Search input */}
              <div className="relative min-w-[240px]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search decisions or options..."
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

            {/* Decision Cards List */}
            {loading ? (
              <div className="flex h-48 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : filteredList.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredList.map((item) => {
                  const { outcome, userVote, poll } = item;
                  const isWon = outcome.isWinning;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`group relative flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md ${
                        isWon
                          ? 'border-emerald-500/30 bg-surface hover:border-emerald-500'
                          : 'border-border-default bg-surface hover:border-amber-500/50'
                      }`}
                    >
                      <div>
                        {/* Top badges: Status & Outcome */}
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${outcome.badgeColor}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isWon ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                            />
                            {outcome.badgeLabel}
                          </span>

                          <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-[11px] font-semibold text-muted">
                            {item.status}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-text-primary transition group-hover:text-primary">
                          {item.title}
                        </h3>

                        {/* Poll Question */}
                        {poll?.question && (
                          <p className="mt-1.5 text-xs font-medium text-secondary line-clamp-1">
                            ❓ {poll.question}
                          </p>
                        )}

                        {/* User's Choice Banner */}
                        <div
                          className={`mt-4 rounded-xl border p-3 ${
                            isWon
                              ? 'border-emerald-500/20 bg-emerald-500/5'
                              : 'border-amber-500/20 bg-amber-500/5'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-muted">Your Voted Choice</span>
                            <span
                              className={`font-black ${
                                isWon ? 'text-emerald-600' : 'text-amber-600'
                              }`}
                            >
                              {outcome.userVotePct}% of votes
                            </span>
                          </div>
                          <p className="mt-1 text-sm font-bold text-text-primary">
                            👉 {userVote.optionText}
                          </p>
                        </div>

                        {/* Leader info if user is trailing */}
                        {!isWon && outcome.winningOption && (
                          <p className="mt-2 text-xs text-muted">
                            Current Leader:{' '}
                            <strong className="text-text-primary">
                              {outcome.winningOption.optionText}
                            </strong>{' '}
                            ({outcome.winningVotePct}%)
                          </p>
                        )}
                      </div>

                      {/* Footer actions */}
                      <div className="mt-5 flex items-center justify-between border-t border-border-default pt-4">
                        <span className="text-[11px] text-muted">
                          {outcome.totalVotes} total votes cast
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedDecision(item)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                            View Charts & Details
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary">No Voted Decisions Found</h3>
                <p className="mx-auto mt-1 max-w-sm text-sm text-secondary">
                  {searchTerm || filterTab !== 'ALL'
                    ? 'No votes match your search or active filter criteria.'
                    : "You haven't voted on any decisions yet. Vote on polls from the dashboard to analyze outcomes here!"}
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  {searchTerm || filterTab !== 'ALL' ? (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilterTab('ALL');
                      }}
                      className="rounded-xl border border-border-default bg-surface px-4 py-2 text-xs font-bold text-muted hover:bg-surface-alt"
                    >
                      Clear Filters
                    </button>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-app transition hover:bg-primary-hover"
                    >
                      Go to Dashboard
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          <Footer />
        </main>
      </div>

      {/* Decision Detail & Chart Modal */}
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
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-bold ${selectedDecision.outcome.badgeColor}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      selectedDecision.outcome.isWinning ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  {selectedDecision.outcome.badgeLabel}
                </span>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-text-primary">
                  {selectedDecision.title}
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Voted on {new Date(selectedDecision.userVote.votedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              {/* Description */}
              {selectedDecision.description && (
                <div className="mb-5 rounded-2xl border border-border-default bg-surface-alt p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Background</p>
                  <p className="mt-1 text-sm text-secondary">{selectedDecision.description}</p>
                </div>
              )}

              {/* Question & Outcome Banner */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Poll Question</p>
                <h3 className="mt-1 text-lg font-black text-text-primary">
                  {selectedDecision.poll?.question || 'What is your choice?'}
                </h3>

                <div
                  className={`mt-3 rounded-2xl border p-4 ${
                    selectedDecision.outcome.isWinning
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-amber-500/30 bg-amber-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {selectedDecision.outcome.isWinning ? '🎉' : '📊'}
                    </span>
                    <div>
                      <p
                        className={`text-xs font-bold uppercase tracking-wider ${
                          selectedDecision.outcome.isWinning ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {selectedDecision.outcome.isWinning
                          ? 'Your Choice is Winning / Won'
                          : 'Your Choice is Trailing'}
                      </p>
                      <p className="text-sm font-semibold text-text-primary">
                        You selected:{' '}
                        <strong>{selectedDecision.userVote.optionText}</strong> ({selectedDecision.outcome.userVotePct}% of votes).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vote Distribution Bar Chart */}
              <div className="mb-6 rounded-2xl border border-border-default bg-surface p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-text-primary">Vote Distribution Breakdown</h4>
                  <span className="text-xs font-semibold text-muted">
                    {selectedDecision.outcome.totalVotes} total votes
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedDecision.poll?.options?.map((opt, idx) => {
                    const total = selectedDecision.outcome.totalVotes;
                    const pct = total > 0 ? Math.round(((opt.voteCount || 0) / total) * 100) : 0;
                    const isUserChoice = Number(opt.id) === Number(selectedDecision.userVote.optionId);
                    const isLeader =
                      selectedDecision.outcome.winningOption &&
                      Number(opt.id) === Number(selectedDecision.outcome.winningOption.id);
                    const color = BAR_COLORS[idx % BAR_COLORS.length];

                    return (
                      <div key={opt.id || idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            <span
                              className={`font-bold ${
                                isUserChoice ? 'text-primary' : 'text-text-primary'
                              }`}
                            >
                              {opt.optionText}
                            </span>
                            {isUserChoice && (
                              <span className="rounded-md bg-primary-soft px-1.5 py-0.5 text-[10px] font-bold text-primary">
                                Your Choice
                              </span>
                            )}
                            {isLeader && (
                              <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                                👑 Leading
                              </span>
                            )}
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
                  Go to Decision Page
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
