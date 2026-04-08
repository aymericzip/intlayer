---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Optimising i18n Bundle Size & Performance
description: Reduce application bundle size by optimising internationalisation (i18n) content. Learn how to leverage tree shaking and lazy loading for dictionaries with Intlayer.
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
  - version: 8.7.0
    date: 2026-04-08
    changes: "Add `minify` and `purge` options to the build configuration"
---

# Optimising i18n Bundle Size & Performance

One of the most common challenges with traditional i18n solutions relying on JSON files is managing content size. If developers do not manually separate content into namespaces, users often end up downloading translations for every page and potentially every language just to view a single page.

For example, an application with 10 pages translated into 10 languages might result in a user downloading the content of 100 pages, even though they only need **one** (the current page in the current language). This leads to wasted bandwidth and slower load times.

**Intlayer solves this problem through build-time optimisation.** It analyses your code to detect which dictionaries are actually used per component and reinjects only the necessary content into your bundle.

## Table of Contents

<TOC />

## Scan your bundle

Analysing your bundle is the first step in identifying "heavy" JSON files and code-splitting opportunities. These tools generate a visual treemap of your application's compiled code, allowing you to see exactly which libraries are consuming the most space.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite uses Rollup under the hood. The `rollup-plugin-visualizer` generates an interactive HTML file showing the size of every module in your graph.

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

For projects using the App Router and Turbopack, Next.js provides a built-in experimental analyser that requires no extra dependencies.

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

For Create React App (ejected), Angular, or custom Webpack setups, use the industry-standard `webpack-bundle-analyzer`.

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

```typescript fileName="webpack.config.ts
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

## How It Works

Intlayer uses a **per-component approach**. Unlike global JSON files, your content is defined alongside or within your components. During the build process, Intlayer:

1.  **Analyses** your code to find `useIntlayer` calls.
2.  **Builds** the corresponding dictionary content.
3.  **Replaces** the `useIntlayer` call with optimised code based on your configuration.

This ensures that:

- If a component is not imported, its content is not included in the bundle (Dead Code Elimination).
- If a component is lazy-loaded, its content is also lazy-loaded.

## Setup by Platform

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js requires the `@intlayer/swc` plugin to handle the transformation, as Next.js uses SWC for builds.

> This plugin is not installed by default because SWC plugins are still experimental for Next.js. It may change in the future.

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

Once Installed. Intlayer will automatically detect and use the plugin.

 </Tab>
 <Tab value="vite">

### Vite

Vite uses `@intlayer/babel` plugin which is included as dependency of `vite-intlayer`. The optimisation is enabled by default. Nothing else to do.

 </Tab>
 <Tab value="webpack">

### Webpack

To enable bundle optimisation with Intlayer on Webpack, you need to install and configure the appropriate Babel (`@intlayer/babel`) or SWC (`@intlayer/swc`) plugin.

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

```typescript fileName="babel.config.js"
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
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
    /**
     * Minify the dictionaries to reduce the bundle size.
     */
     minify: true;

    /**
     * Purge the unused keys in a dictionaries
     */
     purge: true;

    /**
     * Indicates if the build should check TypeScript types
     */
    checkTypes: false;
  },
};

export default config;
```

> Keeping the default option for `optimize` is recommended in the most majority of cases.

> See doc configuration for more details: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)

### Build Options

The following options are available under the `build` configuration object:

| Property       | Type      | Default     | Description                                                                                                                                                                                      |
| :------------- | :-------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | Controls whether build optimisation is enabled. If `true`, Intlayer replaces dictionary calls with optimised injects. If `false`, optimisation is disabled. Ideally set to `true` in production. |
| **`minify`**   | `boolean` | `false`     | Whether to minify the dictionaries to reduce the bundle size.                                                                                                                                    |
| **`purge`**    | `boolean" | `false`     | Whether to purge the unused keys in dictionaries.                                                                                                                                                |

### Minification

Minifying dictionaries removes unnecessary whitespace, comments, and reduces the size of the JSON content. This is especially useful for large dictionaries.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Note: Minification is ignored if `optimize` is disabled or if the Visual Editor is enabled (as the editor needs the full content to allow editing).

### Purging

Purging ensures that only the keys actually used in your code are included in the final dictionary bundle. This can significantly reduce the size of your bundle if you have large dictionaries with many keys that are not used in every part of your application.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Note: Purging is ignored if `optimize` is disabled.

### Import Mode

For large applications, including several pages and locales, your JSON can represent a significant part of your bundle size. Intlayer allows you to control how dictionaries are loaded.

The import mode can be defined by default globally in your `intlayer.config.ts` file.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

As well as for each dictionaries in your `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` files.

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

| Property         | Type                               | Default    | Description                                                                                                      |
| :--------------- | :--------------------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Deprecated**: Use `dictionary.importMode` instead. Determines how dictionaries are loaded (see details below). |

The `importMode` setting dictates how the dictionary content is injected into your component.
You can define it globally in the `intlayer.config.ts` file under the `dictionary` object, or you can overwrite it for a specific dictionary in its `.content.ts` file.

### 1. Static Mode (`default`)

In static mode, Intlayer replaces `useIntlayer` with `useDictionary` and injects the dictionary directly into the JavaScript bundle.

- **Pros:** Instant rendering (synchronous), zero extra network requests during hydration.
- **Cons:** The bundle includes translations for **all** available languages for that specific component.
- **Best for:** Single Page Applications (SPA).

**Transformed Code Example:**

```tsx
// Your code
const content = useIntlayer("my-key");

// Optimised code (Static)
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

In dynamic mode, Intlayer replaces `useIntlayer` with `useDictionaryAsync`. This uses `import()` (Suspense-like mechanism) to lazy-load specifically the JSON for the current locale.

- **Pros:** **Locale-level tree shaking.** A user viewing the English version will _only_ download the English dictionary. The French dictionary is never loaded.
- **Cons:** Triggers a network request (asset fetch) per component during hydration.
- **Best for:** Large text blocks, articles, or applications supporting many languages where bundle size is critical.

**Transformed Code Example:**

```tsx
// Your code
const content = useIntlayer("my-key");

// Optimised code (Dynamic)
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

> When using `importMode: 'dynamic'`, if you have 100 components using `useIntlayer` on a single page, the browser will attempt 100 separate fetches. To avoid this "waterfall" of requests, group content into fewer `.content` files (e.g., one dictionary per page section) rather than one per atom component.

### 3. Fetch Mode

Behaves similarly to Dynamic mode but attempts to fetch dictionaries from the Intlayer Live Sync API first. If the API call fails or the content is not marked for live updates, it falls back to the dynamic import.

> See CMS documentation for more details: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)

> In fetch mode, purge and minification can't be used.

## Summary: Static vs Dynamic

| Feature              | Static Mode                                   | Dynamic Mode                         |
| :------------------- | :-------------------------------------------- | :----------------------------------- |
| **JS Bundle Size**   | Larger (includes all langs for the component) | Smallest (only code, no content)     |
| **Initial Load**     | Instant (Content is in bundle)                | Slight delay (Fetches JSON)          |
| **Network Requests** | 0 extra requests                              | 1 request per dictionary             |
| **Tree Shaking**     | Component-level                               | Component-level + Locale-level       |
| **Best Use Case**    | UI Components, Small Apps                     | Pages with much text, Many Languages |
