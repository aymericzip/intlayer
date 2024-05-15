import { DesktopThemeSwitcher as DesktopThemeSwitcherUI } from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

export const DesktopThemeSwitcher: FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <DesktopThemeSwitcherUI
      theme={theme}
      setTheme={setTheme}
      systemTheme={systemTheme}
    />
  );
};
