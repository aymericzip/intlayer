---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: Benchmark i18n libraries
description: Learn how Intlayer compares to other i18n libraries in terms of performance and bundle size.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Init benchmark"
---

# Benchmark Bloom — Report

Benchmark Bloom is a performance benchmarking suite that measures the real-world impact of i18n (internationalization) libraries across multiple React frameworks and loading strategies.

Find the detailed reports and technical documentation for each framework below:

- [**Next.js Benchmark Report**](https://intlayer.org/docs/benchmark/nextjs)
- [**TanStack Start Benchmark Report**](https://intlayer.org/docs/benchmark/tanstack)

---

## Current Results

See [**the interactive benchmark dashboard**](https://intlayer.org/benchmark) for live comparisons and summarized data.
| `scoped-dynamic` | High (near-zero leakage) | High |

Moving from `static` to `scoped-dynamic` typically reduces unused content by 60–90%, but requires significantly more configuration. Libraries like Intlayer automate the scoped-dynamic pattern so developers get the efficiency without the boilerplate.

### Reading leakage numbers

A page leakage of **35%** means that 35% of the JavaScript downloaded for that page contains strings from other pages — content the user cannot see on this page. On a 400 KB page, that is ~140 KB of avoidable data.

A locale leakage of **10%** means 10% of the bundle contains translations in languages the current user isn't using.

### Reactivity vs render time

- **E2E reactivity** measures the full user experience: network, framework overhead, DOM update.
- **React Profiler time** isolates the React tree re-render cost.

A library can have low Profiler time but high E2E time if locale switching involves a network request (fetching the new locale file). Conversely, a library can have high Profiler time but still feel fast if it batches updates efficiently.
