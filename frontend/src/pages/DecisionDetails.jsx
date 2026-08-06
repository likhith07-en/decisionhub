import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchDecisionById, deleteDecisionApi, getVoteResultsApi } from '../api/axiosClient';
import { getUserVoteForDecision } from '../services/decisionStorage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';
import ResultChart from '../components/ResultChart';
import Loader from '../components/Loader';

export default function DecisionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();

  const [decision, setDecision] = useState(null);
  const [results, setResults] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const dec = await fetchDecisionById(id, accessToken);
      setDecision(dec);

      // Check if current user has already voted
      const vote = getUserVoteForDecision(id);
      setUserVote(vote);

      if (dec.poll) {
        try {
          const res = await getVoteResultsApi(id, accessToken);
          setResults(res);
        } catch {
          /* results optional */
        }
      }
    } catch {
      setError('Decision not found or could not be loaded.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this decision?')) return;
    try {
      setDeleting(true);
      await deleteDecisionApi(id, accessToken);
      navigate('/dashboard');
    } catch {
      alert('Failed to delete decision.');
    } finally {
      setDeleting(false);
    }
  };

  const isCreator = user && decision?.createdBy && (user.id === decision.createdBy.id || user.email === decision.createdBy.email);
  const isOpen = decision?.status === 'OPEN' || decision?.status === 'OPEN_TO_VOTE' || decision?.status === 'Active';

  const getStatusStyle = (status) => {
    if (status === 'OPEN' || status === 'OPEN_TO_VOTE' || status === 'Active') {
      return { backgroundColor: 'var(--status-open-bg)', color: 'var(--status-open-text)' };
    }
    if (status === 'CLOSED' || status === 'Completed') {
      return { backgroundColor: 'var(--status-closed-bg)', color: 'var(--status-closed-text)' };
    }
    return { backgroundColor: 'var(--surface-alt)', color: 'var(--text-secondary)' };
  };

  return (
    <div className="page-shell min-h-screen flex flex-col sm:pr-[60px]">
      <Navbar />
      <IconSidebar />
      <div className="flex flex-1">
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
            {loading ? (
              <Loader message="Loading decision details..." />
            ) : error || !decision ? (
              <div className="rounded-2xl border border-dashed border-default p-12 text-center">
                <p className="mb-4 text-secondary">{error || 'Decision not found.'}</p>
                <Link to="/dashboard" className="text-sm font-bold text-primary hover:underline">
                  Return to Dashboard
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                  </Link>

                  {isCreator && (
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                    >
                      {deleting ? 'Deleting...' : 'Delete Decision'}
                    </button>
                  )}
                </div>

                {/* Decision Main Card */}
                <div className="rounded-[2rem] border border-border-default bg-surface p-6 shadow-sm space-y-5">
                  {/* Status + title */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border-default pb-5">
                    <div>
                      <span className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold" style={getStatusStyle(decision.status)}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: !isOpen ? 'var(--status-closed-text)' : 'var(--status-open-text)' }} />
                        {decision.status}
                      </span>
                      <h1 className="text-3xl font-black tracking-tight text-text-primary">{decision.title}</h1>
                    </div>

                    {isOpen && decision.poll && (
                      <Link
                        to={`/decisions/${id}/vote`}
                        className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-app transition hover:bg-primary-hover"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {userVote ? 'View / Change Vote' : 'Cast Vote Now'}
                      </Link>
                    )}
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-6 text-xs text-secondary">
                    {decision.createdBy?.name && (
                      <span>
                        Created by{' '}
                        <strong className="font-semibold text-text-primary">{decision.createdBy.name}</strong>
                      </span>
                    )}
                    {decision.createdAt && (
                      <span>{new Date(decision.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    )}
                    {decision.views !== undefined && (
                      <span>👁️ {decision.views} views</span>
                    )}
                    {decision.votesCount !== undefined && (
                      <span>🗳️ {decision.votesCount} total votes</span>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-muted">Description</p>
                    <p className="text-sm leading-relaxed text-secondary whitespace-pre-line">
                      {decision.description || 'No detailed background provided.'}
                    </p>
                  </div>
                </div>

                {/* User Vote Banner if already voted */}
                {userVote && (
                  <div className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-bold">
                        ✓
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">You voted on this decision</p>
                        <p className="text-sm font-bold text-text-primary">
                          Your Choice: <strong>{userVote.optionText}</strong>
                        </p>
                      </div>
                    </div>

                    <Link
                      to="/analysis"
                      className="rounded-xl border border-emerald-500/30 bg-surface px-3 py-1.5 text-xs font-bold text-emerald-600 transition hover:bg-emerald-500 hover:text-white"
                    >
                      View in Analysis →
                    </Link>
                  </div>
                )}

                {/* Attached Poll Section */}
                {decision.poll && (
                  <div className="rounded-[2rem] border border-border-default bg-surface p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Attached Poll</p>
                        <h2 className="mt-1 text-xl font-black text-text-primary">{decision.poll.question}</h2>
                      </div>
                      <span className="rounded-full bg-surface-alt px-3 py-1 text-xs font-bold text-muted">
                        {decision.poll.options?.length || 0} Options
                      </span>
                    </div>

                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {decision.poll.options?.map((opt, idx) => {
                        const isUserOption = userVote && Number(userVote.optionId) === Number(opt.id);
                        return (
                          <div
                            key={opt.id || idx}
                            className={`flex items-center justify-between rounded-2xl border p-3.5 text-sm font-medium transition ${
                              isUserOption
                                ? 'border-primary bg-primary-soft text-primary font-bold shadow-sm'
                                : 'border-border-default bg-surface-alt text-text-primary'
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border-default bg-surface text-[11px] font-bold text-muted">
                                {idx + 1}
                              </span>
                              {opt.optionText}
                            </span>

                            {isUserOption && (
                              <span className="rounded-lg bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {isOpen && (
                      <div className="pt-2 flex justify-end">
                        <Link
                          to={`/decisions/${id}/vote`}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-primary-hover"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          Open Voting Screen
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Results Chart */}
                {decision.status === 'CLOSED' ? (
                  <div className="rounded-2xl border border-border-default bg-surface-alt p-6 text-center shadow-sm">
                    <p className="text-sm font-semibold text-secondary">
                      This decision is closed. Historical results are archived.
                    </p>
                  </div>
                ) : (
                  results && <ResultChart results={results} />
                )}
              </div>
            )}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

