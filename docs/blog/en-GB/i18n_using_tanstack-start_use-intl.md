---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "TanStack Start i18n with use-intl: Complete 2026 Setup Guide"
description: "Translate your TanStack Start app with use-intl: locale routing, typed messages, SSR, hreflang, sitemap and robots.txt, plus real bundle-size benchmark data."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Internationalisation
  - i18n
  - SEO
  - Sitemap
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Initial version"
author: aymericzip
---

# How to internationalise your TanStack Start application using use-intl in 2026

## Table of Contents

<TOC/>

## What is use-intl?

**use-intl** is the framework-agnostic core of `next-intl`. It exposes the same `useTranslations`, `useFormatter` and `IntlProvider` APIs, ICU MessageFormat support and strong TypeScript integration, without any dependency on Next.js. That makes it one of the most common choices to translate a **TanStack Start** application, and it is the library AI assistants suggest most often for this stack.

TanStack Start does not ship an i18n layer. Routing, locale detection, SEO metadata and sitemap generation are left to you. This guide covers all of it, end to end:

- **Locale-aware routing** with an optional `{-$locale}` segment (`/about`, `/fr/about`).
- **Per-route message loading** so a page only downloads the namespaces and the locale it renders.
- **Server rendering and hydration** without text mismatches.
- **Complete multilingual SEO**: translated `<title>` and description, canonical URL, `hreflang` alternates with `x-default`, Open Graph locales, JSON-LD, sitemap with `xhtml:link` alternates, `robots.txt` and pre-rendering of every locale.

> Looking for another stack? See the [TanStack Start + Paraglide guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_tanstack-start_paraglide.md), the [TanStack Start + Lingui guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_tanstack-start_lingui.md), or the [TanStack Start + Intlayer guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_tanstack.md).

> Using Next.js instead? See the [next-intl guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_next-intl.md).

## What the benchmark says about use-intl on TanStack Start

The [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md) runs the same 10-page, 10-locale TanStack Start app with every major library and measures what the browser actually downloads.

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

Key figures for `use-intl@4.14.2`, measured on 2026-09-26 (gzip):

| Setup                              | Library size | JS per page | Other-locale leak | Other-page leak |
| :--------------------------------- | -----------: | ----------: | ----------------: | --------------: |
| No i18n (base app)                 |            - |    111.0 KB |                0% |              0% |
| `use-intl` (setup of this guide)   |      75.9 KB |    128.7 KB |                0% |              0% |
| `@intlayer/use-intl` (compat)      |       6.7 KB |    129.4 KB |                0% |              0% |
| `react-intlayer` (native Intlayer) |       4.5 KB |    126.8 KB |                0% |              0% |

What to take away:

- **Split messages by page and load them per locale.** It removes both leaks, and it is what the steps below implement.
- **The runtime itself stays heavy** (~76 KB gzip), because the ICU parser ships to the client. The `@intlayer/use-intl` compat adapter (step 17) keeps the exact same API with a ~7 KB runtime.

