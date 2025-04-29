import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { createServerContext, getServerContext } from './serverContext';

const { defaultLocale } = configuration?.internationalization ?? {};

/**
 * Context that stores the current locale on the server side
 */
export const IntlayerServerContext =
  createServerContext<LocalesValues>(defaultLocale);

/**
 * Helper function that provides the current locale to the server context
 *
 * @example
 * // In a server-side entry point
 * provideIntlayerLocale('en-US');
 */
export const provideIntlayerLocale = (
  locale: LocalesValues = defaultLocale
) => {
  IntlayerServerContext.provide(locale);
};

/**
 * Get the current locale from the server context
 *
 * @example
 * const currentLocale = getIntlayerLocale();
 */
export const getIntlayerLocale = (): LocalesValues | undefined => {
  return getServerContext(IntlayerServerContext);
};

/**
 * Helper that allows consuming the current locale with a callback
 *
 * @example
 * withIntlayerLocale((locale) => {
 *   // Use locale here
 *   return someFunction(locale);
 * });
 */
export const withIntlayerLocale = <T>(
  callback: (locale: LocalesValues | undefined) => T
): T => {
  return IntlayerServerContext.consume(callback);
};
