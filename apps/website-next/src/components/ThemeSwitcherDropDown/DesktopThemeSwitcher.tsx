import { DesktopThemeSwitcher as DesktopThemeSwitcherUI } from '@intlayer/design-system/theme-switcher-drop-down';
import type { FC } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

export const DesktopThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();

  return <DesktopThemeSwitcherUI theme={theme} setTheme={setTheme} />;
};
