'use client';

import { getLocalizedUrl, getPathWithoutLocale } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import { usePathname, useRouter } from 'next/navigation.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale as useLocaleReact } from 'react-intlayer';

type UseLocaleProps = {
  onChange?: 'replace' | 'push' | ((locale: LocalesValues) => void);
};

const usePathWithoutLocale = () => {
  const pathname = usePathname(); // updates on client navigations
  const [fullPath, setFullPath] = useState(pathname);

  useEffect(() => {
    // Runs only on client; avoids suspense.
    const search = typeof window !== 'undefined' ? window.location.search : '';
    setFullPath(search ? `${pathname}${search}` : pathname);
  }, [pathname]);

  // Your own helper
  return useMemo(() => getPathWithoutLocale(fullPath), [fullPath]);
};

/**
 * Hook to manage the current locale in Next.js App Router.
 *
 * This hook extends the base `useLocale` from `react-intlayer` by adding
 * Next.js-specific navigation logic for locale changes.
 *
 * @param props - Optional properties to configure locale change behavior.
 * @returns An object containing the current locale, path without locale, and functions to update the locale.
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { useLocale } from 'next-intlayer';
 *
 * const LocaleSwitcher = () => {
 *   const { setLocale } = useLocale({ onChange: 'push' });
 *
 *   return (
 *     <button onClick={() => setLocale('fr')}>Switch to French</button>
 *   );
 * };
 * ```
 */
export const useLocale = ({ onChange }: UseLocaleProps = {}) => {
  const { replace, push } = useRouter();
  const pathWithoutLocale = usePathWithoutLocale();

  const redirectionFunction = useCallback(
    (locale: LocalesValues) => {
      if (!onChange) return;

      if (typeof onChange === 'function') {
        onChange(locale);
        return;
      }

      const pathWithLocale = getLocalizedUrl(pathWithoutLocale, locale);

      if (onChange === 'replace') {
        replace(pathWithLocale);
      }
      if (onChange === 'push') {
        push(pathWithLocale);
      }
    },
    [replace, push, pathWithoutLocale, onChange]
  );

  const reactLocaleHook = useLocaleReact({
    onLocaleChange: redirectionFunction,
  });

  return {
    ...reactLocaleHook,
    pathWithoutLocale,
  };
};
