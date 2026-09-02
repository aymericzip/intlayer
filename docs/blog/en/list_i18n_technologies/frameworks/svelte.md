---
createdAt: 2025-01-16
updatedAt: 2026-09-02
title: "Svelte i18n: stores, runes, and what Svelte 5 changed"
description: Most Svelte i18n tutorials are written for Svelte 4 stores. How the store model works, what runes change, message compilation costs, and typed keys.
keywords:
  - svelte i18n
  - Svelte internationalization
  - svelte-i18n
  - Svelte 5 runes
  - Paraglide
  - typesafe-i18n
  - Vite
  - Intlayer
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - svelte
author: aymericzip
---

# Svelte i18n: stores, runes, and what actually changed in Svelte 5

Almost every Svelte i18n tutorial you will find was written for Svelte 4, where a writable store was the only way to hold reactive locale state. Svelte 5 runes did not break those libraries, but they did change what idiomatic code looks like, and they made one long-standing pattern visibly wrong. This post covers the store model, what runes change, message compilation and bundle cost, typed keys, and how the current libraries compare.

## Table of Contents

<TOC/>

## What "Svelte i18n" means here

This post is about Svelte the component framework, running on Vite, with no server. If you are on SvelteKit, locale routing and SSR request scoping are a separate set of problems, covered in [SvelteKit i18n: routing, SSR, and shared state](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/sveltekit.md).

Svelte ships nothing for i18n. No `$t`, no locale primitive, no message format. Every option below is a third-party choice, and the choice is mostly about where messages live and when they get compiled. If the vocabulary is new, start with [what internationalization actually covers](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md).

## The store model, and why every tutorial uses it

`svelte-i18n` is the ecosystem default. You register locale loaders, initialise, then read from the `_` store:

```ts fileName="src/i18n.ts"
import { register, init, getLocaleFromNavigator } from "svelte-i18n";

register("en", () => import("./locales/en.json"));
register("fr", () => import("./locales/fr.json"));

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

```svelte fileName="src/lib/CartSummary.svelte"
<script>
  import { _, locale } from "svelte-i18n";
</script>

<h2>{$_("cart.total")}</h2>
<p>{$_("cart.items", { values: { count: 3 } })}</p>
<button on:click={() => locale.set("fr")}>Français</button>
```

Three things are worth understanding rather than copying:

- **`$_` is a derived store, not a function.** The `$` prefix subscribes the component to it. When `locale` changes, every component that reads `$_` re-renders. That is the whole reactivity mechanism, and it works because stores are framework-level, not component-level.
- **Loading is async, rendering is not.** `register` returns a loader; until it resolves, `$_('cart.total')` returns the key. That is the source of the classic flash of raw keys on first paint. `isLoading` and `waitLocale()` exist to gate rendering on it, and most tutorials forget them.
- **The catalog is a plain object.** Nothing splits it per route. Loading `fr` loads every page's French copy.

## What runes actually change

Runes did not deprecate stores. `$state` and `$derived` are for state you own inside a component or a `.svelte.ts` module; stores are still fine for shared, cross-component state, and `$store` auto-subscription still works in Svelte 5. So `svelte-i18n` keeps working, unmodified, in a Svelte 5 app.

What changed is that you now have a second, better option for locale state:

```ts fileName="src/lib/locale.svelte.ts"
// Runes work outside components, but only in a .svelte.ts / .svelte.js file
let current = $state<"en" | "fr">("en");

