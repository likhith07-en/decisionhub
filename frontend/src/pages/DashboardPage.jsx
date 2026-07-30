import { useEffect, useState } from 'react';
import { fetchDecisions } from '../api/axiosClient';
import DecisionCard from '../components/DecisionCard';

export default function DashboardPage() {
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    fetchDecisions().then(setDecisions).catch(() => setDecisions([]));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Hi all</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {decisions.map((decision) => (
          <DecisionCard key={decision.id} decision={decision} />
        ))}
      </div>
    </div>
  );
}
