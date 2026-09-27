---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "TanStack Start i18n with Paraglide JS: 2026 Setup Guide"
description: "Translate your TanStack Start app with Paraglide JS: URL strategy, router rewrite, SSR middleware, hreflang, sitemap and robots.txt, plus real benchmark data."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Internationalization
  - i18n
  - SEO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Initial version"
author: aymericzip
---

# How to internationalise your TanStack Start application using Paraglide JS in 2026

## Table of Contents

<TOC/>

## What is Paraglide JS?

**Paraglide JS** (by inlang) is a **compiler-based** i18n library. Instead of shipping a runtime that looks up keys in a JSON object, it compiles each message into a typed JavaScript function (`m.about_title()`). Unused messages can be dropped by the bundler, and a typo in a key is a compile error.

Paraglide is the i18n approach used in the official TanStack Router examples, and it integrates with TanStack Start through three pieces:

- a **Vite plugin** that compiles messages and the runtime into `src/paraglide`;
- a **server middleware** that resolves the locale of each request;
- a **router rewrite** that maps localised URLs (`/fr/about`) to your route tree (`/about`), so you do not need a `$locale` segment.

This guide sets up all three, then covers everything Paraglide leaves to you: `lang` and `dir`, locale switcher, translated metadata, `canonical`, `hreflang` with `x-default`, Open Graph, JSON-LD, sitemap, `robots.txt`, pre-rendering and localised 404 pages.

> Looking for another stack?

- [TanStack Start + use-intl guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_tanstack-start_use-intl.md)
- [TanStack Start + Lingui guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_tanstack-start_lingui.md)
- [TanStack Start + Intlayer guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_tanstack.md)

> Comparing the two compiler-based approaches? Read [is Intlayer lighter than Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/is_intlayer_lighter_than_paraglide.md).

> To understand where these libraries come from, read the history of JavaScript i18n.

- [The history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md)

## What the benchmark says about Paraglide on TanStack Start

The [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md) runs the same 10-page, 10-locale TanStack Start app with every major library and measures what the browser actually downloads.

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

Key figures for `@inlang/paraglide-js@2.15.1`, measured on 2026-09-26 (gzip):

| Setup              | Library size | JS per page | Other-locale leak | Other-page leak | Page load |
| :----------------- | -----------: | ----------: | ----------------: | --------------: | --------: |
| No i18n (base app) |            - |    111.0 KB |                0% |              0% |   15.7 ms |
| Paraglide JS       |       1.8 KB |    125.1 KB |             49.7% |              0% |   22.1 ms |
| `react-intlayer`   |       4.5 KB |    126.8 KB |                0% |              0% |   14.8 ms |
| `use-intl`         |      75.9 KB |    128.7 KB |                0% |              0% |   17.4 ms |
| Lingui             |      56.7 KB |    120.2 KB |              8.6% |              0% |   21.9 ms |

What to take away:

- **The runtime is tiny, and pages do not leak.** The runtime is generated for your configuration, and messages are imported where they are used.
- **Locales leak.** Each message function contains every locale, so about half of the translated strings shipped to a page are in languages the visitor does not use. The more locales you add, the bigger this share gets.
- **Page load is the slowest of the group**, partly because the locale is resolved through strategies on each call rather than read from a React context.

> See the full data: [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md), and the [benchmark repository](https://github.com/intlayer-org/benchmark-i18n).

## Feature comparison on TanStack Start

How Paraglide JS compares with the other libraries commonly used on TanStack Start:

| Feature                              | `react-intlayer` (Intlayer)          | `use-intl`             | Paraglide JS                      | Lingui                           |
| ------------------------------------ | ------------------------------------ | ---------------------- | --------------------------------- | -------------------------------- |
| **Translations near components**     | ✅ Co-located                        | ❌ Centralised JSON    | ❌ One JSON file per locale       | ⚠️ Source text in components     |
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
| **SEO helpers (hreflang, sitemap)**  | ✅ Built-in                          | ❌ Manual              | ⚠️ Localised URLs, rest manual    | ❌ Manual                        |
| **Runtime size (gzip, benchmark)**   | 4.5 KB                               | 75.9 KB                | 1.8 KB                            | 56.7 KB                          |
| **Leak, best setup (locale / page)** | 0% / 0%                              | 0% / 0%                | 49.7% / 0%                        | 8.6% / 0%                        |
| **Missing translations in CI**       | ✅ `npx intlayer test`               | ⚠️ Not built-in        | ⚠️ Not built-in                   | ✅ `lingui compile --strict`     |

> Runtime size and leak figures come from the [TanStack Start benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md). Leak is measured on the best setup of each library.

> Other TanStack Start guides:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_tanstack.md)

## Practices you should follow

