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
| Static         |     ✅     |         111.0 KB |          0.0% |                      0.0% |        0.7 KB |         8.9 ms |         1.2 ms |   25.9 ms |   26.6 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

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
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  |  8.4 ms |  4.7 ms | 20.0 ms |       1.0 ms |
|  `fr`  |  9.4 ms |  4.3 ms | 23.4 ms |       1.4 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

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
| Static         |     ✅     |         596.8 KB |          0.0% |                     82.2% |      683.3 KB |        60.3 ms |         5.0 ms |   18.1 ms |   36.1 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 596.8 KB |          0.0% |       64.4% |
| `/en/about`    | 596.8 KB |          0.0% |       77.8% |
| `/en/blog`     | 596.7 KB |          0.0% |       77.6% |
| `/en/careers`  | 596.8 KB |          0.0% |       75.6% |
| `/en/contact`  | 596.8 KB |          0.0% |       97.8% |
| `/en/faq`      | 596.7 KB |          0.0% |       81.8% |
| `/en/pricing`  | 596.7 KB |          0.0% |       91.8% |
| `/en/products` | 596.7 KB |          0.0% |       82.2% |
| `/en/settings` | 596.9 KB |          0.0% |       90.0% |
| `/en/team`     | 596.7 KB |          0.0% |       83.3% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 596.8 KB |          0.0% |       64.4% |
| `/fr/about`    | 596.8 KB |          0.0% |       77.8% |
| `/fr/blog`     | 596.7 KB |          0.0% |       77.6% |
| `/fr/careers`  | 596.8 KB |          0.0% |       75.6% |
| `/fr/contact`  | 596.8 KB |          0.0% |       97.8% |
| `/fr/faq`      | 596.7 KB |          0.0% |       81.8% |
| `/fr/pricing`  | 596.7 KB |          0.0% |       91.8% |
| `/fr/products` | 596.7 KB |          0.0% |       82.2% |
| `/fr/settings` | 596.9 KB |          0.0% |       90.0% |
| `/fr/team`     | 596.7 KB |          0.0% |       83.3% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/tanstack-static-gt-react-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min |  E2E max | Profiler avg |
| :----: | ------: | ------: | -------: | -----------: |
|  `en`  | 83.7 ms | 62.0 ms | 123.7 ms |       5.2 ms |
|  `fr`  | 37.0 ms | 20.0 ms |  51.3 ms |       4.8 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   19.1 ms |   30.9 ms |      3.3 ms |
|  `fr`  |   17.1 ms |   41.3 ms |      3.3 ms |

</details>

---

## intlayer

| Version        | Lib size (gz) | Lib size (min) |
| :------------- | ------------: | -------------: |
| 8.7.5-canary.0 |        4.7 KB |        12.8 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         127.9 KB |         50.0% |                      0.8% |        7.1 KB |         6.8 ms |         2.0 ms |   26.1 ms |   28.1 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 140.1 KB |         51.4% |        5.9% |
| `/en/about`    | 132.2 KB |         58.3% |        0.0% |
| `/en/blog`     | 126.5 KB |         50.0% |        0.0% |
| `/en/careers`  | 127.5 KB |         53.8% |        0.0% |
| `/en/contact`  | 122.3 KB |         60.0% |        0.0% |
| `/en/faq`      | 130.3 KB |         47.6% |        0.0% |
| `/en/pricing`  | 123.7 KB |         68.8% |        0.0% |
| `/en/products` | 125.4 KB |         55.0% |        0.0% |
| `/en/settings` | 125.3 KB |         57.1% |        0.0% |
| `/en/team`     | 125.8 KB |         52.2% |        0.0% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 140.1 KB |         48.6% |       11.1% |
| `/fr/about`    | 132.2 KB |         41.7% |        0.0% |
| `/fr/blog`     | 126.5 KB |         50.0% |        0.0% |
| `/fr/careers`  | 127.5 KB |         46.2% |        0.0% |
| `/fr/contact`  | 122.3 KB |         40.0% |        0.0% |
| `/fr/faq`      | 130.3 KB |         52.4% |        0.0% |
| `/fr/pricing`  | 123.7 KB |         31.3% |        0.0% |
| `/fr/products` | 125.4 KB |         45.0% |        0.0% |
| `/fr/settings` | 125.3 KB |         42.9% |        0.0% |
| `/fr/team`     | 125.8 KB |         47.8% |        0.0% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/tanstack-static-intlayer-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  |  7.2 ms |  2.8 ms | 23.9 ms |       2.2 ms |
|  `fr`  |  6.5 ms |  2.8 ms | 18.6 ms |       1.8 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   26.8 ms |   30.5 ms |      7.7 ms |
|  `fr`  |   25.5 ms |   25.7 ms |      6.3 ms |

