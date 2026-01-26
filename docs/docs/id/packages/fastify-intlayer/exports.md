---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket fastify-intlayer
description: Plugin Fastify untuk Intlayer, menyediakan fungsi terjemahan dan deteksi locale.
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket fastify-intlayer

Paket `fastify-intlayer` menyediakan plugin untuk aplikasi Fastify untuk menangani internasionalisasi. Ia mendeteksi locale pengguna dan mendekorasi objek request.

## Instalasi

```bash
npm install fastify-intlayer
```

## Ekspor

### Plugin

Impor:

```tsx
import "fastify-intlayer";
```

| Fungsi     | Deskripsi                                                                                                                                                                                                                                                                                                                       | Dokumen Terkait                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Fastify yang mengintegrasikan Intlayer ke aplikasi Fastify Anda. Menangani deteksi locale dari penyimpanan (cookies, headers), mendekorasi objek request dengan data `intlayer` yang berisi `t`, `getIntlayer`, dan `getDictionary`, serta menyiapkan namespace CLS untuk akses programatik selama siklus hidup request. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/fastify-intlayer/intlayer.md) |

### Fungsi

Impor:

```tsx
import "fastify-intlayer";
```

| Fungsi          | Deskripsi                                                                                                                                                                                                                                                                                   | Dokumen Terkait                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Fungsi terjemahan global yang mengambil konten untuk locale saat ini di Fastify. Memanfaatkan CLS (Async Local Storage) dan harus digunakan dalam konteks permintaan yang dikelola oleh plugin `intlayer`. Juga dapat diakses melalui `req.intlayer.t`.                                     | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md) |
| `getIntlayer`   | Mengambil dictionary berdasarkan kuncinya dari deklarasi yang dihasilkan dan mengembalikan kontennya untuk locale yang ditentukan. Versi yang dioptimalkan dari `getDictionary`. Menggunakan CLS untuk mengakses konteks permintaan. Juga dapat diakses melalui `req.intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Memproses objek dictionary dan mengembalikan konten untuk locale yang ditentukan. Memproses terjemahan `t()`, enumerasi, markdown, HTML, dll. Menggunakan CLS untuk mengakses konteks request. Juga dapat diakses melalui `req.intlayer.getDictionary`.                                     | -                                                                                                      |
