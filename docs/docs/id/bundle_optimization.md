---
createdAt: 2025-11-25
updatedAt: 2025-11-25
title: Mengoptimalkan Ukuran & Performa Bundle i18n
description: Mengurangi ukuran bundle aplikasi dengan mengoptimalkan konten internasionalisasi (i18n). Pelajari cara memanfaatkan tree shaking dan lazy loading untuk kamus dengan Intlayer.
keywords:
  - Optimasi Bundle
  - Otomasi Konten
  - Konten Dinamis
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 6.0.0
    date: 2025-11-25
    changes: Inisialisasi riwayat
---

# Mengoptimalkan Ukuran & Performa Bundle i18n

Salah satu tantangan paling umum dengan solusi i18n tradisional yang mengandalkan file JSON adalah mengelola ukuran konten. Jika pengembang tidak secara manual memisahkan konten ke dalam namespace, pengguna sering kali harus mengunduh terjemahan untuk setiap halaman dan berpotensi setiap bahasa hanya untuk melihat satu halaman saja.

Misalnya, sebuah aplikasi dengan 10 halaman yang diterjemahkan ke dalam 10 bahasa mungkin mengakibatkan pengguna mengunduh konten dari 100 halaman, meskipun mereka hanya membutuhkan **satu** (halaman saat ini dalam bahasa saat ini). Hal ini menyebabkan pemborosan bandwidth dan waktu muat yang lebih lambat.

> Untuk mendeteksinya, Anda dapat menggunakan bundle analyzer seperti `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js), atau `webpack-bundle-analyzer` (React CRA / Angular / dll).

**Intlayer menyelesaikan masalah ini melalui optimasi saat build.** Intlayer menganalisis kode Anda untuk mendeteksi kamus mana yang benar-benar digunakan per komponen dan hanya menyuntikkan kembali konten yang diperlukan ke dalam bundle Anda.

## Cara Kerjanya

Intlayer menggunakan **pendekatan per-komponen**. Berbeda dengan file JSON global, konten Anda didefinisikan berdampingan atau di dalam komponen Anda. Selama proses build, Intlayer:

1.  **Menganalisis** kode Anda untuk menemukan panggilan `useIntlayer`.
2.  **Membangun** konten kamus yang sesuai.
3.  **Mengganti** panggilan `useIntlayer` dengan kode yang dioptimalkan berdasarkan konfigurasi Anda.

Ini memastikan bahwa:

- Jika sebuah komponen tidak diimpor, kontennya tidak disertakan dalam bundle (Eliminasi Kode Mati).
- Jika sebuah komponen dimuat secara lazy, kontennya juga dimuat secara lazy.

## Setup berdasarkan Platform

### Next.js

Next.js memerlukan plugin `@intlayer/swc` untuk menangani transformasi, karena Next.js menggunakan SWC untuk proses build.

> Plugin ini terpasang secara default karena plugin SWC masih bersifat eksperimental untuk Next.js. Hal ini mungkin akan berubah di masa depan.

### Vite

Vite menggunakan plugin `@intlayer/babel` yang sudah termasuk sebagai dependensi dari `vite-intlayer`. Optimasi ini diaktifkan secara default.

### Webpack

Untuk mengaktifkan optimasi bundle dengan Intlayer pada Webpack, Anda perlu menginstal dan mengonfigurasi plugin Babel (`@intlayer/babel`) atau SWC (`@intlayer/swc`) yang sesuai.

### Expo / Lynx

Optimasi bundle **belum tersedia** untuk platform ini. Dukungan akan ditambahkan pada rilis mendatang.

## Konfigurasi

Anda dapat mengontrol bagaimana Intlayer mengoptimalkan bundle Anda melalui properti `build` di dalam `intlayer.config.ts` Anda.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // atau 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> Menjaga opsi default untuk `optimize` direkomendasikan dalam sebagian besar kasus.

> Lihat dokumentasi konfigurasi untuk detail lebih lanjut: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

### Opsi Build

Opsi berikut tersedia di bawah objek konfigurasi `build`:

| Properti              | Tipe                                      | Default                         | Deskripsi                                                                                                                                                                                                          |
| :-------------------- | :---------------------------------------- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**        | `boolean`                                 | `undefined`                     | Mengontrol apakah optimasi build diaktifkan. Jika `true`, Intlayer menggantikan pemanggilan kamus dengan injeksi yang dioptimalkan. Jika `false`, optimasi dinonaktifkan. Idealnya diatur ke `true` pada produksi. |
| **`importMode`**      | `'static' &#124; 'dynamic' &#124; 'live'` | `'static'`                      | Menentukan bagaimana kamus dimuat (lihat detail di bawah).                                                                                                                                                         |
| **`traversePattern`** | `string[]`                                | `['**/*.{js,ts,jsx,tsx}', ...]` | Pola glob yang menentukan file mana yang harus dipindai oleh Intlayer untuk optimasi. Gunakan ini untuk mengecualikan file yang tidak terkait dan mempercepat proses build.                                        |
| **`outputFormat`**    | `'esm' &#124; 'cjs'`                      | `'esm'`                         | Mengontrol format output dari kamus yang dibangun.                                                                                                                                                                 |

