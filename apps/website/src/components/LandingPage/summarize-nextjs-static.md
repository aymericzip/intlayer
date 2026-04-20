# Next.js — i18n Benchmark Results

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
- [gt-next](#gt-next)
- [lingo.dev](#lingo-dev)
- [lingui](#lingui)
- [next-i18next](#next-i18next)
- [next-international](#next-international)
- [next-intl](#next-intl)
- [next-intlayer](#next-intlayer)
- [next-translate](#next-translate)
- [paraglide-next](#paraglide-next)
- [tolgee](#tolgee)

## base

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| —       |        0.0 KB |         0.0 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         151.8 KB |          0.0% |                     14.1% |        0.7 KB |        14.0 ms |         3.6 ms |   14.7 ms |    9.3 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 151.0 KB |          0.0% |        0.0% |
| `/en/about`    | 152.1 KB |          0.0% |        9.1% |
| `/en/blog`     | 151.8 KB |          0.0% |        7.1% |
| `/en/careers`  | 151.8 KB |          0.0% |        8.3% |
| `/en/contact`  | 152.3 KB |          0.0% |       50.0% |
| `/en/faq`      | 151.8 KB |          0.0% |        9.1% |
| `/en/pricing`  | 151.8 KB |          0.0% |       20.0% |
| `/en/products` | 151.8 KB |          0.0% |       11.1% |
| `/en/settings` | 151.8 KB |          0.0% |       16.7% |
| `/en/team`     | 151.8 KB |          0.0% |       10.0% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 151.0 KB |          0.0% |        0.0% |
| `/fr/about`    | 152.1 KB |          0.0% |        9.1% |
| `/fr/blog`     | 151.8 KB |          0.0% |        7.1% |
| `/fr/careers`  | 151.8 KB |          0.0% |        8.3% |
| `/fr/contact`  | 152.3 KB |          0.0% |       50.0% |
| `/fr/faq`      | 151.8 KB |          0.0% |        9.1% |
| `/fr/pricing`  | 151.8 KB |          0.0% |       20.0% |
| `/fr/products` | 151.8 KB |          0.0% |       11.1% |
| `/fr/settings` | 151.8 KB |          0.0% |       16.7% |
| `/fr/team`     | 151.8 KB |          0.0% |       10.0% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/nextjs-base-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 15.3 ms |  8.9 ms | 25.4 ms |       3.9 ms |
|  `fr`  | 12.8 ms |  9.8 ms | 18.3 ms |       3.3 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   15.5 ms |    9.5 ms |      4.2 ms |
|  `fr`  |   13.9 ms |    9.1 ms |      4.1 ms |

</details>

---

## gt-next

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 6.16.5  |      173.1 KB |       657.9 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         434.3 KB |          0.0% |                     45.0% |      174.1 KB |        26.8 ms |         5.8 ms |   31.8 ms |   17.9 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 434.6 KB |          0.0% |        0.0% |
| `/en/about`    | 434.5 KB |          0.0% |        0.0% |
| `/en/blog`     | 434.2 KB |          0.0% |        0.0% |
| `/en/careers`  | 434.2 KB |          0.0% |        0.0% |
| `/en/contact`  | 434.2 KB |          0.0% |        0.0% |
| `/en/faq`      | 434.2 KB |          0.0% |        0.0% |
| `/en/pricing`  | 434.2 KB |          0.0% |        0.0% |
| `/en/products` | 434.2 KB |          0.0% |        0.0% |
| `/en/settings` | 434.2 KB |          0.0% |        0.0% |
| `/en/team`     | 434.2 KB |          0.0% |        0.0% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 434.6 KB |          0.0% |       82.6% |
| `/fr/about`    | 434.5 KB |          0.0% |       88.4% |
| `/fr/blog`     | 434.2 KB |          0.0% |       84.9% |
| `/fr/careers`  | 434.2 KB |          0.0% |       87.2% |
| `/fr/contact`  | 434.2 KB |          0.0% |       98.8% |
| `/fr/faq`      | 434.2 KB |          0.0% |       88.4% |
| `/fr/pricing`  | 434.2 KB |          0.0% |       95.3% |
| `/fr/products` | 434.2 KB |          0.0% |       90.7% |
| `/fr/settings` | 434.2 KB |          0.0% |       94.2% |
| `/fr/team`     | 434.2 KB |          0.0% |       89.5% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/nextjs-static-gt-next-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 32.6 ms | 19.6 ms | 56.9 ms |       6.2 ms |
|  `fr`  | 20.9 ms | 18.7 ms | 24.1 ms |       5.5 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   40.7 ms |   17.9 ms |      3.1 ms |
|  `fr`  |   22.9 ms |   17.8 ms |      2.1 ms |

</details>

---

## lingo.dev

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| —       |        7.5 KB |        19.6 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         162.5 KB |         14.4% |                     64.9% |        7.8 KB |        22.6 ms |         5.1 ms |   30.4 ms |   14.1 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 162.9 KB |          0.0% |       78.3% |
| `/en/about`    | 162.7 KB |          0.0% |       86.7% |
| `/en/blog`     | 162.4 KB |          0.0% |       82.6% |
| `/en/careers`  | 162.4 KB |          0.0% |       86.1% |
| `/en/contact`  | 163.1 KB |          0.0% |       97.1% |
| `/en/faq`      | 162.4 KB |          0.0% |       88.4% |
| `/en/pricing`  | 162.4 KB |          0.0% |       97.1% |
| `/en/products` | 162.4 KB |          0.0% |       89.9% |
| `/en/settings` | 162.4 KB |          0.0% |       94.2% |
| `/en/team`     | 162.4 KB |          0.0% |       88.4% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 162.9 KB |         33.3% |       21.1% |
| `/fr/about`    | 162.7 KB |         40.0% |       23.1% |
| `/fr/blog`     | 162.4 KB |         25.0% |       27.8% |
| `/fr/careers`  | 162.4 KB |         22.2% |       31.3% |
| `/fr/contact`  | 163.1 KB |         33.3% |       60.0% |
| `/fr/faq`      | 162.4 KB |         25.0% |       38.5% |
| `/fr/pricing`  | 162.4 KB |         25.0% |       71.4% |
| `/fr/products` | 162.4 KB |         33.3% |       41.7% |
| `/fr/settings` | 162.4 KB |         25.0% |       55.6% |
| `/fr/team`     | 162.4 KB |         25.0% |       38.5% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/nextjs-static-lingo.dev-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 26.3 ms | 19.3 ms | 35.6 ms |       5.5 ms |
|  `fr`  | 19.0 ms | 16.9 ms | 21.5 ms |       4.7 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   29.2 ms |   16.6 ms |      7.0 ms |
|  `fr`  |   31.6 ms |   11.6 ms |      3.4 ms |

</details>

---

## lingui

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 5.3.0   |       10.0 KB |        32.4 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         217.0 KB |         50.0% |                     90.0% |       73.1 KB |        13.8 ms |         4.6 ms |   15.3 ms |   11.0 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 218.3 KB |         54.4% |       80.0% |
| `/en/about`    | 216.9 KB |         54.4% |       87.5% |
| `/en/blog`     | 216.6 KB |         54.4% |       83.8% |
| `/en/careers`  | 216.7 KB |         54.4% |       95.0% |
| `/en/contact`  | 216.5 KB |         54.4% |       98.8% |
| `/en/faq`      | 217.3 KB |         54.4% |       87.5% |
| `/en/pricing`  | 216.9 KB |         54.4% |       95.0% |
| `/en/products` | 216.8 KB |         54.4% |       90.0% |
| `/en/settings` | 216.9 KB |         54.4% |       95.0% |
| `/en/team`     | 216.8 KB |         54.4% |       87.5% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 218.3 KB |         45.6% |       83.3% |
| `/fr/about`    | 216.9 KB |         45.6% |       85.4% |
| `/fr/blog`     | 216.6 KB |         45.6% |       86.5% |
| `/fr/careers`  | 216.7 KB |         45.6% |       93.8% |
| `/fr/contact`  | 216.5 KB |         45.6% |       97.9% |
| `/fr/faq`      | 217.3 KB |         45.6% |       90.6% |
| `/fr/pricing`  | 216.9 KB |         45.6% |       90.6% |
| `/fr/products` | 216.8 KB |         45.6% |       89.6% |
| `/fr/settings` | 216.9 KB |         45.6% |       93.8% |
| `/fr/team`     | 216.8 KB |         45.6% |       88.5% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/nextjs-static-lingui-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 15.4 ms | 10.8 ms | 30.7 ms |       5.2 ms |
|  `fr`  | 12.3 ms | 10.2 ms | 16.5 ms |       4.1 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   15.5 ms |   10.8 ms |      4.4 ms |
|  `fr`  |   15.0 ms |   11.1 ms |      4.7 ms |

</details>

---

## next-i18next

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 16.0.5  |       17.8 KB |        61.2 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         227.5 KB |          0.0% |                     89.8% |       24.5 KB |        14.6 ms |         6.9 ms |   15.1 ms |   11.6 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 228.1 KB |          0.0% |       79.5% |
| `/en/about`    | 227.4 KB |          0.0% |       84.6% |
| `/en/blog`     | 227.5 KB |          0.0% |       83.3% |
| `/en/careers`  | 227.4 KB |          0.0% |       94.9% |
| `/en/contact`  | 227.4 KB |          0.0% |       97.5% |
| `/en/faq`      | 227.3 KB |          0.0% |       91.0% |
| `/en/pricing`  | 227.5 KB |          0.0% |       96.2% |
| `/en/products` | 227.3 KB |          0.0% |       89.7% |
| `/en/settings` | 227.8 KB |          0.0% |       93.7% |
| `/en/team`     | 227.4 KB |          0.0% |       87.2% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 228.1 KB |          0.0% |       79.5% |
| `/fr/about`    | 227.4 KB |          0.0% |       84.6% |
| `/fr/blog`     | 227.5 KB |          0.0% |       83.3% |
| `/fr/careers`  | 227.4 KB |          0.0% |       94.9% |
| `/fr/contact`  | 227.4 KB |          0.0% |       97.5% |
| `/fr/faq`      | 227.3 KB |          0.0% |       91.0% |
| `/fr/pricing`  | 227.5 KB |          0.0% |       96.2% |
| `/fr/products` | 227.3 KB |          0.0% |       89.7% |
| `/fr/settings` | 227.8 KB |          0.0% |       93.7% |
| `/fr/team`     | 227.4 KB |          0.0% |       87.2% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/nextjs-static-next-i18next-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 16.5 ms | 12.4 ms | 28.8 ms |       9.9 ms |
|  `fr`  | 12.7 ms | 10.8 ms | 17.7 ms |       3.9 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   15.7 ms |   11.7 ms |      4.8 ms |
|  `fr`  |   14.6 ms |   11.5 ms |      4.8 ms |

</details>

---

## next-international

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 1.3.1   |       11.1 KB |        34.9 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         248.9 KB |         50.0% |                     89.9% |       11.6 KB |        30.1 ms |        11.9 ms |   15.0 ms |    7.2 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 249.3 KB |         54.7% |       81.6% |
| `/en/about`    | 248.7 KB |         54.7% |       88.5% |
| `/en/blog`     | 248.8 KB |         54.7% |       85.1% |
| `/en/careers`  | 249.0 KB |         54.7% |       87.4% |
| `/en/contact`  | 248.8 KB |         54.7% |       98.9% |
| `/en/faq`      | 248.7 KB |         54.7% |       88.5% |
| `/en/pricing`  | 248.9 KB |         54.5% |       95.5% |
| `/en/products` | 248.7 KB |         54.7% |       90.8% |
| `/en/settings` | 249.1 KB |         54.7% |       94.3% |
| `/en/team`     | 248.8 KB |         54.7% |       88.5% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 249.3 KB |         45.3% |       84.8% |
| `/fr/about`    | 248.7 KB |         45.3% |       86.7% |
| `/fr/blog`     | 248.8 KB |         45.3% |       87.6% |
| `/fr/careers`  | 249.0 KB |         45.3% |       87.6% |
| `/fr/contact`  | 248.8 KB |         45.3% |       98.1% |
| `/fr/faq`      | 248.7 KB |         45.3% |       90.5% |
| `/fr/pricing`  | 248.9 KB |         45.0% |       90.6% |
| `/fr/products` | 248.7 KB |         45.3% |       90.5% |
| `/fr/settings` | 249.1 KB |         45.3% |       93.3% |
| `/fr/team`     | 248.8 KB |         45.3% |       89.5% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/nextjs-static-next-international-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 31.1 ms | 26.3 ms | 48.4 ms |      11.6 ms |
|  `fr`  | 29.0 ms | 22.1 ms | 40.9 ms |      12.1 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   15.5 ms |    7.2 ms |      0.6 ms |
|  `fr`  |   14.6 ms |    7.1 ms |      0.6 ms |

</details>

---

## next-intl

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 4.9.1   |       12.8 KB |        51.0 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         163.5 KB |          4.2% |                     89.8% |       20.5 KB |        15.0 ms |         4.3 ms |   16.2 ms |   10.1 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 164.0 KB |          0.0% |       82.1% |
| `/en/about`    | 163.3 KB |          0.0% |       88.1% |
| `/en/blog`     | 163.4 KB |          0.0% |       84.5% |
| `/en/careers`  | 163.6 KB |          0.0% |       87.1% |
| `/en/contact`  | 163.3 KB |          0.0% |       98.8% |
| `/en/faq`      | 163.3 KB |          0.0% |       88.1% |
| `/en/pricing`  | 163.5 KB |          0.0% |       95.3% |
| `/en/products` | 163.3 KB |          0.0% |       90.5% |
| `/en/settings` | 163.7 KB |          0.0% |       94.0% |
| `/en/team`     | 163.3 KB |          0.0% |       89.3% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 164.0 KB |          8.3% |       83.7% |
| `/fr/about`    | 163.3 KB |          8.3% |       89.8% |
| `/fr/blog`     | 163.4 KB |          8.3% |       86.7% |
| `/fr/careers`  | 163.6 KB |          8.3% |       86.9% |
| `/fr/contact`  | 163.3 KB |          8.3% |       99.0% |
| `/fr/faq`      | 163.3 KB |          8.3% |       89.8% |
| `/fr/pricing`  | 163.5 KB |          8.2% |       89.9% |
| `/fr/products` | 163.3 KB |          8.3% |       89.8% |
| `/fr/settings` | 163.7 KB |          8.3% |       92.9% |
| `/fr/team`     | 163.3 KB |          8.3% |       89.8% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/nextjs-static-next-intl-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 16.2 ms | 10.3 ms | 32.6 ms |       5.0 ms |
|  `fr`  | 13.7 ms | 11.2 ms | 17.1 ms |       3.6 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   16.3 ms |    9.5 ms |      3.5 ms |
|  `fr`  |   16.1 ms |   10.7 ms |      4.5 ms |

</details>

---

## next-intlayer

| Version        | Lib size (gz) | Lib size (min) |
| :------------- | ------------: | -------------: |
| 8.7.5-canary.0 |        4.9 KB |        14.0 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         152.0 KB |          0.0% |                      0.0% |        7.2 KB |        15.4 ms |         7.6 ms |   18.4 ms |   12.6 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 152.0 KB |          0.0% |        0.0% |
| `/en/about`    | 152.0 KB |          0.0% |        0.0% |
| `/en/blog`     | 152.0 KB |          0.0% |        0.0% |
| `/en/careers`  | 152.0 KB |          0.0% |        0.0% |
| `/en/contact`  | 152.0 KB |          0.0% |        0.0% |
| `/en/faq`      | 152.0 KB |          0.0% |        0.0% |
| `/en/pricing`  | 152.0 KB |          0.0% |        0.0% |
| `/en/products` | 152.0 KB |          0.0% |        0.0% |
| `/en/settings` | 152.0 KB |          0.0% |        0.0% |
| `/en/team`     | 152.0 KB |          0.0% |        0.0% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 152.0 KB |          0.0% |        0.0% |
| `/fr/about`    | 152.0 KB |          0.0% |        0.0% |
| `/fr/blog`     | 152.0 KB |          0.0% |        0.0% |
| `/fr/careers`  | 152.0 KB |          0.0% |        0.0% |
| `/fr/contact`  | 152.0 KB |          0.0% |        0.0% |
| `/fr/faq`      | 152.0 KB |          0.0% |        0.0% |
| `/fr/pricing`  | 152.0 KB |          0.0% |        0.0% |
| `/fr/products` | 152.0 KB |          0.0% |        0.0% |
| `/fr/settings` | 152.0 KB |          0.0% |        0.0% |
| `/fr/team`     | 152.0 KB |          0.0% |        0.0% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/nextjs-static-next-intlayer-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 17.5 ms | 11.4 ms | 34.1 ms |      10.3 ms |
|  `fr`  | 13.3 ms | 10.6 ms | 17.5 ms |       5.0 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   20.0 ms |   14.1 ms |      7.8 ms |
|  `fr`  |   16.9 ms |   11.1 ms |      5.0 ms |

</details>

---

## next-translate

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 3.1.2   |        2.4 KB |         6.8 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         153.0 KB |          0.0% |                     89.8% |       10.0 KB |        14.0 ms |         4.0 ms |   17.1 ms |   10.8 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 153.5 KB |          0.0% |       80.3% |
| `/en/about`    | 152.9 KB |          0.0% |       84.2% |
| `/en/blog`     | 152.9 KB |          0.0% |       82.9% |
| `/en/careers`  | 152.9 KB |          0.0% |       94.7% |
| `/en/contact`  | 152.9 KB |          0.0% |       97.4% |
| `/en/faq`      | 152.7 KB |          0.0% |       90.8% |
| `/en/pricing`  | 153.0 KB |          0.0% |       96.1% |
| `/en/products` | 152.8 KB |          0.0% |       89.5% |
| `/en/settings` | 153.2 KB |          0.0% |       93.5% |
| `/en/team`     | 152.9 KB |          0.0% |       88.2% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 153.5 KB |          0.0% |       82.8% |
| `/fr/about`    | 152.9 KB |          0.0% |       80.6% |
| `/fr/blog`     | 152.9 KB |          0.0% |       86.0% |
| `/fr/careers`  | 152.9 KB |          0.0% |       94.6% |
| `/fr/contact`  | 152.9 KB |          0.0% |       97.9% |
| `/fr/faq`      | 152.7 KB |          0.0% |       93.5% |
| `/fr/pricing`  | 153.0 KB |          0.0% |       91.4% |
| `/fr/products` | 152.8 KB |          0.0% |       89.2% |
| `/fr/settings` | 153.2 KB |          0.0% |       92.6% |
| `/fr/team`     | 152.9 KB |          0.0% |       89.2% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/nextjs-static-next-translate-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 14.8 ms | 11.6 ms | 21.9 ms |       4.4 ms |
|  `fr`  | 13.1 ms | 10.0 ms | 17.2 ms |       3.7 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   17.9 ms |   11.1 ms |      4.3 ms |
|  `fr`  |   16.2 ms |   10.5 ms |      1.8 ms |

</details>

---

## paraglide-next

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 2.15.1  |        0.2 KB |         0.2 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         228.9 KB |          0.0% |                     89.8% |        5.4 KB |        16.9 ms |         9.1 ms |   15.0 ms |   16.4 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 229.5 KB |          0.0% |       81.6% |
| `/en/about`    | 228.7 KB |          0.0% |       88.5% |
| `/en/blog`     | 228.8 KB |          0.0% |       85.1% |
| `/en/careers`  | 229.0 KB |          0.0% |       87.5% |
| `/en/contact`  | 228.8 KB |          0.0% |       98.9% |
| `/en/faq`      | 228.7 KB |          0.0% |       88.5% |
| `/en/pricing`  | 228.9 KB |          0.0% |       95.5% |
| `/en/products` | 228.8 KB |          0.0% |       90.8% |
| `/en/settings` | 229.1 KB |          0.0% |       93.1% |
| `/en/team`     | 228.7 KB |          0.0% |       88.5% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 229.5 KB |          0.0% |       81.6% |
| `/fr/about`    | 228.7 KB |          0.0% |       88.5% |
| `/fr/blog`     | 228.8 KB |          0.0% |       85.1% |
| `/fr/careers`  | 229.0 KB |          0.0% |       87.5% |
| `/fr/contact`  | 228.8 KB |          0.0% |       98.9% |
| `/fr/faq`      | 228.7 KB |          0.0% |       88.5% |
| `/fr/pricing`  | 228.9 KB |          0.0% |       95.5% |
| `/fr/products` | 228.8 KB |          0.0% |       90.8% |
| `/fr/settings` | 229.1 KB |          0.0% |       93.1% |
| `/fr/team`     | 228.7 KB |          0.0% |       88.5% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/nextjs-static-paraglide-next-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 16.0 ms | 12.4 ms | 26.0 ms |      12.0 ms |
|  `fr`  | 17.9 ms | 11.2 ms | 36.9 ms |       6.1 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   15.7 ms |   16.6 ms |      5.4 ms |
|  `fr`  |   14.3 ms |   16.2 ms |      5.3 ms |

</details>

---

## tolgee

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 7.0.0   |       11.0 KB |        35.8 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         |     ✅     |         291.2 KB |         65.5% |                     45.0% |       24.1 KB |        51.5 ms |         5.0 ms |   26.2 ms |    8.5 ms |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |

<details>
<summary><strong>Static</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 292.4 KB |         31.0% |       83.5% |
| `/en/about`    | 291.4 KB |         31.0% |       89.0% |
| `/en/blog`     | 291.1 KB |         31.0% |       85.7% |
| `/en/careers`  | 291.2 KB |         31.0% |       87.9% |
| `/en/contact`  | 290.7 KB |         31.0% |       97.8% |
| `/en/faq`      | 291.4 KB |         31.0% |       89.0% |
| `/en/pricing`  | 290.9 KB |         31.0% |       89.0% |
| `/en/products` | 290.8 KB |         31.0% |       94.5% |
| `/en/settings` | 291.1 KB |         31.0% |       94.5% |
| `/en/team`     | 290.9 KB |         31.0% |       89.0% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 292.4 KB |        100.0% |        0.0% |
| `/fr/about`    | 291.4 KB |        100.0% |        0.0% |
| `/fr/blog`     | 291.1 KB |        100.0% |        0.0% |
| `/fr/careers`  | 291.2 KB |        100.0% |        0.0% |
| `/fr/contact`  | 290.7 KB |        100.0% |        0.0% |
| `/fr/faq`      | 291.4 KB |        100.0% |        0.0% |
| `/fr/pricing`  | 290.9 KB |        100.0% |        0.0% |
| `/fr/products` | 290.8 KB |        100.0% |        0.0% |
| `/fr/settings` | 291.1 KB |        100.0% |        0.0% |
| `/fr/team`     | 290.9 KB |        100.0% |        0.0% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/static/nextjs-static-tolgee-app)

</details>

<details>
<summary><strong>Static</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min |  E2E max | Profiler avg |
| :----: | ------: | ------: | -------: | -----------: |
|  `en`  | 29.8 ms | 18.3 ms |  49.3 ms |       5.0 ms |
|  `fr`  | 73.2 ms | 45.6 ms | 143.8 ms |       5.0 ms |

</details>

<details>
<summary><strong>Static</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   28.4 ms |    8.8 ms |      1.9 ms |
|  `fr`  |   24.1 ms |    8.2 ms |      1.9 ms |

</details>

---

## Coverage

| Metric                | Count |
| :-------------------- | :---- |
| Total libraries       | 11    |
| Total app entries     | 32    |
| With lib size data    | 11    |
| With page bundle data | 11    |
| With component data   | 11    |
| With reactivity data  | 11    |
| With rendering data   | 11    |
