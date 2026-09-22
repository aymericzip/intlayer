---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs @intlayer/next-intl: Same API, Different Bundle"
description: What changes when the next-intl imports of a Next.js app are served by the @intlayer/next-intl compat adapter. Bundle size, leakage, component size and hydration measured on the same code, plus what the adapter keeps, ignores and cannot replace.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | Same API, Different Bundle

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` is a compat adapter: it exposes the `next-intl` API (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, ICU plurals, `NextIntlClientProvider`...) and serves it from dictionaries compiled by Intlayer. The application code does not change. The bundle does.

This article compares the two on the same Next.js application, built once with `next-intl` and once with the adapter. The numbers come from [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), an open-source suite that records what the browser actually downloads. If you want the `next-intl` vs Intlayer comparison as libraries, read [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer). This one is about what the adapter changes when you keep your components as they are.

<TOC/>

> **tl;dr**: On the same Next.js app, swapping `next-intl` for `@intlayer/next-intl` took the per-page JavaScript from **153.6 KB to 147.5 KB** gzip, the average component from **21.8 KB to 8.1 KB**, foreign-page string leakage from **~90% to 0%**, and hydration from **14.7 ms to 12.8 ms**, with no component edited. On TanStack Start, the `use-intl` equivalent (`@intlayer/use-intl`) cut components from **76-87 KB to 9-11 KB** and locale switching from **7-21 ms to 4-9 ms**. The adapter costs **8.0 KB** of runtime versus **14.7 KB** for `next-intl` and **5.5 KB** for native `next-intlayer`. Navigation and middleware are re-implemented on Intlayer's routing config; localised `pathnames` are the one feature not carried over.

## What `@intlayer/next-intl` is

`next-intl` is a runtime: `getRequestConfig` loads a `messages/{locale}.json` per request, `NextIntlClientProvider` ships it to the client, and `useTranslations("about")` reads keys from that object at render time. Every optimisation (namespaces, `pick(messages, [...])` per page, lazy loading) is yours to write.

`@intlayer/next-intl` keeps the first and last part of that chain and replaces the middle. Your components still call `useTranslations("about")`; what they receive comes from an Intlayer dictionary compiled at build time, scoped to that component, in the active locale only.

Three mechanisms make it work:

1. **Import aliasing.** `createNextIntlPlugin()` from `@intlayer/next-intl/plugin` wraps `withIntlayer` and adds Webpack / Turbopack aliases so that `next-intl`, `next-intl/server`, `next-intl/navigation` and `next-intl/middleware` resolve to `@intlayer/next-intl`. No import in your codebase is renamed.
2. **JSON as source of truth.** The `syncJSON` plugin reads your existing `messages/{locale}.json`, splits its top-level keys into one dictionary per namespace, and writes translations back to the same files when the CLI or the CMS updates them. Your translators' workflow is untouched.
3. **Call-site binding.** The Intlayer optimise pass (Babel or SWC) rewrites `useTranslations("about")` into a call that receives the `about` dictionary directly. The component no longer reaches a global message tree; it reaches its own content.

```tsx fileName="app/[locale]/about/page.tsx"
// Your code, unchanged
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="What the compiler emits (simplified)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

That rewrite is why the component-size and page-leakage columns below move: a page only pulls the dictionaries of the components it renders, and only in the locale being served.

## What the adapter keeps, ignores, and does not replace

