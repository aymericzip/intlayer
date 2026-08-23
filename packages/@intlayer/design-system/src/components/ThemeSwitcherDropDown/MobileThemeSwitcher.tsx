'use client';

import { cn } from '@utils/cn';
import { CircleDashed, Moon, Sun } from 'lucide-react';
import type { FC } from 'react';
import type { Modes } from './types';

type MobileThemeSwitcherProps = {
  /** Preference currently persisted — `system` while following the OS. */
  theme: Modes;
  setTheme: (theme: Modes) => void;
};

/** Order a tap cycles through. */
const modeCycle: Modes[] = ['system', 'light', 'dark'];

const getNextMode = (mode: Modes): Modes =>
  modeCycle[(modeCycle.indexOf(mode) + 1) % modeCycle.length];

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
  setTheme,
}) => {
  const nextMode = getNextMode(theme);
  const toggleMode = () => setTheme(nextMode);

  return (
    <button
      type="button"
      className="group relative size-10"
      aria-label="Theme selector"
    >
      <CircleDashed
        className={getIconStyle({
          isCurrentMode: theme === 'system',
          isNextMode: nextMode === 'system',
        })}
        onClick={toggleMode}
        data-mode="system"
      />

      <Moon
        className={getIconStyle({
          isCurrentMode: theme === 'light',
          isNextMode: nextMode === 'light',
        })}
        onClick={toggleMode}
        data-mode="light"
      />

      <Sun
        className={getIconStyle({
          isCurrentMode: theme === 'dark',
          isNextMode: nextMode === 'dark',
        })}
        onClick={toggleMode}
        data-mode="dark"
      />
    </button>
  );
};
