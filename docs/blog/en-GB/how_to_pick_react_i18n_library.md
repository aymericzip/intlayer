---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "How to pick the right React i18n library in 2026"
description: A decision guide for React internationalisation. Which questions to answer before comparing react-i18next, react-intl, Lingui, use-intl, Paraglide and Intlayer, and what each choice costs in bundle size, typing and maintenance.
keywords:
  - react i18n
  - react internationalisation
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# How to pick the right React i18n library

React ships no i18n primitive. The library you pick on day one decides how translations are stored, how they reach the bundle, and how much of the work stays yours for the next few years. Most teams pick by popularity, then discover the trade-offs at 2,000 keys.

This guide goes the other way: answer a few questions about your project first, then map the answers to the libraries that fit. It focuses on plain React (Vite, React Router, TanStack Start). Next.js has its own constraints, covered in the [Next.js comparison](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/next-i18next_vs_next-intl_vs_intlayer.md).

![React i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Table of Contents

<TOC/>

## Six questions to answer before comparing libraries

A feature table is useless without knowing which rows matter to you. Go through these first.

1. **How is the app rendered?** SPA only, SSR with hydration, or React Server Components. Context-based hooks work everywhere in an SPA. With RSC, a hook forces `"use client"` on every component that renders text, so you will need a server-side API too.
2. **Who writes the translations?** Developers, an in-house team using a TMS, an agency delivering ICU files, or an AI pipeline. This dictates the catalogue format more than any API detail.
3. **How many locales and pages?** Two locales and five pages can afford to ship everything. Ten locales and fifty routes cannot, and the loading strategy becomes the main cost.
4. **Do you need types on keys?** A typo in `t("checkout.totl")` compiles in every key-based library unless you wire the types yourself. Decide whether that is acceptable.
5. **What does the string contain?** Plain text, plurals, or sentences with a `<Link>` in the middle. Rich content is where most APIs get awkward.
6. **How long will the project live?** A three-month prototype and a five-year product do not need the same amount of build tooling.

Write the answers down. Everything below refers back to them.

## The landscape in one picture

Fifteen years of JavaScript i18n fit in four architectural waves, and the React libraries you will compare come from different ones.

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime dictionaries (2011 to 2017): i18next, react-intl">

JSON catalogues loaded in memory, `t("a.b")` looked up at runtime, ICU or a custom syntax parsed in the browser. Largest ecosystems, heaviest runtimes, types are opt-in.

</Accordion>
<Accordion header="Compile-time macros (2018 to 2021): Lingui, typesafe-i18n">

Messages extracted at build, compiled to compact catalogues, typed arguments. An extra build step (`extract`, `compile`) in exchange for smaller bundles.

</Accordion>
<Accordion header="Server-first (2022 to 2024): use-intl / next-intl">

Designed around SSR and Server Components. Render on the server, hydrate only what the client needs. Still key-based and centralised.

</Accordion>
<Accordion header="Compiler and colocated content (2024 to 2026): Paraglide, Intlayer, wuchale">

Content is compiled into tree-shakable functions or per-component dictionaries. Types are generated, missing translations fail the build, and AI translation runs from the CLI.

</Accordion>
</AccordionGroup>

The [history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md) details how each wave answered the previous one's problems.

## The decision that matters most: where content lives and when it loads

Every React i18n library has the same shape: a store, a provider, a hook. Whatever the provider receives ends up in the client bundle or in the hydration payload. So the two structural choices are:

- **Centralised or scoped content.** One `en.json` for the app, or one declaration per component (or per namespace).
- **Static or dynamic import.** Everything bundled at startup, or the active locale and route fetched on demand.

The graph below estimates the payload for a theoretical app of 1 to 10 pages, translated into 1 to 10 locales, with about 30 KB of text per page.

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Centralised content with static imports grows with both axes: 10 pages times 10 locales is 300 KB of text on every page. Dynamic imports remove the locale axis. Scoping removes the page axis. Only the combination stays flat.

This is not a library property, it is a discipline property. `react-i18next` can be scoped with namespaces and lazy backends. `use-intl` can be split per route. But nothing enforces it, and a shared `<Button>` reaching for `t("common:cta")` quietly makes `common` a dependency of every route. The [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/index.md) measures this as "leakage from other routes" and "leakage from other locales", and it is where most of the gap between libraries comes from.

If your answer to question 3 was "many locales, many pages", weigh this section more than any API preference. The [per-component vs centralised i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/per-component_vs_centralized_i18n.md) post goes deeper on the maintenance side of the same choice.

## The candidates

Library sizes come from the [TanStack Start benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md): provider plus hook in an empty component, after bundling, tree-shaking and minification, 10 pages and 10 locales. Content is measured separately.

| Library                 | Wave         | Content model                            | Type safety                        | Message format                | Library size                                      |
| :---------------------- | :----------- | :--------------------------------------- | :--------------------------------- | :---------------------------- | :------------------------------------------------ |
| `react-i18next`         | Runtime      | Central JSON, namespaces                 | 2/5 — Opt-in (`CustomTypeOptions`) | i18next (suffix plurals)      | ~18.4 kB                                          |
| `react-intl` (FormatJS) | Runtime      | Central JSON, ICU                        | 2/5 — Opt-in (extraction + union)  | ICU                           | ~15.3 kB                                          |
| `use-intl`              | Server-first | Central JSON, ICU                        | 2/5 — Opt-in (declaration merging) | ICU                           | ~14.1 kB                                          |
| `@tolgee/react`         | Runtime      | Central, in-context editing              | 1/5 — No                           | ICU                           | ~11.1 kB                                          |
| Lingui                  | Macro        | Source text in code, compiled catalogues | 2/5 — Good, from the compiler      | ICU via macros                | ~11.8 kB                                          |
| Paraglide               | Compiler     | inlang project, generated functions      | 3.5/5 — Generated                  | Own                           | Near zero (due to generated code in the codebase) |
| Intlayer                | Compiler     | `.content.ts` per component              | 5/5 — Generated, on by default     | Intlayer (+ ICU, i18next, PO) | ~5.0 kB                                           |

> Numbers are a snapshot at the benchmark's versions and change with releases. Run the benchmark on your own app before deciding on size alone.
> Type safety: 5/5 means keys, parameters and every locale are checked without manual setup, including url formater and helpers.

Two things the table does not show. `Paraglide` ships almost no library because it generates code into your repo, which means a regeneration step before every commit and merge conflicts on generated files. And `Intlayer` requires a bundler plugin (`vite-intlayer` or equivalent), so it cannot run in a no-build setup.

## Match your answers to a library

<AccordionGroup>
<Accordion header="Prototype, small team, few locales">

Pick the simplest thing that works and do not over-invest. `react-i18next` with a single JSON per locale is fine, and the decade of Stack Overflow answers will save you time. Skip namespaces until you need them. If the prototype becomes a product, budget a migration to scoped content; the [react-i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/react-i18next.md) makes that incremental.

</Accordion>
<Accordion header="Translations come from an agency or a TMS that speaks ICU">

Your catalogue format is decided for you. `react-intl` is ICU-native and the FormatJS extraction tooling is built for that pipeline. `use-intl` also reads ICU. `react-i18next` needs the ICU plugin and its own plural keys otherwise. Intlayer's ICU support is still partial, so if you receive ICU strings today, treat that as a blocker until it lands.

</Accordion>
<Accordion header="Large app, many routes, bundle budget matters">

Prefer scoped content and dynamic loading by default, not by convention. `Lingui` and `Paraglide` get there through compilation. Intlayer gets there through per-component declarations, and the compiler ships only what a route renders. With `react-i18next` or `use-intl`, plan the namespace and lazy-loading strategy on day one and enforce it in review, because the tooling will not.

</Accordion>
<Accordion header="Type safety is non-negotiable">

Every key-based library can be typed, and almost none is by default. If you do not want to maintain declaration merging that has to survive lazily loaded namespaces, pick a library where types are generated from the content: `Lingui`, `Paraglide`, or Intlayer. The [detecting missing translations](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/detecting_missing_translations.md) post compares what each catches at build time.

</Accordion>
<Accordion header="Lots of rich content: markdown, links inside sentences, per-locale components">

Rich nodes are where `t()` returning a string breaks down. `react-i18next` and `Lingui` have `<Trans>`, `react-intl` has rich text tags, all of them more awkward than the plain string case. Intlayer's content nodes accept JSX, markdown and nested objects directly, which is the better fit if content is more than UI labels.

</Accordion>
<Accordion header="Translations will be produced by AI, reviewed by developers">

Then a centralised JSON is no longer a requirement, since there is no TMS to import into. Colocated content plus a CLI that fills missing locales is the shorter path. Intlayer's `fill` command runs against your own API key (OpenAI, Anthropic, Mistral, Gemini) and only translates what changed. Paraglide and Tolgee offer hosted equivalents with their own plans.

</Accordion>
<Accordion header="You may move to Next.js App Router later">

React context does not cross the server/client boundary. Libraries built on a client hook alone (`react-i18next`, `react-intl`) will need a parallel server API the day you adopt RSC. `use-intl` (as `next-intl`) and Intlayer (as `next-intlayer`) already have that split. Read the [Next.js i18n post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/list_i18n_technologies/frameworks/nextjs.md) before standardising a pattern.

</Accordion>
</AccordionGroup>

## Where each library falls short

Honest limits, since every option has them.

- **`react-i18next`**: heaviest of the set, its own plural format, types are your wiring to maintain, dead keys accumulate silently.
- **`react-intl`**: verbose DX (`useIntl()` then `formatMessage({ id })`), global instance tied to many nodes.
- **`use-intl`**: simple to start, painful to optimise. Namespaces, dynamic loading and types together slow development a lot.
- **`Lingui`**: extra `extract` / `compile` build step, several overlapping syntaxes (`t()`, tagged template, `i18n.t()`, `<Trans>`) that confuse both humans and AI assistants.
- **`Paraglide`**: generated files in the repo, tree-shaking did not take effect in the React benchmark, and the locale is read from storage on every node rather than from a store.
- **`Tolgee`**: no key types, harder onboarding, in-context editing is the selling point.
- **`Intlayer`**: mandatory build plugin, smaller ecosystem, partial ICU support, content spread across the codebase by design so exporting one JSON for a translator needs tooling.
- **`gt-react`, `lingo.dev`**: not recommended in the benchmark: quota errors at build, vendor lock-in, and reactivity issues that required forcing provider re-renders.

## What each option looks like in code

The same component, a cart summary with a title and a plural, written with each candidate. The interesting part is not the component, it is where the content lives and what the type checker knows about it.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="Spanish">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Plurals are suffix keys resolved through `Intl.PluralRules`. `t` is `(key: string) => string` unless you declare `CustomTypeOptions`, so `t("titel")` compiles.

  </Tab>
  <Tab label="react-intl" value="react-intl">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="src/locales/fr.json"
{
  "cart.title": "Votre panier",
  "cart.items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  <Tab value="es" label="Spanish">

```json fileName="src/locales/es.json"
{
  "cart.title": "Tu carrito",
  "cart.items": "{count, plural, one {# artículo} other {# artículos}}"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

ICU end to end, which is what most TMS platforms export. Types on `id` come from the `formatjs` extraction step plus a generated union, not out of the box.

  </Tab>
  <Tab label="use-intl" value="use-intl">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="messages/fr.json"
{
  "Cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="Spanish">

```json fileName="messages/es.json"
{
  "Cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Same shape as `next-intl` without the Next.js bindings. Keys are typed once you augment `AppConfig` with the messages type; namespaces are yours to split.

  </Tab>
  <Tab label="Lingui" value="lingui">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

The source language lives in the component; other locales live in `.po` files under hashed ids after `lingui extract`. Forgetting `extract` or `compile` silently falls back to English.

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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
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

All locales in one file beside the component. Types are generated at build, so `title` autocompletes and a typo fails `tsc` with no declaration merging. Deleting the folder deletes the strings.

  </Tab>
</Tabs>

Already on `react-i18next`, `react-intl` or `Lingui`? The compat adapters ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/lingui.md)) alias the imports at the bundler level so the existing API keeps working while you move component by component. The [migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_react-i18next_to_intlayer.md) covers the rest.

## Before you commit

A feature table tells you what a library does today. These points tell you what living with it will be like.

**Check repository activity.**

Commits, issue response time, and whether the last minor release was this year. A sound design with no maintainer is a migration in waiting.

**Do not pick by npm downloads.**

The most installed library is the one that shipped first, not the one that fits a 2026 React codebase. Downloads measure history, not fit.

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Ask who pays the maintainer, and what they sell.**

`i18next` is backed by Locize. `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n` and Lingui are backed by Crowdin. Tolgee, Paraglide (inlang) and Intlayer each run their own platform. A vendor whose revenue is hosted translation has little reason to make translation free inside your toolchain. Intlayer is the only one of the set that ships AI translation through the CLI with your own API key, and a CMS you can self-host.

**Is it AI-agent ready?**

Agents still struggle with i18n: they forget locales, invent keys, and mix message syntaxes. Does the library ship [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md) or an [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md) so the agent can list, fill and test content? And is content loading optimised by default, or does someone have to review namespaces and lazy imports every quarter?

**Type safety out of the box.**

Not "can be typed with extra wiring" but "a wrong key fails `tsc` on a fresh install". Check what happens with a key that does not exist, and with a locale that is missing one translation.

**Detection of unused content.**

Catalogues only grow. Intlayer's build purges unused fields and logs them (`build.purge`). Paraglide gets there by architecture, since an uncalled message function is tree-shaken. Everything else leaves the sweep to you.

**Developer experience.**

Setup time to first translated string, an [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md) or [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md) that shows the translation on hover and jumps to the declaration, a [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md) for fill, test and push, a [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) or extractor that pulls hard-coded strings out of your components so you do not manage every string key by key, and a way for non-developers to edit content ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) or [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)) without a pull request.

