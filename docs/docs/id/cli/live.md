---
createdAt: 2024-08-11
updatedAt: 2026-09-12
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
author: aymericzip
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

- **`--ci`**: Menjalankan perintah di setiap proyek Intlayer dalam monorepo (atau hanya proyek saat ini jika dijalankan dari direktori proyek). Kredensial per proyek dapat disuntikkan melalui `INTLAYER_PROJECT_CREDENTIALS`, sebuah objek JSON yang memetakan path proyek ke `{ "clientId", "clientSecret" }`.

  > Contoh: `npx intlayer live --ci`

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)
