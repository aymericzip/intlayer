---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Dokumentasi Plugin Vite | vite-intlayer
description: Lihat cara menggunakan plugin intlayerPrune untuk paket vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Dokumentasi Plugin intlayerPrune untuk Vite

Plugin Vite `intlayerPrune` digunakan untuk melakukan tree-shaking dan memangkas kamus yang tidak terpakai dari bundle aplikasi Anda. Ini membantu mengurangi ukuran bundle akhir dengan hanya menyertakan konten multibahasa yang diperlukan.

## Penggunaan

```ts
// vite.config.ts (konfigurasi Vite)
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Deskripsi

Plugin ini menganalisis kode sumber Anda untuk mengidentifikasi kunci kamus mana yang benar-benar digunakan. Setelah itu, plugin akan menghapus konten yang tidak terpakai dari file kamus yang dibundel. Ini sangat berguna untuk proyek besar dengan banyak kamus di mana hanya sebagian yang digunakan pada halaman atau komponen tertentu.
