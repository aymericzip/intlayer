---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari NGX-Translate ke Intlayer"
description: "Pelajari cara migrasi aplikasi Angular Anda dari ngx-translate ke Intlayer menggunakan adapter kompatibilitas."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Migrasi dari NGX-Translate ke Intlayer

Migrasi aplikasi Angular Anda dari `ngx-translate` ke Intlayer mudah dilakukan dengan adapter kompatibilitas, memungkinkan Anda melewati kebutuhan untuk menulis ulang semua template Anda.

## Yang perlu dilakukan

Mulai dengan menjalankan:

```bash
npx intlayer init
```

Ini menyiapkan `intlayer.config.ts`. Ganti pengaturan `TranslateModule.forRoot()` Anda dan impor alias yang sesuai untuk menunjuk ke `@intlayer/ngx-translate`.

## Yang terjadi di balik layar

`ngx-translate` menggunakan `TranslateService` (`instant`, `get`, `stream`) bersama pipe `{{ 'KEY' | translate:params }}` dan direktif `[translate]`.

Di balik layar:

- **Layanan:** `TranslateService` membungkus `getIntlayer` dan observable lokal, menyediakan metode yang sama persis.
- **Pipe & Direktif:** Diimplementasikan ulang untuk menyelesaikan langsung terhadap kamus Intlayer.
- **Loader:** Pengaturan `TranslateHttpLoader` dikonversi menjadi stub peringatan karena Intlayer secara inheren menyelesaikan dan membundel kamus Anda saat waktu build (atau melalui dynamic import standar), sepenuhnya menghilangkan kebutuhan akan HTTP loader.
