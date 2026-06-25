---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari i18next ke Intlayer"
description: "Pelajari cara migrasi aplikasi Vanilla JS/TS Anda dari i18next ke Intlayer menggunakan adapter kompatibilitas."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Migrasi dari i18next ke Intlayer

Untuk tutorial langkah demi langkah yang terperinci, silakan lihat [Panduan Migrasi i18next](../migration_from_i18next_to_intlayer.md) lengkap kami.

Intlayer mereplikasi dengan sempurna karakteristik runtime inti dari `i18next`. Dengan memanfaatkan paket kompatibilitas, aplikasi Vanilla Anda atau modul internal dapat terus menggunakan sintaks yang familiar.

## Yang perlu dilakukan

Untuk memulai, inisialisasi Intlayer di proyek Anda:

```bash
npx intlayer init
```

Jika Anda menggunakan Vite, sertakan plugin Intlayer untuk merutekan impor ke `@intlayer/i18next`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## Yang terjadi di balik layar

`i18nextVitePlugin` mengaliaskan impor `i18next` ke `@intlayer/i18next`, menghindari pembengkakan bundle dari penyertaan file JSON.

Di balik layar:

- **Konfigurasi instance:** `createInstance` dengan benar mengurai dan menerapkan fallback namespace sambil memanfaatkan pipeline kompilasi Intlayer untuk pengambilan kamus.
- **Interpolasi:** Dukungan native untuk penggantian `{{name}}` dan nesting `$t(key)` secara rekursif.
- **Konteks & Plural:** Mengidentifikasi dan menyelesaikan format sufiks seperti `key_male` dan `key_one`/`key_other` yang dievaluasi terhadap `Intl.PluralRules` standar.
- **Mengembalikan objek:** Mode `returnObjects: true` dengan aman mengekstrak tree dari kamus Intlayer.
