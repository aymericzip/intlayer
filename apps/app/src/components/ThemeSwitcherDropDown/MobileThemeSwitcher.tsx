import {
  MobileThemeSwitcher as MobileThemeSwitcherUI,
  type Modes,
} from '@intlayer/design-system/theme-switcher-drop-down';
import type { FC } from 'react';
import { useTheme } from '#/providers/ThemeProvider';

export const MobileThemeSwitcher: FC = () => {
  const { resolvedTheme, setTheme, systemTheme } = useTheme();

  return (
    <MobileThemeSwitcherUI
      theme={resolvedTheme as Modes}
      setTheme={setTheme}
      systemTheme={systemTheme as Modes}
    />
  );
};
