---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari Lingui ke Intlayer"
description: "Pelajari cara migrasi aplikasi Anda dari Lingui ke Intlayer menggunakan adapter kompatibilitas."
keywords:
  - lingui
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Migrasi dari Lingui ke Intlayer

Jika proyek Anda saat ini mengandalkan kompilasi berbasis macro dari Lingui, transisi ke Intlayer memungkinkan Anda mempertahankan alur kerja macro yang powerful sambil mendukungnya secara native dengan strategi kompilasi JSON Intlayer.

## Yang perlu dilakukan

Untuk memulai, inisialisasi Intlayer di proyek Anda:

```bash
npx intlayer init
```

Ini akan membuat `intlayer.config.ts` Anda. Pastikan Anda tetap mempertahankan `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` di langkah build Anda untuk dijalankan _sebelum_ compiler Intlayer. Kemudian, gunakan alias plugin bundler untuk merutekan `@lingui/core` dan `@lingui/react` ke `@intlayer/lingui`.

## Yang terjadi di balik layar

Lingui menggunakan macro (seperti `` t`Hello ${name}` `` dan `<Trans>`) yang dikompilasi menjadi panggilan runtime seperti `i18n._(id, values)`.

Di balik layar:

- **Macro:** Mereka dikompilasi persis seperti sebelumnya, memastikan tidak ada gangguan dalam sintaks sumber Anda.
- **Terjemahan runtime:** `i18n._()` yang dialiaskan menggunakan kamus Intlayer. ID yang diberi nama secara eksplisit maupun ID yang di-hash sepenuhnya dipetakan menggunakan plugin sinkronisasi `.po` Intlayer untuk mengagregasi dan memangkas kunci secara aman.
- **Kemampuan ICU:** Dukungan untuk pluralisasi, seleksi, dan varian ICU tetap kuat berkat parser ICU terpadu Intlayer, memastikan output rendering yang identik.
