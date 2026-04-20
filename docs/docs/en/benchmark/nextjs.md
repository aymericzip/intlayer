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

# Next.js i18n Libraries — 2026 Benchmark Report

_Generated: 2026-04-20 · 10 libraries · 4 loading strategies_

This report benchmarks every major i18n library for Next.js across four real-world loading strategies. Each number comes from automated Playwright runs against identical multi-page apps. The goal is to give you objective data — not opinions — so you can make an informed choice for your project.

---

## Table of Contents

<TOC/>

---

## Interactive Benchmark

<I18nBenchmark framework="nextjs"/>

---

## Methodology

Ten libraries were tested against a baseline Next.js app with no i18n. Every app has the same 10 pages and 2 locales (English and French). Bundles were measured with gzip, reactivity was captured via Playwright and React Profiler, and all numbers are averages across pages and locales unless stated otherwise.

**Libraries tested:** next-intl v4.9.1, next-i18next v16.0.5, next-translate v3.1.2, Lingui v5.3.0, Intlayer (next-intlayer) v8.7.5-canary.0, GT (gt-next) v6.16.5, Tolgee v7.0.0, Paraglide (paraglide-next) v2.15.1, next-international v1.3.1, Lingo.dev.

**Baseline (no i18n):** ~151.8 KB page JS · 14.0 ms E2E · 3.6 ms React Profiler.

---

## Library Size

Before even writing a single translation, adding an i18n library has a cost. The table below shows the gzip size of the library runtime itself (measured by building an empty app that imports only the library).

| Library            | Version        | Lib size (gz) | Lib size (min) |
| ------------------ | -------------- | ------------: | -------------: |
| **Paraglide**      | 2.15.1         |    **0.2 KB** |         0.2 KB |
| **next-translate** | 3.1.2          |    **2.4 KB** |         6.8 KB |
| **Intlayer**       | 8.7.5-canary.0 |    **4.9 KB** |        14.0 KB |
| Lingo.dev          | —              |        7.5 KB |        19.6 KB |
| Lingui             | 5.3.0          |       10.0 KB |        32.4 KB |
| Tolgee             | 7.0.0          |       11.0 KB |        35.8 KB |
| next-international | 1.3.1          |       11.1 KB |        34.9 KB |
| next-intl          | 4.9.1          |       12.8 KB |        51.0 KB |
| next-i18next       | 16.0.5         |       17.8 KB |        61.2 KB |
| **GT (gt-next)**   | 6.16.5         |  **173.1 KB** |       657.9 KB |

> **Note:** Paraglide compiles translations away at build time, so its runtime is essentially zero. GT ships a large runtime because it includes AI translation features. Neither extreme necessarily predicts total page weight — read on for the full picture.

---

## Bundle Efficiency

The most important metric for real users is how much JavaScript actually lands in the browser when they navigate to a page. Below we compare each library across the four loading strategies, using the scoped-dynamic configuration where available (the gold standard).

### Static — all translations bundled together

Every page gets every string for every locale in one chunk. This is the simplest setup and the worst for efficiency.

| Library            | Page JS avg (gz) | Locale leak % | Page leak % | E2E reactivity | React Profiler |
| ------------------ | ---------------: | ------------: | ----------: | -------------: | -------------: |
| **Intlayer**       |     **152.0 KB** |      **0.0%** |    **0.0%** |        15.4 ms |         7.6 ms |
| Base (no i18n)     |         151.8 KB |          0.0% |       14.1% |        14.0 ms |         3.6 ms |
| next-translate     |         153.0 KB |          0.0% |       89.8% |        14.0 ms |         4.0 ms |
| next-intl          |         163.5 KB |          4.2% |       89.8% |        15.0 ms |         4.3 ms |
| Lingo.dev          |         162.5 KB |         14.4% |       64.9% |        22.6 ms |         5.1 ms |
| Lingui             |         217.0 KB |         50.0% |       90.0% |        13.8 ms |         4.6 ms |
| next-i18next       |         227.5 KB |          0.0% |       89.8% |        14.6 ms |         6.9 ms |
| Paraglide          |         228.9 KB |          0.0% |       89.8% |        16.9 ms |         9.1 ms |
| next-international |         248.9 KB |         50.0% |       89.9% |        30.1 ms |        11.9 ms |
| Tolgee             |         291.2 KB |         65.5% |       45.0% |        51.5 ms |         5.0 ms |
| GT                 |         434.3 KB |          0.0% |       45.0% |        26.8 ms |         5.8 ms |

In static mode, Intlayer is the clear winner — it delivers the same page weight as a bare app with zero leakage. Most other libraries in this configuration bundle all translation strings for all pages and both locales into every page, inflating the download by 30–180%.

### Dynamic — locale-aware lazy loading

