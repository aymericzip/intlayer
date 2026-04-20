# TanStack Start (React) — i18n Benchmark Results

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
- [gt-react](#gt-react)
- [intlayer](#intlayer)
- [lingo.dev](#lingo-dev)
- [lingui](#lingui)
- [paraglide](#paraglide)
- [react-i18next](#react-i18next)
- [react-intl](#react-intl)
- [tolgee](#tolgee)
- [use-intl](#use-intl)
- [wuchale](#wuchale)

## base

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| —       |        0.0 KB |         0.0 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        |     ✅     |         111.0 KB |          0.0% |                      0.0% |        0.7 KB |         8.9 ms |         1.2 ms |   25.9 ms |   26.6 ms |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 112.3 KB |          0.0% |        0.0% |
| `/en/about`    | 111.1 KB |          0.0% |        0.0% |
| `/en/blog`     | 110.6 KB |          0.0% |        0.0% |
| `/en/careers`  | 111.0 KB |          0.0% |        0.0% |
| `/en/contact`  | 110.4 KB |          0.0% |        0.0% |
| `/en/faq`      | 110.9 KB |          0.0% |        0.0% |
| `/en/pricing`  | 110.5 KB |          0.0% |        0.0% |
| `/en/products` | 110.5 KB |          0.0% |        0.0% |
| `/en/settings` | 111.8 KB |          0.0% |        0.0% |
| `/en/team`     | 110.5 KB |          0.0% |        0.0% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 112.3 KB |          0.0% |        0.0% |
| `/fr/about`    | 111.1 KB |          0.0% |        0.0% |
| `/fr/blog`     | 110.6 KB |          0.0% |        0.0% |
| `/fr/careers`  | 111.0 KB |          0.0% |        0.0% |
| `/fr/contact`  | 110.4 KB |          0.0% |        0.0% |
| `/fr/faq`      | 110.9 KB |          0.0% |        0.0% |
| `/fr/pricing`  | 110.5 KB |          0.0% |        0.0% |
| `/fr/products` | 110.5 KB |          0.0% |        0.0% |
| `/fr/settings` | 111.8 KB |          0.0% |        0.0% |
| `/fr/team`     | 110.5 KB |          0.0% |        0.0% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/tanstack-base-app)

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  |  8.4 ms |  4.7 ms | 20.0 ms |       1.0 ms |
|  `fr`  |  9.4 ms |  4.3 ms | 23.4 ms |       1.4 ms |

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   28.4 ms |   30.5 ms |      8.8 ms |
|  `fr`  |   23.3 ms |   22.6 ms |      5.4 ms |

</details>

---

## gt-react

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 10.18.3 |      679.3 KB |      2507.2 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        |     🔶     |         568.2 KB |          0.0% |                     82.2% |      683.7 KB |        43.8 ms |         5.0 ms |   22.5 ms |   43.7 ms |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 568.2 KB |          0.0% |       64.4% |
| `/en/about`    | 568.2 KB |          0.0% |       77.8% |
| `/en/blog`     | 568.1 KB |          0.0% |       77.6% |
| `/en/careers`  | 568.2 KB |          0.0% |       75.6% |
| `/en/contact`  | 568.1 KB |          0.0% |       97.8% |
| `/en/faq`      | 568.1 KB |          0.0% |       81.8% |
| `/en/pricing`  | 568.1 KB |          0.0% |       91.8% |
| `/en/products` | 568.1 KB |          0.0% |       82.2% |
| `/en/settings` | 568.3 KB |          0.0% |       90.0% |
| `/en/team`     | 568.1 KB |          0.0% |       83.3% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 568.2 KB |          0.0% |       64.4% |
| `/fr/about`    | 568.2 KB |          0.0% |       77.8% |
| `/fr/blog`     | 568.1 KB |          0.0% |       77.6% |
| `/fr/careers`  | 568.2 KB |          0.0% |       75.6% |
| `/fr/contact`  | 568.1 KB |          0.0% |       97.8% |
| `/fr/faq`      | 568.1 KB |          0.0% |       81.8% |
| `/fr/pricing`  | 568.1 KB |          0.0% |       91.8% |
| `/fr/products` | 568.1 KB |          0.0% |       82.2% |
| `/fr/settings` | 568.3 KB |          0.0% |       90.0% |
| `/fr/team`     | 568.1 KB |          0.0% |       83.3% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/tanstack-dynamic-gt-react-app)

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min |  E2E max | Profiler avg |
| :----: | ------: | ------: | -------: | -----------: |
|  `en`  | 61.2 ms | 28.8 ms | 131.2 ms |       4.9 ms |
|  `fr`  | 26.4 ms | 15.1 ms |  39.5 ms |       5.1 ms |

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   25.4 ms |   43.5 ms |      6.4 ms |
|  `fr`  |   19.6 ms |   43.8 ms |      3.4 ms |

</details>

---

## intlayer

| Version        | Lib size (gz) | Lib size (min) |
| :------------- | ------------: | -------------: |
| 8.7.5-canary.0 |        4.7 KB |        12.8 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        |     🔶     |         118.3 KB |          0.0% |                      0.8% |        4.5 KB |              — |              — |   21.1 ms |   28.1 ms |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 119.8 KB |          0.0% |        5.9% |
| `/en/about`    | 118.1 KB |          0.0% |        0.0% |
| `/en/blog`     | 117.7 KB |          0.0% |        0.0% |
| `/en/careers`  | 118.4 KB |          0.0% |        0.0% |
| `/en/contact`  | 117.4 KB |          0.0% |        0.0% |
| `/en/faq`      | 117.9 KB |          0.0% |        0.0% |
| `/en/pricing`  | 117.6 KB |          0.0% |        0.0% |
| `/en/products` | 117.5 KB |          0.0% |        0.0% |
| `/en/settings` | 119.8 KB |          0.0% |        0.0% |
| `/en/team`     | 117.6 KB |          0.0% |        0.0% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 120.2 KB |          0.0% |       11.1% |
| `/fr/about`    | 118.4 KB |          0.0% |        0.0% |
| `/fr/blog`     | 117.9 KB |          0.0% |        0.0% |
| `/fr/careers`  | 118.6 KB |          0.0% |        0.0% |
| `/fr/contact`  | 117.5 KB |          0.0% |        0.0% |
| `/fr/faq`      | 118.2 KB |          0.0% |        0.0% |
| `/fr/pricing`  | 117.7 KB |          0.0% |        0.0% |
| `/fr/products` | 117.7 KB |          0.0% |        0.0% |
| `/fr/settings` | 119.9 KB |          0.0% |        0.0% |
| `/fr/team`     | 117.8 KB |          0.0% |        0.0% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/tanstack-dynamic-intlayer-app)

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   24.7 ms |   34.3 ms |      1.5 ms |
|  `fr`  |   17.6 ms |   21.9 ms |      1.2 ms |

</details>

---

## lingo.dev

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 0.133.9 |        7.6 KB |        19.8 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        |     ✅     |         122.6 KB |          0.0% |                      0.0% |       18.9 KB |        57.7 ms |         4.8 ms |   16.4 ms |   22.5 ms |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 124.2 KB |          0.0% |        0.0% |
| `/en/about`    | 122.5 KB |          0.0% |        0.0% |
| `/en/blog`     | 122.3 KB |          0.0% |        0.0% |
| `/en/careers`  | 122.7 KB |          0.0% |        0.0% |
| `/en/contact`  | 121.9 KB |          0.0% |        0.0% |
| `/en/faq`      | 122.4 KB |          0.0% |        0.0% |
| `/en/pricing`  | 122.1 KB |          0.0% |        0.0% |
| `/en/products` | 122.0 KB |          0.0% |        0.0% |
| `/en/settings` | 123.5 KB |          0.0% |        0.0% |
| `/en/team`     | 122.2 KB |          0.0% |        0.0% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 124.2 KB |          0.0% |        0.0% |
| `/fr/about`    | 122.5 KB |          0.0% |        0.0% |
| `/fr/blog`     | 122.3 KB |          0.0% |        0.0% |
| `/fr/careers`  | 122.7 KB |          0.0% |        0.0% |
| `/fr/contact`  | 121.9 KB |          0.0% |        0.0% |
| `/fr/faq`      | 122.4 KB |          0.0% |        0.0% |
| `/fr/pricing`  | 122.1 KB |          0.0% |        0.0% |
| `/fr/products` | 122.0 KB |          0.0% |        0.0% |
| `/fr/settings` | 123.5 KB |          0.0% |        0.0% |
| `/fr/team`     | 122.2 KB |          0.0% |        0.0% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/tanstack-static-lingo.dev-app)

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale reactivity</summary>

| Locale |  E2E avg | E2E min |  E2E max | Profiler avg |
| :----: | -------: | ------: | -------: | -----------: |
|  `en`  | 109.6 ms | 69.2 ms | 157.2 ms |       6.5 ms |
|  `fr`  |   5.8 ms |  2.6 ms |  14.9 ms |       3.2 ms |

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   17.0 ms |   23.6 ms |      6.4 ms |
|  `fr`  |   15.8 ms |   21.5 ms |      3.8 ms |

</details>

---

## lingui

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 5.3.0   |       10.0 KB |        32.4 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        |     🔶     |         119.5 KB |          9.3% |                      0.0% |       84.3 KB |        49.4 ms |         5.2 ms |   18.9 ms |   24.7 ms |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 120.1 KB |          0.0% |        0.0% |
| `/en/about`    | 119.0 KB |          0.0% |        0.0% |
| `/en/blog`     | 119.0 KB |          0.0% |        0.0% |
| `/en/careers`  | 119.8 KB |          0.0% |        0.0% |
| `/en/contact`  | 119.0 KB |          0.0% |        0.0% |
| `/en/faq`      | 119.7 KB |          0.0% |        0.0% |
| `/en/pricing`  | 119.3 KB |          0.0% |        0.0% |
| `/en/products` | 119.2 KB |          0.0% |        0.0% |
| `/en/settings` | 120.7 KB |          0.0% |        0.0% |
| `/en/team`     | 119.4 KB |          0.0% |        0.0% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 120.1 KB |          0.0% |        0.0% |
| `/fr/about`    | 119.0 KB |          0.0% |        0.0% |
| `/fr/blog`     | 119.0 KB |          0.0% |        0.0% |
| `/fr/careers`  | 119.8 KB |         37.5% |        0.0% |
| `/fr/contact`  | 119.0 KB |          0.0% |        0.0% |
| `/fr/faq`      | 119.7 KB |         45.5% |        0.0% |
| `/fr/pricing`  | 119.3 KB |          7.1% |        0.0% |
| `/fr/products` | 119.2 KB |         20.0% |        0.0% |
| `/fr/settings` | 120.7 KB |         33.3% |        0.0% |
| `/fr/team`     | 119.4 KB |         41.7% |        0.0% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/tanstack-dynamic-lingui-app)

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min |  E2E max | Profiler avg |
| :----: | ------: | ------: | -------: | -----------: |
|  `en`  | 31.8 ms | 20.1 ms |  46.3 ms |       4.8 ms |
|  `fr`  | 67.0 ms | 23.5 ms | 129.4 ms |       5.5 ms |

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   18.8 ms |   25.0 ms |      5.0 ms |
|  `fr`  |   19.0 ms |   24.4 ms |      4.9 ms |

</details>

---

## paraglide

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 2.15.1  |        1.4 KB |         3.2 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        |     ✅     |         192.2 KB |         50.0% |                     89.8% |        5.1 KB |         9.3 ms |         4.4 ms |   15.7 ms |   24.0 ms |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 192.9 KB |         54.1% |       81.6% |
| `/en/about`    | 191.9 KB |         54.1% |       88.5% |
| `/en/blog`     | 191.9 KB |         54.1% |       85.1% |
| `/en/careers`  | 192.4 KB |         54.1% |       87.5% |
| `/en/contact`  | 192.1 KB |         54.1% |       98.9% |
| `/en/faq`      | 191.8 KB |         54.1% |       88.5% |
| `/en/pricing`  | 192.1 KB |         53.8% |       95.5% |
| `/en/products` | 191.9 KB |         54.1% |       90.8% |
| `/en/settings` | 193.4 KB |         54.1% |       93.1% |
| `/en/team`     | 191.9 KB |         54.1% |       88.5% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 192.9 KB |         45.9% |       84.5% |
| `/fr/about`    | 191.9 KB |         45.9% |       86.4% |
| `/fr/blog`     | 191.9 KB |         45.9% |       87.4% |
| `/fr/careers`  | 192.4 KB |         45.9% |       87.5% |
| `/fr/contact`  | 192.1 KB |         45.9% |       98.1% |
| `/fr/faq`      | 191.8 KB |         45.9% |       91.3% |
| `/fr/pricing`  | 192.1 KB |         45.6% |       90.4% |
| `/fr/products` | 191.9 KB |         45.9% |       90.3% |
| `/fr/settings` | 193.4 KB |         45.9% |       93.2% |
| `/fr/team`     | 191.9 KB |         45.9% |       89.3% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/tanstack-static-paraglide-app)

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 10.9 ms |  3.5 ms | 39.2 ms |       4.7 ms |
|  `fr`  |  7.8 ms |  3.8 ms | 22.9 ms |       4.1 ms |

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   16.2 ms |   26.4 ms |      7.8 ms |
|  `fr`  |   15.1 ms |   21.7 ms |      5.2 ms |

</details>

---

## react-i18next

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 17.0.2  |       17.3 KB |        59.8 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        |     🔶     |         136.4 KB |         23.1% |                     89.8% |       24.8 KB |       123.1 ms |         4.0 ms |   33.7 ms |   54.8 ms |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 133.3 KB |          0.0% |       81.6% |
| `/en/about`    | 132.3 KB |          0.0% |       86.2% |
| `/en/blog`     | 132.3 KB |          0.0% |       85.1% |
| `/en/careers`  | 132.7 KB |          0.0% |       89.7% |
| `/en/contact`  | 132.3 KB |          0.0% |       97.7% |
| `/en/faq`      | 132.1 KB |          0.0% |       92.0% |
| `/en/pricing`  | 132.4 KB |          0.0% |       88.5% |
| `/en/products` | 132.2 KB |          0.0% |       94.3% |
| `/en/settings` | 133.7 KB |          0.0% |       94.3% |
| `/en/team`     | 132.2 KB |          0.0% |       88.5% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 141.0 KB |         46.2% |       84.3% |
| `/fr/about`    | 140.0 KB |         46.2% |       82.4% |
| `/fr/blog`     | 139.9 KB |         46.2% |       87.3% |
| `/fr/careers`  | 140.3 KB |         46.2% |       90.2% |
| `/fr/contact`  | 139.9 KB |         46.2% |       98.1% |
| `/fr/faq`      | 139.7 KB |         46.2% |       94.1% |
| `/fr/pricing`  | 140.0 KB |         46.2% |       87.3% |
| `/fr/products` | 139.8 KB |         46.2% |       92.2% |
| `/fr/settings` | 141.4 KB |         46.2% |       93.2% |
| `/fr/team`     | 139.9 KB |         46.2% |       89.2% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/tanstack-dynamic-react-i18next-app)

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale reactivity</summary>

| Locale |  E2E avg |  E2E min |  E2E max | Profiler avg |
| :----: | -------: | -------: | -------: | -----------: |
|  `en`  | 220.3 ms | 201.2 ms | 248.0 ms |       3.8 ms |
|  `fr`  |  25.9 ms |  10.1 ms |  84.5 ms |       4.2 ms |

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   40.7 ms |   62.4 ms |      5.6 ms |
|  `fr`  |   26.7 ms |   47.2 ms |      5.8 ms |

</details>

---

## react-intl

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 10.1.1  |       14.4 KB |        59.0 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        |     🔶     |         124.5 KB |          0.0% |                     89.7% |       22.8 KB |        11.6 ms |         1.5 ms |   18.9 ms |   24.9 ms |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 125.1 KB |          0.0% |       81.4% |
| `/en/about`    | 124.2 KB |          0.0% |       88.4% |
| `/en/blog`     | 124.2 KB |          0.0% |       84.9% |
| `/en/careers`  | 124.7 KB |          0.0% |       86.4% |
| `/en/contact`  | 124.2 KB |          0.0% |       98.8% |
| `/en/faq`      | 124.1 KB |          0.0% |       88.4% |
| `/en/pricing`  | 124.3 KB |          0.0% |       95.4% |
| `/en/products` | 124.2 KB |          0.0% |       90.7% |
| `/en/settings` | 125.7 KB |          0.0% |       94.2% |
| `/en/team`     | 124.2 KB |          0.0% |       88.4% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 125.1 KB |          0.0% |       84.3% |
| `/fr/about`    | 124.2 KB |          0.0% |       86.3% |
| `/fr/blog`     | 124.2 KB |          0.0% |       87.3% |
| `/fr/careers`  | 124.7 KB |          0.0% |       86.5% |
| `/fr/contact`  | 124.2 KB |          0.0% |       98.0% |
| `/fr/faq`      | 124.1 KB |          0.0% |       91.2% |
| `/fr/pricing`  | 124.3 KB |          0.0% |       91.3% |
| `/fr/products` | 124.2 KB |          0.0% |       90.2% |
| `/fr/settings` | 125.7 KB |          0.0% |       93.1% |
| `/fr/team`     | 124.2 KB |          0.0% |       89.2% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/tanstack-dynamic-react-intl-app)

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 13.3 ms |  5.5 ms | 39.7 ms |       1.5 ms |
|  `fr`  |  9.8 ms |  5.4 ms | 23.3 ms |       1.4 ms |

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   19.9 ms |   28.2 ms |      9.1 ms |
|  `fr`  |   17.9 ms |   21.5 ms |      5.4 ms |

</details>

---

## tolgee

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 7.0.0   |       11.1 KB |        35.9 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        |     🔶     |         121.9 KB |          4.9% |                     90.0% |       21.1 KB |        27.9 ms |         4.6 ms |   17.5 ms |   20.8 ms |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 123.4 KB |          0.0% |       82.6% |
| `/en/about`    | 122.1 KB |          0.0% |       89.1% |
| `/en/blog`     | 121.7 KB |          0.0% |       85.9% |
| `/en/careers`  | 122.1 KB |          0.0% |       88.0% |
| `/en/contact`  | 121.3 KB |          0.0% |       97.8% |
| `/en/faq`      | 121.9 KB |          0.0% |       89.1% |
| `/en/pricing`  | 121.4 KB |          0.0% |       89.1% |
| `/en/products` | 121.3 KB |          0.0% |       94.6% |
| `/en/settings` | 122.8 KB |          0.0% |       94.6% |
| `/en/team`     | 121.5 KB |          0.0% |       89.1% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 123.4 KB |         14.3% |       84.8% |
| `/fr/about`    | 122.1 KB |         10.0% |       86.7% |
| `/fr/blog`     | 121.7 KB |         12.2% |       87.7% |
| `/fr/careers`  | 122.1 KB |         11.5% |       88.6% |
| `/fr/contact`  | 121.3 KB |          3.6% |       97.1% |
| `/fr/faq`      | 121.9 KB |         10.7% |       91.4% |
| `/fr/pricing`  | 121.4 KB |         10.7% |       87.6% |
| `/fr/products` | 121.3 KB |          6.9% |       92.4% |
| `/fr/settings` | 122.8 KB |          6.9% |       93.3% |
| `/fr/team`     | 121.5 KB |         10.7% |       89.5% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/tanstack-dynamic-tolgee-app)

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 40.4 ms | 19.9 ms | 60.4 ms |       4.9 ms |
|  `fr`  | 15.4 ms | 11.9 ms | 18.8 ms |       4.2 ms |

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   18.4 ms |   21.5 ms |      5.4 ms |
|  `fr`  |   16.6 ms |   20.2 ms |      5.9 ms |

</details>

---

## use-intl

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 4.9.1   |       12.8 KB |        50.8 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        |     🔶     |         122.1 KB |          0.0% |                     89.8% |       75.8 KB |        12.3 ms |         1.8 ms |   18.1 ms |   22.6 ms |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 122.9 KB |          0.0% |       81.4% |
| `/en/about`    | 121.8 KB |          0.0% |       88.4% |
| `/en/blog`     | 121.8 KB |          0.0% |       84.9% |
| `/en/careers`  | 122.3 KB |          0.0% |       87.4% |
| `/en/contact`  | 121.8 KB |          0.0% |       98.8% |
| `/en/faq`      | 121.7 KB |          0.0% |       88.4% |
| `/en/pricing`  | 121.9 KB |          0.0% |       95.4% |
| `/en/products` | 121.8 KB |          0.0% |       90.7% |
| `/en/settings` | 123.2 KB |          0.0% |       94.2% |
| `/en/team`     | 121.8 KB |          0.0% |       88.4% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 122.9 KB |          0.0% |       84.5% |
| `/fr/about`    | 121.8 KB |          0.0% |       86.4% |
| `/fr/blog`     | 121.8 KB |          0.0% |       87.4% |
| `/fr/careers`  | 122.3 KB |          0.0% |       87.5% |
| `/fr/contact`  | 121.8 KB |          0.0% |       98.1% |
| `/fr/faq`      | 121.7 KB |          0.0% |       91.3% |
| `/fr/pricing`  | 121.9 KB |          0.0% |       90.4% |
| `/fr/products` | 121.8 KB |          0.0% |       90.3% |
| `/fr/settings` | 123.2 KB |          0.0% |       93.2% |
| `/fr/team`     | 121.8 KB |          0.0% |       89.3% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/tanstack-dynamic-use-intl-app)

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 15.7 ms |  5.4 ms | 50.3 ms |       2.6 ms |
|  `fr`  |  8.8 ms |  4.0 ms | 20.1 ms |       0.9 ms |

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   18.6 ms |   25.3 ms |      7.7 ms |
|  `fr`  |   17.5 ms |   20.0 ms |      4.3 ms |

