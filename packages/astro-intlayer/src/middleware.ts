import { internationalization } from '@intlayer/config/built';
import { getLocaleFromRequest } from '@intlayer/core/localization';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import type { MiddlewareHandler } from 'astro';
import { requestStorage } from './requestStorage';

/**
 * Intlayer state stored in `Astro.locals.intlayer` by the {@link onRequest} middleware.
 */
export type IntlayerLocals = {
  /** Locale resolved for the current request. */
  locale: DeclaredLocales;
  /** Locale configured as fallback in `intlayer.config.ts`. */
  defaultLocale: DeclaredLocales;
  /** Every locale declared in `intlayer.config.ts`. */
  availableLocales: DeclaredLocales[];
};

declare global {
  namespace App {
    interface Locals {
      intlayer: IntlayerLocals;
    }
  }
}

/**
 * Astro middleware resolving the request locale into `Astro.locals.intlayer`.
 *
 * Priority: the URL (path prefix or `?locale=` search param, in every routing
 * mode but `no-prefix`), then the locale persisted by the client (cookie or
 * custom header), then `Accept-Language` negotiation.
 *
 * The `intlayer()` integration registers it automatically, before the user
 * middleware, so `Astro.locals.intlayer` is available in every page, endpoint
 * and middleware. The rest of the request renders inside an
 * `AsyncLocalStorage` scope bound to those locals, which is how the hooks of
 * `astro-intlayer/server` read the locale with no argument.
 *
 * @example
 * ```ts
 * // src/middleware.ts — only needed when composing it by hand
 * import { onRequest as intlayer } from 'astro-intlayer/middleware';
 * import { sequence } from 'astro:middleware';
 *
 * export const onRequest = sequence(intlayer, myMiddleware);
 * ```
 */
export const onRequest: MiddlewareHandler = async (context, next) => {
  context.locals.intlayer = {
    locale: await getLocaleFromRequest({
      url: context.url,
      // A prerendered page is rendered once and served to every visitor, so
      // its locale can only come from the URL. Reading the request headers
      // there would also make Astro warn on every page of the build.
      headers: context.isPrerendered ? new Headers() : context.request.headers,
    }),
    defaultLocale: internationalization.defaultLocale as DeclaredLocales,
    availableLocales: internationalization.locales as DeclaredLocales[],
  };

  return requestStorage.run(context.locals, next);
};
