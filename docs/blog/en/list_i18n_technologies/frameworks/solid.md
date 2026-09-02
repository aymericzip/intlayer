---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Solid i18n: why translations freeze on locale change"
description: Why Solid components capture translations as constants, how @solid-primitives/i18n works, lazy catalogs, SolidStart locale routing, and what Intlayer changes.
keywords:
  - solidjs i18n
  - solid start i18n
  - solid internationalization
  - solid-primitives i18n
  - solid-i18next
  - fine-grained reactivity
  - locale routing
  - Intlayer
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - solid
author: aymericzip
---

# Solid i18n: the translation that never updates

Solid's reactivity model changes what an i18n library has to do, and it changes the bugs you get. The most common one is a page that switches language everywhere except in the three components where someone stored a translation in a `const`. This post explains why that happens, then covers the real options: `@solid-primitives/i18n`, lazy catalogs, SolidStart locale routing, and Intlayer.

## Table of Contents

<TOC/>

## The bug you will hit first

Here is a component that looks correct and is not.

```tsx fileName="src/components/CartSummary.tsx"
import { useI18n } from "~/i18n";

export const CartSummary = () => {
  const t = useI18n();

  const total = t("cart.total"); // evaluated once, during setup

  return (
    <section>
      <h2>{total}</h2>
      <p>{t("cart.items", { count: 3 })}</p>
    </section>
  );
};
```

Switch the locale and the `<p>` updates. The `<h2>` does not. It stays in whatever language was active the first time the component ran, and it will stay there until the component is destroyed and recreated.

In React this code works, because a locale change re-renders the component and re-evaluates every line of its body. In Solid nothing re-runs, so the difference between the two lines is real and permanent.

## Why: components run once

A Solid component is a factory, not a render function. It executes exactly once, returns DOM nodes, and is never called again. What updates afterwards is not the component, it is the individual reactive computations Solid's compiler created inside the JSX.

`{t("cart.items", { count: 3 })}` inside JSX compiles to a getter that Solid wraps in an effect. Reading the locale signal inside it subscribes that one text node. `const total = t("cart.total")` runs in the setup body, outside any tracking scope, so it subscribes to nothing and produces a plain string.

This is the same rule that forbids destructuring props in Solid. Applied to i18n, it means every translated value must stay behind a function call that is executed inside a tracked scope.

The fix is to keep the read lazy:

```tsx fileName="src/components/CartSummary.tsx"
import { createMemo } from "solid-js";
import { useI18n } from "~/i18n";

export const CartSummary = () => {
  const t = useI18n();

  const total = createMemo(() => t("cart.total")); // an accessor, not a string

  return <h2>{total()}</h2>;
};
```

Two consequences worth internalizing:

- A translation you pass to a non-JSX API (a `document.title` assignment, a chart config, an `aria-label` computed in setup) is a snapshot. It needs its own effect or memo.
- A translation stored in a store, a module-level variable or a closure created at setup is a snapshot too. Locale changes will not reach it.

## `@solid-primitives/i18n` is the community default

The Solid ecosystem is small, and this is the option most projects land on. It is not a framework, it is a set of primitives: you own the dictionaries, the locale signal, and the loading strategy.

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";
import { createSignal } from "solid-js";

const en = {
  cart: { total: "Total", items: "{{ count }} items" },
};

export type RawDictionary = typeof en;
export type Dictionary = i18n.Flatten<RawDictionary>;

const [locale, setLocale] = createSignal<"en" | "fr">("en");

const dictionary = () => i18n.flatten(en);
const t = i18n.translator(dictionary, i18n.resolveTemplate);

t("cart.items", { count: 3 }); // "3 items"
```

`flatten` turns the nested object into `"cart.total"` style keys, and `translator` takes an _accessor_, not a value. That signature is the whole design: because the dictionary arrives as a function, `t` reads it inside your tracking scope, and the resulting text is reactive as long as you call `t` in a reactive position.

Types are derived from the English dictionary, so a typo in a key is a compile error without any extra codegen. That is a genuine advantage over `t("a.b.c")` in most other libraries.

What it does not give you: no namespace scoping, no route-aware splitting, no cookie handling, no locale routing, no formatters. On a 10 page app that is fine. On a 40 page app you are writing that layer yourself.

## Lazy loading catalogs

Because `translator` accepts an accessor that may return `undefined`, a resource plugs straight in.

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";
import { createResource, createSignal } from "solid-js";

const fetchDictionary = async (locale: string): Promise<Dictionary> => {
  const module = await import(`./locales/${locale}.ts`);
  return i18n.flatten(module.dictionary);
};

const [locale, setLocale] = createSignal("en");
const [dictionary] = createResource(locale, fetchDictionary);

export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

During the fetch, `t` returns `undefined` and your UI renders empty strings unless you wrap it in a `<Suspense>` or supply a fallback. That transient blank is the price of the split, and it is easy to miss in development where the import resolves instantly.

This splits by locale, not by page. Every route still pays for every other route's copy. Getting per-page splitting out of a flat dictionary means maintaining one file per page per locale by hand.

## SolidStart: the locale has to be resolved on the server

Client-side locale detection does not work for SSR. If the server renders in English and the client then reads a cookie and switches to French, you get a hydration mismatch and a visible flash.

The reliable source of truth is the URL, because the server and the client both see it. SolidStart's file router supports an optional dynamic segment, and `[[locale]]` compiles to `:locale?`:

```plaintext
src/routes/
  [[locale]].tsx          layout that validates the segment
  [[locale]]/
    index.tsx             /        /fr        /es
    about.tsx             /about   /fr/about  /es/about
  [...404].tsx
