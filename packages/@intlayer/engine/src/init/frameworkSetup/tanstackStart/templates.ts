/**
 * File templates for a fresh TanStack Start integration. These are only written
 * when the target file does not exist — they never overwrite user code.
 */

/**
 * Builds the locale segment route (`routes/<localeSegment>/route.tsx`) for the
 * given segment. The optional `{-$locale}` param makes the default locale
 * prefix-free, while the required `$locale` param (`prefix-all`) prefixes every
 * locale; in both cases `validatePrefix` redirects unknown prefixes to a valid
 * one. Identical for TypeScript and JavaScript projects.
 */
export const buildLocaleRouteTemplate = (
  localeSegment: string
): string => `import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/${localeSegment}")({
  beforeLoad: ({ params }) => {
    // beforeLoad runs on both client and server, so resolve the locale from the
    // route params rather than from request headers.
    const { isValid, localePrefix } = validatePrefix(params.locale);

    // A valid (or absent, i.e. default) locale prefix is fine as-is.
    if (isValid) return;

    // Otherwise redirect to the same route with a valid locale prefix.
    throw redirect({
      params: { locale: localePrefix },
      to: "/${localeSegment}",
    });
  },
  component: Outlet,
});
`;

/**
 * Root route document (`routes/__root.tsx`) providing `<html>` + the Intlayer
 * provider, with the locale read from the locale segment route params.
 *
 * The route is reached through `getRouteApi(<route id>)` rather than by
 * importing `<segment>/route`, so the root never imports a child route module —
 * the recommended way to consume another route's typed hooks.
 */
export const buildRootTemplateTs = (localeSegment: string): string => `import {
  createRootRoute,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import type { ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/${localeSegment}");

export const Route = createRootRoute({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { locale = defaultLocale } = localeRoute.useParams();

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
`;

/** JavaScript counterpart of {@link buildRootTemplateTs}. */
export const buildRootTemplateJs = (localeSegment: string): string => `import {
  createRootRoute,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/${localeSegment}");

export const Route = createRootRoute({
  shellComponent: RootDocument,
});

function RootDocument({ children }) {
  const { locale = defaultLocale } = localeRoute.useParams();

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
`;

/**
 * Module-scope server function resolving the request locale from the locale
 * cookie / headers (`Accept-Language` fallback). Shared by the unprefixed root
 * template and the root transform.
 */
export const REQUEST_LOCALE_SERVER_FUNCTION = `const getRequestLocale = createServerFn().handler(() =>
  getLocale({
    getCookie: (name) => getCookie(name, getRequestHeader("cookie")),
    getHeader: (name) => getRequestHeader(name),
  })
);`;

/**
 * Root route document (`routes/__root.tsx`) for routing modes without a locale
 * path segment (`no-prefix`, `search-params`, or no proxy). The locale is
 * resolved on the server per request and exposed through the root loader, so
 * server and client render the same locale. Identical for TypeScript and
 * JavaScript projects apart from the `children` prop type.
 */
const buildUnprefixedRootTemplate = (
  childrenPropType: string
): string => `import {
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { getCookie, getHTMLTextDir, getLocale } from "intlayer";${childrenPropType ? '\nimport type { ReactNode } from "react";' : ''}
import { IntlayerProvider } from "react-intlayer";

${REQUEST_LOCALE_SERVER_FUNCTION}

export const Route = createRootRoute({
  loader: () => getRequestLocale(),
  shellComponent: RootDocument,
});

function RootDocument({ children }${childrenPropType}) {
  const locale = Route.useLoaderData();

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
`;

/** {@link buildUnprefixedRootTemplate} for TypeScript projects. */
export const UNPREFIXED_ROOT_TEMPLATE_TS = buildUnprefixedRootTemplate(
  ': { children: ReactNode }'
);

/** {@link buildUnprefixedRootTemplate} for JavaScript projects. */
export const UNPREFIXED_ROOT_TEMPLATE_JS = buildUnprefixedRootTemplate('');
