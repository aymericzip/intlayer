---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: Nuxt i18n - routing strategies and the SSR payload cost
description: How to configure @nuxtjs/i18n routing strategies for SEO, why SSR makes you ship every translation twice, and what lazy loading with langDir really does.
keywords:
  - nuxt i18n
  - "@nuxtjs/i18n"
  - Nuxt internationalization
  - useSwitchLocalePath
  - useLocaleHead
  - prefix_except_default
  - Nuxt SSR payload
  - Intlayer
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - nuxt
author: aymericzip
---

# Nuxt i18n: routing strategies and the SSR payload cost

`@nuxtjs/i18n` (usually written `@nuxt/i18n`) is the default answer for a multilingual Nuxt app, and it is a good one: generated locale routes, SEO head tags, per-page path overrides, lazy catalogs. What the docs do not spell out is that server rendering makes you pay for your translations twice, once in the HTML and once in the hydration payload. This post covers the routing strategies worth picking, that payload cost, and how to measure it on your own site.

<iframe title="How to translate an Nuxt and Vue app using Intlayer? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## Table of Contents

<TOC/>

## What the module actually does

`@nuxtjs/i18n` wraps `vue-i18n` and adds the Nuxt parts on top: it rewrites your `pages/` tree into locale-prefixed routes, injects a locale-detection middleware, manages a locale cookie, and gives you composables that know about the current prefix. If you are unfamiliar with the underlying library, [how vue-i18n works and where it hurts](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/vue.md) covers the message format, plurals and the compiler build.

The minimal config looks like this:

```ts fileName="nuxt.config.ts"
export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n"],
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      { code: "en", language: "en-US", file: "en.json" },
      { code: "fr", language: "fr-FR", file: "fr.json" },
    ],
    langDir: "locales/",
  },
});
```

Everything else in the module is a consequence of two choices: the `strategy`, and whether your catalogs are lazy.

## Pick the routing strategy first

The `strategy` option decides your URL shape, and changing it later means redirects for every indexed page. There are four values.

| Strategy                | Default locale URL       | Other locale URL | Indexable per locale                  |
| :---------------------- | :----------------------- | :--------------- | :------------------------------------ |
| `prefix_except_default` | `/about`                 | `/fr/about`      | Yes                                   |
| `prefix`                | `/en/about`              | `/fr/about`      | Yes                                   |
| `prefix_and_default`    | `/about` and `/en/about` | `/fr/about`      | Yes, with a duplicate to canonicalize |
| `no_prefix`             | `/about`                 | `/about`         | No                                    |

`no_prefix` keeps the locale in a cookie and serves every language from the same URL. A crawler has one URL to index and no way to request the other languages, so only one language ends up in the index. There is no `hreflang` setup that fixes this, because `hreflang` needs distinct URLs to point at. Use `no_prefix` only for an authenticated app that search engines never see.

`prefix_and_default` is the trap in the list. It exposes both `/about` and `/en/about` for the same content, so you inherit a duplicate-URL problem and have to make sure the canonical tag agrees with your sitemap. `prefix_except_default` is the sane default; `prefix` is better if you want all locales symmetrical and do not mind a redirect from `/`.

## The SSR payload: you ship the catalog twice

This is the Nuxt-specific issue, and it is invisible until you look at the response body.

With SSR, the server loads the messages for the requested locale, renders the HTML, then serializes the state it used into the page so the client can hydrate without refetching. Translations are part of that state. The French string that already appears as visible text in your markup appears again, verbatim, inside the serialized payload.

That is tolerable when the payload holds only what the page renders. It is not, because a `vue-i18n` locale catalog is one object: there is no per-route split. Load `fr.json` to render twelve strings on `/fr/contact` and the payload carries the whole French catalog, including your checkout copy, your legal pages and your error messages. The Intlayer [Vue i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md) states this directly: on Nuxt, `@nuxt/i18n` ends up including the messages from all pages into a single one, and past roughly ten pages it becomes a real problem.

