import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchDecisionById, deleteDecisionApi, getVoteResultsApi } from '../api/axiosClient';
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

  const isCreator = user && decision?.createdBy && user.id === decision.createdBy.id;

  const statusColors = {
    OPEN: 'bg-green-100 text-green-700',
    CLOSED: 'bg-red-100 text-red-700',
    OPEN_TO_VOTE: 'bg-green-100 text-green-700',
  };

  return (
    <div className="page-shell flex flex-col sm:pr-[60px]">
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

                {/* Decision card */}
                <div className="rounded-[2rem] border border-default bg-surface p-6 shadow-sm space-y-5">
                  {/* Status + title */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-default pb-5">
                    <div>
                      <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[decision.status] || 'bg-background text-secondary'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${decision.status === 'CLOSED' ? 'bg-red-500' : 'bg-green-500'}`} />
                        {decision.status}
                      </span>
                      <h1 className="text-3xl font-black tracking-tight text-primary">{decision.title}</h1>
                    </div>

                    {decision.status === 'OPEN' && decision.poll && (
                      <Link
                        to={`/decisions/${id}/vote`}
                        className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-app shadow-blue-200 transition hover:bg-primary-hover"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Cast / View Vote
                      </Link>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-xs text-secondary">
                    {decision.createdBy?.name && (
                      <span>
                        Created by{' '}
                        <strong className="font-semibold text-secondary">{decision.createdBy.name}</strong>
                      </span>
                    )}
                    {decision.createdAt && (
                      <span>{new Date(decision.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Description</p>
                    <p className="text-sm leading-relaxed text-secondary whitespace-pre-line">
                      {decision.description || 'No description provided.'}
                    </p>
                  </div>
                </div>

                {/* Results */}
                {decision.status === 'CLOSED' ? (
                  <div className="rounded-2xl border border-default bg-background p-6 text-center shadow-sm">
                    <p className="text-sm font-semibold text-secondary">
                      Info is no more public, contact admin/ poll creator ({decision.createdBy?.name || 'respective user'})
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
