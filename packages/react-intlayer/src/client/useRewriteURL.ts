'use client';

import configuration from '@intlayer/config/built';
import { getRewritePath } from '@intlayer/core';
import { useEffect } from 'react';
import { useLocale } from './useLocale';

/**
 * Client-side hook to manage URL rewrites without triggering a router navigation.
 * It uses `window.history.replaceState` to update the URL in the address bar.
 *
 * This hook is useful to "prettify" the URL when the user lands on a canonical path
 * that has a localized alias defined in `intlayer.config.ts`.
 *
 * @example
 * ```tsx
 * import { useRewriteURL } from 'react-intlayer';
 *
 * const MyComponent = () => {
 *   useRewriteURL();
 *
 *   return <div>My Component</div>;
 * };
 * ```
 */
export const useRewriteURL = (): void => {
  const { locale } = useLocale();
  const rewrite = configuration?.routing?.rewrite;

  useEffect(() => {
    if (typeof window === 'undefined' || !rewrite) return;

    const pathname = window.location.pathname;
    const targetPath = getRewritePath(pathname, locale, rewrite);

    if (targetPath && targetPath !== pathname) {
      window.history.replaceState(
        window.history.state,
        '',
        targetPath + window.location.search + window.location.hash
      );
    }
  }, [locale, rewrite]);
};
