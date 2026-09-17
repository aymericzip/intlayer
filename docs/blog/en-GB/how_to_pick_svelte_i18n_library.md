---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "How to pick the right Svelte i18n library in 2026"
description: A decision guide for Svelte and SvelteKit internationalisation. Which questions to answer before comparing svelte-i18n, Paraglide, typesafe-i18n, wuchale and Intlayer, and what each choice costs in bundle size, typing and SSR safety.
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte internationalisation
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# How to pick the right Svelte i18n library

Svelte ships nothing for i18n. No `$t`, no locale primitive, no message format. Every option is a third-party choice, and the Svelte ecosystem is where compile-time i18n has gone furthest, so the candidates differ more from each other than in React or Vue.

This guide lists the questions to answer first, then maps the answers to `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` and Intlayer, for Vite + Svelte and for SvelteKit.

![Svelte i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## Table of Contents

<TOC/>

## Six questions to answer before comparing libraries

1. **Vite SPA or SvelteKit?** In an SPA a module-level store is correct: one tab, one user, one locale. On SvelteKit that same singleton is shared across concurrent requests on the server, and request B renders in request A's language. The library either gives you a per-request shape (context, `locals`) or leaves it to you.
2. **Who writes the translations?** Developers, a TMS, an agency delivering ICU strings, or an AI pipeline. `svelte-i18n` speaks ICU. Paraglide and `typesafe-i18n` use their own syntax. Match the vendor.
3. **How many locales and pages?** Two locales and five pages can ship everything. Ten locales and forty routes cannot, and the difference between runtime catalogues and compiled messages becomes the main cost.
4. **Do you need types on keys?** `$_("cart.totl")` is a runtime failure in `svelte-i18n`. Compile-time libraries make it a type error by construction.
5. **Svelte 4 stores or Svelte 5 runes?** Runes change the syntax of the locale state, not the sharing problem. But `$state` in a `.ts` file compiles to a plain variable, so the library's runtime has to be rune-aware if you are on Svelte 5.
6. **Can you live with generated files in the repo?** Paraglide and `typesafe-i18n` both generate JavaScript or TypeScript into your source tree. Some teams are fine with that, others get merge conflicts on every parallel branch.

Write the answers down. Everything below refers back to them.

## The landscape in one picture

Svelte i18n arrived later than React or Vue, and skipped straight to the compile-time waves.

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="Runtime dictionaries (2019 to 2020): svelte-i18n, sveltekit-i18n">

JSON catalogues, ICU parsed in the browser through `intl-messageformat`, locale in module-level stores (`$locale`, `$_`). Most adopted, well documented, SSR wiring is yours.

</Accordion>
<Accordion header="Generated types (2020 to 2022): typesafe-i18n">

A generator watches your catalogues and emits typed accessors (`$LL.cart.total()`). Sound model, generated files in the repo, and the repository has not moved much recently.

</Accordion>
<Accordion header="Compiler and colocated content (2022 to 2026): Paraglide, wuchale, Intlayer">

Paraglide compiles each message to an exported function so the bundler tree-shakes what a route never calls. `wuchale` extracts strings from markup at build. Intlayer declares content per component and generates types and per-component dictionaries.

</Accordion>
</AccordionGroup>

The [history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md) covers each wave in detail.

## The decision that matters most: where content lives and when it loads

Two structural choices explain most of the bundle difference between setups:

- **Centralised or scoped content.** One `locales/en.json` for the app, or one declaration per component.
- **Static or dynamic import.** Everything at startup, or the active locale (and ideally the active route) fetched on demand.

The graph estimates the payload for a theoretical app of 1 to 10 pages, translated into 1 to 10 locales, with about 30 KB of text per page.

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

`svelte-i18n` sits in the top-left by default: `register("fr", () => import("./fr.json"))` gives you dynamic loading per locale, but a locale catalogue is one object and loading it loads every page's copy. Paraglide is the interesting case: because every message is its own export, tree-shaking gives you the page axis for free, and the [Svelte benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/svelte.md) confirms it works as advertised on Vite + Svelte (it did not in the React and Next.js benchmarks). Intlayer gets to the same corner through per-component declarations.

If your answer to question 3 was "many pages", weigh this section more than any API preference. The [per-component vs centralised i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/per-component_vs_centralized_i18n.md) post covers the maintenance side of the same trade-off.

## The candidates

Library sizes are from the [Svelte benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/svelte.md): store plus accessor in an empty component, after bundling, tree-shaking and minification, on a 10-page, 10-locale app. Content is measured separately.

| Library         | Messages live in                      | Locale state                              | Types on keys      | Message format | Per-route splitting   | Library size |
| :-------------- | :------------------------------------ | :---------------------------------------- | :----------------- | :------------- | :-------------------- | :----------- |
| `svelte-i18n`   | JSON catalogues per locale            | Module-level Svelte store                 | Manual union       | ICU            | No                    | ~16.6 kB     |
| `typesafe-i18n` | Generated TS modules                  | Store adapter                             | Generated          | Own            | Partial               | Small        |
| Paraglide       | inlang project, compiled to functions | Read per call from cookie, URL or storage | Generated          | Own            | Yes, via tree-shaking | Near zero    |
| `wuchale`       | Extracted from markup at build        | Store                                     | N/A (no keys)      | Own            | Yes                   | Small        |
| Intlayer        | `.content.ts` next to the component   | Context plus store, rune-aware            | Generated, default | Helpers        | Yes, per component    | Baseline     |

> Numbers are a snapshot at the benchmark's versions. Run it on your own app before deciding on size alone.

Paraglide's near-zero library size is by construction: the runtime is generated into your repository. Intlayer needs `vite-intlayer`, so it cannot run without a build step.

## Match your answers to a library

<AccordionGroup>
<Accordion header="Vite SPA, small team, few locales">

`svelte-i18n`. It is the most documented option, `$_` reads naturally in markup, and `register` plus `waitLocale()` covers lazy loading per locale. Gate the first paint on `isLoading` or you will flash raw keys. If the app might grow a server later, put the locale in Svelte context from day one instead of relying on the module store; it costs nothing now and saves a production-only bug later.

</Accordion>
<Accordion header="SvelteKit with locale routing and SSR">

The sharing problem decides this one. `svelte-i18n` works on SvelteKit but the per-request wiring (`hooks.server.ts`, `locals`, `load`, then `setContext`) is yours to write and easy to get subtly wrong. Paraglide ships a SvelteKit integration that handles routing and reads the locale per call, which sidesteps the singleton. Intlayer sets the locale from `load` data into context. The [SvelteKit i18n post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/list_i18n_technologies/frameworks/sveltekit.md) explains the `[[lang]]` versus `reroute` choice, which you should make before picking the library.

</Accordion>
<Accordion header="Translations come from a TMS or an agency delivering ICU">

`svelte-i18n` is ICU-native through `intl-messageformat`, so it plugs into most vendors directly. Paraglide and `typesafe-i18n` use their own syntax and need conversion. Intlayer's ICU support is partial, so if you receive ICU strings today, treat that as a blocker.

</Accordion>
<Accordion header="Bundle size is the top constraint">

Compile-time. Paraglide's tree-shaking works on Vite + Svelte and the library cost is near zero. Intlayer's per-component dictionaries give the same result without generated files in the repo. `svelte-i18n` ships the ICU parser plus the whole catalogue and lands around 4.5× `svelte-intlayer` in the benchmark before any content.

</Accordion>
<Accordion header="Type safety is non-negotiable">

Anything but a bare `svelte-i18n` setup, where the only typing is a hand-written union that drifts from the JSON immediately. `typesafe-i18n`, Paraglide and Intlayer all generate types from the content. Check `typesafe-i18n`'s repository activity before committing a codebase to it. The [detecting missing translations](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/detecting_missing_translations.md) post compares what each catches at build time.

</Accordion>
<Accordion header="You do not want generated files in the repo">

That removes Paraglide and `typesafe-i18n`. `svelte-i18n` and Intlayer keep their output in `node_modules` or a build directory; with Intlayer the `.content.ts` files are hand-written source, the compiled dictionaries and types live in `.intlayer/` and are ignored.

</Accordion>
<Accordion header="Translations will be produced by AI">

Then the centralised JSON has no consumer left to justify it. Colocated content plus a CLI that fills the missing locales is the shorter path. Intlayer's `fill` command runs against your own API key (OpenAI, Anthropic, Mistral, Gemini) and only re-translates what changed. Paraglide's inlang ecosystem offers hosted equivalents with their own plans.

</Accordion>
</AccordionGroup>

## Where each library falls short

- **`svelte-i18n`**: heaviest of the set, no key types, no per-route splitting, module-level store that leaks across requests on SvelteKit unless you wire context yourself.
- **`typesafe-i18n`**: a watcher process, generated files in the repo, and a repository that has not moved much recently.
- **Paraglide**: generated files committed to the repo and regenerated before every push, merge conflicts on parallel branches, and the locale is read from cookie or storage on each message call rather than from a store, which costs work on locale change.
- **`wuchale`**: interesting extraction idea, still early. The React benchmark hit reactivity issues that required forcing provider re-renders, and the documentation is thin.
- **Intlayer**: mandatory build plugin, smaller ecosystem, partial ICU support, and content spread across the codebase by design, so exporting one JSON for a translator needs tooling.

## What each option looks like in code

The same component, a cart summary with a title and a plural, written with each candidate. The interesting part is not the markup, it is where the content lives, how the locale is stored, and what the type checker knows.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

ICU through `intl-messageformat`, locale in a module-level store. `$_` accepts any string; the only typing is a union you write by hand.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Every message is a generated, typed function, tree-shaken if never called. The `paraglide/` folder is generated into your repo, and the locale is read per call rather than from a store.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Typed accessors generated by a watcher process. The model is sound; the generated files live in the repo and the project has been quiet recently.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

All locales in one file beside the component. `useIntlayer` returns a readable store, so `$content` is the auto-subscription you already know, and the locale is held in context (SSR-safe) rather than a module singleton.

  </Tab>
</Tabs>

Already on `svelte-i18n`? The [`@intlayer/svelte-i18n` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/svelte-i18n.md) aliases the package at the bundler level so `$_`, `$date`, `$number` and your flat keys keep working while Intlayer serves the content.

## Before you commit

A feature table tells you what a library does today. These points tell you what living with it will be like.

**Check repository activity.**

Commits, issue response time, and whether the last minor release was this year. A sound design with no maintainer is a migration in waiting.

**Do not pick by npm downloads.**

The most installed library is the one that shipped first, not the one that fits a 2026 Svelte codebase. Downloads measure history, not fit.

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**Ask who pays the maintainer, and what they sell.**

`svelte-i18n` is backed by Crowdin, like `next-intl` and `vue-i18n`. `i18next` is backed by Locize. Tolgee, Paraglide (inlang) and Intlayer each run their own platform. A vendor whose revenue is hosted translation has little reason to make translation free inside your toolchain. Intlayer is the only one of the set that ships AI translation through the CLI with your own API key, and a CMS you can self-host.

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

<Question title="Is svelte-i18n still the right default in 2026?">

For a Vite SPA with a small catalogue, yes. It is the most documented option and ICU compatibility matters to many teams. On SvelteKit or past a few dozen pages, its costs (no types, no scoping, shared store) start to add up.

</Question>

<Question title="Is Paraglide's tree-shaking real?">

On Vite + Svelte, yes, the benchmark confirms it. On React with TanStack Start or Next.js it did not take effect in the same benchmark. Verify in your own stack rather than trusting either result.

</Question>

<Question title="Do runes change which library I should pick?">

They change the syntax of your own locale state, not the sharing problem. What matters is whether the library's runtime is rune-aware on Svelte 5 and whether it uses context rather than a module store. Check both.

</Question>

<Question title="Does the library choice affect SEO?">

Indirectly. Crawlers care about routing, `hreflang`, `<html lang>` and whether text is in the server-rendered HTML. See the [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Going further

- [Svelte i18n benchmark: bundle size, leakage and locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/svelte.md)
- [Svelte i18n: stores, runes and the module-level trap](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/list_i18n_technologies/frameworks/svelte.md) and [SvelteKit i18n: routing, SSR and shared state](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/list_i18n_technologies/frameworks/sveltekit.md)
- [Drop-in `svelte-i18n` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/svelte-i18n.md)
- [The history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md)
- [Compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/compiler_vs_declarative_i18n.md)
- [Per-component vs centralised i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/per-component_vs_centralized_i18n.md)
- [How bundle optimisation works at build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md)
- [Set up i18n in a Vite + Svelte app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+svelte.md) and in a [SvelteKit app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_svelte_kit.md)
- Same guide for [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_vue_i18n_library.md) and [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_solid_i18n_library.md)
