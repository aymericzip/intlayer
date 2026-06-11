---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: i18n Bundle Size & Performance Optimisation
description: Reduce your application bundle size by optimising internationalisation (i18n) content. Learn how to leverage tree shaking and lazy loading for dictionaries with Intlayer.
keywords:
  - Bundle Optimisation
  - Content Automation
  - Dynamic Content
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "Added `intlayerPurgeBabelPlugin` and `intlayerMinifyBabelPlugin` for Babel/Webpack; clarified the plugin pipeline"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Added `minify` and `purge` options to build configuration"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# i18n Bundle Size & Performance Optimisation

One of the most common challenges with traditional i18n solutions relying on JSON files is managing content size. If developers do not manually separate content into namespaces, users often end up downloading the translations for every page and potentially every language just to view a single page.

For example, an application with 10 pages translated into 10 languages could result in a user downloading 100 pages' worth of content, even though they only need **one** (the current page in the current language). This leads to wasted bandwidth and slower load times.

**Intlayer solves this problem through build-time optimisation.** It analyses your code to detect exactly which dictionaries are actually used per component and re-injects only the necessary content into your bundle.

## Table of Contents

<TOC />

## Analyse your bundle

Analysing your bundle is the first step to identifying "heavy" JSON files and opportunities for code-splitting. These tools generate a visual treemap of your application's compiled code, allowing you to see exactly which libraries are taking up the most space.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite uses Rollup under the hood. The `rollup-plugin-visualizer` generates an interactive HTML file showing the size of each module in your graph.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Automatically open the report in your browser
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

For projects using the App Router and Turbopack, Next.js provides a built-in, experimental analyser that requires no extra dependencies.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

If you are using the default Webpack bundler in Next.js, use the official bundle analyser. Trigger it by setting an environment variable during your build.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Your Next.js config
});
```

**Usage:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standard Webpack

For Create React App (ejected), Angular, or custom Webpack setups, use the industry standard `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## How it works

Intlayer uses a **per-component approach**. Unlike global JSON files, your content is defined alongside or within your components. During the build process, Intlayer will:

1. **Analyse** your code to find `useIntlayer` calls.
2. **Build** the corresponding dictionary content.
3. **Replace** the `useIntlayer` call with optimised code based on your configuration.

This ensures that:

- If a component is not imported, its content is not included in the bundle (Dead Code Elimination).
- If a component is lazy-loaded, its content is also lazy-loaded.

## Plugin Reference

Intlayer's build optimisation is split into several discrete plugins, each with a single responsibility. Understanding what each one does prevents confusion when configuring them.

### Babel plugins (`@intlayer/babel`)

These are used directly in `babel.config.js` for Webpack-based setups (Next.js with Babel, CRA, custom Webpack, etc).

| Plugin                        | What it does                                                                                                        |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `intlayerExtractBabelPlugin`  | Scans `.content.ts` files and writes compiled dictionaries to `.intlayer/`                                          |
| `intlayerOptimizeBabelPlugin` | Rewrites `useIntlayer('key')` → `useDictionary(hash)` and injects the matching dictionary `import`                  |
| `intlayerPurgeBabelPlugin`    | Scans all source files, removes **unused content fields** from the compiled `.intlayer/**/*.json` dictionary files  |
| `intlayerMinifyBabelPlugin`   | **Renames content field keys** to short alphabetical aliases (`title` → `a`) in both JSON files and the source code |

> **Plugin order matters.** In your `babel.config.js` the purge and minify plugins must appear **before** the optimize plugin. The optimize pass replaces `useIntlayer('key')` with an opaque `useDictionary(hash)` call, wiping out the dictionary key information the purge and minify passes need to identify which fields are used.

Each Babel plugin has a corresponding options helper that reads your `intlayer.config.ts` once at config load time and returns pre-resolved values:

| Options helper               | Used with                     |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Vite plugins (`vite-intlayer`)

Vite users **never configure these directly**. They are wired up automatically when you call `withIntlayer()` in `vite.config.ts`. The `build.purge` and `build.minify` flags in `intlayer.config.ts` toggle the corresponding behaviour without any extra plugin registration.

