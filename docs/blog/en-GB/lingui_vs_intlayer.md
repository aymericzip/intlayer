---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs Intlayer: 2026 Benchmark & Comparison"
description: Two compiler-based i18n libraries measured on Next.js and TanStack Start. Bundle size, content leakage, component size, hydration, locale-switch reactivity and developer experience.
keywords:
  - Lingui
  - Intlayer
  - Internationalisation
  - i18n
  - Benchmark
  - Bundle size
  - Compiler
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | React & Next.js Internationalisation (i18n) Benchmark

Lingui and Intlayer are the two libraries in this benchmark that rely on a **compiler** rather than a pure runtime. Lingui extracts messages from macros at build time and compiles catalogues per locale. Intlayer compiles per-component dictionaries and tree-shakes them per locale. On paper they should be close. The numbers show where they diverge.

The data comes from [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), an open-source suite that builds the same application with each library and records what the browser actually downloads and executes.

<TOC/>

> **tl;dr**: Lingui is the closest to Intlayer on raw per-page JavaScript: **115-120 KB** vs **118.6 KB** on TanStack Start once lazy loading is configured, **148.6 KB** vs **141.3 KB** on Next.js. The gap opens elsewhere: a Lingui component compiled in isolation weighs **58-153 KB** against **6-8 KB** for Intlayer, hydration takes **28-34 ms** against **11-14 ms**, the source-locale fallback leaks **3-15%** of `en` strings into `fr` pages in every optimised setup, and reaching that optimised setup means extracting, compiling and hand-picking catalogues per route. Intlayer gets there with no configuration.

## In short

- **Lingui** - Macro-based (`` t`...` ``, `<Trans>`, `msg`), ICU MessageFormat, `.po` / JSON catalogues, `lingui extract` + `lingui compile` workflow. Compiles message IDs to short hashes, supports dynamic catalogue loading per locale. Well-established, framework-agnostic, strong translator tooling story around `.po`.
- **Intlayer** - Component-centric content model. `.content.ts` dictionaries sit next to the component they serve, a build-time compiler tree-shakes and lazy-loads them per component and per locale, strict TypeScript types are generated from your content, and missing translations fail at build time. Ships middleware, SEO helpers, a Visual Editor / CMS and AI-assisted translation.

| Library               | GitHub Stars                                                                                                                                                                   | Total Commits                                                                                                                                                                      | Last Commit                                                                                                                                         | First Version | NPM Version                                                                                                         | NPM Downloads                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Dec 2016      | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> Badges update automatically. Snapshots will vary over time.

## Side-by-side feature comparison

| Feature                                        | Intlayer (`react-intlayer` / `next-intlayer`)                                    | Lingui (`@lingui/core` / `@lingui/react`)                                                |
| ---------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Translations near components**               | ✅ Yes, `.content.ts` collocated with each component                             | ⚠️ Source strings inline in JSX via macros; translations in centralised `.po` catalogues |
| **TypeScript integration**                     | ✅ Strict types auto-generated from content                                      | ⚠️ Macros are typed; message IDs are not, missing catalogue entries are not surfaced     |
| **Missing translation detection**              | ✅ TypeScript error + build-time error/warning                                   | ⚠️ `lingui extract` reports stats; runtime falls back to the source string               |
| **Rich content (JSX / Markdown / components)** | ✅ Direct support                                                                | ✅ `<Trans>` with nested components                                                      |
| **ICU support**                                | ⚠️ WIP                                                                           | ✅ Yes (`plural`, `select`, `selectOrdinal` macros)                                      |
| **Formatting (dates, numbers, currencies)**    | ✅ `useNumber`, `useDate`, ... (Intl under the hood)                             | ✅ `i18n.date()`, `i18n.number()`                                                        |
| **Localized routing & middleware**             | ✅ Built-in proxy/middleware, `getMultilingualUrls`                              | ❌ Not core                                                                              |
| **SEO helpers (hreflang, sitemap, robots)**    | ✅ Built-in helpers                                                              | ❌ Manual                                                                                |
| **Synchronous server components**              | ✅ `useIntlayer` from `next-intlayer/server` works in any child server component | ⚠️ Needs an `I18n` instance per request, passed down or set via `setI18n`                |
| **Tree-shaking (ship only used content)**      | ✅ Per component, per locale, automated by the compiler                          | ⚠️ Per locale via `lingui compile`; per route needs manual catalogue splitting           |
| **Lazy loading**                               | ✅ `importMode: 'dynamic'` (one line of config)                                  | ⚠️ Manual `import()` of compiled catalogues + `i18n.load()` / `i18n.activate()`          |
| **Purge unused content**                       | ✅ Dead dictionaries are dropped at build time                                   | ✅ `lingui extract --clean` removes obsolete messages                                    |
| **Testing missing translations (CLI / CI)**    | ✅ `npx intlayer content test`                                                   | ⚠️ `lingui extract` stats (no failing exit code by default)                              |
| **Build pipeline**                             | ✅ One plugin (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)            | ⚠️ Macro plugin (Babel or SWC) + `extract` + `compile` steps                             |
| **AI-powered translation**                     | ✅ Built-in, uses your own provider keys                                         | ❌ No                                                                                    |
| **Visual Editor / CMS**                        | ✅ Free Visual Editor + optional CMS                                             | ❌ No (`.po` works with external TMS)                                                    |
| **MCP server & Agent Skills**                  | ✅ Yes                                                                           | ❌ No                                                                                    |
| **Ecosystem / community**                      | ⚠️ Smaller but growing fast                                                      | ✅ Established, framework-agnostic                                                       |

