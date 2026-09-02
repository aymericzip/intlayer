---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Astro i18n: routing is built in, translations are not"
description: Astro's built-in i18n covers locale routing only. What it gives you, where it stops, and how to translate content inside React, Vue or Svelte islands.
keywords:
  - astro i18n
  - Astro internationalization
  - Astro islands
  - astro-i18n
  - i18next
  - locale routing
  - hreflang
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - astro
author: aymericzip
---

# Astro i18n: routing is built in, translations are not

Astro ships an `i18n` config that handles locale prefixes, redirects and fallbacks. It does not ship a message catalog, an interpolation syntax or plural handling: you bring those. This post covers what Astro gives you natively, where it stops, and the specific problem nobody warns you about: getting translations into an island.

## Table of Contents

<TOC/>

## What Astro actually gives you

Enable it in `astro.config.mjs`:

```js fileName="astro.config.mjs"
import { defineConfig } from "astro/config";

export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

That buys you four things:

| Feature                                             | What it does                                            |
| --------------------------------------------------- | ------------------------------------------------------- |
| `Astro.currentLocale`                               | The locale parsed from the URL, or `defaultLocale`      |
| `Astro.preferredLocale`                             | Best match from the `Accept-Language` header (SSR only) |
| `getRelativeLocaleUrl` / `getRelativeLocaleUrlList` | Build links to the same page in another language        |
| `i18n.fallback`                                     | Redirect or rewrite a missing locale to another one     |

And that's the list. There is no `t()`. Astro's own documentation is explicit about this: you supply the translation layer. The usual starting point is a hand-rolled object plus a helper.

```ts fileName="src/i18n/ui.ts"
export const defaultLang = "en";

export const ui = {
  en: { "nav.home": "Home", "cart.items": "items" },
  fr: { "nav.home": "Accueil", "cart.items": "articles" },
} as const;

export const useTranslations =
  (lang: keyof typeof ui) => (key: keyof (typeof ui)[typeof defaultLang]) =>
    ui[lang][key] ?? ui[defaultLang][key];
```

In a `.astro` file this is genuinely fine. The frontmatter runs at build time, the strings are inlined into static HTML, and nothing ships to the browser. Astro is a good place to do i18n badly and get away with it.

## Then you add an island

Here is the same helper inside a React island:

```tsx fileName="src/components/Cart.tsx"
import { useTranslations } from "../i18n/ui";

export const Cart = ({ count }: { count: number }) => {
  const t = useTranslations("en"); // the island has no idea what locale the page is

  return (
    <span>
      {count} {t("cart.items")}
    </span>
  );
};
```

On `/fr/panier` this renders "3 items". The reason is the part of Astro people skip: **an island is a separate client entry point, not a child of the page**. `Astro.currentLocale` exists in frontmatter and nowhere else. The island gets props and its own bundle, and that is all.

There are three ways out and each one costs something:

1. **Pass the locale as a prop.** `<Cart count={3} lang={Astro.currentLocale} client:load />`. Correct, but now `import { ui }` pulls _every_ language's strings into the island's client bundle, because a static import isn't split by locale.
2. **Pass the resolved strings as props.** No catalog in the bundle, but you hand-plumb every string through the page, and the props aren't checked against anything. Add a string to the island, forget the page, ship English.
3. **Detect the locale in the island at runtime.** Read `document.documentElement.lang` on mount. With `client:load` the island is also rendered on the server, where there is no DOM to read, so the prerendered markup is in the default language and swaps on hydration. That's the flash of untranslated content.

Add a second island framework and it compounds: a React island and a Vue island each need their own i18n runtime, their own initialization, and their own copy of the catalog. Same strings, two sources of truth.

## How the common libraries handle it

**i18next / react-i18next / vue-i18n.** Mature, well documented, plurals via `Intl.PluralRules`, interpolation, an enormous plugin ecosystem. In Astro you initialize an instance in the `.astro` frontmatter _and_ an instance inside each island. Namespace loading is manual, so it is easy to over-ship: if the island imports `common.json` and `common.json` is 40 KB across all locales, that's what the browser downloads. This is the safest choice if your team already knows i18next.

**`astro-i18n` (community).** Astro-native, gives you a `t()` with interpolation and variants on the page side. The island side is still yours to solve.

**Paraglide.** Compiles each message into a tree-shakeable function, so `import { cart_items } from "./paraglide/messages"` works identically in `.astro` frontmatter and in a React island, and the bundler drops what you don't call. Genuinely well suited to Astro's shape. The trade-off is the one described in [Compiler vs. declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md): the message layer lives in generated code rather than in your source.

**Astro native + hand-rolled.** Zero dependencies, and for a five-page marketing site with no islands it's the right answer. It stops scaling the moment you need plurals in Polish or a translator who isn't you.

## How Intlayer handles it

Intlayer declares content per component in a `.content.ts` file and compiles it at build time. Astro is one of the few frameworks where that maps cleanly onto the runtime model: an island is already a component boundary, so the dictionary boundary and the bundle boundary are the same line.

```bash packageManager="npm"
npm install intlayer astro-intlayer react-intlayer @astrojs/react
```

```typescript fileName="astro.config.ts"
import { intlayer } from "astro-intlayer";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [intlayer(), react()],
});
```

Declare the content once, next to the component that uses it:

```tsx fileName="src/components/cart.content.tsx"
import { plural, t, type Dictionary } from "intlayer";

