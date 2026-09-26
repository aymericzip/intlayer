---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 8
title: Is Intlayer Lighter than Paraglide?
description: Paraglide looks almost free in i18n benchmarks because its code is generated into your repo. Here is where that weight actually goes, why per-node locale reads cost you, and how Intlayer's dynamic loading ships one locale instead of all of them.
keywords:
  - Paraglide
  - Intlayer
  - Internationalisation
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Is Intlayer Lighter than Paraglide?

Yes.

`Paraglide` has a good reputation for being the lightest i18n solution around, and at first sight the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md) agrees: its library size is close to zero. But a library size of zero does not mean zero bytes shipped. It means the bytes live somewhere the metric does not look.

<TOC/>

## Key Takeaways

**The library size is hidden, not gone:**

Paraglide generates its runtime and message functions into your codebase. That code ships to the browser, but it is counted as _your_ code, not as the library's.

**No provider is not a free win:**

Every `m.my_key()` call resolves the locale on its own, reading the cookie or storage for each rendered node, instead of reading it once from a context.

**No dynamic loading:**

Paraglide imports every locale of a message into your client bundle. Intlayer with `importMode: 'dynamic'` or `'fetch'` loads only the locale being rendered.

**Tree shaking is not guaranteed:**

In some of our benchmarks, Paraglide's advertised tree shaking did not take effect. Check your own bundle.

## Where Does Paraglide's Weight Go?

In the benchmark reports, the "library size" metric measures the provider and hooks of each i18n library in an empty component, before any content is added.

| Library (TanStack Start)      | Lib size (gz) | Lib size (min) |
| ----------------------------- | ------------- | -------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB        | 4.5 KB         |
| `react-intlayer@9.5.1`        | 5.0 KB        | 15.2 KB        |

Read in isolation, Paraglide wins. But Paraglide is a compiler: it reads your `messages/*.json` files and writes a `paraglide/` folder into your repository, containing a `runtime.js` (locale detection, cookie and storage strategies, URL localisation) and one JavaScript function per message.

```bash
src/paraglide/
├── runtime.js      # locale detection, strategies, URL helpers
├── server.js
├── messages.js     # re-exports every message
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Because this code sits in your `src/` folder and you import it with a relative path, the bundler attributes it to your application, not to a `node_modules` package. The library size column shows almost nothing, while the same logic still ships in your page bundle.

Generating code is not a bad idea in itself: the generated runtime only includes the logic your configuration needs (prefix strategy, cookie vs. local storage, etc.). Intlayer reaches the same result differently, by injecting environment variables at build time so the bundler drops the branches your configuration does not use. Both approaches end up 3 to 10 times lighter than `i18next` or `next-intl`.

So the fair comparison is not the library size. It is **the JavaScript actually sent per page**.

## Page Weight, Measured

TanStack Start app, 10 pages, measured on the `en` and `fr` routes, gzipped:

| Setup                              | Page JS avg (gz) | Above base  | Locale leak | Other-page leak |
| ---------------------------------- | ---------------- | ----------- | ----------- | --------------- |
| Base (no i18n)                     | 111.0 KB         | -           | 0.0%        | 0.0%            |
| `paraglide` (any strategy)         | 125.1 KB         | +14.1 KB    | 49.7%       | 0.0%            |
| `intlayer` (`importMode: static`)  | 125.8 KB         | +14.8 KB    | 50.0%       | 0.0%            |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**     | **+7.6 KB** | **0.0%**    | **0.0%**        |

Next.js 16 App Router, same app:

| Setup            | Page JS avg (gz) | Above base  |
| ---------------- | ---------------- | ----------- |
| Base (no i18n)   | 141.0 KB         | -           |
| `paraglide-next` | 155.3 KB         | +14.3 KB    |
| `next-intlayer`  | **141.3 KB**     | **+0.3 KB** |

<I18nBenchmark framework="tanstack" vertical/>

> Full data in the [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md) and the [Next.js benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/nextjs.md). Every bundle can be inspected in the [benchmark repository](https://github.com/intlayer-org/benchmark-i18n).

Two things stand out:

- In `static` mode, Intlayer ships practically the same content as Paraglide (125.8 KB vs. 125.1 KB). That is expected: both include every locale of the messages a page uses.
- Paraglide stays at 125.1 KB whatever the strategy, because it has no dynamic mode. Every line in the table above is the static one.

## No Provider: A Good Idea That Isn't

Paraglide has no provider. You import a message and call it:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

No context, no wrapper, no hook. It looks simpler. But the locale still has to come from somewhere. Each generated message function looks roughly like this (simplified):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // resolved on every call

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...one branch per locale
};
```

