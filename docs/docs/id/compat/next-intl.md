---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-intl: adaptor kompatibilitas untuk next-intl"
description: "Pertahankan kode next-intl Anda dan sajikan lewat Intlayer: pasang @intlayer/next-intl, buat alias untuk import, dan lihat apa yang diubah adaptor di balik layar."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# @intlayer/next-intl: adaptor kompatibilitas untuk next-intl

Untuk tutorial langkah demi langkah yang lengkap dan terperinci, silakan lihat [Panduan Migrasi next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-intl_to_intlayer.md) lengkap kami.

- [Panduan Migrasi next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-intl_to_intlayer.md)

Migrasi dari `next-intl` ke Intlayer memungkinkan Anda mempertahankan routing aplikasi dan sintaks Anda sepenuhnya tanpa gangguan.

## Yang perlu dilakukan

Jalankan perintah berikut di repositori Anda:

```bash
npx intlayer init --interactive
```

Ini akan membuat `intlayer.config.ts`. Di `next.config.ts` Anda, gunakan wrapper plugin untuk menyuntikkan alias `next-intl` ke `@intlayer/next-intl` secara mulus.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Yang terjadi di balik layar

Wrapper bundler mengganti terjemahan, tetapi **membiarkan fitur `next-intl/navigation` tetap utuh** (misalnya `Link`, `redirect`, `usePathname`).

Di balik layar:

- **Runtime ICU:** Plural (`=0`, `one`, `other`), select/selectordinal, argumen `#`, dan argumen terformat (`{ts, date, long}`) berjalan dengan benar menggunakan resolver `resolveMessage(..., 'icu')` bersama.
- **`useTranslations()` & `getTranslations()`:** Panggilan scope bare mengekstrak segmen kunci pertama sebagai pengenal kamus yang benar. Namespace bersarang secara elegan dibagi menjadi jalur kamus dan prefiks.
- **Pemformatan kaya:** Baik `t.rich()` maupun `t.markup()` diimplementasikan secara native sepenuhnya, mengonversi node mirip HTML menjadi chunk React yang dirender.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange`, dan format bernama dari konfigurasi dijembatani ke formatter `Intl` native inti.

> Untuk memahami asal-usul pustaka-pustaka ini, baca sejarah i18n di JavaScript.

- [Sejarah i18n di JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md)
