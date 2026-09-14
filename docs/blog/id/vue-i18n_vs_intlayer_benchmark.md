---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: Benchmark 2026"
description: vue-i18n dan Intlayer diukur pada aplikasi Vite + Vue 3 yang sama. Ukuran library, JavaScript per-halaman, content leakage, ukuran komponen dan reaktivitas locale-switch, dengan angka-angka yang dijelaskan.
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

# vue-i18n VS Intlayer | Benchmark Internasionalisasi (i18n) Vue

`vue-i18n` adalah library i18n referensi untuk Vue. Intlayer adalah alternatif berbasis compiler, scoped-component dengan integrasi Vue (`vue-intlayer`). Kami sudah membandingkan [fitur dan developer experience](https://intlayer.org/blog/vue-i18n-vs-intlayer) mereka. Artikel ini melihat apa yang masing-masing biayai setelah app dibangun.

Data berasal dari [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), sebuah suite open-source yang membangun aplikasi yang sama dengan setiap library dan mencatat apa yang sebenarnya browser unduh dan jalankan.

<TOC/>

> **tl;dr**: Pada aplikasi Vite + Vue 3 yang sama, `vue-i18n` mengirimkan **134.9 KB** JavaScript ter-gzip per halaman dibandingkan **41.3 KB** untuk aplikasi tanpa i18n. Intlayer mengirimkan **57.1 KB**. Runtime `vue-i18n` sendiri memiliki berat **24.3 KB gzip** (6x lebih berat dari Intlayer's 3.9 KB), setiap halaman membawa **90% string halaman asing**, dan komponen yang dikompilasi secara terisolasi membawa **196 KB** karena terikat pada pohon pesan global. Adapter `@intlayer/vue-i18n` mempertahankan API `vue-i18n` dan diukur pada **47.0 KB** per halaman.

## Singkatnya

- **vue-i18n** - Perpustakaan i18n de-facto untuk Vue 2 / Vue 3 dan inti dari `@nuxtjs/i18n`. Pesan gaya ICU, blok `<i18n>` SFC, directive `v-t`, formatter `d()` / `n()`, ekosistem besar. Pesan didaftarkan pada instance global di `createI18n()`; lazy loading per locale adalah pola manual `setLocaleMessage()`, dan pemisahan per-route adalah tugas Anda sendiri.
- **Intlayer** - Model konten yang berpusat pada komponen. Kamus `.content.ts` duduk di sebelah komponen yang mereka layani, compiler build-time (`vite-intlayer`) tree-shakes dan lazy-loads mereka per komponen dan per locale, tipe TypeScript yang ketat dihasilkan dari konten Anda, dan terjemahan yang hilang gagal pada build time. Dilengkapi dengan helper router / SEO, Visual Editor / CMS dan terjemahan berbantuan AI.

| Perpustakaan          | GitHub Stars                                                                                                                                                                   | Total Commits                                                                                                                                                                      | Last Commit                                                                                                                                         | First Version | NPM Version                                                                                                 | NPM Downloads                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
