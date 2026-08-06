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
      overlay: 'rgba(15, 23, 42, 0.25)',
      heroGradient: 'linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)',
      loaderBg: 'radial-gradient(ellipse at 50% 30%, rgba(239,246,255,0.97) 0%, rgba(248,250,252,0.95) 50%, rgba(241,245,249,0.92) 100%)',
      disabledBg: '#cbd5e1',
      statusOpenBg: 'rgba(16, 185, 129, 0.12)',
      statusOpenText: '#059669',
      statusClosedBg: 'rgba(239, 68, 68, 0.12)',
      statusClosedText: '#dc2626',
      errorBg: 'rgba(239, 68, 68, 0.08)',
      errorBorder: 'rgba(239, 68, 68, 0.2)',
      errorText: '#dc2626',
      successBg: 'rgba(16, 185, 129, 0.08)',
      successBorder: 'rgba(16, 185, 129, 0.2)',
      successText: '#059669',
      winnerBg: 'rgba(245, 158, 11, 0.1)',
      winnerBorder: 'rgba(245, 158, 11, 0.3)',
      winnerAccent: '#d97706',
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
      overlay: 'rgba(15, 23, 42, 0.2)',
      heroGradient: 'linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)',
      loaderBg: 'radial-gradient(ellipse at 50% 30%, rgba(239,246,255,0.97) 0%, rgba(248,250,252,0.95) 50%, rgba(241,245,249,0.92) 100%)',
      disabledBg: '#cbd5e1',
      statusOpenBg: 'rgba(16, 185, 129, 0.12)',
      statusOpenText: '#059669',
      statusClosedBg: 'rgba(239, 68, 68, 0.12)',
      statusClosedText: '#dc2626',
      errorBg: 'rgba(239, 68, 68, 0.08)',
      errorBorder: 'rgba(239, 68, 68, 0.2)',
      errorText: '#dc2626',
      successBg: 'rgba(16, 185, 129, 0.08)',
      successBorder: 'rgba(16, 185, 129, 0.2)',
      successText: '#059669',
      winnerBg: 'rgba(245, 158, 11, 0.1)',
      winnerBorder: 'rgba(245, 158, 11, 0.3)',
      winnerAccent: '#d97706',
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
      overlay: 'rgba(0, 0, 0, 0.5)',
      heroGradient: 'linear-gradient(180deg, #111827 0%, #0b1220 100%)',
      loaderBg: 'radial-gradient(ellipse at 50% 30%, rgba(17,24,39,0.97) 0%, rgba(11,18,32,0.95) 50%, rgba(15,23,42,0.92) 100%)',
      disabledBg: '#374151',
      statusOpenBg: 'rgba(52, 211, 153, 0.16)',
      statusOpenText: '#34d399',
      statusClosedBg: 'rgba(248, 113, 113, 0.16)',
      statusClosedText: '#f87171',
      errorBg: 'rgba(248, 113, 113, 0.12)',
      errorBorder: 'rgba(248, 113, 113, 0.3)',
      errorText: '#f87171',
      successBg: 'rgba(52, 211, 153, 0.12)',
      successBorder: 'rgba(52, 211, 153, 0.3)',
      successText: '#34d399',
      winnerBg: 'rgba(251, 191, 36, 0.12)',
      winnerBorder: 'rgba(251, 191, 36, 0.3)',
      winnerAccent: '#fbbf24',
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
    '--overlay': tokens.overlay,
    '--hero-gradient': tokens.heroGradient,
    '--loader-bg': tokens.loaderBg,
    '--disabled-bg': tokens.disabledBg,
    '--status-open-bg': tokens.statusOpenBg,
    '--status-open-text': tokens.statusOpenText,
    '--status-closed-bg': tokens.statusClosedBg,
    '--status-closed-text': tokens.statusClosedText,
    '--error-bg': tokens.errorBg,
    '--error-border': tokens.errorBorder,
    '--error-text': tokens.errorText,
    '--success-bg': tokens.successBg,
    '--success-border': tokens.successBorder,
    '--success-text': tokens.successText,
    '--winner-bg': tokens.winnerBg,
    '--winner-border': tokens.winnerBorder,
    '--winner-accent': tokens.winnerAccent,
  };
};

