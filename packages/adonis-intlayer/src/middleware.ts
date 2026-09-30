import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import { internationalization } from '@intlayer/config/built';
import {
  getDictionary as getDictionaryFunction,
  getIntlayer as getIntlayerFunction,
} from '@intlayer/core/interpreter';
import { localeDetector } from '@intlayer/core/localization';
import type { Locale } from '@intlayer/types/allLocales';
import { getStorageLocale, intlayerStorage, translateFunction } from './index';

/**
 * AdonisJS middleware that detects the user's locale and populates the context with Intlayer data.
 */
export default class IntlayerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // Detect if locale is set by intlayer frontend lib in the headers or cookies
    const localeFromStorage = getStorageLocale(ctx);

    const localeDetected = localeDetector(
      { 'accept-language': ctx.request.header('accept-language') },
      internationalization.locales,
      internationalization.defaultLocale
    );

    const locale = localeFromStorage ?? localeDetected;

    // Decorate context
    const decoratedContext = ctx as HttpContext & {
      locale: Locale;
      defaultLocale: Locale;
    };
    decoratedContext.locale = locale;
    decoratedContext.defaultLocale = internationalization.defaultLocale;

    const t = translateFunction(ctx);

    const getIntlayer: typeof getIntlayerFunction = (
      key,
      localeArg,
      ...props
    ) =>
      getIntlayerFunction(
        key,
        (localeArg ?? locale) as typeof localeArg,
        ...props
      );

    const getDictionary: typeof getDictionaryFunction = (
      key,
      localeArg,
      ...props
    ) =>
      getDictionaryFunction(
        key,
        (localeArg ?? locale) as typeof localeArg,
        ...props
      );

    // Make functions available to the standalone exports for this request
    await intlayerStorage.run({ locale, t, getIntlayer, getDictionary }, next);
  }
}
