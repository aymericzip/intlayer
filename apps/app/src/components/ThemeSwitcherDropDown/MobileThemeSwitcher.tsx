import {
  MobileThemeSwitcher as MobileThemeSwitcherUI,
  type Modes,
} from '@intlayer/design-system/theme-switcher-drop-down';
import { useTheme } from '#/providers/ThemeProvider';
import type { FC } from 'react';

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
