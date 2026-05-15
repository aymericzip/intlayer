---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Best i18n solution for Vue in 2026 - Benchmark Report
description: Compare Vue internationalisation (i18n) libraries like vue-i18n, fluent-vue, and Intlayer. Detailed performance report on bundle size, leakage, and reactivity.
keywords:
  - benchmark
  - i18n
  - intl
  - vue
  - performance
  - intlayer
slugs:
  - doc
  - benchmark
  - vue
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-vue-template
history:
  - version: 8.7.12
    date: 2026-01-06
    changes: "Init benchmark"
---

# Vue i18n Libraries — 2026 Benchmark Report

This page is a benchmark report for i18n solutions on Vue.

## Table of Contents

<Toc/>

## Interactive Benchmark

<I18nBenchmark framework="vite-vue" vertical/>

## Results reference:

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> [See complete benchmark data](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md)

See complete benchmark repository [here](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introduction

Internationalisation solutions are among the heaviest dependencies in a Vue app. The main risk is shipping unnecessary content: translations for other pages and other locales in a single route’s bundle.

As your app grows, that problem can quickly blow up the JavaScript sent to the client and slow down navigation.

In practice, for the least optimised implementations, an internationalised page can end up several times heavier than the version without i18n.

The other impact is on developer experience: how you declare content, types, namespace organisation, dynamic loading, and reactivity when the locale changes.

## TL;DR

- **Intlayer**: The lightest solution (v8.7.12) with built-in scoping and dynamic loading.
- **vue-i18n**: The industry standard with a rich ecosystem, but can become significantly heavier and harder to optimise for code-splitting in large applications.
- **fluent-vue**: Innovative message organisation but lacks type-safety and turns out to be an extremely heavy solution.

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

Syntaxes built around `const { t } = useI18n()` + `t('a.b.c')` are very convenient but often encourage keeping large JSON objects at runtime. That model makes tree-shaking hard unless the library offers a real per-page split strategy.

## Methodology

For this benchmark, we compared the following libraries:

- `Base App` (No i18n library)
- `vue-intlayer` (v8.7.12)
- `vue-i18n` (v11.4.0)
- `fluent-vue` (v3.8.2)

The framework is `Vue` with a multilingual app of **10 pages** and **10 languages**.

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

### What I measured:

I ran the same multilingual app in a real browser for every stack, then wrote down what actually showed up on the wire and how long things took. Sizes are reported **after normal web compression**, because that is closer to what people download than raw source counts.

- **Internationalisation library size**: After bundling, tree-shaking and minification, the size of the i18n library is the size of the providers + composables code in an empty component. It does not include the loading of translation files. It answers how expensive the library is before your content enters the picture.

- **JavaScript per page**: For each benchmark route, how much script the browser pulls in for that visit, averaged across the pages in the suite (and across locales where the report rolls them up). Heavy pages are slow pages.

- **Leakage from other locales**: It's the content of the same page but in another language that would be loaded by mistake in the audited page. This content is unnecessary and should be avoided (e.g. `/fr/about` page content in `/en/about` page bundle).

- **Leakage from other routes**: The same idea for **other screens** in the app: whether their copy is riding along when you only opened one page (e.g. `/en/about` page content in `/en/contact` page bundle). A high score hints at weak splitting or over-broad bundles.

- **Average component bundle size**: Common UI pieces are measured **one at a time** instead of hiding inside one giant app number. It shows whether internationalisation quietly inflates everyday components. For instance, if your component rerenders, it will load all that data from memory. Attaching a giant JSON to any component is like connecting a big store of unused data that will slow down your components’ performance.

- **Language switch responsiveness**: I flip the language using the app’s own control and time how long it takes until the page has clearly switched, what a visitor would notice, not a lab micro-step.

- **Rendering work after a language change**: A narrower follow-up: how much effort the interface took to repaint for the new language once the switch is in flight. Useful when the “felt” time and the framework cost diverge.

- **Initial page load time**: From navigation to the browser considering the page fully loaded for the scenarios I tested. Good for comparing cold starts.

- **Hydration time**: When the app exposes it, how long the client spends turning server HTML into something you can actually click. A dash in the tables means that implementation did not provide a reliable hydration figure in this benchmark.

## Results in detail

### 1 — Solutions to avoid

> No clear solution to avoid in vue ecosystem.

### 2 — Acceptable solutions

**(vue-i18n)** (`vue-i18n@11.4.0`):

- **vue-i18n** is without contestation the most used i18n library for vue, it has a lot of features and a huge ecosystem. But under the hood the solution is quite heavy. Even if vue-i18n integrates lazy loading for messages, it misses a scoping feature. In the case of a classic Vue SPA app there is no issue, but for a nuxt app, using @nuxt/i18n, it leads to including the messages from all pages into a single one. For a big nuxt app including more than 10 pages, it can become really problematic.

The package is very heavy (~24.3kb, which is about 9× `vue-intlayer`).

**(fluent-vue)** (`fluent-vue@0.5.0`):

- **fluent-vue** offer one innovation attempt through the .ftl format. The message organisation is great, easier to get started. But in practice, the lack of typesafety increases the risk of error and can quickly become time consuming to debug. Moreover, that solution load the messages using a vite plugin that force the loading of all the content in all languages into each page. Additionally this is an extremely heavy solution (~92.7kb, which is about 34× `vue-intlayer`).

### 3 — Recommendations

**(Intlayer)** (`vue-intlayer@8.7.12`):

I will not personally judge `vue-intlayer` for objectivity’s sake, since it is my own solution.