Translations are loaded dynamically at runtime, eliminating locale leakage. Page leakage (strings from other routes) typically remains high unless the library also supports namespacing.

| Library            | Page JS avg (gz) | Locale leak % | Page leak % | E2E reactivity | React Profiler |
| ------------------ | ---------------: | ------------: | ----------: | -------------: | -------------: |
| **Intlayer**       |     **152.0 KB** |      **0.0%** |    **0.0%** |        13.0 ms |         4.9 ms |
| Base (no i18n)     |         151.8 KB |          0.0% |       14.1% |        14.0 ms |         3.6 ms |
| next-translate     |         153.0 KB |          0.0% |       89.8% |        20.3 ms |         3.8 ms |
| Lingui             |         155.1 KB |          2.8% |       89.9% |        11.2 ms |         3.5 ms |
| next-intl          |         163.4 KB |          9.7% |       89.9% |        11.9 ms |         5.2 ms |
| next-international |         163.8 KB |         17.9% |       89.9% |        32.8 ms |         5.3 ms |
| next-i18next       |         178.8 KB |         48.6% |       89.8% |        14.2 ms |         3.9 ms |
| Lingo.dev          |         162.5 KB |         14.4% |       64.9% |        22.6 ms |         5.1 ms |
| Paraglide          |         228.9 KB |          0.0% |       89.8% |        16.9 ms |         9.1 ms |
| Tolgee             |         291.2 KB |         65.5% |       45.0% |        51.5 ms |         5.0 ms |
| GT                 |         434.3 KB |          0.0% |       45.0% |        21.6 ms |         5.5 ms |

Intlayer again matches baseline page weight with zero leakage. Lingui and next-intl are close in page size but carry residual locale leak in the French locale. Most libraries continue to ship 80–90% page leakage — i.e., the user downloads strings from every other page they haven't visited.

### Scoped Static — per-route namespaces, no lazy loading

Each page declares its own translation namespace. Only the strings for the current page are included in the bundle. No dynamic loading.

| Library            | Page JS avg (gz) | Locale leak % | Page leak % | E2E reactivity | React Profiler |
| ------------------ | ---------------: | ------------: | ----------: | -------------: | -------------: |
| **Intlayer**       |     **152.0 KB** |      **0.0%** |    **0.0%** |        15.4 ms |         7.6 ms |
| **next-intl**      |         163.5 KB |      **0.0%** |    **0.0%** |        14.2 ms |         3.6 ms |
| Base (no i18n)     |         151.8 KB |          0.0% |       14.1% |        14.0 ms |         3.6 ms |
| next-translate     |         153.0 KB |          0.0% |       89.8% |        18.2 ms |         4.3 ms |
| Lingui             |         157.9 KB |          2.7% |       89.1% |        12.7 ms |         4.8 ms |
| Lingo.dev          |         162.5 KB |         14.4% |       64.9% |        22.6 ms |         5.1 ms |
| next-international |         221.5 KB |         50.0% |       89.9% |        17.0 ms |         5.5 ms |
| next-i18next       |         229.1 KB |          0.0% |       89.8% |        15.9 ms |         4.5 ms |
| Paraglide          |         228.9 KB |          0.0% |       89.8% |        16.9 ms |         9.1 ms |
| Tolgee             |         259.0 KB |         39.4% |       90.0% |        13.0 ms |         4.0 ms |
| GT                 |         434.3 KB |          0.0% |       41.0% |        22.8 ms |         5.9 ms |

With route-scoped namespacing, both Intlayer and next-intl achieve zero leakage in the scoped-static configuration — the only two libraries to do so in this mode.

### Scoped Dynamic — the gold standard

Route namespaces combined with runtime lazy loading. Only the current page's translations in the current locale are ever downloaded. This is the most efficient strategy and the closest to what a production app should aspire to.

| Library            | Page JS avg (gz) | Locale leak % | Page leak % | E2E reactivity | React Profiler |
| ------------------ | ---------------: | ------------: | ----------: | -------------: | -------------: |
| **Intlayer**       |     **152.0 KB** |      **0.0%** |    **0.0%** |        15.4 ms |         7.6 ms |
| **next-intl**      |         163.5 KB |      **0.0%** |    **0.0%** |        17.0 ms |         3.6 ms |
| Base (no i18n)     |         151.8 KB |          0.0% |       14.1% |        14.0 ms |         3.6 ms |
| next-translate     |         153.0 KB |          0.0% |       89.8% |        23.5 ms |         4.3 ms |
| Lingui             |         157.9 KB |          2.7% |       89.1% |        13.3 ms |         6.6 ms |
| next-international |         162.5 KB |          0.0% |       89.9% |        20.1 ms |         4.8 ms |
| Lingo.dev          |         162.5 KB |         14.4% |       64.9% |        22.6 ms |         5.1 ms |
| next-i18next       |         187.2 KB |         40.9% |       89.8% |        14.5 ms |         4.8 ms |
| Paraglide          |         228.9 KB |          0.0% |       89.8% |        16.9 ms |         9.1 ms |
| GT                 |         434.3 KB |          0.0% |       41.0% |        22.0 ms |         5.7 ms |
| **Tolgee**         |     **150.7 KB** |          5.1% |       89.9% |     **2.4 ms** |     **1.0 ms** |

