---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Paket lynx-intlayer
description: Dukungan Lynx untuk Intlayer, menyediakan polyfill untuk dukungan locale.
keywords:
  - lynx-intlayer
  - lynx
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket lynx-intlayer

Paket `lynx-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Lynx.

## Instalasi

```bash
npm install lynx-intlayer
```

## Ekspor

### Polyfill

Impor:

```tsx
import "lynx-intlayer";
```

| Fungsi             | Deskripsi                                                                     |
| ------------------ | ----------------------------------------------------------------------------- |
| `intlayerPolyfill` | Fungsi yang menerapkan polyfill yang diperlukan agar Lynx mendukung Intlayer. |

### Plugin Rsbuild

Paket `lynx-intlayer` menyediakan plugin Rsbuild untuk mengintegrasikan Intlayer ke dalam proses build Lynx.

Import:

```tsx
import "lynx-intlayer";
```

| Fungsi               | Deskripsi                                                                 |
| -------------------- | ------------------------------------------------------------------------- |
| `pluginIntlayerLynx` | Plugin Rsbuild yang mengintegrasikan Intlayer ke dalam proses build Lynx. |
