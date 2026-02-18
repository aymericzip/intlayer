import { prepareIntlayer } from '@intlayer/chokidar/build';
import { getConfiguration } from '@intlayer/config';
import {
  getDictionary as getDictionaryFunction,
  getIntlayer as getIntlayerFunction,
  getLocaleFromStorage,
  getTranslation,
  localeDetector,
} from '@intlayer/core';
import type { Locale, StrictModeLocaleMap } from '@intlayer/types';
import { createNamespace } from 'cls-hooked';
import type { Context, MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';

const configuration = getConfiguration();
const { internationalization } = configuration;

/**
 * Retrieves the locale from storage (cookies, headers).
 */
const getStorageLocale = (context: Context): Locale | undefined =>
  getLocaleFromStorage({
    getCookie: (name: string) => getCookie(context, name),
    getHeader: (name: string) => context.req.header(name),
  });

const appNamespace = createNamespace('app');

prepareIntlayer(configuration);

export const translateFunction =
  (context: Context) =>
  <T extends string>(
    content: StrictModeLocaleMap<T> | string,
    locale?: Locale
  ): T => {
    const currentLocale = context.get('locale') as Locale;
    const defaultLocale = context.get('defaultLocale') as Locale;

    const targetLocale = locale ?? currentLocale;

    if (typeof content === 'undefined') {
      return '' as unknown as T;
    }

    if (typeof content === 'string') {
      return content as unknown as T;
    }

    if (
      typeof content?.[
        targetLocale as unknown as keyof StrictModeLocaleMap<T>
      ] === 'undefined'
    ) {
      if (
        typeof content?.[
          defaultLocale as unknown as keyof StrictModeLocaleMap<T>
        ] === 'undefined'
      ) {
        return content as unknown as T;
      } else {
        return getTranslation(content, defaultLocale);
      }
    }

    return getTranslation(content, targetLocale);
  };

/**
 * Hono middleware that detects the user's locale and populates context with Intlayer data.
 *
 * It performs:
 * 1. Locale detection from cookies, headers, or default settings.
 * 2. Injects `t`, `getIntlayer`, and `getDictionary` functions into the context.
 * 3. Sets up a `cls-hooked` namespace for accessing these functions anywhere in the request lifecycle.
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
  (): MiddlewareHandler => async (c: Context, next: () => Promise<void>) => {
    // Detect if locale is set by intlayer frontend lib in the headers
    const localeFromStorage = getStorageLocale(c);

    const negotiatorHeaders: Record<string, string> = c.req.header();

    const localeDetected = localeDetector(
      negotiatorHeaders,
      internationalization.locales,
      internationalization.defaultLocale
    );

    const locale = localeFromStorage ?? localeDetected;

    c.set('locale_storage', localeFromStorage);
    c.set('locale_detected', localeDetected);
    c.set('locale', locale);
    c.set('defaultLocale', internationalization.defaultLocale);

    const t = translateFunction(c);

    const getIntlayer: typeof getIntlayerFunction = (
      key: Parameters<typeof getIntlayerFunction>[0],
      localeArg = locale as Parameters<typeof getIntlayerFunction>[1],
      ...props: any[]
    ) => getIntlayerFunction(key, localeArg, ...props);

    const getDictionary: typeof getDictionaryFunction = (
      key: Parameters<typeof getDictionaryFunction>[0],
      localeArg = locale as Parameters<typeof getDictionaryFunction>[1],
      ...props: any[]
    ) => getDictionaryFunction(key, localeArg, ...props);

    c.set('t', t);
    c.set('getIntlayer', getIntlayer);
    c.set('getDictionary', getDictionary);

    return new Promise<void>((resolve) => {
      appNamespace.run(async () => {
        appNamespace.set('t', t);
        appNamespace.set('getIntlayer', getIntlayer);
        appNamespace.set('getDictionary', getDictionary);

        await next();
        resolve();
      });
    });
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
  try {
    if (typeof appNamespace === 'undefined') {
      throw new Error(
        'Intlayer is not initialized. Add the `app.use("*", intlayer());` middleware before using this function.'
      );
    }

    if (typeof appNamespace.get('t') !== 'function') {
      throw new Error(
        'Using the import { t } from "hono-intlayer" is not supported in your environment. Use the context instead.'
      );
    }

    return appNamespace.get('t')(content, locale);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error((error as Error).message);
    }

    return getTranslation(
      content,
      locale ?? internationalization.defaultLocale
    );
  }
};

export const getIntlayer: typeof getIntlayerFunction = (
  ...args: Parameters<typeof getIntlayerFunction>
) => {
  try {
    if (typeof appNamespace === 'undefined') {
      throw new Error(
        'Intlayer is not initialized. Add the `app.use("*", intlayer());` middleware before using this function.'
      );
    }

    if (typeof appNamespace.get('getIntlayer') !== 'function') {
      throw new Error(
        'Using the import { getIntlayer } from "hono-intlayer" is not supported in your environment. Use the context instead.'
      );
    }

    return appNamespace.get('getIntlayer')(...args);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error((error as Error).message);
    }
    return getIntlayerFunction(...args);
  }
};

export const getDictionary: typeof getDictionaryFunction = (
  ...args: Parameters<typeof getDictionaryFunction>
) => {
  try {
    if (typeof appNamespace === 'undefined') {
      throw new Error(
        'Intlayer is not initialized. Add the `app.use("*", intlayer());` middleware before using this function.'
      );
    }

    if (typeof appNamespace.get('getDictionary') !== 'function') {
      throw new Error(
        'Using the import { getDictionary } from "hono-intlayer" is not supported in your environment. Use the context instead.'
      );
    }

    return appNamespace.get('getDictionary')(...args);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error((error as Error).message);
    }
    return getDictionaryFunction(...args);
  }
};