export const getLocale = () => current;
export const setLocale = (next: "en" | "fr") => {
  current = next;
};
```

Two gotchas people hit here. Runes outside a component only work in a `.svelte.ts` or `.svelte.js` file, so a plain `locale.ts` silently gives you a non-reactive variable. And you cannot export a `$state` binding directly, which is why the module above exports a getter instead of the value.

The honest summary: for a client-only app, the store version and the runes version behave identically. The runes version reads better and types better. Neither is a reason to rewrite a working app.

## The module-level store trap

Both patterns above put locale in a module-level singleton. In a Vite SPA that is correct: one browser tab, one user, one locale. The module is instantiated once per page load and belongs to that visitor.

The moment SSR appears, that singleton is shared across every concurrent request on the server process. Request A sets the locale to `fr`, request B renders while A is still in flight, and B gets French. It is intermittent, it never reproduces locally with one browser tab open, and it looks like a caching bug.

The fix is Svelte context, which is per-render-tree rather than per-module: set the locale with `setContext` at the root and read it with `getContext` in components. This is not a Svelte-only problem, but Svelte's `.svelte.ts` modules make the wrong version unusually easy to write. If you are on a plain Vite setup today and might move to SvelteKit later, using context from the start costs you nothing.

## Message compilation and bundle cost

The second axis is when your messages become code. There are two families:

- **Runtime interpolation.** `svelte-i18n` ships a message parser to the browser and resolves `cart.items` against a catalog object at render time. Flexible, and you pay for the parser plus the whole catalog.
- **Compile-time.** Paraglide (inlang) generates one exported function per message and one file per locale, so `m.cart_total()` is an ordinary import. Your bundler tree-shakes anything you did not call. On Vite plus Svelte this works as advertised, and it is the strongest argument for Paraglide.

The [Svelte i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/svelte.md) runs a 10-page, 10-locale app and measures the library cost separately from the content cost. `svelte-i18n` lands around **15.9 kB** after bundling and minification, roughly **7×** `svelte-intlayer`. Paraglide's library number is close to zero by construction, because the runtime is generated into your source tree rather than imported from a package.

Paraglide's costs are real too. The generated files live in your repository, so you regenerate before pushing and you get merge conflicts on them in parallel pull requests. And it does not keep the current locale in a Svelte store: each message call reads the locale back from cookie or storage, which adds work per node instead of one subscription per component.

## Typed keys

`$_("cart.totl")` is a string typo that fails at runtime, in the locale nobody tests, in production. Three ways out:

| Approach        | How you get types                                                           | Cost                                           |
| :-------------- | :-------------------------------------------------------------------------- | :--------------------------------------------- |
| `svelte-i18n`   | None built in; you hand-write a union of keys                               | Drifts from the JSON immediately               |
| `typesafe-i18n` | Generator watches your files and emits typed accessors (`$LL.cart.total()`) | A watcher process, generated files in the repo |
| Paraglide       | Each message is an exported function, so it is typed by existence           | Same generated-files trade-off                 |
| Intlayer        | Types generated from the content declarations at build time                 | Build plugin required                          |

`typesafe-i18n` deserves a note: mechanically it is sound, and typed accessors plus generated formatters are a good model. The repository has not moved much recently, so check its activity before committing a codebase to it.

## Comparison

| Library         | Messages live in                      | Locale state                      | Per-route splitting   | Types on keys |
| :-------------- | :------------------------------------ | :-------------------------------- | :-------------------- | :------------ |
| `svelte-i18n`   | JSON catalogs per locale              | Svelte store                      | No                    | Manual        |
| Paraglide       | inlang project, compiled to functions | Read per call from cookie/storage | Yes, via tree-shaking | Yes           |
| `typesafe-i18n` | Generated TS modules                  | Store adapter                     | Partial               | Yes           |
| Intlayer        | `.content.ts` next to the component   | Context plus store                | Yes, per component    | Yes           |

## Intlayer: content declared beside the component

Intlayer's one structural difference is that content is not centralized. Each component gets a `.content.ts` file next to it, and a Vite plugin compiles those declarations into per-component dictionaries.

```ts fileName="src/lib/cartSummary.content.ts"
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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("cart-summary");
</script>

<h2>{$content.total}</h2>
<small>{$content.vatNotice}</small>
```

`useIntlayer` returns a readable store derived from the current locale, so `$content` is the same auto-subscription you already know. Locale switching goes through `useLocale()`, which gives you `locale`, `availableLocales` and `setLocale`.

On the runes question, `svelte-intlayer` sits in the middle. `setupIntlayer(locale)` at the root of your app holds the locale in `$state` and publishes it through Svelte context, which is the SSR-safe shape described above; reads still come back as stores so `$content` works everywhere. There is a module-level store underneath as a fallback for apps that never call `setupIntlayer`, which is fine on Vite and is exactly the thing you should not rely on once a server is involved.

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-svelte-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-svelte-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-svelte-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Setup is `npx intlayer init`, then `intlayer()` alongside `svelte()` in `vite.config.ts`.

**What it costs you.** The build plugin is mandatory: no Vite plugin, no dictionaries, so a plain `svelte` REPL-style setup is out. The ecosystem is much smaller than i18next's or `svelte-i18n`'s, which means fewer Stack Overflow answers when something goes sideways. And the project is younger than the alternatives here, so you are betting on it continuing.

If you already run `svelte-i18n`, the [`@intlayer/svelte-i18n` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/svelte-i18n.md) aliases the package at the bundler level, so `$_`, `$date`, `$number` and your existing flat keys keep working while Intlayer serves the content. It is a way to test the change without touching components on day one.

## Common mistakes

- **Rendering before messages resolve.** With any async-loading library, gate the first paint on `isLoading` or `waitLocale()`, or accept a flash of raw keys.
- **Putting runes in a `.ts` file.** `$state` in `locale.ts` compiles to a plain variable and nothing updates. It has to be `locale.svelte.ts`.
- **Assuming a store singleton is safe because it works locally.** One tab never reproduces cross-request leakage. It shows up in production, under concurrency.
- **Switching locale with a button.** Crawlers do not click. If the app has localized URLs, the switcher should be an `<a>` to the localized path.
- **Loading every locale up front.** Ten locales in the initial bundle is nine locales nobody reads. Use dynamic imports per locale at minimum, and per route if the library supports it.

## Going further

- [Svelte i18n benchmark: bundle size, leakage and locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/svelte.md)
- [Set up i18n in a Vite + Svelte app, step by step](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+svelte.md)
- [SvelteKit i18n: routing, SSR, and shared state](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/sveltekit.md)
- [Drop-in `svelte-i18n` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/svelte-i18n.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
- [Compiler-based vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md)
- [How bundle optimization works at build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md)
