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
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     ✅     |         151.8 KB |          0.0% |                     14.1% |        0.7 KB |        14.0 ms |         3.6 ms |   14.7 ms |    9.3 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

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
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 15.3 ms |  8.9 ms | 25.4 ms |       3.9 ms |
|  `fr`  | 12.8 ms |  9.8 ms | 18.3 ms |       3.3 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

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
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     🔶     |         434.3 KB |          0.0% |                     41.0% |      174.1 KB |        22.0 ms |         5.7 ms |   22.7 ms |   22.3 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

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
| `/fr/`         | 434.6 KB |          0.0% |       65.9% |
| `/fr/about`    | 434.5 KB |          0.0% |       77.3% |
| `/fr/blog`     | 434.2 KB |          0.0% |       77.2% |
| `/fr/careers`  | 434.2 KB |          0.0% |       75.0% |
| `/fr/contact`  | 434.2 KB |          0.0% |       97.8% |
| `/fr/faq`      | 434.2 KB |          0.0% |       81.5% |
| `/fr/pricing`  | 434.2 KB |          0.0% |       91.7% |
| `/fr/products` | 434.2 KB |          0.0% |       81.8% |
| `/fr/settings` | 434.2 KB |          0.0% |       89.8% |
| `/fr/team`     | 434.2 KB |          0.0% |       83.0% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/nextjs-scoped-dynamic-gt-next-app)

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 23.1 ms | 16.7 ms | 40.5 ms |       6.2 ms |
|  `fr`  | 21.0 ms | 16.3 ms | 26.9 ms |       5.3 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   23.2 ms |   27.5 ms |      2.7 ms |
|  `fr`  |   22.2 ms |   17.2 ms |      2.1 ms |

</details>

---

## lingo.dev

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| —       |        7.5 KB |        19.6 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     ✅     |         162.5 KB |         14.4% |                     64.9% |        7.8 KB |        22.6 ms |         5.1 ms |   30.4 ms |   14.1 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

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
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 26.3 ms | 19.3 ms | 35.6 ms |       5.5 ms |
|  `fr`  | 19.0 ms | 16.9 ms | 21.5 ms |       4.7 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

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
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     🔶     |         157.9 KB |          2.7% |                     89.1% |      148.9 KB |        13.3 ms |         6.6 ms |   16.3 ms |   11.7 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 159.3 KB |          0.0% |       79.7% |
| `/en/about`    | 157.9 KB |          0.0% |       87.2% |
| `/en/blog`     | 157.5 KB |          0.0% |       83.3% |
| `/en/careers`  | 157.7 KB |          0.0% |       94.9% |
| `/en/contact`  | 157.4 KB |          0.0% |       96.3% |
| `/en/faq`      | 158.2 KB |          0.0% |       87.2% |
| `/en/pricing`  | 157.8 KB |          0.0% |       94.9% |
| `/en/products` | 157.7 KB |          0.0% |       89.7% |
| `/en/settings` | 158.0 KB |          0.0% |       93.6% |
| `/en/team`     | 157.8 KB |          0.0% |       87.3% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 159.3 KB |         15.5% |       81.4% |
| `/fr/about`    | 157.9 KB |          4.4% |       83.7% |
| `/fr/blog`     | 157.5 KB |          1.1% |       84.9% |
| `/fr/careers`  | 157.7 KB |          4.4% |       93.0% |
| `/fr/contact`  | 157.4 KB |          0.0% |       95.5% |
| `/fr/faq`      | 158.2 KB |          8.4% |       88.6% |
| `/fr/pricing`  | 157.8 KB |          4.3% |       88.5% |
| `/fr/products` | 157.7 KB |          0.0% |       91.4% |
| `/fr/settings` | 158.0 KB |          5.4% |       91.9% |
| `/fr/team`     | 157.8 KB |          9.4% |       88.4% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/nextjs-scoped-dynamic-lingui-app)

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 13.9 ms |  8.7 ms | 27.4 ms |       9.2 ms |
|  `fr`  | 12.6 ms | 10.6 ms | 16.7 ms |       3.9 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   18.2 ms |   13.4 ms |      7.2 ms |
|  `fr`  |   14.4 ms |   10.1 ms |      4.3 ms |

