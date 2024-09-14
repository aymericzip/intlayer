'use client';

import {
  LocaleSwitcher as LocaleSwitcherUI,
  type LocaleSwitcherProps,
} from '@intlayer/design-system';
import { useLocale } from 'next-intlayer';
import type { FC } from 'react';

export const LocaleSwitcher: FC<Partial<LocaleSwitcherProps>> = (props) => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <LocaleSwitcherUI
      setLocale={setLocale}
      localeList={availableLocales}
      locale={locale}
      fullLocaleName={false}
      {...props}
    />
  );
};