</details>

---

## wuchale

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 0.22.9  |        0.2 KB |         0.2 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        |     🔶     |         114.7 KB |          0.0% |                     89.6% |       26.1 KB |        13.1 ms |              — |   15.2 ms |   24.1 ms |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 114.9 KB |          0.0% |       61.9% |
| `/en/about`    | 114.1 KB |          0.0% |       76.2% |
| `/en/blog`     | 114.1 KB |          0.0% |       97.6% |
| `/en/careers`  | 114.6 KB |          0.0% |       90.7% |
| `/en/contact`  | 114.3 KB |          0.0% |       97.6% |
| `/en/faq`      | 114.1 KB |          0.0% |       95.2% |
| `/en/pricing`  | 114.3 KB |          0.0% |       93.0% |
| `/en/products` | 114.1 KB |          0.0% |       97.6% |
| `/en/settings` | 115.6 KB |          0.0% |       88.1% |
| `/en/team`     | 114.0 KB |          0.0% |       97.6% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 115.4 KB |          0.0% |       66.0% |
| `/fr/about`    | 114.6 KB |          0.0% |       72.3% |
| `/fr/blog`     | 114.6 KB |          0.0% |       97.9% |
| `/fr/careers`  | 115.1 KB |          0.0% |       91.7% |
| `/fr/contact`  | 114.8 KB |          0.0% |       97.9% |
| `/fr/faq`      | 114.6 KB |          0.0% |       97.9% |
| `/fr/pricing`  | 114.8 KB |          0.0% |       91.7% |
| `/fr/products` | 114.6 KB |          0.0% |       97.9% |
| `/fr/settings` | 116.1 KB |          0.0% |       85.1% |
| `/fr/team`     | 114.6 KB |          0.0% |       97.9% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/tanstack-dynamic-wuchale-app)

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  |  8.7 ms |  5.0 ms | 16.8 ms |       0.0 ms |
|  `fr`  | 17.4 ms |  7.1 ms | 53.7 ms |       0.0 ms |

</details>

<details>
<summary><strong>Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   15.1 ms |   23.9 ms |           — |
|  `fr`  |   15.2 ms |   24.3 ms |           — |

</details>

---

## Coverage

| Metric                | Count |
| :-------------------- | :---- |
| Total libraries       | 11    |
| Total app entries     | 33    |
| With lib size data    | 11    |
| With page bundle data | 11    |
| With component data   | 11    |
| With reactivity data  | 10    |
| With rendering data   | 11    |