const cartContent = {
  key: "cart",
  content: {
    items: t({
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartContent;
```

The `.astro` page reads it with `getIntlayer` and passes only the locale down:

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  getHTMLTextDir,
  type LocalesValues,
} from "intlayer";
import { Cart } from "../../components/Cart";

export const getStaticPaths = () =>
  localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <title>{title}</title>
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }
  </head>
  <body>
    <h1>{title}</h1>
    <Cart count={3} locale={locale} client:only="react" />
  </body>
</html>
```

And the island resolves its own content from the locale it was handed:

```tsx fileName="src/components/Cart.tsx"
/** @jsxImportSource react */
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import type { LocalesValues } from "intlayer";

const CartContent = ({ count }: { count: number }) => {
  const { items } = useIntlayer("cart");

  return <span>{items(count)}</span>;
};

export const Cart = ({
  count,
  locale,
}: {
  count: number;
  locale: LocalesValues;
}) => (
  <IntlayerProvider locale={locale}>
    <CartContent count={count} />
  </IntlayerProvider>
);
```

Two things follow from this. The island receives the page's locale as a prop, so it hydrates in the right language instead of flashing the default one. And the same `cart` dictionary is readable from `astro-intlayer` on the page and from `vue-intlayer` or `svelte-intlayer` in another island, so you do not run one i18n library per island runtime.

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Trade-offs and common mistakes

**Don't run two routing layers.** If you set Astro's `i18n.locales` _and_ Intlayer's `routing.mode`, you get two components deciding what `/fr/about` means, and prefix redirects can bounce. Pick one owner for the URL shape.

**`client:only` islands are invisible to crawlers.** The Intlayer Astro guides use `client:only="react"`, which means that island renders nothing at build time. Keep anything you want indexed (headings, body copy, links) in `.astro` frontmatter, and reserve islands for interactive UI.

**hreflang has to be built from the unlocalized path.** Generating alternates from `Astro.url.pathname` on `/fr/about` will produce `/es/fr/about` unless you strip the prefix first. `getLocalizedUrl` handles this; a hand-rolled version usually doesn't. See the [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/hreflang_guide_multilingual_seo.md).

**Intlayer's honest downsides.** It needs a build step: dictionaries are generated into `.intlayer/`, which you add to `tsconfig.json` `include` and to `.gitignore`. Its ecosystem is much smaller than i18next.s, with fewer StackOverflow answers and fewer third-party plugins, and the project is younger. If you already have JSON catalogs and a working i18next setup, migrating buys you bundle size and typing, not correctness. Check the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md) before deciding that trade is worth it.

**Migration doesn't have to be a rewrite.** The [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md) expose the same public API as your current library and delegate to Intlayer underneath, so `useTranslation()` calls keep working while the content layer moves.

## Going further

- [Translate your Astro website with Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro.md): routing, sitemap, robots.txt and locale switcher for `.astro` pages
- [Astro + React islands setup](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_react.md), and the equivalents for [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_vue.md) and [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_svelte.md)
- [Configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md): `routing.mode`, domains, locale storage
- [i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18next.md) and the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md): what actually reaches the browser
- [What is internationalization (i18n)?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md) and [the meaning of i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_meaning.md)
- Same series, other runtimes: [React i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/react.md), [Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/vue.md), [Svelte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/svelte.md)
