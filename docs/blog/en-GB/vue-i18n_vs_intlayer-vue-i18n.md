---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs @intlayer/vue-i18n: Same API, Different Bundle"
description: What changes when a Vue 3 app keeps its vue-i18n calls but serves them through the @intlayer/vue-i18n compat adapter. Per-page JavaScript, runtime size, component size and leakage measured on the same Vite + Vue code, plus what the adapter keeps, ignores and cannot replace.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | Same API, Different Bundle

`@intlayer/vue-i18n` is a compat adapter: it exposes the `vue-i18n` API (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) and serves it from dictionaries compiled by Intlayer. Your `.vue` files do not change. What `t("footer.github")` is bound to does.

This article measures that swap on the same Vite + Vue 3 application, built once with `vue-i18n` and once with the adapter. The numbers come from [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). For `vue-i18n` and Intlayer compared as libraries, read [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) and the [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark). This one is about what the adapter changes when you keep your components as they are.

<TOC/>

> **tl;dr**: On the same Vite + Vue 3 app, replacing `vue-i18n` with `@intlayer/vue-i18n` took the per-page JavaScript from **134.9 KB to 47.0 KB** gzip (the app without i18n weighs 41.3 KB), the runtime from **24.3 KB to 7.9 KB**, the average component from **196 KB to 8.4 KB**, and foreign-page string leakage from **90% to 0%**, with no `.vue` file edited. `createI18n({ messages })` keeps working as a fallback; remove the JSON imports to get the numbers above. SFC `<i18n>` blocks and runtime `setLocaleMessage()` are the two features that do not carry over.

## What `@intlayer/vue-i18n` is

`vue-i18n` is a runtime. `createI18n({ messages: { en, fr, ... } })` builds a global instance holding every message of every locale; `useI18n()` binds each component to it; `t("footer.github")` walks the tree at render time. That design is what makes SFC `<i18n>` blocks and `setLocaleMessage()` possible, and it is also why every component's dependency graph includes the whole tree.

`@intlayer/vue-i18n` keeps the API and replaces the tree:

1. **Import aliasing.** `vueI18nVitePlugin()` from `@intlayer/vue-i18n/plugin` wraps `vite-intlayer` and adds a `resolve.alias` so that `vue-i18n` resolves to `@intlayer/vue-i18n`. No import is renamed.
2. **JSON as source of truth.** The `syncJSON` plugin reads your existing `locales/{locale}.json` with `format: "vue-i18n"` (so `{name}`, `{0}` list interpolation and `"car | cars"` pipe plurals are parsed correctly) and writes translations back when the CLI or the CMS updates them.
3. **Call-site binding.** The Intlayer optimise pass rewrites `useI18n()` call sites so the component receives the dictionaries its keys name, in the active locale, as imports the bundler can trace and split.

