---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi paket react-intlayer
description: Implementasi khusus React dari Intlayer, menyediakan hooks dan providers untuk aplikasi React.
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket react-intlayer

Paket `react-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi React. Paket ini mencakup context providers, hooks, dan komponen untuk menangani konten multibahasa.

## Instalasi

```bash
npm install react-intlayer
```

## Ekspor

### Penyedia

Impor:

```tsx
import "react-intlayer";
```

| Komponen                  | Deskripsi                                                                                                                  | Dokumen Terkait                                                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | Provider utama yang membungkus aplikasi Anda dan menyediakan konteks Intlayer. Menyertakan dukungan editor secara default. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | Komponen provider yang fokus pada konten tanpa fitur editor. Gunakan ini ketika Anda tidak membutuhkan editor visual.      | -                                                                                                                             |
| `HTMLProvider`            | Provider untuk pengaturan internasionalisasi terkait HTML. Mengizinkan override komponen untuk tag HTML.                   | -                                                                                                                             |

### Hooks

Impor:

```tsx
import "react-intlayer";
```

| Hook                   | Deskripsi                                                                                                                                               | Dokumen Terkait                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook di sisi klien yang memilih satu dictionary berdasarkan key-nya dan mengembalikan kontennya. Menggunakan locale dari context jika tidak disediakan. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook yang mentransformasikan objek dictionary dan mengembalikan konten untuk locale saat ini. Memproses terjemahan `t()`, enumerasi, dll.               | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook yang menangani dictionary asinkron. Menerima peta dictionary berbasis promise dan menyelesaikannya untuk locale saat ini.                          | -                                                                                                                       |
| `useDictionaryDynamic` | Hook yang menangani dictionary dinamis yang dimuat berdasarkan key. Menggunakan React Suspense secara internal untuk status pemuatan.                   | -                                                                                                                       |
| `useLocale`            | Hook sisi-klien untuk mendapatkan locale saat ini, defaultLocale, availableLocales, dan fungsi untuk memperbarui locale.                                | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | Hook untuk mendapatkan locale saat ini dan semua field terkait (locale, defaultLocale, availableLocales, setLocale) dari context.                       | -                                                                                                                       |
| `useRewriteURL`        | Client-side hook untuk mengelola rewrite URL. Jika ada aturan rewrite untuk pathname dan locale saat ini, hook ini akan memperbarui URL.                | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | Hook yang menyediakan fungsi terjemahan `t()` untuk mengakses konten bersarang berdasarkan kunci. Meniru pola i18next/next-intl.                        | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook yang menyediakan objek `Intl` yang terikat pada locale. Secara otomatis menyuntikkan locale saat ini dan menggunakan caching yang dioptimalkan.    | -                                                                                                                       |
| `useLocaleStorage`     | Hook yang menyediakan persistensi locale di local storage atau cookie. Mengembalikan fungsi getter dan setter.                                          | -                                                                                                                       |
| `useLocaleCookie`      | Tidak lagi direkomendasikan. Gunakan `useLocaleStorage` sebagai gantinya. Hook yang mengelola persistensi locale di cookie.                             | -                                                                                                                       |
| `useLoadDynamic`       | Hook untuk memuat kamus dinamis menggunakan React Suspense. Menerima sebuah key dan promise, serta mencache hasilnya.                                   | -                                                                                                                       |
| `useIntlayerContext`   | Hook yang menyediakan nilai konteks klien Intlayer saat ini (locale, setLocale, dll.).                                                                  | -                                                                                                                       |
| `useHTMLContext`       | Hook untuk mengakses override komponen HTML dari konteks HTMLProvider.                                                                                  | -                                                                                                                       |

### Fungsi

Impor:

```tsx
import "react-intlayer";
```

| Fungsi               | Deskripsi                                                                                                                                                          | Dokumen Terkait                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `t`                  | Fungsi terjemahan sisi klien yang mengembalikan terjemahan dari konten multibahasa yang diberikan. Menggunakan locale dari konteks jika tidak disediakan.          | [terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md) |
| `getDictionary`      | Memproses objek kamus dan mengembalikan konten untuk locale yang ditentukan. Memproses terjemahan `t()`, enumerasi, markdown, HTML, dll.                           | -                                                                                                     |
| `getIntlayer`        | Mengambil kamus berdasarkan kunci dari deklarasi yang dihasilkan dan mengembalikan kontennya untuk locale yang ditentukan. Versi teroptimasi dari `getDictionary`. | -                                                                                                     |
| `setLocaleInStorage` | Mengatur locale di penyimpanan (local storage atau cookie berdasarkan konfigurasi).                                                                                | -                                                                                                     |
| `setLocaleCookie`    | Deprecated. Gunakan `setLocaleInStorage` sebagai gantinya. Mengatur locale dalam cookie.                                                                           | -                                                                                                     |
| `localeInStorage`    | Mendapatkan locale dari penyimpanan (local storage atau cookie).                                                                                                   | -                                                                                                     |
| `localeCookie`       | Tidak direkomendasikan. Gunakan `localeInStorage` sebagai gantinya. Mendapatkan locale dari cookie.                                                                | -                                                                                                     |

### Komponen

Impor:

```tsx
import "react-intlayer";
```

atau

```tsx
import "react-intlayer/markdown";
```

| Komponen           | Deskripsi                                                                                                            | Dokumen Terkait                                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | Provider untuk konteks rendering markdown. Memungkinkan override komponen kustom untuk elemen markdown.              | -                                                                                                                             |
| `MarkdownRenderer` | Merender konten markdown dengan komponen kustom. Mendukung semua fitur markdown standar dan sintaks khusus Intlayer. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/MarkdownRenderer.md) |

### Tipe

Impor:

```tsx
import "react-intlayer";
```

| Tipe           | Deskripsi                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `IntlayerNode` | Tipe yang merepresentasikan sebuah node dalam pohon konten Intlayer. Digunakan untuk manipulasi konten yang type-safe. |

### Sisi server (react-intlayer/server)

Impor:

```tsx
import "react-intlayer/server";
```

| Ekspor                   | Tipe        | Deskripsi                                                |
| ------------------------ | ----------- | -------------------------------------------------------- |
| `IntlayerServerProvider` | `Component` | Provider untuk rendering sisi server.                    |
| `IntlayerServer`         | `Component` | Pembungkus sisi server untuk konten Intlayer.            |
| `t`                      | `Function`  | Versi sisi server dari fungsi terjemahan.                |
| `useLocale`              | `Hook`      | Hook untuk mengakses locale di sisi server.              |
| `useIntlayer`            | `Hook`      | Versi server-side dari `useIntlayer`.                    |
| `useDictionary`          | `Hook`      | Versi server-side dari `useDictionary`.                  |
| `useI18n`                | `Hook`      | Versi server-side dari `useI18n`.                        |
| `locale`                 | `Function`  | Fungsi untuk mendapatkan atau mengatur locale di server. |
