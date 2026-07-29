const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function fetchDecisions() {
  const response = await fetch(`${API_BASE_URL}/api/decisions`);
  return response.json();
}
