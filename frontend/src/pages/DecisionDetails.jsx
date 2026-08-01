import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { decisionService } from '../services/decisionService';
import { voteService } from '../services/voteService';
import { useAuth } from '../context/AuthContext';
import ResultChart from '../components/ResultChart';
import Loader from '../components/Loader';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Vote, 
  Trash2, 
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart2
} from 'lucide-react';

const DecisionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

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
      const dec = await decisionService.getDecisionById(id);
      setDecision(dec);

      if (dec.poll) {
        const res = await voteService.getVoteResults(id);
        setResults(res);
      }
    } catch (err) {
      setError('Decision not found or could not be loaded.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this decision?')) return;
    try {
      setDeleting(true);
      await decisionService.deleteDecision(id);
      navigate('/');
    } catch (err) {
      alert('Failed to delete decision.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loader message="Loading decision details..." />;

  if (error || !decision) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold text-white mb-2">{error || 'Decision not found'}</h2>
        <Link to="/" className="text-blue-400 font-semibold hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const isCreator = user && decision.createdBy && user.id === decision.createdBy.id;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Decisions</span>
        </button>

        {isCreator && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{deleting ? 'Deleting...' : 'Delete Decision'}</span>
          </button>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border mb-3 ${
                decision.status === 'CLOSED'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${decision.status === 'CLOSED' ? 'bg-rose-400' : 'bg-emerald-400 animate-pulse'}`} />
              <span>{decision.status}</span>
            </span>

            <h1 className="text-3xl font-extrabold text-white tracking-tight">{decision.title}</h1>
          </div>

          <Link
            to={`/decisions/${id}/vote`}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20"
          >
            <Vote className="w-4 h-4" />
            <span>Cast / View Vote</span>
          </Link>
        </div>

        <div className="flex items-center space-x-6 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>Created by <strong className="text-slate-200">{decision.createdBy?.name}</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>Created on {new Date(decision.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line text-base">
            {decision.description || 'No additional description provided.'}
          </p>
        </div>
      </div>

      {/* Live Poll Results Section */}
      {results && (
        <ResultChart results={results} />
      )}
    </div>
  );
};

export default DecisionDetails;
