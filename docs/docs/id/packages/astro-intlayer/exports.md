---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Dokumentasi Paket astro-intlayer
description: Integrasi Astro untuk Intlayer, menyediakan konfigurasi perutean berbasis lokal, middleware, hooks, store klien, dan manajemen kamus.
keywords:
  - astro-intlayer
  - astro
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Menambahkan dokumentasi hook useIntlayer, useDictionary, useLocale, middleware, dan formatters"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Dokumentasi terpadu untuk semua ekspor"
author: aymericzip
---

# Paket astro-intlayer

Paket `astro-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Astro. Paket ini mengonfigurasi perutean berbasis lokal, manajemen kamus, penulisan ulang halaman saat proses build, middleware permintaan, dan hooks untuk mengakses konten multibahasa di komponen `.astro` yang dirender di server maupun skrip sisi klien.

## Instalasi

```bash
npm install astro-intlayer
```

## Ekspor

### Integrasi

Paket `astro-intlayer` menyediakan integrasi Astro yang mengonfigurasi Intlayer dalam proyek Anda.

Impor:

```tsx
import { intlayer } from "astro-intlayer";
```

atau impor default di `astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Fungsi     | Deskripsi                                                                                                                                                                                                             | Dokumentasi Terkait                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Integrasi Astro yang menyiapkan kamus, mengonfigurasi plugin Vite (alias, proksi perutean, pemangkasan build), mendaftarkan middleware permintaan secara otomatis, dan menghasilkan halaman prerender pada URL lokal. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/intlayer.md) |

### Hooks (Server & Klien)

Impor:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Hook            | Deskripsi                                                                                                                                                                                | Dokumentasi Terkait                                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Memilih satu kamus berdasarkan kuncinya dan mengembalikan konten yang dilokalisasi. Di frontmatter `.astro`, membaca lokal dari `Astro.locals`. Di `<script>` klien, membaca dari store. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Mentransformasikan objek kamus dan mengembalikan konten untuk lokal yang ditentukan. Berfungsi di frontmatter dan skrip klien.                                                           | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Mengembalikan lokal saat ini, lokal default, lokal yang tersedia, dan fungsi untuk memperbarui lokal.                                                                                    | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useLocale.md)         |

### Middleware (astro-intlayer/middleware)

Impor:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Ekspor      | Tipe                | Deskripsi                                                                                                                                                              | Dokumentasi Terkait                                                                                             |
| ----------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | Middleware Astro yang mendeteksi lokal permintaan dan melampirkan `Astro.locals.intlayer`. Didaftarkan otomatis oleh `intlayer()` atau diimpor manual untuk komposisi. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/onRequest.md) |

### Utilitas

Impor:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Fungsi              | Deskripsi                                                                                                                 | Dokumentasi Terkait |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `getIntlayerLocals` | Fungsi pembantu untuk mengambil objek `IntlayerLocals` saat ini dari cakupan penyimpanan permintaan di luar Astro.locals. | -                   |

### Utilitas Klien (astro-intlayer/client)

Impor:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

Ketika diimpor di browser atau di dalam tag `<script>` klien, `astro-intlayer` secara otomatis memetakan ke `astro-intlayer/client` (didukung oleh `vanilla-intlayer`), menyediakan pengambil kamus sisi klien, pelanggan store, dan alat persistensi lokal.

### Formatter (astro-intlayer/format)

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
} from "astro-intlayer/format";
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

### Utilitas HTML (astro-intlayer/html)

Impor:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Ekspor            | Tipe       | Deskripsi                                                             |
| ----------------- | ---------- | --------------------------------------------------------------------- |
| `renderHTML`      | `Function` | Fungsi utilitas mandiri untuk merender node HTML.                     |
| `useHTML`         | `Hook`     | Hook untuk mendapatkan konteks dan konfigurasi penyedia HTML.         |
| `useHTMLRenderer` | `Hook`     | Hook untuk mendapatkan fungsi perender HTML yang telah dikonfigurasi. |

### Utilitas Markdown (astro-intlayer/markdown)

Impor:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
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
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Tipe              | Deskripsi                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `IntlayerLocals`  | Objek yang dilampirkan pada `Astro.locals.intlayer` yang berisi `locale`, `defaultLocale`, dan `availableLocales`. |
| `UseLocaleProps`  | Properti konfigurasi opsional yang diterima oleh `useLocale()`.                                                    |
| `UseLocaleResult` | Tipe pengembalian dari `useLocale()`, menyediakan properti lokal dan metode pembaruan.                             |
