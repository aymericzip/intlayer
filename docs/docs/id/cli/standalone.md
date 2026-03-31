---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Bundel Mandiri (Standalone Bundle)
description: Pelajari cara membuat bundel JavaScript mandiri untuk konten aplikasi.
keywords:
  - Standalone
  - Bundel
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Inisialisasi dokumentasi perintah standalone"
---

# Bundel Mandiri (Standalone Bundle)

Perintah `standalone` memungkinkan Anda membuat bundel JavaScript mandiri yang berisi Intlayer dan paket lain yang ditentukan. Ini sangat berguna untuk menggunakan Intlayer di lingkungan tanpa manajer paket atau bundler, seperti aplikasi HTML/JS sederhana.

Bundel ini menggunakan [esbuild](https://esbuild.github.io/) untuk menggabungkan paket yang diminta dan dependensinya ke dalam satu file, yang dapat dengan mudah diimpor ke proyek web mana pun.

## Penggunaan

```bash
npx intlayer standalone --packages [paket...] [opsi]
```

## Opsi

- `-o, --outfile [outfile]` - Opsional. Nama file keluaran. Default: `intlayer-bundle.js`.
- `--packages [paket...]` - Wajib. Daftar paket yang akan disertakan dalam bundel (misal: `intlayer`, `vanilla-intlayer`).
- `--version [version]` - Opsional. Versi paket yang akan dibundel. Jika tidak ditentukan, versi Intlayer CLI akan digunakan secara default.
- `--minify` - Opsional. Apakah akan mengecilkan (minify) keluaran. Default: `true`.
- `--platform [platform]` - Opsional. Platform target untuk bundel (misal: `browser`, `node`). Default: `browser`.
- `--format [format]` - Opsional. Format keluaran bundel (misal: `esm`, `cjs`, `iife`). Default: `esm`.

## Opsi Umum

- `--env-file [envFile]` - File lingkungan.
- `-e, --env [env]` - Lingkungan.
- `--base-dir [baseDir]` - Direktori dasar.
- `--no-cache` - Nonaktifkan cache.
- `--verbose` - Keluaran mendetail.

## Contoh:

### Membuat bundel untuk Vanilla JS:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

Ini akan membuat file `intlayer.js` yang berisi paket `intlayer` dan `vanilla-intlayer`, dikecilkan dan dalam format ESM, siap digunakan di browser melalui tag `<script>`.

### Membundel versi tertentu:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Membundel dalam format yang berbeda:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## Apa yang dilakukan:

1. **Membuat lingkungan sementara** - Menyiapkan direktori sementara untuk mengelola dependensi.
2. **Menginstal paket** - Menggunakan `npm` atau `bun` (jika tersedia) untuk menginstal paket yang diminta dan dependensinya.
3. **Menghasilkan titik masuk** - Membuat file titik masuk sementara yang mengekspor semua paket yang diminta dan mengeksposnya sebagai variabel global saat dijalankan di browser.
4. **Membundel dengan esbuild** - Menggunakan esbuild untuk menggabungkan semuanya ke dalam satu file, menerapkan pengecilan dan pemformatan sesuai permintaan.
5. **Menghasilkan file** - Menulis bundel hasil ke jalur keluaran yang ditentukan.

## Variabel Global

Saat bundel dimuat di browser, ia mengekspos paket yang diminta sebagai variabel global pada objek `window`. Nama variabel diturunkan dari nama paket (misal: `intlayer` menjadi `Intlayer`, `vanilla-intlayer` menjadi `VanillaIntlayer`).

```javascript
// Mengakses Intlayer dari bundel
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
