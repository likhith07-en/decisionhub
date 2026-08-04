import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_PREFERENCES, getStoredPreferences, savePreferences } from '../utils/preferences';

const PreferencesContext = createContext(null);

const themeOrder = ['default', 'midnight', 'sunrise', 'forest'];
const fontFamilyOrder = ['Inter', 'Poppins', 'Roboto', 'Space Grotesk'];

function getThemeTokens(theme, uiMode) {
  const base = {
    default: {
      bg: '#f8fafc',
      surface: '#ffffff',
      surfaceAlt: '#f1f5f9',
      text: '#0f172a',
      muted: '#64748b',
      border: 'rgba(15, 23, 42, 0.12)',
      accent: '#2563eb',
      accentSoft: 'rgba(37, 99, 235, 0.14)',
      shadow: '0 18px 40px rgba(15, 23, 42, 0.12)',
    },
    midnight: {
      bg: '#020617',
      surface: '#0f172a',
      surfaceAlt: '#111827',
      text: '#f8fafc',
      muted: '#94a3b8',
      border: 'rgba(148, 163, 184, 0.24)',
      accent: '#60a5fa',
      accentSoft: 'rgba(96, 165, 250, 0.2)',
      shadow: '0 18px 40px rgba(2, 6, 23, 0.42)',
    },
    sunrise: {
      bg: '#fff7ed',
      surface: '#fffbeb',
      surfaceAlt: '#ffedd5',
      text: '#7c2d12',
      muted: '#9a2c16',
      border: 'rgba(194, 65, 12, 0.2)',
      accent: '#ea580c',
      accentSoft: 'rgba(234, 88, 12, 0.16)',
      shadow: '0 18px 40px rgba(194, 65, 12, 0.16)',
    },
    forest: {
      bg: '#f0fdf4',
      surface: '#ecfdf5',
      surfaceAlt: '#dcfce7',
      text: '#14532d',
      muted: '#166534',
      border: 'rgba(21, 101, 52, 0.18)',
      accent: '#16a34a',
      accentSoft: 'rgba(22, 163, 74, 0.16)',
      shadow: '0 18px 40px rgba(21, 101, 52, 0.16)',
    },
  };

  const tokens = base[theme] || base.default;
  const modeAdjustments = {
    day: { bg: tokens.bg, surface: tokens.surface, text: tokens.text },
    night: {
      bg: uiMode === 'night' ? (theme === 'default' ? '#0f172a' : theme === 'midnight' ? '#020617' : theme === 'sunrise' ? '#7c2d12' : '#14532d') : tokens.bg,
      surface: uiMode === 'night' ? (theme === 'default' ? '#111827' : theme === 'midnight' ? '#0f172a' : theme === 'sunrise' ? '#9a2c16' : '#166534') : tokens.surface,
      text: uiMode === 'night' ? '#f8fafc' : tokens.text,
    },
    focus: {
      bg: theme === 'default' ? '#eef2ff' : theme === 'midnight' ? '#111827' : theme === 'sunrise' ? '#fff7ed' : '#f0fdf4',
      surface: theme === 'default' ? '#ffffff' : tokens.surface,
      text: tokens.text,
    },
    collab: {
      bg: theme === 'default' ? '#f8fafc' : tokens.bg,
      surface: theme === 'default' ? '#f8fafc' : tokens.surface,
      text: tokens.text,
    },
  };

  const modeTokens = modeAdjustments[uiMode] || modeAdjustments.day;
  const modeScale = uiMode === 'night' ? 0.96 : uiMode === 'focus' ? 0.96 : uiMode === 'collab' ? 1.03 : 1;

  return {
    '--app-bg': modeTokens.bg,
    '--app-surface': modeTokens.surface,
    '--app-surface-alt': tokens.surfaceAlt,
    '--app-text': modeTokens.text,
    '--app-muted': tokens.muted,
    '--app-border': tokens.border,
    '--app-accent': tokens.accent,
    '--app-accent-soft': tokens.accentSoft,
    '--app-shadow': tokens.shadow,
    '--app-density': modeScale,
    '--app-radius': uiMode === 'focus' ? '1rem' : uiMode === 'collab' ? '1.75rem' : '1.25rem',
  };
}

export function PreferencesProvider({ children }) {
  const [preferences, setPreferencesState] = useState(DEFAULT_PREFERENCES);

  useEffect(() => {
    const initial = getStoredPreferences();
    setPreferencesState(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-default', 'theme-midnight', 'theme-sunrise', 'theme-forest');
    root.classList.add(`theme-${preferences.theme}`);
    const uiMode = preferences.uiMode || 'day';
    root.dataset.uiMode = uiMode;
    root.style.setProperty('--app-font-family', preferences.fontFamily || 'Inter');
    root.style.setProperty('--app-font-size', preferences.fontSize === 'lg' ? '1.08rem' : preferences.fontSize === 'sm' ? '0.92rem' : '1rem');

    const themeTokens = getThemeTokens(preferences.theme || 'default', uiMode);
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
    preferences,
    setPreferences,
    cycleTheme,
    themeOrder,
    fontFamilyOrder,
  }), [preferences]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