- **Set `lang` and `dir` on `<html>`** from the resolved locale, on the server.
- **Keep one URL per locale** with a prefix strategy (`/fr/about`), so every language version is indexable.
- **Put `url` first in your locale strategy**, so the URL is the source of truth, and crawlers get the page they asked for.
- **Use flat, descriptive message keys** (`about_title`) that map cleanly to function names.
- **Commit your `messages/*.json`, not the generated `src/paraglide` folder**, to avoid merge conflicts on generated files.
- **Translate your metadata**, and declare `canonical`, `hreflang` and `x-default` on every page.
- **Generate a multilingual sitemap and robots.txt**, and pre-render every locale.
- **Use real links for the locale switcher**, so crawlers discover every language.

- [internationalisation and SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/internationalization_and_SEO.md)
- [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/hreflang_guide_multilingual_seo.md)

## Step-by-Step Guide to Set Up Paraglide JS in a TanStack Start Application

Here is the project structure we will be creating:

```bash
.
├── project.inlang
│   └── settings.json          # Locales and message format
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Generated, git-ignored
    ├── server.ts              # Paraglide middleware
    ├── router.tsx             # URL rewrite
    ├── i18n
    │   ├── config.ts          # Site URL, helpers
    │   └── seo.ts             # head() builder
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / and /fr
        ├── about.tsx          # /about and /fr/about
        ├── $.tsx              # Localized 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Notice there is no `$locale` folder: the router rewrite removes the prefix before route matching.

<Steps>
<Step number={1} title="Install Dependencies">

Start from a TanStack Start project, then initialise Paraglide. The init command creates `project.inlang/settings.json`, a first `messages/en.json` and installs the package.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: the compiler and its Vite plugin. There is no runtime package to install: the runtime is generated into your project.

</Step>
<Step number={2} title="Configure Your Locales">

`project.inlang/settings.json` is the single source of truth for locales. The message format plugin reads one JSON file per locale.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Configure the Vite Plugin and the URL Strategy">

The plugin compiles messages on every change. Three options matter for TanStack Start:

- **`strategy`**: the ordered list of places to read the locale from. `url` first makes the URL the source of truth. `cookie` and `preferredLanguage` are used by the middleware when the URL does not decide.
- **`urlPatterns`**: how a locale maps to a URL. Non-default locales are listed first, because the first matching pattern wins. Here the default locale stays unprefixed (`/about`), and other locales are prefixed (`/fr/about`).
- **`outputStructure: "message-modules"`**: one module per message, which lets the bundler drop messages a page does not import.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Default locale last: it matches every remaining URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

Add the generated folder to `.gitignore`. It is rebuilt on `dev` and `build`:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Create Your Translation Files">

Each key becomes a function exported from `src/paraglide/messages`. Flat, snake_case keys give the cleanest function names. Variables use `{name}` placeholders.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

Plurals use the variants syntax of the inlang message format:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="Add the Server Middleware">

The middleware resolves the locale of each request with your strategy, and makes it available to `getLocale()` for the whole server render, through an `AsyncLocalStorage` scope. That is what makes concurrent requests in different languages safe.

In TanStack Start, wrap the default server entry:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="Rewrite Localized URLs in the Router">

TanStack Router's `rewrite` option translates URLs at the boundary of the router:

- **input**: `/fr/about` is de-localised to `/about` before matching, so a single `about.tsx` route serves every language;
- **output**: every generated `href` (links, redirects, navigation) is localised for the active locale, so `<Link to="/about">` renders `/fr/about` on a French page.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> Because links are localised by the rewrite, you do not need a custom `LocalizedLink` component: use TanStack Router's `Link` as usual.

</Step>
<Step number={7} title="Create the Root Document">

`getLocale()` returns the locale resolved by the middleware on the server, and the locale from the URL in the browser, so `lang` and `dir` are identical in the server HTML and after hydration.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

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

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="Utilize Translations in Your Pages">

Messages are plain functions: import `m`, call the function, pass variables as an object. Everything is typed, including the variables.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> A message function also accepts an explicit locale: `m.about_title({}, { locale: "fr" })`. It is useful in server code that renders a language other than the one of the request, such as emails.

</Step>
<Step number={9} title="Change the Language of Your Content" isOptional={true}>

Render the switcher as **links** with `localizeHref`, so crawlers discover every language. `setLocale` stores the choice in the cookie and reloads the page in the new language: a full reload is the expected Paraglide behaviour, because message functions read the locale on each call instead of subscribing to a React state.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Router pathname, already de-localised by the rewrite: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Sets the cookie and reloads on the localized URL
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="Internationalize Your Metadata" isOptional={true}>

Each language version can rank on its own, provided every page exposes:

- a **translated** `<title>` and `description`;
- a **canonical** URL pointing to itself;
- one **`hreflang` alternate per locale**, plus **`x-default`**;
- **Open Graph** `og:locale`, `og:locale:alternate` and `og:url`;
- **JSON-LD** with `inLanguage`.

Paraglide's `localizeUrl` builds the alternate URLs from your `urlPatterns`, so they can never drift from the real routing:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** De-localized path, e.g. "/about" */
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
        href: getAbsoluteUrl(path, baseLocale),
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
<Step number={11} title="Internationalize Your Sitemap" isOptional={true}>

A multilingual sitemap lists every URL of every locale, and each entry declares all its alternates with `xhtml:link`:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
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

</Step>
<Step number={12} title="Internationalize Your robots.txt" isOptional={true}>

Private routes exist in every language, so `Disallow` rules must cover every localised path. Remove `public/robots.txt` if the starter created one, then serve it from a route:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

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
<Step number={13} title="Pre-render Every Locale" isOptional={true}>

List the localised path of every page so TanStack Start pre-renders all language versions. `localizeHref` is generated code with no browser dependency, so it can run in `vite.config.ts`, but the file only exists after a first compilation. Listing the paths by hand, as below, avoids that ordering issue:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Default locale "en" is unprefixed
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... same options as step 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Because the switcher renders real links, `crawlLinks: true` also discovers pages you forgot to list.

</Step>
<Step number={14} title="Handle Localized 404 Pages" isOptional={true}>

With the rewrite, `/fr/does-not-exist` is matched as `/does-not-exist`, and `getLocale()` still returns `fr`, so the root `notFoundComponent` of step 7 renders in French. A catch-all route makes sure deep paths also reach it. Mark the page `noindex`: React 19 hoists the `<meta>` into `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="Access the Locale in Server Functions" isOptional={true}>