And `getLocale()` walks the configured strategies (cookie, local storage, URL, base locale) to find the current locale. So every text node you render (`<>{m.my_key()}</>`) runs its own locale resolution, including reading `document.cookie` in the browser. A page with 200 translated strings resolves the locale 200 times per render, and again on every re-render.

A provider-based library reads the locale **once**, stores it in a context (or a signal, or a store), and every node reads a value already in memory. The provider costs a few hundred bytes. Skipping it costs CPU on every render, and it shows in the benchmark: Paraglide's page load and language-switch timings are consistently behind Intlayer's on TanStack Start (22.1 ms vs. 14.6 ms page load, 4.3 ms vs. 3.2 ms E2E reactivity).

## Developer Experience

Paraglide's source of truth is JSON, but you never import the JSON. You import the generated `.js`:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/fr.json"
{
  "hero_title": "Publiez votre app dans toutes les langues"
}
```

```tsx fileName="Hero.tsx"
// Only exists after the compiler has regenerated it from the JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      "en-GB": "Ship your app in every language",
      en: "Ship your app in every language",
      fr: "Publiez votre app dans toutes les langues",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

That loop has a cost:

- Every change to a JSON file requires a regeneration before the import resolves or the types update.
- The generated `paraglide/` folder is either committed, which means merge conflicts on generated files in every PR touching copy, or ignored, which means a generation step before every type check, test and CI job.
- Every string becomes a function call. Constants turn into `m.key()` everywhere, including places where a plain value would do.

## Tree Shaking: Check Your Bundle

Paraglide's main promise is that unused messages are tree-shaken, since each message is its own export. In the Svelte + Vite benchmark, it works as advertised.

In other setups, it did not. In our [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/nextjs.md) run, Paraglide's pages weigh 14 KB more than the base app, where `next-intlayer` adds 0.3 KB. Earlier runs on TanStack Start showed messages from other pages ending up in the route bundle as well.

Tree shaking depends on your bundler (Turbopack, Rolldown, Rollup), on how messages are imported (`import { m }` vs. `import * as m`), and on side-effect analysis. If you pick Paraglide for its size, open your bundle visualiser and check that it holds in your app.

## No Dynamic Loading

This is the structural limit. Paraglide has no way to load one locale at a time: every message function statically imports the implementation of each locale, so every locale ends up in your client bundle.

With 2 locales, that is half your translation payload wasted, which matches the ~50% locale leak measured above. With 10 locales, 90% of it. With 30 locales, 97%.

Moving to dynamic loading would not fix it either: with one function per message, loading each one lazily would mean thousands of requests.

Intlayer lets you choose, globally or per dictionary:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalisation: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | What ships to the client                                | vs. Paraglide                      |
| ------------ | ------------------------------------------------------- | ---------------------------------- |
| `static`     | All locales of the dictionaries the page uses           | Theoretically the same content     |
| `dynamic`    | Only the current locale, lazy-loaded per dictionary     | **N times smaller** with N locales |
| `fetch`      | Only the current locale, fetched from the Live Sync API | **N times smaller** with N locales |

With the [build transformation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md) and `importMode: 'static'`, Intlayer loads, in theory, the exact same content as Paraglide. With `'dynamic'` or `'fetch'`, it loads only what the current locale needs: for an app in N locales, the translation payload is N times smaller than Paraglide's.

## Where Paraglide Still Fits

<AccordionGroup>
<Accordion header="Svelte + Vite with few locales">

If your stack is Svelte with Vite and you support two or three languages, tree shaking works as advertised and the locale overhead stays small.

</Accordion>
<Accordion header="Existing inlang workflow">

If your team already uses the inlang ecosystem (Fink, Sherlock, message format plugins), Paraglide integrates with it natively.

</Accordion>
</AccordionGroup>

## Try It on Your App

Check your live application's payload and locale leakage with the free [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

To set up Intlayer:

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

## Further Reading

- [TanStack Start i18n Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/tanstack.md)
- [Next.js i18n Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/nextjs.md)
- [Bundle Optimisation and `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md)
- [How to Pick a React i18n Library](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_react_i18n_library.md)
- [The Case for Compiler-Driven Internationalisation](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/compiler_vs_declarative_i18n.md)