| Internal Vite plugin | Equivalent behaviour                                                                   |
| :------------------- | :------------------------------------------------------------------------------------- |
| Usage analyzer       | Same as `intlayerPurgeBabelPlugin` analyse pass                                        |
| Dictionary prune     | Same as `intlayerPurgeBabelPlugin` JSON write pass                                     |
| Dictionary minify    | Same as `intlayerMinifyBabelPlugin` JSON write pass                                    |
| Babel transform      | Same as `intlayerMinifyBabelPlugin` source code rename + `intlayerOptimizeBabelPlugin` |

## Setup by Platform

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js requires the `@intlayer/swc` plugin for the optimise (import rewrite) pass, because Next.js uses SWC for builds.

> This plugin is not installed by default as SWC plugins are still experimental for Next.js. This may change in the future.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Once installed, Intlayer will automatically detect and use the plugin.

For the **purge and minify** passes (field removal and field rename), install `@intlayer/babel` alongside it and add the Babel plugins. Because Next.js uses SWC for transformation but still evaluates `babel.config.js` for plugin config, the Babel plugins run as a pre-pass before SWC.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: remove unused content fields from .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: rename content field keys in JSON + source code
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Note: intlayerOptimizeBabelPlugin is NOT needed here because
    // @intlayer/swc handles the useIntlayer → useDictionary rewrite.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite uses the `@intlayer/babel` plugin, which is included as a dependency of `vite-intlayer`. The full optimisation pipeline — import rewrite, purge, and minify — is enabled by default and requires no extra plugin registration.

Enable purge and minify by setting the corresponding flags in `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // remove unused content fields from bundled JSON
    minify: true, // rename content field keys to short aliases
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (and Next.js with Babel)

Install `@intlayer/babel`:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

Add all four plugins to `babel.config.js` in the correct order:

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: compile .content.ts files → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: remove unused fields from .intlayer/**/*.json
    //    (reads the intlayer.config.ts build.purge flag)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: rename field keys in JSON + source code
    //    (reads the intlayer.config.ts build.minify flag)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: rewrite useIntlayer('key') → useDictionary(hash)
    //    Must come last because it erases the dictionary key.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Configuration

You can control how Intlayer optimises your bundle via the `build` property in your `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Replace useIntlayer() calls with direct dictionary imports at build-time.
    // undefined = auto (enabled in production), true = always, false = never.
    optimize: undefined,

    // Rename content field keys in compiled dictionaries to short alphabetical
    // aliases (e.g. title → a). Reduces JSON size; requires optimize.
    minify: true,

    // Remove content fields that are never accessed in the source code.
    // Requires optimize.
    purge: true,
  },
};

export default config;
```

> It is recommended to keep the default value (`undefined`) for `optimize` in most cases.

> See the configuration reference for all options: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)

### Build Options

| Property       | Type                   | Default     | Description                                                                                                                                                                                |
| :------------- | :--------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean \| undefined` | `undefined` | Enables the import rewrite pass. `undefined` = active in production builds only. `false` disables purge and minify as well.                                                                |
| **`minify`**   | `boolean`              | `false`     | Renames content field keys in compiled JSON files to short alphabetical aliases. Rewrites matching property accesses in the source code as well. Has no effect when `optimize` is `false`. |
| **`purge`**    | `boolean`              | `false`     | Removes content fields that are never statically accessed in the source code from the compiled JSON files. Has no effect when `optimize` is `false`.                                       |

### Minification (field key rename)

`build.minify` does **not** minify your JavaScript bundle — your bundler handles that. Instead, it shrinks the compiled dictionary JSON files by replacing every user-defined content field key with a short alphabetical alias:

```
// Before minification
{ "title": "Hello", "subtitle": "World" }

// After minification
{ "a": "Hello", "b": "World" }
```

The same rename is applied to all property accesses in your source code, so `content.title` becomes `content.a` in the compiled output. The runtime behaviour is identical.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Minification is skipped when `optimize` is `false` or when `editor.enabled` is `true` (the visual editor requires the original field names to allow editing).

> Minification is also skipped for dictionaries loaded via `importMode: 'fetch'` because their JSON is served from a remote API using the original field names — renaming the client-side keys would break the server/client contract.

### Purging (unused field removal)

