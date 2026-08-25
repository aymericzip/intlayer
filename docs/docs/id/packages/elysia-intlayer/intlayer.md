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

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    id: "Halo",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> Plugin mendaftarkan context-nya melalui `derive` **global**, yang oleh Elysia diberi tipe `Partial<{ intlayer: IntlayerContext }>`. Nilainya selalu ada saat runtime untuk route yang didaftarkan setelah `.use(intlayer())`, jadi gunakan non-null assertion (`intlayer!.t`) — atau optional chaining — agar TypeScript pada mode `strict` puas.

Helper yang sama tersedia sebagai export mandiri, sehingga Anda dapat memanggilnya tanpa melakukan destructuring pada route context:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    id: "Halo",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## Deskripsi

Plugin melakukan tugas-tugas berikut:

1. **Deteksi locale**: Membaca locale yang ditetapkan secara eksplisit oleh klien dari storage (cookie, header), lalu beralih ke locale yang dinegosiasikan dari header `Accept-Language`.
2. **Injeksi Konteks**: Menambahkan properti `intlayer` ke context route Elysia (lihat tabel Context Route di bawah).
3. **Manajemen Konteks**: Menggunakan `AsyncLocalStorage` untuk mengelola konteks asinkron, memungkinkan fungsi Intlayer global (`t`, `getIntlayer`, `getDictionary`) mengakses locale spesifik request tanpa harus meneruskan objek konteks.
4. **Penyiapan Dictionary**: Memanggil `prepareIntlayer` saat plugin dibuat, sehingga dictionary dibangun ketika aplikasi melakukan boot.

### Context Route

| Properti          | Tipe                   | Deskripsi                                                                                                         |
| ----------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `locale`          | `Locale`               | Locale yang digunakan untuk request ini, dengan `locale_storage` lebih diprioritaskan daripada `locale_detected`. |
| `locale_storage`  | `Locale` (opsional)    | Locale yang diminta secara eksplisit oleh klien melalui cookie atau header.                                       |
| `locale_detected` | `Locale`               | Locale yang dinegosiasikan dari header request.                                                                   |
| `defaultLocale`   | `Locale`               | Locale yang dikonfigurasi sebagai fallback di `intlayer.config.ts`.                                               |
| `t`               | `TranslateFunction`    | Sebuah fungsi terjemahan.                                                                                         |
| `getIntlayer`     | `typeof getIntlayer`   | Fungsi untuk mengambil dictionary berdasarkan key.                                                                |
| `getDictionary`   | `typeof getDictionary` | Fungsi untuk memproses objek dictionary.                                                                          |

> Tidak seperti plugin Intlayer berbasis Node, `elysia-intlayer` mengandalkan `AsyncLocalStorage` alih-alih `cls-hooked`, karena `cls-hooked` bergantung pada `async_hooks.createHook`, yang tidak diimplementasikan oleh Bun.

Konteks request dilepaskan setelah response dipetakan, sehingga helper mandiri tidak pernah diselesaikan terhadap request yang sudah berakhir. Ketika dipanggil di luar request yang ditangani plugin, keduanya beralih ke locale default yang dikonfigurasi.

## Urutan Resolusi Locale

Secara default, plugin menyelesaikan locale dengan urutan berikut:

1. Cookie `INTLAYER_LOCALE`.
2. Header `x-intlayer-locale`.
3. Negosiasi header `Accept-Language`.
4. `defaultLocale` yang dikonfigurasi.

```bash
# Dinegosiasikan dari `Accept-Language`
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# Cookie lebih diprioritaskan daripada `Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# Header lebih diprioritaskan daripada `Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## Konfigurasi

Plugin membaca file `intlayer.config.ts` Anda. Anda dapat menyesuaikan cookie dan header yang digunakan untuk deteksi locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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

## Dokumentasi Terkait

- [Dokumentasi Paket elysia-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/elysia-intlayer/exports.md)
- [Elysia i18n - Panduan lengkap untuk menerjemahkan aplikasi Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_elysia.md)
