---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n: glob imports, chunks and build-time messages"
description: What is actually Vite-specific about i18n. Lazy catalogs with import.meta.glob, why per-route locale splitting rarely works, HMR gaps, and compile-time plugins.
keywords:
  - vite i18n
  - import.meta.glob
  - vite code splitting
  - lazy load translations
  - vite plugin i18n
  - rollup chunks
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n: the parts that are about Vite, not your framework

Most "Vite i18n" tutorials are really React or Vue tutorials that happen to use Vite. This one is about the layer underneath: how catalogs get imported, what Rollup does with them, and why the lazy loading you wrote is probably not lazy.

## Table of Contents

<TOC/>

## Static import is the default, and it is eager

The simplest setup imports every catalog at the top of a module.

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

That is three catalogs in the entry chunk, on every page, for every user. It is fine for two locales and a hundred strings. At ten locales it is the single biggest avoidable cost in the bundle.

## `import.meta.glob` and the flag everyone gets wrong

Vite's glob import is the usual fix.

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

Lazy is the default: each entry is a function returning a dynamic import, and Rollup emits one chunk per file. Adding `{ eager: true }` inlines all of them into the importing module, which is exactly what you were trying to avoid.

```ts
// Every locale, in the entry chunk. Almost never what you want.
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

The trap is that both versions work in dev, because Vite serves modules unbundled. The difference only shows up in `dist`. Check with `npx vite build && npx vite preview`, then look at what the entry chunk actually contains.

## Per-route splitting rarely splits

This is the part that surprises people. You split catalogs by page:

```
locales/en/home.json
locales/en/checkout.json
```

Then two routes both import `checkout.json`, and Rollup hoists it into a shared chunk that loads on both. Rollup's chunking is driven by the module graph, not by your folder names: a module reachable from more than one entry becomes common. Adding a third route that imports it changes nothing, and adding a fourth might split it differently.

So per-route locale splitting only holds if the import graph really is disjoint. If it matters, verify it rather than assume it:

```bash
npx vite build && npx vite-bundle-visualizer
```

If you need to force the boundary, `build.rollupOptions.output.manualChunks` is the escape hatch, at the cost of maintaining it by hand.

## Catalogs do not hot-reload

Edit a component, Vite swaps it in. Edit `locales/fr.json`, and depending on how it was imported, nothing happens. JSON imported dynamically has no HMR boundary, so the module graph does not know to invalidate the consumers.

People work around this by restarting the dev server every time they touch a string, usually without realising it is avoidable. The fix belongs to the i18n plugin: it has to accept the HMR update and push new messages into the running app. When you evaluate a library, check whether its Vite plugin does this, because it is a daily-friction thing rather than a production thing.

## `define` bakes the locale in

It is tempting to resolve the default locale at build time:

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define` is a textual replacement performed at build time. Whatever value is present when you build is the value that ships, so this forces one build per locale. That is a legitimate strategy, and it is exactly what Angular's official i18n does. It is not what you want if a single deployment has to serve every language.

For values that must vary per request, keep them out of `define` and resolve them at runtime.

## Moving message parsing to build time

Every mature option in this ecosystem eventually does the same thing: stop parsing messages in the browser.

| Plugin                       | What it moves to build time                                                          |
| :--------------------------- | :----------------------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | Compiles vue-i18n messages to render functions, lets you ship the runtime-only build |
| Lingui (macro plus plugin)   | Extracts and compiles catalogs, replaces macros with message IDs                     |
| Paraglide (inlang)           | Compiles each message into its own tree-shakable function                            |
| `vite-intlayer`              | Builds per-component dictionaries, then purges and minifies unused fields            |

The shared payoff is twofold: the runtime message compiler stops shipping, and unused entries become statically removable. The shared cost is that your dev server and your CI both need the plugin, and a bare `tsc` or a non-Vite test runner will not see the generated output without extra configuration.

vue-i18n is the clearest example of the first payoff. Without `@intlify/unplugin-vue-i18n` you ship a compiler that calls `new Function`, which is both bytes you did not need and a Content Security Policy problem.

## SSR: never hold the locale in a module

If you add SSR, whether through a framework or `vite-plugin-ssr`, the rule that matters is this: a module-level variable holding the current locale is shared across every concurrent request on that server process.

```ts
// Fine in a browser. A cross-request data leak on a server.
export let currentLocale = "en";
```

Two users hitting the server at the same time will race, and one of them gets the other's language. It does not reproduce in development because you are the only request. Resolve the locale per request and pass it down explicitly, through context or through your framework's request-local storage.

## Intlayer's Vite plugin

Intlayer registers a single plugin that handles the dictionary build, dev-mode watching and the optimization pipeline.

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

Import rewriting, purge and minify are on by default. The two flags worth knowing live in `intlayer.config.ts`:

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // drop content fields no component reads
    minify: true, // rename content keys to short aliases
  },
};

export default config;
```

Because content is declared per component rather than per locale file, the purge pass has a module graph to work against, which is what makes the removal safe. The trade is the one named above: the plugin is mandatory everywhere the code is compiled, including CI and test runners. Details in [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md).

## Common mistakes

- **`{ eager: true }` on a glob you meant to lazy-load.** Works in dev, ships everything in prod.
- **Trusting folder structure to produce chunks.** Rollup follows imports, not directories. Measure the build.
- **Restarting the dev server to see a translation change.** That is a missing HMR handler, not normal.
- **Putting the locale in `define`.** You have just committed to one build per language.
- **Module-level locale state with SSR.** Cross-request leak that never appears locally.
- **Benchmarking the dev server.** Unbundled modules tell you nothing about the bundle.

## Going further

- [Bundle optimization: purge, minify and what reaches the browser](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md)
- [Benchmark reports across frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md)
- [Configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [Set up Intlayer with Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)
- [Drop-in i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18next.md)
- [React i18n: how the provider model works](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/react.md)
- [Vue i18n: how it works and where it hurts](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/vue.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
