---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs Intlayer: 2026 Benchmark & Comparison"
description: react-i18next and next-i18next measured against Intlayer on Next.js and TanStack Start. Bundle size, content leakage, locale-switch reactivity and developer experience.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | React & Next.js Internationalization (i18n) Benchmark

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next` is the most widely used i18n framework in the JavaScript ecosystem. Through `react-i18next` and `next-i18next`, it powers a large share of React and Next.js applications. Intlayer is a compiler-based, component-scoped alternative.

This article compares them on measurements rather than feature lists. The numbers come from [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), an open-source suite that builds the same application with each library and records what the browser actually downloads.

<TOC/>

> **tl;dr**: `i18next` is the heaviest runtime in the benchmark: **+77 KB gzip per page** on Next.js in the naive setup, **+22 KB** after the full namespace + lazy-loading optimization. Intlayer adds **+0.3 KB**. Every `i18next` configuration except the fully scoped one ships **~90% of foreign-page strings**; Intlayer ships **0%** by default. Switching locale with a lazily-loaded backend cost **123-185 ms** with `react-i18next` versus **3-4 ms** with Intlayer. The `@intlayer/next-i18next` adapter keeps the `i18next` API and landed at **150.7 KB** per page versus **218.5 KB** for the original.

## In short

- **i18next / react-i18next / next-i18next** - Mature, plugin-rich, framework-agnostic. Namespaces, language detectors, backends, ICU via plugin, `<Trans>` for rich content. Content is centralized in `locales/{lng}/{ns}.json`. Powerful, but every optimization (namespace splitting, per-page loading, type safety) is configuration you own and maintain.
- **Intlayer** - Component-centric content model. `.content.ts` dictionaries sit next to the component they serve, a build-time compiler tree-shakes and lazy-loads them per component and per locale, strict TypeScript types are generated from your content, and missing translations fail at build time. Ships middleware, SEO helpers, a Visual Editor / CMS and AI-assisted translation.

| Library                 | GitHub Stars                                                                                                                                                                       | Total Commits                                                                                                                                                                          | Last Commit                                                                                                                                             | First Version | NPM Version                                                                                                           | NPM Downloads                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Dec 2015      | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> Badges update automatically. Snapshots will vary over time.

## Side-by-side feature comparison

| Feature                                        | Intlayer (`react-intlayer` / `next-intlayer`)                                    | i18next (`react-i18next` / `next-i18next`)                                      |
| ---------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Translations near components**               | ✅ Yes, `.content.ts` collocated with each component                             | ❌ No, centralized `locales/{lng}/{ns}.json`                                    |
| **TypeScript integration**                     | ✅ Strict types auto-generated from content                                      | ⚠️ Basic; strict keys need `CustomTypeOptions` augmentation and resource typing |
| **Missing translation detection**              | ✅ TypeScript error + build-time error/warning                                   | ⚠️ Runtime fallback (`saveMissing`, key echo)                                   |
| **Rich content (JSX / Markdown / components)** | ✅ Direct support                                                                | ⚠️ `<Trans>` with indexed placeholders                                          |
| **ICU support**                                | ⚠️ WIP                                                                           | ⚠️ Via plugin (`i18next-icu`)                                                   |
| **Pluralization**                              | ✅ Enumeration-based patterns                                                    | ✅ `_one` / `_other` suffixes (Intl.PluralRules)                                |
| **Formatting (dates, numbers, currencies)**    | ✅ `useNumber`, `useDate`, ... (Intl under the hood)                             | ⚠️ Interpolation formatters or manual `Intl.*`                                  |
| **Localized routing & middleware**             | ✅ Built-in proxy/middleware, `getMultilingualUrls`                              | ⚠️ Not core; custom middleware or third-party                                   |
| **SEO helpers (hreflang, sitemap, robots)**    | ✅ Built-in helpers                                                              | ❌ Manual                                                                       |
| **Synchronous server components**              | ✅ `useIntlayer` from `next-intlayer/server` works in any child server component | ⚠️ `getFixedT` on the page, then `t` passed as props                            |
| **Tree-shaking (ship only used content)**      | ✅ Per component, per locale, automated by the compiler                          | ⚠️ Manual: namespaces + `ns` list per page + backend                            |
| **Lazy loading**                               | ✅ `importMode: 'dynamic'` (one line of config)                                  | ✅ Via backend plugins (`i18next-resources-to-backend`, `i18next-http-backend`) |
| **Purge unused content**                       | ✅ Dead dictionaries are dropped at build time                                   | ❌ Not built-in                                                                 |
| **Testing missing translations (CLI / CI)**    | ✅ `npx intlayer content test`                                                   | ⚠️ `i18next-parser` / third-party                                               |
| **AI-powered translation**                     | ✅ Built-in, uses your own provider keys                                         | ❌ No (Locize is a separate paid service)                                       |
| **Visual Editor / CMS**                        | ✅ Free Visual Editor + optional CMS                                             | ❌ No (Locize / external platforms)                                             |
| **MCP server & Agent Skills**                  | ✅ Yes                                                                           | ❌ No                                                                           |
| **Ecosystem / community**                      | ⚠️ Smaller but growing fast                                                      | ✅ Largest and most mature                                                      |

## The benchmark

### What was measured

The [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite builds **the same application** with each library: **10 pages** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identical components and identical content. Pages are measured in `en` and `fr`. Each library is implemented in up to four **loading strategies**, from the naive setup to the optimal one:

| Strategy           | Description                                                                           | Who does this                         |
| ------------------ | ------------------------------------------------------------------------------------- | ------------------------------------- |
| **static**         | Every locale and every page bundled together (`resources` inlined in `init()`)        | Quick prototypes, AI-generated code   |
| **dynamic**        | Only the active locale is loaded through a backend, but all namespaces at once        | Most projects                         |
| **scoped-static**  | One namespace per route, all bundled upfront                                          | Rare                                  |
| **scoped-dynamic** | One namespace per route + backend lazy loading. Only the current page, current locale | Apps with a strict performance budget |

Intlayer has no "scoped" variant: the compiler scopes content **per component** automatically, so its `static` and `dynamic` rows are already scoped.

For each build, the suite records:

- **Lib size**: gzip size of an empty component that only imports the i18n library. The fixed cost of the runtime.
- **Page JS**: gzip JavaScript downloaded per page, averaged over all pages and locales.
- **Locale leak %**: share of translated strings found in the downloaded JS that belong to a locale the user is **not** viewing (fingerprinted on `en` and `fr`, so 50% means "the other measured locale is fully present"; with 10 locales bundled, the real waste is higher).
- **Page leak %**: share of translated strings found in the downloaded JS that belong to a page the user is **not** on.
- **Component avg**: average gzip size of each component compiled in isolation. Shows how much i18n runtime a single component drags in.
- **E2E reactivity**: wall-clock time between selecting a new locale and `html[lang]` updating in the DOM (Playwright, 5 iterations).
- **Hydration**: React hydration phase duration.

> Numbers below come from the run dated **2026-09-12** with `next-i18next` 16.3.0, `react-i18next` 17.0.13 and `intlayer` 9.5.1. The test application is deliberately small (a few dozen strings per locale), so leakage percentages describe a **pattern**: they grow with your content while the runtime cost stays fixed.

### Results on Next.js (`next-i18next`)

Pick the metrics and the libraries you care about:

<I18nBenchmark framework="nextjs" vertical/>

| Library                           | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| --------------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (no i18n)                | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| `next-i18next`                    | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |        16.4 ms |   15.6 ms |
| `next-i18next`                    | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |        15.4 ms |   27.7 ms |
| `next-i18next`                    | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |        16.4 ms |   14.7 ms |
| `next-i18next`                    | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |        15.9 ms |   15.1 ms |
| **`next-intlayer`**               | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`**               | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |
| `@intlayer/next-i18next` (compat) | static         |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |        10.7 ms |   11.3 ms |
| `@intlayer/next-i18next` (compat) | dynamic        |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |        11.9 ms |   10.6 ms |

