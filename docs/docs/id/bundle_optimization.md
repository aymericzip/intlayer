---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Mengoptimalkan Ukuran Bundle i18n & Performa
description: Kurangi ukuran bundle aplikasi dengan mengoptimalkan konten internasionalisasi (i18n). Pelajari cara memanfaatkan tree shaking dan lazy loading untuk kamus dengan Intlayer.
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
  - version: 8.7.0
    date: 2026-04-08
    changes: "Tambahkan opsi `minify` dan `purge` ke konfigurasi build"
---

# Mengoptimalkan Ukuran Bundle i18n & Performa

Salah satu tantangan paling umum dengan solusi i18n tradisional yang mengandalkan file JSON adalah mengelola ukuran konten. Jika pengembang tidak memisahkan konten ke dalam namespace secara manual, pengguna sering kali akhirnya mengunduh terjemahan untuk setiap halaman dan berpotensi untuk setiap bahasa hanya untuk melihat satu halaman.

Misalnya, aplikasi dengan 10 halaman yang diterjemahkan ke dalam 10 bahasa dapat mengakibatkan pengguna mengunduh konten dari 100 halaman, padahal mereka hanya membutuhkan **satu** (halaman saat ini dalam bahasa saat ini). Hal ini menyebabkan pemborosan bandwidth dan waktu pemuatan yang lebih lambat.

**Intlayer menyelesaikan masalah ini melalui optimasi waktu build.** Ini menganalisis kode Anda untuk mendeteksi kamus mana yang sebenarnya digunakan per komponen dan menyuntikkan kembali hanya konten yang diperlukan ke dalam bundle Anda.

## Daftar Isi

<TOC />

## Pindai bundle Anda

Menganalisis bundle Anda adalah langkah pertama dalam mengidentifikasi file JSON yang "berat" dan peluang pemisahan kode (code-splitting). Alat-alat ini menghasilkan peta pohon (treemap) visual dari kode aplikasi Anda yang telah dikompilasi, memungkinkan Anda untuk melihat dengan tepat pustaka mana yang menghabiskan ruang paling banyak.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite menggunakan Rollup di balik layar. Plugin `rollup-plugin-visualizer` menghasilkan file HTML interaktif yang menunjukkan ukuran setiap modul dalam grafik Anda.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Buka laporan secara otomatis di browser Anda
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Untuk proyek yang menggunakan App Router dan Turbopack, Next.js menyediakan penganalisis eksperimental bawaan yang tidak memerlukan dependensi tambahan.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Jika Anda menggunakan bundler Webpack default di Next.js, gunakan penganalisis bundle resmi. Picu dengan menetapkan variabel lingkungan selama build Anda.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Konfigurasi Next.js Anda
});
```

**Penggunaan:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Webpack Standar

Untuk Create React App (ejected), Angular, atau setup Webpack kustom, gunakan standar industri `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Cara Kerjanya

Intlayer menggunakan **pendekatan per-komponen**. Tidak seperti file JSON global, konten Anda didefinisikan bersama atau di dalam komponen Anda. Selama proses build, Intlayer akan:

1.  **Menganalisis** kode Anda untuk menemukan panggilan `useIntlayer`.
2.  **Membangun** konten kamus yang sesuai.
3.  **Mengganti** panggilan `useIntlayer` dengan kode yang dioptimalkan berdasarkan konfigurasi Anda.

Ini memastikan bahwa:

- Jika komponen tidak diimpor, kontennya tidak disertakan dalam bundle (Dead Code Elimination).
- Jika komponen dimuat secara lambat (lazy-loaded), kontennya juga dimuat secara lambat.

## Setup Berdasarkan Platform

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js memerlukan plugin `@intlayer/swc` untuk menangani transformasi, karena Next.js menggunakan SWC untuk build.

> Plugin ini tidak diinstal secara default karena plugin SWC masih eksperimental untuk Next.js. Ini mungkin berubah di masa mendatang.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Setelah Diinstal. Intlayer akan secara otomatis mendeteksi dan menggunakan plugin tersebut.

 </Tab>
 <Tab value="vite">

### Vite

Vite menggunakan plugin `@intlayer/babel` yang disertakan sebagai dependensi dari `vite-intlayer`. Optimasi diaktifkan secara default. Tidak ada hal lain yang perlu dilakukan.

 </Tab>
 <Tab value="webpack">

### Webpack

Untuk mengaktifkan optimasi bundle dengan Intlayer di Webpack, Anda perlu menginstal dan mengonfigurasi plugin Babel (`@intlayer/babel`) atau SWC (`@intlayer/swc`) yang sesuai.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

```typescript fileName="babel.config.js"
const {
  getOptimizePluginOptions,
  intlayerOptimizeBabelPlugin,
} = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## Konfigurasi

Anda dapat mengontrol cara Intlayer mengoptimalkan bundle Anda melalui properti `build` di `intlayer.config.ts` Anda.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * Minifikasi kamus untuk memperkecil ukuran bundle.
     */
     minify: true;

    /**
     * Hapus (purge) kunci yang tidak digunakan dalam kamus
     */
     purge: true;

    /**
     * Menunjukkan apakah build harus memeriksa tipe TypeScript
     */
    checkTypes: false;
  },
};

export default config;
```

> Mempertahankan opsi default untuk `optimize` direkomendasikan dalam sebagian besar kasus.