```

The catch is that `@solidjs/router` expands `:locale?` into two patterns and tries them by specificity. Without a match filter, `/unknown` matches the locale segment and silently renders your home page with `locale="unknown"` instead of a 404. Constrain it in the layout's `route` export:

```tsx fileName="src/routes/[[locale]].tsx"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: { locale: locales },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

Two more server-side pieces are yours to write with any library: setting `<html lang>` and `dir` in `entry-server.tsx`, which sits outside the `Router`, and emitting `canonical` plus `hreflang` links. At the time of writing, `@solidjs/meta` tags are applied on the client after hydration and are not in the server-rendered `<head>` in SolidStart v2, so anything a crawler must see without JavaScript belongs in `entry-server.tsx`. The [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/internationalization_and_SEO.md) covers what those tags need to say.

## The options

| Library                  | Model                                              | Types on keys                       | Notes                                                          |
| :----------------------- | :------------------------------------------------- | :---------------------------------- | :------------------------------------------------------------- |
| `@solid-primitives/i18n` | Flat dictionary you own                            | Inferred from the source dictionary | Very small, no scoping, no routing, no formatters              |
| `solid-i18next`          | i18next catalogs and namespaces                    | Manual declaration                  | Mature plugin ecosystem, heaviest of the set                   |
| `@inlang/paraglide-js`   | Generated message functions                        | Generated                           | Compiled messages, but a regeneration step before every commit |
| Intlayer                 | One `.content.ts` per component, compiled at build | Generated, on by default            | Requires a build plugin, smaller ecosystem                     |

The [Solid i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/solid.md) measures these on a 10 page, 10 locale app. `solid-i18next@17.0.2` weighs about **14.6 kB** after bundling and minification, roughly **4.7x `solid-intlayer`**. Paraglide's advertised tree-shaking did not take effect in that implementation, and it reads the locale from storage on each node rather than from a signal, which adds work on every render.

## Intlayer: content next to the component

Intlayer's design choice is that content lives in a file beside the component, and a build plugin compiles those declarations into per-component dictionaries.

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    total: t({ en: "Total", fr: "Total", es: "Total" }),
    items: plural({
      one: t({ en: "{{count}} item", fr: "{{count}} article" }),
      other: t({ en: "{{count}} items", fr: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export const CartSummary = () => {
  const [count, setCount] = createSignal(3);
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.total}</h2>
      <p>{content.items(count())}</p>
    </section>
  );
};
```

`useIntlayer` returns reactive nodes backed by a signal, so a locale change updates only the DOM nodes that read them, with no component re-run. The same Solid rule still applies: `{content.total}` in JSX is tracked, `const title = content.total.value` in the setup body is a frozen string. Use `.value` for string attributes, and wrap it in a memo if it has to react.

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-solid-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-solid-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Setup is `npx intlayer init`, then the `intlayer()` plugin in `vite.config.ts`. On SolidStart the plugin also registers a Nitro handler that reads the locale from the URL prefix, then the cookie, then `Accept-Language`, and redirects accordingly.

**What it costs you.** A build step is mandatory: no plugin, no dictionaries. The ecosystem is much smaller than i18next's, and smaller than most alternatives listed above, so expect fewer Stack Overflow answers. There is one SolidStart-specific trap: every file under `src/routes` with a default export becomes a route, so page-level `.content.ts` files must live outside that directory. Component content can stay co-located.

If you are on `solid-i18next` today, the [`@intlayer/i18next` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18next.md) aliases i18next imports at the bundler level so existing calls keep working while Intlayer serves the content, and the [migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md) covers moving off it afterwards.

## Common mistakes

- **Storing a translation in a `const` at setup.** The one bug this whole post is about. If it is not called inside JSX, an effect or a memo, it will never update.
- **Passing `t` to a helper that calls it once.** A formatting utility that takes the string instead of the accessor freezes it just as effectively.
- **Detecting the locale on the client in SolidStart.** The server already rendered. Read it from the URL so both sides agree.
- **Omitting `matchFilters` on `[[locale]]`.** `/unknown` renders your home page with a garbage locale instead of returning 404, and search engines index the duplicate.
- **Switching locale with a `<button>`.** Crawlers do not click. Render the switcher as real anchors pointing at each localized URL.
- **Assuming a per-component model is free.** You gain scoping and generated types, you lose the ability to hand a translator one JSON file without tooling.

## Going further

- [Solid i18n benchmark: bundle size, leakage and locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/solid.md)
- [Set up i18n in a SolidStart app, step by step](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_solid_start.md)
- [Set up i18n in a Vite + Solid app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+solid.md)
- [Drop-in i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18next.md) and the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
- [The same problem in Svelte, where runes change the rules](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/svelte.md)
- [TanStack Start i18n: locale routing, SSR and the type tax](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/tanstack-start.md)
- [How bundle optimization works at build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md)
