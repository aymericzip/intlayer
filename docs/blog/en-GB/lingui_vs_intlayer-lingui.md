---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 8
title: "Lingui vs @intlayer/lingui: Same Macros, Different Runtime"
description: What changes when a React app keeps its Lingui macros but serves them through the @intlayer/lingui compat adapter. Component size, hydration, leakage and per-page JavaScript measured on the same TanStack Start code, including where the adapter loses.
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalisation
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | Same Macros, Different Runtime

`@intlayer/lingui` is a compat adapter for `@lingui/core` and `@lingui/react`. Your `` t`...` ``, `<Trans>`, `useLingui()` and `i18n._()` calls stay exactly as they are; the macros keep compiling; what changes is where the messages come from at runtime. Instead of one compiled catalogue per locale, each call site is bound to an Intlayer dictionary compiled for it.

This article measures that swap on the same TanStack Start application, built once with Lingui and once with the adapter. The numbers come from [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). For the two libraries compared as libraries, read [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/lingui_vs_intlayer.md). This one is about what the adapter changes, and where it does not help.

<TOC/>

> **tl;dr**: On the same TanStack Start app, `@intlayer/lingui` cut the average component from **85.5 KB to 12.8 KB** gzip, hydration from **28 ms to 19.7 ms**, and locale switching from **5.9 ms to 2.9 ms**, with the macros untouched. In the naive setup (every catalogue loaded upfront) it also removed **90% page leakage** and 12 KB per page. But in the lazy-loaded setup it ships **137 KB per page against 115 KB** for plain Lingui: the adapter resolves ICU at runtime where Lingui ships precompiled token arrays. The source-locale leakage (~9-10%) is identical on both sides, because it comes from the `message` fallback embedded in the components, not from the runtime. The adapter is a Vite plugin; it was measured on TanStack Start.

## What `@intlayer/lingui` is

Lingui is a compiler plus a runtime. Macros in your source are extracted to a `.po` (or JSON) catalogue per locale, compiled to a JS module per locale, and loaded into a global `I18n` instance with `i18n.load()` + `i18n.activate()`. Every `useLingui()` subscribes to that instance; every `_()` call looks its id up in the active catalogue.

`@intlayer/lingui` keeps the macros and the API and replaces the catalogue lookup:

1. **Import aliasing.** The `lingui()` plugin from `@intlayer/lingui/plugin` wraps `vite-intlayer` and adds `resolve.alias` entries so that `@lingui/core` and `@lingui/react` resolve to `@intlayer/lingui`. Your imports do not change.
2. **Catalogues as source of truth.** The `syncJSON` plugin (or `syncPO` for `.po` files) reads your existing catalogues and turns them into Intlayer dictionaries, writing translations back when the CLI or the CMS updates them. With `splitKeys: "key-prefix"`, a flat catalogue of dotted ids (`footer.github`, `hero.title`) becomes one small dictionary per prefix instead of one 244 KB file.
3. **Call-site binding.** The Intlayer optimise pass collects the ids passed to `_`, `t` and `<Trans>` in each file, and hands the matching dictionaries to the component. `<Trans id="hero.title">` binds on its own; `useLingui()` binds to every prefix used in the file. Ids with no dot (hashed ids, `mockBanner`) fall back to Lingui's single `messages` dictionary.

