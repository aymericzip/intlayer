import { AsyncLocalStorage } from 'node:async_hooks';
import { getConfiguration } from '@intlayer/config/node';
import {
  getDictionary as getDictionaryFunction,
  getIntlayer as getIntlayerFunction,
  getTranslation,
} from '@intlayer/core/interpreter';
import { localeDetector } from '@intlayer/core/localization';
import { getLocaleFromStorageServer } from '@intlayer/core/utils';
import { prepareIntlayer } from '@intlayer/engine/build';
import type { Locale } from '@intlayer/types/allLocales';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import { Elysia } from 'elysia';

/**
 * Translates a locale map into the content matching the current request locale.
 */
export type TranslateFunction = <Content extends string>(
  content: StrictModeLocaleMap<Content> | string,
  locale?: Locale
) => Content;

/**
 * Intlayer state injected into every Elysia route context by the `intlayer` plugin.
 */
export type IntlayerContext = {
  /** Locale explicitly requested by the client through a cookie or a header. */
  locale_storage?: Locale;
  /** Locale negotiated from the request headers (`Accept-Language`). */
  locale_detected: Locale;
  /** Locale to use for this request, `locale_storage` taking precedence. */
  locale: Locale;
  /** Locale configured as fallback in `intlayer.config.ts`. */
  defaultLocale: Locale;
  /** Translates an inline locale map. */
  t: TranslateFunction;
  /** Reads a dictionary by key, defaulting to the request locale. */
  getIntlayer: typeof getIntlayerFunction;
  /** Reads an imported dictionary, defaulting to the request locale. */
  getDictionary: typeof getDictionaryFunction;
};

/**
 * Mutable holder for the context of the request being handled.
 *
 * The context is held behind a reference because `AsyncLocalStorage.enterWith(undefined)`
 * is a no-op in Bun: clearing the reference is the only reliable way to release it.
 */
type IntlayerContextRef = { current?: IntlayerContext };

/**
 * Per-request storage backing the standalone `t`, `getIntlayer` and `getDictionary` exports.
 *
 * `cls-hooked` (used by the Node-based Intlayer plugins) relies on `async_hooks.createHook`,
 * which Bun does not implement. `AsyncLocalStorage` is supported by both runtimes.
 */
const intlayerStorage = new AsyncLocalStorage<IntlayerContextRef>();

/**
 * Returns the context of the request currently being handled, if any.
 */
const getRequestContext = (): IntlayerContext | undefined =>
  intlayerStorage.getStore()?.current;

// Zero-cost fallback, will be updated with console logger in dev mode
let debug: (message: string) => void = () => {};

/**
 * Builds the translation function bound to a resolved request locale.
 */
const createTranslateFunction =
  (locale: Locale, defaultLocale: Locale): TranslateFunction =>
  <Content extends string>(
    content: StrictModeLocaleMap<Content> | string,
    localeArg?: Locale
  ): Content => {
    const targetLocale = localeArg ?? locale;

    if (typeof content === 'undefined') {
      return '' as unknown as Content;
    }

    if (typeof content === 'string') {
      return content as unknown as Content;
    }

    if (
      typeof content?.[
        targetLocale as unknown as keyof StrictModeLocaleMap<Content>
      ] === 'undefined'
    ) {
      if (
        typeof content?.[
          defaultLocale as unknown as keyof StrictModeLocaleMap<Content>
        ] === 'undefined'
      ) {
        return content as unknown as Content;
      }

      return getTranslation(content, defaultLocale);
    }

    return getTranslation(content, targetLocale);
  };

/**
 * Releases the request context once the response is mapped, so the standalone helpers
 * never resolve against an already terminated request.
 *
 * Returns `undefined` so Elysia keeps running the remaining `mapResponse` handlers.
 */
const releaseContext = (): undefined => {
  const contextRef = intlayerStorage.getStore();

  if (contextRef) {
    contextRef.current = undefined;
  }

  return undefined;
};

