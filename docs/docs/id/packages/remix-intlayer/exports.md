---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Dokumentasi Paket remix-intlayer
description: Dokumentasi ekspor paket remix-intlayer, yang menyediakan internasionalisasi (i18n) untuk aplikasi Remix 3.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inisialisasi dokumentasi ekspor remix-intlayer"
author: aymericzip
---

# Paket remix-intlayer

Paket `remix-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Remix 3. Paket ini mencakup middleware untuk mendeteksi locale permintaan, akses ke konteks permintaan, serta hook untuk mengambil kamus dan mengelola locale.

## Instalasi

```bash
npm install remix-intlayer
```

## Ekspor Paket

### Middleware

| Ekspor     | Tipe              | Deskripsi                                                                                                         | Dokumen Terkait                                                                                                                    |
| ---------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Fungsi Middleware | Middleware untuk Remix 3 yang mendeteksi locale permintaan, mengelola pengalihan, dan mengisi konteks permintaan. | [Middleware intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/intlayerMiddleware.md) |

### Penyimpanan Konteks

| Ekspor                      | Tipe                               | Deskripsi                                                                                                                                                 | Dokumen Terkait                                                                                                       |
| --------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | Kunci RequestContext / Penyimpanan | Kunci konteks permintaan yang digunakan untuk mengambil state Intlayer dari konteks permintaan Remix 3 (`context.get(Intlayer)`).                         | [Konteks Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`                           | Nama properti (`'intlayer'`) yang dipasang langsung pada konteks permintaan, memungkinkan akses melalui `context.intlayer` serta `context.get(Intlayer)`. | -                                                                                                                     |

### Hook

| Ekspor          | Tipe | Deskripsi                                                                                               | Dokumen Terkait                                                                                                              |
| --------------- | ---- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Hook | Mengambil dan mendekorasi konten kamus berdasarkan kunci untuk locale permintaan saat ini.              | [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Hook | Mengembalikan konten objek kamus yang diimpor sebelumnya untuk locale permintaan saat ini.              | [Hook useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Hook | Menyediakan akses ke locale permintaan saat ini, locale default, dan daftar semua locale yang tersedia. | [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useLocale.md)         |

### Utilitas

Impor:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| Fungsi                | Deskripsi                                                                                                                                            | Dok Terkait |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `createLocaleRouting` | Fungsi murni yang menghitung keputusan perutean lokal (`redirect`, `rewrite`, atau `pass`) berdasarkan permintaan, konfigurasi, dan opsi.            | -           |
| `getIntlayerState`    | Membaca `IntlayerState` saat ini (`locale`, `defaultLocale`, `availableLocales`) dari cakupan permintaan `AsyncLocalStorage` di luar komponen React. | -           |

### Formatter (remix-intlayer/format)

Impor:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "remix-intlayer/format";
```

| Hook              | Deskripsi                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `useIntl`         | Mengembalikan instans Intl yang terikat pada lokal permintaan atau klien dengan kemampuan caching.           |
| `useDate`         | Mengembalikan fungsi pemformatan tanggal yang terikat pada lokal saat ini (`Intl.DateTimeFormat`).           |
| `useNumber`       | Mengembalikan fungsi pemformatan angka yang terikat pada lokal saat ini (`Intl.NumberFormat`).               |
| `useCurrency`     | Mengembalikan fungsi pemformatan mata uang yang terikat pada lokal saat ini.                                 |
| `usePercentage`   | Mengembalikan fungsi pemformatan persentase yang terikat pada lokal saat ini.                                |
| `useRelativeTime` | Mengembalikan fungsi pemformatan waktu relatif yang terikat pada lokal saat ini (`Intl.RelativeTimeFormat`). |
| `useList`         | Mengembalikan fungsi pemformatan daftar yang terikat pada lokal saat ini (`Intl.ListFormat`).                |
| `useUnit`         | Mengembalikan fungsi pemformatan unit yang terikat pada lokal saat ini.                                      |
| `useCompact`      | Mengembalikan fungsi pemformatan angka ringkas yang terikat pada lokal saat ini (misalnya `1.5K`).           |

### Utilitas HTML (remix-intlayer/html)

Impor:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Ekspor            | Tipe       | Deskripsi                                                             |
| ----------------- | ---------- | --------------------------------------------------------------------- |
| `renderHTML`      | `Function` | Fungsi utilitas mandiri untuk merender node HTML.                     |
| `useHTML`         | `Hook`     | Hook untuk mendapatkan konteks dan konfigurasi penyedia HTML.         |
| `useHTMLRenderer` | `Hook`     | Hook untuk mendapatkan fungsi perender HTML yang telah dikonfigurasi. |

### Utilitas Markdown (remix-intlayer/markdown)

Impor:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
```

| Ekspor                | Tipe       | Deskripsi                                                                 |
| --------------------- | ---------- | ------------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Mengompilasi string markdown ke dalam representasi terstruktur.           |
| `renderMarkdown`      | `Function` | Merender konten markdown ke node keluaran.                                |
| `parseMarkdown`       | `Function` | Mengurai konten markdown mentah ke dalam AST.                             |
| `useMarkdown`         | `Hook`     | Hook untuk mendapatkan konteks penyedia markdown.                         |
| `useMarkdownRenderer` | `Hook`     | Hook untuk mendapatkan fungsi perender Markdown yang telah dikonfigurasi. |

### Tipe

Impor:

```tsx
import type {
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| Tipe                        | Deskripsi                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Objek status yang menyimpan `locale`, `defaultLocale`, dan `availableLocales` dalam konteks permintaan Remix. |
| `IntlayerMiddlewareOptions` | Opsi konfigurasi yang diteruskan ke middleware `intlayer()`.                                                  |
| `LocaleRoutingOptions`      | Opsi untuk menyesuaikan awalan lokal, deteksi, dan pengalihan.                                                |
| `LocaleRoutingAction`       | Diskriminasi gabungan yang mewakili keputusan perutean: `redirect`, `rewrite`, atau `pass`.                   |
| `LocaleRoutingRequest`      | Representasi permintaan minimal yang diperlukan oleh `createLocaleRouting`.                                   |
| `UseLocaleResult`           | Tipe pengembalian `useLocale()`, yang berisi `locale`, `defaultLocale`, dan `availableLocales`.               |
