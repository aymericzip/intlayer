import { useIsMounted } from '@intlayer/design-system/hooks';
import {
  MobileThemeSwitcher as MobileThemeSwitcherUI,
  type Modes,
} from '@intlayer/design-system/theme-switcher-drop-down';
import type { FC } from 'react';
import { useTheme } from '~/providers/ThemeProvider';

export const MobileThemeSwitcher: FC = () => {
  const isMounted = useIsMounted();
  const { resolvedTheme, setTheme, systemTheme } = useTheme();

  if (!isMounted) {
    return null;
  }

  return (
    <MobileThemeSwitcherUI
      theme={resolvedTheme as Modes}
      setTheme={setTheme}
      systemTheme={systemTheme as Modes}
    />
  );
};
