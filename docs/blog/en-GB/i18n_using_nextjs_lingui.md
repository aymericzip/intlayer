---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Next.js 16 i18n with Lingui: App Router Setup Guide"
description: "Set up Lingui in the Next.js 16 App Router: Server Components, SWC macros, proxy routing, generateMetadata, hreflang, sitemap and robots.txt, with benchmark data."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Internationalisation
  - i18n
  - SEO
  - Blog
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Initial version"
author: aymericzip
---

# How to internationalise your Next.js application using Lingui in 2026

## Table of Contents

<TOC/>

## What is Lingui?

**Lingui** is an i18n library built around **macros** and **message extraction**. You write the source text in your components (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` collects every message into catalogues (PO files by default), and a loader compiles them to compact JavaScript. Messages use ICU MessageFormat, and Lingui supports **React Server Components** in the App Router.

This guide sets up Lingui in a **Next.js 16 App Router** project, with:

- **Macros compiled by SWC**, so Turbopack keeps its speed.
- **Server and Client Components** sharing the same `Trans` and `useLingui` API.
- **Locale routing** through `proxy.ts`: `/about` for the default locale, `/fr/about` for the others, and first-visit language detection.
- **Static rendering** of every locale with `generateStaticParams`.
- **Complete multilingual SEO**: translated `generateMetadata`, canonical, `hreflang` with `x-default`, Open Graph locales, JSON-LD, `sitemap.ts`, `robots.ts` and localised 404 pages.

> Looking for another library?

- [next-intl guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_next-intl.md)
- [next-i18next guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_next-i18next.md)
- [Next.js + Intlayer guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md)

> Using TanStack Start?

- [TanStack Start + Lingui guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_tanstack-start_lingui.md)

> Comparing libraries?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/lingui_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/next-i18next_vs_next-intl_vs_intlayer.md)

> To understand where these libraries come from, read the history of JavaScript i18n.

- [The history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md)

## What the benchmark says about Lingui on Next.js

The [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/nextjs.md) runs the same 10-page, 10-locale Next.js app with every major library and measures what the browser actually downloads.

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Key figures for `@lingui/core@6.6.0` on Next.js 16, measured on 2026-09-26 (gzip):

| Setup                             | Library size | JS per page | Other-locale leak | Other-page leak |
| :-------------------------------- | -----------: | ----------: | ----------------: | --------------: |
| No i18n (base app)                |            - |    141.0 KB |                0% |              0% |
| Lingui, one catalog per locale    |      72.1 KB |    145.4 KB |              2.8% |           89.9% |
| `@intlayer/lingui` (compat)       |      10.7 KB |    221.6 KB |               50% |             90% |
| `next-intlayer` (native Intlayer) |       4.9 KB |    141.5 KB |                0% |              0% |

What to take away:

- **A single catalogue per locale still leaks other pages' messages** to the client provider. Keep as much text as possible in Server Components, which send rendered HTML, not catalogues.
- **The Lingui runtime weighs ~72 KB gzip.** The `@intlayer/lingui` compat adapter cuts the runtime to ~11 KB, but in this benchmark the Next.js compat setup still ships whole catalogues to the page. The native `next-intlayer` API is the setup that stays at the base app size.

> See the full data: [Next.js benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/nextjs.md), and the [benchmark repository](https://github.com/intlayer-org/benchmark-i18n).

## Feature comparison on Next.js

How Lingui compares with `next-intl` and Intlayer on the features a Next.js App Router project usually needs:

| Feature                             | `next-intlayer` (Intlayer)                         | Lingui                                                          | `next-intl`                                |
| ----------------------------------- | -------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------ |
| **Translations near components**    | ✅ Content co-located with each component          | ⚠️ Source text in components, catalogues centralised            | ❌ Centralised JSON                        |
| **TypeScript integration**          | ✅ Auto-generated strict types                     | ⚠️ Macros typed, message catalogues not                         | ✅ Good, via `AppConfig` augmentation      |
| **Missing translation detection**   | ✅ TypeScript errors and build-time warnings       | ⚠️ Runtime fallback to the source text                          | ⚠️ Runtime fallback                        |
| **Rich content (JSX, Markdown)**    | ✅ Direct support                                  | ✅ JSX inside `<Trans>`, no Markdown                            | ⚠️ Tags via `t.rich`, no Markdown          |
| **AI translation**                  | ✅ Your own provider and API key, with app context | ❌ No                                                           | ❌ No                                      |
| **Visual editor / CMS**             | ✅ Local visual editor + optional CMS              | ❌ Via external platforms                                       | ❌ Via external platforms                  |
| **Localised routing**               | ✅ Built-in                                        | ❌ Write your own `proxy.ts`                                    | ✅ Built-in `[locale]` segment             |
| **Pluralisation**                   | ✅ Enumeration-based                               | ✅ ICU, `<Plural>` macro                                        | ✅ ICU                                     |
| **Content formats**                 | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`   | ✅ PO, JSON, CSV                                                | ✅ `.json`, `.js`, `.ts`                   |
| **ICU MessageFormat**               | ✅ Via `format: "icu"`                             | ✅ Native                                                       | ✅ Native                                  |
| **SEO helpers (hreflang, sitemap)** | ✅ Metadata, sitemap and robots.txt helpers        | ❌ Manual                                                       | ✅ Good                                    |
| **Server Components**               | ✅ Direct access in any Server Component           | ⚠️ `setI18n` in every layout and page                           | ⚠️ `await getTranslations()` per component |
| **Per-component tree-shaking**      | ✅ At build time (Babel / SWC)                     | ⚠️ One catalogue per locale, per-page extractor is experimental | ⚠️ Manual, with `pick()` per route         |
| **Runtime size (gzip, benchmark)**  | 4.9 KB                                             | 72.1 KB                                                         | 14.7 KB                                    |
| **Missing translations in CI**      | ✅ `npx intlayer test`                             | ✅ `lingui compile --strict`                                    | ⚠️ Not built-in                            |
| **Ecosystem / community**           | ⚠️ Smaller, growing fast                           | ✅ Mature                                                       | ✅ Large                                   |

> Runtime sizes come from the [Next.js benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/nextjs.md). For a detailed discussion, read [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/lingui_vs_intlayer.md).

> Other Next.js guides:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md)

