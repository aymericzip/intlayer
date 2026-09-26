---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Dokumentasi Integrasi intlayer | astro-intlayer
description: Pelajari cara mengonfigurasi dan menggunakan integrasi Astro intlayer di astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - integrasi
  - i18n
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Memperbarui dokumentasi integrasi dengan detail middleware dan hooks"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Inisialisasi dokumen"
author: aymericzip
---

# Dokumentasi Integrasi Astro intlayer

Integrasi `intlayer` untuk Astro mengonfigurasi proyek Anda untuk internasionalisasi multibahasa (i18n). Integrasi ini menangani persiapan kamus saat build, injeksi plugin Vite, pendaftaran middleware permintaan otomatis, serta pembuatan halaman prerender yang dilokalisasi.

## Penggunaan

Tambahkan `intlayer()` ke `astro.config.mjs` Anda:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Codemod Astro CLI (`astro add astro-intlayer`) juga menghasilkan impor default yang didukung:

```ts
import intlayer from "astro-intlayer";
```

## Deskripsi

Integrasi terhubung ke dalam siklus proses build dan runtime Astro:

1. **Konfigurasi Setup (`astro:config:setup`)**:
   - **Persiapan Kamus**: Menyiapkan kamus Intlayer dan tipe yang dihasilkan sebelum proses build berjalan.
   - **Plugin Vite**: Menyuntikkan plugin untuk alias Vite (memungkinkan impor kamus yang lancar), proksi perutean lokal, dan pemangkasan build.
   - **Pendaftaran Middleware**: Secara otomatis menyuntikkan `astro-intlayer/middleware` ke dalam rantai middleware proyek Anda, mengisi `Astro.locals.intlayer` pada setiap permintaan yang masuk.
2. **Build Selesai (`astro:build:done`)**:
   - **Penulisan Ulang Halaman**: Memeriksa aturan penulisan ulang URL lokal dan menghasilkan halaman HTML yang diprerender di jalur lokal yang sesuai.

## Apa yang Disediakan Secara Langsung

Setelah dikonfigurasi, aplikasi Astro Anda dapat langsung menggunakan:

- Hook `useIntlayer`, `useDictionary`, dan `useLocale` di dalam frontmatter komponen `.astro`.
- Objek `Astro.locals.intlayer` di endpoint dan halaman Astro.
- Impor sisi klien dalam blok `<script>` yang mencerminkan API yang sama dengan pembaruan reaktif.
- Formatter bawaan di bawah `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency`, dll.).

## Dokumentasi Terkait

- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useLocale.md)
- [Middleware `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/onRequest.md)
