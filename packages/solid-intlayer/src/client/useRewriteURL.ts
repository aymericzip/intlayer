import configuration from '@intlayer/config/built';
import { getRewritePath } from '@intlayer/core';
import type { Locale } from '@intlayer/types';
import { createEffect } from 'solid-js';
import { useLocale } from './useLocale';

/**
 * Client-side hook to manage URL rewrites in Solid without triggering a router navigation.
 * It uses `window.history.replaceState` to update the URL in the address bar.
 */
export const useRewriteURL = (): void => {
  const { locale } = useLocale();
  const rewrite = configuration?.routing?.rewrite;

  createEffect(() => {
    if (typeof window === 'undefined' || !rewrite) return;

    const loc = locale();
    const pathname = window.location.pathname;
    const targetPath = getRewritePath(pathname, loc as Locale, rewrite);

    if (targetPath && targetPath !== pathname) {
      window.history.replaceState(
        window.history.state,
        '',
        targetPath + window.location.search + window.location.hash
      );
    }
  });
};
