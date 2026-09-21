---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: 2026 Benchmark"
description: vue-i18n and Intlayer measured on the same Vite + Vue 3 app. Library size, per-page JavaScript, content leakage, component size and locale-switch reactivity, with the numbers explained.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Vue Internationalisation (i18n) Benchmark

`vue-i18n` is the reference i18n library for Vue. Intlayer is a compiler-based, component-scoped alternative with a Vue integration (`vue-intlayer`). We already compared their [features and developer experience](https://intlayer.org/blog/vue-i18n-vs-intlayer). This article looks at what each one costs once the app is built.

The data comes from [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), an open-source suite that builds the same application with each library and records what the browser actually downloads and executes.

<TOC/>

> **tl;dr**: On the same Vite + Vue 3 app, `vue-i18n` ships **134.9 KB** of gzipped JavaScript per page against **41.3 KB** for the app without i18n. Intlayer ships **57.1 KB**. The `vue-i18n` runtime alone weighs **24.3 KB gzip** (6x Intlayer's 3.9 KB), every page carries **90% of foreign-page strings**, and a component compiled in isolation drags in **196 KB** because it is bound to the global message tree. The `@intlayer/vue-i18n` adapter keeps the `vue-i18n` API and measured **47.0 KB** per page.

## In short

- **vue-i18n** - The de-facto i18n library for Vue 2 / Vue 3 and the core of `@nuxtjs/i18n`. ICU-style messages, SFC `<i18n>` blocks, `v-t` directive, `d()` / `n()` formatters, large ecosystem. Messages are registered on a global instance at `createI18n()`; lazy loading per locale is a manual `setLocaleMessage()` pattern, and per-route splitting is yours to build.
- **Intlayer** - Component-centric content model. `.content.ts` dictionaries sit next to the component they serve, a build-time compiler (`vite-intlayer`) tree-shakes and lazy-loads them per component and per locale, strict TypeScript types are generated from your content, and missing translations fail at build time. Ships router / SEO helpers, a Visual Editor / CMS and AI-assisted translation.

| Library               | GitHub Stars                                                                                                                                                                   | Total Commits                                                                                                                                                                      | Last Commit                                                                                                                                         | First Version | NPM Version                                                                                                 | NPM Downloads                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Dec 2016      | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Badges update automatically. Snapshots will vary over time.

## Side-by-side feature comparison

| Feature                                     | `vue-intlayer` (Intlayer)                               | `vue-i18n`                                                                    |
| ------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Translations near components**            | ✅ Yes, `.content.ts` collocated with each component    | ✅ Via SFC `<i18n>` blocks (optional); global catalogues are the common setup |
| **TypeScript integration**                  | ✅ Strict types auto-generated from content             | ✅ Good typings; strict key safety needs schema typing and discipline         |
| **Missing translation detection**           | ✅ TypeScript error + build-time error/warning          | ⚠️ Runtime fallback + console warning                                         |
| **Rich content (components / Markdown)**    | ✅ Direct support                                       | ⚠️ `<i18n-t>` component interpolation; Markdown via external plugins          |
| **ICU support**                             | ⚠️ WIP                                                  | ✅ Yes                                                                        |
| **Formatting (dates, numbers, currencies)** | ✅ Intl-based formatters                                | ✅ `d()` / `n()` with `datetimeFormats` / `numberFormats`                     |
| **Localised routing**                       | ✅ Helpers for Vue Router / Nuxt, `getMultilingualUrls` | ⚠️ Not core (`@nuxtjs/i18n` or custom router setup)                           |
| **SEO helpers (hreflang, sitemap, robots)** | ✅ Built-in helpers                                     | ❌ Not core                                                                   |
| **Tree-shaking (ship only used content)**   | ✅ Per component, per locale, automated by the compiler | ⚠️ Manual: split catalogues, `setLocaleMessage()` per route                   |
| **Lazy loading**                            | ✅ `importMode: 'dynamic'` (one line of config)         | ✅ Manual `import()` + `setLocaleMessage()`                                   |
| **Purge unused content**                    | ✅ Dead dictionaries are dropped at build time          | ❌ Not built-in                                                               |
| **Testing missing translations (CLI / CI)** | ✅ `npx intlayer content test`                          | ⚠️ Third-party (`vue-i18n-extract`)                                           |
| **AI-powered translation**                  | ✅ Built-in, uses your own provider keys                | ❌ No                                                                         |
| **Visual Editor / CMS**                     | ✅ Free Visual Editor + optional CMS                    | ❌ No (external localisation platforms)                                       |
| **MCP server & Agent Skills**               | ✅ Yes                                                  | ❌ No                                                                         |
| **Ecosystem / community**                   | ⚠️ Smaller but growing fast                             | ✅ Large and mature in the Vue ecosystem                                      |

## The benchmark

### What was measured

The [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite builds **the same Vite + Vue 3 application** with each library: **10 pages** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identical components and identical content. Pages are measured in `en` and `fr`.

Both libraries were tested in the **static** configuration, the one most Vue projects ship: for `vue-i18n`, every locale's JSON imported and passed to `createI18n({ messages })`; for Intlayer, the default `importMode: 'static'`. In that mode Intlayer bundles every locale too, but the compiler still scopes content **per component**, so a page only carries the dictionaries of the components it renders.

For each build, the suite records:

- **Lib size**: gzip size of an empty component that only imports the i18n library. The fixed cost of the runtime.
- **Page JS**: gzip JavaScript downloaded per page, averaged over all pages and locales.
- **Locale leak %**: share of translated strings found in the downloaded JS that belong to a locale the user is **not** viewing (fingerprinted on `en` and `fr`, so 50% means "the other measured locale is fully present"; with 10 locales bundled, the real waste is higher).
- **Page leak %**: share of translated strings found in the downloaded JS that belong to a page the user is **not** on.
- **Component avg**: average gzip size of each component compiled in isolation. Shows how much i18n runtime and catalogue a single component drags in.
- **E2E reactivity**: wall-clock time between selecting a new locale and `html[lang]` updating in the DOM (Playwright, 5 iterations).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Numbers below come from the run dated **2026-09-12** with `vue-i18n` 11.4.0 and `intlayer` 9.5.0 / 9.5.1. The test application is deliberately small (a few dozen strings per locale), so leakage percentages describe a **pattern**: they grow with your content whilst the runtime cost stays fixed.

### Results on Vite + Vue 3

| Library                       | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Page load |
| ----------------------------- | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (no i18n)            | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |   10.8 ms |
| `vue-i18n`                    | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |   13.6 ms |
| **`vue-intlayer`**            | static   |    **3.9 KB** |    **11.1 KB** |      **57.1 KB** |       56.8% |  **0.0%** |         **7.7 KB** |     **4.5 ms** |   13.8 ms |
| `@intlayer/vue-i18n` (compat) | static   |        7.9 KB |        23.2 KB |          47.0 KB |       15.0% |      0.0% |             8.4 KB |         1.5 ms |    9.3 ms |

> The base app's page-leak column is left blank: with no i18n library, the fingerprinting picks up hard-coded strings in shared chunks and the number is not meaningful.

**How to read it**

- **Runtime cost.** `vue-i18n` is one of the heaviest runtimes in the whole benchmark: **24.3 KB gzip / 83.2 KB minified** for an empty component that only imports it. `vue-intlayer` costs 3.9 KB gzip. That gap is paid on every page regardless of how many strings you have.
- **Per-page JavaScript.** The app without i18n weighs 41.3 KB. `vue-i18n` more than triples it to **134.9 KB**; Intlayer lands at **57.1 KB**, +15.8 KB, most of which is the ten bundled locales (see the next point).
- **Leakage.** With `createI18n({ messages: { en, fr, ... } })`, every page ships every locale and every page's strings: **50% locale leakage** (on the two fingerprinted locales) and **90% page leakage**. Intlayer's `static` mode also bundles every locale (hence the comparable locale-leak figure) but has **0% page leakage**: a page only pulls the dictionaries of the components it renders. Switching to `importMode: 'dynamic'` removes the locale leakage as well; that configuration was not part of this Vue run.
- **Component size is where the architecture shows.** A component calling `useI18n()` compiles to **196 KB** on average, because `t()` is bound to the global instance that holds every message of every locale. The same component with `useIntlayer()` compiles to **7.7 KB**: it only reaches its own dictionary.
- **Reactivity** is a non-issue for both (2-5 ms). Vue's reactivity system makes locale switching cheap once the messages are in memory.
- **`@intlayer/vue-i18n`**, the drop-in adapter, keeps the `vue-i18n` API and measured **47.0 KB per page** and **8.4 KB per component**, with the application code untouched.

> For reference, the same run measured `fluent-vue` at 171.8 KB per page, 29.7 KB of runtime and 217 KB per component.

## Why the gap? Global instance vs. compiled dictionaries

`vue-i18n` is a runtime. `createI18n()` builds a global instance holding a message tree per locale; `useI18n()` binds each component to it; `t("footer.github")` looks the key up at render time. This is what makes SFC `<i18n>` blocks, `v-t`, and runtime message loading possible, and it is also why every component's dependency graph includes the whole tree:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # one file per locale, all pages inside
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Optimising means **you** split `en.json` into per-route files, **you** call `setLocaleMessage()` in a router guard, and **you** keep the route-to-file map correct as components move. The runtime can't do it for you because it has no idea which keys a component will ask for.

Intlayer moves that knowledge to the build. Content is declared next to the component, and `vite-intlayer` resolves which component imports which dictionary:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

The compiler emits, per dictionary and per locale, exactly the JSON that component needs, and drops dictionaries nothing imports. Per-route scoping is a consequence of per-component scoping, not a task.

> To also drop the unused locales, set `dictionary.importMode: 'dynamic'` in `intlayer.config.ts`. See the [bundle optimisation doc](https://intlayer.org/doc/concept/bundle-optimization).

## Developer experience

### Setup

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

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

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Component

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` is a string until you type the message schema yourself; a typo renders the key.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
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

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` and `increment` are typed; a typo is a TypeScript error, a missing French value is a build error.

### Lazy loading per locale

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

Then call `loadLocaleMessages()` from a router guard, and split `locales/{locale}.json` by route yourself if you want per-page scoping.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## Keep the vue-i18n API, get Intlayer's output

`@intlayer/vue-i18n` is a drop-in adapter: `useI18n()`, `t()`, `d()`, `n()`, `{name}` and `{0}` interpolation, pipe plurals (`"car | cars"`), `v-t` and `i18n.global.locale` keep working, served from Intlayer dictionaries compiled by `vite-intlayer`.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

In the benchmark, the compat build of the same app went from **134.9 KB to 47.0 KB** per page and from **196 KB to 8.4 KB** per component, with the components untouched. Your existing `locales/{locale}.json` can stay the source of truth through the JSON sync plugin.

See the [vue-i18n migration guide](https://intlayer.org/doc/migration/vue-i18n) and the [compatibility doc](https://intlayer.org/doc/compatibility/vue-i18n). Nuxt users have the same path through [`@nuxtjs/i18n` compatibility](https://intlayer.org/doc/compatibility/nuxtjs-i18n).

## When to choose which?

- **Choose vue-i18n** if you want the standard Vue approach, you rely on ICU messages or SFC `<i18n>` blocks, you already use `@nuxtjs/i18n`, or a translation platform expects centralised JSON. Budget the time to split catalogues and lazy-load per route if bundle size matters.
- **Choose Intlayer** if you want **component-scoped content**, **strict TypeScript**, **build-time missing-key errors**, **zero-effort tree-shaking and lazy loading**, and built-in editorial tooling (Visual Editor, CMS, AI translation, MCP server). Especially relevant for large, modular Vue / Nuxt codebases and design systems.
- **Choose `@intlayer/vue-i18n`** if you are already on `vue-i18n` and want the bundle gains without a rewrite.

## Related comparisons

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer) (same benchmark)
- [i18next vs Intlayer](https://intlayer.org/blog/i18next-vs-intlayer) (same benchmark)
- [Lingui vs Intlayer](https://intlayer.org/blog/lingui-vs-intlayer) (same benchmark)
- [vue-i18n vs Intlayer (features & DX)](https://intlayer.org/blog/vue-i18n-vs-intlayer)
- [Is vue-i18n outdated?](https://intlayer.org/blog/is-vue-i18n-outdated)

## GitHub STARs

GitHub stars are a strong indicator of a project's popularity, community trust, and long-term relevance. While not a direct measure of technical quality, they reflect how many developers find the project useful, follow its progress, and are likely to adopt it.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Conclusion

`vue-i18n` is mature, flexible and deeply integrated with Vue. The benchmark shows what its runtime-first design costs on a Vite build: a **24 KB gzip runtime**, **134.9 KB per page** for an app that weighs 41 KB without i18n, **90% foreign-page content** on every page, and components that each reach **196 KB** because they hang off the global message tree.

Intlayer moves the work into the compiler. Per-component dictionaries and dead-content purging are build outputs, not conventions. On the same app: **3.9 KB runtime**, **57.1 KB per page**, **0% page leakage**, components **25x smaller**. And if a rewrite isn't on the table, `@intlayer/vue-i18n` gets most of the way there with the components untouched.

All the raw data, the test apps and the scripts are in the [Benchmark Bloom repository](https://github.com/intlayer-org/benchmark-bloom). Run it yourself.

Refer to the ['Why Intlayer?' doc](https://intlayer.org/doc/why) for more details.
