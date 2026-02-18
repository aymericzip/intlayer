import type { HttpContext } from '@adonisjs/core/http';
import { prepareIntlayer } from '@intlayer/chokidar/build';
import { getConfiguration } from '@intlayer/config/node';
import type { getIntlayer as getIntlayerFunction } from '@intlayer/core/interpreter';
import {
  getDictionary as getDictionaryFunction,
  getTranslation,
} from '@intlayer/core/interpreter';
import type { Locale, StrictModeLocaleMap } from '@intlayer/types';
import { createNamespace } from 'cls-hooked';

const configuration = getConfiguration();
const { internationalization } = configuration;

export const appNamespace = createNamespace('app');

prepareIntlayer(configuration);

/**
 * Retrieves the locale from storage (cookies, headers).
 */
export const getStorageLocale = (ctx: HttpContext): Locale | undefined =>
  getLocaleFromStorage({
    getCookie: (name: string) => ctx.request.cookie(name),
    getHeader: (name: string) => ctx.request.header(name),
  });

/**
 * Translation function for context
 */
export const translateFunction =
  (ctx: HttpContext) =>
  <T extends string>(
    content: StrictModeLocaleMap<T> | string,
    locale?: Locale
  ): T => {
    const { locale: currentLocale, defaultLocale } = ctx as unknown as {
      locale: Locale;
      defaultLocale: Locale;
    };

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
  try {
    if (typeof appNamespace === 'undefined') {
      throw new Error(
        'Intlayer is not initialized. Add the `intlayer` middleware to your kernel before using this function.'
      );
    }

    if (typeof appNamespace.get('t') !== 'function') {
      throw new Error(
        'Using the import { t } from "adonis-intlayer" is not supported in your environment. Ensure you are within a request context.'
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

export const getIntlayer: typeof getIntlayerFunction = ((
  key: any,
  localeArg?: any,
  ...props: any[]
) => {
  try {
    if (typeof appNamespace === 'undefined') {
      throw new Error(
        'Intlayer is not initialized. Add the `intlayer` middleware to your kernel before using this function.'
      );
    }

    const getIntlayerWrapped = appNamespace.get('getIntlayer');

    if (typeof getIntlayerWrapped !== 'function') {
      throw new Error(
        'Using the import { getIntlayer } from "adonis-intlayer" is not supported in your environment. Ensure you are within a request context.'
      );
    }

    return getIntlayerWrapped(key, localeArg, ...props);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error((error as Error).message);
    }
    return getIntlayerFunction(key, localeArg, ...props);
  }
}) as typeof getIntlayerFunction;

export const getDictionary: typeof getDictionaryFunction = ((
  key: any,
  localeArg?: any,
  ...props: any[]
) => {
  try {
    if (typeof appNamespace === 'undefined') {
      throw new Error(
        'Intlayer is not initialized. Add the `intlayer` middleware to your kernel before using this function.'
      );
    }

    const getDictionaryWrapped = appNamespace.get('getDictionary');

    if (typeof getDictionaryWrapped !== 'function') {
      throw new Error(
        'Using the import { getDictionary } from "adonis-intlayer" is not supported in your environment. Ensure you are within a request context.'
      );
    }

    return getDictionaryWrapped(key, localeArg, ...props);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error((error as Error).message);
    }
    return getDictionaryFunction(key, localeArg, ...props);
  }
}) as typeof getDictionaryFunction;

export const getLocale = (locale?: Locale): Locale => {
  try {
    if (typeof appNamespace === 'undefined') {
      throw new Error(
        'Intlayer is not initialized. Add the `intlayer` middleware to your kernel before using this function.'
      );
    }

    return (
      appNamespace.get('locale') ?? locale ?? internationalization.defaultLocale
    );
  } catch (_error) {
    return locale ?? internationalization.defaultLocale;
  }
};

export { default as IntlayerMiddleware } from './middleware';
