import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';
const THEME_STORAGE_KEY = 'patel_auto_theme';

export function getInitialTheme(): ThemeMode {
  if (typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }
  }
  return 'light';
}

export function applyThemeToDom(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  const themeMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
  if (themeMeta) {
    themeMeta.content = theme === 'dark' ? '#020617' : '#0b2244';
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    applyThemeToDom(theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
