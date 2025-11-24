---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Perintah Live Sync
description: Pelajari cara menggunakan Live Sync untuk mencerminkan perubahan konten CMS saat runtime.
keywords:
  - Live Sync
  - CMS
  - Runtime
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# Perintah Live Sync

Live Sync memungkinkan aplikasi Anda mencerminkan perubahan konten CMS saat runtime. Tidak perlu membangun ulang atau menerapkan ulang. Saat diaktifkan, pembaruan dikirimkan ke server Live Sync yang menyegarkan kamus yang dibaca aplikasi Anda. Lihat [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk detail lebih lanjut.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Argumen:

**Opsi konfigurasi:**

- **`--base-dir`**: Tentukan direktori dasar untuk proyek. Untuk mengambil konfigurasi intlayer, perintah akan mencari file `intlayer.config.{ts,js,json,cjs,mjs}` di direktori dasar.

- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer dictionary push --env-file .env.production.local`

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)