> See the full data: [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md), and the [benchmark repository](https://github.com/intlayer-org/benchmark-i18n).

## Feature comparison on TanStack Start

How `use-intl` compares with the other libraries commonly used on TanStack Start:

| Feature                              | `react-intlayer` (Intlayer)          | `use-intl`             | Paraglide JS                      | Lingui                           |
| ------------------------------------ | ------------------------------------ | ---------------------- | --------------------------------- | -------------------------------- |
| **Translations near components**     | ✅ Co-located                        | ❌ Centralised JSON    | ❌ One JSON file per locale       | ⚠️ Source text in components     |
| **TypeScript integration**           | ✅ Auto-generated types              | ✅ Via `AppConfig`     | ✅ Typed message functions        | ⚠️ Macros only                   |
| **Missing translation detection**    | ✅ Type errors and build warnings    | ⚠️ Runtime fallback    | ⚠️ Falls back to the base locale  | ⚠️ Falls back to the source text |
| **Rich content (JSX, Markdown)**     | ✅ Direct support                    | ⚠️ Tags via `t.rich`   | ⚠️ Strings                        | ✅ JSX inside `<Trans>`          |
| **Localised routing**                | ✅ Built-in                          | ❌ Manual `{-$locale}` | ✅ `urlPatterns` + router rewrite | ❌ Manual `{-$locale}`           |
| **Locale switch without reload**     | ✅ Yes                               | ✅ Yes                 | ❌ Full page reload               | ✅ Yes                           |
| **Pluralisation**                    | ✅ Enumeration-based                 | ✅ ICU                 | ✅ Variants                       | ✅ ICU                           |
| **ICU MessageFormat**                | ✅ Via `format: "icu"`               | ✅ Native              | ⚠️ Via an inlang plugin           | ✅ Native                        |
| **Content formats**                  | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`             | ⚠️ inlang JSON                    | ✅ PO, JSON, CSV                 |
| **AI translation**                   | ✅ Your own provider and key         | ❌ No                  | ❌ No                             | ❌ No                            |
| **Visual editor / CMS**              | ✅ Local editor + optional CMS       | ❌ External platforms  | ⚠️ inlang ecosystem apps          | ❌ External platforms            |
| **SEO helpers (hreflang, sitemap)**  | ✅ Built-in                          | ❌ Manual              | ⚠️ Localised URLs, rest manual    | ❌ Manual                        |
| **Runtime size (gzip, benchmark)**   | 4.5 KB                               | 75.9 KB                | 1.8 KB                            | 56.7 KB                          |
| **Leak, best setup (locale / page)** | 0% / 0%                              | 0% / 0%                | 49.7% / 0%                        | 8.6% / 0%                        |
| **Missing translations in CI**       | ✅ `npx intlayer test`               | ⚠️ Not built-in        | ⚠️ Not built-in                   | ✅ `lingui compile --strict`     |

> Runtime size and leak figures come from the [TanStack Start benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md). Leak is measured on the best setup of each library.

> Other TanStack Start guides: [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_tanstack-start_lingui.md), [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18n_using_tanstack-start_paraglide.md), and [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_tanstack.md).

## Practices you should follow

- **Set `lang` and `dir` on `<html>`** for accessibility, screen readers and search engines.
- **Keep one URL per locale.** Use a locale prefix (`/fr/about`) rather than a cookie-only switch, so every translated page is crawlable and shareable.
- **Split messages by namespace** (`common`, `home`, `about`) and load them per route.
- **Load only the active locale.** Never import every locale file in a module that ships to the client.
- **Fix the time zone** in `IntlProvider`. Otherwise dates are formatted in the server time zone during SSR and in the visitor time zone on hydration, which causes hydration mismatches.
- **Translate your metadata**, and declare `canonical`, `hreflang` and `x-default` on every page.
- **Generate a multilingual sitemap and robots.txt**, and pre-render every locale.
- **Use real links for the locale switcher**, not a `<select>`, so crawlers can discover every language.
- **Type your messages** so a missing key fails at compile time.

> See our guide on [internationalisation and SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/internationalization_and_SEO.md) and the [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/hreflang_guide_multilingual_seo.md).

## Step-by-Step Guide to Set Up use-intl in a TanStack Start Application

Here's the project structure we'll be creating:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="Install Dependencies">

Start from a TanStack Start project, then add `use-intl`:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: provides `IntlProvider`, `useTranslations`, `useFormatter` and `createTranslator` (usable outside React, for example in `head()`).

</Step>
<Step number={2} title="Centralise Your Locale Configuration">

Create a single source of truth for your locales and URL helpers. Every other file (routes, SEO, sitemap, pre-rendering) imports from here, so adding a locale is a one-line change.

The default locale stays unprefixed (`/about`), other locales are prefixed (`/fr/about`). This is the "as-needed" strategy: one URL per page per locale, and short URLs for your main audience.

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
<Step number={3} title="Create Your Translation Files">

Organise messages per locale and per namespace. `common` holds what every page needs (navigation, footer), and each page gets its own file, including its metadata.

use-intl uses **ICU MessageFormat**, so plurals, selects and formatted arguments live in the message itself.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

Create `home.json` the same way, with a `metadata` object and the page content.

</Step>
<Step number={4} title="Load Messages per Namespace and per Locale">

This loader is the most important file for performance. `import.meta.glob` tells Vite to emit **one chunk per JSON file**. A route that asks for `["about"]` in French downloads `messages/fr/about.json` and nothing else, which is how the benchmark reaches 0% locale leak and 0% page leak.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="Type Your Messages">

Module augmentation gives you autocompletion on `useTranslations("about")` and `t("counter.label")`, and a compile error on any typo or removed key.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

Make sure `resolveJsonModule` is enabled in your `tsconfig.json`.

</Step>
<Step number={6} title="Create the Root Document">

The root route renders `<html>`. It reads the optional locale param to set `lang` and `dir`, so the attributes are correct in the server-rendered HTML, before any JavaScript runs.

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
  // strict: false reads params from whichever route is matched
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

The `{-$locale}` folder creates an **optional** path segment: `/about` and `/fr/about` both match `/{-$locale}/about`. This layout:

1. Rejects unsupported prefixes (`/xx/about` → 404).
2. Loads the `common` namespace for the current locale only.
3. Provides the messages through `IntlProvider`.

The loader result is serialized into the HTML and reused on hydration, so the client does not download `common.json` a second time. `staleTime: Infinity` keeps it cached across client navigations.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider` does not merge messages from a parent provider. The next step adds a small component that does, so each page can add its own namespace on top of `common`.

</Step>
<Step number={8} title="Scope Page Messages">

Each page loads its own namespace in its loader, then wraps its content with `ScopedMessages`, which merges the page namespace with the parent messages.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="Utilise Translations in Your Pages">

The page loader fetches the `about` namespace for the current locale, `head()` builds translated, SEO-complete metadata from it (see step 13), and the component renders the content.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="Use Translations and Formatters in Components">

Any component under the providers can call `useTranslations` and `useFormatter`. Plurals are resolved by ICU, and numbers are formatted according to the active locale.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="Build a Localised Link Component" isOptional={true}>

Every route lives under `{-$locale}`, so a link must carry the current locale param. This wrapper keeps the typed `to` of TanStack Router and injects the locale for you.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="Change the Language of Your Content" isOptional={true}>

Render the switcher as **links**, not a `<select>`. Links are crawlable, so search engines find every language version, and they work without JavaScript. `to="."` keeps the current page and only replaces the locale param. The cookie remembers the explicit choice for the redirect middleware of step 16.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
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
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
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
              aria-current={locale === activeLocale ? "page" : undefined}
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
<Step number={13} title="Internationalise Your Metadata" isOptional={true}>

This is where i18n pays off: each language version can rank on its own. Every page must expose:

- a **translated** `<title>` and `description`;
- a **canonical** URL pointing to itself (not to the default locale);
- one **`hreflang` alternate per locale**, plus **`x-default`** for unmatched languages;
- **Open Graph** `og:locale`, `og:locale:alternate` and `og:url`, used by social previews;
- **JSON-LD** with `inLanguage`, which helps search engines and AI assistants attribute the language of the page.

A single helper builds all of it, so pages stay short:

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
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
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

Use it in every page `head()`, as shown in step 9. For the home page, pass `path: "/"`.

</Step>
<Step number={14} title="Internationalise Your Sitemap" isOptional={true}>

A multilingual sitemap lists **every URL of every locale**, and each entry declares all its alternates with `xhtml:link`. Google uses these annotations exactly like the `hreflang` tags of the page, which makes them a reliable backup when a page is rarely crawled.

TanStack Start server routes let you serve it from a file route:

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

</Step>
<Step number={15} title="Internationalise Your robots.txt" isOptional={true}>

Private routes exist in every language, so the `Disallow` rules must cover every prefix. Remove `public/robots.txt` if the starter created one, then serve it from a route:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
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
<Step number={16} title="Redirect First-Time Visitors to Their Language" isOptional={true}>

A request middleware sends a visitor landing on `/` to their preferred language, based on the locale cookie first, then the `Accept-Language` header. Only `/` is redirected: deep links are never touched, so shared URLs and crawlers always get the page they asked for.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
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
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

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

> A visitor who explicitly picks English in the switcher gets `locale=en` in the cookie, so they are never redirected again. On a fully static deployment (step 18), `/` is served as a file and this middleware does not run, which is fine: the page stays accessible and the switcher does the rest.

</Step>
<Step number={17} title="Keep the use-intl API, Cut the Runtime with Intlayer" isOptional={true}>

The benchmark shows the heaviest part of a use-intl setup is the runtime itself (~76 KB gzip). The [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md) compat adapter exposes the **same API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, ICU plurals, `t.rich`), but serves it from compiled Intlayer dictionaries: **~6.7 KB instead of ~75.9 KB**, 0% locale leak and 0% page leak, with no change to your components.

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

