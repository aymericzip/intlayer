/**
 * File templates for a fresh Next.js App Router integration. These are only
 * written when the target file does not exist (or, for the locale layout/page,
 * when the app is effectively empty) — they never overwrite user code.
 */

/** Next.js >= 16 locale-detection proxy (`src/proxy.ts`). */
export const PROXY_TEMPLATE = `export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\\\..*|_next).*)",
};
`;

/** Next.js < 16 locale-detection middleware (`src/middleware.ts`). */
export const MIDDLEWARE_TEMPLATE = `export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\\\..*|_next).*)",
};
`;

/** Minimal pass-through root layout (`app/layout.tsx`), lets `[locale]/layout` own `<html>`. */
export const ROOT_LAYOUT_TEMPLATE_TS = `import type { PropsWithChildren, FC } from "react";

const RootLayout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default RootLayout;
`;

export const ROOT_LAYOUT_TEMPLATE_JS = `const RootLayout = ({ children }) => <>{children}</>;

export default RootLayout;
`;

/** Locale layout (`app/[locale]/layout.tsx`) providing `<html>` + client provider. */
export const LOCALE_LAYOUT_TEMPLATE_TS = `import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir } from "intlayer";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
`;

export const LOCALE_LAYOUT_TEMPLATE_JS = `import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir } from "intlayer";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
`;

/**
 * Locale home page (`app/[locale]/page.tsx`). Self-contained starter that does
 * not depend on an example content declaration — add Intlayer content (a
 * `*.content.ts` file consumed via `useIntlayer`) as the next step.
 */
export const LOCALE_PAGE_TEMPLATE_TS = `import { type NextPageIntlayer } from "next-intlayer";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <main>
      <h1>{locale}</h1>
      <p>Get started by editing this page.</p>
    </main>
  );
};

export default Page;
`;

export const LOCALE_PAGE_TEMPLATE_JS = `const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <main>
      <h1>{locale}</h1>
      <p>Get started by editing this page.</p>
    </main>
  );
};

export default Page;
`;