| `next-intl` API                                                      | With `@intlayer/next-intl`                                                                                                   |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Kept. Bound to the `ns` dictionary at build time. Keys are typed against your content.                                    |
| `getTranslations({ locale, namespace })`                             | ✅ Kept                                                                                                                      |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Kept. ICU plurals, `select`, `selectordinal`, `#`, `{ts, date, long}` run through Intlayer's ICU resolver                 |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Kept                                                                                                                      |
| `useFormatter()`                                                     | ✅ Kept. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` bridge to native `Intl`                               |
| `NextIntlClientProvider`                                             | ✅ Kept. The `messages`, `timeZone` and `now` props are **accepted but ignored** (a dev warning tells you so)                |
| `getMessages()`                                                      | ✅ Kept for compatibility; no longer needed                                                                                  |
| `getRequestConfig()` in `src/i18n.ts`                                | ⚠️ Not needed. Dictionaries are compiled at build time; there is no per-request message loading                              |
| `defineRouting()`                                                    | ✅ Kept. Omitted fields (`locales`, `defaultLocale`, `localePrefix`) are read from `intlayer.config.ts`                      |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Kept. Re-implemented on Intlayer's routing config; the `routing` argument is accepted but ignored                         |
| `pathnames` (localised route names)                                  | ❌ Accepted for typing, **not interpolated**. Keep plain pathnames or move that mapping to Intlayer's `rewrite`              |
| `createMiddleware()`                                                 | ✅ Kept. Returns Intlayer's proxy; sets the `NEXT_LOCALE` cookie so `useLocale()` and your switcher keep working             |
| `NEXT_LOCALE` cookie                                                 | ✅ Read by default (unless you configure `routing.storage` yourself)                                                         |
| Bare `useTranslations()` with no namespace                           | ⚠️ Works, but the call site is not bound: it resolves through the runtime registry. Pass a namespace to get the bundle gains |

## The benchmark

### What was measured

The [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite builds **the same application** with each setup: **10 pages** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identical components and identical content. Pages are measured in `en` and `fr`.

`next-intl` was built in four loading strategies, from the naïve setup (`messages/{locale}.json` loaded whole) to the optimal one (one namespace per route + per-page `pick()`). The adapter was built on the **same components as the naïve setup**, with only `next.config.ts` and `intlayer.config.ts` changed. It has no "scoped" variant: the compiler scopes content per component, so its `static` and `dynamic` rows are already scoped.

For each build, the suite records:

- **Lib size**: gzip size of an empty component that only imports the i18n library. The fixed cost of the runtime.
- **Page JS**: gzip JavaScript downloaded per page, averaged over all pages and locales.
- **Locale leak %**: share of translated strings found in the downloaded JS that belong to a locale the user is **not** viewing.
- **Page leak %**: share of translated strings found in the downloaded JS that belong to a page the user is **not** on.
- **Component avg**: average gzip size of each component compiled in isolation. Shows how much i18n runtime and catalogue a single component drags in.
- **E2E reactivity**: wall-clock time between selecting a new locale and `html[lang]` updating in the DOM (Playwright, 5 iterations).
- **Hydration**: React hydration phase duration.

> Numbers below come from the run dated **2026-09-12** with `next-intl` / `use-intl` 4.14.2 and `@intlayer/*` 9.5.1. The test application is deliberately small (a few dozen strings per locale), so leakage percentages describe a **pattern**: they grow with your content whilst the runtime cost stays fixed.

### Results on Next.js

Pick the metrics and the libraries you care about:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**How to read it**

- **Same components, 6 KB less per page.** The adapter build of the naive app lands at **147.5 KB**, under every `next-intl` configuration including the fully optimised one (153.6 KB). The runtime itself is the difference: 8.0 KB versus 14.7 KB, paid on every page.
- **Leakage goes to 0% without touching a component.** The naive `next-intl` setup ships ~90% of foreign-page strings on every page. Reaching 0% with `next-intl` means the `scoped-*` setups: one namespace per route, and `pick(messages, [...])` in each page. The adapter reaches 0% from the naive code because the optimise pass binds each `useTranslations("ns")` to its own dictionary.
- **Components shrink 2.7x.** A component compiled in isolation averages **21.8 KB** with `next-intl` (it reaches the provider and the message tree) and **8.1 KB** with the adapter. In `next-intl`'s `scoped-static` setup that number goes _up_ to 80 KB, because every route's namespace file becomes reachable from the page that picks it.
- **Hydration is 2 ms faster** (12.8 vs 14.7 ms): there is no message object to deserialise from the RSC payload before React can hydrate.
- **The adapter is not the native runtime.** `next-intlayer` sits at **141.3 KB**, +0.3 KB over the base app, with a 5.5 KB runtime. The adapter carries the `next-intl` API surface (`useFormatter`, `t.rich`, the ICU resolver) on top of Intlayer's core, hence 8.0 KB and +6 KB per page. It is the bridge, not the destination.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Full table, every library and every strategy, in the [Next.js benchmark report](https://intlayer.org/en-GB/doc/benchmark/nextjs).

### Results on TanStack Start (`use-intl`)

`use-intl` is the framework-agnostic core of `next-intl`. Its adapter, `@intlayer/use-intl`, follows the same design with a Vite plugin (`@intlayer/use-intl/plugin`).

<I18nBenchmark framework="tanstack" vertical/>

| Setup                    | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)       | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |     21.6 ms |
| `use-intl`               | static         |       14.1 KB |         179.8 KB |       50.0% |     89.8% |            76.0 KB |         6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |       14.1 KB |         119.4 KB |        0.0% |     89.8% |            75.9 KB |         7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |    **7.3 KB** |         135.8 KB |       49.7% |  **0.0%** |        **10.9 KB** |     **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |    **7.3 KB** |     **129.7 KB** |    **0.0%** |  **0.0%** |         **9.3 KB** |     **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |        5.0 KB |         125.8 KB |       50.0% |      0.0% |             8.1 KB |         3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |        5.0 KB |         118.6 KB |        0.0% |      0.0% |             6.3 KB |         3.6 ms |     14.1 ms |

**How to read it**

- **Per-page bytes are a wash against the optimised `use-intl`.** `@intlayer/use-intl` in `dynamic` mode (129.7 KB) is within 1 KB of `use-intl`'s `scoped-dynamic` (128.7 KB), and 10 KB _above_ `use-intl`'s plain `dynamic` (119.4 KB). That plain `dynamic` row still leaks 90% of foreign-page strings; the byte count is low because the test app's content is small. The adapter's 0% is what stays flat as content grows.
- **Components are 7-9x smaller.** `use-intl` components average **76-87 KB** in every strategy, because `useTranslations` is bound to the provider's whole message object. The adapter averages **9-11 KB**.
- **Locale switching is faster.** The optimised `use-intl` setups take **13-21 ms** to update `html[lang]`; the adapter takes **4-9 ms**. Fewer components re-render, and nothing is re-picked from a message tree.
- **`static` keeps every locale.** The adapter's `static` row shows 49.7% locale leakage, the same as native Intlayer in `static` mode: all locales are bundled, only the page's dictionaries are. One line of config (`importMode: 'dynamic'`) removes it.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Full table in the [TanStack Start benchmark report](https://intlayer.org/en-GB/doc/benchmark/tanstack).

## Why the numbers move

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Nothing in the component changed, so the gains come entirely from what `useTranslations` is bound to.

**With `next-intl`**, the binding is the provider. `NextIntlClientProvider` receives the whole `messages` object for the locale; every `useTranslations("about")` reads from it. The bundler sees one component importing one hook that reads one context, and cannot know that only the `about` branch is used. The routes below all share the same message object, so the page-leak column reads ~90% until you split the file yourself, and the waste grows on two axes, pages and locales:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # every namespace, every page
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**With `@intlayer/next-intl`**, the binding is the dictionary. `syncJSON` turns `messages/en.json` into one dictionary per top-level key; the compiler resolves which component calls `useTranslations("about")` and hands it `about` directly, in the active locale, as an import the bundler can trace and split.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # unchanged, still the source of truth
│   └── fr.json
├── .intlayer/                        # generated: one dictionary per namespace, per locale
└── src
    ├── middleware.ts                 # createMiddleware() now returns Intlayer's proxy
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (no messages prop)
        └── about/page.tsx            # useTranslations("about")  ← unchanged
```

`src/i18n.ts` and the `messages` prop go away. Everything else is identical.

## Migration in three steps

<Steps>
<Step number={1} title="Install">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

The command detects `next-intl` and installs `intlayer`, `next-intlayer`, `@intlayer/next-intl` and `@intlayer/sync-json-plugin`. Keep `next-intl` installed: it is a peer dependency of the adapter and provides the types.

</Step>
<Step number={2} title="Point Intlayer at your messages">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" bundles every locale; "dynamic" loads the active one on demand
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // ICU placeholders: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` stays where it is. Each top-level key becomes a dictionary; `useTranslations("about")` maps to the `about` dictionary.

</Step>
<Step number={3} title="Wrap next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` composes `withIntlayer` (content watching, dictionary compilation, the optimise pass) and the `next-intl` → `@intlayer/next-intl` aliases for Webpack and Turbopack. Build, and the numbers in the tables above are yours.

</Step>
</Steps>

### What you can delete afterwards

| File / pattern                               | Why                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `getRequestConfig` in `src/i18n.ts`          | No per-request message loading. Keep the file only if it also exports `createNavigation` helpers |
| `messages={...}` on `NextIntlClientProvider` | The adapter reads compiled output; the prop is ignored and logs a warning in development         |
| `await getMessages()` in layouts             | Same reason                                                                                      |
| Per-page `pick(messages, [...])`             | The compiler does the picking, per component                                                     |

### What you gain beyond bytes

- **Typed keys.** `useTranslations("about")` is typed against the compiled `about` dictionary. `t("does.not.exist")` is a TypeScript error, not a runtime fallback.
- **`npx intlayer test`** fails CI when a locale is missing a key. **`npx intlayer fill`** translates the missing ones with the provider of your choice (OpenAI, Anthropic, Mistral, Gemini...) using your own key, and writes the result back into `messages/{locale}.json`.
- **Visual Editor and CMS** work on the same dictionaries, so non-developers can edit `messages/fr.json` through a UI and the file updates.
- **Incremental move to `.content.ts`.** Any component can switch from `useTranslations("about")` to `useIntlayer("about")` with a co-located content file, one at a time. JSON and `.content.ts` dictionaries coexist and merge.

## Limits to know before you start

<AccordionGroup>
<Accordion header="Routing config moves to intlayer.config.ts">

`createNavigation(routing)` and `createMiddleware(routing)` keep their signature but ignore the argument: locales, default locale and prefix strategy come from Intlayer's `routing` config. If you use `next-intl`'s localised `pathnames` (`/about` to `/a-propos`), the adapter does not interpolate them; Intlayer's `routing.rewrite` covers that case but it is a separate change.

</Accordion>
<Accordion header="Namespace-less useTranslations() is not bound">

The optimise pass needs a static namespace to know which dictionary to import. A bare call still works, through a runtime registry that references every dictionary, which is exactly the leakage you were trying to remove. Pass the namespace.

</Accordion>
<Accordion header="The adapter is not free">

8.0 KB of runtime versus 5.5 KB for `next-intlayer`, and +6-7 KB per page over the native build. It pays for the `next-intl` API surface. If you reach the point where every component has been moved to `useIntlayer`, drop the adapter.

</Accordion>
<Accordion header="messages, timeZone and now on the provider are ignored">

The formatters are backed by native `Intl` and only the locale influences their output. If you rely on a forced time zone or a fixed `now` for hydration-stable dates, handle it at the call site. See [date, time and number formatting](https://intlayer.org/en-GB/blog/date-time-number-formatting-locales).

</Accordion>
</AccordionGroup>

## When to use which?

<AccordionGroup>
<Accordion header="Stay on next-intl">

Your app is small, your bundle is not a concern, and your team is comfortable owning namespaces and `pick()` per page.

</Accordion>
<Accordion header="Use @intlayer/next-intl">

You are on `next-intl` today and want the bundle, leakage and hydration gains, typed keys and the CLI / CMS tooling without a rewrite. This is the recommended entry point for any existing `next-intl` codebase.

</Accordion>
<Accordion header="Go native (next-intlayer)">

For new projects, or once the adapter has done its job. It is the lightest of the three (5.5 KB, +0.3 KB per page) and unlocks synchronous server components, per-component `.content.ts` files and the full feature set. Start with [Intlayer with Next.js](https://intlayer.org/en-GB/doc/environment/nextjs).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Does my application code really stay untouched?">

On Next.js, yes for components: the benchmark build changed `next.config.ts` and `intlayer.config.ts` only. `getRequestConfig` in `src/i18n.ts`, the `messages` prop on the provider and per-page `pick()` calls become dead code you can delete afterwards.

</Question>

<Question title="What happens to ICU messages?">

They keep working. `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` and `{ts, date, long}` are resolved by Intlayer's ICU resolver. See [ICU message format](https://intlayer.org/en-GB/blog/icu-message-format).

</Question>

<Question title="Why is the adapter heavier than native next-intlayer?">

It carries the `next-intl` API surface on top of Intlayer's core: `useFormatter`, `t.rich`, the ICU resolver, the navigation helpers. That is 8.0 KB against 5.5 KB, and +6 KB per page. It is the bridge, not the destination.

</Question>

<Question title="Can I migrate component by component?">

Yes. Any component can switch from `useTranslations("about")` to `useIntlayer("about")` with a co-located `.content.ts`. JSON and `.content.ts` dictionaries coexist and merge, so there is no flag day.

</Question>

<Question title="Do localised pathnames work?">

Not through `next-intl`'s `pathnames`: the adapter accepts it for typing but does not interpolate it. Use Intlayer's `routing.rewrite` instead, which emits the localised literals into the type registry.

</Question>

</FAQ>

## Related comparisons

Same adapter series:

- [i18next vs @intlayer/i18next](https://intlayer.org/en-GB/blog/i18next-vs-intlayer-i18next)
- [Lingui vs @intlayer/lingui](https://intlayer.org/en-GB/blog/lingui-vs-intlayer-lingui)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/en-GB/blog/vue-i18n-vs-intlayer-vue-i18n)

The libraries compared head to head:

- [next-intl vs Intlayer](https://intlayer.org/en-GB/blog/next-intl-vs-intlayer), same benchmark
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/en-GB/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Is next-intl outdated?](https://intlayer.org/en-GB/blog/is-next-intl-outdated)

Reference docs:

- [Compat adapter: next-intl](https://intlayer.org/en-GB/doc/compatibility/next-intl)
- [Migration guide: next-intl to Intlayer](https://intlayer.org/en-GB/doc/migration/next-intl)
- [Next.js benchmark report](https://intlayer.org/en-GB/doc/benchmark/nextjs) and [TanStack Start benchmark report](https://intlayer.org/en-GB/doc/benchmark/tanstack)
- [Bundle optimization](https://intlayer.org/en-GB/doc/concept/bundle-optimization) and [the Intlayer compiler](https://intlayer.org/en-GB/doc/compiler)
- [Visual Editor](https://intlayer.org/en-GB/doc/concept/editor), [CMS](https://intlayer.org/en-GB/doc/concept/cms) and [AI translation](https://intlayer.org/en-GB/doc/concept/auto-fill)

## Conclusion

`@intlayer/next-intl` does one thing: it changes what `useTranslations` is bound to, from a provider holding every message to a dictionary compiled for that component. On the same Next.js app that is worth **6 KB per page**, **2.7x smaller components**, **0% leakage** and **2 ms of hydration**, before anyone opens a component file. Navigation and middleware keep their API on top of Intlayer's routing config, and the native `next-intlayer` runtime remains lighter still.

All the raw data, the test apps and the scripts are in the [Benchmark Bloom repository](https://github.com/intlayer-org/benchmark-bloom). Run it yourself.

Refer to the ['Why Intlayer?' doc](https://intlayer.org/doc/why) for more details.
