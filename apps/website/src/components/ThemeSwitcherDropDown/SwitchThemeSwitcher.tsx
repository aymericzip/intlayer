import { useIsMounted } from '@intlayer/design-system/hooks';
import {
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@intlayer/design-system/switch-selector';
import type { Modes } from '@intlayer/design-system/theme-switcher-drop-down';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

export const SwitchThemeSwitcher: FC = () => {
  const isMounted = useIsMounted();
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
      value: 'light',
    },
    {
      content: (
        <MoonIcon size={20} data-mode="dark" aria-label="Switch to dark mode" />
      ),
      value: 'dark',
    },
  ] as SwitchSelectorChoices<Modes>;

  if (!isMounted) {
    return null;
  }

  return (
    <SwitchSelector
      choices={themeSwitcher}
      value={resolvedTheme}
      onChange={setTheme}
      color="text"
      size="sm"
    />
  );
};
