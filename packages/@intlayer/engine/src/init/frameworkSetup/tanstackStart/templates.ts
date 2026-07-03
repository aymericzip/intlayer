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
 * provider, with the locale read from the `{-$locale}` route param.
 */
export const ROOT_TEMPLATE_TS = `import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import type { ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRoute({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = useParams({ strict: false });
  const locale = params.locale ?? defaultLocale;

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

export const ROOT_TEMPLATE_JS = `import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRoute({
  shellComponent: RootDocument,
});

function RootDocument({ children }) {
  const params = useParams({ strict: false });
  const locale = params.locale ?? defaultLocale;

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
