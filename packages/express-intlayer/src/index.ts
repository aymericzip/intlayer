import { createModuleAugmentation } from '@intlayer/chokidar';
import { type Locales, getConfiguration } from '@intlayer/config';
import { getTranslationContent, localeDetector } from '@intlayer/core';
import type { NextFunction, RequestHandler, Request, Response } from 'express';
import { type IConfigLocales } from 'intlayer';

const { middleware, internationalization } = getConfiguration({
  verbose: true,
});
const { headerName, cookieName } = middleware;

createModuleAugmentation();

export const translateFunction =
  (_req: Request, res: Response, _next?: NextFunction) =>
  <T extends string>(content: IConfigLocales<T>): T => {
    const locale: Locales = res.locals.locale;

    return getTranslationContent(content, locale);
  };

/**
 * Detect locale used by the user and load it into res locale storage
 *
 * @returns
 */
export const intlayer = (): RequestHandler => (req, res, next) => {
  // Detect if locale is set by intlayer frontend lib in the cookies
  const localeCookie = req.cookies[cookieName];
  // Detect if locale is set by intlayer frontend lib in the headers
  const localeHeader = req.headers[headerName];
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
  res.locals.t = translateFunction(req, res, next);

  (
    global as typeof globalThis & { t: ReturnType<typeof translateFunction> }
  ).t = res.locals.t;

  next();
};

export const t = (
  global as typeof globalThis & { t: ReturnType<typeof translateFunction> }
).t;
