'use client';

import {
  getLocalizedUrl,
  getPathWithoutLocale,
} from '@intlayer/core/localization';
import type { Locale } from '@intlayer/types/allLocales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { useRouter } from 'next/router.js';
import { useCallback, useMemo } from 'react';
import { useLocale as useLocaleReact } from 'react-intlayer';
import type { UseLocaleProps, UseLocaleResult } from './useLocale';

/**
 * Hook to manage the current locale in Next.js Page Router.
 *
 * This hook provides locale management functionality tailored for the Next.js Page Router,
 * handling redirections and page reloads upon locale changes.
 *
 * @returns An object containing the current locale, path without locale, and functions to update the locale.
 *
 * @example
 * ```tsx
 * import { useLocalePageRouter } from 'next-intlayer';
 *
 * const MyComponent = () => {
 *   const { setLocale } = useLocalePageRouter();
 *
 *   return (
 *     <button onClick={() => setLocale('fr')}>Switch to French</button>
 *   );
 * };
 * ```
 */
export const useLocalePageRouter = ({
  onLocaleChange,
  isCookieEnabled,
}: UseLocaleProps = {}): UseLocaleResult => {
  const { push, pathname, reload } = useRouter();
  const pathWithoutLocale = useMemo(
    () => getPathWithoutLocale(pathname),
    [pathname]
  );

  const redirectionFunction = useCallback(
    (locale: LocalesValues) => {
      const pathWithLocale = getLocalizedUrl(pathWithoutLocale, locale);

      push(pathWithLocale);

      onLocaleChange?.(locale as Locale);

      return reload();
    },
    [pathWithoutLocale, onLocaleChange, reload]
  );

  const reactLocaleHook = useLocaleReact({
    onLocaleChange: redirectionFunction,
    isCookieEnabled,
  });

  return {
    ...reactLocaleHook,
    pathWithoutLocale,
  } as UseLocaleResult;
};
