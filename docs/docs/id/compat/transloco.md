---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari Transloco ke Intlayer"
description: "Pelajari cara migrasi aplikasi Angular Anda dari Transloco ke Intlayer menggunakan adapter kompatibilitas."
keywords:
  - transloco
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Migrasi dari Transloco ke Intlayer

Jika aplikasi Angular Anda saat ini menggunakan `@jsverse/transloco`, Anda dapat migrasi ke Intlayer menggunakan adapter kompatibilitas kami. Transisi ini memungkinkan Anda mempertahankan sintaks template yang ada sambil memanfaatkan struktur kamus Intlayer yang powerful.

## Yang perlu dilakukan

Cukup jalankan perintah inisialisasi di proyek Anda:

```bash
npx intlayer init
```

Ini akan menghasilkan konfigurasi `intlayer.config.ts` yang diperlukan. Anda kemudian akan mengganti impor Transloco dengan modul `@intlayer/transloco` atau mengandalkan alias build.

## Yang terjadi di balik layar

Transloco menggunakan scope dan `TranslocoService` (`translate`, `selectTranslate`), bersama direktif struktural (`*transloco="let t"`) dan pipe (`| transloco`).

Di balik layar:

- **Scope:** Dipetakan secara alami ke kunci kamus Intlayer, memberikan cerita pemangkasan yang bagus untuk optimasi bundle.
- **Layanan & Direktif:** Adapter Angular Intlayer mengganti provider secara mulus, memungkinkan pipe dan direktif template yang ada untuk menyelesaikan string terhadap kamus Intlayer.
- **Parsing waktu build:** Analyzer TypeScript mengenali panggilan `instant/get`, dan pemangkasan fallback memastikan kebenaran bahkan ketika penggunaan template tidak dapat dilacak secara statis.