</details>

---

## lingo.dev

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 0.133.9 |        7.6 KB |        19.8 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         122.6 KB |          0.0% |                      0.0% |       18.9 KB |        57.7 ms |         4.8 ms |   16.4 ms |   22.5 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

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
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale |  E2E avg | E2E min |  E2E max | Profiler avg |
| :----: | -------: | ------: | -------: | -----------: |
|  `en`  | 109.6 ms | 69.2 ms | 157.2 ms |       6.5 ms |
|  `fr`  |   5.8 ms |  2.6 ms |  14.9 ms |       3.2 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

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
| Static         |     ✅     |         154.6 KB |         50.0% |                     90.0% |       51.7 KB |         7.5 ms |         0.5 ms |   23.9 ms |   43.2 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 156.5 KB |         52.6% |       80.0% |
| `/en/about`    | 154.7 KB |         52.6% |       87.5% |
| `/en/blog`     | 154.2 KB |         52.6% |       83.8% |
| `/en/careers`  | 154.6 KB |         52.6% |       95.0% |
| `/en/contact`  | 154.1 KB |         52.6% |       96.3% |
| `/en/faq`      | 154.8 KB |         52.6% |       87.5% |
| `/en/pricing`  | 154.5 KB |         52.6% |       95.0% |
| `/en/products` | 154.4 KB |         52.6% |       90.0% |
| `/en/settings` | 153.7 KB |         52.6% |       97.5% |
| `/en/team`     | 154.4 KB |         52.6% |       87.5% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 156.5 KB |         47.4% |       81.2% |
| `/fr/about`    | 154.7 KB |         47.4% |       83.5% |
| `/fr/blog`     | 154.2 KB |         47.4% |       84.7% |
| `/fr/careers`  | 154.6 KB |         47.4% |       95.3% |
| `/fr/contact`  | 154.1 KB |         47.4% |       95.3% |
| `/fr/faq`      | 154.8 KB |         47.4% |       88.2% |
| `/fr/pricing`  | 154.5 KB |         47.4% |       95.3% |
| `/fr/products` | 154.4 KB |         47.4% |       90.6% |
| `/fr/settings` | 153.7 KB |         47.4% |       97.6% |
| `/fr/team`     | 154.4 KB |         47.4% |       88.2% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/tanstack-static-lingui-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  |  8.2 ms |  2.6 ms | 24.5 ms |       0.7 ms |
|  `fr`  |  6.9 ms |  4.6 ms | 10.3 ms |       0.3 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   24.9 ms |   61.3 ms |      6.4 ms |
|  `fr`  |   22.8 ms |   25.2 ms |      5.4 ms |

</details>

---

## paraglide

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 2.15.1  |        1.4 KB |         3.2 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         192.2 KB |         50.0% |                     89.8% |        5.1 KB |         9.3 ms |         4.4 ms |   15.7 ms |   24.0 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

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
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 10.9 ms |  3.5 ms | 39.2 ms |       4.7 ms |
|  `fr`  |  7.8 ms |  3.8 ms | 22.9 ms |       4.1 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

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
| Static         |     ✅     |         180.3 KB |         50.0% |                     89.8% |       24.3 KB |        21.1 ms |         6.4 ms |   26.2 ms |   85.1 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 181.1 KB |         53.8% |       81.6% |
| `/en/about`    | 180.1 KB |         53.8% |       86.2% |
| `/en/blog`     | 180.1 KB |         53.8% |       85.1% |
| `/en/careers`  | 180.5 KB |         53.8% |       89.7% |
| `/en/contact`  | 180.1 KB |         53.8% |       97.7% |
| `/en/faq`      | 179.9 KB |         53.8% |       92.0% |
| `/en/pricing`  | 180.2 KB |         53.8% |       88.5% |
| `/en/products` | 180.0 KB |         53.8% |       94.3% |
| `/en/settings` | 181.5 KB |         53.8% |       94.3% |
| `/en/team`     | 180.0 KB |         53.8% |       88.5% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 181.1 KB |         46.2% |       84.3% |
| `/fr/about`    | 180.1 KB |         46.2% |       82.4% |
| `/fr/blog`     | 180.1 KB |         46.2% |       87.3% |
| `/fr/careers`  | 180.5 KB |         46.2% |       90.2% |
| `/fr/contact`  | 180.1 KB |         46.2% |       98.1% |
| `/fr/faq`      | 179.9 KB |         46.2% |       94.1% |
| `/fr/pricing`  | 180.2 KB |         46.2% |       87.3% |
| `/fr/products` | 180.0 KB |         46.2% |       92.2% |
| `/fr/settings` | 181.5 KB |         46.2% |       93.2% |
| `/fr/team`     | 180.0 KB |         46.2% |       89.2% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/tanstack-static-react-i18next-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `fr`  | 21.1 ms | 10.6 ms | 53.7 ms |       6.4 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   21.3 ms |  125.1 ms |      7.8 ms |
|  `fr`  |   31.2 ms |   45.0 ms |      5.6 ms |

