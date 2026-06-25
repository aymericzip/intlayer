---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari react-i18next ke Intlayer"
description: "Pelajari cara migrasi aplikasi React Anda dari react-i18next ke Intlayer menggunakan adapter kompatibilitas."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Migrasi dari react-i18next ke Intlayer

Untuk tutorial langkah demi langkah yang lengkap dan terperinci, silakan lihat [Panduan Migrasi react-i18next](../migration_from_react-i18next_to_intlayer.md) lengkap kami.

Menggunakan adapter kompatibilitas Intlayer memungkinkan Anda migrasi dari `react-i18next` tanpa perubahan apa pun pada impor kode sumber Anda.

## Yang perlu dilakukan

Untuk menginisialisasi proyek, jalankan:

```bash
npx intlayer init
```

Selama inisialisasi, Intlayer akan menginstal `@intlayer/react-i18next` dan membuat `intlayer.config.ts`. Di bundler Anda (seperti Vite), terapkan plugin Intlayer:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## Yang terjadi di balik layar

`reactI18nextVitePlugin` membungkus plugin inti `vite-intlayer` dan menyuntikkan alias resolve untuk `react-i18next` dan `i18next`, mengalihkannya ke `@intlayer/react-i18next` dan `@intlayer/i18next`.

Di balik layar:

- **`useTranslation` & `withTranslation`:** Ditulis ulang untuk menggunakan hook native Intlayer, memberikan Anda penyelesaian TypeScript otomatis untuk kunci kamus Anda. Ini mendukung namespace dengan mulus (misalnya `t('namespace:key')`).
- **Plural & Konteks:** Menangani pluralisasi berbasis sufiks i18next (`key_one`, `key_other`) menggunakan `Intl.PluralRules` native dan sufiks konteks (`key_male`).
- **Komponen `<Trans>`:** Diimplementasikan ulang untuk mendukung prop `components`, bentuk objek dan array, serta tag bernomor `<1>...</1>` yang langsung dipetakan ke node React Anda.
- **Instance `i18n`:** Menyelesaikan kunci langsung dari Intlayer tanpa mengambil file JSON yang besar, menghasilkan ukuran bundle yang jauh lebih kecil.
