---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "Dokumentasi Paket @intlayer/babel"
description: Plugin Babel untuk Intlayer untuk menangani ekstraksi konten, optimasi impor, pemangkasan bidang yang tidak digunakan, dan pengaburan nama bidang selama pembuatan.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - internasionalisasi
  - i18n
  - kompilator
  - optimasi
  - pangkas
  - minifikasi
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Penyatuan dokumentasi semua ekspor"
author: aymericzip
---

# Paket @intlayer/babel

Paket `@intlayer/babel` menyediakan satu set plugin Babel khusus untuk Intlayer. Plugin ini mencakup seluruh siklus pembuatan: mengekstrak deklarasi konten, menulis ulang panggilan `useIntlayer` / `getIntlayer` menjadi impor kamus yang dioptimalkan, memangkas bidang yang tidak digunakan, dan meminifikasi nama bidang.

## Instalasi

```bash
npm install @intlayer/babel
```

## Ekspor

Impor:

```ts
import { ... } from "@intlayer/babel";
```

---

### Plugin

| Fungsi / Kelas                 | Deskripsi                                                                                                                                                                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | Plugin Babel yang mengekstrak konten yang dapat diterjemahkan dari file sumber dan menyuntikkan kait (hook) `useIntlayer` / `getIntlayer` secara otomatis. Dirancang untuk digunakan dengan Next.js dan alat build berbasis Babel. |
| `intlayerOptimizeBabelPlugin`  | Plugin Babel yang mentransformasikan panggilan `useIntlayer` dan `getIntlayer` dan menulis ulang impor mereka ke impor kamus JSON yang dioptimalkan (statis, dinamis, atau melalui fetch).                                         |
| `intlayerPurgeBabelPlugin`     | Plugin Babel yang menganalisis file sumber dan menulis ulang file kamus JSON yang dikompilasi untuk menghapus bidang yang tidak digunakan (`build.purge`) atau mengganti namanya menjadi alias pendek (`build.minify`).            |
| `intlayerMinifyBabelPlugin`    | Plugin Babel yang menulis ulang file sumber untuk menggunakan alias bidang pendek yang ditetapkan selama fase minifikasi (misalnya `content.title` ← `content.a`). Bergantung pada `intlayerPurgeBabelPlugin`.                     |
| `makeFieldRenameBabelPlugin`   | Fungsi pabrik (factory) yang menghasilkan plugin Babel untuk mengganti nama akses bidang konten kamus dalam file sumber sesuai dengan `dictionaryKeyToFieldRenameMap` yang diisi dalam `PruneContext`.                             |
| `makeUsageAnalyzerBabelPlugin` | Fungsi pabrik yang menghasilkan plugin Babel untuk menganalisis penggunaan `useIntlayer` / `getIntlayer` dalam kode sumber dan mengumpulkan data penggunaan bidang dalam `PruneContext` bersama.                                   |
| `getSharedPruneContext`        | Fungsi pembantu yang mengembalikan objek `PruneContext` bersama untuk direktori basis yang ditentukan, atau `null` jika belum diinisialisasi.                                                                                      |

---

### Utilitas Konfigurasi Plugin

| Fungsi                     | Deskripsi                                                                                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | Memuat konfigurasi Intlayer dan mengembalikan `ExtractPluginOptions` yang siap digunakan dengan `intlayerExtractBabelPlugin`.                               |
| `getOptimizePluginOptions` | Memuat konfigurasi Intlayer dan kamus yang dikompilasi, dan mengembalikan `OptimizePluginOptions` yang siap digunakan dengan `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | Memuat konfigurasi Intlayer dan mengembalikan `PurgePluginOptions` yang siap digunakan dengan `intlayerPurgeBabelPlugin`.                                   |
| `getMinifyPluginOptions`   | Memuat konfigurasi Intlayer dan mengembalikan `MinifyPluginOptions` yang siap digunakan dengan `intlayerMinifyBabelPlugin`.                                 |

---

### Tipe

| Tipe                    | Deskripsi                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | Mode kompilator: `'dev'` untuk pengembangan dengan dukungan HMR, atau `'build'` untuk build produksi.                        |
| `ExtractPluginOptions`  | Opsi untuk `intlayerExtractBabelPlugin`: daftar file, konfigurasi, callback `onExtract`, dll.                                |
| `ExtractResult`         | Hasil ekstraksi: kunci kamus, jalur file, konten, dan lokal.                                                                 |
| `OptimizePluginOptions` | Opsi untuk `intlayerOptimizeBabelPlugin`: jalur kamus, mode impor, peta mode per kamus, dll.                                 |
| `PurgePluginOptions`    | Opsi untuk `intlayerPurgeBabelPlugin`: direktori basis, bendera purge/minify/optimize, daftar file komponen.                 |
| `MinifyPluginOptions`   | Opsi untuk `intlayerMinifyBabelPlugin`: direktori basis, bendera minify/optimize/editorEnabled.                              |
| `PruneContext`          | Keadaan bersama antara analisis dan plugin pemangkasan: peta penggunaan bidang, peta nama baru, dll.                         |
| `DictionaryFieldUsage`  | Hasil penggunaan bidang untuk satu kamus: `Set<string>` atau `'all'` ketika analisis statis tidak meyakinkan.                |
| `NestedRenameEntry`     | Node di pohon penggantian nama: `shortName` dan peta anak.                                                                   |
| `NestedRenameMap`       | Satu level di pohon penggantian nama: `Map<string, NestedRenameEntry>`.                                                      |
| `CompatCallerConfig`    | Konfigurasi untuk penganalisis penggunaan yang kompatibel untuk paket `compat-adapter` (nama pemanggil dan opsi pemrosesan). |
| `ScriptBlock`           | Blok skrip yang diekstrak dari file SFC (Vue atau Svelte): konten, offset awal, dan offset akhir.                            |

---

### Fungsi Utilitas

| Fungsi                            | Deskripsi                                                                                                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | Mengonversi bilangan bulat (mulai dari nol) menjadi pengidentifikasi alfabet pendek: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, dll.                               |
| `buildNestedRenameMapFromContent` | Membangun `NestedRenameMap` secara rekursif dari nilai konten kamus yang dikompilasi, dengan menghormati struktur node Intlayer (translation, enumeration, dll.). |
| `createPruneContext`              | Membuat objek `PruneContext` kosong baru yang diinisialisasi dengan nilai default.                                                                                |
| `extractScriptBlocks`             | Mengekstrak blok `<script>` dari file SFC (Vue / Svelte) untuk analisis Babel berikutnya.                                                                         |
| `BABEL_PARSER_OPTIONS`            | Konstanta yang mewakili opsi parser Babel yang mencakup kerangka kerja yang didukung (React/Vue/Svelte/Angular/...).                                              |
| `INTLAYER_CALLER_NAMES`           | Daftar konstanta nama pemanggil Intlayer asli: `['useIntlayer', 'getIntlayer']`.                                                                                  |

---

## Contoh Penggunaan

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **Catatan:** `intlayerPurgeBabelPlugin` harus dideklarasikan **sebelum** `intlayerMinifyBabelPlugin`, karena yang terakhir membaca peta penggantian nama yang dibuat oleh yang pertama. Selain itu, keduanya harus didahului oleh `intlayerOptimizeBabelPlugin` sehingga ia dapat melihat kunci kamus sebelum panggilan `useIntlayer` ditulis ulang.
