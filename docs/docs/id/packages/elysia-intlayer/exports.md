---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Dokumentasi Paket elysia-intlayer
description: Plugin Elysia untuk Intlayer, menyediakan fungsi terjemahan dan deteksi locale.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Dokumentasi terpadu untuk semua ekspor"
author: aymericzip
---

# Paket elysia-intlayer

Paket `elysia-intlayer` menyediakan plugin untuk aplikasi Elysia untuk menangani internasionalisasi. Ia mendeteksi locale pengguna dan menyuntikkan objek `intlayer` ke dalam route context.

## Instalasi

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` adalah peer dependency (`>=1.0.0`). Elysia menargetkan runtime **Bun**.

## Ekspor

### Plugin

Impor:

```ts
import { intlayer } from "elysia-intlayer";
```

| Fungsi     | Deskripsi                                                                                                                                                                                                                                                                                                                                 | Dokumen Terkait                                                                                                |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Elysia yang mengintegrasikan Intlayer ke dalam aplikasi Elysia Anda. Menangani deteksi locale dari storage (cookies, headers) lalu dari `Accept-Language`, menyuntikkan objek `intlayer` yang mengekspos `locale`, `t`, `getIntlayer`, dan `getDictionary` ke route context, serta menyiapkan konteks request `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/elysia-intlayer/intlayer.md) |

### Fungsi

Impor:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Fungsi          | Deskripsi                                                                                                                                                                                                                                                                          | Dokumen Terkait                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Fungsi terjemahan global yang mengambil konten untuk locale saat ini di Elysia. Menggunakan `AsyncLocalStorage` untuk mengakses konteks request yang disiapkan oleh plugin `intlayer`, dan beralih ke locale default di luarnya. Dapat juga diakses melalui `intlayer.t`.          | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md) |
| `getIntlayer`   | Mengambil dictionary berdasarkan key dari deklarasi yang dihasilkan dan mengembalikan kontennya untuk locale saat ini. Versi teroptimasi dari `getDictionary`. Menggunakan `AsyncLocalStorage` untuk mengakses konteks request. Dapat juga diakses melalui `intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Memproses objek dictionary dan mengembalikan konten untuk locale saat ini. Memproses terjemahan `t()`, enumerasi, markdown, HTML, dll. Menggunakan `AsyncLocalStorage` untuk mengakses konteks request. Dapat juga diakses melalui `intlayer.getDictionary`.                       | -                                                                                                      |

### Tipe

Impor:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Tipe                | Deskripsi                                                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Bentuk objek `intlayer` yang disuntikkan ke setiap route context: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Tanda tangan fungsi terjemahan, yang menerjemahkan locale map menjadi konten yang cocok dengan locale request saat ini.                                                |

## Penggunaan

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Muat plugin internasionalisasi
  .use(intlayer())
  // Baca locale dan helper dari context route
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      id: "Halo",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // Atau gunakan helper standalone, yang terikat pada request saat ini
  .get("/t_example", () =>
    t({
      id: "Contoh konten yang dikembalikan dalam bahasa Indonesia",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Plugin mendaftarkan context-nya melalui `derive` **global**, yang oleh Elysia diberi tipe `Partial<{ intlayer: IntlayerContext }>`. Nilainya selalu ada saat runtime untuk route yang didaftarkan setelah `.use(intlayer())`, jadi gunakan non-null assertion (`intlayer!.locale`) — atau optional chaining — agar TypeScript pada mode `strict` puas.

## Dokumentasi Terkait

- [Elysia i18n - Panduan lengkap untuk menerjemahkan aplikasi Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_elysia.md)
- [Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
