---
createdAt: 2025-01-16
updatedAt: 2026-09-02
title: React i18n - how the provider model works and what it costs
description: React has no built-in i18n. How the context-provider model works, why t("a.b") has no types, how plurals and lazy loading behave, and how the libraries differ.
keywords:
  - react i18n
  - react internationalization
  - react-i18next
  - react-intl
  - Lingui
  - useTranslation
  - Intlayer
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - react
author: aymericzip
---

# React i18n: the provider model, and what it costs you

React has no i18n primitive. There is no `useTranslation` in `react`, no message format, no locale negotiation, so every React app picks a library on day one and lives with that decision for years. This post covers the model all of them share, the four places it costs you something, and how `react-i18next`, `react-intl`, Lingui and Intlayer differ once you get past the hello world.

## Table of Contents

<TOC/>

## The starting point

Before any library, the code looks like this and it is wrong in a way that only shows up later:

```tsx fileName="src/components/CartSummary.tsx"
export const CartSummary = ({ count }: { count: number }) => (
  <section>
    <h2>Your cart</h2>
    <p>{count} items</p>
  </section>
);
```

Two hardcoded strings, one broken plural (`1 items`), and a number that will need grouping separators in `de-DE`. Multiply by three hundred components and you have the actual problem: not translating strings, but keeping three hundred components and N locale files in sync for two years.

If the vocabulary is new, start with [what internationalization actually covers](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md).

## Every React i18n library is the same shape

Whatever you pick, you get the same three pieces:

1. A **store** holding the active locale and the loaded messages.
2. A **provider** putting that store into React context.
3. A **hook** reading from context inside components.

```tsx fileName="src/main.tsx"
<I18nProvider locale={locale} messages={messages}>
  <App />
</I18nProvider>
```

That is the whole model. It has one structural consequence worth understanding before you compare APIs: **whatever you hand the provider travels into the client bundle**. `messages` is a plain JS object serialized into your JS chunks (or into the SSR payload, then hydrated). A component that renders one heading pulls in the context, and the context holds every message that was loaded, for every page.

This is why "i18n made my bundle big" reports are almost never about the library. They are about the catalog. The [TanStack Start benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/tanstack.md) measures the two separately for exactly this reason: library code in an empty component, and content per route.

## Key-based versus component-based

Two ways to reference a string. This is the real fork in the road, more than any API detail.

**Key-based** (`react-i18next`, `react-intl`, `next-intl`): the component holds an identifier, the text lives in a catalog.

```tsx
const { t } = useTranslation("cart");
return <h2>{t("summary.title")}</h2>;
```

**Component-based** (Lingui's `<Trans>`, Intlayer's nodes): the source text or a typed node lives at the call site, extraction happens at build time.

```tsx
return <Trans>Your cart</Trans>;
```

Key-based wins when translators work in a TMS and never see your code. Component-based wins on review, because a diff shows the actual copy, and on dead-code detection, because deleting the component deletes the string.

## Why `t("some.key")` gives you nothing

`t` is typed `(key: string) => string`. That is the default in every key-based library, and it means:

- A typo compiles. You find it at runtime, in the locale nobody tests.
- Renaming a nesting level in `en.json` breaks the other ten locales silently.
- Deleting a component leaves its keys in every catalog forever. Nothing warns you.

You can fix this. `react-i18next` supports declaration merging on `CustomTypeOptions` so `t` is narrowed to the keys of your resources; `react-intl` gets there through `formatjs` extraction plus a generated union. Both work, and both are extra wiring that has to survive lazily loaded namespaces, where the type describes messages that may not be loaded yet.

The honest summary: type safety on keys is achievable everywhere, it is on by default almost nowhere.

## Plurals and interpolation

Three incompatible formats, one problem.

| Library         | Plural syntax                                        | Note                                               |
| :-------------- | :--------------------------------------------------- | :------------------------------------------------- |
| `react-i18next` | Suffix keys: `item_one`, `item_other`                | i18next's own format, driven by `Intl.PluralRules` |
| `react-intl`    | ICU: `{count, plural, one {# item} other {# items}}` | Standard, portable to most TMS platforms           |
| Lingui          | ICU via macros, compiled                             | Same format, compiled to a compact runtime         |
| Intlayer        | `plural({ one, other })` helper                      | CLDR categories, not ICU strings                   |

ICU is the interchange format your translation vendor most likely speaks. If you are already receiving ICU strings, that constrains the choice more than bundle size does. There is a longer write-up on [ICU MessageFormat and where it helps](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md).

Interpolation has a second trap: putting a `<Link>` inside a translated sentence. Every library has an answer (`<Trans>` in i18next and Lingui, rich text tags in `react-intl`), and all of them are more awkward than the plain string case. Budget for it.

## Lazy loading per route

The mechanism is the same everywhere: split catalogs into namespaces, load the namespace a route needs, use `React.lazy` or your router's loader to fetch it.

```tsx
const { t } = useTranslation("checkout"); // loads locales/en/checkout.json
```

Two things go wrong in practice. First, a namespace once loaded stays in the store, so navigating through five routes leaves you with five catalogs in memory and in the hydration payload. Second, nothing enforces the mapping. A shared `<Button>` reaching for `t("common:cta")` quietly makes `common` a dependency of every route.

