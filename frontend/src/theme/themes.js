export const THEMES = {
  default: 'default',
  light: 'light',
  dark: 'dark',
};

export const UI_MODES = {
  royal: 'royal',
  black: 'black',
  green: 'green',
  saffron: 'saffron',
};

export const themeOrder = [THEMES.default, THEMES.light, THEMES.dark];

export const getThemeTokens = (theme, uiMode) => {
  const base = {
    [THEMES.default]: {
      background: '#f8fafc',
      surface: '#ffffff',
      surfaceAlt: '#f1f5f9',
      textPrimary: '#0f172a',
      textSecondary: '#64748b',
      border: 'rgba(15, 23, 42, 0.12)',
      shadow: '0 18px 40px rgba(15, 23, 42, 0.12)',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
    [THEMES.light]: {
      background: '#ffffff',
      surface: '#f8fafc',
      surfaceAlt: '#eff6ff',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      border: 'rgba(15, 23, 42, 0.08)',
      shadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
    [THEMES.dark]: {
      background: '#0b1220',
      surface: '#111827',
      surfaceAlt: '#1f2937',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      border: 'rgba(148, 163, 184, 0.24)',
      shadow: '0 18px 40px rgba(2, 6, 23, 0.42)',
      success: '#34d399',
      warning: '#fbbf24',
      danger: '#f87171',
    },
  };

  const tokens = base[theme] || base.default;

  const modeAdjustments = {
    [UI_MODES.black]: {
      primary: '#0f172a',
      primaryHover: '#1e293b',
      primarySoft: 'rgba(15, 23, 42, 0.12)',
    },
    [UI_MODES.green]: {
      primary: '#16a34a',
      primaryHover: '#15803d',
      primarySoft: 'rgba(22, 163, 74, 0.16)',
    },
    [UI_MODES.saffron]: {
      primary: '#f59e0b',
      primaryHover: '#d97706',
      primarySoft: 'rgba(245, 158, 11, 0.16)',
    },
    [UI_MODES.royal]: {
      primary: '#2563eb',
      primaryHover: '#1d4ed8',
      primarySoft: 'rgba(37, 99, 235, 0.14)',
    },
  };

  const modeTokens = modeAdjustments[uiMode] || modeAdjustments.royal;
  
  if (theme === THEMES.dark && uiMode === UI_MODES.black) {
    modeTokens.primary = '#f8fafc';
    modeTokens.primaryHover = '#e2e8f0';
    modeTokens.primarySoft = 'rgba(248, 250, 252, 0.16)';
  }

  return {
    '--background': tokens.background,
    '--surface': tokens.surface,
    '--surface-alt': tokens.surfaceAlt,
    '--card': tokens.surface,
    '--text-primary': tokens.textPrimary,
    '--text-secondary': tokens.textSecondary,
    '--border': tokens.border,
    '--primary': modeTokens.primary,
    '--primary-hover': modeTokens.primaryHover,
    '--primary-soft': modeTokens.primarySoft,
    '--shadow': tokens.shadow,
    '--success': tokens.success,
    '--warning': tokens.warning,
    '--danger': tokens.danger,
  };
};
