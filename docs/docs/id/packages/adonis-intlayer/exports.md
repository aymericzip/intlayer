---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Dokumentasi Paket adonis-intlayer
description: Middleware AdonisJS untuk Intlayer, menyediakan fungsi terjemahan dan deteksi locale.
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Dokumentasi awal
---

# Paket adonis-intlayer

Paket `adonis-intlayer` menyediakan middleware untuk aplikasi AdonisJS guna menangani internasionalisasi. Ini mendeteksi locale pengguna dan menyediakan fungsi terjemahan.

## Instalasi

```bash
npm install adonis-intlayer
```

## Ekspor

### Middleware

Paket ini menyediakan middleware AdonisJS untuk menangani internasionalisasi.

| Fungsi               | Deskripsi                                                                                                                                                                                                                                                                   | Dok Terkait                                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | Middleware AdonisJS yang mendeteksi locale pengguna dan mengisi konteks permintaan dengan data Intlayer. Ini juga menyiapkan namespace CLS (Async Local Storage) para akses siklus hidup permintaan, memungkinkan penggunaan fungsi global seperti `t`, `getIntlayer`, dll. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/adonis-intlayer/intlayer.md) |

### Fungsi

| Fungsi          | Deskripsi                                                                                                                                                                                                                | Dok Terkait                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Fungsi terjemahan yang mengambil konten untuk locale saat ini. Bekerja dalam siklus hidup permintaan yang dikelola oleh middleware `intlayer`. Menggunakan CLS (Async Local Storage) untuk mengakses konteks permintaan. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md) |
| `getIntlayer`   | Mengambil kamus berdasarkan kuncinya dari deklarasi yang dihasilkan dan mengembalikan kontennya untuk locale yang ditentukan. Versi optimal dari `getDictionary`. Menggunakan CLS untuk mengakses konteks permintaan.    | -                                                                                                      |
| `getDictionary` | Memproses objek kamus dan mengembalikan konten untuk locale yang ditentukan. Memproses terjemahan `t()`, enumerasi, markdown, HTML, dll. Menggunakan CLS untuk mengakses konteks permintaan.                             | -                                                                                                      |
| `getLocale`     | Mengambil locale saat ini dari konteks permintaan menggunakan CLS.                                                                                                                                                       | -                                                                                                      |
