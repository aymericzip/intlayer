import {
  LocaleNavigationSwitcher,
  type LocaleNavigationSwitcherProps,
} from '@intlayer/design-system/locale-navigation-switcher';
import { useLocation } from '@tanstack/react-router';
import type { FC } from 'react';
import { Link } from '#components/Link/Link';

export type LocaleSwitcherProps = Omit<
  LocaleNavigationSwitcherProps,
  'Link' | 'pathname'
>;

export const LocaleSwitcher: FC<LocaleSwitcherProps> = (props) => {
  const pathname = useLocation({ select: (location) => location.pathname });

  return (
    <LocaleNavigationSwitcher {...props} Link={Link} pathname={pathname} />
  );
};
