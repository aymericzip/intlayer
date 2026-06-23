'use client';

import { getLocalizedUrl } from '@intlayer/core/localization';
import { checkIsURLAbsolute } from '@intlayer/core/utils';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useRouter } from 'next/navigation.js';
import { useCallback } from 'react';
import {
  type UseLocaleResult as UseLocaleResultReact,
  useLocale as useLocaleReact,
} from 'react-intlayer';
import { usePathname } from './usePathname';

export type UseLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: DeclaredLocales) => void;
  onChange?:
    | 'replace'
    | 'push'
    | 'none'
    | ((params: { locale: LocalesValues; path: string }) => void);
};

export type UseLocaleResult = UseLocaleResultReact & {
  pathWithoutLocale: string;
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
export const useLocale = ({
  onChange = 'replace',
  onLocaleChange,
  isCookieEnabled,
}: UseLocaleProps = {}): UseLocaleResult => {
  const { replace, push } = useRouter();
  const pathWithoutLocale = usePathname();

  const redirectionFunction = useCallback(
    (locale: LocalesValues) => {
      if (!onChange) return;

      const currentDomain =
        process.env['INTLAYER_ROUTING_DOMAINS'] !== 'false' &&
        typeof window !== 'undefined'
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
      if (
        process.env['INTLAYER_ROUTING_DOMAINS'] !== 'false' &&
        checkIsURLAbsolute(pathWithLocale)
      ) {
        try {
          const parsed = new URL(pathWithLocale);
          if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
            window.location.href = pathWithLocale;
          }
        } catch {
          // Malformed URL — skip redirect
        }
        return;
      }

      if (onChange === 'replace') {
        replace(pathWithLocale);
      }
      if (onChange === 'push') {
        push(pathWithLocale);
      }

      onLocaleChange?.(locale as DeclaredLocales);
    },
    [replace, push, pathWithoutLocale, onChange, onLocaleChange]
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
