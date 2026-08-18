import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getLocaleFromStorageClient } from '../utils/localeStorage';
import { getLocaleFromDomain } from './domainUtils';
import { getLocaleFromPath } from './getLocaleFromPath';
import { type RoutingOptions, resolveRoutingConfig } from './getPrefix';

/**
 * Resolves the locale of the current document outside of React.
 *
 * Generated dynamic entry points need the locale while they are still
 * evaluating, long before a provider exists, so this reproduces the precedence
 * a provider applies — URL first (which is what a router hands the provider as
 * `locale`), then browser storage, then the configured default. Agreeing with
 * the provider is what makes the preloaded read hit; disagreeing is safe but
 * costs a load, since the consumer compares locales before using a preloaded
 * dictionary.
 *
 * @param options - Routing overrides, defaulting to the built configuration.
 * @returns The resolved locale, falling back to the default locale off-browser.
 */
export const resolveBrowserLocale = (
  options?: RoutingOptions
): LocalesValues => {
  const { defaultLocale, mode, domains } = resolveRoutingConfig(options);

  if (typeof window === 'undefined') return defaultLocale;

  // A domain mapped to exactly one locale identifies it on its own, and no URL
  // prefix is emitted for it — so it has to be consulted before the path.
  if (domains) {
    const localeFromDomain = getLocaleFromDomain(
      window.location.hostname,
      domains
    );
    if (localeFromDomain) return localeFromDomain;
  }

  // Only a URL that actually carries a locale may take precedence over a
  // stored preference: in `no-prefix`, and in `search-params` without the
  // parameter, `getLocaleFromPath` answers the default locale — which is not
  // what a provider would receive from its router, and would shadow storage.
  const urlCarriesLocale =
    mode === 'prefix-all' ||
    mode === 'prefix-no-default' ||
    (mode === 'search-params' &&
      new URLSearchParams(window.location.search).has('locale'));

  if (urlCarriesLocale) {
    const localeFromPath = getLocaleFromPath(
      window.location.pathname + window.location.search,
      options
    );
    if (localeFromPath) return localeFromPath;
  }

  return getLocaleFromStorageClient() ?? defaultLocale;
};

/** URL (path + search) the memoized locale below was resolved against. */
let memoizedUrl: string | undefined;
let memoizedLocale: LocalesValues | undefined;

/**
 * {@link resolveBrowserLocale}, memoized for the current URL.
 *
 * Every generated dynamic entry point calls this as it evaluates, and an
 * application has hundreds of them — repeating the cookie and storage reads
 * that many times on startup is pure cost, since they cannot change while a
 * page is being assembled.
 *
 * Keying the cache on the URL rather than caching forever keeps a client-side
 * locale change honest: navigating to another locale's URL loads further
 * chunks with that locale, instead of preloading the old one and silently
 * falling back to an asynchronous read.
 */
export const getPreloadLocale = (): LocalesValues => {
  const currentUrl =
    typeof window === 'undefined'
      ? ''
      : window.location.pathname + window.location.search;

  if (memoizedLocale === undefined || memoizedUrl !== currentUrl) {
    memoizedUrl = currentUrl;
    memoizedLocale = resolveBrowserLocale();
  }

  return memoizedLocale;
};
