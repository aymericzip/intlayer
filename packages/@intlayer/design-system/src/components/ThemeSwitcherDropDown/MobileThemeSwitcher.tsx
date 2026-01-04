'use client';

import { cn } from '@utils/cn';
import { CircleDashed, Moon, Sun } from 'lucide-react';
import { type FC, useState } from 'react';
import { Modes } from './types';

type MobileThemeSwitcherProps = {
  theme: Modes;
  systemTheme: Modes;
  setTheme: (theme: Modes) => void;
};

const getIconStyle = ({
  isCurrentMode,
  isNextMode,
}: {
  isCurrentMode: boolean;
  isNextMode: boolean;
}) =>
  cn(
    `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
    `opacity-0 transition-opacity duration-300 ease-in-out`,
    isCurrentMode && `opacity-100 group-hover:opacity-0`,
    isNextMode && `group-hover:opacity-100`
  );

export const MobileThemeSwitcher: FC<MobileThemeSwitcherProps> = ({
  theme,
  systemTheme,
  setTheme,
}) => {
  const isThemeSystemTheme = systemTheme === theme;
  const defaultMode = isThemeSystemTheme ? Modes.system : theme;

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
    <button className="group relative size-10" aria-label="Theme selector">
      <CircleDashed
        className={getIconStyle({
          isCurrentMode: mode === Modes.system,
          isNextMode: nextMode === Modes.system,
        })}
        onClick={toggleMode}
        data-mode="system"
      />

      <Moon
        className={getIconStyle({
          isCurrentMode: mode === Modes.light,
          isNextMode: nextMode === Modes.light,
        })}
        onClick={toggleMode}
        data-mode="light"
      />

      <Sun
        className={getIconStyle({
          isCurrentMode: mode === Modes.dark,
          isNextMode: nextMode === Modes.dark,
        })}
        onClick={toggleMode}
        data-mode="dark"
      />
    </button>
  );
};
