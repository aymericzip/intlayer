'use client';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when no domain routing is configured at build time
 * (INTLAYER_ROUTING_DOMAINS === 'false').
 */
const TREE_SHAKE_DOMAINS = process.env['INTLAYER_ROUTING_DOMAINS'] === 'false';

import {
  getLocalizedUrl,
  getPathWithoutLocale,
} from '@intlayer/core/localization';
import { checkIsURLAbsolute } from '@intlayer/core/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { usePathname, useRouter } from 'next/navigation.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale as useLocaleReact } from 'react-intlayer';

type UseLocaleProps = {
  onChange?:
    | 'replace'
    | 'push'
    | 'none'
    | ((params: { locale: LocalesValues; path: string }) => void);
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
export const useLocale = ({ onChange = 'replace' }: UseLocaleProps = {}) => {
  const { replace, push } = useRouter();
  const pathWithoutLocale = usePathWithoutLocale();

  const redirectionFunction = useCallback(
    (locale: LocalesValues) => {
      if (!onChange) return;

      const currentDomain =
        !TREE_SHAKE_DOMAINS && typeof window !== 'undefined'
          ? window.location.hostname
          : undefined;

      const pathWithLocale = getLocalizedUrl(pathWithoutLocale, locale, {
        currentDomain,
      });

      if (typeof onChange === 'function') {
        onChange({ locale, path: pathWithLocale });
        return;
      }

      // Cross-domain navigation: the Next.js router cannot navigate to a
      // different origin, so fall back to a full page load.
      if (!TREE_SHAKE_DOMAINS && checkIsURLAbsolute(pathWithLocale)) {
        window.location.href = pathWithLocale;
        return;
      }

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
