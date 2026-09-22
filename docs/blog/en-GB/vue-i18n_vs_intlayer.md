---
createdAt: 2024-08-11
updatedAt: 2026-09-22
title: vue-i18n vs Intlayer
description: Compare vue-i18n with Intlayer for internationalisation (i18n) in Vue/Nuxt apps
keywords:
  - vue-i18n
  - Intlayer
  - Internationalisation
  - i18n
  - Blog
  - Vue
  - Nuxt
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer
author: aymericzip
---

# vue-i18n VS Intlayer | Vue Internationalisation (i18n)

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

This guide compares two popular i18n options for **Vue 3** (and **Nuxt**): **vue-i18n** and **Intlayer**.
We focus on modern Vue tooling (Vite, Composition API) and evaluate:

1. **Architecture & content organisation**
2. **TypeScript & safety**
3. **Missing translation handling**
4. **Routing & URL strategy**
5. **Performance & loading behaviour**
6. **Developer experience (DX), tooling & maintenance**
7. **SEO & large-project scalability**

<TOC/>

> **tl;dr**: Both can localise Vue apps. If you want **component-scoped content**, **strict TypeScript types**, **build-time missing-key checks**, **tree-shaken dictionaries**, and **batteries-included router/SEO helpers** plus **Visual Editor & AI translations**, **Intlayer** is the more complete, modern choice.

## High-level positioning

- **vue-i18n** - The de-facto i18n library for Vue. Flexible message formatting (ICU-style), SFC `<i18n>` blocks for local messages, and a large ecosystem. Safety and large-scale maintenance are mostly your responsibility.
- **Intlayer** - Component-centric content model for Vue/Vite/Nuxt with **strict TS typing**, **build-time checks**, **tree-shaking**, **router & SEO helpers**, optional **Visual Editor/CMS**, and **AI-assisted translations**.

## What it costs at build time

Before the feature tables, the measured part. [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) builds the same Vite + Vue 3 app (10 pages, 10 locales) with each library and records what the browser downloads:

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                | Lib size (gz) | Page JS avg (gz) | Page leak | Component avg (gz) |
| -------------------- | ------------: | ---------------: | --------: | -----------------: |
| **base** (no i18n)   |        0.0 KB |          41.3 KB |         - |             1.1 KB |
| `vue-i18n`           |       24.3 KB |         134.9 KB |     90.0% |           196.0 KB |
| `@intlayer/vue-i18n` |        7.9 KB |          47.0 KB |      0.0% |             8.4 KB |
| **`vue-intlayer`**   |    **3.9 KB** |      **57.1 KB** |  **0.0%** |         **7.7 KB** |

The `vue-i18n` runtime alone weighs **6x** Intlayer's, every page carries **90% of foreign-page strings**, and a component compiled in isolation drags in **196 KB** because `useI18n()` binds it to the global message tree. The full run, with reactivity and page-load timings, is in the [vue-i18n vs Intlayer benchmark](https://intlayer.org/en-GB/blog/vue-i18n-vs-intlayer-benchmark).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Full table in the [Vue benchmark report](https://intlayer.org/en-GB/doc/benchmark/vue).

## Side-by-Side Feature Comparison (Vue-focused)