## Practices you should follow

- **Set `lang` and `dir` on `<html>`** in the `[locale]` layout.
- **Prefer Server Components** for text: they render HTML on the server and don't need the catalogue on the client.
- **Call `initLingui(locale)` in every layout and page.** Layouts don't re-render on navigation, so a page cannot rely on its layout having set the locale.
- **Keep one URL per locale** and pre-render every locale with `generateStaticParams`.
- **Translate your metadata** in `generateMetadata`, with `canonical`, `hreflang` and `x-default`.
- **Generate a multilingual sitemap and robots.txt** with the `sitemap.ts` and `robots.ts` conventions.
- **Use real links for the locale switcher**, so crawlers discover every language.
- **Run `lingui extract` in CI** so a new message never ships untranslated.

- [internationalisation and SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/internationalization_and_SEO.md)
- [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/hreflang_guide_multilingual_seo.md)
- [Next.js multilingual SEO comparison](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/nextjs-multilingual-seo-comparison.md)

## Step-by-Step Guide to Set Up Lingui in a Next.js Application

Here's the project structure we'll be creating:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Locale routing and detection
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Generated by `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Locales, URL helpers
    │   ├── appRouterI18n.ts        # Server-only catalogs and instances
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # generateMetadata builder
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # Localized 404 for unknown paths
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Install Dependencies">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider`, `setI18n` for Server Components, and the macros (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: compiles the macros inside the Next.js SWC pipeline.
- **@lingui/loader**: compiles `.po` catalogs on import, so `lingui compile` is not needed.
- **@lingui/cli**: `lingui extract` to collect messages into catalogs.

> `@lingui/swc-plugin` is a WebAssembly plugin tied to the SWC version of Next.js. If the build fails after a Next.js upgrade, update the plugin to the version listed as compatible in its README.

</Step>
<Step number={2} title="Centralise Your Locale Configuration">

A single file defines locales and URL helpers. Routing, metadata, sitemap and Lingui all read from it.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Configure Lingui and Next.js">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

The SWC plugin compiles the macros, and the loader compiles `.po` files, for both Turbopack (default in Next.js 16) and webpack:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
```

Add the extraction scripts:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="Load Catalogues and Create Server Instances">

Server Components have no React context, so Lingui provides `setI18n` to register the instance for the current render. This module loads every catalogue **once per server process** and creates one `I18n` instance per locale. It is `server-only`: catalogues of other locales never reach the client bundle.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Registers the instance for the current Server Component render.
 * Call it in every layout and page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

For TypeScript to accept the `.po` import, declare the module once:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="Create the Client Provider">

Client Components read translations from a React context. The provider receives the catalogue of the active locale from the server layout, and creates its own instance once.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="Define Dynamic Locale Routes">

The `[locale]` segment holds the root layout. `generateStaticParams` pre-renders every locale at build time, and `dynamicParams = false` returns a 404 for any other prefix.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Unknown prefixes (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Resolves relative canonical and Open Graph URLs
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> The client provider receives the whole catalogue of the active locale. This is what the benchmark measures as "other-page leak". Keeping text in Server Components limits what the client actually needs. For large apps, Lingui's experimental per-page extractor (`experimental.extractor` in `lingui.config.ts`) splits catalogues by entry point.

</Step>
<Step number={7} title="Use Translations in Server Components">

Server Components use the same macros as Client Components. `initLingui` must run in the page too, because a layout does not re-render when navigating between its pages.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Use Translations in Client Components">

Client Components use the same imports. The macros read the instance from `LinguiClientProvider`.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="Extract and Translate Your Messages">

Run the extraction. Lingui writes every message found in `src` into each locale catalogue:

```bash
npm run i18n:extract
```

Then translate the `msgstr` of each entry:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> `<0>` placeholders keep the JSX elements of a `<Trans>` in place, so translators can move them without touching the markup.

</Step>
<Step number={10} title="Set Up the Proxy for Locale Routing" isOptional={true}>

Next.js 16 renamed `middleware.ts` to `proxy.ts`. The proxy implements the "as-needed" prefix strategy:

- `/fr/about` is served as is;
- `/en/about` redirects to `/about`, so the default locale has a single URL;
- `/about` is rewritten internally to `/en/about`, without changing the URL;
- a first visit on `/` redirects to the preferred language (cookie first, then `Accept-Language`).

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: one URL for the default locale
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // First visit on "/": send the visitor to their language
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → served by /en/about, URL unchanged
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Skip API routes, Next.js internals and files (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="Change the Language of Your Content" isOptional={true}>

`usePathname` returns the URL seen by the browser (`/about` or `/fr/about`). Strip the locale, then build the link of each language. The switcher renders real links, so crawlers can reach every language version, and the cookie remembers the explicit choice.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="Build a Localised Link Component" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Path without locale prefix, e.g. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

It works from Server Components too, because it renders inside `LinguiClientProvider`:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Internationalise Your Metadata" isOptional={true}>

Each language version can rank on its own, provided every page exposes:

- a **translated** `title` and `description`;
- a **canonical** URL pointing to itself;
- one **`hreflang` alternate per locale**, plus **`x-default`**;
- **Open Graph** `locale`, `alternateLocale` and `url`;
- **JSON-LD** with `inLanguage`.

`generateMetadata` runs outside the React tree, so it uses the server instance directly with the `msg` macro:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... page component from step 7
```

JSON-LD is rendered by the page itself. Page files may only export Next.js fields, so keep the component in its own file:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// In AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Internationalise Your Sitemap" isOptional={true}>

The `sitemap.ts` convention supports `alternates.languages`, which Next.js renders as `xhtml:link` alternates. List every URL of every locale:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="Internationalise Your robots.txt" isOptional={true}>

Private routes exist in every language, so `disallow` must cover every localised path:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="Handle Localised 404 Pages" isOptional={true}>

`not-found.tsx` renders inside the `[locale]` layout, so it has access to the client provider. The catch-all route sends unknown paths inside a locale to it. Next.js adds `noindex` to 404 responses automatically.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → localized not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Access the Locale in Server Actions" isOptional={true}>

Server Actions don't receive route params. The most reliable approach is to send the locale with the form, from the page that knows it:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="Keep Your Macros, Cut the Runtime with Intlayer" isOptional={true}>

The [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/lingui.md) compat adapter keeps your source untouched: macros compile as before, and the resulting `i18n._()`, `useLingui()` and `<Trans>` calls are served by Intlayer dictionaries. In the Next.js benchmark, the runtime drops from **~72.1 KB to ~10.7 KB** gzip.

On Next.js, the adapter is wired by aliasing `@lingui/core` and `@lingui/react` to `@intlayer/lingui` in `next.config.ts` (webpack and Turbopack), and by wrapping the config with `withIntlayer` from `next-intlayer/server`. Keep `@lingui/swc-plugin` so the macros still compile first. The complete configuration is in the [Lingui compat guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/lingui.md).

As the benchmark table shows, the adapter reduces the runtime but not yet the catalogue shipped to each page on Next.js. It is best used as a migration bridge: once it runs, move components one at a time to the native `useIntlayer` API, which ships only the content each component renders. See the [Next.js + Intlayer guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md), [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/lingui_vs_intlayer-lingui.md) and all the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md).