## Mode Impor

Pengaturan `importMode` menentukan bagaimana konten kamus disuntikkan ke dalam komponen Anda.

### 1. Mode Statis (`default`)

Dalam mode statis, Intlayer menggantikan `useIntlayer` dengan `useDictionary` dan menyuntikkan kamus langsung ke dalam bundle JavaScript.

- **Kelebihan:** Rendering instan (sinkron), tanpa permintaan jaringan tambahan selama hidrasi.
- **Kekurangan:** Bundle menyertakan terjemahan untuk **semua** bahasa yang tersedia untuk komponen tersebut.
- **Cocok untuk:** Single Page Applications (SPA).

**Contoh Kode yang Dioptimalkan:**

```tsx
// Kode Anda
const content = useIntlayer("my-key");

// Kode yang Dioptimalkan (Statis)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Mode Dinamis

Dalam mode dinamis, Intlayer menggantikan `useIntlayer` dengan `useDictionaryAsync`. Ini menggunakan `import()` (mekanisme mirip Suspense) untuk memuat malas secara spesifik JSON untuk locale saat ini.

- **Kelebihan:** **Tree shaking tingkat locale.** Pengguna yang melihat versi bahasa Inggris akan _hanya_ mengunduh kamus bahasa Inggris. Kamus bahasa Prancis tidak pernah dimuat.
- **Kekurangan:** Memicu permintaan jaringan (pengambilan aset) per komponen selama hidrasi.
- **Terbaik untuk:** Blok teks besar, artikel, atau aplikasi yang mendukung banyak bahasa di mana ukuran bundle sangat penting.

**Contoh Kode yang Dioptimalkan:**

```tsx
// Kode Anda
const content = useIntlayer("my-key");

// Kode yang Dioptimalkan (Dinamis)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> Saat menggunakan `importMode: 'dynamic'`, jika Anda memiliki 100 komponen yang menggunakan `useIntlayer` pada satu halaman, browser akan mencoba melakukan 100 pengambilan terpisah. Untuk menghindari "air terjun" permintaan ini, kelompokkan konten ke dalam lebih sedikit file `.content` (misalnya, satu kamus per bagian halaman) daripada satu per komponen atom.

> Saat ini, `importMode: 'dynamic'` belum sepenuhnya didukung untuk Vue dan Svelte. Disarankan menggunakan `importMode: 'static'` untuk framework ini sampai pembaruan lebih lanjut.

### 3. Mode Live

Berperilaku mirip dengan mode Dynamic tetapi mencoba mengambil kamus dari Intlayer Live Sync API terlebih dahulu. Jika panggilan API gagal atau konten tidak ditandai untuk pembaruan langsung, maka akan kembali ke impor dinamis.

> Lihat dokumentasi CMS untuk detail lebih lanjut: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

## Ringkasan: Static vs Dynamic

| Fitur                | Mode Static                                        | Mode Dynamic                              |
| :------------------- | :------------------------------------------------- | :---------------------------------------- |
| **Ukuran Bundle JS** | Lebih besar (termasuk semua bahasa untuk komponen) | Paling kecil (hanya kode, tanpa konten)   |
| **Initial Load**     | Instan (Konten ada dalam bundle)                   | Sedikit penundaan (Mengambil JSON)        |
| **Network Requests** | 0 permintaan tambahan                              | 1 permintaan per kamus                    |
| **Tree Shaking**     | Tingkat komponen                                   | Tingkat komponen + tingkat lokal          |
| **Best Use Case**    | Komponen UI, Aplikasi kecil                        | Halaman dengan banyak teks, Banyak Bahasa |
