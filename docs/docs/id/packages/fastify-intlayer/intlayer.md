---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: "Dokumentasi Plugin intlayer untuk Fastify | fastify-intlayer"
description: "Lihat cara menggunakan plugin intlayer untuk paket fastify-intlayer"
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Inisialisasi dokumen
---

# Dokumentasi Plugin intlayer untuk Fastify

Plugin `intlayer` untuk Fastify mendeteksi locale pengguna dan menambahkan properti pada objek request dengan fungsi-fungsi Intlayer. Plugin ini juga memungkinkan penggunaan fungsi terjemahan global di dalam konteks request.

## Penggunaan

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## Deskripsi

Plugin melakukan tugas-tugas berikut:

1. **Deteksi locale**: Menganalisis request (headers, cookies, dll.) untuk menentukan locale yang dipilih pengguna.
2. **Dekorasi Request**: Menambahkan properti `intlayer` ke objek `FastifyRequest`, yang berisi:
   - `locale`: Locale yang terdeteksi.
   - `t`: Fungsi terjemahan.
   - `getIntlayer`: Fungsi untuk mengambil kamus.
3. **Manajemen Konteks**: Menggunakan `cls-hooked` untuk mengelola konteks asinkron, memungkinkan fungsi Intlayer global mengakses locale spesifik request.
