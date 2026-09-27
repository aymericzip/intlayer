---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-i18next: adaptor kompatibilitas untuk next-i18next"
description: "Pertahankan kode next-i18next Anda dan sajikan lewat Intlayer: pasang @intlayer/next-i18next, buat alias untuk import, dan lihat apa yang diubah adaptor di balik layar."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# @intlayer/next-i18next: adaptor kompatibilitas untuk next-i18next

Untuk tutorial langkah demi langkah yang lengkap dan terperinci, silakan lihat [Panduan Migrasi next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-i18next_to_intlayer.md) lengkap kami.

Intlayer menangani semua implementasi Pages Router dan App Router Next.js secara transparan. Menggunakan adapter memungkinkan Anda migrasi implementasi `next-i18next` tanpa penulisan ulang kode sama sekali.

## Yang perlu dilakukan

Untuk memulai, jalankan:

```bash
npx intlayer init --interactive
```

Ini membuat file setup Intlayer yang diperlukan. Untuk beralih ke Intlayer di balik layar, perbarui `next.config.ts` Anda:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Yang terjadi di balik layar

`createNextI18nPlugin` mengomposisikan perilaku native Next.js bersama plugin inti `next-intlayer`, menyuntikkan semua alias Webpack/Turbopack yang diperlukan untuk `next-i18next`, `react-i18next`, dan `i18next`.

Di balik layar:

- **`serverSideTranslations` & `appWithTranslation`:** Keduanya kini berfungsi sebagai wrapper untuk loader internal Intlayer, menghindari injeksi JSON statis yang besar.
- **Hook klien:** Mendelegasikan langsung ke `@intlayer/react-i18next` yang mempertahankan semua fitur pemformatan, plural, dan namespace bersarang.

> Untuk memahami asal-usul pustaka-pustaka ini, baca sejarah i18n di JavaScript.

- [Sejarah i18n di JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md)
