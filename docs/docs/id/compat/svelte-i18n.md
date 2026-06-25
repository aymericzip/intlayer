---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari Svelte I18n ke Intlayer"
description: "Pelajari cara migrasi aplikasi Svelte Anda dari svelte-i18n ke Intlayer menggunakan adapter kompatibilitas."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Migrasi dari Svelte I18n ke Intlayer

Memindahkan aplikasi Svelte Anda dari `svelte-i18n` ke Intlayer hanya membutuhkan sebentar menggunakan adapter kompatibilitas.

## Yang perlu dilakukan

Cukup jalankan perintah inisialisasi di proyek Anda:

```bash
npx intlayer init
```

Ini menghasilkan `intlayer.config.ts`. Pastikan plugin SvelteKit / Vite Anda dibungkus dengan plugin alias Intlayer untuk memetakan `svelte-i18n` ke `@intlayer/svelte-i18n` secara mulus.

## Yang terjadi di balik layar

Svelte-i18n mengandalkan store yang banyak digunakan (`$_`, `$t`, `$format`, dll.) dan ICU MessageFormat.

Di balik layar:

- **Store:** Intlayer mem-proxy store `svelte-i18n`. `$_` menjadi derived store dari lokal saat ini yang mengembalikan resolver Intlayer.
- **Kunci:** Kunci datar Anda (misalnya `$_('home.title')`) dievaluasi sehingga segmen jalur pertama mewakili kamus Intlayer.
- **Sintaks ICU:** Ditangani sepenuhnya oleh resolver ICU bersama (parsing setara `intl-messageformat`).
- **Formatter:** Panggilan `$date`, `$time`, `$number` dialihkan dengan aman ke formatter inti native Intlayer.
- **Analisis Babel/SWC:** Analyzer Intlayer membaca pemanggil store Svelte (`$_`) di dalam file sumber `.svelte` Anda sebelum kompilasi untuk secara otomatis membangun chunk kamus yang relevan.
