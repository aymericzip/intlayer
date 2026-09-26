---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "i18next vs @intlayer/i18next: Same API, Different Bundle"
description: What changes when a React or Next.js app keeps its i18next, react-i18next and next-i18next calls but serves them through the @intlayer/i18next adapters. Per-page JavaScript, component size, leakage and hydration measured on the same code, plus what the adapters keep, ignore and cannot replace.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | Same API, Different Bundle

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/i18next`, `@intlayer/react-i18next` and `@intlayer/next-i18next` are compat adapters. They expose the `i18next` API your code already uses (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) and serve it from dictionaries compiled by Intlayer. The components do not change. The runtime underneath them does.

This article measures that swap on the same Next.js application, built once with `next-i18next` and once with `@intlayer/next-i18next`. The numbers come from [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). For `i18next` and Intlayer compared as libraries, read [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18next_vs_intlayer.md). This one is about what the adapter changes when you keep your code as it is.

<TOC/>

> **tl;dr**: On the same Next.js app, replacing `next-i18next` with `@intlayer/next-i18next` took the per-page JavaScript from **218.5 KB to 150.7 KB** gzip (naive setup) and beat the fully optimized `next-i18next` setup (163.4 KB) by **12.7 KB**. The average component went from **78.5 KB to 9.7 KB**, foreign-page string leakage from **~90% to 0%**, hydration from **15.6 ms to 11.3 ms**, and the runtime from **19.7 KB to 9.4 KB**. No component was edited; one provider file was. `i18next` plugins (backends, language detectors) are accepted but do nothing: there is nothing left to load or detect at runtime.

## What `@intlayer/i18next` is

`i18next` is a runtime. `i18n.init({ resources })` or a backend plugin loads `locales/{lng}/{ns}.json` into a global instance; `useTranslation("about")` subscribes the component to it; `t("title")` looks the key up at render time. Namespaces, lazy loading, per-page namespace lists and type safety are all yours to configure and maintain.

The adapters keep the API and replace the instance:

1. **Import aliasing.** `createNextI18nPlugin()` from `@intlayer/next-i18next/plugin` (or `withI18next`) wraps `withIntlayer` and adds Webpack / Turbopack aliases so that `next-i18next`, `react-i18next` and `i18next` resolve to their `@intlayer/*` counterparts. On Vite, `reactI18nextVitePlugin()` from `@intlayer/react-i18next/plugin` does the same. No import is renamed.
2. **JSON as source of truth.** The `syncJSON` plugin reads your existing `locales/{lng}/{ns}.json` with `format: "i18next"` (so `{{name}}`, `$t()` nesting, `_one` / `_other` and context suffixes are parsed correctly) and writes translations back when the CLI or the CMS updates them.
3. **Call-site binding.** The Intlayer optimize pass rewrites `useTranslation("about")` into a call that receives the `about` dictionary directly, in the active locale. The component stops reaching the global store.

```tsx fileName="components/About.tsx"
// Your code, unchanged
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="What the compiler emits (simplified)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

That rewrite is what moves the component-size and page-leakage columns below.

## What the adapters keep, ignore, and do not replace

| `i18next` API                                                                   | With `@intlayer/*`                                                                                       |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ Kept. Bound to the `ns` dictionary at build time; keys typed against your content                     |
| `t("key", { name })`, `{{interpolation}}`, `$t(key)` nesting                    | ✅ Kept                                                                                                  |
| `key_one` / `key_other` plurals, `key_male` context, `returnObjects`            | ✅ Kept. Plurals evaluated with `Intl.PluralRules`                                                       |
| `<Trans>` with `components`, `<1>...</1>` numbered tags, `values`               | ✅ Kept                                                                                                  |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ Kept                                                                                                  |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ Kept. `changeLanguage` drives Intlayer's locale                                                       |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ Kept                                                                                                  |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` calls the plugin's `init` and returns; backends and detectors have nothing to load or detect  |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` is **ignored** with a dev warning; remove the JSON imports to get the bundle gains        |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ Renders an `IntlayerProvider`; the `i18n` prop is ignored. On App Router, pass the locale (see below) |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ Returns the expected shape and loads nothing. Safe to keep, safe to delete                            |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ Kept                                                                                                  |
| `next-i18next.config.js`                                                        | ⚠️ Not read. Locales come from `intlayer.config.ts`                                                      |
| Bare `useTranslation()` with no namespace                                       | ✅ Works against the whole-file `translation` dictionary (`splitKeys: false`)                            |

## The benchmark

### What was measured

The [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite builds **the same application** with each setup: **10 pages** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identical components and identical content. Pages are measured in `en` and `fr`.

`next-i18next` was built in four loading strategies, from every locale's JSON imported into `resources` (`static`) to one namespace per route, lazily loaded through a backend (`scoped-dynamic`). The adapter was built on the **same components as the naive setup**, with `next.config.ts`, `intlayer.config.ts` and the provider file changed. It has no "scoped" variant: the compiler scopes content per component.

For each build, the suite records:

- **Lib size**: gzip size of an empty component that only imports the i18n library.
- **Page JS**: gzip JavaScript downloaded per page, averaged over all pages and locales.
- **Locale leak %**: share of translated strings in the downloaded JS that belong to a locale the user is **not** viewing.
- **Page leak %**: share of translated strings in the downloaded JS that belong to a page the user is **not** on.
- **Component avg**: average gzip size of each component compiled in isolation.
- **E2E reactivity**: wall-clock time between selecting a new locale and `html[lang]` updating in the DOM (Playwright, 5 iterations).
- **Hydration**: React hydration phase duration.

> Numbers below come from the run dated **2026-09-12** with `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) and `@intlayer/next-i18next` 9.5.1. The test application is deliberately small (a few dozen strings per locale), so leakage percentages describe a **pattern**: they grow with your content while the runtime cost stays fixed.

### Results on Next.js

Pick the metrics and the libraries you care about:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                        | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ---------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)           | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-i18next`               | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |        16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |        15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |        16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |        15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |    **9.4 KB** |     **150.7 KB** |    **0.0%** |  **0.0%** |         **9.7 KB** |    **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |    **9.4 KB** |     **150.7 KB** |    **0.0%** |  **0.0%** |         **9.7 KB** |    **11.9 ms** | **10.6 ms** |
| `next-intlayer` (native)     | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)     | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**How to read it**

- **68 KB less per page from the naive setup.** `resources: { en, fr, ... }` ships every locale and every namespace on every page: **218.5 KB**. The adapter build of the same components lands at **150.7 KB**. It also beats `next-i18next`'s best configuration (163.4 KB, one namespace per route, lazily loaded) by 12.7 KB, because the `i18next` runtime alone weighs 19.7 KB against 9.4 KB.
- **Leakage goes to 0% without touching a component.** Every `next-i18next` setup except the fully scoped one ships ~90% of foreign-page strings. The `dynamic` row is worse than it looks: it drops page leakage nowhere and gains **50% locale leakage**, because the per-locale backend still pulls the whole `translation` namespace. The adapter reaches 0% / 0% from the naive code.
- **Components: 8x smaller.** A `useTranslation()` component compiled in isolation averages **78.5 KB** with `resources` inlined and **26-27 KB** with a backend, because `t` is bound to the global store. With the adapter it averages **9.7 KB**.
- **Hydration and switching are faster.** Hydration goes from 15.6 ms to **11.3 ms** (and from 27.7 ms in the `dynamic` setup, where the backend fetch sits on the critical path). Locale switching goes from 15-16 ms to **11-12 ms**.
- **The adapter is not the native runtime.** `next-intlayer` lands at **141.3 KB**, +0.3 KB over the base app. The adapter carries the `i18next` API surface (interpolation dialect, plural and context suffix resolution, `<Trans>` tag parsing) on top of Intlayer's core: 9.4 KB and +9.4 KB per page over native. It is the bridge, not the destination.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Full table, every library and every strategy, in the [Next.js benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/nextjs.md).

> The `react-i18next` adapter on Vite / TanStack Start was not part of this run. The `react-i18next` baseline on TanStack Start is in [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18next_vs_intlayer.md): 127-184 KB per page and a 123-185 ms locale switch when the backend is lazy.

## Why the numbers move

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Nothing in `components/` changed, so the gains come from what `useTranslation` is bound to.

**With `i18next`**, the binding is the global instance. Whatever was loaded into it (all locales in `static`, the active locale's whole namespace in `dynamic`) is reachable from every component that calls `useTranslation()`. The bundler cannot split below what the instance holds, and the runtime cannot know which keys a component will ask for.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # every page's strings
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

Whatever the instance holds ships to every page, and the waste grows on two axes, pages and locales:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

**With `@intlayer/next-i18next`**, the binding is the dictionary. `syncJSON` turns each namespace file into a dictionary; the optimize pass hands the component the dictionary it names, as an import the bundler can trace and split per page and per locale.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # unchanged, still the source of truth
│   └── fr/translation.json
├── .intlayer/                        # generated: one dictionary per namespace, per locale
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← unchanged
```

`i18n/i18n.ts` and its `resources` import become dead code. That is the 68 KB.

## Migration in three steps

<Steps>
<Step number={1} title="Install">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

The command detects `i18next` / `react-i18next` / `next-i18next`, installs `intlayer`, the framework package (`next-intlayer` or `react-intlayer`), the matching `@intlayer/*` adapter and `@intlayer/sync-json-plugin`, and pre-fills `intlayer.config.ts`. Keep the original packages installed: they are peer dependencies and provide the types.

</Step>
<Step number={2} title="Point Intlayer at your locale files">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // i18next dialect: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // One file per namespace: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

If you have a single `translation.json` per locale (i18next's default namespace), set `splitKeys: false` so the whole file stays one dictionary and a bare `useTranslation()` keeps resolving.

</Step>
<Step number={3} title="Add the plugin">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

On the App Router, client components get their locale from the `[locale]` segment. The adapter's `I18nextProvider` takes no locale, so replace it once in your provider file:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Every component below it still calls `useTranslation()`.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` wraps `vite-intlayer` and aliases `react-i18next` and `i18next`. For a non-React project, `i18nextVitePlugin()` from `@intlayer/i18next/plugin` aliases `i18next` alone.

</Tab>
</Tabs>

</Step>
</Steps>

### What you can delete afterwards

| File / pattern                                         | Why                                                                        |
| ------------------------------------------------------ | -------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` and the JSON imports      | Ignored by the adapter. This is where the 68 KB was                        |
| `i18next-http-backend`, `i18next-resources-to-backend` | Nothing to fetch at runtime                                                |
| `i18next-browser-languagedetector`                     | Locale detection is Intlayer's routing config (URL prefix, cookie, header) |
| `serverSideTranslations()` in `getStaticProps`         | Returns an empty shape; harmless, but dead                                 |
| `next-i18next.config.js`                               | Not read. Locales live in `intlayer.config.ts`                             |
| Per-page `ns: [...]` lists                             | The compiler picks namespaces per component                                |

### What you gain beyond bytes

- **Typed keys.** `useTranslation("about")` is typed against the compiled `about` dictionary; `t("does.not.exist")` is a TypeScript error instead of a returned key string.
- **`npx intlayer test`** fails CI on a missing key in any locale. **`npx intlayer fill`** translates the missing ones with your own provider key (OpenAI, Anthropic, Mistral, Gemini...) and writes them back into `locales/{lng}/{ns}.json`.
- **Visual Editor and CMS** operate on the same JSON, so translators edit through a UI and the files update.
- **Incremental move to `.content.ts`.** Any component can switch from `useTranslation("about")` to `useIntlayer("about")` with a co-located content file. JSON and `.content.ts` dictionaries coexist.

## Limits to know before you start

<AccordionGroup>
<Accordion header="Backends and detectors are inert">

`i18n.use(HttpBackend)` calls the plugin's `init` and nothing else. If your app relied on fetching translations from a CMS at runtime, that flow is gone; use the [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) or the `intlayer pull` / `push` commands instead. Locale detection becomes Intlayer's routing config (URL prefix, cookie, header).

</Accordion>
<Accordion header="resources is ignored, not merged">

Unlike some other adapters, `@intlayer/i18next` does not use inline `resources` as a fallback. Every key must exist in the synced dictionaries, which `intlayer test` verifies.

</Accordion>
<Accordion header="App Router needs the provider edit">

One file, shown above. Pages Router with `appWithTranslation` needs nothing.

</Accordion>
<Accordion header="next-i18next.config.js is not read">

`localePath`, `fallbackLng`, `reloadOnPrerender` and friends have no equivalent; locales and fallback come from `intlayer.config.ts`.

</Accordion>
<Accordion header="The adapter is not free">

9.4 KB of runtime and +9.4 KB per page over `next-intlayer`. Once every component has moved to `useIntlayer`, drop it.

</Accordion>
</AccordionGroup>

## When to use which?

<AccordionGroup>
<Accordion header="Stay on i18next">

Your app depends on runtime backends (translations served by a CMS at request time), on the plugin ecosystem, or on a non-React target the adapters do not cover.

</Accordion>
<Accordion header="Use @intlayer/*">

You are on `react-i18next` / `next-i18next` and want the 68 KB, the 8x smaller components, 0% leakage, typed keys and CI checks without a rewrite. This is the entry point for an existing `i18next` codebase.

</Accordion>
<Accordion header="Go native (next-intlayer / react-intlayer)">

For new projects, or once the adapter has done its job. It is the lightest of the three (5.5 KB, +0.3 KB per page) and unlocks synchronous server components and per-component `.content.ts` files. Start with [Intlayer with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md) or [with Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Where do the 68 KB come from?">

From `resources: { en, fr, ... }`. The naive `next-i18next` setup imports every locale's JSON into `init()`, so every page carries every namespace in every language: **218.5 KB** per page. The adapter never bundles that block; it hands each component the dictionary it names, in the active locale.

</Question>

<Question title="Do my <Trans> components keep working?">

Yes, with `components`, numbered `<1>...</1>` tags and `values`. So do `{{interpolation}}`, `$t(key)` nesting, `key_one` / `key_other` plurals (evaluated with `Intl.PluralRules`), context suffixes and `returnObjects`.

</Question>

<Question title="What if I use a single translation.json per locale?">

Set `splitKeys: false` in the `syncJSON` plugin. The whole file stays one dictionary and a bare `useTranslation()` keeps resolving against it.

</Question>

<Question title="Is this the same as migrating to Intlayer?">

No, it is the bridge. The adapter keeps the `i18next` API and costs 9.4 KB of runtime; native `next-intlayer` costs 5.5 KB and adds synchronous server components and co-located `.content.ts` files. You can move component by component, since JSON and `.content.ts` dictionaries coexist.

</Question>

<Question title="Can translators keep working the way they do today?">

Yes. `locales/{lng}/{ns}.json` stays the source of truth: `syncJSON` reads it with the i18next dialect and writes translations back when the CLI or the CMS updates them.

</Question>

</FAQ>

## Related comparisons

Same adapter series:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-intl_vs_intlayer-next-intl.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/vue-i18n_vs_intlayer-vue-i18n.md)

The libraries compared head to head:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18next_vs_intlayer.md), same benchmark
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/react-i18next_vs_react-intl_vs_intlayer.md)
- [Is i18next outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/is_i18next_outdated.md)

Reference docs:

- Compat adapters: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/next-i18next.md)
- Migration guides: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_next-i18next_to_intlayer.md)
- [Next.js benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/nextjs.md) and [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/tanstack.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md) and [the Intlayer compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) and [AI translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/autoFill.md)

## Conclusion

`i18next` is the heaviest runtime in this benchmark, and the adapters remove most of it without asking you to leave its API. On the same Next.js app that is **68 KB less per page** than the naive setup, **12.7 KB less** than the best hand-optimized one, **8x smaller components**, **0% leakage** and **4 ms of hydration**, for a config file, a plugin line and one provider edit. Backends and detectors become no-ops, `resources` is ignored rather than merged, and the native `next-intlayer` runtime remains 9 KB lighter still.

All the raw data, the test apps and the scripts are in the [Benchmark Bloom repository](https://github.com/intlayer-org/benchmark-bloom). Run it yourself.

Refer to the ['Why Intlayer?' doc](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md) for more details.
