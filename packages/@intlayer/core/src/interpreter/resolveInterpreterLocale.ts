import { internationalization } from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getCachedLocaleFromStorageClient } from '../utils/localeStorage';

/**
 * Returns the locale of the context the code runs in (typically the request
 * being handled on the server), or `undefined` outside of such a context.
 */
export type AmbientLocaleResolver = () => LocalesValues | undefined;

/**
 * Asynchronous {@link AmbientLocaleResolver}, for sources that can only be read
 * by awaiting them (e.g. Next.js `headers()` / `cookies()`).
 */
export type AsyncAmbientLocaleResolver = () => Promise<
  LocalesValues | undefined
>;

/**
 * Held on `globalThis` so that every copy of this module (CJS and ESM builds,
 * duplicated installs) shares the resolvers an integration registered.
 */
const getGlobalSet = <T>(key: symbol): Set<T> => {
  const globalScope = globalThis as typeof globalThis & {
    [key: symbol]: Set<T> | undefined;
  };

  globalScope[key] ??= new Set<T>();

  return globalScope[key];
};

const getAmbientLocaleResolvers = (): Set<AmbientLocaleResolver> =>
  getGlobalSet(Symbol.for('intlayer.ambientLocaleResolvers'));

const getAsyncAmbientLocaleResolvers = (): Set<AsyncAmbientLocaleResolver> =>
  getGlobalSet(Symbol.for('intlayer.asyncAmbientLocaleResolvers'));

/**
 * Registers a resolver giving the locale of the current context, consulted by
 * `getIntlayer` / `getDictionary` when the call site passes no locale.
 *
 * Integrations owning a request scope (server middlewares keeping the request
 * in `AsyncLocalStorage`) register one so that a bare `getIntlayer('key')`
 * answers in the request locale.
 *
 * @param resolver - Returns the current locale, or `undefined` when unknown.
 * @returns A function unregistering the resolver.
 */
export const registerAmbientLocaleResolver = (
  resolver: AmbientLocaleResolver
): (() => void) => {
  const resolvers = getAmbientLocaleResolvers();

  resolvers.add(resolver);

  return () => {
    resolvers.delete(resolver);
  };
};

/**
 * Registers an {@link AsyncAmbientLocaleResolver}, consulted only by the
 * asynchronous reads (`getIntlayerAsync` / `getDictionaryAsync`), after the
 * synchronous resolvers.
 *
 * Unlike synchronous resolvers, its errors propagate: frameworks rely on them
 * for control flow (Next.js marks a route dynamic by throwing from
 * `headers()`). A resolver returns `undefined` for errors meaning "unknown".
 *
 * @param resolver - Resolves the current locale, or `undefined` when unknown.
 * @returns A function unregistering the resolver.
 */
export const registerAsyncAmbientLocaleResolver = (
  resolver: AsyncAmbientLocaleResolver
): (() => void) => {
  const resolvers = getAsyncAmbientLocaleResolvers();

  resolvers.add(resolver);

  return () => {
    resolvers.delete(resolver);
  };
};

/**
 * Returns the first locale a registered resolver knows, if any.
 */
const getAmbientLocale = (): LocalesValues | undefined => {
  for (const resolver of getAmbientLocaleResolvers()) {
    try {
      const locale = resolver();
      if (locale) return locale;
    } catch {}
  }
};

/**
 * Resolves the locale a dictionary is read in when the call site gives none:
 *
 * 1. the locale of the current context, from the registered resolvers
 *    (e.g. the request being handled by a server middleware);
 * 2. in the browser, the locale persisted in storage (cookie, localStorage,
 *    sessionStorage), cached until the next `setLocaleInStorageClient`;
 * 3. the default locale.
 *
 * Browser storage is never read off-browser: the server shares module state
 * across requests, and the request cookie is only known to its integration.
 *
 * @param locale - Locale passed by the call site, if any.
 * @returns The resolved locale.
 */
export const resolveInterpreterLocale = (
  locale?: LocalesValues
): LocalesValues =>
  locale ??
  getAmbientLocale() ??
  (typeof window === 'undefined'
    ? undefined
    : getCachedLocaleFromStorageClient()) ??
  internationalization.defaultLocale;

/**
 * Asynchronous twin of {@link resolveInterpreterLocale}: the asynchronous
 * resolvers are awaited after the synchronous ones, before browser storage.
 *
 * @param locale - Locale passed by the call site, if any.
 * @returns The resolved locale.
 */
export const resolveInterpreterLocaleAsync = async (
  locale?: LocalesValues
): Promise<LocalesValues> => {
  const knownLocale = locale ?? getAmbientLocale();
  if (knownLocale) return knownLocale;

  for (const resolver of getAsyncAmbientLocaleResolvers()) {
    const resolvedLocale = await resolver();
    if (resolvedLocale) return resolvedLocale;
  }

  return resolveInterpreterLocale();
};
