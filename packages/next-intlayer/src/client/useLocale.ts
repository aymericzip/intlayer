import { type Locales } from '@intlayer/config/client';
import { getLocalizedUrl, getPathWithoutLocale } from '@intlayer/core';
import { usePathname, useRouter } from 'next/navigation.js';
import { useCallback } from 'react';
import { useLocale as useLocaleReact } from 'react-intlayer';

export const useLocale = () => {
  const { push, refresh } = useRouter();
  const pathname = usePathname();
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  const redirectionFunction = useCallback(
    (locale: Locales) => {
      const pathWithLocale = getLocalizedUrl(location.pathname, locale);

      push(pathWithLocale);

      return refresh();
    },
    [refresh]
  );

  const reactLocaleHook = useLocaleReact({
    onLocaleChange: redirectionFunction,
  });

  return {
    ...reactLocaleHook,
    pathWithoutLocale,
  };
};
