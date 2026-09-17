---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "How to pick the right Solid i18n library in 2026"
description: A decision guide for SolidJS and SolidStart internationalisation. Which questions to answer before comparing @solid-primitives/i18n, solid-i18next, Paraglide, Lingui and Intlayer, and what each choice costs in reactivity, bundle size and typing.
keywords:
  - solidjs i18n
  - solid start i18n
  - solid internationalisation
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# How to pick the right Solid i18n library

Solid's reactivity model changes what an i18n library has to do. Components run once, so a translation stored in a `const` at setup is a frozen string, and a library that hands you strings instead of accessors will produce a page that switches language everywhere except in the three components where someone did that. Picking a library for Solid is partly about API, and partly about which one makes that mistake hard to write.

This guide lists the questions to answer first, then maps them to `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` and Intlayer, for Vite + Solid and for SolidStart.

![Solid i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## Table of Contents

<TOC/>

## Six questions to answer before comparing libraries

1. **Vite SPA or SolidStart?** In an SPA the locale can live in a signal and nothing else. On SolidStart the locale has to be resolved on the server from the URL, and anything a crawler must see without JavaScript (`<html lang>`, `hreflang`) belongs in `entry-server.tsx`.
2. **How reactive does locale change need to be?** A full page reload on switch is acceptable for some apps. If not, the library's values must be signals or accessors, and reading them must be tracked, not copied.
3. **Who writes the translations?** Developers, a TMS, an agency delivering ICU strings, or an AI pipeline. `solid-i18next` speaks i18next's format. `@solid-primitives/i18n` is whatever your dictionary object is. Match the vendor.
4. **How many locales and pages?** Two locales and five pages can ship everything. Ten locales and forty routes cannot, and lazy catalogues plus scoping become the main cost.
5. **Do you need types on keys?** `@solid-primitives/i18n` infers them from the source dictionary. `solid-i18next` needs manual declaration. Compile-time libraries generate them.
6. **How much feature surface do you need?** Cookie management, locale-prefixed routing, redirects, formatters. The lightest option has none of it, and that is fine until it is not.

Write the answers down. Everything below refers back to them.

## The landscape in one picture

Solid is the youngest ecosystem here and has the fewest options, spread across three waves.

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="Runtime dictionaries: solid-i18next">

i18next wrapped for Solid. Namespaces, backends, detectors, and a decade of plugins. Heaviest of the set, and the same `t("a.b")` costs as in React.

</Accordion>
<Accordion header="Minimal primitives (2022): @solid-primitives/i18n">

A flat dictionary you own, a `translator()` that returns accessors, types inferred from the source object. Very small, no scoping, no routing, no formatters. The community default.

</Accordion>
<Accordion header="Compiler and colocated content (2024 to 2026): Paraglide, Intlayer, @lingui/solid">

Paraglide generates one function per message. Intlayer declares content per component in `.content.ts` files and returns signal-backed nodes. Lingui's Solid binding arrived in 2026 and brings its macro-based extraction.

</Accordion>
</AccordionGroup>

The [history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md) covers each wave in detail.

## The decision that matters most: where content lives and when it loads

Two structural choices explain most of the bundle difference between setups:

- **Centralised or scoped content.** One dictionary for the app, or one declaration per component.
- **Static or dynamic import.** Everything at startup, or the active locale (and ideally the active route) fetched on demand.

The graph estimates the payload for a theoretical app of 1 to 10 pages, translated into 1 to 10 locales, with about 30 KB of text per page.

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

`@solid-primitives/i18n` does nothing about either axis: you `createResource` a dictionary per locale, which gets you dynamic loading, and the rest is yours. `solid-i18next` has namespaces and lazy backends, but nothing enforces the mapping, so a shared component importing `common` makes it a dependency of every route. Paraglide gets the page axis through tree-shaking, although it did not take effect in the [Solid benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/solid.md) implementation. Intlayer gets it through per-component declarations.

If your answer to question 4 was "many pages", weigh this section more than any API preference. The [per-component vs centralised i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/per-component_vs_centralized_i18n.md) post covers the maintenance side of the same trade-off.

## The candidates

Library sizes are from the [Solid benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/solid.md): provider plus accessor in an empty component, after bundling, tree-shaking and minification, on a 10-page, 10-locale app. Content is measured separately.

| Library                  | Content model                            | Reactivity on locale change              | Types on keys                       | Scoping and lazy loading    | Library size |
| :----------------------- | :--------------------------------------- | :--------------------------------------- | :---------------------------------- | :-------------------------- | :----------- |
| `@solid-primitives/i18n` | Flat dictionary you own                  | Signal, accessors returned by translator | Inferred from the source dictionary | None built in               | Very small   |
| `solid-i18next`          | i18next catalogues and namespaces        | Store, re-render via provider            | Manual declaration                  | Namespaces, lazy backends   | ~14.9 kB     |
| Paraglide                | inlang project, generated functions      | Read per call from cookie or storage     | Generated                           | Tree-shaking (not in bench) | Near zero    |
| `@lingui/solid`          | Source text in code, compiled catalogues | Signal-based                             | From the compiler                   | Per catalogue               | Small        |
| Intlayer                 | One `.content.ts` per component          | Signal-backed nodes, no component re-run | Generated, on by default            | Yes, per component          | Baseline     |

> Numbers are a snapshot at the benchmark's versions. `@lingui/solid` was not in the benchmark. Run it on your own app before deciding on size alone.

Paraglide's near-zero library size is by construction: the runtime is generated into your repository. Intlayer needs `vite-intlayer`, so it cannot run without a build step.

## Match your answers to a library

<AccordionGroup>
<Accordion header="Vite SPA, small catalogue, you want nothing in the way">

`@solid-primitives/i18n`. A flat dictionary, a `translator()` that returns accessors, types inferred with no wiring. It is the right answer for a small app, and reading the source takes ten minutes. What you will write yourself: locale persistence, routing, formatters, and per-route splitting. If those lists grow, that is the signal to move.

</Accordion>
<Accordion header="Coming from React with an i18next codebase">

`solid-i18next` lets you reuse catalogues, namespaces, backends and detectors as they are. It is the heaviest option and carries the same costs as `react-i18next`: manual type declaration, optimisations that are possible but time-consuming, and a `t()` that returns a string, so the frozen-translation bug is easy to write. Wrap reads in JSX or a memo and never store them at setup.

</Accordion>
<Accordion header="SolidStart with locale-prefixed routes and SSR">

The locale has to come from the URL on the server so both sides agree; detecting it on the client is too late. `@solid-primitives/i18n` and `solid-i18next` leave the `[[locale]]` route, `matchFilters`, the redirect and the `entry-server.tsx` tags to you. Paraglide has a Vite plugin that handles routing. Intlayer ships middleware and the route helpers. Whichever you pick, put `<html lang>` and `hreflang` in `entry-server.tsx`; `@solidjs/meta` applies on the client after hydration in SolidStart v2. The [Solid i18n post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/list_i18n_technologies/frameworks/solid.md) walks through that setup.

</Accordion>
<Accordion header="Locale change must be instant and fine-grained">

Pick a library whose values are signals or accessors and whose reads are tracked. `@solid-primitives/i18n` accessors and Intlayer nodes both update only the DOM nodes that read them, with no component re-run. `solid-i18next` re-renders through the provider. Paraglide reads the locale from cookie or storage on each message call rather than from a signal, which works but does more work per node than it should.

</Accordion>
<Accordion header="Large app, many routes, bundle budget">

Scoped content compiled at build time. Intlayer ships only what a route renders. Paraglide should get there via tree-shaking; verify it in your setup, since it did not in the benchmark's. With `solid-i18next`, plan the namespace and lazy-loading strategy on day one and enforce it in review.

</Accordion>
<Accordion header="Type safety is non-negotiable">

`@solid-primitives/i18n` gives you inferred types for free, which is more than most React libraries offer. For generated types that survive lazy loading and per-route splitting, Paraglide, `@lingui/solid` and Intlayer all produce them from the content. The [detecting missing translations](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/detecting_missing_translations.md) post compares what each catches at build time.

</Accordion>
<Accordion header="Translations will be produced by AI">

Then a centralised dictionary has no consumer left to justify it. Colocated content plus a CLI that fills the missing locales is the shorter path. Intlayer's `fill` command runs against your own API key (OpenAI, Anthropic, Mistral, Gemini) and only re-translates what changed.

</Accordion>
</AccordionGroup>

## Where each library falls short

- **`@solid-primitives/i18n`**: no lazy loading or scoping beyond what you build, no routing, no cookie handling, no formatters. Excellent for small apps, quickly lacking for professional ones.
- **`solid-i18next`**: heaviest of the set, manual types, its own plural format, and `t()` returns a string so translations freeze if stored at setup.
- **Paraglide**: generated files committed to the repo and regenerated before every push, tree-shaking did not take effect in the Solid benchmark, and the locale is read from storage per call instead of from a signal.
- **`@lingui/solid`**: new in 2026, so little production feedback yet. Inherits Lingui's `extract` / `compile` build step and its several overlapping syntaxes.
- **Intlayer**: mandatory build plugin, smaller ecosystem, partial ICU support, and content spread across the codebase by design, so exporting one JSON for a translator needs tooling.

## What each option looks like in code

The same component, a cart summary with a title and a plural, written with each candidate. Watch where the translation is read: in JSX it is tracked, in the setup body it is a frozen string.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";

export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export const dictionary = () => i18n.flatten(en);
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Keys are typed from the English object with no codegen. There is no plural rule, no lazy loading and no routing; each is yours to add.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

i18next catalogues, namespaces and plugins as they are. `t` returns a string, so `const title = t("cart:title")` at setup freezes it; keep the call inside JSX.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Every message is a generated, typed function. The locale is read from cookie or storage on each call rather than from a signal, so reactivity on switch is yours to wire.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
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
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

All locales in one file beside the component. `useIntlayer` returns signal-backed nodes, so a locale change updates only the DOM nodes that read them. `{content.title}` in JSX is tracked; `content.title.value` in the setup body is not.

  </Tab>
</Tabs>

On an existing i18next codebase, the [i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/i18next.md) aliases the package at the bundler level so catalogues and `t()` keep working while Intlayer serves the content, and the [migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_i18next_to_intlayer.md) covers the rest.

## Before you commit

A feature table tells you what a library does today. These points tell you what living with it will be like.

**Check repository activity.**

Commits, issue response time, and whether the last minor release was this year. A sound design with no maintainer is a migration in waiting.

**Do not pick by npm downloads.**

The most installed library is the one that shipped first, not the one that fits a 2026 Solid codebase. Downloads measure history, not fit.

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**Ask who pays the maintainer, and what they sell.**

`i18next` (behind `solid-i18next`) is backed by Locize. `next-intl`, `vue-i18n`, `svelte-i18n` and Lingui are backed by Crowdin. Tolgee, Paraglide (inlang) and Intlayer each run their own platform. A vendor whose revenue is hosted translation has little reason to make translation free inside your toolchain. Intlayer is the only one of the set that ships AI translation through the CLI with your own API key, and a CMS you can self-host.

**Is it AI-agent ready?**

Agents still struggle with i18n: they forget locales, invent keys, and mix message syntaxes. Does the library ship [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md) or an [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md) so the agent can list, fill and test content? And is content loading optimised by default, or does someone have to review namespaces and lazy imports every quarter?

**Type safety out of the box.**

Not "can be typed with extra wiring" but "a wrong key fails `tsc` on a fresh install". Check what happens with a key that does not exist, and with a locale that is missing one translation.

**Detection of unused content.**

Catalogues only grow. Intlayer's build purges unused fields and logs them (`build.purge`). Paraglide gets there by architecture, since an uncalled message function is tree-shaken. Everything else leaves the sweep to you.

**Developer experience.**

Setup time to first translated string, an [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md) or [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md) that shows the translation on hover and jumps to the declaration, a [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md) for fill, test and push, and a way for non-developers to edit content ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) or [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)) without a pull request.