</details>

---

## next-i18next

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 16.0.5  |       17.8 KB |        61.2 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     🔶     |         187.2 KB |         40.9% |                     89.8% |       26.0 KB |        14.5 ms |         4.8 ms |   15.8 ms |   26.2 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 182.6 KB |         44.0% |       84.7% |
| `/en/about`    | 181.9 KB |         44.0% |       83.1% |
| `/en/blog`     | 181.9 KB |         44.0% |       85.5% |
| `/en/careers`  | 181.9 KB |         44.0% |       90.3% |
| `/en/contact`  | 181.9 KB |         44.0% |       96.8% |
| `/en/faq`      | 181.7 KB |         44.0% |       94.4% |
| `/en/pricing`  | 182.0 KB |         44.0% |       97.6% |
| `/en/products` | 181.8 KB |         44.0% |       93.5% |
| `/en/settings` | 182.3 KB |         44.0% |       85.6% |
| `/en/team`     | 181.9 KB |         44.0% |       87.1% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 193.1 KB |         37.9% |       84.2% |
| `/fr/about`    | 192.4 KB |         37.9% |       88.1% |
| `/fr/blog`     | 192.5 KB |         37.9% |       87.1% |
| `/fr/careers`  | 192.4 KB |         37.9% |       96.0% |
| `/fr/contact`  | 192.4 KB |         37.9% |       98.0% |
| `/fr/faq`      | 192.3 KB |         37.9% |       93.1% |
| `/fr/pricing`  | 192.5 KB |         37.9% |       74.3% |
| `/fr/products` | 192.3 KB |         37.9% |       92.1% |
| `/fr/settings` | 192.8 KB |         37.9% |       95.1% |
| `/fr/team`     | 192.4 KB |         37.9% |       90.1% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/nextjs-scoped-dynamic-next-i18next-app)

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 14.3 ms |  9.3 ms | 25.8 ms |       5.0 ms |
|  `fr`  | 14.6 ms | 12.3 ms | 22.1 ms |       4.6 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   16.4 ms |   33.2 ms |      8.4 ms |
|  `fr`  |   15.2 ms |   19.2 ms |      4.7 ms |

</details>

---

## next-international

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 1.3.1   |       11.1 KB |        34.9 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     ✅     |         162.5 KB |          0.0% |                     89.9% |       11.9 KB |        20.1 ms |         4.8 ms |   16.8 ms |    7.8 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 162.4 KB |          0.0% |       82.2% |
| `/en/about`    | 161.8 KB |          0.0% |       88.9% |
| `/en/blog`     | 161.9 KB |          0.0% |       85.6% |
| `/en/careers`  | 161.9 KB |          0.0% |       93.3% |
| `/en/contact`  | 161.9 KB |          0.0% |       98.9% |
| `/en/faq`      | 161.7 KB |          0.0% |       80.0% |
| `/en/pricing`  | 162.0 KB |          0.0% |       95.6% |
| `/en/products` | 161.8 KB |          0.0% |       91.1% |
| `/en/settings` | 162.2 KB |          0.0% |       94.4% |
| `/en/team`     | 161.8 KB |          0.0% |       88.9% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 163.5 KB |          0.0% |       85.0% |
| `/fr/about`    | 162.9 KB |          0.0% |       86.9% |
| `/fr/blog`     | 163.0 KB |          0.0% |       87.9% |
| `/fr/careers`  | 163.1 KB |          0.0% |       91.6% |
| `/fr/contact`  | 163.0 KB |          0.0% |       98.1% |
| `/fr/faq`      | 162.9 KB |          0.0% |       84.1% |
| `/fr/pricing`  | 163.1 KB |          0.0% |       91.7% |
| `/fr/products` | 163.0 KB |          0.0% |       90.7% |
| `/fr/settings` | 163.3 KB |          0.0% |       93.5% |
| `/fr/team`     | 162.9 KB |          0.0% |       89.7% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/nextjs-scoped-dynamic-next-international-app)

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 19.8 ms | 12.2 ms | 32.5 ms |       4.1 ms |
|  `fr`  | 20.4 ms | 13.3 ms | 30.3 ms |       5.5 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   17.2 ms |    8.7 ms |      1.2 ms |
|  `fr`  |   16.3 ms |    6.9 ms |      1.0 ms |

