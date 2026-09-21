---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "How to pick the right Vue i18n library in 2026"
description: A decision guide for Vue and Nuxt internationalization. Which questions to answer before comparing vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide and Intlayer, and what each choice costs in bundle size, typing and SSR payload.
keywords:
  - vue i18n
  - vue internationalization
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# How to pick the right Vue i18n library

"Vue i18n" is both a generic term and the name of the library nearly everyone installs. That is convenient and misleading at the same time: `vue-i18n` is a fine default, but it is not the only option, and the questions that should drive the choice (SSR or not, how many pages, who writes the translations) are rarely asked before `npm install`.

This guide asks them first, then maps the answers to the libraries that fit, for plain Vite + Vue and for Nuxt.

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Table of Contents

<TOC/>

## Six questions to answer before comparing libraries

1. **Vite SPA or Nuxt?** In an SPA the catalog cost is a JS bundle problem. In Nuxt it is also an HTML payload problem, because the messages are serialized into the SSR state and hydrated. Most "vue-i18n is slow" reports come from Nuxt apps for this reason.
2. **Who writes the translations?** Developers, a TMS, an agency delivering ICU strings, or an AI pipeline. `vue-i18n` uses its own pipe-separated plural syntax, not ICU. That matters if strings come from outside.
3. **How many locales and pages?** Two locales and five pages can ship everything. Ten locales and forty routes cannot, and the loading strategy becomes the main cost.
4. **Do you need types on keys?** `t("cart.totl")` compiles in `vue-i18n` unless you pass a message schema generic, and that schema fights with lazily loaded catalogs.
5. **What does the content contain?** UI labels only, or markdown, links inside sentences, and per-locale blocks. Rich content is where `t()` returning a string gets awkward.
6. **Is CSP a constraint?** The default `vue-i18n` build compiles messages in the browser with `new Function`. Runtime-only builds need `@intlify/unplugin-vue-i18n` to precompile at build time.

Write the answers down. Everything below refers back to them.

## The landscape in one picture

The Vue ecosystem has fewer i18n libraries than React, and they come from different architectural waves.

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime dictionaries (2015 to 2019): vue-i18n, @nuxt/i18n">

`vue-i18n` appeared in 2015 and has been the default ever since. `@nuxt/i18n` wraps it with locale routing, SEO tags and lazy loading per locale. Messages are compiled to render functions, at build time if you add the unplugin, in the browser otherwise.

</Accordion>
<Accordion header="Alternative formats (2020): fluent-vue">

Mozilla Fluent `.ftl` files brought a friendlier message syntax with grammar-aware variants. No key types, and the Vite plugin loads every locale into every page.

</Accordion>
<Accordion header="Compiler and colocated content (2024 to 2026): Paraglide, Intlayer">

Paraglide generates one function per message and lets the bundler tree-shake the rest. Intlayer declares content per component in `.content.ts` files, generates types, and ships only what a route renders.

</Accordion>
</AccordionGroup>

The [history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/history_of_i18n.md) covers each wave in detail.

## The decision that matters most: where content lives and when it loads

Two structural choices explain most of the bundle difference between setups:

- **Centralized or scoped content.** One `locales/en.json` for the app, or one declaration per component.
- **Static or dynamic import.** Everything at startup, or the active locale (and ideally the active route) fetched on demand.

