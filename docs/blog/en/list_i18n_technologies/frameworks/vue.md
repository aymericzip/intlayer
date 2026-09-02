---
createdAt: 2025-01-16
updatedAt: 2026-09-02
title: Vue i18n - how it works and where it breaks at scale
description: How vue-i18n works in Vue 3, the three places it hurts once your app grows (key sprawl, untyped keys, bundle size), and the alternatives worth a look.
keywords:
  - vue i18n
  - vue-i18n
  - Vue 3 internationalization
  - useI18n
  - Nuxt i18n
  - Composition API
  - Intlayer
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - vue
author: aymericzip
---

# Vue i18n: how it works, and where it starts to hurt

If you searched "vue i18n" you have already found `vue-i18n`, and it is the right default for most Vue apps. What is less documented is how it behaves once you pass ten pages and five locales. This post covers the mechanics, the three friction points that show up at scale, and what the alternatives actually change.

<iframe title="The best i18n solution for Vite and Vue? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/IE3XWkZ6a5U?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## Table of Contents

<TOC/>

## The two things "Vue i18n" means

One is the practice: shipping a Vue app in several languages, with localized routes, formatted dates and numbers, and correct `hreflang`. The other is `vue-i18n`, the Intlify library that most Vue apps use to do it.

They are not the same decision. Picking the library is ten minutes; the practice is what you live with for the next two years. If the concept itself is new, start with [what internationalization actually covers](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md) and the [difference between i18n, l10n and t9n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_meaning.md).

## How vue-i18n works

You build one message catalog per locale and register it as a plugin.

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false, // Composition API mode
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: {
      cart: { total: "Total", items: "no item | one item | {count} items" },
    },
    fr: {
      cart: {
        total: "Total",
        items: "aucun article | un article | {count} articles",
      },
    },
  },
});
```

Inside a single-file component you read from it with `useI18n()`:

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, n, locale } = useI18n();
</script>

<template>
  <h2>{{ t("cart.total") }}</h2>
  <p>{{ t("cart.items", { count: 3 }, 3) }}</p>
  <p>{{ n(42.5, "currency") }}</p>
</template>
```

Three mechanics matter more than the API surface:

- **Legacy vs Composition mode.** `legacy: true` keeps the Vue 2 behaviour and exposes `$t` / `$tc` globally on every component instance. `legacy: false` gives you `useI18n()` and proper types. New apps should use `false`; mixing the two in one codebase is where most "why is `$t` undefined here" bugs come from.
- **Messages are compiled, not interpolated at read time.** Each message string is turned into a render function. With the default build that compilation happens in the browser, at runtime. Adding `@intlify/unplugin-vue-i18n` moves it to build time and lets you ship the runtime-only build, which is both smaller and CSP-friendly, since the runtime compiler relies on `new Function`.
- **Plurals are pipe-separated, not ICU.** `"no item | one item | {count} items"` is vue-i18n's own format. It is compact, but it is not portable to any other tool, and translators need to be told about it.

## Where it starts to hurt

### 1. Keys are strings with no link back to the component

`t("cart.items")` is a string. Nothing connects it to `CartSummary.vue`. Delete the component and the key stays in every locale file forever; rename a nesting level and you find out at runtime, in the locale nobody tests.

At ten components this is fine. At three hundred, across a `locales/en.json` that several teams edit, key sprawl is the actual maintenance cost, not the translation itself.

### 2. Key type safety is opt-in and awkward

vue-i18n can be typed by passing a message schema generic to `createI18n`, which gives autocompletion on `t()`. It works, but you have to wire it yourself, and it fights with lazily loaded catalogs: the schema describes messages that may not be loaded yet, so the types stop reflecting runtime reality.

Out of the box, a typo in a key produces a warning in the console and the raw key on screen.

### 3. Lazy loading exists, scoping does not

vue-i18n supports async messages, so you can avoid shipping all locales at once:

```ts
const messages = await import(`./locales/${locale}.json`);
i18n.global.setLocaleMessage(locale, messages.default);
```

What it does not give you is a per-page split. A locale catalog is one object; loading it loads every page's copy. In a plain SPA nobody notices. In a Nuxt app with `@nuxt/i18n` and more than ten pages, every route ends up carrying the messages of every other route.

The [Vue i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md) measures the library cost separately from the content cost, on a 10-page / 10-locale app: `vue-i18n@11.4.0` weighs about **24.3 kB** after bundling and minification, roughly **9× `vue-intlayer`**. `fluent-vue` comes in around **92.7 kB**, about 34×, and its Vite plugin loads all content in all languages into every page.

