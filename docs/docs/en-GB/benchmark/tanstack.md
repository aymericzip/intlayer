---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Best i18n solution for TanStack Start in 2026 - Benchmark Report
description: Compare TanStack Start internationalisation libraries like react-i18next, use-intl, and Intlayer. Detailed performance report on bundle size, leakage, and reactivity.
keywords:
  - benchmark
  - i18n
  - intl
  - tanstack
  - performance
  - intlayer
slugs:
  - doc
  - benchmark
  - tanstack
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-tanstack-start-template
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Init benchmark"
---

# TanStack Start i18n Libraries — 2026 Benchmark Report

This page is a benchmark report for i18n solutions on TanStack Start.

## Table of Contents

<Toc/>

## Interactive Benchmark

<I18nBenchmark framework="tanstack" vertical/>

## Results reference:

<iframe 
  src="https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-tanstack.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-tanstack.md

See complete benchmark repository [here](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introduction

Internationalisation solutions are among the heaviest dependencies in a React app. On TanStack Start, the main risk is shipping unnecessary content: translations for other pages and other locales in a single route’s bundle.

As your app grows, that problem can quickly blow up the JavaScript sent to the client and slow down navigation.

In practice, for the least optimised implementations, an internationalised page can end up several times heavier than the version without i18n.

The other impact is on developer experience: how you declare content, types, namespace organisation, dynamic loading, and reactivity when the locale changes.

## Test your app

To quickly spot i18n leakage issues, I set up a free scanner available [here](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## The problem

Two levers are essential to limit the cost of a multilingual app:

- Split content by page / namespace so you do not load whole dictionaries when you do not need them
- Load the right locale dynamically, only when needed

Understanding the technical limitations of these approaches:

**Dynamic loading**

Without dynamic loading, most solutions keep messages in memory from the first render, which adds significant overhead for apps with many routes and locales.

With dynamic loading, you accept a trade-off: less initial JS, but sometimes an extra request when switching language.

**Content splitting**

Syntaxes built around `const t = useTranslation()` + `t('a.b.c')` are very convenient but often encourage keeping large JSON objects at runtime. That model makes tree-shaking hard unless the library offers a real per-page split strategy.

## Methodology

For this benchmark, we compared the following libraries:

- `Base App` (No i18n library)
- `react-intlayer` (v8.7.5-canary.0)
- `react-i18next` (v17.0.2)
- `use-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `react-intl` (v10.1.1)
- `wuchale` (v0.22.11)
- `gt-react` (vlatest)
- `lingo.dev` (v0.133.9)

The framework is `TanStack Start` with a multilingual app of **10 pages** and **10 languages**.

We compared **four loading strategies**:

| Strategy            | No namespaces (global)                       | With namespaces (scoped)                                             |
| :------------------ | :------------------------------------------- | :------------------------------------------------------------------- |
| **Static loading**  | **Static**: Everything in memory at startup. | **Scoped static**: Split by namespace; everything loaded at startup. |
| **Dynamic loading** | **Dynamic**: On-demand loading per locale.   | **Scoped dynamic**: Granular loading per namespace and locale.       |

## Strategy summary

- **Static**: Simple; no network latency after the initial load. Downside: large bundle size.
- **Dynamic**: Reduces initial weight (lazy-loading). Ideal when you have many locales.
- **Scoped static**: Keeps code organised (logical separation) without complex extra network requests.
- **Scoped dynamic**: Best approach for _code splitting_ and performance. Minimises memory by loading only what the current view and active locale need.

## Results in detail

### 1 — Solutions to avoid

Some solutions, such as `gt-react` or `lingo.dev`, are clearly ones to steer clear of. They combine vendor lock-in with polluting your codebase. Worse: despite many hours trying to implement them, I never got them working properly on TanStack Start (similar to Next.js with `gt-next`).

Issues encountered:

**(General Translation)** (`gt-react@latest`):

- For an app around 110kb, `gt-react` can add more than 440kb extra (order of magnitude seen on the Next.js implementation in the same benchmark).
- `Quota Exceeded, please upgrade your plan` on the very first build with General Translation.
- Translations are not rendered; I get the error `Error: <T> used on the client-side outside of <GTProvider>`, which seems to be a bug in the library.
- While implementing **gt-tanstack-start-react**, I also came across an [issue](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) with the library: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, which was making the application break. After reporting this issue, the maintainer fixed it within 24 hours.
- These libraries use an anti-pattern through the `initializeGT()` function, blocking the bundle from tree-shaking cleanly.

**(Lingo.dev)** (`lingo.dev@0.133.9`):

- AI quota exceeded (or blocking server dependency), making build / production risky without paying.
- The compiler was missing almost 40% of the translated content. I had to rewrite all `.map` into flat component blocks to make it work.
- Their CLI is buggy and used to reset the config file for no reason.
- At build, it totally erased the generated JSONs when there was new content added. As a result, you could end up with only a few keys erasing hundreds of existing keys.
- I met reactivity issues with the library on TanStack Start: on locale change I had to force rerendering of the provider to make it work.

### 2 — Experimental solutions

**(Wuchale)** (`wuchale@0.22.11`):

The idea behind `Wuchale` is interesting but not yet a viable solution. I hit reactivity issues with the library and had to force rerendering of the provider to get the app working on TanStack Start. The documentation is also fairly unclear, which makes onboarding harder.

### 3 — Acceptable solutions

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` offers an innovative, well-thought-out approach. Even so, in this benchmark the tree-shaking their company advertises did not work for my Next.js implementation or for TanStack Start. The workflow and DX are also more complex than other options. Personally I am not a fan of having to regenerate JS files before every push, which creates constant merge conflict risk for developers via PRs.

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` addresses many of the issues mentioned earlier. I found it harder to get started with than other tools with similar approaches. It does not provide type safety, which also makes catching missing keys at compile time much harder. I had to wrap Tolgee’s APIs with my own to add missing-key detection.

On TanStack Start I also had reactivity problems: on locale change I had to force the provider to rerender and subscribe to locale-change events so loading in another language behaved correctly.

**(use-intl)** (`use-intl@4.9.1`):

`use-intl` is the most fashionable “intl” piece in the React ecosystem (same family as `next-intl`) and is often pushed by AI agents—but in my view wrongly so in a performance-first setting. Getting started is fairly simple. In practice, the process to optimise and limit leakage is quite complex. Likewise, combining dynamic loading + namespacing + TypeScript types slows development a lot.

On TanStack Start you avoid Next.js-specific traps (`setRequestLocale`, static rendering), but the core issue is the same: without strict discipline, the bundle quickly carries too many messages and per-route namespace maintenance becomes painful.

**(react-i18next)** (`react-i18next@17.0.2`):

`react-i18next` is probably the most popular option because it was among the first to serve JavaScript app i18n needs. It also has a wide set of community plugins for specific problems.

Still, it shares the same major downsides as stacks built on `t('a.b.c')`: optimisations are possible but very time-consuming, and large projects risk bad practices (namespaces + dynamic loading + types).

Message formats also diverge: `use-intl` uses ICU MessageFormat, while `i18next` uses its own format—which complicates tooling or migrations if you mix them.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` is often praised. Personally I found the workflow around `lingui extract` / `lingui compile` more complex than other approaches, without a clear upside in this TanStack Start benchmark. I also noticed inconsistent syntaxes that confuse AIs (e.g. `t()`, `t''`, `i18n.t()`, `<Trans>`).

**(react-intl)** (`react-intl@10.1.1`):

`react-intl` is a performant implementation from the Format.js team. The DX stays verbose: `const intl = useIntl()` + `intl.formatMessage({ id: "xx.xx" })` adds complexity, extra JavaScript work, and ties the global i18n instance to many nodes in the React tree.

### 4 — Recommendations

This TanStack Start benchmark has no direct equivalent to `next-translate` (Next.js plugin + `getStaticProps`). For teams that really want a `t()` API with a mature ecosystem, `react-i18next` and `use-intl` remain “reasonable” choices—but expect to invest a lot of time optimising to avoid leakage.

**(Intlayer)** (`react-intlayer@8.7.5-canary.0`):

I will not personally judge `react-intlayer` for objectivity’s sake, since it is my own solution.

### Personal note

This note is personal and does not affect the benchmark results. Still, in the i18n world you often see consensus around a pattern like `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` for translated content.

In React apps, injecting a function as a `ReactNode` is, in my view, an anti-pattern. It also adds avoidable complexity and JavaScript execution overhead (even if it is barely noticeable).