## Frequently Asked Questions

<FAQ>

<Question title="Is react-i18next still a good default in 2026?">

Yes for most teams. It has the largest ecosystem and the most answers online. Its costs are real but predictable: the heaviest runtime, a custom plural format, and type safety plus scoping that you have to set up and defend yourself.

</Question>

<Question title="Do I need a compiler-based library?">

Only if bundle size, generated types or build-time missing-key checks are among your requirements. For a small app with two locales, a runtime library is simpler. The [compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/compiler_vs_declarative_i18n.md) post explains what compilers give you and what they can get wrong.

</Question>

<Question title="Can I switch library later without rewriting every component?">

Partially. Key-based libraries share enough shape that a compat adapter can alias one API to another, which is how the Intlayer adapters work. Message formats (ICU vs i18next vs helpers) do not convert automatically, so plurals and interpolation are the part you will touch.

</Question>

<Question title="Does the library choice affect SEO?">

Indirectly. What crawlers see is decided by routing, `hreflang`, `<html lang>` and whether text is in the server-rendered HTML. Some libraries ship helpers for that, most leave it to you. See the [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Going further

- [i18n library benchmark: bundle size, leakage and locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/index.md) and the [TanStack Start report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md)
- [React i18n: how the provider model works and what it costs](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/list_i18n_technologies/frameworks/react.md)
- [react-i18next vs react-intl vs Intlayer, feature by feature](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/next-i18next_vs_next-intl_vs_intlayer.md)
- [The history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md)
- [Compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/compiler_vs_declarative_i18n.md)
- [Per-component vs centralised i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/per-component_vs_centralized_i18n.md)
- [How bundle optimisation works at build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md)
- [Set up i18n in a Vite + React app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+react.md)
- Same guide for [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_svelte_i18n_library.md) and [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_solid_i18n_library.md)
