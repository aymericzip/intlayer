---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi paket react-native-intlayer
description: Dukungan React Native untuk Intlayer, menyediakan provider dan polyfill.
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket react-native-intlayer

Paket `react-native-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi React Native. Paket ini mencakup sebuah provider dan polyfill untuk dukungan locale.

## Instalasi

```bash
npm install react-native-intlayer
```

## Ekspor

### Provider

| Component          | Deskripsi                                                                         |
| ------------------ | --------------------------------------------------------------------------------- |
| `IntlayerProvider` | Komponen provider yang membungkus aplikasi Anda dan menyediakan konteks Intlayer. |

Impor:

```tsx
import "react-native-intlayer";
```

### Polyfill

| Function           | Deskripsi                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Fungsi yang menerapkan polyfill yang diperlukan untuk React Native agar mendukung Intlayer. |

Impor:

```tsx
import "react-native-intlayer";
```

### Konfigurasi Metro

Paket `react-native-intlayer` menyediakan utilitas konfigurasi Metro untuk memastikan bahwa Intlayer bekerja dengan benar di React Native.

| Fungsi                    | Deskripsi                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `configMetroIntlayer`     | Fungsi asinkron yang menyiapkan Intlayer dan menggabungkan konfigurasi Metro.              |
| `configMetroIntlayerSync` | Fungsi sinkron yang menggabungkan konfigurasi Metro tanpa menyiapkan sumber daya Intlayer. |
| `exclusionList`           | Membuat pola RegExp untuk blockList Metro guna mengecualikan file konten dari bundle.      |

Impor:

```tsx
import "react-native-intlayer/metro";
```
