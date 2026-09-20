import { internationalization, routing } from '@intlayer/config/built';
import {
  getLocalizedUrl,
  isProxyStorageLocaleEnabled,
  resolveProxyMode,
} from '@intlayer/core/localization';
import { getLocaleFromStorageClient } from '@intlayer/core/utils';
import type { Locale } from '@intlayer/types/allLocales';

/**
 * Locale explicitly carried by a URL — path prefix, or `?locale=` in
 * `search-params` mode. `undefined` when the URL is unlocalized, which in
 * `prefix-no-default` mode means it belongs to the default locale.
 */
const getExplicitUrlLocale = (url: URL): Locale | undefined => {
  const candidate =
    routing.mode === 'search-params'
      ? url.searchParams.get('locale')
      : url.pathname.split('/')[1];

  return candidate && internationalization.locales.includes(candidate as Locale)
    ? (candidate as Locale)
    : undefined;
};

/**
 * Computes where a prerendered page should send the visitor so it matches the
 * locale they stored (cookie, localStorage or sessionStorage, per
 * `routing.storage`).
 *
 * Mirrors the redirect the Intlayer proxy performs on server-rendered requests,
 * for pages served as static files where no server can read the cookie:
 * - the URL wins over storage, so a localized URL is never redirected;
 * - `routing.enableProxy: false` and `no-prefix` routing disable it;
 * - in auto mode a dev server keeps routing URL-driven, like the proxy.
 *
 * @param url - The URL of the current page.
 * @param isDevServer - Whether `astro dev` is serving the page.
 * @returns The localized URL to navigate to, or `undefined` to stay put.
 */
export const getStoredLocaleRedirect = (
  url: URL,
  isDevServer: boolean
): string | undefined => {
  const proxyMode = resolveProxyMode(routing.enableProxy);

  if (proxyMode === 'disabled') return;
  if (!isProxyStorageLocaleEnabled(proxyMode, isDevServer)) return;
  if (routing.mode === 'no-prefix') return;
  if (getExplicitUrlLocale(url)) return;

  const storedLocale = getLocaleFromStorageClient();

  if (!storedLocale || storedLocale === internationalization.defaultLocale) {
    return;
  }

  const currentPath = `${url.pathname}${url.search}${url.hash}`;
  const localizedPath = getLocalizedUrl(currentPath, storedLocale);

  return localizedPath === currentPath ? undefined : localizedPath;
};

/**
 * Whether `astro dev` is serving the page. Vite inlines `import.meta.env.DEV`
 * into the client bundle; the optional chain keeps the module loadable where
 * no bundler defines it.
 */
const isDevServer =
  (import.meta as { env?: { DEV?: boolean } }).env?.DEV === true;

/**
 * Sends the visitor of a prerendered page to the URL of their stored locale.
 *
 * Injected on every page by the `intlayer()` integration; a no-op once the URL
 * already names a locale, so a redirected page does not redirect again.
 */
export const redirectToStoredLocale = (): void => {
  if (typeof window === 'undefined') return;

  const target = getStoredLocaleRedirect(
    new URL(window.location.href),
    isDevServer
  );

  if (target) window.location.replace(target);
};