Check your own site in one command. Take a string that only exists on a different page and count it in the response:

```bash
curl -s https://example.com/fr/contact | grep -c "Ajouter au panier"
```

Zero is what you want. One means the catalog is in the payload. Two or more means it is in the payload and in an inlined chunk. `nuxt generate` behaves the same way, with the payload baked into the emitted `_payload.json` files, so prerendering does not save you.

The library itself is a smaller line item: `vue-i18n@11.4.0` measures about **24.3 kB** after bundling and minification in that benchmark. Content is the bigger number in almost every real app.

## Lazy loading splits by locale, not by page

`langDir` plus a `file` per locale gives you real code splitting across languages. A visitor on `/fr` does not download `en.json`, and adding a tenth locale costs nothing to the other nine.

```ts fileName="nuxt.config.ts"
i18n: {
  lazy: true,
  langDir: "locales/",
  locales: [
    { code: "en", language: "en-US", file: "en.json" },
    { code: "fr", language: "fr-FR", file: "fr.json" },
  ],
}
```

What it does not do is split by route. `fr.json` is one file and one runtime object; loading it loads every page's copy. You can hand-roll namespaces by giving each locale several files and calling `setLocaleMessage` yourself, but you are then maintaining the mapping from routes to namespaces by hand, and nothing tells you when a namespace stops being used. This is the same limitation described in the [per-component vs centralized i18n comparison](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md).

## Links, not buttons

`useLocalePath()` localizes an internal path in the current locale. `useSwitchLocalePath()` returns the current route in another locale, which is what a language switcher needs.

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
const { locales, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <nav>
    <NuxtLink
      v-for="l in locales"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      :hreflang="l.language"
      :aria-current="l.code === locale ? 'true' : undefined"
    >
      {{ l.name ?? l.code }}
    </NuxtLink>
  </nav>
</template>
```

Render this as links, never as a `<select>` or a row of buttons calling `setLocale()`. Crawlers do not click and do not run your switcher's JavaScript. If the only path to `/fr/about` is a click handler, that page is discoverable only through your sitemap, and internal links are a large part of how it gets crawled at all. The same rule applies to every internal link: use `useLocalePath()` or `<NuxtLinkLocale>` so navigation stays inside the current prefix.

For per-page localized paths, `defineI18nRoute({ paths: { fr: "/a-propos" } })` in the page component overrides the generated route for that locale, which is worth doing for pages where the slug carries a keyword.

## SEO tags

`useLocaleHead()` builds the `lang` and `dir` attributes, the `hreflang` alternates including `x-default`, the canonical, and the `og:locale` tags from your locale list. Call it once in a layout.

```vue fileName="layouts/default.vue"
<script setup lang="ts">
const head = useLocaleHead();

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  link: head.value.link,
  meta: head.value.meta,
}));
</script>
```

Two things it will not do for you. It does not translate your titles and descriptions, so each page still needs its own localized `useHead` call. And it does not produce a sitemap: pair it with `@nuxtjs/sitemap`, which reads the module's locale config and emits `xhtml:link` alternates per URL. If the `hreflang` rules are not familiar, the [hreflang guide for multilingual SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/hreflang_guide_multilingual_seo.md) covers reciprocity, region codes and `x-default`.

## The alternatives

| Option                   | What changes                                                      | What it costs                                                                        |
| :----------------------- | :---------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `@nuxtjs/i18n`           | Nothing to build, mature, well maintained, largest Nuxt community | Catalog is per locale only, so the SSR payload carries every page's strings          |
| `vue-i18n` wired by hand | Full control over when and what you load, no generated routes     | You write the locale routes, the middleware, the `hreflang` and the sitemap yourself |
| Intlayer                 | Content scoped to the component, compiled at build time           | Build step is mandatory, smaller ecosystem, younger project                          |

Hand-wiring `vue-i18n` in Nuxt is a real option if your app has few pages and unusual routing, but you are rebuilding what the module already gives you, and locale detection plus SEO tags are more fiddly than they look.

## Intlayer on Nuxt

Intlayer changes one thing: content is declared in a file next to the component that renders it, and a build step compiles those declarations into per-component dictionaries. Because the unit is a component and not a locale, a route can only pull in the entries it actually renders, which is what removes the whole-catalog payload.

```ts fileName="components/heroBanner.content.ts"
import { t, type Dictionary } from "intlayer";

