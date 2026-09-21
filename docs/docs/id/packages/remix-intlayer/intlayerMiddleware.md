---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Dokumentasi Middleware intlayer | remix-intlayer
description: Pelajari cara menggunakan middleware intlayer di Remix 3 untuk mendeteksi locale, menangani pengalihan, dan menyuntikkan status Intlayer ke dalam konteks permintaan.
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inisialisasi dokumentasi middleware intlayer"
author: aymericzip
---

# Middleware intlayer

Fungsi middleware `intlayer` mengonfigurasi internasionalisasi per permintaan dalam aplikasi Remix 3. Middleware ini mendeteksi locale dari setiap permintaan masuk, menerapkan aturan pengalihan URL, dan menyimpan state locale dalam konteks permintaan.

## Penggunaan

Daftarkan middleware di router Remix Anda:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

## Cara Kerjanya

Middleware melakukan tugas-tugas berikut untuk setiap permintaan yang masuk:

1. **Deteksi Locale**: Mengekstrak locale dari awalan jalur URL (misalnya `/id/about`), cookie, atau header `Accept-Language` sesuai dengan konfigurasi Intlayer Anda.
2. **Pengalihan URL**: Jika jalur yang diminta tidak memiliki awalan locale dan konfigurasi memerlukan perutean berawalan, middleware mengembalikan respons pengalihan (302/307/308) ke URL berawalan yang sesuai.
3. **Mengisi Konteks Permintaan**: Menyimpan locale yang diselesaikan saat ini dalam konteks permintaan Remix menggunakan kunci `Intlayer`, sehingga hook (`useLocale`, `useIntlayer`, `useDictionary`) dapat menggunakannya secara transparan.
4. **Manajemen Cookie**: Menyetel header `Set-Cookie` saat perlu mempertahankan locale pilihan pengguna.

## Dokumentasi Terkait

- [Konteks Permintaan `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/Intlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useLocale.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useIntlayer.md)
