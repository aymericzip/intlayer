---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari next-intl ke Intlayer"
description: "Pelajari cara migrasi aplikasi Next.js Anda dari next-intl ke Intlayer menggunakan adapter kompatibilitas."
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

# Migrasi dari next-intl ke Intlayer

Untuk tutorial langkah demi langkah yang lengkap dan terperinci, silakan lihat [Panduan Migrasi next-intl](../migration_from_next-intl_to_intlayer.md) lengkap kami.

Migrasi dari `next-intl` ke Intlayer memungkinkan Anda mempertahankan routing aplikasi dan sintaks Anda sepenuhnya tanpa gangguan.

## Yang perlu dilakukan

Jalankan perintah berikut di repositori Anda:

```bash
npx intlayer init
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
