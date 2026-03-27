import {
  DesktopThemeSwitcher as DesktopThemeSwitcherUI,
  type Modes,
} from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

export const DesktopThemeSwitcher: FC = () => {
  const { resolvedTheme, setTheme, systemTheme } = useTheme();
  return (
    <DesktopThemeSwitcherUI
      theme={resolvedTheme as Modes}
      setTheme={setTheme}
      systemTheme={systemTheme as Modes}
    />
  );
};
