export default function DecisionCard({ decision }) {
  return (
    <div style={{ border: '1px solid #de1616', padding: '1rem', borderRadius: '8px' }}>
      <h3>{decision.title}</h3>
      <p>Status: {decision.status}</p>
    </div>
  );
}
