---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Middleware intlayer untuk Express | express-intlayer
description: Lihat cara menggunakan middleware intlayer untuk paket express-intlayer
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Inisialisasi dokumen
---

# Dokumentasi Middleware intlayer untuk Express

Middleware `intlayer` untuk Express mendeteksi locale pengguna dan menyediakan fungsi terjemahan melalui objek `res.locals`. Ini juga memungkinkan penggunaan fungsi `t` dan `getIntlayer` di seluruh penanganan permintaan Anda.

## Penggunaan

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    id: "Halo",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## Deskripsi

Middleware melakukan tugas-tugas berikut:

1. **Deteksi Locale**: Memeriksa cookie, header (seperti `Accept-Language`), dan parameter URL untuk menentukan locale pengguna.
2. **Pengaturan Konteks**: yang mengisi `res.locals` dengan:
   - `locale`: Locale yang terdeteksi.
   - `t`: Fungsi terjemahan yang terikat pada locale yang terdeteksi.
   - `getIntlayer`: Fungsi untuk mengambil kamus yang terikat pada locale yang terdeteksi.
3. **Async Local Storage**: ini menyiapkan konteks yang memungkinkan penggunaan fungsi global `t` dan `getIntlayer` yang diimpor dari `express-intlayer` dalam alur permintaan.
