---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari i18n-js ke Intlayer"
description: "Pelajari cara migrasi aplikasi Anda dari i18n-js ke Intlayer menggunakan adapter kompatibilitas."
keywords:
  - i18n-js
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Migrasi dari i18n-js ke Intlayer

Transisi dari library `i18n-js` ke Intlayer adalah migrasi yang sangat dioptimalkan, dirancang untuk memindahkan konfigurasi terjemahan besar ke sistem resolusi file terstruktur Intlayer.

## Yang perlu dilakukan

Jalankan perintah setup berikut di repositori Anda:

```bash
npx intlayer init
```

Setelah `intlayer.config.ts` disiapkan, Anda dapat menambahkan alias Intlayer ke konfigurasi bundler Anda sehingga impor apa pun dari `i18n-js` mengarah ke paket kompatibilitas `@intlayer/i18n-js`.

## Yang terjadi di balik layar

`i18n-js` mengakses namespace melalui ekspresi seperti `i18n.t('scope.key', {name})` bersama dengan fallback lokal dan pemetaan plural tertentu.

Di balik layar:

- **Interpolasi:** Adapter kompatibilitas dengan mudah mengurai pemetaan `%{name}` ke nilai kamus runtime yang ditargetkan.
- **Pluralisasi:** Mengganti subkunci `one/other` dan memetakannya terhadap mekanisme plural yang mendasari Intlayer yang powerful (`Intl.PluralRules`), mengabstraksikan pemetaan manual.
- **Lokal:** Alih-alih memuat payload bahasa monolitik saat bootstrap, kamus disajikan secara optimal berdasarkan pengaturan konteks saat ini melalui konfigurasi Intlayer native.