| Feature                                     | **Intlayer**                                                                     | **vue-i18n**                                                                 |
| ------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Translations near components**            | ✅ Yes, content collocated per component (e.g., `MyComp.content.ts`)             | ✅ Yes, via SFC `<i18n>` blocks (optional)                                   |
| **TypeScript integration**                  | ✅ Advanced, auto-generated **strict** types & key autocompletion                | ✅ Good typings; **strict key safety requires additional setup/disciplines** |
| **Missing translation detection**           | ✅ **Build-time** warnings/errors and TS surfacing                               | ⚠️ Runtime fallbacks/warnings                                                |
| **Rich content (components/Markdown)**      | ✅ Direct support for rich nodes and Markdown content files                      | ⚠️ Limited (components via `<i18n-t>`, Markdown via external plugins)        |
| **AI-powered translation**                  | ✅ Built-in workflows using your own AI provider keys                            | ❌ Not built-in                                                              |
| **Visual Editor / CMS**                     | ✅ Free Visual Editor & optional CMS                                             | ❌ Not built-in (use external platforms)                                     |
| **Localised routing**                       | ✅ Helpers for Vue Router/Nuxt to generate localised paths, URLs, and `hreflang` | ⚠️ Not core (use Nuxt i18n or custom Vue Router setup)                       |
| **Dynamic route generation**                | ✅ Yes                                                                           | ❌ Not provided (Nuxt i18n provides)                                         |
| **Pluralisation & formatting**              | ✅ Enumeration patterns; Intl-based formatters                                   | ✅ ICU-style messages; Intl formatters                                       |
| **Content formats**                         | ✅ `.ts`, `.js`, `.json`, `.md`, `.txt` (YAML WIP)                               | ✅ `.json`, `.js` (plus SFC `<i18n>` blocks)                                 |
| **ICU support**                             | ⚠️ WIP                                                                           | ✅ Yes                                                                       |
| **SEO helpers (sitemap, robots, metadata)** | ✅ Built-in helpers (framework-agnostic)                                         | ❌ Not core (Nuxt i18n/community)                                            |
| **SSR/SSG**                                 | ✅ Works with Vue SSR and Nuxt; does not block static rendering                  | ✅ Works with Vue SSR/Nuxt                                                   |
| **Tree-shaking (ship only used content)**   | ✅ Per-component at build time                                                   | ⚠️ Partial; requires manual code-splitting/async messages                    |
| **Lazy loading**                            | ✅ Per-locale / per-dictionary                                                   | ✅ Async locale messages supported                                           |
| **Purge unused content**                    | ✅ Yes (build-time)                                                              | ❌ Not built-in                                                              |
| **Large-project maintainability**           | ✅ Encourages modular, design-system-friendly structure                          | ✅ Possible, but requires strong file/namespace discipline                   |
| **Ecosystem / community**                   | ⚠️ Smaller but growing fast                                                      | ✅ Large and mature in the Vue ecosystem                                     |

## Deep-dive comparison

<AccordionGroup>
<Accordion header="1) Architecture & scalability">

