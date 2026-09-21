---
createdAt: 2026-09-19
updatedAt: 2026-09-19
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

| Ekspor     | Tipe                               | Deskripsi                                                                                                                         | Dokumen Terkait                                                                                                       |
| ---------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `Intlayer` | Kunci RequestContext / Penyimpanan | Kunci konteks permintaan yang digunakan untuk mengambil state Intlayer dari konteks permintaan Remix 3 (`context.get(Intlayer)`). | [Konteks Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/Intlayer.md) |

### Hook

| Ekspor          | Tipe | Deskripsi                                                                                               | Dokumen Terkait                                                                                                              |
| --------------- | ---- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Hook | Mengambil dan mendekorasi konten kamus berdasarkan kunci untuk locale permintaan saat ini.              | [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Hook | Mengembalikan konten objek kamus yang diimpor sebelumnya untuk locale permintaan saat ini.              | [Hook useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Hook | Menyediakan akses ke locale permintaan saat ini, locale default, dan daftar semua locale yang tersedia. | [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useLocale.md)         |

## Mulai Cepat

### Mengonfigurasi Router dengan Middleware

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

### Menggunakan Konten di Tampilan dan Komponen

```ts fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `<h1>${content.title}</h1><p>${content.description}</p>`;
};
```
