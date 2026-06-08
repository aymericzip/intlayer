import { useIsMounted } from '@intlayer/design-system/hooks';
import {
  DesktopThemeSwitcher as DesktopThemeSwitcherUI,
  type Modes,
} from '@intlayer/design-system/theme-switcher-drop-down';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

export const DesktopThemeSwitcher: FC = () => {
  const isMounted = useIsMounted();
  const { resolvedTheme, setTheme, systemTheme } = useTheme();

  if (!isMounted) {
    return null;
  }

  return (
    <DesktopThemeSwitcherUI
      theme={resolvedTheme as Modes}
      setTheme={setTheme}
      systemTheme={systemTheme as Modes}
    />
  );
};
