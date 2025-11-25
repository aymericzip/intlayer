---
createdAt: 2025-11-25
updatedAt: 2025-11-25
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
  - version: 6.0.0
    date: 2025-11-25
    changes: Init history
---

# Optimising i18n Bundle Size & Performance

One of the most common challenges with traditional i18n solutions relying on JSON files is managing content size. If developers do not manually separate content into namespaces, users often end up downloading translations for every page and potentially every language just to view a single page.

For example, an application with 10 pages translated into 10 languages might result in a user downloading the content of 100 pages, even though they only need **one** (the current page in the current language). This leads to wasted bandwidth and slower load times.

> To detect this, you can use bundle analysers such as `rollup-plugin-visualizer` (vite), `@next/bundle-analyser` (next.js), or `webpack-bundle-analyser` (React CRA / Angular / etc).

**Intlayer solves this problem through build-time optimisation.** It analyses your code to detect which dictionaries are actually used per component and reinjects only the necessary content into your bundle.

## Table of Contents

<TOC />

## How It Works

Intlayer uses a **per-component approach**. Unlike global JSON files, your content is defined alongside or within your components. During the build process, Intlayer:

1.  **Analyses** your code to find `useIntlayer` calls.
2.  **Builds** the corresponding dictionary content.
3.  **Replaces** the `useIntlayer` call with optimised code based on your configuration.

This ensures that:

- If a component is not imported, its content is not included in the bundle (Dead Code Elimination).
- If a component is lazy-loaded, its content is also lazy-loaded.

## Setup by Platform

### Next.js

Next.js requires the `@intlayer/swc` plugin to handle the transformation, as Next.js uses SWC for builds.

> This plugin is installed by default because SWC plugins are still experimental for Next.js. It may change in the future.

### Vite

Vite uses the `@intlayer/babel` plugin which is included as a dependency of `vite-intlayer`. The optimisation is enabled by default.

### Webpack

To enable bundle optimisation with Intlayer on Webpack, you need to install and configure the appropriate Babel (`@intlayer/babel`) or SWC (`@intlayer/swc`) plugin.

### Expo / Lynx

Bundle optimisation is **not available yet** for this platform. Support will be added in a future release.

## Configuration

You can control how Intlayer optimises your bundle via the `build` property in your `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // or 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> Keeping the default option for `optimize` is recommended in the vast majority of cases.

> See doc configuration for more details: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)

### Build Options

The following options are available under the `build` configuration object:

| Property              | Type                                      | Default                         | Description                                                                                                                                                                                      |
| :-------------------- | :---------------------------------------- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**        | `boolean`                                 | `undefined`                     | Controls whether build optimisation is enabled. If `true`, Intlayer replaces dictionary calls with optimised injects. If `false`, optimisation is disabled. Ideally set to `true` in production. |
| **`importMode`**      | `'static' &#124; 'dynamic' &#124; 'live'` | `'static'`                      | Determines how dictionaries are loaded (see details below).                                                                                                                                      |
| **`traversePattern`** | `string[]`                                | `['**/*.{js,ts,jsx,tsx}', ...]` | Glob patterns defining which files Intlayer should scan for optimisation. Use this to exclude unrelated files and speed up builds.                                                               |
| **`outputFormat`**    | `'esm' &#124; 'cjs'`                      | `'esm'`                         | Controls the output format of the built dictionaries.                                                                                                                                            |

## Import Modes

The `importMode` setting dictates how the dictionary content is injected into your component.

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
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> When using `importMode: 'dynamic'`, if you have 100 components using `useIntlayer` on a single page, the browser will attempt 100 separate fetches. To avoid this "waterfall" of requests, group content into fewer `.content` files (e.g., one dictionary per page section) rather than one per atom component.

> Currently, `importMode: 'dynamic'` is not fully supported for Vue and Svelte. It is recommended to use `importMode: 'static'` for these frameworks until further updates.

### 3. Live Mode

Behaves similarly to Dynamic mode but attempts to fetch dictionaries from the Intlayer Live Sync API first. If the API call fails or the content is not marked for live updates, it falls back to the dynamic import.

> See CMS documentation for more details: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)

## Summary: Static vs Dynamic

| Feature              | Static Mode                                   | Dynamic Mode                         |
| :------------------- | :-------------------------------------------- | :----------------------------------- |
| **JS Bundle Size**   | Larger (includes all langs for the component) | Smallest (only code, no content)     |
| **Initial Load**     | Instant (Content is in bundle)                | Slight delay (Fetches JSON)          |
| **Network Requests** | 0 extra requests                              | 1 request per dictionary             |
| **Tree Shaking**     | Component-level                               | Component-level + Locale-level       |
| **Best Use Case**    | UI Components, Small Apps                     | Pages with much text, Many Languages |