- **vue-i18n**: Common setups use **centralised catalogues** per locale (optionally split into files/namespaces). SFC `<i18n>` blocks allow local messages but teams often revert to shared catalogues as projects grow. See [per-component vs centralized i18n](https://intlayer.org/en-GB/blog/per-component-vs-centralized-i18n).
- **Intlayer**: Promotes **per-component dictionaries** stored next to the component they serve. This reduces cross-team conflicts, keeps content discoverable, and naturally limits drift/unused keys.

**Why it matters:** In large Vue apps or design systems, **modular content** scales better than monolithic catalogues.

</Accordion>
<Accordion header="2) TypeScript & safety">

- **vue-i18n**: Good TS support; **strict key typing** typically needs custom schemas/generics and careful conventions.
- **Intlayer**: **Generates strict types** from your content, providing **IDE autocompletion** and **compile-time errors** for typos or missing keys.

**Why it matters:** Strong typing catches issues **before** runtime.

</Accordion>
<Accordion header="3) Missing translation handling">

- **vue-i18n**: **Runtime** warnings/fallbacks (e.g., fallback locale or key). See [detecting missing translations](https://intlayer.org/en-GB/blog/detecting-missing-translations).
- **Intlayer**: **Build-time** detection with warnings/errors across locales and keys., plus `npx intlayer test` in CI.

**Why it matters:** Build-time enforcement keeps the production UI clean and consistent.

</Accordion>
<Accordion header="4) Routing & URL strategy (Vue Router/Nuxt)">

- **Both** can work with localised routes. See the [hreflang guide](https://intlayer.org/en-GB/blog/hreflang-guide-multilingual-seo).
- **Intlayer** provides helpers to **generate localised paths**, **manage locale prefixes**, and emit **`<link rel="alternate" hreflang>`** for SEO. With Nuxt, it complements the framework’s routing.

**Why it matters:** Fewer custom glue layers and **cleaner SEO** across locales.

</Accordion>
<Accordion header="5) Performance & loading behavior">

- **vue-i18n**: Supports async locale messages; avoiding over-bundling is your responsibility (split catalogues carefully). The benchmark above puts numbers on it: 134.9 KB against 57.1 KB per page.
- **Intlayer**: **Tree-shakes** at build and **lazy-loads per dictionary/locale**. Unused content isn’t shipped.

**Why it matters:** Smaller bundles and faster startup for multi-locale Vue apps.

</Accordion>
<Accordion header="6) Developer experience & tooling">

- **vue-i18n**: Mature docs and community; you’ll typically rely on **external localisation platforms** for editorial workflows.
- **Intlayer**: Ships a **free Visual Editor**, optional **CMS** (Git-friendly or externalised), a **VSCode extension**, **CLI/CI** utilities, and **AI-assisted translations** using your own provider keys., an **MCP server**

**Why it matters:** Lower ops cost and a shorter dev–content loop.

</Accordion>
<Accordion header="7) SEO, SSR & SSG">

- **Both** work with Vue SSR and Nuxt. See [internationalization and SEO](https://intlayer.org/en-GB/blog/SEO-and-i18n).
- **Intlayer**: Adds **SEO helpers** (sitemaps/metadata/`hreflang`) that are framework-agnostic and play nicely with Vue/Nuxt builds.

**Why it matters:** International SEO without bespoke wiring.

</Accordion>
</AccordionGroup>

## Why Intlayer? (Problem & approach)

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

Most i18n stacks (including **vue-i18n**) start from **centralised catalogues**:

<Tabs defaultTab="per-locale" group="catalog">
<Tab label="One file per locale" value="per-locale">

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
<Tab label="One folder per locale" value="per-folder">

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
</Tabs>

That folder keeps growing, one namespace per feature, in every locale:

![A locales folder with dozens of namespace files per language](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)

This often slows development as apps grow:

1. **For a new component** you create/edit remote catalogues, wire namespaces, and translate (often via manual copy/paste from AI tools).
2. **When changing components** you hunt down shared keys, translate, keep locales in sync, remove dead keys, and align JSON structures.

**Intlayer** scopes content **per-component** and keeps it **next to the code**, as we already do with CSS, stories, tests, and docs:

```bash
.
└── components
    └── MyComponent
        ├── MyComponent.content.ts
        └── MyComponent.vue
```

<Tabs defaultTab="intlayer" group="techno">
<Tab label="vue-i18n" value="vue-i18n">

```json fileName="./locales/en.json"
{
  "componentExample": {
    "greeting": "Hello World"
  }
}
```

```vue fileName="./components/MyComponent.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <span>{{ t("componentExample.greeting") }}</span>
</template>
```

Every locale file has to be edited by hand, and the key is a plain string: a typo renders as `componentExample.greting` in production.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="./components/MyComponent/myComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```vue fileName="./components/MyComponent/MyComponent.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer"; // Vue integration

const { greeting } = useIntlayer("component-example");
</script>

<template>
  <span>{{ greeting }}</span>
</template>
```

All locales sit in one typed file next to the component.

</Tab>
</Tabs>

This approach:

- **Speeds up development** (declare once; IDE/AI autocompletes).
- **Cleans the codebase** (1 component = 1 dictionary).
- **Facilitates duplication/migration** (copy a component and its content together).
- **Avoids dead keys** (unused components don’t import content).
- **Optimises loading** (lazy-loaded components bring their content with them).

## Additional features of Intlayer (Vue-relevant)

- **Cross-framework support**: Works with Vue, Nuxt, Vite, React, Express, and more.
- **JavaScript-powered content management**: Declare in code with full flexibility.
- **Per-locale declaration file**: Seed all locales and let tooling generate the rest.
- **Type-safe environment**: Strong TS config with autocompletion.
- **Simplified content retrieval**: A single hook/composable to fetch all content for a dictionary.
- **Organised codebase**: 1 component = 1 dictionary in the same folder.
- **Enhanced routing**: Helpers for **Vue Router/Nuxt** localised paths and metadata.
- **Markdown support**: Import remote/local Markdown per locale; expose frontmatter to code.
- **Free Visual Editor & optional CMS**: Authoring without a paid localisation platform; Git-friendly sync.
- **Tree-shakable content**: Ships only what’s used; supports lazy loading.
- **Static rendering friendly**: Does not block SSG.
- **AI-powered translations**: Translate to 231 languages using your own AI provider/API key.
- **MCP server & VSCode extension**: Automate i18n workflows and authoring inside your IDE.
- **Interoperability**: Bridges with **vue-i18n**, **react-i18next**, and **react-intl** when needed.

## When to choose which?

<AccordionGroup>
<Accordion header="Choose vue-i18n">

You want the **standard Vue approach**, you are comfortable managing catalogs and namespaces yourself, and your app is **small to mid-size** (or you already rely on Nuxt i18n). SFC `<i18n>` blocks and runtime `setLocaleMessage()` are features Intlayer deliberately does not replicate.

</Accordion>
<Accordion header="Choose Intlayer">

You value **component-scoped content**, **strict TypeScript**, **build-time guarantees**, **tree-shaking**, and **batteries-included** routing, SEO and editor tooling, especially for **large, modular Vue/Nuxt codebases** and design systems. Start with [Intlayer with Vue](https://intlayer.org/en-GB/doc/environment/vite-and-vue) or [with Nuxt](https://intlayer.org/en-GB/doc/environment/nuxt-and-vue).

</Accordion>
<Accordion header="Choose @intlayer/vue-i18n">

You are on `vue-i18n` today and want the bundle gains without editing a `.vue` file. The [compat adapter](https://intlayer.org/en-GB/doc/compatibility/vue-i18n) keeps `createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t` and `v-t`, and serves them from compiled dictionaries. Measured side by side in [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/en-GB/blog/vue-i18n-vs-intlayer-vue-i18n).

</Accordion>
</AccordionGroup>

## Interoperability with vue-i18n

`intlayer` can also help to manage your `vue-i18n` namespaces.

Using `intlayer`, you can declare your content in the format of your favourite i18n library, and intlayer will generate your namespaces in the location of your choice (example: `/messages/{{locale}}/{{namespace}}.json`). See the [vue-i18n compatibility doc](https://intlayer.org/en-GB/doc/compatibility/vue-i18n) and the [Nuxt i18n adapter](https://intlayer.org/en-GB/doc/compatibility/nuxtjs-i18n).

## FAQ

<FAQ>

<Question title="Is Intlayer a replacement for vue-i18n or a layer on top?">

Both, depending on how you adopt it. `vue-intlayer` is a native runtime with its own `useIntlayer()` composable. `@intlayer/vue-i18n` is a compat adapter that keeps the `vue-i18n` API and swaps what it is bound to, so you can migrate without touching components and move file by file afterwards.

</Question>

<Question title="What happens to my SFC <i18n> blocks?">

The adapter does not read them. Move those messages into your locale JSON, or into a `.content.ts` next to the component, which is the same idea with generated types. That is the one `vue-i18n` feature that does not carry over.

</Question>

<Question title="Does Intlayer work with Nuxt?">

Yes. [Intlayer with Nuxt](https://intlayer.org/en-GB/doc/environment/nuxt-and-vue) covers multilingual routing, locale detection middleware and sitemap generation. If you are on `@nuxtjs/i18n`, the [Nuxt i18n compat adapter](https://intlayer.org/en-GB/doc/compatibility/nuxtjs-i18n) is the migration path.

</Question>

<Question title="Can I keep my locales/{locale}.json as the source of truth?">

Yes. The [JSON sync plugin](https://intlayer.org/en-GB/doc/compatibility/vue-i18n) reads them with the `vue-i18n` dialect (`{name}`, `{0}`, `"car | cars"` pipe plurals) and writes translations back when the CLI or the CMS updates them.

</Question>

<Question title="Does ICU work with Intlayer on Vue?">

Native ICU support is a work in progress. The `@intlayer/vue-i18n` adapter resolves `vue-i18n`'s own message syntax, including pipe plurals and named and list interpolation. For Intlayer's pluralization model, see [enumeration content](https://intlayer.org/en-GB/doc/concept/content/enumeration).

</Question>

</FAQ>

## GitHub STARs

GitHub stars are a strong indicator of a project's popularity, community trust, and long-term relevance. While not a direct measure of technical quality, they reflect how many developers find the project useful, follow its progress, and are likely to adopt it. For estimating the value of a project, stars help compare traction across alternatives and provide insights into ecosystem growth.

[![Star History Chart](https://api.star-history.com/svg?repos=intlify/vue-i18n&repos=aymericzip/intlayer&type=Date)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Conclusion

Both **vue-i18n** and **Intlayer** localise Vue apps well. The difference is **how much you must build yourself** to achieve a robust, scalable setup:

- With **Intlayer**, **modular content**, **strict TS**, **build-time safety**, **tree-shaken bundles**, and **router/SEO/editor tooling** come **out of the box**.
- If your team prioritises **maintainability and speed** in a multi-locale, component-driven Vue/Nuxt app, Intlayer offers the **most complete** experience today.

## Further reading

- [vue-i18n vs Intlayer benchmark](https://intlayer.org/en-GB/blog/vue-i18n-vs-intlayer-benchmark), the measured run behind the table above
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/en-GB/blog/vue-i18n-vs-intlayer-vue-i18n), the adapter on the same app
- [Is vue-i18n outdated?](https://intlayer.org/en-GB/blog/is-vue-i18n-outdated)
- [How to pick a Vue i18n library](https://intlayer.org/en-GB/blog/how-to-pick-vue-i18n-library)
- [Using Intlayer with vue-i18n](https://intlayer.org/en-GB/blog/intlayer-with-vue-i18n)
- [Vue benchmark report](https://intlayer.org/en-GB/doc/benchmark/vue)
- [Migration guide: vue-i18n to Intlayer](https://intlayer.org/en-GB/doc/migration/vue-i18n)
- [Bundle optimization](https://intlayer.org/en-GB/doc/concept/bundle-optimization) and [the Intlayer compiler](https://intlayer.org/en-GB/doc/compiler)

Refer to ['Why Intlayer?' doc](https://intlayer.org/en-GB/doc/why) for more details.
