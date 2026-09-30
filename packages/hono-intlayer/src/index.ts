import { AsyncLocalStorage } from 'node:async_hooks';
import { internationalization } from '@intlayer/config/built';
import { getConfiguration } from '@intlayer/config/node';
import {
  getDictionary as getDictionaryFunction,
  getIntlayer as getIntlayerFunction,
  getTranslation,
  registerAmbientLocaleResolver,
} from '@intlayer/core/interpreter';
import { localeDetector } from '@intlayer/core/localization';
import { getLocaleFromStorageServer } from '@intlayer/core/utils';
import { prepareIntlayerServer } from '@intlayer/engine/build';
import type { Locale } from '@intlayer/types/allLocales';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import type { Context, MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';

// Zero-cost fallback, will be updated with console logger in dev mode
let debug: (message: string) => void = () => {};

if (process.env['NODE_ENV'] === 'development') {
  debug = (msg: string) => console.debug(msg);
}

/**
 * Retrieves the locale from storage (cookies, headers).
 */
const getStorageLocale = (context: Context): Locale | undefined =>
  getLocaleFromStorageServer({
    getCookie: (name: string) => getCookie(context, name),
    getHeader: (name: string) => context.req.header(name),
  });

/**
 * Intlayer helpers bound to the request being handled.
 */
type IntlayerRequestContext = {
  locale: Locale;
  t: ReturnType<typeof translateFunction>;
  getIntlayer: typeof getIntlayerFunction;
  getDictionary: typeof getDictionaryFunction;
};

/**
 * Request-scoped Intlayer context.
 *
 * `AsyncLocalStorage` rather than `cls-hooked`: the latter relies on
 * `async_hooks.createHook`, which Bun does not implement, and is several times
 * slower on Node.
 */
const intlayerStorage = new AsyncLocalStorage<IntlayerRequestContext>();

// Lets a bare `getIntlayer` / `getDictionary` from any Intlayer package resolve
// to the locale of the request being handled.
registerAmbientLocaleResolver(() => intlayerStorage.getStore()?.locale);

prepareIntlayerServer(getConfiguration(), { label: 'hono-intlayer' });

/**
 * Builds the translation function bound to the locale stored in the Hono context.
 */
export const translateFunction =
  (context: Context) =>
  <T extends string>(
    content: StrictModeLocaleMap<T> | string,
    locale?: Locale
  ): T =>
    typeof content === 'string'
      ? (content as T)
      : getTranslation(
          content,
          locale ?? (context.get('locale') as Locale),
          internationalization.defaultLocale
        );

/**
 * Hono middleware that detects the user's locale and populates context with Intlayer data.
 *
 * It performs:
 * 1. Locale detection from cookies, headers, or default settings.
 * 2. Injects `t`, `getIntlayer`, and `getDictionary` functions into the context.
 * 3. Sets up an `AsyncLocalStorage` context for accessing these functions anywhere in the request lifecycle.
 *
 * @returns A Hono middleware function.
 *
 * @example
 * ```ts
 * import { Hono } from 'hono';
 * import { intlayer } from 'hono-intlayer';
 *
 * const app = new Hono();
 * app.use('*', intlayer());
 * ```
 */
export const intlayer =
  (): MiddlewareHandler => (context: Context, next: () => Promise<void>) => {
    // Detect if locale is set by intlayer frontend lib in the headers
    const localeFromStorage = getStorageLocale(context);

    const localeDetected = localeDetector(
      { 'accept-language': context.req.header('accept-language') },
      internationalization.locales,
      internationalization.defaultLocale
    );

    const locale = localeFromStorage ?? localeDetected;

    context.set('locale_storage', localeFromStorage);
    context.set('locale_detected', localeDetected);
    context.set('locale', locale);
    context.set('defaultLocale', internationalization.defaultLocale);

    const t = translateFunction(context);

    const getIntlayer: typeof getIntlayerFunction = (
      key,
      localeArg = locale as typeof localeArg,
      ...props
    ) => getIntlayerFunction(key, localeArg, ...props);

    const getDictionary: typeof getDictionaryFunction = (
      key,
      localeArg = locale as typeof localeArg,
      ...props
    ) => getDictionaryFunction(key, localeArg, ...props);

    context.set('t', t);
    context.set('getIntlayer', getIntlayer);
    context.set('getDictionary', getDictionary);

    return intlayerStorage.run({ locale, t, getIntlayer, getDictionary }, next);
  };

/**
 * Translation function to retrieve content for the current locale.
 *
 * This function works within the request lifecycle managed by the `intlayer` middleware.
 *
 * @param content - A map of locales to content.
 * @param locale - Optional locale override.
 * @returns The translated content.
 *
 * @example
 * ```ts
 * import { t } from 'hono-intlayer';
 *
 * app.get('/', (c) => {
 *   const greeting = t({
 *     en: 'Hello',
 *     fr: 'Bonjour',
 *   });
 *   return c.text(greeting);
 * });
 * ```
 */
export const t = <Content = string>(
  content: StrictModeLocaleMap<Content>,
  locale?: Locale
): Content => {
  const context = intlayerStorage.getStore();

  if (!context) {
    debug(
      'Using the import { t } from "hono-intlayer" outside of a request handled by the `intlayer()` middleware. Use the context instead.'
    );

    return getTranslation(
      content,
      locale ?? internationalization.defaultLocale
    );
  }

  return context.t(content as StrictModeLocaleMap<string>, locale) as Content;
};

export const getIntlayer: typeof getIntlayerFunction = (
  ...args: Parameters<typeof getIntlayerFunction>
) => {
  const context = intlayerStorage.getStore();

  if (!context) {
    debug(
      'Using the import { getIntlayer } from "hono-intlayer" outside of a request handled by the `intlayer()` middleware. Use the context instead.'
    );

    return getIntlayerFunction(...args);
  }

  return context.getIntlayer(...args);
};

export const getDictionary: typeof getDictionaryFunction = (
  ...args: Parameters<typeof getDictionaryFunction>
) => {
  const context = intlayerStorage.getStore();

  if (!context) {
    debug(
      'Using the import { getDictionary } from "hono-intlayer" outside of a request handled by the `intlayer()` middleware. Use the context instead.'
    );

    return getDictionaryFunction(...args);
  }

  return context.getDictionary(...args);
};
