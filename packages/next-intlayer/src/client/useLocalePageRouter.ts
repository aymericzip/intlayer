'use client';

import { LocalesValues } from '@intlayer/config/client';
import { getLocalizedUrl, getPathWithoutLocale } from '@intlayer/core';
import { useRouter } from 'next/router.js';
import { useCallback, useMemo } from 'react';
import { useLocale as useLocaleReact } from 'react-intlayer';

export const useLocalePageRouter = () => {
  const { push, pathname, reload } = useRouter();
  const pathWithoutLocale = useMemo(
    () => getPathWithoutLocale(pathname),
    [pathname]
  );

  const redirectionFunction = useCallback(
    (locale: LocalesValues) => {
      const pathWithLocale = getLocalizedUrl(pathWithoutLocale, locale);

      push(pathWithLocale);

      return reload();
    },
    [pathWithoutLocale]
  );

  const reactLocaleHook = useLocaleReact({
    onLocaleChange: redirectionFunction,
  });

  return {
    ...reactLocaleHook,
    pathWithoutLocale,
  };
};
