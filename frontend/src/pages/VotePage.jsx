import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { decisionService } from '../services/decisionService';
import { voteService } from '../services/voteService';
import PollCard from '../components/PollCard';
import ResultChart from '../components/ResultChart';
import Loader from '../components/Loader';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const VotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [decision, setDecision] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const dec = await decisionService.getDecisionById(id);
      setDecision(dec);

      const res = await voteService.getVoteResults(id);
      setResults(res);
    } catch (err) {
      setError('Could not load decision or poll details.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (!selectedOptionId) return;
    setError(null);
    setSubmitting(true);

    try {
      await voteService.castVote({
        decisionId: Number(id),
        optionId: selectedOptionId,
      });

      setSuccessMsg('Your vote has been officially recorded!');
      setHasVoted(true);

      // Refresh poll results immediately
      const updatedResults = await voteService.getVoteResults(id);
      setResults(updatedResults);
    } catch (err) {
      if (err.response?.status === 409 || err.response?.data?.message?.includes('already voted')) {
        setError('You have already voted on this decision.');
        setHasVoted(true);
      } else {
        setError(err.response?.data?.message || 'Failed to submit vote.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader message="Preparing voting session..." />;

  if (!decision) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Decision not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => navigate(`/decisions/${id}`)}
        className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Decision Details</span>
      </button>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <PollCard
        poll={decision.poll}
        decisionId={decision.id}
        selectedOptionId={selectedOptionId}
        onSelectOption={(optId) => setSelectedOptionId(optId)}
        onVote={handleVote}
        isSubmitting={submitting}
        hasVoted={hasVoted}
      />

      {results && <ResultChart results={results} />}
    </div>
  );
};

export default VotePage;
