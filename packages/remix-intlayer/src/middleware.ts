import { internationalization, routing } from '@intlayer/config/built';
import { getConfiguration } from '@intlayer/config/node';
import { getLocaleFromRequest } from '@intlayer/core/localization';
import { prepareIntlayer } from '@intlayer/engine/build';
import type { Locale } from '@intlayer/types/allLocales';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import type { Middleware } from 'remix/router';
import {
  INTLAYER_CONTEXT_PROPERTY,
  Intlayer,
  type IntlayerState,
} from './context';
import {
  createLocaleRouting,
  type LocaleRoutingAction,
  type LocaleRoutingOptions,
} from './localeRouting';
import { withLocaleHeaders, writeLocaleHeaders } from './persistLocale';
import { requestStorage } from './requestStorage';

export type IntlayerMiddlewareOptions = LocaleRoutingOptions;

/**
 * Builds the redirect response of a locale-routing decision.
 *
 * Built by hand rather than with `Response.redirect`, whose headers are
 * immutable and could not carry the locale cookie.
 */
const createRedirectResponse = (
  action: Extract<LocaleRoutingAction, { kind: 'redirect' }>
): Response => {
  const headers = new Headers({ location: action.location });

  if (action.persistLocale) {
    writeLocaleHeaders(headers, action.persistLocale, { includeCookie: true });
  }

  return new Response(null, { status: action.status, headers });
};

/**
 * Remix 3 router middleware handling the internationalization layer:
 * locale routing (redirects and internal rewrites, as `next-intlayer` and
 * `vite-intlayer` do), locale resolution and locale persistence.
 *
 * Locale routing follows `routing.mode`. In the prefix modes, `/fr/about` is
 * served from the `/about` route as French, `/about` is redirected to the
 * localized URL of the detected locale (cookie / header, then
 * `Accept-Language`) unless that locale needs no prefix, and `routing.rewrite`
 * rules are applied both ways (`/fr/about` → `/fr/a-propos`). The router
 * therefore matches every locale against the same unprefixed routes, and
 * `routing.enableProxy: false` turns the routing off while keeping the
 * locale resolution.
 *
 * The resolved locale is exposed as `context.get(Intlayer)` /
 * `context.intlayer`, and the rest of the request runs inside an
 * `AsyncLocalStorage` scope bound to the request context, so the hooks of this
 * package (`useLocale`, `useIntlayer`, `useDictionary`) read that state from
 * anywhere downstream — route handlers, views, Remix UI components — with the
 * same signature as `react-intlayer`.
 *
 * @param options - Locale-routing options.
 *
 * @example
 * ```ts
 * import { createRouter } from 'remix/router';
 * import { intlayer, useIntlayer } from 'remix-intlayer';
 *
 * const router = createRouter({ middleware: [intlayer()] });
 *
 * // Serves `/`, `/fr`, `/es`… — the locale comes from the request context.
 * router.get('/', () => {
 *   const { title } = useIntlayer('home');
 *   return new Response(title);
 * });
 * ```
 */
export const intlayer = (
  options: IntlayerMiddlewareOptions = {}
): Middleware<{
  key: typeof Intlayer;
  value: IntlayerState;
  property: typeof INTLAYER_CONTEXT_PROPERTY;
}> => {
  // Ensures the generated dictionaries exist when the server starts without a
  // prior `intlayer build`. Fire-and-forget, like the other server integrations.
  const configuration = getConfiguration();
  prepareIntlayer(configuration);

  const resolveLocaleRouting = createLocaleRouting(
    {
      internationalization:
        configuration.internationalization ?? internationalization,
      routing: configuration.routing ?? routing,
    },
    options
  );

  return async (context, next) => {
    const action = resolveLocaleRouting(context);

    if (action.kind === 'redirect') return createRedirectResponse(action);

    let routedLocale: Locale | undefined;

    if (action.kind === 'rewrite') {
      // The router matches against `context.url`, so reassigning it is the
      // internal rewrite. The original request stays untouched.
      context.url = new URL(action.path, context.url);
      routedLocale = action.locale;
    }

    const locale =
      routedLocale ?? ((await getLocaleFromRequest(context)) as Locale);

    if (routedLocale) {
      // Propagates the locale downstream through the configured storage
      // header, like the Next.js and Vite proxies do.
      writeLocaleHeaders(context.headers, routedLocale);
    }

    context.set(
      Intlayer,
      {
        locale: locale as DeclaredLocales,
        defaultLocale: (configuration.internationalization?.defaultLocale ??
          internationalization.defaultLocale) as DeclaredLocales,
        availableLocales: (configuration.internationalization?.locales ??
          internationalization.locales) as DeclaredLocales[],
      },
      { property: INTLAYER_CONTEXT_PROPERTY }
    );

    const response = await requestStorage.run(context, next);

    return routedLocale ? withLocaleHeaders(response, routedLocale) : response;
  };
};
