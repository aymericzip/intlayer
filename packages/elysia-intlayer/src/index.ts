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
 * Holder for the context of the request being handled.
 *
 * The request scope is opened around the whole request (see `wrap` below),
 * before Elysia builds the route context: the context is filled in later by
 * `derive`, once the locale is known.
 */
type IntlayerContextRef = { current?: IntlayerContext };

/**
 * Per-request storage backing the standalone `t`, `getIntlayer` and `getDictionary` exports.
 */
const intlayerStorage = new AsyncLocalStorage<IntlayerContextRef>();

/**
 * Returns the context of the request currently being handled, if any.
 */
const getRequestContext = (): IntlayerContext | undefined =>
  intlayerStorage.getStore()?.current;

// Lets a bare `getIntlayer` / `getDictionary` from any Intlayer package resolve
// to the locale of the request being handled.
registerAmbientLocaleResolver(() => getRequestContext()?.locale);

// Zero-cost fallback, will be updated with console logger in dev mode
let debug: (message: string) => void = () => {};

/**
 * Translates `content` into `locale`, falling back to the default locale.
 */
const translate = <Content extends string>(
  content: StrictModeLocaleMap<Content> | string,
  locale: Locale
): Content =>
  typeof content === 'string'
    ? (content as Content)
    : getTranslation(content, locale, internationalization.defaultLocale);

/**
 * Elysia plugin that integrates Intlayer into your Elysia application.
 *
 * It handles:
 * 1. Locale detection from storage (cookies, headers) then from `Accept-Language`.
 * 2. Decorating the route context with an `intlayer` object exposing `t`, `getIntlayer` and `getDictionary`.
 * 3. Exposing the same helpers to the standalone `t`, `getIntlayer` and `getDictionary` exports
 *    for the whole request, through `AsyncLocalStorage`.
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
  if (process.env['NODE_ENV'] === 'development') {
    debug = (message: string) => console.debug(message);
  }

  prepareIntlayerServer(getConfiguration(), { label: 'elysia-intlayer' });

  const { locales, defaultLocale } = internationalization;

  return (
    new Elysia({ name: 'elysia-intlayer' })
      // Runs the whole request, hooks and streamed body included, in its own
      // scope, so the context never leaks to the caller of `app.handle`
      .wrap(
        (handle) =>
          (...parameters: unknown[]) =>
            intlayerStorage.run({}, () => handle(...parameters))
      )
      .derive({ as: 'global' }, ({ request, cookie }) => {
        const localeFromStorage = getLocaleFromStorageServer({
          getCookie: (name: string) =>
            (cookie?.[name]?.value as string | undefined) ??
            getCookie(name, request.headers.get('cookie') ?? ''),
          getHeader: (name: string) => request.headers.get(name) ?? undefined,
        });

        const localeDetected = localeDetector(
          {
            'accept-language':
              request.headers.get('accept-language') ?? undefined,
          },
          locales,
          defaultLocale
        );

        const locale = localeFromStorage ?? localeDetected;

        const context: IntlayerContext = {
          locale_storage: localeFromStorage,
          locale_detected: localeDetected,
          locale,
          defaultLocale,
          t: (content, localeArg) => translate(content, localeArg ?? locale),
          getIntlayer: (
            key,
            localeArg = locale as typeof localeArg,
            ...props
          ) => getIntlayerFunction(key, localeArg, ...props),
          getDictionary: (
            key,
            localeArg = locale as typeof localeArg,
            ...props
          ) => getDictionaryFunction(key, localeArg, ...props),
        };

        const contextRef = intlayerStorage.getStore();

        if (contextRef) {
          contextRef.current = context;
        } else {
          // Handler not wrapped (plugin registered after the handler was
          // compiled): scope the context to the rest of this request instead
          intlayerStorage.enterWith({ current: context });
        }

        return { intlayer: context };
      })
  );
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

  return translate(content, locale ?? internationalization.defaultLocale);
};

/**
 * Retrieves a dictionary by key, using the locale of the current request by default.
 */
export const getIntlayer: typeof getIntlayerFunction = (...args) => {
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
export const getDictionary: typeof getDictionaryFunction = (...args) => {
  const context = getRequestContext();

  if (context) {
    return context.getDictionary(...args);
  }

  debug(
    'Intlayer context not found. Add `.use(intlayer())` to your Elysia app, or use `context.intlayer.getDictionary` instead.'
  );

  return getDictionaryFunction(...args);
};
