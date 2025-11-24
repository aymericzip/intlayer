---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Bangun Kamus
description: Pelajari cara membangun kamus Intlayer Anda dari file deklarasi konten.
keywords:
  - Bangun
  - Kamus
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# Bangun Kamus

Untuk membangun kamus Anda, Anda dapat menjalankan perintah:

```bash
npx intlayer build
```

atau dalam mode watch

```bash
npx intlayer build --watch
```

Perintah ini akan mencari file deklarasi konten Anda secara default di `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Dan membangun kamus di direktori `.intlayer`.

## Alias:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Argumen:

- **`--base-dir`**: Tentukan direktori dasar untuk proyek. Untuk mengambil konfigurasi intlayer, perintah akan mencari file `intlayer.config.{ts,js,json,cjs,mjs}` di direktori dasar.

  > Contoh: `npx intlayer build --base-dir ./src`

- **`--env`**: Tentukan lingkungan (misalnya, `development`, `production`). Berguna jika Anda menggunakan variabel lingkungan dalam file konfigurasi intlayer Anda.

  > Contoh: `npx intlayer build --env production`

- **`--env-file`**: Sediakan file lingkungan khusus untuk memuat variabel. Berguna jika Anda menggunakan variabel lingkungan dalam file konfigurasi intlayer Anda.

  > Contoh: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Mulai perintah secara paralel dengan proses build.

  > Contoh: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Lewati langkah prepare.

  > Contoh: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer build --no-cache`