</details>

---

## react-intl

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 10.1.1  |       14.4 KB |        59.0 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         189.7 KB |         50.0% |                     89.7% |       22.6 KB |         6.9 ms |         2.0 ms |   18.7 ms |   24.9 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 190.3 KB |         54.1% |       81.4% |
| `/en/about`    | 189.4 KB |         54.1% |       88.4% |
| `/en/blog`     | 189.4 KB |         54.1% |       84.9% |
| `/en/careers`  | 189.9 KB |         54.1% |       86.4% |
| `/en/contact`  | 189.4 KB |         54.1% |       98.8% |
| `/en/faq`      | 189.3 KB |         54.1% |       88.4% |
| `/en/pricing`  | 189.5 KB |         53.8% |       95.4% |
| `/en/products` | 189.3 KB |         54.1% |       90.7% |
| `/en/settings` | 190.8 KB |         54.1% |       94.2% |
| `/en/team`     | 189.3 KB |         54.1% |       88.4% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 190.3 KB |         45.9% |       84.3% |
| `/fr/about`    | 189.4 KB |         45.9% |       86.3% |
| `/fr/blog`     | 189.4 KB |         45.9% |       87.3% |
| `/fr/careers`  | 189.9 KB |         45.9% |       86.5% |
| `/fr/contact`  | 189.4 KB |         45.9% |       98.0% |
| `/fr/faq`      | 189.3 KB |         45.9% |       91.2% |
| `/fr/pricing`  | 189.5 KB |         45.6% |       91.3% |
| `/fr/products` | 189.3 KB |         45.9% |       90.2% |
| `/fr/settings` | 190.8 KB |         45.9% |       93.1% |
| `/fr/team`     | 189.3 KB |         45.9% |       89.2% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/tanstack-static-react-intl-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  |  6.7 ms |  3.4 ms | 15.9 ms |       1.8 ms |
|  `fr`  |  7.1 ms |  3.4 ms | 18.5 ms |       2.2 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   20.1 ms |   28.9 ms |      8.9 ms |
|  `fr`  |   17.2 ms |   20.9 ms |      4.9 ms |

</details>

---

## tolgee

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 7.0.0   |       11.1 KB |        35.9 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     🔶     |         201.7 KB |         50.0% |                     90.0% |       20.7 KB |              — |              — |   19.8 ms |   27.3 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 203.2 KB |         53.5% |       82.6% |
| `/en/about`    | 201.8 KB |         53.5% |       89.1% |
| `/en/blog`     | 201.4 KB |         53.5% |       85.9% |
| `/en/careers`  | 201.8 KB |         53.5% |       88.0% |
| `/en/contact`  | 201.0 KB |         53.5% |       97.8% |
| `/en/faq`      | 201.6 KB |         53.5% |       89.1% |
| `/en/pricing`  | 201.2 KB |         53.5% |       89.1% |
| `/en/products` | 201.1 KB |         53.5% |       94.6% |
| `/en/settings` | 202.5 KB |         53.5% |       94.6% |
| `/en/team`     | 201.2 KB |         53.5% |       89.1% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 203.2 KB |         46.5% |       84.9% |
| `/fr/about`    | 201.8 KB |         46.5% |       86.8% |
| `/fr/blog`     | 201.4 KB |         46.5% |       87.7% |
| `/fr/careers`  | 201.8 KB |         46.5% |       88.7% |
| `/fr/contact`  | 201.0 KB |         46.5% |       97.2% |
| `/fr/faq`      | 201.6 KB |         46.5% |       91.5% |
| `/fr/pricing`  | 201.2 KB |         46.5% |       87.7% |
| `/fr/products` | 201.1 KB |         46.5% |       92.5% |
| `/fr/settings` | 202.5 KB |         46.5% |       93.4% |
| `/fr/team`     | 201.2 KB |         46.5% |       89.6% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/tanstack-static-tolgee-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   21.1 ms |   28.1 ms |      6.2 ms |
|  `fr`  |   18.5 ms |   26.5 ms |      6.2 ms |

