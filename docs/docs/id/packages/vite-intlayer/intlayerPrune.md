---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Dokumentasi Plugin Vite | vite-intlayer
description: Lihat cara menggunakan plugin intlayerPrune untuk paket vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# Dokumentasi Plugin intlayerPrune untuk Vite

Plugin Vite `intlayerPrune` digunakan untuk melakukan tree-shaking dan memangkas kamus yang tidak terpakai dari bundle aplikasi Anda. Ini membantu mengurangi ukuran bundle akhir dengan hanya menyertakan konten multibahasa yang diperlukan.

## Penggunaan

### Sebagai bagian dari `intlayer()` (direkomendasikan)

Aktifkan pruning melalui konfigurasi Intlayer Anda dan plugin utama menangani semuanya:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // mengaktifkan pruning dan minify
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone

Jika Anda menyusun stack plugin secara manual, `intlayerPrune` dan `intlayerMinify` berbagi objek `PruneContext` yang harus dibuat sekali dan dilewatkan ke keduanya:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // opsional, membaca dari konteks yang sama
  ],
});
```

## Cara Kerjanya

### 1. Analisis Penggunaan (buildStart)

Selama `buildStart`, plugin `intlayerOptimize` (juga bagian dari `intlayer()`) memindai setiap file sumber komponen yang tercantum dalam `build.filesList`. Untuk setiap panggilan `useIntlayer('key')` atau `getIntlayer('key')`, plugin ini mencatat dengan tepat bidang mana yang diakses, misalnya:

```ts
const { title, description } = useIntlayer("myDict");
// mencatat: myDict → { title, description }
```

Ini membangun `pruneContext.fieldUsageMap` sebelum panggilan `transform` apa pun dijalankan.

### 2. JSON pruning (transform, enforce: 'pre')

Ketika Vite memproses file JSON kamus yang telah dikompilasi, `intlayerPrune` mencegat sebelum konversi JSON → ESM bawaan Vite. Ini membaca peta penggunaan field dari `pruneContext` dan menghapus setiap field konten yang tidak ada dalam set penggunaan yang tercatat.

Dua bentuk konten didukung:

- **Static dictionaries** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Field dipangkas per-locale di dalam `translation`.
- **Dynamic (per-locale) dictionaries** — flat `{ fieldA: ..., fieldB: ... }`. Field dipangkas di tingkat atas.

### 3. Kasus Edge Cases

Jika struktur konten kamus tidak dapat dikenali (misalnya, bentuk nested yang tidak biasa), kamus tersebut ditambahkan ke `pruneContext.dictionariesWithEdgeCases` dan **dibiarkan tanpa diubah**. Peringatan dicatat. `intlayerMinify` juga melewati kamus-kamus ini.

### 4. Field-rename map

Ketika pruning berhasil, `intlayerPrune` juga menulis `pruneContext.dictionaryKeyToFieldRenameMap` — sebuah pemetaan dari nama field asli ke alias pendek. `intlayerMinify` membaca peta ini untuk mengubah nama field dalam output JSON, dan Babel rename pass milik `intlayerOptimize` memperbarui akses properti dalam file sumber sesuai dengan itu.

## Kondisi Aktivasi

`intlayerPrune` aktif **hanya** ketika semua kondisi berikut terpenuhi:

1. Perintah Vite adalah `build`.
2. `build.optimize` adalah `true` (atau `undefined`, yang secara default adalah `true` untuk build).
3. `build.purge` adalah `true` dalam konfigurasi Intlayer Anda.

Proses ini tetap aktif ketika `editor.enabled` bernilai `true`: Visual editor menyelesaikan setiap pengeditan melalui `dictionaryKey` + `keyPath` terhadap kamus yang belum digabung, yang tidak pernah disentuh oleh plugin ini, dan field yang dipangkas adalah field yang tidak dibaca oleh komponen mana pun — sehingga tidak pernah dirender maupun dapat dipilih di halaman.
