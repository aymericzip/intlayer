import { prepareIntlayer } from '@intlayer/chokidar/build';
import {
  getDictionary as getDictionaryFunction,
  getIntlayer as getIntlayerFunction,
  getTranslation,
} from '@intlayer/core/interpreter';
import type { Locale } from '@intlayer/types/allLocales';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import {
  appNamespace,
  configuration,
  getStorageLocale,
  internationalization,
  translateFunction,
} from './core';

// Zero-cost fallback, will be updated with AdonisJS logger or console in dev mode
let debug: (message: string) => void = () => {};

prepareIntlayer(configuration);

if (process.env['NODE_ENV'] === 'development') {
  try {
    const logger = require('@adonisjs/core/services/logger').default;
    debug = (msg: string) => logger.debug(msg);
  } catch {
    debug = (msg: string) => console.debug(msg);
  }
}

export { appNamespace, getStorageLocale, translateFunction };

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
    debug((error as Error).message);

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
    debug((error as Error).message);

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
    debug((error as Error).message);

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
