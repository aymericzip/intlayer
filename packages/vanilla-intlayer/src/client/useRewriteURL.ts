import configuration from '@intlayer/config/built';
import { getRewritePath } from '@intlayer/core/localization';
import type { Locale } from '@intlayer/types/allLocales';
import { getIntlayerClient } from './installIntlayer';

const rewrite = (locale: string): void => {
  const rewriteConfig = configuration?.routing?.rewrite;
  if (typeof window === 'undefined' || !rewriteConfig) return;

  const pathname = window.location.pathname;
  const targetPath = getRewritePath(pathname, locale as Locale, rewriteConfig);

  if (targetPath && targetPath !== pathname) {
    window.history.replaceState(
      window.history.state,
      '',
      targetPath + window.location.search + window.location.hash
    );
  }
};

/**
 * Keep the browser URL in sync with the current locale.
 *
 * Rewrites the current URL immediately and subscribes to future locale changes.
 * Returns an `unsubscribe` function to stop listening.
 *
 * Uses `window.history.replaceState` — no full-page navigation.
 *
 * @returns A cleanup function that removes the locale change listener.
 *
 * @example
 * ```ts
 * import { installIntlayer, useRewriteURL } from 'vanilla-intlayer';
 *
 * installIntlayer('en');
 *
 * const unsubscribe = useRewriteURL();
 *
 * // Later, if you want to stop URL rewriting:
 * unsubscribe();
 * ```
 */
export const useRewriteURL = (): (() => void) => {
  const client = getIntlayerClient();

  // Rewrite immediately for the current locale
  rewrite(client.locale);

  return client.subscribe((newLocale) => {
    rewrite(newLocale);
  });
};