</details>

---

## next-intl

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 4.9.1   |       12.8 KB |        51.0 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     🔶     |         163.5 KB |          0.0% |                      0.0% |       21.5 KB |        17.0 ms |         3.6 ms |   19.4 ms |   19.5 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 164.0 KB |          0.0% |        0.0% |
| `/en/about`    | 163.3 KB |          0.0% |        0.0% |
| `/en/blog`     | 163.4 KB |          0.0% |        0.0% |
| `/en/careers`  | 163.4 KB |          0.0% |        0.0% |
| `/en/contact`  | 163.3 KB |          0.0% |        0.0% |
| `/en/faq`      | 163.3 KB |          0.0% |        0.0% |
| `/en/pricing`  | 163.5 KB |          0.0% |        0.0% |
| `/en/products` | 163.3 KB |          0.0% |        0.0% |
| `/en/settings` | 163.7 KB |          0.0% |        0.0% |
| `/en/team`     | 163.3 KB |          0.0% |        0.0% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 164.0 KB |          0.0% |        0.0% |
| `/fr/about`    | 163.3 KB |          0.0% |        0.0% |
| `/fr/blog`     | 163.4 KB |          0.0% |        0.0% |
| `/fr/careers`  | 163.4 KB |          0.0% |        0.0% |
| `/fr/contact`  | 163.3 KB |          0.0% |        0.0% |
| `/fr/faq`      | 163.3 KB |          0.0% |        0.0% |
| `/fr/pricing`  | 163.5 KB |          0.0% |        0.0% |
| `/fr/products` | 163.3 KB |          0.0% |        0.0% |
| `/fr/settings` | 163.7 KB |          0.0% |        0.0% |
| `/fr/team`     | 163.3 KB |          0.0% |        0.0% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/nextjs-scoped-dynamic-next-intl-app)

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 17.0 ms | 13.6 ms | 19.2 ms |       3.6 ms |
|  `fr`  | 17.0 ms | 12.6 ms | 24.5 ms |       3.6 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   20.5 ms |   26.2 ms |     14.5 ms |
|  `fr`  |   18.3 ms |   12.7 ms |      4.7 ms |

</details>

---

## next-intlayer

| Version        | Lib size (gz) | Lib size (min) |
| :------------- | ------------: | -------------: |
| 8.7.5-canary.0 |        4.9 KB |        14.0 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     ✅     |         152.0 KB |          0.0% |                      0.0% |        7.2 KB |        15.4 ms |         7.6 ms |   18.4 ms |   12.6 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

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
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 17.5 ms | 11.4 ms | 34.1 ms |      10.3 ms |
|  `fr`  | 13.3 ms | 10.6 ms | 17.5 ms |       5.0 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

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
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     🔶     |         153.0 KB |          0.0% |                     89.8% |       11.4 KB |        23.5 ms |         4.3 ms |   24.0 ms |   12.1 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

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

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/nextjs-scoped-dynamic-next-translate-app)

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 22.8 ms | 13.1 ms | 43.4 ms |       4.6 ms |
|  `fr`  | 24.2 ms | 13.3 ms | 38.9 ms |       3.9 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   25.1 ms |   10.6 ms |      1.5 ms |
|  `fr`  |   23.0 ms |   13.6 ms |      4.4 ms |

