export default function DecisionCard({ decision }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
      <h3>{decision.title}</h3>
      <p>Status: {decision.status}</p>
    </div>
  );
}
