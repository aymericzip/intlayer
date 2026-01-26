---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket next-intlayer
description: Integrasi khusus Next.js untuk Intlayer, menyediakan middleware dan providers untuk App Router dan Page Router.
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
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket next-intlayer

Paket `next-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Next.js. Ini mendukung baik App Router maupun Page Router, termasuk middleware untuk routing berbasis locale.

## Instalasi

```bash
npm install next-intlayer
```

## Ekspor

### Middleware

Impor:

```tsx
import "next-intlayer/middleware";
```

| Fungsi               | Deskripsi                                                                                                                                                     | Dokumen Terkait                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware Next.js untuk menangani routing dan pengalihan berbasis locale. Mendeteksi locale dari headers/cookies dan mengalihkan ke path locale yang sesuai. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/intlayerMiddleware.md) |

### Helper Konfigurasi

Impor:

```tsx
import "next-intlayer/server";
```

| Fungsi             | Deskripsi                                                                                                                                                                 | Dokumen Terkait |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `withIntlayer`     | Bantuan asinkron untuk membungkus konfigurasi Next.js, memastikan kamus Intlayer dipersiapkan sebelum build. Mempersiapkan file konten dan menyiapkan plugin webpack/SWC. | -               |
| `withIntlayerSync` | Bantuan sinkron untuk membungkus konfigurasi Next.js, ideal untuk konfigurasi di mana async tidak memungkinkan/diinginkan. Tidak menyiapkan kamus saat server dimulai.    | -               |

### Penyedia

Import:

```tsx
import "next-intlayer";
```

or

```tsx
import "next-intlayer/server";
```

| Komponen                 | Deskripsi                                                                                                                 | Dokumen Terkait |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `IntlayerClientProvider` | Provider untuk komponen sisi-klien pada Next.js App Router. Membungkus `IntlayerProvider` dari react-intlayer.            | -               |
| `IntlayerServerProvider` | Provider untuk komponen sisi-server pada Next.js (App Router). Menyediakan konteks locale di server.                      | -               |
| `IntlayerServer`         | Pembungkus sisi-server untuk konten Intlayer di App Router. Menjamin penanganan locale yang tepat pada Server Components. | -               |

### Hooks (Sisi-klien)

Impor:

```tsx
import "next-intlayer";
```

Mengekspor ulang sebagian besar hooks dari `react-intlayer`.

| Hook                   | Deskripsi                                                                                                                                              | Dokumen Terkait                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook sisi-klien yang memilih satu dictionary berdasarkan kunci dan mengembalikan isinya. Menggunakan locale dari konteks jika tidak diberikan.         | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook yang mentransformasikan objek dictionary dan mengembalikan isi untuk locale saat ini. Memproses terjemahan `t()`, enumerations, dll.              | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook yang menangani kamus asinkron. Menerima peta kamus berbasis promise dan menyelesaikannya untuk locale saat ini.                                   | -                                                                                                                       |
| `useDictionaryDynamic` | Hook yang menangani kamus dinamis yang dimuat berdasarkan kunci. Menggunakan React Suspense secara internal untuk status pemuatan.                     | -                                                                                                                       |
| `useLocale`            | Hook sisi-klien untuk mendapatkan locale saat ini dan sebuah fungsi untuk mengaturnya. Ditingkatkan untuk Next.js App Router dengan dukungan navigasi. | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook sisi-klien untuk mengelola rewrite URL. Secara otomatis memperbarui URL jika ada aturan rewrite terlokalisasi yang lebih rapi.                    | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Hook khusus Next.js Page Router untuk manajemen locale. Menangani pengalihan (redirections) dan muat ulang halaman saat perubahan locale.              | -                                                                                                                       |
| `useI18n`              | Hook yang menyediakan fungsi terjemahan `t()` untuk mengakses konten bersarang berdasarkan kunci. Meniru pola i18next/next-intl.                       | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook yang menyediakan objek `Intl` yang terkait locale. Secara otomatis menyuntikkan locale saat ini dan menggunakan caching yang dioptimalkan.        | -                                                                                                                       |
| `useLoadDynamic`       | Hook untuk memuat kamus dinamis menggunakan React Suspense. Menerima sebuah key dan promise, serta meng-cache hasilnya.                                | -                                                                                                                       |

### Fungsi (Server-side)

Import:

```tsx
import "next-intlayer/server";
```

| Fungsi                 | Deskripsi                                                                                                                                                 | Dokumen Terkait                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `t`                    | Versi sisi-server dari fungsi terjemahan untuk Next.js App Router. Mengembalikan terjemahan konten multibahasa untuk locale server.                       | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/translation.md) |
| `getLocale`            | Fungsi pembantu untuk mengekstrak locale saat ini dari header dan cookie Next.js. Dirancang untuk Server Components, Server Actions, atau Route Handlers. | -                                                                                                              |
| `generateStaticParams` | Menghasilkan parameter statis untuk route dinamis Next.js berdasarkan locale yang dikonfigurasi. Mengembalikan array objek locale untuk pre-rendering.    | -                                                                                                              |
| `locale`               | Fungsi untuk mendapatkan atau mengatur locale dalam konteks server (App Router). Menyediakan manajemen locale di Server Components.                       | -                                                                                                              |

### Tipe

Impor:

```tsx
import "next-intlayer";
```

| Tipe                   | Deskripsi                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Tipe untuk halaman Next.js dengan dukungan Intlayer. Tipe generik yang mencakup parameter locale.                          |
| `Next14PageIntlayer`   | Tipe untuk halaman Next.js 14 dengan dukungan Intlayer.                                                                    |
| `Next15PageIntlayer`   | Tipe untuk halaman Next.js 15 dengan dukungan Intlayer.                                                                    |
| `NextLayoutIntlayer`   | Tipe untuk layout Next.js dengan dukungan Intlayer. Tipe generik yang mencakup parameter locale.                           |
| `Next14LayoutIntlayer` | Tipe untuk Next.js 14 layouts dengan dukungan Intlayer.                                                                    |
| `Next15LayoutIntlayer` | Tipe untuk Next.js 15 layouts dengan dukungan Intlayer.                                                                    |
| `LocalParams`          | Tipe untuk route parameters Next.js dengan locale. Objek dengan properti `locale`.                                         |
| `LocalPromiseParams`   | Tipe untuk route parameters Next.js dengan locale (versi async). Promise yang menghasilkan objek dengan properti `locale`. |
