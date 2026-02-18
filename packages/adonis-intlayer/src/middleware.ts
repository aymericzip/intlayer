import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import { getConfiguration } from '@intlayer/config';
import {
  getDictionary as getDictionaryFunction,
  getIntlayer as getIntlayerFunction,
} from '@intlayer/core/interpreter';
import { appNamespace, getStorageLocale, translateFunction } from './index';

const configuration = getConfiguration();
const { internationalization } = configuration;

/**
 * AdonisJS middleware that detects the user's locale and populates the context with Intlayer data.
 */
export default class IntlayerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // Detect if locale is set by intlayer frontend lib in the headers or cookies
    const localeFromStorage = getStorageLocale(ctx);

    const negotiatorHeaders: Record<string, string> = {};

    // Copy all headers from the request to negotiatorHeaders
    const headers = ctx.request.headers();
    for (const key in headers) {
      const val = headers[key];
      if (typeof val === 'string') {
        negotiatorHeaders[key] = val;
      } else if (Array.isArray(val)) {
        negotiatorHeaders[key] = val.join(',');
      }
    }

    const localeDetected = localeDetector(
      negotiatorHeaders,
      internationalization.locales,
      internationalization.defaultLocale
    );

    const locale = localeFromStorage ?? localeDetected;

    // Decorate context
    (ctx as any).locale = locale;
    (ctx as any).defaultLocale = internationalization.defaultLocale;

    const t = translateFunction(ctx);

    const getIntlayer: typeof getIntlayerFunction = (
      key,
      localeArg = locale as Parameters<typeof getIntlayerFunction>[1],
      ...props
    ) => getIntlayerFunction(key, localeArg, ...props);

    const getDictionary: typeof getDictionaryFunction = (
      key,
      localeArg = locale as Parameters<typeof getDictionaryFunction>[1],
      ...props
    ) => getDictionaryFunction(key, localeArg, ...props);

    // Make functions available via CLS
    await appNamespace.runPromise(async () => {
      appNamespace.set('locale', locale);
      appNamespace.set('t', t);
      appNamespace.set('getIntlayer', getIntlayer);
      appNamespace.set('getDictionary', getDictionary);

      await next();
    });
  }
}
