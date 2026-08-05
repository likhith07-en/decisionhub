export const DEFAULT_PREFERENCES = {
  theme: 'default',
  fontFamily: 'Inter',
  fontSize: 'md',
  uiMode: 'day',
};

export function getStoredPreferences() {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES;
  }

  try {
    const stored = window.localStorage.getItem('decisionhub_preferences');
    if (!stored) {
      return DEFAULT_PREFERENCES;
    }

    const parsed = JSON.parse(stored);
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function savePreferences(preferences) {
  if (typeof window === 'undefined') {
    return;
  }

  const next = { ...DEFAULT_PREFERENCES, ...preferences };
  window.localStorage.setItem('decisionhub_preferences', JSON.stringify(next));
  return next;
}