## The benchmark

### What was measured

The [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite builds **the same application** with each library: **10 pages** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identical components and identical content. Pages are measured in `en` and `fr`. Each library is implemented in up to four **loading strategies**, from the naive setup to the optimal one:

| Strategy           | Description                                                                      | Who does this                         |
| ------------------ | -------------------------------------------------------------------------------- | ------------------------------------- |
| **static**         | Every locale's compiled catalogue imported and loaded upfront                    | Quick prototypes, AI-generated code   |
| **dynamic**        | Only the active locale's catalogue is `import()`ed, but it holds all pages       | Most projects                         |
| **scoped-static**  | One catalogue per route, all bundled upfront                                     | Rare                                  |
| **scoped-dynamic** | One catalogue per route + lazy `import()`. Only the current page, current locale | Apps with a strict performance budget |

Intlayer has no "scoped" variant: the compiler scopes content **per component** automatically, so its `static` and `dynamic` rows are already scoped.

For each build, the suite records:

- **Lib size**: gzip size of an empty component that only imports the i18n library. The fixed cost of the runtime.
- **Page JS**: gzip JavaScript downloaded per page, averaged over all pages and locales.
- **Locale leak %**: share of translated strings found in the downloaded JS that belong to a locale the user is **not** viewing (fingerprinted on `en` and `fr`, so 50% means "the other measured locale is fully present"; with 10 locales bundled, the real waste is higher).
- **Page leak %**: share of translated strings found in the downloaded JS that belong to a page the user is **not** on.
- **Component avg**: average gzip size of each component compiled in isolation. Shows how much i18n runtime and catalogue a single component drags in.
- **E2E reactivity**: wall-clock time between selecting a new locale and `html[lang]` updating in the DOM (Playwright, 5 iterations).
- **Hydration**: React hydration phase duration.

> Numbers below come from the run dated **2026-09-12** with `@lingui/react` 6.6.0 and `intlayer` 9.5.1. The test application is deliberately small (a few dozen strings per locale), so leakage percentages describe a **pattern**: they grow with your content while the runtime cost stays fixed.

### Results on Next.js

| Library             | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| ------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (no i18n)  | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| Lingui              | static         |       11.9 KB |         207.4 KB |       50.0% |     90.0% |            73.3 KB |        15.3 ms |   15.2 ms |
| Lingui              | dynamic        |       11.9 KB |         145.4 KB |        2.8% |     89.9% |            19.9 KB |        15.7 ms |   12.7 ms |
| Lingui              | scoped-static  |       11.9 KB |         148.2 KB |        2.7% |     89.1% |            20.4 KB |        15.1 ms |   13.1 ms |
| Lingui              | scoped-dynamic |       11.9 KB |         148.6 KB |       14.8% |      0.0% |           152.6 KB |        16.1 ms |   14.8 ms |
| **`next-intlayer`** | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`** | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |

**How to read it**

- **Runtime cost.** An empty component costs 11.9 KB gzip with Lingui, 5.5 KB with Intlayer. On the full page, Lingui's best configuration sits at **+7.3 KB** over Intlayer (148.6 vs 141.3 KB); Intlayer sits at **+0.3 KB** over the base app.
- **The naive setup is expensive.** Loading every compiled catalogue upfront gives **207.4 KB per page**, +66 KB over the base app. Half of the fingerprinted strings belong to the wrong locale, 90% to the wrong page.
- **Dynamic loading fixes the locale, not the page.** With one catalogue per locale, page leakage stays at ~90%: the whole `fr` catalogue ships on every French page. Reaching 0% page leakage takes the `scoped-dynamic` setup: one catalogue per route, extracted and compiled separately, hand-picked in each page.
- **The source-locale fallback leaks.** Even in the optimised setups, **3-15% of `en` strings ship inside `fr` pages**. Lingui macros keep the source message available as a fallback, so it lands in the bundle next to the translation. Intlayer resolves fallbacks at build time and ships only the active locale.
- **Component size explodes in `scoped-dynamic`.** Each component compiled in isolation averages **152.6 KB**, because every route's catalogue is reachable from the component that imports it. The same component with `useIntlayer()` averages **6.9 KB**.

### Results on TanStack Start

| Library                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| --------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (no i18n)          | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |   21.6 ms |
| Lingui                      | static         |       11.2 KB |         152.2 KB |       50.0% |     90.0% |            58.0 KB |         3.9 ms |   19.9 ms |
| Lingui                      | dynamic        |       11.2 KB |         115.2 KB |        9.3% |      0.0% |            85.5 KB |         5.9 ms |   28.0 ms |
| Lingui                      | scoped-static  |       11.2 KB |         120.8 KB |        4.0% |      0.0% |           147.9 KB |         7.1 ms |   33.9 ms |
| Lingui                      | scoped-dynamic |       11.2 KB |         120.2 KB |        8.6% |      0.0% |            83.7 KB |        42.1 ms |   32.9 ms |
| **`intlayer`**              | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |     **3.2 ms** |   11.5 ms |
| **`intlayer`**              | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |   14.1 ms |
| `@intlayer/lingui` (compat) | dynamic        |       10.3 KB |         137.0 KB |        9.9% |      0.0% |            12.8 KB |         2.9 ms |   19.7 ms |

**How to read it**

- **On per-page JavaScript, Lingui wins by a hair.** `dynamic` Lingui lands at **115.2 KB**, 3.4 KB under Intlayer's 118.6 KB. Lingui's compiled catalogues with hashed IDs are compact, and the TanStack Start router splits routes well enough that page leakage is already 0% in the `dynamic` row.
- **Everything around the page size goes the other way.** Hydration takes **28-34 ms** with Lingui versus **11-14 ms** with Intlayer: `i18n.load()` + `i18n.activate()` run on the client before React can hydrate. Components compiled in isolation weigh **58-148 KB** versus **6-8 KB**. Locale leakage never reaches 0% (4-9%) because of the source-locale fallback.
- **Locale switching in the optimised setup is slow.** `scoped-dynamic` Lingui takes **42 ms** to update `html[lang]`: the new route catalogue has to be fetched, loaded and activated before the switch is visible. Intlayer switches in **3-4 ms** in both modes.
- **Intlayer's `static` row already has 0% page leakage** because only the dictionaries imported by the page's components are bundled. One line of config (`importMode: 'dynamic'`) removes the locale leakage too.
- **`@intlayer/lingui`** keeps Lingui's macro syntax and serves it from Intlayer dictionaries. It trades some page size (137 KB, since the macro runtime stays) for smaller components (12.8 KB) and faster hydration than native Lingui. It's a migration step, not the destination.

## Why the gap? Two compilers, two units of work

Both libraries compile. The difference is **what** they compile.

**Lingui compiles catalogues.** Macros in your source are extracted into a `.po` file per locale, then compiled into a JS module per locale. The unit is the **locale**. Splitting further, by route or by component, means creating multiple catalogues, configuring `lingui.config.ts` to extract each one from a different set of files, and loading the right one in each route. The runtime `I18n` instance is global; every `useLingui()` call subscribes the component to it.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # lingui compile output
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer compiles dictionaries.** Each `.content.ts` file is a dictionary bound to a key; the compiler resolves which component imports which key and emits, per dictionary and per locale, exactly the JSON that component needs. The unit is the **component**. Route scoping is a consequence: a page only pulls the dictionaries of the components it renders.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

That's why the `scoped-dynamic` pattern is a build output for Intlayer and a configuration project for Lingui.

> To get the `dynamic` row's numbers, set `dictionary.importMode: 'dynamic'` in `intlayer.config.ts`. See the [bundle optimisation doc](https://intlayer.org/en-GB/doc/concept/bundle-optimization).

## Developer experience

### Setup

**Lingui**

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

Then add `@lingui/babel-plugin-lingui-macro` (or `@lingui/swc-plugin`) to the bundler, run `lingui extract` after editing source, `lingui compile` before building, and wrap the tree in `<I18nProvider i18n={i18n}>`.

**Intlayer**

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

Add `intlayer()` to `vite.config.ts` (or `withIntlayer()` to `next.config.ts`) and wrap the tree in `<IntlayerProvider>`. No extract or compile step: dictionaries are built when the bundler runs.

### Component

**Lingui**

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

The English text lives in the component; the French one lives in `src/locales/fr/messages.po` under a hashed ID, after `lingui extract` has run. Forgetting to run it, or to `compile`, silently falls back to English.

**Intlayer**

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
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

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

Both locales sit in one file next to the component. A missing `fr` value is a build error, a wrong key is a TypeScript error.

### Outside of components

Metadata, loaders, server functions: anywhere without a React tree.

**Lingui**

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

A fresh `I18n` instance per call, the right catalogue loaded by hand, and `msg` + `i18n._()` instead of `t`. As the [benchmark notes](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md) put it, knowing when to use `t`, `` t` ` ``, `i18n.t()`, `msg` or `<Trans>` "is not intuitive".

**Intlayer**

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

## Keep the Lingui macros, get Intlayer dictionaries

`@intlayer/lingui` is a drop-in adapter for `@lingui/core` and `@lingui/react`. Macros keep compiling as before; the runtime `i18n._()` they compile to is served from Intlayer dictionaries, with `.po` sync plugins keeping your existing catalogues as a source of truth. ICU plurals and selects render identically.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

Keep `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` in the build, running before the Intlayer compiler. See the [Lingui compatibility doc](https://intlayer.org/en-GB/doc/compatibility/lingui).

## When to choose which?

- **Choose Lingui** if you want **ICU MessageFormat** with typed macros, your translators work in **`.po`** with an existing TMS pipeline, you prefer source strings inline in JSX, and your team is fine owning the extract / compile / catalogue-splitting workflow. Its per-page JS is competitive once lazy loading is set up.
- **Choose Intlayer** if you want **component-scoped content**, **strict TypeScript**, **build-time missing-key errors**, **zero-effort tree-shaking and lazy loading**, small components, fast hydration, instant locale switching, and built-in editorial tooling (Visual Editor, CMS, AI translation, MCP server). Especially relevant for large, modular codebases and design systems.
- **Choose `@intlayer/lingui`** if you are on Lingui and want to move to Intlayer dictionaries incrementally without touching macros.

## Related comparisons

- [next-intl vs Intlayer](https://intlayer.org/en-GB/blog/next-intl-vs-intlayer) (same benchmark)
- [i18next vs Intlayer](https://intlayer.org/en-GB/blog/i18next-vs-intlayer) (same benchmark)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/en-GB/blog/vue-i18n-vs-intlayer-benchmark) (same benchmark)
- [Compiler vs declarative i18n](https://intlayer.org/en-GB/blog/compiler-vs-declarative-i18n)

## GitHub STARs

GitHub stars are a strong indicator of a project's popularity, community trust, and long-term relevance. While not a direct measure of technical quality, they reflect how many developers find the project useful, follow its progress, and are likely to adopt it.

[![Star History Chart](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Conclusion

Lingui is the strongest runtime-plus-compiler library in this benchmark. Its compiled, hashed catalogues give it per-page JavaScript within a few KB of Intlayer, and even slightly under it on TanStack Start. If per-page bytes were the only metric, this would be a tie.

They aren't. Lingui's compiler stops at the locale; everything below that (per-route catalogues, lazy loading, keeping the fallback out of the bundle) is configuration, and the benchmark shows the cost of that boundary: components **10-20x larger**, hydration **2-3x slower**, **3-15% locale leakage** that never goes away, and a **42 ms** locale switch in the optimised setup. Intlayer's compiler works at the component level, so those numbers are **6-8 KB**, **11-14 ms**, **0%** and **3-4 ms** with no configuration.

All the raw data, the test apps and the scripts are in the [Benchmark Bloom repository](https://github.com/intlayer-org/benchmark-bloom). Run it yourself.

Refer to the ['Why Intlayer?' doc](https://intlayer.org/en-GB/doc/why) for more details.
