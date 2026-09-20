import * as builtConfiguration from '@intlayer/config/built';
import {
  getLocaleFromRequest,
  resolveProxyMode,
} from '@intlayer/core/localization';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import type { MiddlewareHandler } from 'astro';
import {
  createIntlayerWebProxyHandler,
  type WebProxyOutcome,
} from 'vite-intlayer/web-proxy-handler';
import { requestStorage } from './requestStorage';

/** Proxy outcome letting the request continue to the page. */
type WebProxyNextOutcome = Extract<WebProxyOutcome, { kind: 'next' }>;

/**
 * Whether `astro dev` is serving the app. Vite inlines `import.meta.env.DEV`
 * into the server bundle; the optional chain keeps the module loadable where
 * no bundler defines it (`process.env.NODE_ENV` cannot be used instead: the
 * package build inlines it).
 */
const isDevServer =
  (import.meta as { env?: { DEV?: boolean } }).env?.DEV === true;

const configuration = builtConfiguration as unknown as IntlayerConfig;
const { internationalization, routing } = configuration;

/**
 * Locale-routing proxy shared with the Vite dev server and the Nitro handler.
 *
 * `undefined` when `routing.enableProxy` is `false`. In auto mode (option
 * unset) `astro dev` keeps routing URL-driven: the stored locale is not a
 * redirect source, exactly like the Vite proxy mounted on the same dev server,
 * so the two never disagree.
 */
const proxy =
  resolveProxyMode(routing.enableProxy) === 'disabled'
    ? undefined
    : createIntlayerWebProxyHandler({
        configuration,
        isDevServer,
      });

/**
 * Appends the headers the proxy produced (the persisted locale cookie) to the
 * rendered response. Some responses ship immutable headers, in which case the
 * body is re-wrapped in a fresh `Response`.
 */
const withProxyHeaders = (response: Response, headers: Headers): Response => {
  const entries = [...headers];
  if (entries.length === 0) return response;

  const applyHeaders = (target: Response) => {
    for (const [name, value] of entries) {
      target.headers.append(name, value);
    }
    return target;
  };

  try {
    return applyHeaders(response);
  } catch {
    return applyHeaders(new Response(response.body, response));
  }
};

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
 * On server-rendered requests it also runs the Intlayer locale-routing proxy,
 * so a visitor whose stored locale is `fr` is redirected from `/` to `/fr`
 * (per `routing.mode`) and the resolved locale is persisted on the response.
 * Only redirects are honoured: the proxy's internal rewrites target
 * prefix-based routers, while Astro pages already resolve the locale from the
 * URL they are rendered for. Prerendered pages are served as static files, so
 * nothing can redirect them at request time and the proxy is skipped.
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
  let proxyOutcome: WebProxyNextOutcome | undefined;

  if (proxy && !context.isPrerendered) {
    const outcome = proxy({
      url: context.url,
      headers: context.request.headers,
    });

    if (outcome.kind === 'response') return outcome.response;
    proxyOutcome = outcome;
  }

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

  const response = await requestStorage.run(context.locals, next);

  return proxyOutcome
    ? withProxyHeaders(response, proxyOutcome.headers)
    : response;
};