The result shows in the benchmark as **leakage**: content from other locales or other routes riding along in a page's bundle. It is a discipline problem, not a library bug, and discipline erodes across teams.

## If you later move to a framework

Plain React means everything is a Client Component, so this does not bite yet. It bites the day you move to Next.js App Router or another RSC-based framework: React context does not cross the server/client boundary, so a hook-based `t()` forces `"use client"` on any component that renders text.

The workarounds are a server-side async `getTranslations()` alongside the client hook, which is two APIs for one job. Worth knowing before you standardize on a pattern across a large codebase. The [Next.js i18n post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/nextjs.md) covers that boundary; for routing-specific setups see the [React Router](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/react-router.md), [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/tanstack-start.md) and [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/react-native.md) posts.

## The four realistic options

Library sizes below are from the TanStack Start benchmark, measured after bundling, tree-shaking and minification, on a 10-page / 10-locale app. They cover provider plus hook in an empty component, not your content.

| Library                | Model                                | Types on keys                  | Library size                          |
| :--------------------- | :----------------------------------- | :----------------------------- | :------------------------------------ |
| `react-i18next@17.0.2` | Key-based, runtime catalogs          | Opt-in via `CustomTypeOptions` | ~17.3 kB, about 3.5× `react-intlayer` |
| `react-intl@10.1.1`    | Key-based, ICU-native                | Opt-in via extraction          | ~14.4 kB, about 3× `react-intlayer`   |
| `@lingui/core@5.3.0`   | Macros compiled at build time        | Good, from the compiler        | Compiled catalogs, small runtime      |
| `react-intlayer`       | Per-component declarations, compiled | Generated, on by default       | Baseline in the benchmark             |

**`react-i18next` is the right answer for most teams.** It has the largest plugin ecosystem, backends for every TMS, detectors, and a decade of Stack Overflow answers. If you have no specific constraint, picking it is not a mistake. The costs are real but boring: heaviest of the four, its own plural format, and the type wiring is yours to maintain.

**`react-intl`** is the one to pick if ICU compliance matters and your translators live in a platform that speaks it. The DX is verbose: `const intl = useIntl()` then `intl.formatMessage({ id })` for every string.

**Lingui** trades runtime for a compiler. `lingui extract` / `lingui compile` is an extra build step and the macro syntax has several forms (`t()`, tagged templates, `i18n.t()`, `<Trans>`) that are easy to mix up, but the bundle result is good.

For a feature-by-feature table, there is a dedicated [react-i18next vs react-intl vs Intlayer comparison](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/react-i18next_vs_react-intl_vs_intlayer.md).

## Intlayer: content declared next to the component

Intlayer moves the catalog. Instead of `locales/en.json`, each component gets a `.content.ts` file beside it, and a build plugin compiles those declarations into per-component dictionaries.

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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

`useIntlayer` returns typed nodes, so `title` autocompletes and a typo fails `tsc`, with no declaration merging to set up. Locale switching goes through `useLocale()`, which returns `locale`, `availableLocales` and `setLocale`.

The scoping falls out of the file layout: because the dictionary key is declared in one file and read in one component, the compiler ships only what a route renders, and deleting the folder deletes the strings.

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

**What it costs you.** A bundler plugin is mandatory: no `vite-intlayer` or equivalent, no dictionaries, so there is no way to use it in a no-build setup. The ecosystem is far smaller than i18next's, which means fewer TMS backends and fewer answers when you get stuck. ICU message format support is still partial, so if your vendor delivers ICU strings today that is a genuine blocker. And handing a translator one big JSON file requires tooling, since the content is spread across the codebase by design.

On an existing `react-i18next` codebase, the [`@intlayer/react-i18next` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-i18next.md) aliases `react-i18next` imports at the bundler level so `useTranslation`, `<Trans>` and suffix plurals keep working, and the [step-by-step migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_react-i18next_to_intlayer.md) covers moving off the adapter afterwards. There are equivalents for [`react-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-intl.md) and [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/lingui.md).

## Common mistakes

- **Loading every locale into the provider.** The most common cause of a heavy bundle. Load the active locale, fetch the rest on switch.
- **Letting shared components own namespaces.** A `common` namespace referenced by a `<Button>` becomes a dependency of every route.
- **Switching locale with a `<button>`.** Crawlers do not click. Render locale switchers as `<a>` pointing at the localized URL.
- **Skipping the type wiring "for now".** It is much cheaper to set up at 20 keys than at 2000.
- **Treating catalogs as append-only.** Nothing detects dead keys in a key-based setup. Schedule a sweep, or pick a model where content is scoped to a component.
- **Formatting dates and numbers by hand.** `Intl.DateTimeFormat` and `Intl.NumberFormat` are in every runtime you target. Every library above wraps them; none of them need a helper you wrote.

## Going further

- [i18n library benchmark: bundle size, leakage and locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md)
- [Set up i18n in a Vite + React app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)
- [Drop-in `react-i18next` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-i18next.md) and the [full migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_react-i18next_to_intlayer.md)
- [react-i18next vs react-intl vs Intlayer, feature by feature](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/react-i18next_vs_react-intl_vs_intlayer.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
- [Compiler-based vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md)
- [How bundle optimization works at build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md)