`build.purge` analyses which content fields are actually accessed in your source code and removes all others from the compiled JSON files.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Example:** a dictionary with five fields where only two are used:

```
// Before purge
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// After purge (only title + subtitle accessed in source)
{ "title": "…", "subtitle": "…" }
```

> Purge is skipped when `optimize` is `false` or when `editor.enabled` is `true`.

> Purge is also conservatively skipped when a source file cannot be parsed, or when the result of `useIntlayer` is assigned to a variable and passed around in ways the static analyser cannot track (e.g. spread into an object, passed as a prop without destructuring). In those cases, the full dictionary is preserved.

### Import Mode

For large applications, including several pages and locales, your JSON can represent an important part of your bundle size. Intlayer allows you to control how dictionaries are loaded using the `importMode` option.

### Global definition

The import mode can be defined globally in your `intlayer.config.ts` file.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // Default is 'static'
  },
};

export default config;
```

### Per-dictionary definition

You can override the import mode for individual dictionaries in their `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` files.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Override the default import mode
  content: {
    // ...
  },
};

export default appContent;
```

| Property         | Type                               | Default    | Description                                                                                              |
| :--------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Deprecated**: Use `dictionary.importMode` instead. Determines how dictionaries are loaded (see below). |

The `importMode` setting determines how the dictionary's content is injected into your component. You can define it globally in `intlayer.config.ts` under the `dictionary` object, or override it on a per-dictionary basis in its `.content.ts` file.

### 1. Static Mode (`default`)

In static mode, Intlayer replaces `useIntlayer` with `useDictionary` and injects the dictionary directly into the JavaScript bundle.

- **Pros:** Instant rendering (synchronous), zero additional network requests during hydration.
- **Cons:** The bundle includes translations for **all** available languages for that specific component.
- **Best for:** Single Page Applications (SPA).

**Transformed code example:**

```tsx
// Your code
const content = useIntlayer("my-key");

// Optimised code illustration after transformation (Static)
// This is for illustration only, the actual code will differ for optimisation reasons
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Dynamic Mode

In dynamic mode, Intlayer replaces the `useIntlayer` with `useDictionaryAsync`. This uses `import()` (a Suspense-like mechanism) to lazy-load specifically the JSON for the current locale.

- **Pros:** **Locale-level tree shaking.** A user viewing the English version will download _only_ the English dictionary. The French dictionary is never loaded.
- **Cons:** Triggers a network request (asset fetch) per component during hydration.
- **Best for:** Large text blocks, articles, or applications supporting many languages where bundle size is critical.

**Transformed code example:**

```tsx
// Your code
const content = useIntlayer("my-key");

// Optimised code illustration after transformation (Dynamic)
// This is for illustration only, the actual code will differ for optimisation reasons
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> When using `importMode: 'dynamic'`, if you have 100 components using `useIntlayer` on a single page, the browser will attempt 100 separate fetches. To avoid this "waterfall" of requests, group content into fewer `.content` files (e.g. one dictionary per page section) instead of one per atom component. You can also use multiple `.content` files that use the same key. Intlayer will merge them into a single dictionary.

### 3. Fetch Mode

Behaves similarly to Dynamic mode but attempts to fetch dictionaries from the Intlayer Live Sync API first. If the API call fails or the content is not marked for live updates, it falls back to the dynamic import.

**Transformed code example:**

```tsx
// Your code
const content = useIntlayer("my-key");

// Optimised code illustration (Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  fr: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/fr").then((res) =>
      res.json()
    ),
});
```

> See CMS documentation for more details: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)

> In fetch mode, purge and minification are not applied because the JSON is served from a remote API using the original field names.

## Summary: Static vs Dynamic

| Feature              | Static Mode                                       | Dynamic Mode                     |
| :------------------- | :------------------------------------------------ | :------------------------------- |
| **JS Bundle Size**   | Larger (includes all languages for the component) | Smallest (code only, no content) |
| **Initial Load**     | Instant (Content is in bundle)                    | Slight delay (Fetches JSON)      |
| **Network Requests** | 0 extra requests                                  | 1 request per dictionary key     |
| **Tree Shaking**     | Component-level                                   | Component-level + Locale-level   |
| **Best Use Case**    | UI Components, Small Apps                         | Text-heavy pages, Many Languages |
