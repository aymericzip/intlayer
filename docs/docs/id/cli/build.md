---
createdAt: 2024-08-11
updatedAt: 2026-09-12
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
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "Menambahkan flag `--ci`"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Tambahkan opsi checkTypes"
author: aymericzip
---

# Bangun Kamus

Untuk membangun kamus Anda, Anda dapat menjalankan perintah:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

atau dalam mode watch

```bash packageManager="npm"
npx intlayer build --watch
```

```bash packageManager="yarn"
yarn intlayer build --watch
```

```bash packageManager="pnpm"
pnpm intlayer build --watch
```

```bash packageManager="bun"
bun x intlayer build --watch
```

Perintah ini akan mencari file deklarasi konten Anda secara default di `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. Dan membangun kamus di direktori `.intlayer`.

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

- **`--ci`**: Menjalankan perintah di setiap proyek Intlayer dalam monorepo (atau hanya proyek saat ini jika dijalankan dari direktori proyek). Kredensial per proyek dapat disuntikkan melalui `INTLAYER_PROJECT_CREDENTIALS`, sebuah objek JSON yang memetakan path proyek ke `{ "clientId", "clientSecret" }`.

  > Contoh: `npx intlayer build --ci`

- **`--check-types`**: Memeriksa tipe file deklarasi konten.

  > Contoh: `npx intlayer build --check-types`