## Vite and Nuxt are not the same setup

| Concern                        | Plain Vite + Vue Router | Nuxt                                         |
| :----------------------------- | :---------------------- | :------------------------------------------- |
| Locale-prefixed routes         | You write them          | `@nuxt/i18n` generates them                  |
| `hreflang`, sitemap, redirects | Manual                  | Module handles most of it                    |
| SSR / prerender                | Not by default          | Yes, and messages must resolve on the server |
| Catalog splitting              | Your problem            | Still your problem                           |

Most "vue i18n is slow" reports come from Nuxt apps, because SSR makes the catalog cost visible in the HTML payload as well as the JS bundle.

## The alternatives

| Library      | Content model                                             | Type safety on keys         | Note                                                              |
| :----------- | :-------------------------------------------------------- | :-------------------------- | :---------------------------------------------------------------- |
| `vue-i18n`   | Central catalogs per locale, optional SFC `<i18n>` blocks | Opt-in via a schema generic | The ecosystem default, largest community, ICU-adjacent formatting |
| `fluent-vue` | `.ftl` files (Mozilla Fluent)                             | None                        | Nice message syntax, very heavy in the benchmark                  |
| Intlayer     | One `.content.ts` per component, colocated                | Generated, on by default    | Requires a build plugin, smaller ecosystem                        |

## Intlayer: content declared next to the component

Intlayer's difference is one design choice: the content lives in a file beside the component that renders it, and a build plugin compiles those declarations into per-component dictionaries.

```ts fileName="src/components/cartSummary.content.ts"
import { t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    total: t({ en: "Total", fr: "Total", es: "Total" }),
    vatNotice: t({
      en: "VAT included",
      fr: "TVA incluse",
      es: "IVA incluido",
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { total, vatNotice } = useIntlayer("cart-summary");
</script>

<template>
  <h2><total /></h2>
  <small>{{ vatNotice }}</small>
</template>
```

Both forms work: `<total />` renders a node that stays editable in the visual editor, `{{ vatNotice }}` gives you the plain string. Locale switching goes through `useLocale()`, which returns `locale`, `availableLocales` and `setLocale`.

Because the key is declared in one file and consumed in one component, deleting the component deletes its content, and the compiler ships only the entries a route renders.

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vue-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-vue-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-vue-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Setup is `npx intlayer init`, then the `intlayer()` plugin in `vite.config.ts` or `"nuxt-intlayer"` in `nuxt.config.ts`.

**What it costs you.** A build step is mandatory: no bundler plugin, no dictionaries. The ecosystem is much smaller than vue-i18n's, so there are fewer Stack Overflow answers and fewer third-party integrations. ICU message format is still a work in progress, so if your translation vendor delivers ICU strings today, that is a real blocker.

If you already have a vue-i18n codebase, the [`@intlayer/vue-i18n` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/vue-i18n.md) aliases `vue-i18n` imports at the bundler level, so `useI18n()`, `$t`, pipe plurals and the `v-t` directive keep working while the content is served by Intlayer. The [step-by-step migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_vue-i18n_to_intlayer.md) covers moving off the adapter afterwards, component by component.

## Trade-offs and common mistakes

- **Shipping the full vue-i18n build.** If you are not using `@intlify/unplugin-vue-i18n`, you are shipping the message compiler to the browser and paying for it on every page.
- **Leaving `legacy: true` in a Vue 3 app.** It works, but you lose `useI18n()` typing and you carry the Vue 2 compatibility layer.
- **Treating locale files as append-only.** Nothing warns you about dead keys. Budget a periodic sweep, or pick a model where content is scoped to a component.
- **Switching locale with a button instead of a link.** Crawlers do not click. Render locale switchers as `<a>` / `NuxtLink` pointing at the localized URL.
- **Assuming a per-component model is free.** It is not: you gain scoping and types, you lose the ability to hand a translator one big JSON file without tooling.

## Going further

- [Vue i18n benchmark: bundle size, leakage and locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md)
- [Set up i18n in a Vite + Vue app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+vue.md)
- [Set up i18n in a Nuxt app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nuxt.md)
- [Drop-in `vue-i18n` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/vue-i18n.md) and the [full migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_vue-i18n_to_intlayer.md)
- [vue-i18n vs Intlayer, feature by feature](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/vue-i18n_vs_intlayer.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
- [How bundle optimization works at build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md)
