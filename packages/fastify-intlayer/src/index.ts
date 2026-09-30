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
import type { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

/**
 * Intlayer state of the request being handled.
 */
export type IntlayerRequestContext = {
  /** Locale to use for this request, `locale_storage` taking precedence. */
  locale: Locale;
  /** Locale configured as fallback in `intlayer.config.ts`. */
  defaultLocale: Locale;
  /** Locale explicitly requested by the client through a cookie or a header. */
  locale_storage?: Locale;
  /** Locale negotiated from the `Accept-Language` header. */
  locale_detected?: Locale;
  /** Translates an inline locale map. */
  t: <T extends string>(
    content: StrictModeLocaleMap<T> | string,
    locale?: Locale
  ) => T;
  /** Reads a dictionary by key, defaulting to the request locale. */
  getIntlayer: typeof getIntlayerFunction;
  /** Reads an imported dictionary, defaulting to the request locale. */
  getDictionary: typeof getDictionaryFunction;
};

// Module augmentation to type the request decoration
declare module 'fastify' {
  interface FastifyRequest {
    intlayer: IntlayerRequestContext;
  }
}

/**
 * Request-scoped Intlayer context, holding the `req.intlayer` object itself.
 */
const intlayerStorage = new AsyncLocalStorage<IntlayerRequestContext>();

// Lets a bare `getIntlayer` / `getDictionary` from any Intlayer package resolve
// to the locale of the request being handled.
registerAmbientLocaleResolver(() => intlayerStorage.getStore()?.locale);

// Zero-cost fallback, will be updated with fastify logger in dev mode
let debug: (message: string) => void = () => {};

/**
 * Translates `content` into `locale`, falling back to the default locale.
 */
const translate = <T extends string>(
  content: StrictModeLocaleMap<T> | string,
  locale: Locale
): T =>
  typeof content === 'string'
    ? (content as T)
    : getTranslation(content, locale, internationalization.defaultLocale);

/**
 * Reads a single-valued request header.
 */
const getHeader = (
  request: FastifyRequest,
  name: string
): string | undefined => {
  const value = request.headers[name];

  return Array.isArray(value) ? value.join(',') : value;
};

/**
 * Builds the Intlayer state of a request.
 */
const createRequestContext = (
  request: FastifyRequest
): IntlayerRequestContext => {
  const { locales, defaultLocale } = internationalization;

  // Parsed cookies need `@fastify/cookie`: read the raw header otherwise
  const parsedCookies = (
    request as FastifyRequest & { cookies?: Record<string, string | undefined> }
  ).cookies;

  const localeFromStorage = getLocaleFromStorageServer({
    getCookie: (name: string) =>
      parsedCookies
        ? parsedCookies[name]
        : getCookie(name, request.headers.cookie ?? ''),
    getHeader: (name: string) => getHeader(request, name),
  });

  const localeDetected = localeDetector(
    { 'accept-language': getHeader(request, 'accept-language') },
    locales,
    defaultLocale
  );

  const locale = localeFromStorage ?? localeDetected;

  return {
    locale_storage: localeFromStorage,
    locale_detected: localeDetected,
    locale,
    defaultLocale,
    t: (content, localeArg) => translate(content, localeArg ?? locale),
    getIntlayer: (key, localeArg, ...props) =>
      getIntlayerFunction(
        key,
        (localeArg ?? locale) as typeof localeArg,
        ...props
      ),
    getDictionary: (key, localeArg, ...props) =>
      getDictionaryFunction(
        key,
        (localeArg ?? locale) as typeof localeArg,
        ...props
      ),
  };
};

/**
 * Fastify Plugin that integrates Intlayer into your Fastify application.
 *
 * It handles:
 * 1. Locale detection from storage (cookies, headers) then from `Accept-Language`.
 * 2. Decorating the request object with `intlayer` data containing `t`, `getIntlayer`, and `getDictionary`.
 * 3. Setting up an `AsyncLocalStorage` context for programmatic access during the request lifecycle.
 *
 * The context is set in `onRequest`, so it also covers the app hooks, schema
 * validation errors and error handlers.
 *
 * @example
 * ```ts
 * import Fastify from 'fastify';
 * import { intlayer } from 'fastify-intlayer';
 *
 * const fastify = Fastify();
 * fastify.register(intlayer);
 * ```
 */
const fastifyIntlayer: FastifyPluginAsync = async (fastify) => {
  // In dev mode, use fastify logger to debug messages
  if (process.env['NODE_ENV'] === 'development') {
    debug = (message: string) => fastify.log.debug(message);
  }

  prepareIntlayerServer(getConfiguration({ logFunctions: fastify.log }), {
    label: 'fastify-intlayer',
  });

  // Declared upfront so every request object keeps the same shape
  if (!fastify.hasRequestDecorator('intlayer')) {
    fastify.decorateRequest(
      'intlayer',
      null as unknown as IntlayerRequestContext
    );
  }

  fastify.addHook('onRequest', (request, _reply, done) => {
    const context = createRequestContext(request);

    request.intlayer = context;

    // Run the rest of the request lifecycle inside the Intlayer context
    intlayerStorage.run(context, done);
  });
};

// Export as a Fastify Plugin (wrapped in fp to skip encapsulation)
export const intlayer = fp(fastifyIntlayer, {
  name: 'fastify-intlayer',
  fastify: '5.x',
});

/**
 * Global translation function that retrieves content for the current locale in Fastify.
 *
 * Falls back to the configured default locale when called outside of a request
 * handled by the `intlayer` plugin.
 *
 * @param content - A map of locales to content.
 * @param locale - Optional locale override.
 * @returns The translated content.
 *
 * @example
 * ```ts
 * import { t } from 'fastify-intlayer';
 *
 * fastify.get('/', async (req, reply) => {
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

  if (context) {
    return context.t(content as StrictModeLocaleMap<string>, locale) as Content;
  }

  debug(
    'Using the import { t } from "fastify-intlayer" outside of a request context. Use req.intlayer.t instead.'
  );

  return getTranslation(content, locale ?? internationalization.defaultLocale);
};

/**
 * Retrieves a dictionary by key, using the locale of the current request by default.
 */
export const getIntlayer: typeof getIntlayerFunction = (...args) => {
  const context = intlayerStorage.getStore();

  if (context) {
    return context.getIntlayer(...args);
  }

  debug('Context not found. Ensure you are inside a request handling flow.');

  return getIntlayerFunction(...args);
};

/**
 * Retrieves an imported dictionary, using the locale of the current request by default.
 */
export const getDictionary: typeof getDictionaryFunction = (...args) => {
  const context = intlayerStorage.getStore();

  if (context) {
    return context.getDictionary(...args);
  }

  debug('Context not found. Ensure you are inside a request handling flow.');

  return getDictionaryFunction(...args);
};