```tsx fileName="src/components/Hero.tsx"
// Your code, unchanged
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="What the compiler emits (simplified)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

The component no longer reaches the global instance and the catalogue behind it. It reaches `hero`. That is the whole reason the component-size column below drops by 7x.

## What the adapter keeps, ignores, and does not replace

| Lingui API                                                | With `@intlayer/lingui`                                                                                        |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` macros | ✅ Kept. Keep `@lingui/babel-plugin-lingui-macro` or `@lingui/swc-plugin` in the build, before Intlayer's pass |
| `useLingui()` → `{ i18n, _, t }`                          | ✅ Kept. Works outside a provider too (locale derived from `react-intlayer`)                                   |
| `i18n._(id, values)`, `i18n.t()`                          | ✅ Kept. Explicit and hashed ids both resolve                                                                  |
| ICU plurals, `select`, `selectordinal`, `#`               | ✅ Kept, through Intlayer's ICU resolver                                                                       |
| `i18n.date()`, `i18n.number()`, `formats`                 | ✅ Kept, backed by native `Intl`                                                                               |
| `I18nProvider`                                            | ✅ Kept. Wraps an `IntlayerProvider`; listens to `i18n.on("change")` so `activate()` still re-renders          |
| `i18n.activate(locale)`                                   | ✅ Kept                                                                                                        |
| `i18n.load(locale, messages)` / `loadAndActivate()`       | ⚠️ Accepted as a **runtime fallback**. Compiled dictionaries win; a dev warning suggests removing the import   |
| `setupI18n({ messages, missing })`                        | ⚠️ `messages` are merged as a runtime fallback; `missing` is ignored                                           |
| `lingui extract` / `lingui compile`                       | ✅ Still your workflow. Point `syncPO` / `syncJSON` at the extracted catalogues                                |
| `defaultComponent` on `I18nProvider`                      | ⚠️ Stored in context, not applied when rendering                                                               |
| Next.js                                                   | ❌ The plugin wraps `vite-intlayer`. Vite, TanStack Start and React Router only                                |

## The benchmark

### What was measured

The [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite builds **the same application** with each setup: **10 pages** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identical components and identical content. Pages are measured in `en` and `fr`.

Lingui was built in four loading strategies, from every compiled catalogue imported upfront (`static`) to one catalogue per route, lazily imported (`scoped-dynamic`). The adapter was built on the **same components**, with `vite.config.ts` and `intlayer.config.ts` changed and nothing else. Its `static` row bundles every locale; its `dynamic` row (`importMode: 'dynamic'`) loads the active locale on demand. There is no "scoped" variant: the optimise pass scopes per call site.

For each build, the suite records:

- **Lib size**: gzip size of an empty component that only imports the i18n library.
- **Page JS**: gzip JavaScript downloaded per page, averaged over all pages and locales.
- **Locale leak %**: share of translated strings in the downloaded JS that belong to a locale the user is **not** viewing.
- **Page leak %**: share of translated strings in the downloaded JS that belong to a page the user is **not** on.
- **Component avg**: average gzip size of each component compiled in isolation.
- **E2E reactivity**: wall-clock time between selecting a new locale and `html[lang]` updating in the DOM (Playwright, 5 iterations).
- **Hydration**: React hydration phase duration.

> Numbers below come from the run dated **2026-09-12** with `@lingui/react` 6.6.0 and `@intlayer/lingui` 9.5.1. The test application is deliberately small (a few dozen strings per locale), so leakage percentages describe a **pattern**: they grow with your content while the runtime cost stays fixed.

### Results on TanStack Start

| Setup                  | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ---------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)     | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |     21.6 ms |
| Lingui                 | static         |       11.2 KB |         152.2 KB |       50.0% |     90.0% |            58.0 KB |         3.9 ms |     19.9 ms |
| Lingui                 | dynamic        |       11.2 KB |     **115.2 KB** |        9.3% |      0.0% |            85.5 KB |         5.9 ms |     28.0 ms |
| Lingui                 | scoped-static  |       11.2 KB |         120.8 KB |        4.0% |      0.0% |           147.9 KB |         7.1 ms |     33.9 ms |
| Lingui                 | scoped-dynamic |       11.2 KB |         120.2 KB |        8.6% |      0.0% |            83.7 KB |        42.1 ms |     32.9 ms |
| **`@intlayer/lingui`** | static         |   **10.3 KB** |         140.5 KB |       50.0% |  **0.0%** |        **14.9 KB** |     **3.3 ms** | **11.3 ms** |
| **`@intlayer/lingui`** | dynamic        |   **10.3 KB** |         137.0 KB |        9.9% |  **0.0%** |        **12.8 KB** |     **2.9 ms** | **19.7 ms** |
| `intlayer` (native)    | static         |        5.0 KB |         125.8 KB |       50.0% |      0.0% |             8.1 KB |         3.2 ms |     11.5 ms |
| `intlayer` (native)    | dynamic        |        5.0 KB |         118.6 KB |        0.0% |      0.0% |             6.3 KB |         3.6 ms |     14.1 ms |