```vue fileName="src/components/Footer.vue"
<!-- Your code, unchanged -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="What the compiler emits (simplified)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

The component no longer reaches the global message tree. It reaches `footer`. That is why the component-size column below drops from 196 KB to 8 KB.

## What the adapter keeps, ignores, and does not replace

| `vue-i18n` API                                                      | With `@intlayer/vue-i18n`                                                                                         |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Kept. `t` keys are typed against your dictionaries                                                             |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Kept. `{name}`, `{0}` and pipe-separated plurals resolve as before                                             |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Kept. `datetimeFormats` / `numberFormats` from `createI18n()` are honoured, backed by native `Intl`            |
| `i18n.global.locale.value = "fr"`                                   | ✅ Kept. A `WritableComputedRef` backed by Intlayer's client; reactivity behaves as before                        |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Kept. Registered on `app.config.globalProperties` by `app.use(i18n)`                                           |
| `v-t` directive                                                     | ✅ Kept                                                                                                           |
| `legacy: true`                                                      | ✅ Accepted                                                                                                       |
| `createI18n({ messages })`                                          | ⚠️ `messages` are used as a **runtime fallback** with a dev warning. Remove the JSON imports for the bundle gains |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Warn and do nothing. Runtime message loading is replaced by build-time dictionaries                            |
| SFC `<i18n>` custom blocks                                          | ❌ Not read. Move those messages into the locale JSON (or a `.content.ts` next to the component)                  |
| `@nuxtjs/i18n`                                                      | ⚠️ Separate adapter, see the [Nuxt compat doc](https://intlayer.org/doc/compatibility/nuxtjs-i18n)                |

## The benchmark

### What was measured

The [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite builds **the same Vite + Vue 3 application** with each setup: **10 pages** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identical components and identical content. Pages are measured in `en` and `fr`.

Both were built in the **static** configuration, the one most Vue projects ship: for `vue-i18n`, every locale's JSON imported and passed to `createI18n({ messages })`; for the adapter, the same components with `vite.config.ts` and `intlayer.config.ts` changed and the `messages` import removed. Native `vue-intlayer` is included for reference.

For each build, the suite records:

- **Lib size**: gzip (and minified) size of an empty component that only imports the i18n library.
- **Page JS**: gzip JavaScript downloaded per page, averaged over all pages and locales.
- **Locale leak %**: share of translated strings in the downloaded JS that belong to a locale the user is **not** viewing.
- **Page leak %**: share of translated strings in the downloaded JS that belong to a page the user is **not** on.
- **Component avg**: average gzip size of each component compiled in isolation.
- **E2E reactivity**: wall-clock time between selecting a new locale and `html[lang]` updating in the DOM (Playwright, 5 iterations).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Numbers below come from the run dated **2026-09-12** with `vue-i18n` 11.4.0 and `@intlayer/vue-i18n` 9.5.1. The test application is deliberately small (a few dozen strings per locale), so leakage percentages describe a **pattern**: they grow with your content whilst the runtime cost stays fixed.

### Results on Vite + Vue 3

| Setup                    | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |  Page load |
| ------------------------ | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ---------: |
| **base** (no i18n)       | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |    10.8 ms |
| `vue-i18n`               | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | static   |    **7.9 KB** |    **23.2 KB** |      **47.0 KB** |   **15.0%** |  **0.0%** |         **8.4 KB** |     **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (native)  | static   |        3.9 KB |        11.1 KB |          57.1 KB |       56.8% |      0.0% |             7.7 KB |         4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |        3.9 KB |        11.1 KB |          59.8 KB |       50.0% |      0.0% |             6.5 KB |         4.0 ms |    15.8 ms |

> The base app's page-leak column is left blank: with no i18n library, the fingerprinting picks up hard-coded strings in shared chunks and the number is not meaningful.

**How to read it**

- **88 KB less per page, same components.** `vue-i18n` takes the 41.3 KB app to **134.9 KB**. The adapter build of the same components lands at **47.0 KB**, 5.7 KB over the base app. Most of the difference is the 74.9 KB of `src/locales` that `createI18n({ messages })` pulls into every page and the adapter never bundles as a block.
- **The runtime shrinks 3x.** An empty component that only imports `vue-i18n` costs **24.3 KB gzip / 83.2 KB minified**: `@intlify/core-base`, the message compiler and the runtime. The adapter costs **7.9 KB / 23.2 KB**, most of it Intlayer's core plus the `vue-i18n` API surface.
- **Components: 23x smaller.** A `useI18n()` component compiled in isolation averages **196 KB**, because `t` is bound to the instance that holds every message of every locale. With the adapter, the same component averages **8.4 KB**: it reaches its own dictionary.
- **Leakage.** `vue-i18n` ships every locale and every page's strings on every page: 50% locale leakage (on the two fingerprinted locales; with ten locales bundled the real waste is higher), 90% page leakage. The adapter drops page leakage to **0%** because each component only imports its dictionaries. Locale leakage sits at 15% in this `static` run; `importMode: 'dynamic'` is the setting that removes it, and that configuration was not part of this Vue run.
- **Reactivity and page load.** Locale switching is cheap for both (1.5–2.8 ms); Vue's reactivity system makes it so once messages are in memory. Page load goes from 13.6 ms to **9.3 ms**, in line with 88 KB less JavaScript to parse.
- **About the native rows.** `vue-intlayer` in this run bundled every locale in `static` mode and landed at 57.1 KB with a 3.9 KB runtime; the adapter's synced dictionaries carried fewer foreign-locale strings, hence the lower per-page figure. The native runtime remains the lightest of the three, and its `.content.ts` model is where SFC `<i18n>` blocks find their equivalent.

## Why the numbers move

Nothing in `src/components/` changed, so the gains come from what `useI18n` is bound to.

**With `vue-i18n`**, the binding is the global instance. `createI18n({ messages: { en, fr, ... } })` is one import that holds everything; every component that calls `useI18n()` can reach all of it, so the bundler cannot split below the instance. Optimising means _you_ split `en.json` by route, call `setLocaleMessage()` in a router guard, and keep the route-to-file map correct as components move.

```bash
.
├── locales
│   ├── en.json                    # every page's strings
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**With `@intlayer/vue-i18n`**, the binding is the dictionary. `syncJSON` turns each top-level key of `en.json` into a dictionary; the optimise pass hands the component the ones its keys name, as imports the bundler traces and splits per page.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # unchanged, still the source of truth
│   └── fr.json
├── .intlayer/                     # generated: one dictionary per top-level key, per locale
└── src
    ├── i18n.ts                    # createI18n({})   ← messages import removed
    ├── main.ts                    # app.use(i18n)    ← unchanged
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← unchanged
```

The `messages` import in `i18n.ts` is the one line to delete. That is the 88 KB.

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

The command detects `vue-i18n`, installs `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` and `@intlayer/sync-json-plugin`, and pre-fills `intlayer.config.ts`. Keep `vue-i18n` installed: it is a peer dependency and provides the types.

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
    // "static" bundles every locale; "dynamic" loads the active one on demand
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // vue-i18n dialect: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` stays where it is. Each top-level key (`footer`, `hero`...) becomes a dictionary.