The graph estimates the payload for a theoretical app of 1 to 10 pages, translated into 1 to 10 locales, with about 30 KB of text per page.

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` supports the dynamic axis: `setLocaleMessage` after an `import()` means you stop shipping nine locales nobody reads. What it does not give you is the page axis. A locale catalog is one object, and loading it loads every page's copy. In an SPA nobody notices. In Nuxt, with `@nuxtjs/i18n` and more than ten pages, every route carries the strings of every other route, twice: in the JS chunk and in the SSR payload.

The [Vue benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md) measures this as "leakage from other routes" and "leakage from other locales". If your answer to question 3 was "many pages", this section outweighs any API preference. The [per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md) post covers the maintenance side of the same trade-off.

## The candidates

Library sizes are from the [Vue benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md): plugin plus composable in an empty component, after bundling, tree-shaking and minification, on a 10-page, 10-locale app. Content is measured separately.

| Library        | Content model                                             | Type safety                       | Message format                      | Per-route splitting | Library size                                      |
| :------------- | :-------------------------------------------------------- | :-------------------------------- | :---------------------------------- | :------------------ | :------------------------------------------------ |
| `vue-i18n`     | Central catalogs per locale, optional SFC `<i18n>` blocks | 2/5 — Opt-in via a schema generic | Own (pipe plurals)                  | No                  | ~24.3 kB                                          |
| `@nuxtjs/i18n` | Same as `vue-i18n`, plus routing and SEO tags             | 2/5 — Same                        | Same                                | No, per locale only | ~24.3 kB                                          |
| `fluent-vue`   | `.ftl` files (Mozilla Fluent)                             | 1/5 — None                        | Fluent                              | No                  | ~29.7 kB                                          |
| Paraglide      | inlang project, generated functions                       | 3.5/5 — Generated                 | Own                                 | Via tree-shaking    | Near zero (due to generated code in the codebase) |
| Intlayer       | One `.content.ts` per component                           | 5/5 — Generated, on by default    | Intlayer (+ ICU, i18next, vue-i18n) | Yes, per component  | ~3.9 kB                                           |

> Numbers are a snapshot at the benchmark's versions. Run it on your own app before deciding on size alone.
> Type safety: 5/5 means keys, parameters and every locale are checked without manual setup, including url formater and helpers.

Paraglide's near-zero library size is by construction: the runtime is generated into your repository, which means a regeneration step before every push and merge conflicts on generated files. Intlayer needs `vite-intlayer` (or the Nuxt module), so it cannot run without a build step.

## Match your answers to a library

<AccordionGroup>
<Accordion header="Vite SPA, small team, few locales">

`vue-i18n` in Composition mode (`legacy: false`), with `@intlify/unplugin-vue-i18n` so you ship the runtime-only build. Lazy-load locales with `import()`. That covers most small apps and the community answers are everywhere. SFC `<i18n>` blocks colocate messages with the component, which helps, but the extraction and TMS tooling around them is thinner than around JSON catalogs, so decide early which one the team uses.

</Accordion>
<Accordion header="Nuxt with locale routing, sitemap and hreflang">

`@nuxtjs/i18n` gives you the routing strategy, the `hreflang` tags and the locale detection with no code, and that alone justifies it for content sites with a handful of pages. Its limit is the per-locale catalog: past ten or so pages the SSR payload carries every route's copy. If that is your case, either hand-wire `vue-i18n` with per-route messages, or move to scoped content. The [Nuxt i18n post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/nuxt.md) walks through the routing strategy choice first.

</Accordion>
<Accordion header="Translations come from a TMS or an agency delivering ICU">

`vue-i18n`'s plural syntax (`"no item | one item | {count} items"`) is not ICU and is not portable. Translators need to be told about it, and a TMS export will not produce it. Either agree on the format before the first catalog exists, or pick a library whose format matches your vendor. Intlayer's ICU support is partial, so if you receive ICU strings today, treat that as a blocker too.

</Accordion>
<Accordion header="Large app, many routes, bundle or SSR payload budget">

Prefer scoped content compiled at build time. Paraglide gets there through tree-shaking, which works as advertised on Vite. Intlayer gets there through per-component declarations and ships only what the route renders. With `vue-i18n`, you can split messages by route by hand, but nothing enforces it and a shared component importing a global namespace quietly undoes it.

</Accordion>
<Accordion header="Type safety is non-negotiable">

`vue-i18n` can be typed by passing a schema generic to `createI18n`. It works, and it breaks the moment catalogs are lazily loaded, because the schema describes messages that may not be there yet. If you do not want to maintain that, pick a library whose types are generated from the content: Paraglide or Intlayer. The [detecting missing translations](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/detecting_missing_translations.md) post compares what each catches at build time.

</Accordion>
<Accordion header="Content is more than UI labels">

Markdown pages, sentences with a `<RouterLink>` in the middle, per-locale components. `vue-i18n` has `<i18n-t>` for component interpolation, which works and is verbose. Intlayer's content nodes accept markdown, HTML and nested objects directly, which fits better when the app is content-heavy.

</Accordion>
<Accordion header="Translations will be produced by AI">

Then the centralized JSON has no consumer left to justify it. Colocated content plus a CLI that fills the missing locales is the shorter path. Intlayer's `fill` command runs against your own API key (OpenAI, Anthropic, Mistral, Gemini) and only re-translates what changed.

</Accordion>
</AccordionGroup>

## Where each library falls short

- **`vue-i18n`**: heaviest of the set, own plural format, types are opt-in and fragile with lazy loading, no per-route scoping, dead keys accumulate silently. Leaving `legacy: true` in a Vue 3 app keeps the Vue 2 compatibility layer and loses `useI18n()` typing.
- **`@nuxtjs/i18n`**: inherits everything above, and the SSR payload carries every page's strings once past a dozen routes.
- **`fluent-vue`**: nice message syntax, no key types, and the Vite plugin loads all content in all languages into every page. Heaviest in the benchmark.
- **Paraglide**: generated files committed to the repo, regeneration before every push, and the locale is read from cookie or storage on each message call rather than from a reactive store, which costs work on locale change.
- **Intlayer**: mandatory build plugin, smaller ecosystem, partial ICU support, and content spread across the codebase by design, so exporting one JSON for a translator needs tooling.

## What each option looks like in code

The same component, a cart summary with a title and a plural, written with each candidate. The interesting part is not the template, it is where the content lives and what `vue-tsc` knows about it.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "aucun article | un article | {count} articles"
  }
}
```

  </Tab>
  <Tab value="es" label="Spanish">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "ningún artículo | un artículo | {count} artículos"
  }
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

