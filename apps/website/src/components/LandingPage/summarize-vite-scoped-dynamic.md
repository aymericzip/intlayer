# Vite — i18n Benchmark Results

_Generated: 2026-04-20_

## Metric Legend

| Column               | What it measures                                                              |
| :------------------- | :---------------------------------------------------------------------------- |
| **Lib size (gz)**    | Gzip bytes of the minified i18n library via an empty-component build          |
| **Page JS avg (gz)** | Average gzip JS bundle per page across all locales                            |
| **Locale leak %**    | % of JS bundle containing strings from locales the user is NOT using          |
| **Page leak %**      | % of JS bundle containing strings from pages the user is NOT on               |
| **Comp avg (gz)**    | Average gzip size of individual components compiled in isolation              |
| **E2E reactivity**   | Wall-clock time from locale `<select>` change to `html[lang]` DOM update (ms) |
| **React Profiler**   | Sum of React `actualDuration` during locale-switch re-renders (ms)            |
| **Page load**        | `PerformanceNavigationTiming.duration` — full page load time (ms)             |
| **Hydration avg**    | Custom perf-mark delta for React hydration phase (ms); — = not instrumented   |

> **Status icons:** ✅ all data · 🔶 partial · ⬜ missing · ❌ error  
> **⚠ INVALID** = test ran but all measured values were zero (missing instrumentation or broken test)

## Libraries

- [base](#base)

## base

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| —       |        0.0 KB |         0.0 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     ✅     |          84.3 KB |          0.0% |                      0.0% |        0.6 KB |         1.9 ms |         0.4 ms |    8.0 ms |   11.1 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           | JS (gz) | Locale leak % | Page leak % |
| :------------- | ------: | ------------: | ----------: |
| `/en/`         | 85.6 KB |          0.0% |        0.0% |
| `/en/about`    | 84.4 KB |          0.0% |        0.0% |
| `/en/blog`     | 84.0 KB |          0.0% |        0.0% |
| `/en/careers`  | 84.3 KB |          0.0% |        0.0% |
| `/en/contact`  | 83.7 KB |          0.0% |        0.0% |
| `/en/faq`      | 84.2 KB |          0.0% |        0.0% |
| `/en/pricing`  | 83.8 KB |          0.0% |        0.0% |
| `/en/products` | 83.8 KB |          0.0% |        0.0% |
| `/en/settings` | 85.0 KB |          0.0% |        0.0% |
| `/en/team`     | 83.9 KB |          0.0% |        0.0% |

**Locale: `fr`**

| Page           | JS (gz) | Locale leak % | Page leak % |
| :------------- | ------: | ------------: | ----------: |
| `/fr/`         | 85.6 KB |          0.0% |        0.0% |
| `/fr/about`    | 84.4 KB |          0.0% |        0.0% |
| `/fr/blog`     | 84.0 KB |          0.0% |        0.0% |
| `/fr/careers`  | 84.3 KB |          0.0% |        0.0% |
| `/fr/contact`  | 83.7 KB |          0.0% |        0.0% |
| `/fr/faq`      | 84.2 KB |          0.0% |        0.0% |
| `/fr/pricing`  | 83.8 KB |          0.0% |        0.0% |
| `/fr/products` | 83.8 KB |          0.0% |        0.0% |
| `/fr/settings` | 85.0 KB |          0.0% |        0.0% |
| `/fr/team`     | 83.9 KB |          0.0% |        0.0% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/vite-base-app)

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  |  2.0 ms |  1.3 ms |  4.0 ms |       0.4 ms |
|  `fr`  |  1.8 ms |  1.4 ms |  3.2 ms |       0.4 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |    8.1 ms |   11.0 ms |      1.6 ms |
|  `fr`  |    7.8 ms |   11.2 ms |      1.5 ms |

</details>

---

## Coverage

| Metric                | Count |
| :-------------------- | :---- |
| Total libraries       | 1     |
| Total app entries     | 1     |
| With lib size data    | 1     |
| With page bundle data | 1     |
| With component data   | 1     |
| With reactivity data  | 1     |
| With rendering data   | 1     |
