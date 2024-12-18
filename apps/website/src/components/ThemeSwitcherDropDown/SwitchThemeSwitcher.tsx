'use client';

import {
  Modes,
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@intlayer/design-system';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

export const SwitchThemeSwitcher: FC = () => {
  const { resolvedTheme, setTheme, systemTheme } = useTheme();

  const themeSwitcher = [
    {
      content: (
        <SunIcon
          size={20}
          data-mode="light"
          aria-label="Switch to light mode"
        />
      ),
      value: Modes.light,
    },
    {
      content: (
        <MoonIcon size={20} data-mode="dark" aria-label="Switch to dark mode" />
      ),
      value: Modes.dark,
    },
  ] as SwitchSelectorChoices<Modes>;

  const currentTheme =
    (resolvedTheme as Modes) ?? (systemTheme as Modes) ?? Modes.light;

  return (
    <SwitchSelector
      choices={themeSwitcher}
      value={currentTheme}
      onChange={setTheme}
      color="text"
      size="sm"
    />
  );
};
