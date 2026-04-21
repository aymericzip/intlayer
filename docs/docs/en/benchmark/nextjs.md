---
createdAt: 2026-04-20
updatedAt: 2026-04-21
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
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Init benchmark"
---

# Next.js i18n Libraries - 2026 Benchmark Report

This page is a benchmark report for i18n solutions on Next.js.

## Table of Contents

<Toc/>

## Interactive Benchmark

<I18nBenchmark framework="nextjs" vertical/>

## Results reference:

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md

See complete benchmark repository [here](https://github.com/intlayer-org/benchmark-i18n).

## Introduction

Internationalization libraries have a heavy impact on your application. The main risk is loading content for every page and every language when the user only visits one page.

As your app grows, bundle size can grow exponentially, which can noticeably hurt performance.

As an example, for the worst offenders, once internationalized your page can end up nearly 4× larger.

Another impact of i18n libraries is slower development. Turning components into multilingual content across languages is time-consuming.

Because the problem is hard, many solutions exist—some focused on DX, others on performance or scalability, and so on.

Intlayer tries to optimize across these dimensions.

## Test your app

To surface these issues, I built a free scanner you can try [here](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## The problem

There are two major ways to limit the impact of a multilingual app on your bundle:

- Split your JSON (or content) across files / variables / namespaces so the bundler can tree-shake unused content for a given page
- Dynamically load your page content only in the page’s language

Technical limitations for these approaches:

**Dynamic loading**

Even when you declare routes like `[locale]/page.tsx`, with Webpack or Turbopack, and even if `generateStaticParams` is defined, the bundler does not treat `locale` as a static constant. That means it may pull content for all languages into each page. The main way to limit this is to load content via a dynamic import (e.g. `import('./locales/${locale}.json')`).

What happens at build time is that Next.js emits one JS bundle per locale (e.g. `./locales_fr_12345.js`). After the site is sent to the client, when the page runs, the browser performs an extra HTTP request for the needed JS file (e.g. `./locales_fr_12345.js`).

> Another way to address the same problem is to use `fetch()` to load JSON dynamically. That is how `Tolgee` works when JSON lives under `/public`, or `next-translate`, which relies on `getStaticProps` to load content. The flow is the same: the browser makes an extra HTTP request to load the asset.

**Content splitting**

If you use syntax like `const t = useTranslation()` + `t('my-object.my-sub-object.my-key')`, the entire JSON usually has to be in the bundle so the library can parse it and resolve the key. Much of that content then ships even when it is unused on the page.

To mitigate this, some libraries ask you to declare per page which namespaces to load—e.g. `next-i18next`, `next-intl`, `lingui`, `next-translate`, `next-international`.

By contrast, `Paraglide` adds an extra step before build to turn JSON into flat symbols like `const en_my_var = () => 'my value'`. In theory that enables tree-shaking unused content on the page. As we will see, that method still has trade-offs.

Finally, `Intlayer` applies a build-time optimization so `useIntlayer('my-key')` is replaced with the corresponding content directly.

## Methodology

For this benchmark, we compared the following libraries:

- `Base App` (No i18n library)
- `next-intlayer` (v8.7.5)
- `next-i18next` (v16.0.5)
- `next-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `next-translate` (v3.1.2)
- `next-international` (v1.3.1)
- `@inlang/paraglide-js` (v2.15.1)
- `@tolgee/react` (v7.0.0)
- `@lingo.dev/compiler` (v0.4.0)
- `wuchale` (v0.22.11)
- `gt-next` (v6.16.5)

I used `Next.js` version `16.2.4` with the App Router.

I built a multilingual app with **10 pages** and **10 languages**.

I compared **four loading strategies**:

| Strategy            | No namespaces (global)                       | With namespaces (scoped)                                             |
| :------------------ | :------------------------------------------- | :------------------------------------------------------------------- |
| **Static loading**  | **Static**: Everything in memory at startup. | **Scoped static**: Split by namespace; everything loaded at startup. |
| **Dynamic loading** | **Dynamic**: On-demand loading per locale.   | **Scoped dynamic**: Granular loading per namespace and locale.       |

## Strategy summary

- **Static**: Simple; no network latency after the initial load. Downside: large bundle size.
- **Dynamic**: Reduces initial weight (lazy-loading). Ideal when you have many locales.
- **Scoped static**: Keeps code organized (logical separation) without complex extra network requests.
- **Scoped dynamic**: Best approach for _code splitting_ and performance. Minimizes memory by loading only what the current view and active locale need.

### What I measured:

I ran the same multilingual app in a real browser for every stack, then wrote down what actually showed up on the wire and how long things took. Sizes are reported **after normal web compression**, because that is closer to what people download than raw source counts.

- **Internationalization library size**: After bundling, tree-shaking and minification, the size of the i18n library is the size of the providers (e.g. `NextIntlClientProvider`) + hooks (e.g. `useTranslations`) code in an empty component. It does not includes the loading of translation files. It answers how expensive the library is before your content enters the picture.

- **JavaScript per page**: For each benchmark route, how much script the browser pulls in for that visit, averaged across the pages in the suite (and across locales where the report rolls them up). Heavy pages are slow pages.

- **Leakage from other locales**: It's the content of the same page but in another language that would be loaded by mistake in the audited page. This content is unnecessary and should be avoided. (e.g. `/fr/about` page content in `/en/about` page bundle)

- **Leakage from other routes**: The same idea for **other screens** in the app: whether their copy is riding along when you only opened one page. (e.g. `/en/about` page content in `/en/contact` page bundle). A high score hints at weak splitting or over-broad bundles.

- **Average component bundle size**: Common UI pieces are measured **one at a time** instead of hiding inside one giant app number. It shows whether internationalization quietly inflates everyday components. For instance, if your component rerender, it will load all that data from memory. Attaching a giant JSON to any component, is like connecting a big store of unused data that will slow down your components performance.

- **Language switch responsiveness**: I flip the language using the app’s own control and time how long it takes until the page has clearly switched—what a visitor would notice, not a lab micro-step.

- **Rendering work after a language change**: A narrower follow-up: how much effort the interface took to repaint for the new language once the switch is in flight. Useful when the “felt” time and the framework cost diverge.

- **Initial page load time**: From navigation to the browser considering the page fully loaded for the scenarios I tested. Good for comparing cold starts.

- **Hydration time**: When the app exposes it, how long the client spends turning server HTML into something you can actually click. A dash in the tables means that implementation did not provide a reliable hydration figure in this benchmark.

## Results in detail

### 1 - Solutions to avoid

Some solutions, such as `gt-next` or `lingo.dev`, are clearly best avoided. They combine vendor lock-in with polluting your codebase. Despite many hours trying to implement them, I never got them working—neither on TanStack Start nor on Next.js.

Issues encountered:

**(General Translation)** (`gt-next@6.16.5`):

- For a 110kb app, `gt-react` adds more than 440kb extra.
- `Quota Exceeded, please upgrade your plan` on the very first build with General Translation.
- Translations are not rendered; I get the error `Error: <T> used on the client-side outside of <GTProvider>`, which seems to be a bug in the library.
- While implementing **gt-tanstack-start-react**, I also came across an [issue](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) with the library: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, which was making the application break. After reporting this issue, the maintainer fixed it within 24 hours.
- The library blocks static rendering of Next.js pages.

**(Lingo.dev)** (`@lingo.dev/compiler@0.4.0`):

- AI quota exceeded, blocking the build entirely, so you cannot ship to production without paying.
- The compiler was missing almost 40% of the translated content. I had to rewrite all `.map` into flat component blocks to make it work.
- Their CLI is buggy and used to reset the config file for no reason.
- At build, it totally erased the generated JSONs when new content was added. As a result, a handful of keys could wipe out more than 300 existing keys.

### 2 - Experimental solutions

**(Wuchale)** (`wuchale@0.22.11`):

The idea behind `Wuchale` is interesting but not yet viable. I hit reactivity issues and had to force rerendering of the provider to get the app working. The documentation is also fairly unclear, which makes onboarding harder.

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` offers an innovative, well-thought-out approach. Even so, in this benchmark the advertised tree-shaking did not work for my Next.js or TanStack Start setups. The workflow and DX are more complex than other options.
Personally I dislike having to regenerate JS files before every push, which creates constant merge conflict risk via PRs. The tool also seems more focused on Vite than on Next.js.
Finally, in comparison of other solutions, Paraglide does not use store (e.g. React context) to retrieve the current locale to render the content. For each node parsed, it will request the locale from the localeStorage / cookie etc. It leads to execution of unnecessary logic that impact the component reactivity.

### 3 - Acceptable solutions

**(Tolgee)** (`@tolgee/react@7.0.0`):

`Tolgee` addresses many of the issues mentioned earlier. I found it harder to adopt than similar tools. It does not provide type safety, which also makes catching missing keys at compile time harder. I had to wrap Tolgee’s functions with my own to add missing-key detection.

**(Next Intl)** (`next-intl@4.9.1`):

`next-intl` is the trendiest option and the one AI agents push most—but in my view wrongly so. Getting started is easy. In practice, optimizing to limit leakage is complex. Combining dynamic loading + namespacing + TypeScript types slows development a lot. The package is also fairly heavy (~13kb for `NextIntlClientProvider` + `useTranslations`, which is more than 2× `next-intlayer`). **next-intl** used to block static rendering of Next.js pages. It provides a helper named `setRequestLocale()`. That seems partially addressed for centralized files like `en.json` / `fr.json`, but static rendering still breaks when content is split into namespaces such as `en/shared.json` / `fr/shared.json` / `es/shared.json`.

**(Next I18next)** (`next-i18next@16.0.5`):

`next-i18next` is probably the most popular option because it was among the first i18n solutions for JavaScript apps. It has many community plugins. It shares the same major downsides as `next-intl`. The package is especially heavy (~18kb for `I18nProvider` + `useTranslation`, about 3× `next-intlayer`).

Message formats also differ: `next-intl` uses ICU MessageFormat, while `i18next` uses its own format.

**(Next International)** (`next-international@1.3.1`):

`next-international` also tackles the issues above but does not differ much from `next-intl` or `next-i18next`. It includes `scopedT()` for namespace-specific translations—but using it has essentially no impact on bundle size.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` is often praised. Personally I found the `lingui extract` / `lingui compile` workflow more complex than alternatives, without a clear upside. I also noticed inconsistent syntaxes that confuse AIs (e.g. `t()`, `t''`, `i18n.t()`, `<Trans>`).

### 4 - Recommendations

**(Next Translate)** (`next-translate@3.1.2`):

`next-translate` is my main recommendation if you like a `t()`-style API. It is elegant via `next-translate-plugin`, loading namespaces through `getStaticProps` with a Webpack / Turbopack loader. It is also the lightest option here (~2.5kb). For namespacing, defining namespaces per page or route in config is well thought out and easier to maintain than main alternatives like **next-intl** or **next-i18next**. In version `3.1.2`, I noted that static rendering did not work; Next.js fell back to dynamic rendering.

**(Intlayer)** (`next-intlayer@8.7.5`):

I will not personally judge `next-intlayer` for objectivity’s sake, since it is my own solution.

### Personal note

This note is personal and does not affect the benchmark results. In the i18n world you often see consensus around `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>`.

In React apps, injecting a function as a `ReactNode` is, in my view, an anti-pattern. It also adds avoidable complexity and JavaScript execution overhead (even if barely noticeable).
