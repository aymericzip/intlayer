---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Dokumentasi Plugin intlayer untuk Elysia | elysia-intlayer
description: Lihat cara menggunakan plugin intlayer dari paket elysia-intlayer
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Inisialisasi dokumentasi"
author: aymericzip
---

# Dokumentasi Plugin intlayer untuk Elysia

Plugin `intlayer` untuk Elysia mendeteksi locale pengguna dan menyuntikkan objek `intlayer` ke dalam route context. Plugin ini juga memungkinkan penggunaan fungsi terjemahan global di dalam konteks request.

## Penggunaan

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    id: "Halo",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

Helper yang sama tersedia sebagai export mandiri, sehingga Anda dapat memanggilnya tanpa melakukan destructuring pada route context:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    id: "Halo",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## Deskripsi

Plugin melakukan tugas-tugas berikut:

1. **Deteksi locale**: Membaca locale yang ditetapkan secara eksplisit oleh klien dari storage (cookie, header), lalu beralih ke locale yang dinegosiasikan dari header `Accept-Language`.
2. **Injeksi Konteks**: Menambahkan properti `intlayer` ke route context Elysia, yang berisi:
   - `locale`: Locale yang digunakan untuk request ini, dengan `locale_storage` lebih diprioritaskan daripada `locale_detected`.
   - `locale_storage`: Locale yang diminta secara eksplisit oleh klien melalui cookie atau header.
   - `locale_detected`: Locale yang dinegosiasikan dari header request.
   - `defaultLocale`: Locale yang dikonfigurasi sebagai fallback di `intlayer.config.ts`.
   - `t`: Sebuah fungsi terjemahan.
   - `getIntlayer`: Fungsi untuk mengambil dictionary berdasarkan key.
   - `getDictionary`: Fungsi untuk memproses objek dictionary.
3. **Manajemen Konteks**: Menggunakan `AsyncLocalStorage` untuk mengelola konteks asinkron, memungkinkan fungsi Intlayer global (`t`, `getIntlayer`, `getDictionary`) mengakses locale spesifik request tanpa harus meneruskan objek konteks.

> Tidak seperti plugin Intlayer berbasis Node, `elysia-intlayer` mengandalkan `AsyncLocalStorage` alih-alih `cls-hooked`, karena `cls-hooked` bergantung pada `async_hooks.createHook`, yang tidak diimplementasikan oleh Bun.

Konteks request dilepaskan setelah response dipetakan, sehingga helper mandiri tidak pernah diselesaikan terhadap request yang sudah berakhir. Ketika dipanggil di luar request yang ditangani plugin, keduanya beralih ke locale default yang dikonfigurasi.

## Konfigurasi

Plugin membaca file `intlayer.config.ts` Anda. Anda dapat menyesuaikan cookie dan header yang digunakan untuk deteksi locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Untuk informasi lebih lanjut tentang konfigurasi, kunjungi [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).