**How to read it**

- **Components: 7x smaller.** This is the adapter's main effect. A Lingui component compiled in isolation averages **58-148 KB** depending on the strategy, because `useLingui()` reaches the global instance and every catalogue loaded into it. The same component with the adapter averages **12.8-14.9 KB**: it reaches its own dictionaries and the ICU resolver, nothing else.
- **Hydration: 8-14 ms faster.** `i18n.load()` + `i18n.activate()` run on the client before React can hydrate; the lazier the Lingui setup, the longer that takes (28-34 ms). With the adapter, dictionaries arrive as plain imports the bundler already placed in the page chunk: **11.3 ms** in `static`, **19.7 ms** in `dynamic`.
- **Locale switching: 2x faster, and no cliff.** Lingui's optimised `scoped-dynamic` setup takes **42 ms** to update `html[lang]`, because the route catalogue is fetched, loaded and activated before the change is visible. The adapter stays at **2.9-3.3 ms** in both modes.
- **The naive setup gets fixed for free.** Static Lingui ships every catalogue on every page: 152.2 KB, 90% page leakage. Static adapter: 140.5 KB, 0% page leakage, same components.
- **Per-page bytes: Lingui wins in `dynamic`, by 22 KB.** This is the number to be honest about. Lingui compiles messages to token arrays at build time and ships an 11 KB runtime that only walks them. The adapter ships Intlayer's ICU resolver (about 15 KB more of `@intlayer/core` than the native build), the adapter layer (~10 KB) and `react-intlayer` (~6 KB). On this app, that is **137.0 KB against 115.2 KB**. If per-page bytes are your only budget and you are already on lazy-loaded Lingui, the adapter does not help you there.
- **Locale leakage is the same on both sides.** 9.3% for Lingui, 9.9% for the adapter in `dynamic`. It comes from the components: `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` carries the English source as a fallback, and so does macro output unless the message field is stripped. That English lands in the `fr` chunk regardless of what serves the translation. Native `intlayer` (`.content.ts`, no inline source) is at 0%.

## Why the numbers move, and why one does not

Two things determine those columns: **what a component is bound to**, and **what format the messages travel in**.