Pipe-separated plurals are vue-i18n's own format, not ICU. `t` accepts any string unless you pass a message schema generic to `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

  <Tabs group="locale">
  <Tab value="en" label="English">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

  </Tab>
  <Tab value="fr" label="French">

```ftl fileName="src/locales/fr.ftl"
cart-title = Votre panier
cart-items = { $count ->
    [one] { $count } article
   *[other] { $count } articles
}
```

  </Tab>
  <Tab value="es" label="Spanish">

```ftl fileName="src/locales/es.ftl"
cart-title = Tu carrito
cart-items = { $count ->
    [one] { $count } artículo
   *[other] { $count } artículos
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Fluent's syntax handles plurals and grammatical variants well. Message ids are untyped strings, and the Vite plugin bundles every locale into every page.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="Spanish">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Every message is a generated, typed function, so a missing key is an import error. The `paraglide/` folder is generated into your repo and regenerated on every change.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: t({
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

All locales in one file beside the component. Types are generated at build, so `title` autocompletes and a typo fails `vue-tsc`. `<title />` renders a node the visual editor can target; `{{ items(props.count) }}` gives the plain string.

  </Tab>
</Tabs>

Already on `vue-i18n`? The [`@intlayer/vue-i18n` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/vue-i18n.md) aliases the package at the bundler level, so `useI18n()`, `$t`, pipe plurals and `v-t` keep working while Intlayer serves the content. The [migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_vue-i18n_to_intlayer.md) covers moving off the adapter afterwards, and there is a [Nuxt-specific one](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_nuxtjs_i18n_to_intlayer.md).

## Before you commit

A feature table tells you what a library does today. These points tell you what living with it will be like.

**Check repository activity.**

Commits, issue response time, and whether the last minor release was this year. A sound design with no maintainer is a migration in waiting.

**Do not pick by npm downloads.**

The most installed library is the one that shipped first, not the one that fits a 2026 Vue codebase. Downloads measure history, not fit.

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Ask who pays the maintainer, and what they sell.**

`vue-i18n` is backed by Crowdin, like `next-intl` and `svelte-i18n`. `i18next` is backed by Locize. Tolgee, Paraglide (inlang) and Intlayer each run their own platform. A vendor whose revenue is hosted translation has little reason to make translation free inside your toolchain. Intlayer is the only one of the set that ships AI translation through the CLI with your own API key, and a CMS you can self-host.

**Is it AI-agent ready?**

Agents still struggle with i18n: they forget locales, invent keys, and mix message syntaxes. Does the library ship [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md) or an [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md) so the agent can list, fill and test content? And is content loading optimized by default, or does someone have to review namespaces and lazy imports every quarter?

**Type safety out of the box.**

Not "can be typed with extra wiring" but "a wrong key fails `tsc` on a fresh install". Check what happens with a key that does not exist, and with a locale that is missing one translation.

**Detection of unused content.**

Catalogs only grow. Intlayer's build purges unused fields and logs them (`build.purge`). Paraglide gets there by architecture, since an uncalled message function is tree-shaken. Everything else leaves the sweep to you.

**Developer experience.**

Setup time to first translated string, an [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md) or [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md) that shows the translation on hover and jumps to the declaration, a [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) for fill, test and push, a [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) or extractor that pulls hard-coded strings out of your components so you do not manage every string key by key, and a way for non-developers to edit content ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)) without a pull request.

## Frequently Asked Questions

<FAQ>

<Question title="Is vue-i18n still the right default in 2026?">

For most Vue apps, yes. The ecosystem is the largest, the documentation is thorough, and the costs are predictable: a heavy runtime, a custom plural format, and per-route scoping that you have to build and defend yourself.

</Question>

<Question title="Should I use @nuxtjs/i18n or wire vue-i18n by hand in Nuxt?">

Use the module unless your routing is unusual or your app has few pages. Hand-wiring means rebuilding locale routes, middleware, `hreflang` and the sitemap yourself, and those are fiddlier than they look.

</Question>

<Question title="Do I need a compiler-based library?">

Only if bundle size, SSR payload, generated types or build-time missing-key checks are actual requirements. The [compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md) post explains what compilers give you and where they can get it wrong.

</Question>

<Question title="Does the library choice affect SEO?">

Indirectly. Crawlers care about routing, `hreflang`, `<html lang>` and whether text is in the server-rendered HTML. See the [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Going further

- [Vue i18n benchmark: bundle size, leakage and locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md)
- [Vue i18n: how vue-i18n works and where it hurts](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/vue.md) and the [Nuxt i18n post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n vs Intlayer, feature by feature](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/vue-i18n_vs_intlayer.md) and the [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/vue-i18n_vs_intlayer_benchmark.md)
- [Is vue-i18n outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/is_vue-i18n_outdated.md)
- [The history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/history_of_i18n.md)
- [Compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
- [Set up i18n in a Vite + Vue app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+vue.md) and in a [Nuxt app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nuxt.md)
- Same guide for [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/how_to_pick_svelte_i18n_library.md) and [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/how_to_pick_solid_i18n_library.md)
