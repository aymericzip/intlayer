---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs @intlayer/vue-i18n: API yang Sama, Bundle Berbeda"
description: Apa yang berubah ketika aplikasi Vue 3 menyimpan panggilan vue-i18n-nya tetapi melayaninya melalui adapter kompatibilitas @intlayer/vue-i18n. JavaScript per halaman, ukuran runtime, ukuran komponen dan kebocoran diukur pada kode Vite + Vue yang sama, ditambah apa yang adapter simpan, abaikan dan tidak dapat gantikan.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migrasi
  - Internasionalisasi
  - i18n
  - Benchmark
  - Ukuran bundle
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VERSUS @intlayer/vue-i18n | API yang Sama, Bundle Berbeda

`@intlayer/vue-i18n` adalah adapter kompatibilitas: ini mengekspos API `vue-i18n` (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) dan melayaninya dari kamus yang dikompilasi oleh Intlayer. File `.vue` Anda tidak berubah. Apa yang terikat pada `t("footer.github")` yang berubah.

Artikel ini mengukur pertukaran tersebut pada aplikasi Vite + Vue 3 yang sama, dibangun sekali dengan `vue-i18n` dan sekali dengan adapter. Angka-angka tersebut berasal dari [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Untuk perbandingan `vue-i18n` dan Intlayer sebagai library, baca [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) dan [benchmark vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark). Yang ini tentang apa yang berubah adapter ketika Anda mempertahankan komponen seperti apa adanya.

<TOC/>

> **tl;dr**: Pada aplikasi Vite + Vue 3 yang sama, mengganti `vue-i18n` dengan `@intlayer/vue-i18n` mengurangi JavaScript per-halaman dari **134.9 KB menjadi 47.0 KB** gzip (aplikasi tanpa i18n berukuran 41.3 KB), runtime dari **24.3 KB menjadi 7.9 KB**, rata-rata komponen dari **196 KB menjadi 8.4 KB**, dan kebocoran string halaman asing dari **90% menjadi 0%**, tanpa mengedit file `.vue` apa pun. `createI18n({ messages })` terus berfungsi sebagai fallback; hapus impor JSON untuk mendapatkan angka di atas. Blok SFC `<i18n>` dan `setLocaleMessage()` runtime adalah dua fitur yang tidak terbawa.

## Apa itu `@intlayer/vue-i18n`
