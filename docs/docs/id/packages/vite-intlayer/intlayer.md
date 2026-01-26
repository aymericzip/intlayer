---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Plugin Vite intlayer | vite-intlayer
description: Pelajari cara menggunakan plugin intlayer untuk paket vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Dokumentasi Plugin Vite intlayer

Plugin Vite `intlayer` mengintegrasikan konfigurasi Intlayer ke dalam proses build. Plugin ini menangani alias kamus, memulai watcher kamus dalam mode pengembangan, dan mempersiapkan kamus untuk proses build.

## Penggunaan

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Deskripsi

Plugin melakukan tugas-tugas berikut:

1. **Menyiapkan Kamus**: Mengompilasi kamus ke dalam berkas yang dioptimalkan saat proses build atau dev dimulai.
2. **Mode Watch**: Dalam mode pengembangan, memantau perubahan pada berkas kamus dan mengompilasinya kembali secara otomatis.
3. **Alias**: Menyediakan alias untuk mengakses kamus di aplikasi Anda.
4. **Tree-shaking**: Mendukung tree-shaking untuk terjemahan yang tidak digunakan melalui plugin `intlayerPrune`.
