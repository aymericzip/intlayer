---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket vite-intlayer
description: Plugin Vite untuk Intlayer, menyediakan alias kamus dan watchers.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Paket vite-intlayer

Paket `vite-intlayer` menyediakan plugin Vite untuk mengintegrasikan Intlayer ke dalam aplikasi berbasis Vite Anda.

## Instalasi

```bash
npm install vite-intlayer
```

## Ekspor

### Plugin

Impor:

```tsx
import "vite-intlayer";
```

| Fungsi               | Deskripsi                                                                                | Dokumen Terkait                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Plugin Vite utama yang mengintegrasikan Intlayer ke dalam proses build.                  | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Tidak lagi digunakan**) Alias untuk `intlayer`.                                       | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Plugin middleware pengembangan untuk menangani deteksi locale dan routing.               | -                                                                                                                      |
| `intlayerMiddleware` | (**Tidak lagi digunakan**) Alias untuk `intlayerProxy`.                                  | -                                                                                                                      |
| `intlayerPrune`      | Plugin untuk melakukan tree-shake dan memangkas kamus yang tidak digunakan selama build. | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayerPrune.md) |