**Binding.** With Lingui, the unit is the locale. `messages.mjs` for `fr` is one module; whichever component imports the instance that loaded it can reach all of it, so the bundler cannot split below the locale. With the adapter, the unit is the call site: `hero` and `footer` are separate imports, split and lazy-loaded per component. That is the component-size, hydration and page-leakage story.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # lingui compile output, one per locale
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # generated: one dictionary per id prefix, per locale
└── src
    ├── locales
    │   ├── en/messages.json             # unchanged, still the source of truth
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← unchanged
```

**Format.** Lingui's compile step turns `{count, plural, one {# item} other {# items}}` into a token array; the runtime never parses ICU. The adapter keeps the message as text and parses it with Intlayer's ICU resolver. That is a fixed ~15 KB you pay once per page, and the reason the `dynamic` row loses on bytes while winning everywhere else. Native Intlayer avoids it because `.content.ts` dictionaries use `enu()` / `insert()` nodes the compiler resolves ahead of time.

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

The command detects Lingui, reads `lingui.config.ts` to pick `syncPO` (`.po` catalogues) or `syncJSON` (JSON catalogues), installs `intlayer`, `react-intlayer`, `@intlayer/lingui` and the matching sync plugin, and swaps `@lingui/vite-plugin` for the adapter plugin in `vite.config.ts` if you use it. Keep `@lingui/core`, `@lingui/react` and your macro plugin installed: the macros still compile, and the adapter uses Lingui's types.

</Step>
<Step number={2} title="Point Intlayer at your catalogues">

For JSON catalogues (`format: "minimal"` in `lingui.config.ts`):

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
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // Group dotted ids by their first segment: `footer.github` → dictionary `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

For `.po` catalogues, replace `syncJSON` with `syncPO` from `@intlayer/sync-po-plugin` and the same `source` pattern with a `.po` extension. See the [Sync PO plugin doc](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-po.md).

`splitKeys: "key-prefix"` is what makes the component-size column drop. The catalogue file keeps its flat shape; the split only exists in the generated dictionaries, and write-back re-joins the ids.

</Step>
<Step number={3} title="Add the plugin">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // Keep your macro plugin; it must run before Intlayer's pass
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

`lingui()` wraps `vite-intlayer` (content watching, dictionary compilation, the optimise pass) and aliases `@lingui/core` and `@lingui/react` to the adapter. Build, and the numbers above are yours.

</Step>
</Steps>

### What you can delete afterwards

| File / pattern                                       | Why                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | Dictionaries are imported by the components that use them. `i18n.load()` becomes a fallback |
| `i18n.load()` / `i18n.loadAndActivate()`             | Keep `i18n.activate(locale)`; drop the catalogue loading                                    |
| `lingui compile` in the build script                 | Only if you moved to JSON / `.po` as source and no longer import compiled modules           |

### What you gain beyond bytes

- **Missing-translation detection.** `npx intlayer test` fails CI when a locale lacks an id; `lingui extract` only reports statistics.
- **`npx intlayer fill`** translates the missing entries with the provider of your choice (OpenAI, Anthropic, Mistral, Gemini...) and writes them back into your catalogue.
- **Visual Editor and CMS** operate on the same dictionaries, so the `.po` / JSON files can be edited through a UI by non-developers.
- **Incremental move to `.content.ts`.** A component can switch from `useLingui()` to `useIntlayer("hero")` with a co-located content file whenever you want. Both dictionary kinds coexist and merge.

## Limits to know before you start

- **The `dynamic` per-page cost.** Covered above: expect roughly +20 KB per page against a lazy-loaded Lingui setup on a small app. The gap does not grow with content (it is the resolver, not the catalogues), but it does not shrink either.
- **Source-locale leakage stays.** Message descriptors and macro output embed the English source as fallback. If that matters, the fix is stripping the `message` field or moving that component to `.content.ts`, not the adapter.
- **`i18n.load()` is a fallback, not the path.** If you keep importing compiled catalogues and calling `load()`, you get the old bundle plus the new one. Remove the imports.
- **Vite only.** There is no Next.js plugin for `@intlayer/lingui`. Next.js projects on Lingui should look at [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md) directly.
- **`defaultComponent` is not applied.** If you rely on it to wrap every `<Trans>`, add the wrapper explicitly.

## When to use which?

- **Stay on Lingui** if you already run the `scoped-dynamic` setup, your budget is per-page bytes, and the 42 ms locale switch and 30 ms hydration are acceptable for your app.
- **Use `@intlayer/lingui`** if you are on Lingui, want smaller components, faster hydration and locale switching, 0% page leakage in the naive setup, typed ids, CI checks and AI fill, without touching a macro. It is the entry point for an existing Lingui codebase.
- **Go native (`react-intlayer`)** once components are being moved anyway. It is the only setup in the table with **0% locale leakage**, a 5 KB runtime and +7.6 KB per page over the base app.

## Related comparisons

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/lingui_vs_intlayer.md) (the libraries, same benchmark)
- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/next-intl_vs_intlayer-next-intl.md) (same adapter series)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18next_vs_intlayer-i18next.md) (same adapter series)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/vue-i18n_vs_intlayer-vue-i18n.md) (same adapter series)
- [Compat adapter reference: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/lingui.md)
- [Compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/compiler_vs_declarative_i18n.md)

## Conclusion

`@intlayer/lingui` changes what a Lingui call site is bound to: from the global instance and its per-locale catalogue to a dictionary compiled for that component. On the same TanStack Start app that is **7x smaller components**, **8-14 ms less hydration**, **2x faster locale switching** and no 42 ms cliff, without editing a macro. It does not change what your components embed, so the source-locale leakage stays, and it parses ICU at runtime, so the lazy-loaded setup ships about 20 KB more per page than plain Lingui. Know which of those numbers is your budget before you pick.

All the raw data, the test apps and the scripts are in the [Benchmark Bloom repository](https://github.com/intlayer-org/benchmark-bloom). Run it yourself.

Refer to the ['Why Intlayer?' doc](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/interest_of_intlayer.md) for more details.