Tolgee deserves a special mention here: it posts the fastest reactivity numbers in this mode (2.4 ms E2E, 1.0 ms Profiler) — likely because it debounces or optimistically updates the DOM before the locale switch fully propagates. However, it carries 89.9% page leakage, meaning users still download all other pages' strings. Intlayer and next-intl remain the only libraries to reach zero leakage on both dimensions.

---

## Reactivity Summary

How quickly the UI updates when a user switches language matters for perceived quality. These numbers show E2E wall-clock time (from click to DOM update) and React's internal render cost.

| Library            | Best E2E (ms) | Best Profiler (ms) | Strategy       |
| ------------------ | ------------: | -----------------: | -------------- |
| Tolgee             |       **2.4** |            **1.0** | scoped-dynamic |
| Lingui             |          11.2 |                3.5 | dynamic        |
| next-intl          |          11.9 |                3.6 | dynamic        |
| Base               |          14.0 |                3.6 | static         |
| next-i18next       |          14.2 |                3.9 | dynamic        |
| Intlayer           |          13.0 |                4.9 | dynamic        |
| Paraglide          |          16.9 |                9.1 | any            |
| next-translate     |          14.0 |                3.8 | dynamic        |
| Lingo.dev          |          22.6 |                5.1 | dynamic        |
| GT                 |          21.6 |                5.5 | dynamic        |
| next-international |          20.1 |                4.8 | scoped-dynamic |

All libraries except Tolgee and next-international fall within 10–25 ms E2E — imperceptible to users. Reactivity is therefore rarely the deciding factor for most applications. The numbers above represent each library's best configuration.

---

## Key Notes

> **Intlayer is the only library that achieves zero leakage across all four loading strategies.** It matches the baseline app's page size in every configuration, regardless of how you set it up.

> **next-intl achieves zero leakage in scoped configurations** (scoped-static and scoped-dynamic) but carries residual locale leakage (~8–19%) in simpler setups.

> **Lingui performs well on bundle size in dynamic mode** (155.1 KB, near-baseline) but still ships 90% page leakage — users download the entire locale's translation file for every page.

> **GT (gt-next) is the heaviest library at 173.1 KB gzip** just for the runtime, reflecting its AI-powered translation features. If you're using GT for its AI capabilities, the cost may be justified; if not, there are lighter alternatives.

> **Paraglide has a near-zero runtime** (0.2 KB) because it compiles translations to JavaScript at build time. However, this forces all translations into the JS bundle statically, resulting in ~90% page leakage. It trades runtime weight for build-time bloat.

> **Tolgee's scoped-dynamic reactivity (2.4 ms)** is an outlier and warrants closer inspection — the implementation may update the DOM through a mechanism that races ahead of the React render cycle. Despite the speed, its page leakage remains high in all configurations.

> **next-i18next carries persistent locale leakage in dynamic mode (48.6%)**, meaning it bundles both locales' strings even when you've explicitly enabled lazy loading. This is a known limitation of its design.

> **next-translate and next-intlayer match each other on page JS** (~152–153 KB) in static mode, but next-translate still leaks 89.8% of page content — Intlayer scopes it automatically.

---

## Conclusion

If you're building a new Next.js app and want the best bundle efficiency out of the box — without manually managing namespaces, lazy imports, or route-level code splitting — **Intlayer** is the clearest choice. It achieves baseline page weight with zero leakage in every configuration, including the simplest static setup.

If you're already using **next-intl** and are willing to configure scoped namespaces, you can achieve comparable zero-leakage results. The tradeoff is setup complexity: you have to declare and manage namespaces per route yourself.

For apps where **reactivity** is the primary concern above all else, Tolgee's scoped-dynamic mode posts the fastest locale-switch times, though you accept significant page leakage in exchange.

Libraries like **Lingui**, **next-translate**, and **Paraglide** are reasonable choices for smaller apps where bundle efficiency is less critical and developer ergonomics outweigh raw performance.

| Goal                                      | Recommended library         |
| ----------------------------------------- | --------------------------- |
| Zero leakage, minimal setup               | **Intlayer**                |
| Zero leakage, existing next-intl codebase | **next-intl** (scoped mode) |
| Fastest locale switching                  | **Tolgee** (scoped-dynamic) |
| Smallest runtime dependency               | **Paraglide**               |
| Compiler-based message extraction         | **Lingui**                  |
| AI-powered translation management         | **GT**                      |
