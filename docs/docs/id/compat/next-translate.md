---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari Next Translate ke Intlayer"
description: "Pelajari cara migrasi aplikasi Next.js Anda dari next-translate ke Intlayer menggunakan adapter kompatibilitas."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Migrasi dari Next Translate ke Intlayer

Migrasi dari `next-translate` ke Intlayer adalah penggantian drop-in yang hampir sempurna yang mempertahankan sintaks dan tag yang ada.

## Yang perlu dilakukan

Inisialisasi Intlayer di proyek Anda:

```bash
npx intlayer init
```

CLI akan membuat scaffolding konfigurasi Anda. Anda kemudian dapat menerapkan plugin Intlayer di `next.config.ts` Anda, yang menyuntikkan alias subpath waktu build yang memetakan `next-translate/useTranslation` ke `@intlayer/next-translate`.

## Yang terjadi di balik layar

`next-translate` menyediakan hook seperti `useTranslation('ns')`, `t('ns:key.path')`, dan komponen `<Trans>`.

Di balik layar:

- **Interpolasi & Plural:** Ini sangat bergantung pada perilaku adapter `react-i18next`. Placeholder `{{var}}` dan pluralisasi yang dipetakan dari sufiks seperti `key_0`, `key_one`, dan `key_other` ditangani secara dinamis.
- **Komponen `<Trans>`:** Didukung langsung untuk parsing tag mirip HTML bersama prop `components` berbasis array.
- **Namespace:** Aliasing subpath memastikan bahwa `useTranslation` Anda mereferensikan namespace kamus internal yang benar tanpa modifikasi manual.
