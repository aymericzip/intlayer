---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "TanStack Start i18n with Lingui: Complete 2026 Setup Guide"
description: "Translate your TanStack Start app with Lingui: macros, PO catalogs, SSR, locale routing, hreflang, sitemap and robots.txt, plus real bundle-size benchmark data."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Internationalization
  - i18n
  - SEO
  - PO files
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Initial version"
author: aymericzip
---

# How to internationalize your TanStack Start application using Lingui in 2026

## Table of Contents

<TOC/>

## What is Lingui?

**Lingui** is an i18n library built around **macros** and **message extraction**. You write the source text directly in your components (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` collects every message into catalogs (PO files by default), translators fill them, and the Vite plugin compiles them to compact JavaScript. Messages use ICU MessageFormat, so plurals and selects are supported.

TanStack Start does not ship an i18n layer, so this guide wires Lingui into it from scratch:

- **Macros compiled by Babel** through `@rolldown/plugin-babel` (required with `@vitejs/plugin-react` v6 and Vite 8).
- **Locale routing** with an optional `{-$locale}` segment (`/about`, `/fr/about`).
- **One catalog per locale, loaded on demand**, and an `I18n` instance per render so concurrent SSR requests never share a locale.
- **Complete multilingual SEO**: translated `<title>` and description, canonical URL, `hreflang` with `x-default`, Open Graph locales, JSON-LD, sitemap, `robots.txt`, pre-rendering and localized 404 pages.

> Looking for another stack?

- [TanStack Start + use-intl guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_tanstack-start_use-intl.md)
- [TanStack Start + Paraglide guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_tanstack-start_paraglide.md)
- [TanStack Start + Intlayer guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_tanstack.md)

> Using Next.js?

- [Next.js + Lingui guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_nextjs_lingui.md)

> Comparing libraries?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/lingui_vs_intlayer.md)

> To understand where these libraries come from, read the history of JavaScript i18n.

- [The history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/history_of_i18n.md)

## What the benchmark says about Lingui on TanStack Start

The [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/tanstack.md) runs the same 10-page, 10-locale TanStack Start app with every major library and measures what the browser actually downloads.

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

Key figures for `@lingui/core@6.6.0`, measured on 2026-09-26 (gzip):

| Setup                              | Library size | JS per page | Other-locale leak | Other-page leak |
| :--------------------------------- | -----------: | ----------: | ----------------: | --------------: |
| No i18n (base app)                 |            - |    111.0 KB |                0% |              0% |
| Lingui (setup of this guide)       |      56.7 KB |    115.2 KB |              9.3% |              0% |
| `@intlayer/lingui` (compat)        |       9.8 KB |    136.7 KB |              9.9% |              0% |
| `react-intlayer` (native Intlayer) |       4.5 KB |    126.8 KB |                0% |              0% |

What to take away:

- **Load one catalog per locale, on demand.** It keeps pages close to the base app size.
- **The runtime stays heavy** (~57 KB gzip). The `@intlayer/lingui` compat adapter (step 16) keeps your macros and cuts it to ~10 KB.

> See the full data: [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/tanstack.md), and the [benchmark repository](https://github.com/intlayer-org/benchmark-i18n).

## Feature comparison on TanStack Start

How Lingui compares with the other libraries commonly used on TanStack Start:

| Feature                              | `react-intlayer` (Intlayer)          | `use-intl`             | Paraglide JS                      | Lingui                           |
| ------------------------------------ | ------------------------------------ | ---------------------- | --------------------------------- | -------------------------------- |
| **Translations near components**     | ✅ Co-located                        | ❌ Centralized JSON    | ❌ One JSON file per locale       | ⚠️ Source text in components     |
| **TypeScript integration**           | ✅ Auto-generated types              | ✅ Via `AppConfig`     | ✅ Typed message functions        | ⚠️ Macros only                   |
| **Missing translation detection**    | ✅ Type errors and build warnings    | ⚠️ Runtime fallback    | ⚠️ Falls back to the base locale  | ⚠️ Falls back to the source text |
| **Rich content (JSX, Markdown)**     | ✅ Direct support                    | ⚠️ Tags via `t.rich`   | ⚠️ Strings                        | ✅ JSX inside `<Trans>`          |
| **Localized routing**                | ✅ Built-in                          | ❌ Manual `{-$locale}` | ✅ `urlPatterns` + router rewrite | ❌ Manual `{-$locale}`           |
| **Locale switch without reload**     | ✅ Yes                               | ✅ Yes                 | ❌ Full page reload               | ✅ Yes                           |
| **Pluralization**                    | ✅ Enumeration-based                 | ✅ ICU                 | ✅ Variants                       | ✅ ICU                           |
| **ICU MessageFormat**                | ✅ Via `format: "icu"`               | ✅ Native              | ⚠️ Via an inlang plugin           | ✅ Native                        |
| **Content formats**                  | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`             | ⚠️ inlang JSON                    | ✅ PO, JSON, CSV                 |
| **AI translation**                   | ✅ Your own provider and key         | ❌ No                  | ❌ No                             | ❌ No                            |
| **Visual editor / CMS**              | ✅ Local editor + optional CMS       | ❌ External platforms  | ⚠️ inlang ecosystem apps          | ❌ External platforms            |
| **SEO helpers (hreflang, sitemap)**  | ✅ Built-in                          | ❌ Manual              | ⚠️ Localized URLs, rest manual    | ❌ Manual                        |
| **Runtime size (gzip, benchmark)**   | 4.5 KB                               | 75.9 KB                | 1.8 KB                            | 56.7 KB                          |
| **Leak, best setup (locale / page)** | 0% / 0%                              | 0% / 0%                | 49.7% / 0%                        | 8.6% / 0%                        |
| **Missing translations in CI**       | ✅ `npx intlayer test`               | ⚠️ Not built-in        | ⚠️ Not built-in                   | ✅ `lingui compile --strict`     |

> Runtime size and leak figures come from the [TanStack Start benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/tanstack.md). Leak is measured on the best setup of each library.

> Other TanStack Start guides:

- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_tanstack-start_use-intl.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_tanstack.md)