Server functions run inside the Paraglide middleware scope, so `getLocale()` works there too:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Compare with Intlayer" isOptional={true}>

There is no drop-in adapter from Paraglide to Intlayer, because both follow the same idea: compile content at build time and ship as little runtime as possible. The differences are in what reaches the browser and how content is organized:

- **Locales**: Intlayer loads [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dynamic_dictionaries/index.md) per locale (0% locale leak in the benchmark), while each Paraglide message function carries every locale (49.7%).
- **Content organisation**: content can live in `.content.ts` files next to each component, or in centralised files. See [per-component vs centralised i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/per-component_vs_centralized_i18n.md).
- **Locale switch**: content is read from a React context, so switching locale re-renders without a reload.
- **Generated code**: nothing is generated inside `src`, so there is nothing to regenerate before a commit.

If you come from another library rather than Paraglide, the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md) keep the `use-intl`, `next-intl`, `react-i18next`, `react-intl` or Lingui API and swap the runtime.

See [is Intlayer lighter than Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/is_intlayer_lighter_than_paraglide.md) and the [Intlayer TanStack Start guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_tanstack.md).

</Step>
<Step number={17} title="Automate Your Translations Using Intlayer" isOptional={true}>

Paraglide renders translations, but it does not help you **produce** them. Intlayer is **free** and **open source**, and its tooling helps even on a Paraglide project:

- **Translate with AI** using your own API key and provider. See [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/autoFill.md) and the [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).
- **Keep your JSON files** as the source of truth with the [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md).
- **Test missing translations** in CI. See [testing your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/testing.md).
- **Scan your deployed site** for missing `hreflang`, wrong canonicals and locale leaks with the [scan command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/scan.md).

</Step>
</Steps>

## Frequently Asked Questions

<FAQ>

<Question title="Is Paraglide JS a good choice for TanStack Start?">

It is a solid one: it is used in the official TanStack Router examples, it has the smallest runtime of the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md) (~1.8 KB gzip), and messages are fully typed. The trade-offs are that every message function contains all locales, which leaks roughly half of the translated strings to visitors of other languages, and that switching locale reloads the page.

</Question>
<Question title="Do I need a $locale route segment with Paraglide?">

No. The router `rewrite` removes the locale prefix before route matching and adds it back to generated links, so a single `about.tsx` serves `/about`, `/fr/about` and `/es/about`.

</Question>
<Question title="Why does changing the language reload the page?">

Message functions read the locale when they are called, they are not subscribed to a React state. `setLocale` therefore reloads the page by default, so every message re-renders in the new language. You can pass `{ reload: false }`, but then you must re-render the tree yourself.

</Question>
<Question title="Should I commit the generated src/paraglide folder?">

It is better not to. The folder is regenerated on every `dev` and `build`, and committing it causes merge conflicts on generated files. Commit `messages/*.json` and `project.inlang/settings.json` instead.

</Question>
<Question title="How do I add hreflang tags with Paraglide?">

Use `localizeUrl` to build one absolute URL per locale in the route `head()`, and add an `x-default` pointing to the base locale. Step 10 provides a reusable helper, and step 11 adds the same alternates to the sitemap.

</Question>
<Question title="Does Paraglide tree-shake unused translations?">

Unused **messages** are dropped when you use `outputStructure: "message-modules"`, so other pages' content does not leak. Unused **locales** are not: each message function contains every translation, which is why the benchmark measures a 49.7% locale leak.

</Question>
<Question title="Can I migrate from Paraglide to Intlayer?">

Yes. Both are compiler-based, so the mental model is close. Keep your JSON files with the [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md), then replace `m.key()` calls with `useIntlayer`, page by page. See the [Intlayer TanStack Start guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_tanstack.md).

</Question>

</FAQ>
