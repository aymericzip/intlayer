import { AsyncLocalStorage } from 'node:async_hooks';
import type { HttpContext } from '@adonisjs/core/http';
import { internationalization } from '@intlayer/config/built';
import { getConfiguration } from '@intlayer/config/node';
import {
  getDictionary as getDictionaryFunction,
  getIntlayer as getIntlayerFunction,
  getTranslation,
  registerAmbientLocaleResolver,
} from '@intlayer/core/interpreter';
import { getLocaleFromStorageServer } from '@intlayer/core/utils';
import { prepareIntlayerServer } from '@intlayer/engine/build';
import type { Locale } from '@intlayer/types/allLocales';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';

// Zero-cost fallback, will be updated with AdonisJS logger or console in dev mode
let debug: (message: string) => void = () => {};

if (process.env['NODE_ENV'] === 'development') {
  try {
    const logger = require('@adonisjs/core/services/logger').default;
    debug = (msg: string) => logger.debug(msg);
  } catch {
    debug = (msg: string) => console.debug(msg);
  }
}

/**
 * Intlayer helpers bound to the request being handled.
 */
export type IntlayerRequestContext = {
  locale: Locale;
  t: ReturnType<typeof translateFunction>;
  getIntlayer: typeof getIntlayerFunction;
  getDictionary: typeof getDictionaryFunction;
};

/**
 * Request-scoped Intlayer context, entered by `IntlayerMiddleware`.
 *
 * `AsyncLocalStorage` rather than `cls-hooked`: the latter relies on
 * `async_hooks.createHook`, which Bun does not implement, and is several times
 * slower on Node.
 */
export const intlayerStorage = new AsyncLocalStorage<IntlayerRequestContext>();

// Lets a bare `getIntlayer` / `getDictionary` from any Intlayer package resolve
// to the locale of the request being handled.
registerAmbientLocaleResolver(() => intlayerStorage.getStore()?.locale);

prepareIntlayerServer(getConfiguration(), { label: 'adonis-intlayer' });

/**
 * Retrieves the locale from storage (cookies, headers).
 *
 * `request.cookie` only reads signed cookies: the locale cookie set by the
 * Intlayer client libraries is a plain one.
 */
export const getStorageLocale = (ctx: HttpContext): Locale | undefined =>
  getLocaleFromStorageServer({
    getCookie: (name: string) =>
      ctx.request.cookie(name) ??
      ctx.request.plainCookie(name, { encoded: false }),
    getHeader: (name: string) => ctx.request.header(name),
  });

/**
 * Builds the translation function bound to the locale stored on the HTTP context.
 */
export const translateFunction =
  (ctx: HttpContext) =>
  <T extends string>(
    content: StrictModeLocaleMap<T> | string,
    locale?: Locale
  ): T =>
    typeof content === 'string'
      ? (content as T)
      : getTranslation(
          content,
          locale ?? (ctx as HttpContext & { locale: Locale }).locale,
          internationalization.defaultLocale
        );

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
 * import { t } from 'adonis-intlayer';
 *
 * router.get('/', async () => {
 *   const greeting = t({
 *     en: 'Hello',
 *     fr: 'Bonjour',
 *   });
 *   return greeting;
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
      'Using the import { t } from "adonis-intlayer" outside of a request handled by the `intlayer` middleware. Ensure you are within a request context.'
    );

    return getTranslation(
      content,
      locale ?? internationalization.defaultLocale
    );
  }

  return context.t(content as StrictModeLocaleMap<string>, locale) as Content;
};

export const getIntlayer: typeof getIntlayerFunction = (...args) => {
  const context = intlayerStorage.getStore();

  if (!context) {
    debug(
      'Using the import { getIntlayer } from "adonis-intlayer" outside of a request handled by the `intlayer` middleware. Ensure you are within a request context.'
    );

    return getIntlayerFunction(...args);
  }

  return context.getIntlayer(...args);
};

export const getDictionary: typeof getDictionaryFunction = (...args) => {
  const context = intlayerStorage.getStore();

  if (!context) {
    debug(
      'Using the import { getDictionary } from "adonis-intlayer" outside of a request handled by the `intlayer` middleware. Ensure you are within a request context.'
    );

    return getDictionaryFunction(...args);
  }

  return context.getDictionary(...args);
};

/**
 * Returns the locale of the request being handled, else `locale`, else the default locale.
 */
export const getLocale = (locale?: Locale): Locale =>
  intlayerStorage.getStore()?.locale ??
  locale ??
  internationalization.defaultLocale;

export { default as IntlayerMiddleware } from './middleware';
