'use client';

import { type LocalesValues } from '@intlayer/config/client';
import { getLocalizedUrl, getPathWithoutLocale } from '@intlayer/core';
import { usePathname, useRouter } from 'next/navigation.js';
import { useCallback, useMemo } from 'react';
import { useLocale as useLocaleReact } from 'react-intlayer';

export const useLocale = () => {
  const { push, refresh } = useRouter();
  const pathname = usePathname();
  const pathWithoutLocale = useMemo(
    () => getPathWithoutLocale(pathname),
    [pathname]
  );

  const redirectionFunction = useCallback(
    (locale: LocalesValues) => {
      const pathWithLocale = getLocalizedUrl(pathWithoutLocale, locale);

      push(pathWithLocale);

      return refresh();
    },
    [refresh, pathWithoutLocale]
  );

  const reactLocaleHook = useLocaleReact({
    onLocaleChange: redirectionFunction,
  });

  return {
    ...reactLocaleHook,
    pathWithoutLocale,
  };
};
