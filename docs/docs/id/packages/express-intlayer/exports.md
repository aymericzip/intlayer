---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi paket express-intlayer
description: Middleware Express untuk Intlayer, menyediakan fungsi terjemahan dan deteksi locale.
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket express-intlayer

Paket `express-intlayer` menyediakan middleware untuk aplikasi Express agar dapat menangani internasionalisasi. Paket ini mendeteksi locale pengguna dan menyediakan fungsi-fungsi terjemahan.

## Instalasi

```bash
npm install express-intlayer
```

## Ekspor

### Middleware

Import:

```tsx
import "express-intlayer";
```

| Fungsi     | Deskripsi                                                                                                                                                                                                                                                                                   | Dokumen Terkait                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Middleware Express yang mendeteksi locale pengguna dan mengisi `res.locals` dengan data Intlayer. Melakukan deteksi locale dari cookie/header, menyuntikkan `t`, `getIntlayer`, dan `getDictionary` ke dalam `res.locals`, serta menyiapkan namespace CLS untuk akses siklus hidup request. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/express-intlayer/intlayer.md) |

### Fungsi

Impor:

```tsx
import "express-intlayer";
```

| Fungsi          | Deskripsi                                                                                                                                                                                                           | Dokumen Terkait                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Fungsi terjemahan yang mengambil konten untuk locale saat ini. Bekerja dalam siklus hidup request yang dikelola oleh middleware `intlayer`. Menggunakan CLS (Async Local Storage) untuk mengakses konteks request.  | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md) |
| `getIntlayer`   | Mengambil kamus berdasarkan kuncinya dari deklarasi yang dihasilkan dan mengembalikan isinya untuk locale yang ditentukan. Versi teroptimasi dari `getDictionary`. Menggunakan CLS untuk mengakses konteks request. | -                                                                                                      |
| `getDictionary` | Memproses objek kamus dan mengembalikan konten untuk locale yang ditentukan. Memproses terjemahan `t()`, enumerasi, markdown, HTML, dll. Menggunakan CLS untuk mengakses konteks request.                           | -                                                                                                      |
