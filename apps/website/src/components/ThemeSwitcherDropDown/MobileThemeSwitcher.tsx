import { MobileThemeSwitcher as MobileThemeSwitcherUI } from '@intlayer/design-system/theme-switcher-drop-down';
import type { FC } from 'react';
import { useTheme } from '~/providers/ThemeProvider';

export const MobileThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();

  return <MobileThemeSwitcherUI theme={theme} setTheme={setTheme} />;
};
