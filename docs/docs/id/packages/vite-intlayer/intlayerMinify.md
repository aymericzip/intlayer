---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Dokumentasi Plugin Vite intlayerMinify | vite-intlayer
description: Plugin Vite yang meminifikasi file JSON kamus Intlayer yang dikompilasi dan secara opsional mengaburkan nama bidang konten untuk mengurangi ukuran bundel.
keywords:
  - intlayerMinify
  - vite
  - plugin
  - minify
  - bundle size
  - kamus
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Inisialisasi dokumen"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` adalah plugin Vite yang meminifikasi file JSON kamus yang dikompilasi selama build produksi. Ini menghapus semua whitespace yang tidak perlu dan, ketika digabungkan dengan `intlayerPrune`, secara opsional mengganti nama bidang konten menjadi alias alfabet pendek (`a`, `b`, `c`, …) untuk lebih mengurangi ukuran bundel.

> Plugin ini sudah disertakan dan dikonfigurasi secara otomatis saat Anda menggunakan [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayer.md). Anda hanya perlu mendaftarkannya secara manual jika Anda menyusun plugin stack sendiri.

## Penggunaan

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## Kondisi aktivasi

`intlayerMinify` aktif **hanya** jika ketiga hal berikut bernilai true:

1. Perintah Vite adalah `build` (bukan `serve` / dev).
2. `build.optimize` bernilai `true` (atau `undefined`, yang secara default bernilai `true` untuk build).
3. `build.minify` bernilai `true` dalam konfigurasi Intlayer Anda.

Ini secara otomatis **dinonaktifkan** ketika `editor.enabled` bernilai `true` karena editor memerlukan konten kamus yang lengkap dan dapat dibaca manusia.

## Apa yang diminifikasi

Plugin ini menargetkan dua lokasi kamus (seperti yang diselesaikan dari `intlayer.system`):

- `dictionariesDir` — kamus semua-bahasa statis (misalnya `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — kamus dinamis per-bahasa

> Kamus mode ambil (`fetchDictionariesDir`) **tidak pernah** diminifikasi karena disajikan dari API jarak jauh saat runtime menggunakan nama bidang asli mereka. Mengganti nama bidang akan membuat ketidakcocokan antara respons server dan akses properti di sisi klien.

## Pengaburan nama bidang (minifikasi properti)

Ketika `intlayerPrune` telah menganalisis codebase dan mengisi `pruneContext.dictionaryKeyToFieldRenameMap`, `intlayerMinify` juga mengganti nama bidang konten menjadi alias pendek. Sebagai contoh:

```json
// sebelum
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// sesudah (dengan pengaburan)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

Akses properti file sumber yang sesuai diganti namanya oleh proses Babel di dalam `intlayerOptimize`, sehingga perilaku runtime tidak berubah.

Bidang internal Intlayer (`nodeType`, `translation`, dll.) tidak pernah diganti namanya.

## Kamus kasus khusus (Edge-cases)

Kamus yang ditandai dalam `pruneContext.dictionariesWithEdgeCases` (anomali struktural yang terdeteksi selama fase prune) dilewati sepenuhnya — tidak diminifikasi maupun dikaburkan — untuk menghindari pengiriman data yang rusak.

## Grup berkualifikasi (koleksi / varian / rekaman meta)

Untuk kamus dengan array `qualifierTypes` (koleksi, varian, dan rekaman meta), plugin mempertahankan array `qualifierTypes` dan peta samping `meta` secara harfiah. Hanya entri `content` yang nama bidangnya dikaburkan. Kunci komposit (yang digunakan untuk pencocokan selektor saat runtime) tidak pernah disentuh.