</details>

---

## paraglide-next

| Version | Lib size (gz) | Lib size (min) |
| :------ | ------------: | -------------: |
| 2.15.1  |        0.2 KB |         0.2 KB |

| Category       |   Status   | Page JS avg (gz) | Locale leak % | Other page content leak % | Comp avg (gz) | E2E reactivity | React Profiler | Page load | Hydration |
| :------------- | :--------: | ---------------: | ------------: | ------------------------: | ------------: | -------------: | -------------: | --------: | --------: |
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     ✅     |         228.9 KB |          0.0% |                     89.8% |        5.4 KB |        16.9 ms |         9.1 ms |   15.0 ms |   16.4 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

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
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  | 16.0 ms | 12.4 ms | 26.0 ms |      12.0 ms |
|  `fr`  | 17.9 ms | 11.2 ms | 36.9 ms |       6.1 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

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
| Static         | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Dynamic        | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Static  | ⬜ missing |                — |             — |                         — |             — |              — |              — |         — |         — |
| Scoped Dynamic |     🔶     |         150.7 KB |          5.1% |                     89.9% |       31.0 KB |         2.4 ms |         1.0 ms |   14.7 ms |   11.7 ms |

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale page bundle</summary>

**Locale: `en`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/en/`         | 152.0 KB |          0.0% |       83.3% |
| `/en/about`    | 151.0 KB |          0.0% |       88.8% |
| `/en/blog`     | 150.7 KB |          0.0% |       85.4% |
| `/en/careers`  | 150.7 KB |          0.0% |       87.6% |
| `/en/contact`  | 150.2 KB |          0.0% |       97.8% |
| `/en/faq`      | 150.9 KB |          0.0% |       88.8% |
| `/en/pricing`  | 150.4 KB |          0.0% |       88.8% |
| `/en/products` | 150.3 KB |          0.0% |       94.4% |
| `/en/settings` | 150.7 KB |          0.0% |       94.4% |
| `/en/team`     | 150.5 KB |          0.0% |       88.9% |

**Locale: `fr`**

| Page           |  JS (gz) | Locale leak % | Page leak % |
| :------------- | -------: | ------------: | ----------: |
| `/fr/`         | 152.0 KB |         20.0% |       85.0% |
| `/fr/about`    | 151.0 KB |          5.9% |       87.0% |
| `/fr/blog`     | 150.7 KB |          9.9% |       87.0% |
| `/fr/careers`  | 150.7 KB |          4.5% |       89.0% |
| `/fr/contact`  | 150.2 KB |          4.5% |       98.0% |
| `/fr/faq`      | 150.9 KB |         16.9% |       90.0% |
| `/fr/pricing`  | 150.4 KB |         16.9% |       87.0% |
| `/fr/products` | 150.3 KB |         11.1% |       92.0% |
| `/fr/settings` | 150.7 KB |          7.2% |       94.0% |
| `/fr/team`     | 150.5 KB |          5.9% |       90.1% |

**Bundle link:** [View on GitHub](https://github.com/intlayer-org/benchmark-bloom/tree/main/apps-benchmark/dynamic/nextjs-scoped-dynamic-tolgee-app)

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale reactivity</summary>

| Locale | E2E avg | E2E min | E2E max | Profiler avg |
| :----: | ------: | ------: | ------: | -----------: |
|  `en`  |  3.4 ms |  0.7 ms | 14.0 ms |       1.0 ms |
|  `fr`  |  1.4 ms |  0.8 ms |  3.1 ms |       0.0 ms |

</details>

<details>
<summary><strong>Scoped Dynamic</strong> — per-locale rendering</summary>

| Locale | Page load | Hydration | React mount |
| :----: | --------: | --------: | ----------: |
|  `en`  |   14.5 ms |   11.7 ms |      5.5 ms |
|  `fr`  |   14.9 ms |   11.7 ms |      5.8 ms |

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
