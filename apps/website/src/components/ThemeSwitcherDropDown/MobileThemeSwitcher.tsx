import { MobileThemeSwitcher as MobileThemeSwitcherUI } from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

export const MobileThemeSwitcher: FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <MobileThemeSwitcherUI
      theme={theme}
      setTheme={setTheme}
      systemTheme={systemTheme}
    />
  );
};
