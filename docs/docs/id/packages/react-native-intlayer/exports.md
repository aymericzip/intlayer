---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: Dokumentasi paket react-native-intlayer
description: Dukungan React Native untuk Intlayer, menyediakan provider, hook, polyfill, dan konfigurasi Metro.
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Mengekspor ulang API react-intlayer secara lengkap (hook, utilitas, subpath format/html/markdown) sehingga aplikasi React Native hanya bergantung pada react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Dokumentasi terpadu untuk semua ekspor"
author: aymericzip
---

# Paket react-native-intlayer

Paket `react-native-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi React Native. Paket ini mengekspor ulang API `react-intlayer` secara lengkap (hook dan utilitas) dengan `IntlayerProvider` yang siap untuk React Native, ditambah polyfill dan konfigurasi Metro yang diperlukan oleh React Native.

> Dalam aplikasi React Native, impor **semua** dari `react-native-intlayer`. Anda tidak perlu menginstal atau mengimpor `react-intlayer` secara langsung.

## Instalasi

```bash
npm install react-native-intlayer
```

## Ekspor

### Provider

| Component          | Deskripsi                                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Komponen provider yang membungkus aplikasi Anda dan menyediakan konteks Intlayer. Secara otomatis menerapkan polyfill yang diperlukan. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hook dan utilitas

Berikut ini diekspor ulang dari `react-intlayer`, sehingga Anda dapat mengimpornya langsung dari `react-native-intlayer`:

| Ekspor                                                                                                            | Deskripsi                                             |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `useIntlayer`                                                                                                     | Mengakses konten yang dilokalisasi untuk kunci kamus. |
| `useLocale`                                                                                                       | Membaca dan mengubah locale saat ini.                 |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Memuat konten kamus dengan berbagai cara.             |
| `useI18n`                                                                                                         | Hook yang kompatibel dengan i18next.                  |
| `t`                                                                                                               | Helper terjemahan inline.                             |
| `getIntlayer`, `getDictionary`                                                                                    | Getter konten secara imperatif.                       |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Helper persistensi locale.                            |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| Function           | Deskripsi                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Fungsi yang menerapkan polyfill yang diperlukan untuk React Native agar mendukung Intlayer. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> Polyfill diterapkan secara otomatis saat Anda mengimpor `IntlayerProvider`. Panggil `intlayerPolyfill` secara manual hanya jika Anda memerlukan polyfill sebelum provider dipasang.

### Formatter

Hook pemformatan angka, tanggal, dan Intl-based lainnya tersedia dari subpath `/format`:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Rendering Markdown dan HTML

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Konfigurasi Metro

Paket `react-native-intlayer` menyediakan utilitas konfigurasi Metro untuk memastikan bahwa Intlayer bekerja dengan benar di React Native.

| Fungsi                    | Deskripsi                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `configMetroIntlayer`     | Fungsi asinkron yang menyiapkan Intlayer dan menggabungkan konfigurasi Metro.              |
| `configMetroIntlayerSync` | Fungsi sinkron yang menggabungkan konfigurasi Metro tanpa menyiapkan sumber daya Intlayer. |
| `exclusionList`           | Membuat pola RegExp untuk blockList Metro guna mengecualikan file konten dari bundle.      |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
