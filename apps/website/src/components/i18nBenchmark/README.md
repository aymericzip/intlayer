# Benchmark Bloom — Report

A detailed reference for understanding what Benchmark Bloom measures, how results are structured, and how to interpret the data.

---

## Table of Contents

1. [Overview](#overview)
2. [Test Categories](#test-categories)
3. [Frameworks Tested](#frameworks-tested)
4. [Libraries Tested](#libraries-tested)
5. [Metrics](#metrics)
6. [Result File Reference](#result-file-reference)
7. [Summary Script](#summary-script)
8. [Interpreting Results](#interpreting-results)

---

## Overview

Benchmark Bloom is a performance benchmarking suite that measures the real-world impact of i18n (internationalization) libraries across multiple React frameworks and loading strategies. It tests every major dimension of i18n cost:

- How much JavaScript the i18n library itself adds to the bundle
- How large each page's download is in practice
- How much of that download is "wasted" content — strings from other locales or other pages
- How fast the UI reacts when the user switches language
- How much overhead each UI component incurs just by importing an i18n library

The goal is to give developers objective, reproducible data to make informed decisions when choosing an i18n solution.

---

## Test Categories

Each library is tested in multiple configurations that reflect real-world usage patterns, from simplest (but most wasteful) to most optimal (but most complex).

### `base` — No i18n

The reference application with no i18n library at all. Used as a performance baseline to isolate the pure cost of adding any i18n solution.

### `static` — All-in-one bundle, no lazy loading

All translations for all locales and all pages are bundled into a single chunk. No code splitting, no lazy loading, no route-level scoping.

- **Characteristics:** Simple to implement; one import for all translations.
- **Downside:** Every page download contains the entire translation file — including strings from pages the user hasn't visited and from locales the user isn't using.
- **Who does this:** Very common in AI-generated code or quick prototypes.

### `dynamic` — Lazy-loaded translations, no namespacing

Translations are loaded dynamically at runtime (e.g. via `import()` or a remote API call), but they are not split by page or route. All page content for the active locale is loaded in one batch.

- **Characteristics:** Unused locale strings are eliminated. Only the active locale is downloaded.
- **Downside:** All pages' translations for the current locale are still bundled together — users always download content for pages they may never visit.
- **Who does this:** Projects that care about locale switching but haven't invested in route-level code splitting.

### `scoped-static` — Route namespaces, no lazy loading

Each route or page declares its own translation namespace. Only the translations belonging to the current page are included in the page bundle, but they are all present in the initial bundle — no lazy loading.

- **Characteristics:** Page leakage eliminated. Bundle is smaller per page.
- **Downside:** No dynamic loading; still requires a build-time bundling step per namespace. Slightly more complex to set up.
- **Who does this:** Less common, but a good middle ground for static-site generators.

### `scoped-dynamic` — Route namespaces + lazy loading _(the gold standard)_

Each page/route declares its own namespace **and** translations are loaded dynamically at runtime. Only the current page's translations in the current locale are ever downloaded.

- **Characteristics:** Minimizes both locale leakage and page leakage. The most efficient strategy.
- **Downside:** Significantly more complex to implement and maintain. Increases development overhead and slows down iteration. This is why libraries like [Intlayer](https://intlayer.org) exist — to automate this pattern so developers get the best of both worlds without the setup cost.
- **Who does this:** Production applications with strict performance budgets.

---

## Frameworks Tested

| Framework          | Description                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **Next.js**        | The most popular React meta-framework. Server-side rendering, file-based routing, app router. |
| **TanStack Start** | A full-stack React framework built on TanStack Router with file-based routing and SSR.        |

Each framework is benchmarked with all four test categories above where applicable.

---

## Libraries Tested

### Next.js libraries

| Library                      | npm package              | Notes                                                   |
| ---------------------------- | ------------------------ | ------------------------------------------------------- |
| **next-intl**                | `next-intl`              | Most popular Next.js i18n library                       |
| **next-i18next**             | `next-i18next`           | Classic i18n solution for Next.js (Pages Router origin) |
| **next-translate**           | `next-translate`         | Lightweight, file-based translations                    |
| **Lingui**                   | `@lingui/react`          | Compiler-based, extracts messages at build time         |
| **Intlayer**                 | `next-intlayer`          | Declaration-first, auto-scoped by component             |
| **GT (General Translation)** | `gt-next`                | AI-native i18n with automatic translation               |
| **Tolgee**                   | `@tolgee/react`          | Translation management platform + runtime               |
| **Paraglide**                | `@inlang/paraglide-next` | Compiler-based, zero-runtime strings                    |
| **Lingo.dev**                | `lingodotdev-i18next`    | AI-powered, i18next-based                               |

### TanStack Start libraries

| Library                      | npm package            | Notes                                       |
| ---------------------------- | ---------------------- | ------------------------------------------- |
| **react-i18next**            | `react-i18next`        | De-facto standard React i18n library        |
| **use-intl**                 | `use-intl`             | Core of next-intl, framework-agnostic       |
| **react-intl**               | `react-intl`           | FormatJS-based, mature and widely used      |
| **Lingui**                   | `@lingui/react`        | Compiler-based message extraction           |
| **Intlayer**                 | `intlayer`             | Declaration-first, auto-scoped by component |
| **GT (General Translation)** | `gt-react`             | AI-native i18n                              |
| **Tolgee**                   | `@tolgee/react`        | Translation platform + runtime              |
| **Wuchale**                  | `wuchale`              | Lightweight, file-based, compiler-based     |
| **Paraglide**                | `@inlang/paraglide-js` | Zero-runtime compiled strings               |
| **Lingo.dev**                | `lingodotdev-i18next`  | AI-powered, i18next-based                   |

---

## Metrics

### 1. Library version

The version of the i18n library under test, read from the app's `package.json`. Useful for tracking how performance evolves as libraries update.

### 2. Framework

Whether the benchmark runs on **Next.js** or **TanStack Start**. Framework choice affects SSR behavior, code splitting semantics, and baseline bundle size.

### 3. Test category

The loading strategy used — `static`, `dynamic`, `scoped-static`, or `scoped-dynamic`. This is often the single biggest factor in bundle efficiency.

### 4. Library size in the bundle

The JS overhead added by the i18n library itself, measured by compiling a minimal "empty component" (no real content, just the i18n import) and recording its bundled output size.

- **File:** `empty-component-size.json`
- **Unit:** bytes (unminified / minified / gzip)
- **Lower is better.** A large library size means every page pays a baseline cost regardless of how few translations are loaded.

### 5. Page size (min / average / max)

The total JavaScript sent to the browser when loading each page, measured across all pages and locales.

- **File:** `pages-bundle-<locale>.json` → `results[*].jsGzipSize`
- **Unit:** bytes (gzip compressed JS)
- **Lower is better.** Directly impacts initial load time, especially on slow connections.

Stats reported:

- **min** — lightest page in the app
- **avg** — mean across all pages and locales
- **max** — heaviest page in the app

### 6. Size of test content in the bundle

The translations and content strings that _belong_ to the current page and locale — i.e. content that is legitimately needed. Detected via page fingerprint matching.

- **File:** `pages-bundle-<locale>.json` → `fingerprintCounts.page[currentPage]`
- This is a count of content strings, not a byte count.
- Higher means richer page content; it is the denominator for understanding leakage severity.

### 7. Size of unused content in the bundle

Translation strings that were bundled but _should not_ have been on this page:

- **Locale leakage:** strings from locales the user is not using (e.g. French strings on an English page load).
- **Page leakage:** strings from other pages that got bundled alongside the current page (e.g. FAQ page strings on the Home page).

| Metric           | Source field           | Meaning                                               |
| ---------------- | ---------------------- | ----------------------------------------------------- |
| Locale leakage % | `localeLeakagePercent` | % of JS bundle containing strings from unused locales |
| Page leakage %   | `pageLeakagePercent`   | % of JS bundle containing strings from other pages    |
| Total unused %   | sum of both            | Overall wasted content ratio                          |

- **Lower is better.** 0% means every byte delivered is actually needed by the user. 50% means half the JS download is waste.

### 8. Component size (min / average / max)

Each UI component is compiled in isolation (with all its imports resolved) and its output size is measured. This shows how much code is "reachable" when React renders a component — including all i18n runtime code that gets tree-shaken or included.

- **File:** `components-size.json` → `components[*]`
- **Unit:** bytes (unminified / minified / gzip)
- **Lower is better.** Large components suggest the i18n library pulls in substantial runtime that isn't eliminated by tree-shaking.

Stats reported:

- **min** — smallest individual component
- **avg** — mean component size across all components
- **max** — largest component (usually a complex page-level component)

### 9. Reactivity

How fast the UI updates when the user switches language.

Two sub-metrics:

| Metric                         | Description                                                                                                                                                | Source                                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **E2E perceived reactivity**   | Wall-clock time from the user selecting a new locale to the `html[lang]` attribute updating in the DOM (ms). Measured with Playwright over 5 iterations.   | `reactivity-<locale>.json` → `e2e`           |
| **React Profiler render time** | Sum of React Profiler `actualDuration` across all update-phase renders triggered by the locale switch (ms). Measured with the React DevTools Profiler API. | `reactivity-<locale>.json` → `reactProfiler` |

- **Lower is better.** E2E reactivity is the user-visible metric. React Profiler time isolates the pure JS rendering cost.
- A library with 0ms React Profiler time achieves locale switching without triggering React re-renders (e.g. via CSS or DOM attribute updates only).

---

## Result File Reference

Results live at:

```
apps-benchmark/results/<category>/<app-package-name>/
```

### `pages-bundle-<locale>.json`

Bundle size and content leakage data, measured per page and per locale.

```jsonc
{
  "app": "nextjs-static-gt-next-app",
  "locale": "en",
  "timestamp": "...",
  "fingerprintCounts": {
    "locale": { "en": 0, "fr": 0 },       // strings from each locale detected on this page
    "page": { "home": 24, "about": 10 }   // strings from each page found anywhere in this run
  },
  "results": [
    {
      "path": "/en/",
      "page": "home",
      "locale": "en",
      "totalSize": 1544518,
      "totalGzipSize": 457504,
      "jsSize": 1488306,
      "jsGzipSize": 444987,               // ← key metric: compressed JS per page
      "cssSize": 23223,
      "htmlSize": 32989,
      "fileCount": 12,
      "jsFileCount": 10,
      "bundleFiles": [ ... ],             // individual files included in this page
      "localeLeakage": {                  // strings from each locale found on this page
        "fr": { "count": 5, "found": ["..."] }
      },
      "localeLeakagePercent": 2.3,        // % of JS bundle that is locale leakage
      "pageLeakage": {                    // strings from other pages found on this page
        "about": { "count": 3, "found": ["..."] }
      },
      "pageLeakagePercent": 18.5          // % of JS bundle that is page leakage
    }
  ]
}
```

### `reactivity-<locale>.json`

Locale-switch timing data.

```jsonc
{
  "locale": "en",
  "timestamp": "...",
  "iterations": 5,
  "e2e": {
    "description": "Perceived reactivity: time from select change to html[lang] DOM update (ms)",
    "raw": [10.5, 3.3, 6.5, 5.6, 7.4],
    "avg": 6.66,
    "min": 3.3,
    "max": 10.5,
  },
  "reactProfiler": {
    "description": "Internal React render time: sum of Profiler actualDuration for update phases (ms)",
    "raw": [5.3, 4.1, 6.2, 5.0, 4.8],
    "avg": 5.08,
    "min": 4.1,
    "max": 6.2,
  },
}
```

### `components-size.json`

Per-component bundle sizes compiled in isolation.

```jsonc
{
  "timestamp": "...",
  "packageName": "static-intlayer-app",
  "summary": {
    "totalComponents": 59,
    "totalUnminifiedBytes": 1757734,
    "totalMinifiedBytes": 1128281,
    "totalGzipBytes": 431929,
  },
  "components": [
    {
      "name": "Hero.tsx",
      "category": "pages",
      "unminifiedBytes": 48340,
      "unminifiedGzipBytes": 16853,
      "minifiedBytes": 37724,
      "minifiedGzipBytes": 15447,
    },
  ],
}
```

### `empty-component-size.json`

Library overhead measured via a synthetic empty component.

```jsonc
{
  "timestamp": "...",
  "packageName": "nextjs-static-gt-next-app",
  "summary": {
    "totalComponents": 1,
    "totalUnminifiedBytes": 697274,
    "totalMinifiedBytes": 675516,
    "totalGzipBytes": 177858,
  },
  "components": [
    {
      "name": "EmptyComponent.tsx",
      "category": "Synthetic",
      "unminifiedBytes": 697274,
      "minifiedBytes": 675516,
      "minifiedGzipBytes": 177858, // ← library-only overhead, gzip
    },
  ],
}
```

---

## Current Results

See [`RESULTS.md`](./RESULTS.md) for the latest benchmark findings with analysis and commentary on each metric.

Structured aggregates (all app rows + metadata) are written to [`summary.json`](./summary.json) when you run `bun run report` (or `bun report/scripts/summarize.ts --out`).

---

## Summary Script

The `report/scripts/summarize.ts` script reads all result data from `apps-benchmark/results/` and prints a human-readable summary.

### Usage

```bash
# From the repo root:
bun run report

# Or directly:
bun report/scripts/summarize.ts

# Filter to a specific framework:
bun report/scripts/summarize.ts --framework nextjs

# Filter to a specific category:
bun report/scripts/summarize.ts --category static

# Filter to a specific library:
bun report/scripts/summarize.ts --lib intlayer

# Output as JSON (stdout, app rows only):
bun report/scripts/summarize.ts --json

# Save full JSON (metadata + all app rows) to report/summary.json:
bun report/scripts/summarize.ts --out

# Custom path:
bun report/scripts/summarize.ts --out path/to/summary.json
```

### What it outputs

For each combination of framework + test category, the script prints a table with one row per library showing:

| Column               | Source                                           |
| -------------------- | ------------------------------------------------ |
| Library              | Derived from app package name                    |
| Lib size (gzip)      | `empty-component-size.json`                      |
| Page JS avg (gzip)   | `pages-bundle-*.json` avg `jsGzipSize`           |
| Page JS min–max      | `pages-bundle-*.json` min/max `jsGzipSize`       |
| Locale leak %        | `pages-bundle-*.json` avg `localeLeakagePercent` |
| Page leak %          | `pages-bundle-*.json` avg `pageLeakagePercent`   |
| Component avg (gzip) | `components-size.json` per-component avg         |
| E2E reactivity avg   | `reactivity-*.json` `e2e.avg`                    |
| React Profiler avg   | `reactivity-*.json` `reactProfiler.avg`          |

---

## Interpreting Results

### What makes a good i18n library?

| Metric               | Ideal value       | What it means                                 |
| -------------------- | ----------------- | --------------------------------------------- |
| Library size         | < 50 KB gzip      | The library itself is lightweight             |
| Page JS (avg)        | Close to base app | Almost no overhead per page                   |
| Locale leak %        | 0%                | Only the active locale is downloaded          |
| Page leak %          | 0%                | Only the current page's content is downloaded |
| Component size (avg) | Close to base app | Tree-shaking is effective                     |
| E2E reactivity       | < 20 ms           | Near-instant perceived language switch        |
| React Profiler       | < 5 ms            | Minimal re-render overhead on locale switch   |

### The efficiency–complexity tradeoff

| Category         | Efficiency                      | Setup complexity |
| ---------------- | ------------------------------- | ---------------- |
| `static`         | Low (lots of leakage)           | Very low         |
| `dynamic`        | Medium (locale leakage gone)    | Low–Medium       |
| `scoped-static`  | Medium-High (page leakage gone) | Medium           |
| `scoped-dynamic` | High (near-zero leakage)        | High             |

Moving from `static` to `scoped-dynamic` typically reduces unused content by 60–90%, but requires significantly more configuration. Libraries like Intlayer automate the scoped-dynamic pattern so developers get the efficiency without the boilerplate.

### Reading leakage numbers

A page leakage of **35%** means that 35% of the JavaScript downloaded for that page contains strings from other pages — content the user cannot see on this page. On a 400 KB page, that is ~140 KB of avoidable data.

A locale leakage of **10%** means 10% of the bundle contains translations in languages the current user isn't using.

### Reactivity vs render time

- **E2E reactivity** measures the full user experience: network, framework overhead, DOM update.
- **React Profiler time** isolates the React tree re-render cost.

A library can have low Profiler time but high E2E time if locale switching involves a network request (fetching the new locale file). Conversely, a library can have high Profiler time but still feel fast if it batches updates efficiently.
