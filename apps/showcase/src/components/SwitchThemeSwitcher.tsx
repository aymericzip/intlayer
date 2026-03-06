import {
  Modes,
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@intlayer/design-system';
import { MoonIcon, SunIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTheme } from './ThemeProvider';

export const SwitchThemeSwitcher: FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

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

  return (
    <SwitchSelector
      choices={themeSwitcher}
      value={resolvedTheme as Modes}
      onChange={(m) => setTheme(m as 'light' | 'dark' | 'auto')}
      color="text"
      size="sm"
    />
  );
};
