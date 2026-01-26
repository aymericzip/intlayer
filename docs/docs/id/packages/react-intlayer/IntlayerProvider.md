---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Komponen IntlayerProvider | react-intlayer
description: Lihat cara menggunakan komponen IntlayerProvider untuk paket react-intlayer
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Inisialisasi dokumen
---

# Dokumentasi Komponen IntlayerProvider

Komponen `IntlayerProvider` adalah provider utama untuk Intlayer dalam aplikasi React. Ia menyediakan konteks Intlayer ke semua children-nya.

## Penggunaan

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Properti

| Properti          | Tipe                              | Deskripsi                                                    |
| ----------------- | --------------------------------- | ------------------------------------------------------------ |
| `locale`          | `LocalesValues`                   | Locale awal yang digunakan.                                  |
| `defaultLocale`   | `LocalesValues`                   | Locale default yang digunakan sebagai fallback.              |
| `setLocale`       | `(locale: LocalesValues) => void` | Fungsi kustom untuk mengatur locale.                         |
| `disableEditor`   | `boolean`                         | Menentukan apakah editor dinonaktifkan.                      |
| `isCookieEnabled` | `boolean`                         | Menentukan apakah cookies diaktifkan untuk menyimpan locale. |