/**
 * Elysia plugin that integrates Intlayer into your Elysia application.
 *
 * It handles:
 * 1. Locale detection from storage (cookies, headers) then from `Accept-Language`.
 * 2. Decorating the route context with an `intlayer` object exposing `t`, `getIntlayer` and `getDictionary`.
 * 3. Exposing the same helpers to the standalone `t`, `getIntlayer` and `getDictionary` exports
 *    for the duration of the request, through `AsyncLocalStorage`.
 *
 * @example
 * ```ts
 * import { Elysia } from 'elysia';
 * import { intlayer } from 'elysia-intlayer';
 *
 * const app = new Elysia()
 *   .use(intlayer())
 *   .get('/', ({ intlayer }) =>
 *     intlayer.t({
 *       en: 'Hello',
 *       fr: 'Bonjour',
 *     })
 *   );
 * ```
 */
export const intlayer = () => {
  const configuration = getConfiguration();
  const { internationalization } = configuration;

  if (process.env['NODE_ENV'] === 'development') {
    debug = (message: string) => console.debug(message);
  }

  prepareIntlayer(configuration);

  return new Elysia({ name: 'elysia-intlayer' })
    .derive({ as: 'global' }, ({ request, cookie }) => {
      /**
       * Retrieves the locale from storage (cookies, headers).
       */
      const localeFromStorage = getLocaleFromStorageServer({
        getCookie: (name: string) =>
          cookie?.[name]?.value as string | undefined,
        getHeader: (name: string) => request.headers.get(name) ?? undefined,
      });

      const negotiatorHeaders: Record<string, string> = {};
      request.headers.forEach((value, key) => {
        negotiatorHeaders[key] = value;
      });

      const localeDetected = localeDetector(
        negotiatorHeaders,
        internationalization.locales,
        internationalization.defaultLocale
      );

      const locale = localeFromStorage ?? localeDetected;
      const defaultLocale = internationalization.defaultLocale;

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

      const context: IntlayerContext = {
        locale_storage: localeFromStorage,
        locale_detected: localeDetected,
        locale,
        defaultLocale,
        t: createTranslateFunction(locale, defaultLocale),
        getIntlayer,
        getDictionary,
      };

      // Elysia awaits every lifecycle hook of a request on the same async chain,
      // so entering the store here keeps it available to the route handler.
      intlayerStorage.enterWith({ current: context });

      return { intlayer: context };
    })
    .mapResponse({ as: 'global' }, releaseContext)
    .onError({ as: 'global' }, releaseContext);
};

/**
 * Translation function that retrieves content for the locale of the current request.
 *
 * Falls back to the configured default locale when called outside of a request
 * handled by the `intlayer` plugin.
 *
 * @example
 * ```ts
 * import { t } from 'elysia-intlayer';
 *
 * app.get('/', () => t({ en: 'Hello', fr: 'Bonjour' }));
 * ```
 */
export const t = <Content extends string>(
  content: StrictModeLocaleMap<Content> | string,
  locale?: Locale
): Content => {
  const context = getRequestContext();

  if (context) {
    return context.t(content, locale);
  }

  debug(
    'Intlayer context not found. Add `.use(intlayer())` to your Elysia app, or use `context.intlayer.t` instead.'
  );

  const { internationalization } = getConfiguration();

  return getTranslation(
    content as StrictModeLocaleMap<Content>,
    locale ?? internationalization.defaultLocale
  );
};

/**
 * Retrieves a dictionary by key, using the locale of the current request by default.
 */
export const getIntlayer: typeof getIntlayerFunction = (
  ...args: Parameters<typeof getIntlayerFunction>
) => {
  const context = getRequestContext();

  if (context) {
    return context.getIntlayer(...args);
  }

  debug(
    'Intlayer context not found. Add `.use(intlayer())` to your Elysia app, or use `context.intlayer.getIntlayer` instead.'
  );

  return getIntlayerFunction(...args);
};

/**
 * Retrieves an imported dictionary, using the locale of the current request by default.
 */
export const getDictionary: typeof getDictionaryFunction = (
  ...args: Parameters<typeof getDictionaryFunction>
) => {
  const context = getRequestContext();

  if (context) {
    return context.getDictionary(...args);
  }

  debug(
    'Intlayer context not found. Add `.use(intlayer())` to your Elysia app, or use `context.intlayer.getDictionary` instead.'
  );

  return getDictionaryFunction(...args);
};
