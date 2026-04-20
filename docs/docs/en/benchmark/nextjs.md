---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: Best i18n solution for Next.js in 2026 - Benchmark Report
description: Compare Next.js internationalization (i18n) libraries like next-intl, next-i18next, and Intlayer. Detailed performance report on bundle size, leakage, and reactivity.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - performance
  - intlayer
slugs:
  - doc
  - benchmark
  - nextjs
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Init benchmark"
---

# Top i18n solution for Next.js in 2026. Benchmark all the solutions

A detailed reference for understanding what Benchmark Bloom measures, how results are structured, and how to interpret the data.

---

## Table of Contents

<TOC/>

---

## Overview

<I18nBenchmark framework="nextjs"/>

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

The version of the i18n library under test. Useful for tracking how performance evolves as libraries update.

### 2. Framework

Whether the benchmark runs on **Next.js** or **TanStack Start**. Framework choice affects SSR behavior, code splitting semantics, and baseline bundle size.

### 3. Test category

The loading strategy used — `static`, `dynamic`, `scoped-static`, or `scoped-dynamic`. This is often the single biggest factor in bundle efficiency.

### 4. Library size

The baseline JavaScript overhead added by the i18n library itself. This measures the cost of simply importing the library into your project, before any translations are even added.

### 5. Page size (min / average / max)

The total JavaScript sent to the browser when loading a page.

Stats reported:

- **min** — lightest page in the app
- **avg** — mean across all pages and locales
- **max** — heaviest page in the app

### 6. Size of test content

The translations and content strings that _belong_ to the current page and locale — i.e. content that is legitimately needed.

### 7. Size of unused content

Translation strings that were bundled but _should not_ have been on this page:

- **Locale leakage:** strings from locales the user is not using (e.g. French strings on an English page load).
- **Page leakage:** strings from other pages that got bundled alongside the current page.

| Metric           | Description                                           | Value |
| ---------------- | ----------------------------------------------------- | ----- |
| Locale leakage % | % of JS bundle containing strings from unused locales | -     |
| Page leakage %   | % of JS bundle containing strings from other pages    | -     |
| Total unused %   | Overall wasted content ratio                          | -     |

### 8. Component size (min / average / max)

Measures how much code is "reachable" when React renders an individual component. This helps identify if a library pulls in substantial runtime that isn't eliminated by tree-shaking.

Stats reported:

- **min** — smallest individual component
- **avg** — mean component size across all components
- **max** — largest component

### 9. Reactivity

How fast the UI updates when the user switches language.

Two sub-metrics:

| Metric                         | Description                                        | Value |
| ------------------------------ | -------------------------------------------------- | ----- |
| **E2E perceived reactivity**   | Time from selecting a new locale to the DOM update | -     |
| **React Profiler render time** | Internal React render cost triggered by the switch | -     |

---

## Result Reference

Summary of the measurements captured during the benchmark.

### Bundle & Leakage

| Metric                | Description                                      | Value |
| --------------------- | ------------------------------------------------ | ----- |
| **Page JS Gzip Size** | Total compressed JavaScript delivered for a page | -     |
| **Locale Leakage %**  | Efficiency loss due to unused language strings   | -     |
| **Page Leakage %**    | Efficiency loss due to strings from other routes | -     |

### Reactivity Timing

| Metric                         | Description                                   | Value |
| ------------------------------ | --------------------------------------------- | ----- |
| **E2E perceived reactivity**   | Real-world time to language switch            | -     |
| **React Profiler render time** | Pure JavaScript execution cost for the update | -     |

### Component Overhead

| Metric              | Description                                    | Value |
| ------------------- | ---------------------------------------------- | ----- |
| **Unminified size** | Raw component source including i18n runtime    | -     |
| **Minified size**   | Optimized component code                       | -     |
| **Gzip size**       | Final compressed impact on the user's download | -     |

### Library Baseline

| Metric               | Description                                      | Value |
| -------------------- | ------------------------------------------------ | ----- |
| **Library Overhead** | The baseline compressed size of the i18n runtime | -     |

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
