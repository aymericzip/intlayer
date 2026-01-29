---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Dokumentasi Paket hono-intlayer
description: Middleware Hono untuk Intlayer, menyediakan fungsi terjemahan dan deteksi locale.
keywords:
  - hono-intlayer
  - hono
  - middleware
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - hono-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket hono-intlayer

Paket `hono-intlayer` menyediakan middleware untuk aplikasi Hono untuk menangani internasionalisasi. Paket ini mendeteksi locale pengguna dan mengisi objek konteks.

## Instalasi

```bash
npm install hono-intlayer
```

## Ekspor

### Middleware

Impor:

```tsx
import { intlayer } from "hono-intlayer";
```

| Fungsi     | Deskripsi                                                                                                                                                                                                                                                                                     | Dokumen Terkait                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `intlayer` | Middleware Hono yang mengintegrasikan Intlayer ke dalam aplikasi Hono Anda. Menangani deteksi locale dari penyimpanan (cookie, header), mengisi konteks dengan `t`, `getIntlayer`, dan `getDictionary`, serta menyiapkan namespace CLS untuk akses terprogram selama siklus hidup permintaan. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/hono-intlayer/intlayer.md) |

### Fungsi

Impor:

```tsx
import { t, getIntlayer, getDictionary } from "hono-intlayer";
```

| Fungsi          | Deskripsi                                                                                                                                                                                                                                                      | Dokumen Terkait                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `t`             | Fungsi terjemahan global yang mengambil konten untuk locale saat ini di Hono. Memanfaatkan CLS (Async Local Storage) dan harus digunakan dalam konteks permintaan yang dikelola oleh middleware `intlayer`. Juga dapat diakses melalui konteks.                | [terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md) |
| `getIntlayer`   | Mengambil kamus berdasarkan kuncinya dari deklarasi yang dihasilkan dan mengembalikan kontennya untuk locale yang ditentukan. Versi `getDictionary` yang dioptimalkan. Menggunakan CLS untuk mengakses konteks permintaan. Juga dapat diakses melalui konteks. | -                                                                                                     |
| `getDictionary` | Memproses objek kamus dan mengembalikan konten untuk locale yang ditentukan. Memproses terjemahan `t()`, enumerasi, markdown, HTML, dll. Menggunakan CLS untuk mengakses konteks permintaan. Juga dapat diakses melalui konteks.                               | -                                                                                                     |