const heroBannerContent = {
  key: "hero-banner",
  content: {
    title: t({
      en: "Ship in every language",
      fr: "Publiez dans toutes les langues",
      es: "Publica en todos los idiomas",
    }),
    metaDescription: t({
      en: "A multilingual Nuxt app without the payload tax.",
      fr: "Une application Nuxt multilingue sans surcoût de payload.",
      es: "Una aplicación Nuxt multilingüe sin coste de payload.",
    }),
  },
} satisfies Dictionary;

export default heroBannerContent;
```

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("hero-banner");

useHead({
  title: content.title.raw,
  meta: [{ name: "description", content: content.metaDescription.raw }],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

`<content.title />` renders a node that stays editable in the visual editor, `{{ content.title }}` gives the plain string, and `.raw` gives the primitive value that `useHead` needs. Setup is `npx intlayer init`, then `"nuxt-intlayer"` in the `modules` array of `nuxt.config.ts`; the module handles locale detection, the cookie, the `<html lang>` attribute and the localized routes.

Routing is configured in `intlayer.config.ts` rather than in `nuxt.config.ts`. `routing.mode` takes `"prefix-no-default"` (the default), `"prefix-all"`, `"no-prefix"` and `"search-params"`, and `routing.domains` maps a locale to its own domain. The full setup is in the [Nuxt integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nuxt.md).

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

**What it costs you.** A build step is mandatory: no Nuxt module, no dictionaries, and that includes CI. The ecosystem is far smaller than `@nuxtjs/i18n`'s, so expect fewer Stack Overflow answers and fewer third-party integrations. ICU message format support is still incomplete, which is a blocker if your translation vendor delivers ICU strings today.

You do not have to rewrite components to try it. The [`@nuxtjs/i18n` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/nuxtjs-i18n.md) mirrors `useI18n`, `$t`, `useLocalePath` and `useSwitchLocalePath` on top of Intlayer dictionaries, and the [step-by-step migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_nuxtjs_i18n_to_intlayer.md) shows how to keep your existing `locales/*.json` as the source of truth through the `syncJSON` plugin while you move page by page.

## Common mistakes

- **Choosing `no_prefix` on a public site.** One URL per page means one indexed language. This cannot be fixed later without a redirect plan.
- **Enabling `prefix_and_default` without a canonical.** Two URLs serve the same content by design; decide which one is canonical and make the sitemap agree.
- **Assuming lazy loading fixed the payload.** `lazy: true` splits by locale, not by route. Measure the HTML, not the config.
- **Locale switching through `setLocale()` only.** It works for users and is invisible to crawlers. Use `switchLocalePath()` inside a `<NuxtLink>`.
- **Upgrading major versions without rechecking `langDir`.** The module has moved where locale files resolve from between majors; a silent fallback to the default locale is the usual symptom.

## Going further

- [Vue i18n benchmark: bundle size, leakage and locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md)
- [Set up i18n in a Nuxt app with Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nuxt.md)
- [`@nuxtjs/i18n` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/nuxtjs-i18n.md) and the [full migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_nuxtjs_i18n_to_intlayer.md)
- [How vue-i18n works and where it starts to hurt](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/vue.md)
- [hreflang guide for multilingual SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/hreflang_guide_multilingual_seo.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
- [How bundle optimization works at build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md)
