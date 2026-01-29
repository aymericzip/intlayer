---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Dokumentasi Middleware Hono intlayer | hono-intlayer
description: Lihat cara menggunakan middleware intlayer untuk paket hono-intlayer
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Inisialisasi dokumentasi
---

# Dokumentasi Middleware Hono intlayer

Middleware `intlayer` untuk Hono mendeteksi locale pengguna dan mengisi objek konteks dengan fungsi-fungsi Intlayer. Ini juga memungkinkan penggunaan fungsi terjemahan global dalam konteks permintaan.

## Penggunaan

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
    id: "Halo",
  });

  return c.text(content);
});
```

## Deskripsi

Middleware melakukan tugas-tugas berikut:

1. **Deteksi Locale**: Menganalisis permintaan (header, cookie, dll.) untuk menentukan locale pilihan pengguna.
2. **Pengisian Konteks**: Menambahkan data Intlayer ke konteks Hono, yang dapat diakses melalui `c.get()`. Ini termasuk:
   - `locale`: Locale yang terdeteksi.
   - `t`: Fungsi terjemahan.
   - `getIntlayer`: Fungsi untuk mengambil kamus.
   - `getDictionary`: Fungsi untuk memproses objek kamus.
3. **Manajemen Konteks**: Menggunakan `cls-hooked` untuk mengelola konteks asinkron, memungkinkan fungsi Intlayer global (`t`, `getIntlayer`, `getDictionary`) untuk mengakses locale khusus permintaan tanpa meneruskan objek konteks.
