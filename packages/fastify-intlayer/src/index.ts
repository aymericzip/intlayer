import { prepareIntlayer } from '@intlayer/chokidar';
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
import type { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

const configuration = getConfiguration();
const { internationalization } = configuration;

/**
 * Retrieves the locale from storage (cookies, headers).
 * Note: req.cookies requires @fastify/cookie to be registered.
 * We cast req to any to avoid hard dependency on @fastify/cookie types.
 */
const getStorageLocale = (req: FastifyRequest): Locale | undefined =>
  getLocaleFromStorage({
    getCookie: (name: string) => (req as any).cookies?.[name],
    getHeader: (name: string) => req.headers?.[name] as string | undefined,
  });

const appNamespace = createNamespace('app');

prepareIntlayer(configuration);

// Module augmentation to type the request decoration
declare module 'fastify' {
  interface FastifyRequest {
    intlayer: {
      locale: Locale;
      defaultLocale: Locale;
      locale_storage?: Locale;
      locale_detected?: Locale;
      t: <T extends string>(
        content: StrictModeLocaleMap<T> | string,
        locale?: Locale
      ) => T;
      getIntlayer: typeof getIntlayerFunction;
      getDictionary: typeof getDictionaryFunction;
    };
  }
}

export const translateFunction =
  (req: FastifyRequest) =>
  <T extends string>(
    content: StrictModeLocaleMap<T> | string,
    locale?: Locale
  ): T => {
    // Access the decorated state from the request
    const { locale: currentLocale, defaultLocale } = req.intlayer;

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
 * Fastify Plugin to detect locale and load it into request context
 */
const fastifyIntlayer: FastifyPluginAsync = async (fastify, _opts) => {
  // Decorate the request object to ensure types are stable.
  // We use 'null as any' to bypass the initial type check, knowing
  // the preHandler will populate it before any route handler runs.
  if (!fastify.hasRequestDecorator('intlayer')) {
    fastify.decorateRequest('intlayer', null as any);
  }

  fastify.addHook('preHandler', (req, _reply, done) => {
    // Detect if locale is set by intlayer frontend lib in the headers
    const localeFromStorage = getStorageLocale(req);

    const negotiatorHeaders: Record<string, string> = {};

    // Copy all headers from the request to negotiatorHeaders
    if (req && typeof req.headers === 'object') {
      for (const key in req.headers) {
        const val = req.headers[key];
        if (typeof val === 'string') {
          negotiatorHeaders[key] = val;
        } else if (Array.isArray(val)) {
          // Handle array headers (unlikely for accept-language but possible in Fastify)
          negotiatorHeaders[key] = val.join(',');
        }
      }
    }

    const localeDetected = localeDetector(
      negotiatorHeaders,
      internationalization.locales,
      internationalization.defaultLocale
    );

    const locale = localeFromStorage ?? localeDetected;
    const defaultLocale = internationalization.defaultLocale;

    // Helper functions bound to the current request context
    const getIntlayerWrapped: typeof getIntlayerFunction = (
      key,
      localeArg = localeDetected as Parameters<typeof getIntlayerFunction>[1],
      ...props
    ) => getIntlayerFunction(key, localeArg, ...props);

    const getDictionaryWrapped: typeof getDictionaryFunction = (
      key,
      localeArg = localeDetected as Parameters<typeof getDictionaryFunction>[1],
      ...props
    ) => getDictionaryFunction(key, localeArg, ...props);

    // Assign data to request decoration
    req.intlayer = {
      locale_storage: localeFromStorage,
      locale_detected: localeDetected,
      locale,
      defaultLocale,
      getIntlayer: getIntlayerWrapped,
      getDictionary: getDictionaryWrapped,
      t: undefined as unknown as any, // Placeholder
    };

    // Now bind t using the updated req
    const t = translateFunction(req);
    req.intlayer.t = t;

    // Run CLS context
    appNamespace.run(() => {
      appNamespace.set('t', t);
      appNamespace.set('getIntlayer', getIntlayerWrapped);
      appNamespace.set('getDictionary', getDictionaryWrapped);

      done();
    });
  });
};

// Export as a Fastify Plugin (wrapped in fp to skip encapsulation)
export const intlayer = fp(fastifyIntlayer, {
  name: 'fastify-intlayer',
  fastify: '5.x',
});

// Global exports that rely on CLS (Async Local Storage)
export const t = <Content = string>(
  content: StrictModeLocaleMap<Content>,
  locale?: Locale
): Content => {
  try {
    if (typeof appNamespace === 'undefined') {
      throw new Error(
        'Intlayer is not initialized. Register the plugin `fastify.register(intlayer)`.'
      );
    }

    if (typeof appNamespace.get('t') !== 'function') {
      throw new Error(
        'Using the import { t } from "fastify-intlayer" is not supported in your environment outside of a request context or proper setup. Use req.intlayer.t instead.'
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

export const getIntlayer: typeof getIntlayerFunction = (...args) => {
  try {
    if (typeof appNamespace === 'undefined') {
      throw new Error(
        'Intlayer is not initialized. Register the plugin `fastify.register(intlayer)`.'
      );
    }

    if (typeof appNamespace.get('getIntlayer') !== 'function') {
      throw new Error(
        'Context not found. Ensure you are inside a request handling flow.'
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

export const getDictionary: typeof getDictionaryFunction = (...args) => {
  try {
    if (typeof appNamespace === 'undefined') {
      throw new Error(
        'Intlayer is not initialized. Register the plugin `fastify.register(intlayer)`.'
      );
    }

    if (typeof appNamespace.get('getDictionary') !== 'function') {
      throw new Error(
        'Context not found. Ensure you are inside a request handling flow.'
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
