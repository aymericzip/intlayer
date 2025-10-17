import { prepareIntlayer } from '@intlayer/chokidar';
import { getConfiguration } from '@intlayer/config';
import {
  getDictionary as getDictionaryFunction,
  getIntlayer as getIntlayerFunction,
  getTranslation,
  localeDetector,
} from '@intlayer/core';
import type { LanguageContent, Locales } from '@intlayer/types';
import { createNamespace } from 'cls-hooked';
import type { NextFunction, Request, RequestHandler, Response } from 'express';

const { middleware, internationalization } = getConfiguration();
const { headerName, cookieName } = middleware;

const appNamespace = createNamespace('app');

prepareIntlayer();

export const translateFunction =
  (_req: Request, res: Response, _next?: NextFunction) =>
  <T extends string>(
    content: LanguageContent<T> | string,
    locale?: Locales
  ): T => {
    const { locale: currentLocale, defaultLocale } = res.locals as {
      locale: Locales;
      defaultLocale: Locales;
    };

    const targetLocale = locale ?? currentLocale;

    if (typeof content === 'undefined') {
      return '' as unknown as T;
    }

    if (typeof content === 'string') {
      return content as unknown as T;
    }

    if (
      typeof content?.[targetLocale as unknown as keyof LanguageContent<T>] ===
      'undefined'
    ) {
      if (
        typeof content?.[
          defaultLocale as unknown as keyof LanguageContent<T>
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
 * Detect locale used by the user and load it into res locale storage
 *
 * @returns
 */
export const intlayer = (): RequestHandler => async (req, res, next) => {
  // Detect if locale is set by intlayer frontend lib in the cookies
  const localeCookie = req.cookies?.[cookieName];
  // Detect if locale is set by intlayer frontend lib in the headers
  const localeHeader = req.headers?.[headerName];
  // Interpret browser locale

  const negotiatorHeaders: Record<string, string> = {};

  // // Check if req.headers exists and is an object
  if (req && typeof req.headers === 'object') {
    // Copy all headers from the request to negotiatorHeaders
    for (const key in req.headers) {
      if (typeof req.headers[key] === 'string') {
        negotiatorHeaders[key] = req.headers[key];
      }
    }
  }

  const localeDetected = localeDetector(
    negotiatorHeaders,
    internationalization.locales,
    internationalization.defaultLocale
  );

  res.locals.locale_header = localeHeader;
  res.locals.locale_cookie = localeCookie;
  res.locals.locale_detected = localeDetected;
  res.locals.locale = localeCookie ?? localeHeader ?? localeDetected;
  res.locals.defaultLocale = internationalization.defaultLocale;

  const t = translateFunction(req, res, next);

  const getIntlayer: typeof getIntlayerFunction = (
    key,
    localeArg = localeDetected as Parameters<typeof getIntlayerFunction>[1],
    ...props
  ) => getIntlayerFunction(key, localeArg, ...props);

  const getDictionary: typeof getDictionaryFunction = (
    key,
    localeArg = localeDetected as Parameters<typeof getDictionaryFunction>[1],
    ...props
  ) => getDictionaryFunction(key, localeArg, ...props);

  res.locals.t = t;
  res.locals.getIntlayer = getIntlayer;
  res.locals.getDictionary = getDictionary;

  appNamespace.run(() => {
    appNamespace.set('t', t);
    appNamespace.set('getIntlayer', getIntlayer);
    appNamespace.set('getDictionary', getDictionary);

    next();
  });
};

export const t = <Content = string>(
  content: LanguageContent<Content>,
  locale?: Locales
): Content => {
  try {
    if (typeof appNamespace === 'undefined') {
      throw new Error(
        'Intlayer is not initialized. Add the `app.use(intlayer());` middleware before using this function.'
      );
    }

    if (typeof appNamespace.get('t') !== 'function') {
      throw new Error(
        'Using the import { t } from "express-intlayer" is not supported in your environment. Use the res.locals.t syntax instead.'
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
        'Intlayer is not initialized. Add the `app.use(intlayer());` middleware before using this function.'
      );
    }

    if (typeof appNamespace.get('getIntlayer') !== 'function') {
      throw new Error(
        'Using the import { t } from "express-intlayer" is not supported in your environment. Use the res.locals.t syntax instead.'
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
        'Intlayer is not initialized. Add the `app.use(intlayer());` middleware before using this function.'
      );
    }

    if (typeof appNamespace.get('getDictionary') !== 'function') {
      throw new Error(
        'Using the import { t } from "express-intlayer" is not supported in your environment. Use the res.locals.t syntax instead.'
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
