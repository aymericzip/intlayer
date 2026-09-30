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
import { getCookie, getLocaleFromStorageServer } from '@intlayer/core/utils';
import { prepareIntlayerServer } from '@intlayer/engine/build';
import type { Locale } from '@intlayer/types/allLocales';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import type { NextFunction, Request, RequestHandler, Response } from 'express';

// Zero-cost fallback, will be updated with console logger in dev mode
let debug: (message: string) => void = () => {};

if (process.env['NODE_ENV'] === 'development') {
  debug = (msg: string) => console.debug(msg);
}

/**
 * Reads a single-valued request header.
 */
const getHeader = (req: Request, name: string): string | undefined => {
  const value = req.headers[name];

  return Array.isArray(value) ? value.join(',') : value;
};

/**
 * Retrieves the locale from storage (cookies, headers).
 *
 * Parsed cookies need `cookie-parser`: the raw header is read otherwise.
 */
const getStorageLocale = (req: Request): Locale | undefined => {
  const parsedCookies = req.cookies as Record<string, string> | undefined;

  return getLocaleFromStorageServer({
    getCookie: (name: string) =>
      parsedCookies
        ? parsedCookies[name]
        : getCookie(name, req.headers.cookie ?? ''),
    getHeader: (name: string) => getHeader(req, name),
  });
};

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

prepareIntlayerServer(getConfiguration(), { label: 'express-intlayer' });

/**
 * Builds the translation function bound to the locale stored in `res.locals`.
 */
export const translateFunction =
  (_req: Request, res: Response, _next?: NextFunction) =>
  <T extends string>(
    content: StrictModeLocaleMap<T> | string,
    locale?: Locale
  ): T =>
    typeof content === 'string'
      ? (content as T)
      : getTranslation(
          content,
          locale ?? (res.locals.locale as Locale),
          internationalization.defaultLocale
        );

/**
 * Express middleware that detects the user's locale and populates `res.locals` with Intlayer data.
 *
 * It performs:
 * 1. Locale detection from cookies, headers, or default settings.
 * 2. Injects `t`, `getIntlayer`, and `getDictionary` functions into `res.locals`.
 * 3. Sets up an `AsyncLocalStorage` context for accessing these functions anywhere in the request lifecycle.
 *
 * @returns An Express middleware function.
 *
 * @example
 * ```ts
 * import express from 'express';
 * import { intlayer } from 'express-intlayer';
 *
 * const app = express();
 * app.use(intlayer());
 * ```
 */
export const intlayer = (): RequestHandler => (req, res, next) => {
  // Detect if locale is set by intlayer frontend lib in the headers
  const localeFromStorage = getStorageLocale(req);

  // Interpret browser locale
  const localeDetected = localeDetector(
    { 'accept-language': getHeader(req, 'accept-language') },
    internationalization.locales,
    internationalization.defaultLocale
  );

  res.locals.locale_storage = localeFromStorage;
  res.locals.locale_detected = localeDetected;
  const locale = localeFromStorage ?? localeDetected;

  res.locals.locale = locale;
  res.locals.defaultLocale = internationalization.defaultLocale;

  const t = translateFunction(req, res, next);

  const getIntlayer: typeof getIntlayerFunction = (key, localeArg, ...props) =>
    getIntlayerFunction(
      key,
      (localeArg ?? locale) as typeof localeArg,
      ...props
    );

  const getDictionary: typeof getDictionaryFunction = (
    key,
    localeArg,
    ...props
  ) =>
    getDictionaryFunction(
      key,
      (localeArg ?? locale) as typeof localeArg,
      ...props
    );

  res.locals.t = t;
  res.locals.getIntlayer = getIntlayer;
  res.locals.getDictionary = getDictionary;

  intlayerStorage.run({ locale, t, getIntlayer, getDictionary }, next);
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
 * import { t } from 'express-intlayer';
 *
 * app.get('/', (req, res) => {
 *   const greeting = t({
 *     en: 'Hello',
 *     fr: 'Bonjour',
 *   });
 *   res.send(greeting);
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
      'Using the import { t } from "express-intlayer" outside of a request handled by the `intlayer()` middleware. Use the res.locals.t syntax instead.'
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
      'Using the import { getIntlayer } from "express-intlayer" outside of a request handled by the `intlayer()` middleware. Use the res.locals.getIntlayer syntax instead.'
    );

    return getIntlayerFunction(...args);
  }

  return context.getIntlayer(...args);
};

export const getDictionary: typeof getDictionaryFunction = (...args) => {
  const context = intlayerStorage.getStore();

  if (!context) {
    debug(
      'Using the import { getDictionary } from "express-intlayer" outside of a request handled by the `intlayer()` middleware. Use the res.locals.getDictionary syntax instead.'
    );

    return getDictionaryFunction(...args);
  }

  return context.getDictionary(...args);
};
