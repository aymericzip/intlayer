---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Pantau Kamus
description: Pelajari cara memantau perubahan pada file deklarasi konten Anda dan secara otomatis membangun kamus.
keywords:
  - Pantau
  - Kamus
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
author: aymericzip
---

# Pantau Kamus

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
```

Perintah ini akan memantau perubahan pada file deklarasi konten Anda dan membangun kamus di direktori `.intlayer`.
Perintah ini setara dengan `npx intlayer build --watch --skip-prepare`.

## Alias:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Argumen:

- **`--with`**: Mulai perintah secara paralel dengan pemantauan.

> Contoh: `npx intlayer watch --with "next dev --turbopack"`

- **`--ci`**: Menjalankan perintah di setiap proyek Intlayer dalam monorepo (atau hanya proyek saat ini jika dijalankan dari direktori proyek). Kredensial per proyek dapat disuntikkan melalui `INTLAYER_PROJECT_CREDENTIALS`, sebuah objek JSON yang memetakan path proyek ke `{ "clientId", "clientSecret" }`.

> Contoh: `npx intlayer watch --ci`