</Step>
<Step number={19} title="Automate Your Translations Using Intlayer" isOptional={true}>

Lingui extracts messages, but filling dozens of catalogues by hand is where most of the time goes. Intlayer is **free** and **open source**, and its tooling works alongside Lingui:

- **Translate with AI** using your own API key and provider. See [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/autoFill.md) and the [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).
- **Keep your PO files** as the source of truth with the [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-po.md).
- **Test missing translations** in CI. See [testing your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/testing.md).
- **Audit your deployed site** for missing `hreflang`, wrong canonicals and locale leaks with the [scan command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/scan.md).

</Step>
</Steps>

## Frequently Asked Questions

<FAQ>

<Question title="Does Lingui support the Next.js App Router and Server Components?">

Yes. `@lingui/react` supports React Server Components. Server Components register the instance with `setI18n` from `@lingui/react/server`, Client Components read it from `I18nProvider`, and both use the same `Trans` and `useLingui` macros.

</Question>
<Question title="Why do I have to call initLingui in every page and layout?">

Server Components have no context, so the instance is registered per render. Layouts are preserved across navigations and don't re-render, so a page cannot rely on its layout to set the locale. Calling `initLingui(locale)` at the top of each layout and page keeps them independent.

</Question>
<Question title="Should I use the SWC plugin or Babel with Next.js?">