## Practices you should follow

- **Set `lang` and `dir` on `<html>`** from the route locale, so they are correct in the server HTML.
- **Keep one URL per locale** with a prefix, so every language version is indexable.
- **Create one `I18n` instance per locale**, never mutate a global one during SSR: two concurrent requests would overwrite each other's locale.
- **Load only the active catalog**, never import all of them in client code.
- **Pick one macro style** (`useLingui` + `t` in components, `msg` for lazy descriptors) and stick to it. Mixing `t`, `i18n._`, `i18n.t` and `<Trans>` makes the code harder to read for humans and AI assistants.
- **Run `lingui extract` in CI** so a new message never ships untranslated.
- **Translate your metadata**, and declare `canonical`, `hreflang` and `x-default` on every page.
- **Generate a multilingual sitemap and robots.txt**, and pre-render every locale.
- **Use real links for the locale switcher**, so crawlers discover every language.

- [internationalization and SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/internationalization_and_SEO.md)
- [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/hreflang_guide_multilingual_seo.md)

## Step-by-Step Guide to Set Up Lingui in a TanStack Start Application

Here's the project structure we'll be creating:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Generated by `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Request middleware (locale redirect)
    ├── i18n
    │   ├── config.ts           # Locales, URL helpers
    │   ├── lingui.ts           # Catalog loader, I18n instances
    │   ├── negotiateLocale.ts  # Accept-Language parsing
    │   └── seo.ts              # head() builder
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Locale layout + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # Localized 404
```

<Steps>
<Step number={1} title="Install Dependencies">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider` and the macros (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: `lingui extract` to collect messages into catalogs.
- **@lingui/vite-plugin**: compiles `.po` catalogs on import, so `lingui compile` is not needed.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: transform the macros at build time.

</Step>
<Step number={2} title="Centralize Your Locale Configuration">

The default locale stays unprefixed (`/about`), other locales are prefixed (`/fr/about`).

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Configure Lingui">

The Lingui config reuses the same locale list, so the catalogs, the router and the sitemap never disagree.

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

Add the extraction scripts:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check` fails in CI when a component contains a message that was not extracted and committed.

</Step>
<Step number={4} title="Configure Vite">

With `@vitejs/plugin-react` v6, Babel is no longer built in. `@rolldown/plugin-babel` runs the Lingui macro plugin, and `linguiTransformerBabelPreset` only processes files that import a macro, which keeps builds fast.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="Load Catalogs per Locale">

The template literal in `import()` lets Vite emit **one chunk per catalog**, and the Lingui plugin compiles the `.po` file into it. A French visitor downloads the French catalog only.

The compiled messages are plain data, so they can be returned by a route loader, serialized into the HTML, and reused on hydration.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

For TypeScript to accept the `.po` import, declare the module once:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Create the Root Document">

The root route reads the optional locale param to set `lang` and `dir` on the server-rendered `<html>`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={7} title="Create the Locale Layout Route">

The `{-$locale}` folder creates an optional path segment: `/about` and `/fr/about` both match `/{-$locale}/about`. The layout rejects unknown prefixes, loads the catalog of the current locale, and provides a dedicated `I18n` instance.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="Utilize Translations in Your Pages">

Write the source text in the component. The macros turn it into message IDs at build time, and `lingui extract` picks it up.

- `<Trans>` for JSX content, including nested elements;
- `useLingui().t` for strings (attributes, props);
- `<Plural>` for ICU plurals.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> The dynamic `import()` of a catalog is cached by the module system, so calling `loadI18n` in several loaders does not download the catalog twice.

</Step>
<Step number={9} title="Extract and Translate Your Messages">

Run the extraction. Lingui writes every message into each locale catalog:

```bash
npm run i18n:extract
```

Then translate the `msgstr` of each entry:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> By default, message IDs are hashes of the source text: changing the English text creates a new message. Use explicit IDs (`<Trans id="about.title">About us</Trans>`) for texts that change often.

</Step>
<Step number={10} title="Build a Localized Link Component" isOptional={true}>

Every route lives under `{-$locale}`, so links must carry the current locale param.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="Change the Language of Your Content" isOptional={true}>

Render the switcher as **links**, so crawlers find every language version. `to="."` keeps the current page and replaces the locale param. The loader of the locale layout then fetches the new catalog.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
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
<Step number={12} title="Internationalize Your Metadata" isOptional={true}>

Each language version can rank on its own, provided every page exposes a translated `<title>` and description, a self-referencing canonical, one `hreflang` per locale plus `x-default`, Open Graph locales, and JSON-LD with `inLanguage`. The metadata is translated in the loader (step 8), and this helper builds the rest:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={13} title="Internationalize Your Sitemap and robots.txt" isOptional={true}>

The sitemap lists every URL of every locale, each entry declaring all its alternates with `xhtml:link`. `robots.txt` blocks private routes in every language and points to the sitemap. Remove `public/robots.txt` if the starter created one.

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={14} title="Pre-render Every Locale" isOptional={true}>

List every localized path so TanStack Start pre-renders all language versions at build time:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="Redirect First-Time Visitors and Handle 404 Pages" isOptional={true}>

A request middleware sends a visitor landing on `/` to their preferred language (cookie first, then `Accept-Language`). Deep links are never redirected, so crawlers and shared URLs always get the page they asked for.

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

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

For 404 pages, a catch-all route renders the localized `notFoundComponent` of the layout. Mark it `noindex`: React 19 hoists the `<meta>` into `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="Keep Your Macros, Cut the Runtime with Intlayer" isOptional={true}>

The [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/lingui.md) compat adapter keeps your source untouched: the macros compile exactly as before, and the resulting `i18n._()`, `useLingui()` and `<Trans>` calls are served by compiled Intlayer dictionaries. In the benchmark, the runtime drops from **~56.7 KB to ~9.8 KB** gzip.

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Add the plugin after the macro transform, so it aliases `@lingui/core` and `@lingui/react` to the adapter:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

Catalogs are synchronized with the [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) (JSON catalogs) or the [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md) (PO catalogs). See the full setup in the [Lingui compat guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/lingui.md), and a side-by-side comparison in [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/lingui_vs_intlayer-lingui.md).

</Step>
<Step number={17} title="Automate Your Translations Using Intlayer" isOptional={true}>

Lingui extracts messages, but filling dozens of catalogs by hand is where most of the time goes. Intlayer is **free** and **open source**, and its tooling works alongside Lingui:

- **Translate with AI** using your own API key and provider. See [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/autoFill.md) and the [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).
- **Keep your PO files** as the source of truth with the [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md).
- **Test missing translations** in CI. See [testing your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/testing.md).
- **Audit your deployed site** for missing `hreflang`, wrong canonicals and locale leaks with the [scan command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/scan.md).

</Step>
</Steps>

## Frequently Asked Questions

<FAQ>

<Question title="Does Lingui work with TanStack Start?">

Yes. Lingui has no dedicated TanStack Start integration, but its Vite plugin and Babel macro plugin work as is. The two points to get right are running the macros through `@rolldown/plugin-babel` (Vite 8 and `@vitejs/plugin-react` v6 no longer include Babel), and creating an `I18n` instance per locale instead of activating a global one during SSR.

</Question>
<Question title="Why not use the global i18n object from @lingui/core?">

On the server, one process renders many requests at the same time. Calling `i18n.activate("fr")` on a shared object would switch the language of a request rendering in English in parallel. `setupI18n` creates an isolated instance per locale, which is safe.

</Question>
<Question title="Do I need to run lingui compile?">

No. `@lingui/vite-plugin` compiles `.po` catalogs when they are imported. You only run `lingui extract` to collect new messages.

</Question>
<Question title="How do I translate the page title and meta description with Lingui?">

Declare them with the `msg` macro, and translate them in the route loader with ``i18n._(msg`...`)``. The loader returns plain strings, so `head()` stays synchronous and the values are serialized for hydration. Step 8 and step 12 show the full setup.

</Question>
<Question title="How big is Lingui in a TanStack Start bundle?">

The [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/tanstack.md) measures ~56.7 KB gzip for the runtime. With one catalog per locale loaded on demand, pages weigh ~115 KB against 111 KB without i18n. Importing every catalog statically raises it to ~152 KB.

</Question>
<Question title="Can I keep Lingui macros and migrate to Intlayer?">

Yes. The [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/lingui.md) adapter keeps the macros and swaps the runtime. You can then move components to `useIntlayer` one at a time. See the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md).

</Question>

</FAQ>
