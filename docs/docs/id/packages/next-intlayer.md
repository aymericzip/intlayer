---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Paket next-intlayer
description: Integrasi khusus Next.js untuk Intlayer, menyediakan middleware dan provider untuk App Router dan Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket next-intlayer

Paket `next-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Next.js. Paket ini mendukung baik App Router maupun Page Router, termasuk middleware untuk routing berbasis locale.

## Instalasi

```bash
npm install next-intlayer
```

## Ekspor

### Middleware

| Fungsi               | Deskripsi                                                                     |
| -------------------- | ----------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware Next.js untuk menangani routing dan pengalihan berdasarkan locale. |

### Penyedia

| Komponen                 | Deskripsi                                                    |
| ------------------------ | ------------------------------------------------------------ |
| `IntlayerClientProvider` | Provider untuk komponen sisi klien di Next.js.               |
| `IntlayerServerProvider` | Provider untuk komponen sisi server di Next.js (App Router). |

### Hooks (Sisi Klien)

Mengekspor ulang sebagian besar hook dari `react-intlayer`.

| Hook            | Deskripsi                                                                 |
| --------------- | ------------------------------------------------------------------------- |
| `useIntlayer`   | Memilih satu dictionary berdasarkan kuncinya dan mengembalikan kontennya. |
| `useDictionary` | Memilih satu dictionary berdasarkan kuncinya dan mengembalikan kontennya. |
| `useLocale`     | Mengembalikan locale saat ini dan sebuah fungsi untuk mengaturnya.        |
| `useI18n`       | Mengembalikan nilai-nilai konteks Intlayer saat ini.                      |

### Fungsi (Server-side)

| Function               | Deskripsi                                                     |
| ---------------------- | ------------------------------------------------------------- |
| `t`                    | Versi server dari fungsi terjemahan untuk Next.js App Router. |
| `generateStaticParams` | Menghasilkan parameter statis untuk route dinamis Next.js.    |

### Tipe

| Tipe                 | Deskripsi                                            |
| -------------------- | ---------------------------------------------------- |
| `NextPageIntlayer`   | Tipe untuk halaman Next.js dengan dukungan Intlayer. |
| `NextLayoutIntlayer` | Tipe untuk layout Next.js dengan dukungan Intlayer.  |
