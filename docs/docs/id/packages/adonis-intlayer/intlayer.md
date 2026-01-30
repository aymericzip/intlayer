---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Dokumentasi Middleware intlayer AdonisJS | adonis-intlayer
description: Lihat cara menggunakan middleware intlayer untuk paket adonis-intlayer
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Dokumentasi awal
---

# Dokumentasi Middleware intlayer AdonisJS

Middleware `intlayer` untuk AdonisJS mendeteksi locale pengguna dan menyediakan fungsi terjemahan melalui konteks permintaan. Ini juga memungkinkan penggunaan fungsi terjemahan global dalam aliran permintaan.

## Penggunaan

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## Deskripsi

Middleware melakukan tugas-tugas berikut:

1. **Deteksi Locale**: Menganalisis permintaan (header, cookie, dll.) untuk menentukan locale pilihan pengguna.
2. **Setup Konteks**: Mengisi konteks permintaan dengan informasi locale.
3. **Async Local Storage**: Menggunakan `cls-hooked` untuk mengelola konteks asinkron, memungkinkan fungsi Intlayer global seperti `t`, `getIntlayer`, dan `getDictionary` untuk mengakses locale spesifik permintaan tanpa meneruskannya secara manual.

> Catat: Untuk menggunakan cookie untuk deteksi locale, pastikan `@adonisjs/cookie` dikonfigurasi dan digunakan dalam aplikasi Anda.
