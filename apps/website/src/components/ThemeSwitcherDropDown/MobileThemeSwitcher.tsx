'use client';

import { cn } from '@utils/cn';
import { Moon, Sun, CircleDashed } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useTheme } from 'next-themes';
import { useState, type FC } from 'react';
import { Modes } from './types';

export const MobileThemeSwitcher: FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const content = useIntlayer('theme-switcher');

  const isThemeSystemTheme = systemTheme === theme;
  const defaultMode = isThemeSystemTheme ? Modes.system : (theme as Modes);

  const [mode, setMode] = useState<Modes>(defaultMode);

  const nextMode =
    // Start loop
    // If mode is system, toggle the theme inverse of the system theme
    mode === Modes.system
      ? theme === Modes.dark
        ? Modes.light
        : Modes.dark
      : // Close loop
        // If current theme same as system theme, reset by toggle the system theme
        isThemeSystemTheme
        ? Modes.system
        : // Go to next step
          // Otherwise, toggle the remaining theme
          mode === Modes.light
          ? Modes.dark
          : Modes.light;

  const toggleMode = () => {
    if (nextMode === Modes.system) {
      setTheme(systemTheme ?? Modes.light);
    } else {
      setTheme(nextMode);
    }
    setMode(nextMode);
  };

  return (
    <button
      className="group relative size-10"
      aria-label={content.themeSwitcherLabel}
    >
      <CircleDashed
        onClick={toggleMode}
        data-role="dark-mode-switcher"
        data-mode="system"
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'opacity-0 transition-opacity duration-300 ease-in-out',
          mode === Modes.system && 'opacity-100 group-hover:opacity-0',
          nextMode === Modes.system && 'group-hover:opacity-100'
        )}
      />

      <Moon
        onClick={toggleMode}
        data-role="dark-mode-switcher"
        data-mode="light"
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'opacity-0 transition-opacity duration-300 ease-in-out',
          mode === Modes.dark && 'opacity-100 group-hover:opacity-0',
          nextMode === Modes.dark && 'group-hover:opacity-100'
        )}
      />

      <Sun
        onClick={toggleMode}
        data-role="dark-mode-switcher"
        data-mode="dark"
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'opacity-0 transition-opacity duration-300 ease-in-out',
          mode === Modes.light && 'opacity-100 group-hover:opacity-0',
          nextMode === Modes.light && 'group-hover:opacity-100'
        )}
      />
    </button>
  );
};