**How to read it**

- **Runtime cost.** The `i18next` core plus `react-i18next` is the largest runtime measured: **19.7 KB gzip** for an empty component, versus 5.5 KB for `next-intlayer`.
- **The naive setup is expensive.** Inlining `resources` in `init()` produces **218.5 KB per page**, +77.5 KB over the base app. Every page carries every namespace.
- **Optimizing is a long road.** Moving to a backend (`dynamic`) saves 49 KB but still leaks **90% of foreign-page strings** and, in this configuration, half of the strings belong to the wrong locale. Splitting into per-route namespaces on top of it (`scoped-dynamic`) finally reaches 0% leakage at **163.4 KB**, still **+22.4 KB per page** over Intlayer's 141.3 KB, which needed no configuration at all.
- **Component size.** A component calling `useTranslation()` compiles to 26-79 KB depending on the setup; the same component with `useIntlayer()` compiles to 6.9 KB.
- **Hydration** spikes to 27.7 ms in the `dynamic` setup: the i18next instance initializes and resolves its backend on the client before React can hydrate.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Full table, every library and every strategy, in the [Next.js benchmark report](https://intlayer.org/doc/benchmark/nextjs).

### Results on TanStack Start (`react-i18next`)

Same test app on TanStack Start with plain `react-i18next`, which removes the Next.js-specific wiring from the comparison.

<I18nBenchmark framework="tanstack" vertical/>

| Library            | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| ------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (no i18n) | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |   21.6 ms |
| `react-i18next`    | static         |       18.4 KB |         180.3 KB |       50.0% |     89.8% |            24.3 KB |        12.9 ms |   85.1 ms |
| `react-i18next`    | dynamic        |       18.4 KB |         136.4 KB |       23.1% |     89.8% |            24.8 KB |       123.1 ms |   32.9 ms |
| `react-i18next`    | scoped-static  |       18.4 KB |         184.2 KB |       50.7% |     89.8% |            25.3 KB |       185.1 ms |   25.2 ms |
| `react-i18next`    | scoped-dynamic |       18.4 KB |         127.2 KB |        0.0% |      0.0% |            26.7 KB |        17.6 ms |   11.3 ms |
| **`intlayer`**     | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |     **3.2 ms** |   11.5 ms |
| **`intlayer`**     | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |   14.1 ms |

**How to read it**

- The naive `react-i18next` app ships **+69 KB per page** over the base app, and hydration takes **85 ms** (4x the base) because the whole resource tree is parsed and registered on the client before the first render.
- **Locale switching is where lazy loading bites.** When resources are loaded on demand through a backend, changing the language triggers a network round-trip before `html[lang]` updates: **123 ms** in `dynamic`, **185 ms** in `scoped-static`. Intlayer updates the DOM in **3-4 ms** in both modes: the locale change is applied immediately and is never blocked on a network round-trip.
- The fully optimized `scoped-dynamic` setup reaches 0% leakage at 127.2 KB, still **+8.6 KB** over Intlayer's `dynamic` row, and it took a route-to-namespace map, a resources backend and a Suspense boundary per route to get there.
- Intlayer's `static` row already has **0% page leakage** because only the dictionaries imported by the page's components are bundled. Enabling `importMode: 'dynamic'` removes the locale leakage too.
- **Component size**: 24-27 KB per component with `react-i18next` versus 6-8 KB with Intlayer. `useTranslation()` binds every component to the global i18next instance.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Full table in the [TanStack Start benchmark report](https://intlayer.org/doc/benchmark/tanstack).

## Why the gap? Global instance vs. compiled dictionaries

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next` was designed in 2012 as a runtime: a global instance holds a resource store, plugins extend it, and `t()` looks keys up at render time. This is what makes it so flexible (any framework, any backend, any format) and also what makes it costly:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # must know it needs ["common", "about"]
```

The instance cannot know which keys a component will request, so it keeps whatever namespaces you tell it to load. Optimizing means **you** split catalogs into namespaces, **you** list the namespaces each page needs, and **you** keep that list correct as components move between pages.

The bill grows on two axes at once, pages and locales:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

As the [benchmark notes](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md) put it: "maintaining type safety and knowing exactly which namespace should be included on which page is a nightmare".

Intlayer removes the instance. Content is declared next to the component, and the compiler resolves the dependency graph at build time:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` sees which component imports which dictionary, bundles only those, only for the active locale, and drops the ones nothing imports. The "scoped-dynamic" pattern becomes the output of the build instead of a discipline the team has to maintain.

> To get the `dynamic` row's numbers, set `dictionary.importMode: 'dynamic'` in `intlayer.config.ts`. See the [bundle optimization doc](https://intlayer.org/doc/concept/bundle-optimization).

## Developer experience

### Setup

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
};
```

Plus a client-side `I18nProvider` that re-creates the instance with the same options, a `generateStaticParams`, and a `namespaces` list on every page.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

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
```

</Tab>
</Tabs>

### Client component

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> The page rendering this component must load the `about` namespace, and `t("counter.label")` is a plain string until you augment `CustomTypeOptions`.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

`label` and `increment` are typed; a typo is a TypeScript error, a missing French value is a build error.

</Tab>
</Tabs>

### Synchronous server component

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

The page calls `i18n.getFixedT(locale, "about")` and threads `t` and `locale` down as props.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>

## Keep the i18next API, get Intlayer's output

You don't have to rewrite components to get the benchmark numbers above. `@intlayer/i18next`, `@intlayer/react-i18next` and `@intlayer/next-i18next` are drop-in adapters: `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, `_one` / `_other` plurals, context suffixes and `returnObjects` keep working, served from Intlayer dictionaries compiled by the Intlayer compiler.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

In the benchmark, the compat build of the same Next.js app went from **218.5 KB to 150.7 KB** per page, from **78.5 KB to 9.7 KB** per component, from **~90% page leakage to 0%**, and hydration from 15.6 ms to 11.3 ms, with the application code untouched. Your existing `locales/{lng}/{ns}.json` files can remain the source of truth through the JSON sync plugin.

See the migration guides: [i18next](https://intlayer.org/doc/migration/i18next), [react-i18next](https://intlayer.org/doc/migration/react-i18next), [next-i18next](https://intlayer.org/doc/migration/next-i18next).

## When to choose which?

<AccordionGroup>
<Accordion header="Choose i18next">

You need its plugin ecosystem (detectors, backends, ICU, Locize), you localize outside React too (Node services, vanilla JS, other frameworks), your team already knows it, or a translation platform expects `locales/{lng}/{ns}.json`. Budget the time to namespace catalogs, wire a backend and maintain the page-to-namespace map if performance matters.

</Accordion>
<Accordion header="Choose Intlayer">

You want **component-scoped content**, **strict TypeScript**, **build-time missing-key errors**, **zero-effort tree-shaking and lazy loading**, instant locale switching, synchronous server components, and built-in editorial tooling ([Visual Editor](https://intlayer.org/doc/concept/editor), [CMS](https://intlayer.org/doc/concept/cms), [AI translation](https://intlayer.org/doc/concept/auto-fill), [MCP server](https://intlayer.org/doc/mcp-server)). Especially relevant for large, modular codebases and design systems.

</Accordion>
<Accordion header="Choose the @intlayer/*-i18next adapters">

You are already on i18next and want the bundle and reactivity gains without a rewrite. Your `locales/{lng}/{ns}.json` files stay the source of truth. Measured side by side in [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Why is i18next so much heavier than the other libraries?">

It was designed as a framework-agnostic runtime: a global instance, a plugin pipeline, a resource store, a key resolver. That flexibility is compiled into every bundle. An empty component that only imports the library costs **19.7 KB gzip** with `next-i18next` against **5.5 KB** with `next-intlayer`, and the cost is paid on every page whatever your content weighs.

</Question>

<Question title="Does lazy loading with a backend fix it?">

It fixes the bytes, not the latency. Moving to `i18next-resources-to-backend` saves ~49 KB per page but puts a network round-trip on the locale switch: **123 ms** in the `dynamic` setup and **185 ms** in `scoped-static`, against **3-4 ms** with Intlayer. Hydration also jumps to 27.7 ms because the instance resolves its backend before React can hydrate.

</Question>

<Question title="Can I reach 0% leakage with i18next?">

Yes, with `scoped-dynamic`: one namespace per route, a resources backend and a page-to-namespace map you maintain by hand. It lands at 163.4 KB per page on Next.js, still **+22 KB** over Intlayer's 141.3 KB, which needed no configuration. See [bundle optimization](https://intlayer.org/doc/concept/bundle-optimization).

</Question>

<Question title="Do I have to rewrite my components to migrate?">

No. `@intlayer/i18next`, `@intlayer/react-i18next` and `@intlayer/next-i18next` keep `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, `_one` / `_other` plurals, context suffixes and `returnObjects`. One plugin line in `next.config.ts` or `vite.config.ts`. Step by step in the [next-i18next migration guide](https://intlayer.org/doc/migration/next-i18next).

</Question>

<Question title="What happens to my i18next plugins?">

Backends and language detectors are accepted but inert: there is nothing left to load or detect at runtime. Locale detection becomes Intlayer's routing config (URL prefix, cookie, header). If your app fetches translations from a CMS at request time, use the [Intlayer CMS](https://intlayer.org/doc/concept/cms) or `intlayer pull` / `push` instead.

</Question>

</FAQ>

## Related comparisons

Same benchmark, other libraries:

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer)
- [Lingui vs Intlayer](https://intlayer.org/blog/lingui-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/blog/react-i18next-vs-react-intl-vs-intlayer)

Going further on i18next:

- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next), the adapters measured on the same app
- [Is i18next outdated?](https://intlayer.org/blog/is-i18next-outdated)
- [Using Intlayer with i18next](https://intlayer.org/blog/intlayer-with-i18next) and [with react-i18next](https://intlayer.org/blog/intlayer-with-react-i18next)
- [How to internationalize a Next.js app with next-i18next](https://intlayer.org/blog/nextjs-internationalization-using-next-i18next)

Reference docs:

- [Next.js benchmark report](https://intlayer.org/doc/benchmark/nextjs) and [TanStack Start benchmark report](https://intlayer.org/doc/benchmark/tanstack)
- Compat adapters: [i18next](https://intlayer.org/doc/compatibility/i18next), [react-i18next](https://intlayer.org/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/doc/compatibility/next-i18next)
- Migration guides: [i18next](https://intlayer.org/doc/migration/i18next), [react-i18next](https://intlayer.org/doc/migration/react-i18next), [next-i18next](https://intlayer.org/doc/migration/next-i18next)
- [Bundle optimization](https://intlayer.org/doc/concept/bundle-optimization) and [the Intlayer compiler](https://intlayer.org/doc/compiler)
- [Per-component vs centralized i18n](https://intlayer.org/blog/per-component-vs-centralized-i18n)
- [Compiler-driven vs declarative i18n](https://intlayer.org/blog/compiler-vs-declarative-i18n)

## GitHub STARs

GitHub stars are a strong indicator of a project's popularity, community trust, and long-term relevance. While not a direct measure of technical quality, they reflect how many developers find the project useful, follow its progress, and are likely to adopt it.

[![Star History Chart](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Conclusion

`i18next` earned its position: it runs everywhere, it has a plugin for everything, and it has been maintained for over a decade. The benchmark shows the price of that runtime-first design. The setup most teams ship costs **+70-77 KB gzip per page**, leaks **~90% of foreign-page content**, and a lazily-loaded locale switch takes **over 100 ms**. Reaching 0% leakage is possible, but it takes a backend, a namespace per route and a map you maintain by hand, and it still lands **+9-22 KB** above Intlayer.

Intlayer moves that work into the compiler. Per-component dictionaries, per-locale lazy loading and dead-content purging are build outputs, not conventions. On the same app: **+0.3 KB per page**, **0% leakage**, components **3-10x smaller**, and a locale switch in **3-4 ms**.

All the raw data, the test apps and the scripts are in the [Benchmark Bloom repository](https://github.com/intlayer-org/benchmark-bloom). Run it yourself.

Refer to the ['Why Intlayer?' doc](https://intlayer.org/doc/why) for more details.
