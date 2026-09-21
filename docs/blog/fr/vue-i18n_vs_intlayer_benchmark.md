---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer : Benchmark 2026"
description: vue-i18n et Intlayer mesurés sur la même app Vite + Vue 3. Taille de la librairie, JavaScript par page, fuite de contenu, taille des composants et réactivité du changement de locale, avec les chiffres expliqués.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Benchmark d'internationalisation Vue (i18n)

`vue-i18n` est la bibliothèque i18n de référence pour Vue. Intlayer est une alternative basée sur un compilateur, délimitée au composant, avec une intégration Vue (`vue-intlayer`). Nous avons déjà comparé leurs [fonctionnalités et expérience développeur](https://intlayer.org/blog/vue-i18n-vs-intlayer). Cet article examine le coût de chacun une fois l'application construite.

Les données proviennent de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), une suite open-source qui construit la même application avec chaque bibliothèque et enregistre ce que le navigateur télécharge et exécute réellement.

<TOC/>

> **tl;dr**: Sur la même app Vite + Vue 3, `vue-i18n` embarque **134.9 KB** de JavaScript gzippé par page contre **41.3 KB** pour l'app sans i18n. Intlayer embarque **57.1 KB**. Le runtime `vue-i18n` seul pèse **24.3 KB gzip** (6x les 3.9 KB d'Intlayer), chaque page porte **90% des chaînes de pages étrangères**, et un composant compilé en isolation traîne **196 KB** car il est lié à l'arbre global des messages. L'adaptateur `@intlayer/vue-i18n` conserve l'API `vue-i18n` et a mesuré **47.0 KB** par page.

## En résumé

- **vue-i18n** - La bibliothèque i18n de facto pour Vue 2 / Vue 3 et le cœur de `@nuxtjs/i18n`. Messages au style ICU, blocs `<i18n>` dans les SFC, directive `v-t`, formatters `d()` / `n()`, grand écosystème. Les messages sont enregistrés sur une instance globale à `createI18n()`; le chargement lazy par locale suit un pattern `setLocaleMessage()` manuel, et la division per-route est à construire vous-même.
- **Intlayer** - Modèle de contenu centré sur les composants. Les dictionnaires `.content.ts` se situent à côté du composant qu'ils servent, un compilateur build-time (`vite-intlayer`) tree-shake et lazy-load par composant et par locale, les types TypeScript stricts sont générés depuis votre contenu, et les traductions manquantes échouent au moment du build. Inclut des helpers pour router / SEO, un Visual Editor / CMS et une traduction assistée par IA.

| Bibliothèque | Stars GitHub | Commits totaux | Dernier commit | Première version | Version NPM | Téléchargements NPM |
