---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Dokumentasi Plugin Vite intlayerCompiler | vite-intlayer
description: Plugin Vite yang mengekstrak deklarasi konten Intlayer inline dari file komponen dan menulisnya ke file JSON kamus pada waktu build/transform.
keywords:
  - intlayerCompiler
  - vite
  - plugin
  - kompilator
  - konten
  - kamus
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Dibundel ke dalam intlayer(); inisialisasi dokumen"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` adalah plugin Vite yang memindai file sumber komponen untuk **deklarasi konten Intlayer inline** — konten yang ditentukan secara langsung di dalam komponen alih-alih di file `.content.ts` terpisah — dan menulisnya ke file JSON kamus selama fase transform.

> **Sejak Intlayer v9** `intlayerCompiler` secara otomatis disertakan di dalam plugin utama [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayer.md) ketika `compiler.enabled` bernilai `true` dan `compiler.output` diatur dalam konfigurasi Intlayer Anda. Anda hanya perlu mendaftarkannya secara terpisah ketika Anda ingin kontrol penuh atas konfigurasi khusus kompilator.

## Penggunaan

### Sebagai bagian dari `intlayer()` (direkomendasikan, v9+)

Aktifkan kompilator melalui konfigurasi Intlayer Anda:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // tempat kamus yang diekstrak ditulis
  },
});
```

Kemudian gunakan plugin standar tanpa registrasi tambahan:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Mandiri (bila diperlukan)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Opsi

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Opsi             | Tipe                      | Deskripsi                                                                                        |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------ |
| `configOptions`  | `GetConfigurationOptions` | Override konfigurasi Intlayer yang diteruskan ke `getConfiguration()`.                           |
| `compilerConfig` | `Partial<CompilerConfig>` | Override untuk bagian konfigurasi khusus kompilator (misalnya `enabled`, `output`, `filesList`). |

### Contoh

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## Cara kerjanya

### Fase Transform

Untuk setiap file sumber yang cocok dengan `compiler.filesList`, plugin kompilator:

1. Meneruskan konten file melalui `extractContent` dari `@intlayer/babel`.
2. Memanggil `onExtract` untuk setiap deklarasi yang ditemukan, yang menulis JSON kamus yang dihasilkan ke `compiler.output`.
3. Mengembalikan kode sumber yang ditransformasikan dengan deklarasi inline yang digantikan oleh panggilan standar `useIntlayer('key')` / `getIntlayer('key')`.

Jenis file yang didukung: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

Ketika file komponen disimpan dalam mode pengembangan, kompilator:

1. Mendeteksi perubahan file melalui hook `handleHotUpdate` Vite.
2. Mengekstrak kembali konten dari file yang diperbarui.
3. Menulis JSON kamus yang diperbarui.
4. Memicu pemuatan ulang halaman penuh (`server.ws.send({ type: 'full-reload' })`).

Debounce 500 ms mencegah penulisan kamus itu sendiri (yang juga memicu event perubahan file) menyebabkan lingkaran ekstraksi ulang yang tak terbatas.

### Deduplikasi

`intlayerCompiler` menggunakan mekanisme deduplikasi `createPrimaryInstanceGuard` yang sama dengan plugin bawaan lainnya. Ketika panggilan `intlayer()` (yang membundel kompilator) dan panggilan manual `intlayerCompiler()` ada, hanya instans terdaftar pertama yang berjalan — tidak ada kamus yang ditulis dua kali.
