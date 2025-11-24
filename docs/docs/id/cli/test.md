---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Uji Terjemahan yang Hilang
description: Pelajari cara menguji dan mengidentifikasi terjemahan yang hilang dalam kamus Anda.
keywords:
  - Uji
  - Terjemahan yang Hilang
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Uji terjemahan yang hilang

```bash
npx intlayer content test
```

## Alias:

- `npx intlayer test`

Perintah ini menganalisis file deklarasi konten Anda untuk mengidentifikasi terjemahan yang hilang di semua locale yang dikonfigurasi. Ini memberikan laporan komprehensif yang menunjukkan kunci terjemahan mana yang hilang untuk locale mana, membantu Anda menjaga konsistensi di seluruh konten multibahasa Anda.

## Contoh output:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Missing required locales: -
Total missing locales: 3
Total missing required locales: 0
```

## Argumen:

**Opsi konfigurasi:**

- **`--env`**: Tentukan environment (misalnya, `development`, `production`).
- **`--env-file [envFile]`**: Berikan file environment khusus untuk memuat variabel.
- **`--base-dir`**: Tentukan direktori dasar untuk proyek.

  > Contoh: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer build --no-cache`

**Opsi persiapan:**

- **`--build`**: Bangun kamus sebelum melakukan push untuk memastikan konten terbaru. True akan memaksa build, false akan melewati build, undefined akan menggunakan cache dari build.

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

  > Contoh: `npx intlayer content test --verbose`

## Contoh:

```bash
npx intlayer content test --verbose
```

Output membantu Anda dengan cepat mengidentifikasi terjemahan mana yang perlu diselesaikan agar aplikasi Anda berfungsi dengan baik di semua locale yang dikonfigurasi.
