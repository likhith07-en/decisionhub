import { createContext, useEffect, useMemo, useState } from 'react';
import { THEMES, UI_MODES, getThemeTokens, themeOrder } from './themes';

export const ThemeContext = createContext(null);

const STORAGE_KEY = 'decisionhub_theme_preferences';

const DEFAULT_PREFERENCES = {
  theme: THEMES.default,
  uiMode: UI_MODES.royal,
};

function getStoredPreferences() {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(item);

    // Validate stored values against actual THEMES and UI_MODES
    const validThemes = Object.values(THEMES);
    const validModes = Object.values(UI_MODES);

    return {
      theme: validThemes.includes(parsed.theme) ? parsed.theme : DEFAULT_PREFERENCES.theme,
      uiMode: validModes.includes(parsed.uiMode) ? parsed.uiMode : DEFAULT_PREFERENCES.uiMode,
    };
  } catch (error) {
    console.warn('Failed to read theme preferences from localStorage:', error);
    return DEFAULT_PREFERENCES;
  }
}

function savePreferences(preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save theme preferences to localStorage:', error);
  }
}

export function ThemeProvider({ children }) {
  // Initialize with validated stored preferences immediately (not just defaults)
  const [preferences, setPreferencesState] = useState(() => {
    // Auto-migrate: clear any stale old-format data on first load
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const validThemes = Object.values(THEMES);
        const validModes = Object.values(UI_MODES);
        if (!validThemes.includes(parsed.theme) || !validModes.includes(parsed.uiMode)) {
          // Old stale data detected — wipe it and use defaults
          localStorage.removeItem(STORAGE_KEY);
          return DEFAULT_PREFERENCES;
        }
      }
    } catch { /* ignore */ }
    return getStoredPreferences();
  });

  // Load initial preferences
  useEffect(() => {
    setPreferencesState(getStoredPreferences());
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove old theme classes (for backward compatibility during migration)
    root.classList.remove('theme-default', 'theme-light', 'theme-dark', 'theme-midnight', 'theme-sunrise', 'theme-forest');
    
    // Add current theme and mode
    root.classList.add(`theme-${preferences.theme}`);
    root.dataset.uiMode = preferences.uiMode;
    root.dataset.theme = preferences.theme;
    
    // Default font setup
    root.style.setProperty('--app-font-family', 'Inter, system-ui, sans-serif');
    root.style.setProperty('--app-font-size', '1rem');

    // Get and apply CSS variables
    const themeTokens = getThemeTokens(preferences.theme, preferences.uiMode);
    Object.entries(themeTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    savePreferences(preferences);
  }, [preferences]);

  const setPreferences = (next) => {
    setPreferencesState((prev) => ({ ...prev, ...next }));
  };

  const cycleTheme = () => {
    const currentIndex = themeOrder.indexOf(preferences.theme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    setPreferences({ theme: nextTheme });
  };

  const value = useMemo(() => ({
    theme: preferences.theme,
    uiMode: preferences.uiMode,
    setTheme: (theme) => setPreferences({ theme }),
    setUiMode: (uiMode) => setPreferences({ uiMode }),
    cycleTheme,
  }), [preferences]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