> Lihat dok konfigurasi untuk detail lebih lanjut: [Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

### Opsi Build

Opsi berikut tersedia di bawah objek konfigurasi `build`:

| Properti       | Tipe      | Default     | Deskripsi                                                                                                                                                                                                    |
| :------------- | :-------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | Mengontrol apakah optimasi build diaktifkan. Jika `true`, Intlayer mengganti panggilan kamus dengan suntikan yang dioptimalkan. Jika `false`, optimasi dinonaktifkan. Idealnya diatur ke `true` di produksi. |
| **`minify`**   | `boolean` | `false`     | Apakah akan meminimalkan kamus untuk memperkecil ukuran bundle.                                                                                                                                              |
| **`purge`**    | `boolean` | `false`     | Apakah akan menghapus kunci yang tidak digunakan dalam kamus.                                                                                                                                                |

### Minifikasi

Meminimalkan kamus akan menghapus spasi putih yang tidak perlu, komentar, dan mengurangi ukuran konten JSON. Ini sangat berguna untuk kamus besar.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Catatan: Minifikasi diabaikan jika `optimize` dinonaktifkan atau jika Editor Visual diaktifkan (karena editor memerlukan konten lengkap untuk memungkinkan pengeditan).

### Purging

Purging memastikan bahwa hanya kunci yang benar-benar digunakan dalam kode Anda yang disertakan dalam bundle kamus akhir. Ini dapat secara signifikan mengurangi ukuran bundle Anda jika Anda memiliki kamus besar dengan banyak kunci yang tidak digunakan di setiap bagian aplikasi Anda.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Catatan: Purging diabaikan jika `optimize` dinonaktifkan.

### Mode Impor

Untuk aplikasi besar, termasuk beberapa halaman dan lokal, JSON Anda dapat mewakili bagian yang signifikan dari ukuran bundle Anda. Intlayer memungkinkan Anda untuk mengontrol bagaimana kamus dimuat.

Mode impor dapat didefinisikan secara default secara global dalam file `intlayer.config.ts` Anda.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

Serta untuk setiap kamus dalam file `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` Anda.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Menimpa mode impor default
  content: {
    // ...
  },
};

export default appContent;
```

| Properti         | Tipe                               | Default    | Deskripsi                                                                                                               |
| :--------------- | :--------------------------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Usang**: Gunakan `dictionary.importMode` sebagai gantinya. Menentukan bagaimana kamus dimuat (lihat detail di bawah). |

Pengaturan `importMode` menentukan bagaimana konten kamus disuntikkan ke dalam komponen Anda.
Anda dapat mendefinisikannya secara global dalam file `intlayer.config.ts` di bawah objek `dictionary`, atau Anda dapat menimpanya untuk kamus tertentu dalam file `.content.ts` nya.

### 1. Mode Statis (`default`)

Dalam mode statis, Intlayer mengganti `useIntlayer` dengan `useDictionary` dan menyuntikkan kamus langsung ke dalam bundle JavaScript.

- **Kelebihan:** Rendering instan (sinkron), nol permintaan jaringan ekstra selama hidrasi.
- **Kekurangan:** Bundle menyertakan terjemahan untuk **semua** bahasa yang tersedia untuk komponen tertentu tersebut.
- **Terbaik untuk:** Single Page Applications (SPA).

**Contoh Kode yang Ditransformasi:**

```tsx
// Kode Anda
const content = useIntlayer("my-key");

// Kode yang dioptimalkan (Statis)
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

Dalam mode dinamis, Intlayer mengganti `useIntlayer` dengan `useDictionaryAsync`. Ini menggunakan `import()` (mekanisme seperti Suspense) untuk memuat secara lambat (lazy-load) khususnya JSON untuk lokal saat ini.

- **Kelebihan:** **Locale-level tree shaking.** Pengguna yang melihat versi bahasa Inggris _hanya_ akan mengunduh kamus bahasa Inggris. Kamus bahasa Prancis tidak pernah dimuat.
- **Kekurangan:** Memicu permintaan jaringan (pengambilan aset) per komponen selama hidrasi.
- **Terbaik untuk:** Blok teks besar, artikel, atau aplikasi yang mendukung banyak bahasa di mana ukuran bundle sangat penting.

**Contoh Kode yang Ditransformasi:**

```tsx
// Kode Anda
const content = useIntlayer("my-key");

// Kode yang dioptimalkan (Dinamis)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> Saat menggunakan `importMode: 'dynamic'`, jika Anda memiliki 100 komponen yang menggunakan `useIntlayer` pada satu halaman, browser akan mencoba 100 pengambilan terpisah. Untuk menghindari "air terjun" permintaan ini, kelompokkan konten ke dalam lebih sedikit file `.content` (misalnya, satu kamus per bagian halaman) daripada satu per komponen atom.

### 3. Mode Fetch

Berperilaku mirip dengan mode Dinamis tetapi mencoba mengambil kamus dari Intlayer Live Sync API terlebih dahulu. Jika panggilan API gagal atau konten tidak ditandai untuk pembaruan langsung, ia akan kembali ke impor dinamis.

> Lihat dok CMS untuk detail lebih lanjut: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

> Dalam mode fetch, pembersihan (purge) dan minifikasi tidak dapat digunakan.

## Ringkasan: Statis vs Dinamis

| Fitur                        | Mode Statis                                        | Mode Dinamis                              |
| :--------------------------- | :------------------------------------------------- | :---------------------------------------- |
| **Ukuran Bundle JS**         | Lebih besar (termasuk semua bahasa untuk komponen) | Terkecil (hanya kode, tanpa konten)       |
| **Pemuatan Awal**            | Instan (Konten ada dalam bundle)                   | Sedikit tertunda (Mengambil JSON)         |
| **Permintaan Jaringan**      | 0 permintaan ekstra                                | 1 permintaan per kamus                    |
| **Tree Shaking**             | Tingkat komponen                                   | Tingkat komponen + Tingkat lokal          |
| **Kasus Penggunaan Terbaik** | Komponen UI, Aplikasi Kecil                        | Halaman dengan banyak teks, Banyak Bahasa |