## Frequently Asked Questions

<FAQ>

<Question title="Is @solid-primitives/i18n enough for a production app?">

For a small one, yes, and it is the lightest option available. It stops being enough when you need lazy catalogues per route, locale routing on SolidStart, cookie persistence or formatters, because all of that is yours to build.

</Question>

<Question title="Why does my translation not update when the locale changes?">

Because Solid components run once. A translation read into a `const` at setup is a plain string, not a subscription. Read it inside JSX, an effect or a memo, or pick a library whose values are accessors so the wrong version is harder to write.

</Question>

<Question title="Do I need a compiler-based library?">

Only if bundle size, generated types or build-time missing-key checks are actual requirements. The [compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/compiler_vs_declarative_i18n.md) post explains what compilers give you and where they can get it wrong.

</Question>

<Question title="Does the library choice affect SEO?">

Indirectly. Crawlers care about routing, `hreflang`, `<html lang>` and whether text is in the server-rendered HTML, which on SolidStart means `entry-server.tsx`. See the [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Going further

- [Solid i18n benchmark: bundle size, leakage and locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/solid.md)
- [Solid i18n: why translations freeze on locale change](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/list_i18n_technologies/frameworks/solid.md)
- [Drop-in i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/i18next.md) and the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_i18next_to_intlayer.md)
- [The history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md)
- [Compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/compiler_vs_declarative_i18n.md)
- [Per-component vs centralised i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/per-component_vs_centralized_i18n.md)
- [How bundle optimisation works at build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md)
- [Set up i18n in a Vite + Solid app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+solid.md) and in a [SolidStart app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_solid_start.md)
- Same guide for [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_vue_i18n_library.md) and [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_svelte_i18n_library.md)