Use `@lingui/swc-plugin`. It keeps the SWC pipeline and Turbopack. Adding a Babel config disables SWC in Next.js and slows builds down. The only constraint is keeping the plugin version compatible with the SWC version of your Next.js release.

</Question>
<Question title="How do I translate generateMetadata with Lingui?">

Get the server instance with `getI18nInstance(locale)` and translate descriptors declared with the `msg` macro: ``i18n._(msg`About us`)``. Return `alternates.canonical`, `alternates.languages` with `x-default`, and `openGraph.locale`. Step 13 provides a reusable helper.

</Question>
<Question title="How big is Lingui in a Next.js bundle?">

The [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/nextjs.md) measures ~72 KB gzip for the runtime. With one catalogue per locale, pages weigh ~145 KB against 141 KB without i18n, but each page still receives the messages of other pages through the client provider.

</Question>
<Question title="Lingui, next-intl or next-i18next: which one should I pick for Next.js?">

Lingui fits teams that like writing source text in components and working with PO files and translators. next-intl fits teams that prefer JSON catalogues and a `t("key")` API tightly integrated with Next.js. next-i18next brings the i18next plugin ecosystem. See [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/next-i18next_vs_next-intl_vs_intlayer.md) and the [Next.js benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/nextjs.md).

</Question>
<Question title="Can I migrate from Lingui to Intlayer without rewriting my components?">

Yes. The [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/lingui.md) adapter keeps the macros and swaps the runtime, then you can move components to `useIntlayer` progressively. See the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md).

</Question>

</FAQ>
