---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari Polyglot.js ke Intlayer"
description: "Pelajari cara migrasi dari Polyglot.js ke Intlayer menggunakan adapter kompatibilitas."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Migrasi dari Polyglot.js ke Intlayer

Jika Anda menggunakan Polyglot.js dari Airbnb, migrasi ke Intlayer sangat mudah menggunakan lapisan kompatibilitas.

## Yang perlu dilakukan

Cukup jalankan perintah inisialisasi di proyek Anda:

```bash
npx intlayer init
```

Ini menghasilkan `intlayer.config.ts`. Anda kemudian dapat menggunakan alias plugin bundler untuk secara transparan mengalihkan impor Polyglot ke `@intlayer/polyglot`.

## Yang terjadi di balik layar

Sintaks Polyglot.js biasanya bergantung pada `polyglot.t('key', {name})` dengan interpolasi `%{name}` dan plural `smart_count` yang dipisahkan oleh `"singular |||| plural"`.

Di balik layar:

- **Interpolasi:** Lapisan kompatibilitas menangani placeholder `%{var}` secara native.
- **Plural:** String dibagi pada `||||` dan dievaluasi terhadap `Intl.PluralRules` native sesuai dengan lokal aktif, mencerminkan urutan bucket Polyglot sendiri per lokal.
- **Kamus:** Anda melewati kebutuhan untuk menyediakan konfigurasi JSON yang besar ke `new Polyglot()` - Intlayer menangani kamus secara dinamis dan memangkasnya secara otomatis.
