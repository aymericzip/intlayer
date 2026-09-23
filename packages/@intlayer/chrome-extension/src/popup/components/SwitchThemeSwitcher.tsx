import { useTheme } from '@intlayer/design-system/providers';
import {
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@intlayer/design-system/switch-selector';
import type { Modes } from '@intlayer/design-system/theme-switcher-drop-down';
import { MoonIcon, SunIcon } from 'lucide-react';
import type { FunctionComponent } from 'preact';

const themeChoices = [
  {
    content: (
      <SunIcon size={13} data-mode="light" aria-label="Switch to light mode" />
    ),
    value: 'light',
  },
  {
    content: (
      <MoonIcon size={13} data-mode="dark" aria-label="Switch to dark mode" />
    ),
    value: 'dark',
  },
] as SwitchSelectorChoices<Modes>;

/** Light / dark toggle, mirroring the dashboard's `SwitchThemeSwitcher`. */
export const SwitchThemeSwitcher: FunctionComponent = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <SwitchSelector
      choices={themeChoices}
      value={resolvedTheme}
      onChange={setTheme}
      color="text"
      size="xs"
    />
  );
};
