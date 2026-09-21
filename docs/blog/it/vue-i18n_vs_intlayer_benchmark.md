---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: Benchmark 2026"
description: vue-i18n e Intlayer misurati sulla stessa app Vite + Vue 3. Dimensione della libreria, JavaScript per pagina, content leakage, dimensione del componente e reattività del cambio locale, con i numeri spiegati.
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

# vue-i18n VS Intlayer | Benchmark per l'Internazionalizzazione di Vue (i18n)

`vue-i18n` è la libreria i18n di riferimento per Vue. Intlayer è un'alternativa basata su compiler e scoped per componenti con un'integrazione Vue (`vue-intlayer`). Abbiamo già confrontato le loro [funzionalità e developer experience](https://intlayer.org/blog/vue-i18n-vs-intlayer). Questo articolo analizza il costo di ciascuna una volta che l'app è compilata.

I dati provengono da [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), una suite open-source che compila la stessa applicazione con ogni libreria e registra ciò che il browser effettivamente scarica ed esegue.

<TOC/>

> **tl;dr**: Sulla stessa app Vite + Vue 3, `vue-i18n` spedisce **134.9 KB** di JavaScript gzippato per pagina rispetto ai **41.3 KB** per l'app senza i18n. Intlayer spedisce **57.1 KB**. Il runtime di `vue-i18n` da solo pesa **24.3 KB gzip** (6x i 3.9 KB di Intlayer), ogni pagina porta **90% delle stringhe di pagine estere**, e un componente compilato in isolamento trascina **196 KB** perché è legato all'albero dei messaggi globale. L'adapter `@intlayer/vue-i18n` mantiene l'API di `vue-i18n` e ha misurato **47.0 KB** per pagina.

## In breve