</Step>
<Step number={3} title="Add the plugin and drop the messages import">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// Before: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` wraps `vite-intlayer` (content watching, dictionary compilation, the optimize pass) and aliases `vue-i18n` to the adapter. Removing the `messages` import is what drops the 88 KB; leaving it in keeps the app working but ships both.

</Step>
</Steps>

### What you can delete afterwards

| File / pattern                                   | Why                                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------------------- |
| `import en from "./locales/en.json"` and friends | Used only as a fallback by the adapter. This is where the 88 KB was          |
| `setLocaleMessage()` in router guards            | No-op. Per-route loading is the compiler's job now                           |
| `@intlify/unplugin-vue-i18n`                     | Not needed: it precompiles messages and SFC blocks the adapter does not read |
| SFC `<i18n>` blocks                              | Not read; move them to the locale JSON or to a `.content.ts` per component   |

### What you gain beyond bytes

- **Typed keys.** `t("footer.github")` is typed against the compiled `footer` dictionary; a wrong path is a TypeScript error instead of the key rendered as text.
- **`npx intlayer test`** fails CI on a missing key in any locale. **`npx intlayer fill`** translates the missing ones with your own provider key (OpenAI, Anthropic, Mistral, Gemini...) and writes them back into `locales/{locale}.json`.
- **Visual Editor and CMS** operate on the same JSON, so non-developers edit through a UI and the files update.
- **Incremental move to `.content.ts`.** Any component can switch from `useI18n()` to `useIntlayer("footer")` with a co-located content file. JSON and `.content.ts` dictionaries coexist and merge.

## Limits to know before you start

- **SFC `<i18n>` blocks are not read.** If your messages live inside components, they need to move to the locale files (or to `.content.ts`, which is the same idea with types).
- **Runtime message loading is gone.** `setLocaleMessage()` and `mergeLocaleMessage()` warn and return. Translations fetched from a CMS at runtime need Intlayer's CMS, or the `intlayer pull` / `push` commands.
- **`messages` is a fallback, not free.** Keeping the JSON imports in `createI18n()` keeps the 75 KB in the bundle. Delete them once `intlayer test` passes.
- **The adapter is not the native runtime.** 7.9 KB against 3.9 KB for `vue-intlayer`. Once every component has moved to `useIntlayer`, drop it.

## When to use which?

- **Stay on `vue-i18n`** if your app depends on SFC `<i18n>` blocks, on runtime `setLocaleMessage()` flows, or if 90 KB per page is not a concern for your audience.
- **Use `@intlayer/vue-i18n`** if you are on `vue-i18n` and want the 88 KB, the 23x smaller components, 0% page leakage, typed keys and CI checks without editing a `.vue` file. This is the entry point for an existing `vue-i18n` codebase.
- **Go native (`vue-intlayer`)** for new projects, or once the adapter has done its job. It has the lightest runtime (3.9 KB) and the per-component `.content.ts` model that replaces `<i18n>` blocks with typed content.

## Related comparisons

- [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) (features and DX)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) (the libraries, same benchmark)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/blog/next-intl-vs-intlayer-next-intl) (same adapter series)
- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next) (same adapter series)
- [Lingui vs @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui) (same adapter series)
- [Migration guide: vue-i18n to Intlayer](https://intlayer.org/doc/migration/vue-i18n)
- [Compat adapter reference: vue-i18n](https://intlayer.org/doc/compatibility/vue-i18n), [Nuxt i18n](https://intlayer.org/doc/compatibility/nuxtjs-i18n)

## Conclusion

`@intlayer/vue-i18n` changes what `useI18n()` is bound to: from a global instance holding every message of every locale to a dictionary compiled for that component. On the same Vite + Vue 3 app that is **88 KB less per page**, a **3x smaller runtime**, **23x smaller components** and **0% page leakage**, for a config file, a plugin line and one deleted import. SFC `<i18n>` blocks and runtime message loading are the two things it does not carry, and the native `vue-intlayer` runtime remains half its size.

All the raw data, the test apps and the scripts are in the [Benchmark Bloom repository](https://github.com/intlayer-org/benchmark-bloom). Run it yourself.

Refer to the ['Why Intlayer?' doc](https://intlayer.org/doc/why) for more details.