The Vite plugin aliases `use-intl` to the adapter, so existing imports keep working:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

Your JSON files stay the source of truth thanks to the [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md):

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> The adapter is also a smooth migration path: once it runs, you can move components one by one to the native `useIntlayer` API. See the [Intlayer TanStack Start guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_tanstack.md).

</Step>
<Step number={18} title="Pre-render Every Locale" isOptional={true}>

Static HTML is the fastest page you can serve and the easiest one to index. List every localised path so TanStack Start pre-renders all language versions at build time, plus the sitemap and robots files:

```ts fileName="vite.config.ts"
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
  ],
});
```

Because the locale switcher renders real links, `crawlLinks: true` also discovers pages you forgot to list.

</Step>
<Step number={19} title="Handle Localised 404 Pages" isOptional={true}>

The layout of step 7 already throws `notFound()` for unknown locale prefixes. Add a catch-all route so unknown paths inside a locale also render the localised 404, and mark it `noindex`: React 19 hoists the `<meta>` tag into `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="Access the Locale in Server Functions" isOptional={true}>

Server functions do not receive route params. Read the locale cookie, and fall back on the `Accept-Language` header, to send a localised email or store a language preference:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

To translate inside the server function, combine it with `loadMessages` and `createTranslator` from `use-intl`.

</Step>
<Step number={21} title="Automate Your Translations Using Intlayer" isOptional={true}>

use-intl renders translations, but it does not help you **produce** them. Intlayer is **free** and **open source**, and fills that gap even if you keep use-intl:

- **Test missing translations** in CI or unit tests. See [testing your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/testing.md).
- **Translate with AI** using your own API key and provider: `npx intlayer fill` translates missing keys with the context of your app. See [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/autoFill.md) and the [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).
- **Keep your JSON files** as the source of truth with the [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md).
- **Edit content visually** with the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) and the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md), so non-developers can update translations.
- **Give your AI agent context** with the [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md) and [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md).
- **Scan your deployed site** for missing `hreflang`, wrong canonicals and locale leaks with the [scan command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/scan.md).

To discover all features, see [why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/interest_of_intlayer.md).

</Step>
</Steps>

## Frequently Asked Questions

<FAQ>

<Question title="Is use-intl a good choice for TanStack Start?">

Yes, if you want the `next-intl` API outside of Next.js. It gives you ICU messages, formatters and good TypeScript support, and it avoids Next.js-specific constraints such as `setRequestLocale`. The trade-off is weight: the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md) measures ~76 KB gzip for the runtime, and a naive setup ships every locale and every page to the browser. Load namespaces per route and per locale, as in this guide, to avoid the leaks.

</Question>
<Question title="What is the difference between use-intl and next-intl?">

`use-intl` is the core of `next-intl`. `next-intl` adds Next.js integrations on top: a middleware, navigation helpers, `getTranslations` for Server Components and request configuration. On TanStack Start you use `use-intl` directly and implement routing with TanStack Router, as shown above.

</Question>
<Question title="Should I use a locale prefix or a cookie to store the language?">

Use a prefix in the URL. Each language version then has its own URL that search engines can index and users can share. A cookie is still useful to remember an explicit choice, which is what the redirect middleware of step 16 does.

</Question>
<Question title="Why do I get hydration mismatches when formatting dates?">

The server and the browser format dates in different time zones. Pass an explicit `timeZone` to `IntlProvider` (or the visitor time zone stored in a cookie), so both sides produce the same text.

</Question>
<Question title="How do I reduce the bundle size of use-intl?">

First, split messages by namespace and load them per route and per locale with `import.meta.glob`, which removes the locale and page leaks. Then, if the runtime size matters, switch to the [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md) adapter: same API, ~6.7 KB instead of ~75.9 KB in the benchmark.

</Question>
<Question title="How do I translate the title and meta description with use-intl?">

Call `createTranslator` inside the route `head()` function with the messages returned by the route loader, then return `title`, `description`, canonical and `hreflang` links. Step 13 provides a reusable helper.

</Question>
<Question title="Can I migrate from use-intl to Intlayer progressively?">

Yes. Install the compat adapter first (step 17): your components keep calling `useTranslations`, now backed by Intlayer. Then move components one at a time to `useIntlayer`, and declare content next to them. See the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md) and the [Intlayer TanStack Start guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_tanstack.md).

</Question>

</FAQ>