</details>

---

## use-intl

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 4.9.1   |       12.8 KB |        50.8 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         183.2 KB |         50.0% |                     89.8% |       75.7 KB |         9.8 ms |         2.4 ms |   19.9 ms |   24.7 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 184.0 KB |         54.4% |       81.4% |
| `/en/about`    | 182.9 KB |         54.4% |       88.4% |
| `/en/blog`     | 183.0 KB |         54.4% |       84.9% |
| `/en/careers`  | 183.4 KB |         54.4% |       87.4% |
| `/en/contact`  | 183.0 KB |         54.4% |       98.8% |
| `/en/faq`      | 182.9 KB |         54.4% |       88.4% |
| `/en/pricing`  | 183.1 KB |         54.1% |       95.4% |
| `/en/products` | 182.9 KB |         54.4% |       90.7% |
| `/en/settings` | 184.4 KB |         54.4% |       94.2% |
| `/en/team`     | 182.9 KB |         54.4% |       88.4% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 184.0 KB |         45.6% |       84.5% |
| `/fr/about`    | 182.9 KB |         45.6% |       86.4% |
| `/fr/blog`     | 183.0 KB |         45.6% |       87.4% |
| `/fr/careers`  | 183.4 KB |         45.6% |       87.5% |
| `/fr/contact`  | 183.0 KB |         45.6% |       98.1% |
| `/fr/faq`      | 182.9 KB |         45.6% |       91.3% |
| `/fr/pricing`  | 183.1 KB |         45.4% |       90.4% |
| `/fr/products` | 182.9 KB |         45.6% |       90.3% |
| `/fr/settings` | 184.4 KB |         45.6% |       93.2% |
| `/fr/team`     | 182.9 KB |         45.6% |       89.3% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/tanstack-static-use-intl-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 12.2 ms |  4.1 ms | 39.2 ms |       4.3 ms |
|  `fr`  |  7.4 ms |  4.3 ms | 17.9 ms |       0.6 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   21.0 ms |   28.2 ms |      7.2 ms |
|  `fr`  |   18.8 ms |   21.1 ms |      5.5 ms |

</details>

---

## wuchale

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 0.22.9  |        0.2 KB |         0.2 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         114.7 KB |         10.9% |                     89.5% |       26.1 KB |         7.6 ms |              — |   17.9 ms |   28.0 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 114.9 KB |         21.9% |       50.0% |
| `/en/about`    | 114.1 KB |         21.9% |      100.0% |
| `/en/blog`     | 114.1 KB |         21.9% |       96.9% |
| `/en/careers`  | 114.6 KB |         21.9% |       87.9% |
| `/en/contact`  | 114.3 KB |         21.9% |       96.9% |
| `/en/faq`      | 114.1 KB |         21.9% |       93.8% |
| `/en/pricing`  | 114.3 KB |         21.9% |       90.9% |
| `/en/products` | 114.1 KB |         21.9% |       96.9% |
| `/en/settings` | 115.6 KB |         21.9% |       84.4% |
| `/en/team`     | 114.0 KB |         21.9% |       96.9% |

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

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/tanstack-static-wuchale-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  |  7.2 ms |  4.4 ms | 14.3 ms |       0.0 ms |
|  `fr`  |  8.0 ms |  5.1 ms | 13.5 ms |       0.0 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   18.5 ms |   28.0 ms |           — |
|  `fr`  |   17.2 ms |   27.9 ms |           — |

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
