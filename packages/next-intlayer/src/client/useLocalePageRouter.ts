import { type Locales } from '@intlayer/config/client';
import { getLocalizedUrl, getPathWithoutLocale } from 'intlayer';
import { useRouter } from 'next/router.js';
import { useCallback } from 'react';
import { useLocale as useLocaleReact } from 'react-intlayer';

export const useLocalePageRouter = () => {
  const { push, pathname, reload } = useRouter();
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  const redirectionFunction = useCallback(
    (locale: Locales) => {
      const pathWithLocale = getLocalizedUrl(pathWithoutLocale, locale);

      push(pathWithLocale);

      return reload();
    },
    [reload]
  );

  const reactLocaleHook = useLocaleReact({
    onLocaleChange: redirectionFunction,
  });

  return {
    ...reactLocaleHook,
    pathWithoutLocale,
  };
};
