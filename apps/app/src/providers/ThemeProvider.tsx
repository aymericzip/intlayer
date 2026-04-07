import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  systemTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
}

const STORAGE_KEY = 'intlayer-theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored;
  }

  return 'auto';
}

function applyThemeMode(mode: ThemeMode) {
  if (typeof window === 'undefined') return;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode;

  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(resolved);

  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
  }

  document.documentElement.style.colorScheme = resolved;
}

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialMode());
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    applyThemeMode(theme);

    const updateResolvedTheme = () => {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const sysTheme = prefersDark ? 'dark' : 'light';
      const resolved = theme === 'auto' ? sysTheme : theme;
      setSystemTheme(sysTheme);
      setResolvedTheme(resolved as 'light' | 'dark');
    };

    updateResolvedTheme();

    if (theme === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', updateResolvedTheme);
      return () => media.removeEventListener('change', updateResolvedTheme);
    }
  }, [theme]);

  const setTheme = (nextMode: ThemeMode) => {
    setThemeState(nextMode);
    window.localStorage.setItem(STORAGE_KEY, nextMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, systemTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
