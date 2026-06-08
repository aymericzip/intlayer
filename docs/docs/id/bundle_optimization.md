---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: Optimasi Ukuran Bundle & Performa i18n
description: Kurangi ukuran bundle aplikasi Anda dengan mengoptimalkan konten internasionalisasi (i18n). Pelajari cara memanfaatkan tree shaking dan lazy loading untuk kamus menggunakan Intlayer.
keywords:
  - Bundle Optimisation
  - Content Automation
  - Dynamic Content
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "Menambahkan `intlayerPurgeBabelPlugin` dan `intlayerMinifyBabelPlugin` untuk Babel/Webpack; menjelaskan pipeline plugin"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Menambahkan opsi `minify` dan `purge` ke konfigurasi build"
---

# Optimasi Ukuran Bundle & Performa i18n

Salah satu tantangan paling umum dari solusi i18n tradisional yang bergantung pada file JSON adalah mengelola ukuran konten. Jika developer tidak secara manual memisahkan konten ke dalam berbagai namespace, sering kali pengguna akan mengunduh terjemahan untuk semua halaman dan berpotensi untuk semua bahasa hanya demi melihat satu halaman saja.

Sebagai contoh, sebuah aplikasi dengan 10 halaman yang diterjemahkan ke dalam 10 bahasa dapat menyebabkan pengguna mengunduh konten yang setara dengan 100 halaman, meskipun mereka sebenarnya hanya membutuhkan **satu** (halaman yang saat ini dibuka dalam bahasa yang sedang digunakan). Hal ini menyebabkan pemborosan bandwidth dan waktu pemuatan (load time) yang lebih lambat.

**Intlayer menyelesaikan masalah ini melalui optimasi build-time.** Ia menganalisis kode Anda untuk mendeteksi secara pasti kamus mana yang benar-benar digunakan per komponen dan hanya menyuntikkan ulang konten yang diperlukan ke dalam bundle Anda.

## Daftar Isi

<TOC />

## Analisis bundle Anda

Menganalisis bundle Anda adalah langkah pertama untuk mengidentifikasi file JSON yang "berat" dan mencari peluang code-splitting. Alat-alat ini menghasilkan treemap visual dari kode aplikasi Anda yang sudah dikompilasi, memungkinkan Anda melihat persis pustaka mana yang menghabiskan ruang paling banyak.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite menggunakan Rollup di balik layar. Plugin `rollup-plugin-visualizer` menghasilkan file HTML interaktif yang menunjukkan ukuran setiap modul dalam graf Anda.

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

Untuk proyek yang menggunakan App Router dan Turbopack, Next.js menyediakan analyzer eksperimental bawaan yang tidak memerlukan dependensi ekstra.

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

Jika Anda menggunakan bundler Webpack default di Next.js, gunakan bundle analyzer resminya. Pemicu jalannya alat ini bisa diatur menggunakan environment variable selama proses build.

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

### Standard Webpack

Untuk Create React App (ejected), Angular, atau setup kustom Webpack, gunakan standar industri `webpack-bundle-analyzer`.

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

```typescript fileName="webpack.config.ts"
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

## Bagaimana cara kerjanya

Intlayer menggunakan pendekatan **per komponen (per-component)**. Berbeda dengan file JSON global, konten Anda didefinisikan bersamaan dengan atau di dalam komponen Anda. Selama proses build, Intlayer akan:

1. **Menganalisis** kode Anda untuk menemukan pemanggilan `useIntlayer`.
2. **Mem-build** konten kamus yang bersesuaian.
3. **Mengganti** pemanggilan `useIntlayer` dengan kode yang sudah dioptimalkan berdasarkan konfigurasi Anda.

Hal ini memastikan bahwa:

- Jika komponen tidak diimpor, kontennya tidak disertakan dalam bundle (Dead Code Elimination).
- Jika komponen dimuat secara lazy (lazy-loaded), kontennya juga dimuat secara lazy.

## Referensi Plugin

Optimasi build dari Intlayer terbagi menjadi beberapa plugin terpisah yang masing-masing memiliki satu tanggung jawab saja. Memahami apa yang dilakukan oleh setiap plugin akan mencegah kebingungan saat mengonfigurasikannya.

### Plugin Babel (`@intlayer/babel`)

Plugin-plugin ini digunakan secara langsung di dalam `babel.config.js` untuk setup berbasis Webpack (Next.js dengan Babel, CRA, kustom Webpack, dll).

| Plugin                        | Apa yang dilakukannya                                                                                                  |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | Memindai file `.content.ts` dan menulis kamus yang telah dikompilasi ke direktori `.intlayer/`                         |
| `intlayerOptimizeBabelPlugin` | Menulis ulang `useIntlayer('key')` menjadi `useDictionary(hash)` dan menyuntikkan (injects) `import` kamus yang sesuai |
| `intlayerPurgeBabelPlugin`    | Memindai semua file source, menghapus **field konten yang tidak terpakai** dari file kamus `.intlayer/**/*.json`       |
| `intlayerMinifyBabelPlugin`   | **Mengganti nama kunci (keys) konten** menjadi alias alfabet yang pendek (`title` → `a`) di file JSON maupun source    |

> **Urutan plugin sangat penting.** Di dalam `babel.config.js`, plugin purge dan minify harus ditempatkan **sebelum** plugin optimize. Langkah optimize menggantikan `useIntlayer('key')` dengan pemanggilan `useDictionary(hash)` yang menyembunyikan informasi 'key' dari kamus. Informasi 'key' ini sangat diperlukan oleh tahap purge dan minify untuk mengidentifikasi field mana yang dipakai.

Setiap plugin Babel memiliki "options helper" yang berhubungan untuk membaca `intlayer.config.ts` Anda hanya sekali pada saat memuat konfigurasi, lalu mengembalikan nilai-nilai (values) yang sudah diselesaikan (resolved):

| Options helper               | Digunakan dengan              |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Plugin Vite (`vite-intlayer`)

Pengguna Vite **tidak pernah mengonfigurasi ini secara langsung**. Plugin ini terpasang secara otomatis ketika Anda memanggil `withIntlayer()` di dalam `vite.config.ts`. Flag (penanda) `build.purge` dan `build.minify` di `intlayer.config.ts` dapat menghidupkan/mematikan perilakunya tanpa perlu me-register plugin tambahan apa pun.

| Plugin Vite Internal | Perilaku ekuivalen                                                                                  |
| :------------------- | :-------------------------------------------------------------------------------------------------- |
| Usage analyzer       | Sama seperti pass analisis (analyse) dari `intlayerPurgeBabelPlugin`                                |
| Dictionary prune     | Sama seperti pass penulisan JSON dari `intlayerPurgeBabelPlugin`                                    |
| Dictionary minify    | Sama seperti pass penulisan JSON dari `intlayerMinifyBabelPlugin`                                   |
| Babel transform      | Sama seperti penggantian nama kode dari `intlayerMinifyBabelPlugin` + `intlayerOptimizeBabelPlugin` |

## Setup berdasarkan Platform

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js memerlukan plugin `@intlayer/swc` untuk optimasi pass (menulis ulang import), karena Next.js menggunakan SWC untuk proses build-nya.

> Plugin ini tidak terpasang secara default karena plugin SWC masih berada pada tahap eksperimental untuk Next.js. Hal ini dapat berubah di masa yang akan datang.

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

Setelah dipasang, Intlayer akan mendeteksi dan menggunakan plugin ini secara otomatis.

Untuk langkah **purge dan minify** (menghapus field dan mengganti nama field), instal `@intlayer/babel` bersamanya dan tambahkan plugin Babel tersebut. Walaupun Next.js menggunakan SWC untuk proses transformasi namun ia tetap mengevaluasi `babel.config.js` untuk plugin config, jadi plugin Babel ini berjalan sebagai pra-langkah sebelum SWC dieksekusi.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: menghapus field konten yang tidak digunakan dari .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: mengubah nama field konten di JSON + source code
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Catatan: intlayerOptimizeBabelPlugin TIDAK DIBUTUHKAN di sini karena
    // @intlayer/swc yang menangani penggantian useIntlayer → useDictionary.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite menggunakan plugin `@intlayer/babel`, yang disertakan sebagai dependensi dari `vite-intlayer`. Proses pipeline optimasi penuh — penulisan ulang import, purge, dan minify — aktif secara otomatis (default) dan tidak memerlukan tambahan setup apa pun.

Aktifkan purge dan minify dengan menetapkan flag terkait di `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // hapus field konten tak terpakai dari JSON yang dibundel
    minify: true, // ubah kunci field konten ke alias yang pendek
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (dan Next.js dengan Babel)

Instal `@intlayer/babel`:

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

Tambahkan keempat plugin ke dalam `babel.config.js` secara berurutan:

```javascript fileName="babel.config.js"
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
  plugins: [
    // Extract: mengompilasi file .content.ts → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: menghapus field tidak terpakai dari .intlayer/**/*.json
    //    (membaca nilai flag build.purge di intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: mengganti field keys di JSON + source code
    //    (membaca nilai flag build.minify di intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: menulis ulang useIntlayer('key') → useDictionary(hash)
    //    Harus ditempatkan paling akhir karena akan menghapus dictionary key.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Konfigurasi

Anda dapat mengontrol cara Intlayer mengoptimalkan bundle Anda menggunakan properti `build` di file `intlayer.config.ts` Anda.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.INDONESIAN],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Mengganti pemanggilan useIntlayer() secara langsung dengan dictionary import pada saat build.
    // undefined = auto (aktif di mode produksi), true = always, false = never.
    optimize: undefined,

    // Mengganti field keys dari kamus hasil kompilasi ke nama alias alfabet
    // yang lebih singkat (contoh title → a). Memperkecil ukuran JSON; butuh opsi optimize.
    minify: true,

    // Menghapus field konten yang sama sekali tidak dipanggil secara eksplisit di source code.
    // Membutuhkan opsi optimize.
    purge: true,
  },
};

export default config;
```

> Anda sangat disarankan untuk tetap menggunakan nilai default (`undefined`) pada pengaturan `optimize` di sebagian besar kasus.

> Lihat referensi konfigurasi secara menyeluruh untuk melihat semua opsi yang tersedia: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

### Opsi Build

| Properti       | Tipe                   | Default     | Deskripsi                                                                                                                                                                                                                |
| :------------- | :--------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean \| undefined` | `undefined` | Mengaktifkan tahap import rewrite (menulis ulang impor). `undefined` = hanya aktif di dalam build produksi. Setel ke `false` untuk mematikan semua opsi purge dan minify.                                                |
| **`minify`**   | `boolean`              | `false`     | Mengganti field keys di file JSON yang sudah terkompilasi menggunakan alias pendek. Juga menulis ulang segala property access yang setara di source code Anda. Tidak akan berefek apabila `optimize` disetel ke `false`. |
| **`purge`**    | `boolean`              | `false`     | Menghapus semua field konten di file JSON yang tidak memiliki jejak pemanggilan/akses (property access) di dalam source code Anda secara statik. Tidak akan berefek apabila `optimize` disetel ke `false`.               |

### Minifikasi (penggantian nama kunci file/field)

Perintah `build.minify` **tidak** akan melakukan proses minifikasi file JavaScript di bundle Anda — hal itu masih dipegang oleh bundler Anda. Opsi ini difungsikan untuk memperkecil ukuran file kamus JSON dengan menggantikan kunci field buatan pengguna (user-defined keys) menjadi alias huruf abjad yang jauh lebih ringkas:

```
// Sebelum minifikasi
{ "title": "Halo", "subtitle": "Dunia" }

// Sesudah minifikasi
{ "a": "Halo", "b": "Dunia" }
```

Hal ini akan berlaku sama persis pada struktur pengaksesan kode (property access) di dalam source code, jadi panggilan `content.title` akan berubah menjadi `content.a` di kode kompilasinya. Perilaku eksekusinya tetap sama 100%.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Minifikasi akan dilompati (skipped) bila `optimize` disetel menjadi `false` atau `editor.enabled` bernilai `true` (Visual editor sangat memerlukan nama field asli untuk mode pengeditan).

> Proses minifikasi ini juga akan dihiraukan jika file kamus dipanggil lewat `importMode: 'fetch'` karena file JSON tersebut dikirim dari API terpencil menggunakan nama struktur kunci originalnya. Apabila client mencoba melakukan minifikasi maka jembatan kontrak server/client akan rusak.

### Purging (penghapusan field konten tak terpakai)

Fungsi `build.purge` digunakan untuk menyeleksi mana saja field di dalam konten Anda yang diakses langsung oleh source code. Seluruh data konten lain akan langsung dibersihkan dan dihapus dari kumpulan data kamus JSON.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Contoh:** Ada sebuah kamus dengan lima field, namun hanya dua yang digunakan:

```
// Sebelum proses purge
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Setelah proses purge (hanya title dan subtitle yang dipertahankan)
{ "title": "…", "subtitle": "…" }
```

> Purge akan dilompati ketika `optimize` bernilai `false` atau `editor.enabled` adalah `true`.

> Secara konservatif, proses purge tidak akan dilaksanakan jika file asal (source file) gagal dipindai, atau pemanggilan `useIntlayer` disimpan di variabel untuk lalu disebarluaskan di mana proses pindaian statik tak mampu melacak jejaknya (contoh lewat spread function atau pengiriman prop secara untuh). Jika skenario ini terjadi, file kamus tak akan disentuh.

### Mode Import

Bagi aplikasi dengan skala besar dan memiliki banyak sekali jumlah halaman juga jumlah terjemahan, file JSON terkadang memakan bagian yang amat substansial di bundle Anda. Menggunakan opsi `importMode` dapat mengatur secara fleksibel strategi pendistribusian file kamus.

### Pengaturan Global

Metode pemanggilan `importMode` bisa dikonfigurasi melalui scope global via file `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // Default-nya adalah 'static'
  },
};

export default config;
```

### Definisi spesifik (Per-dictionary)

Anda juga bisa melakukan pengeditan secara individu dengan mencabut pengaturan global untuk diganti secara lekat (override) langsung via properti `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Melampaui batasan importMode global (Override)
  content: {
    // ...
  },
};

export default appContent;
```

| Properti         | Tipe                               | Default    | Deskripsi                                                                                                       |
| :--------------- | :--------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Deprecated (Kedaluwarsa)**: Silakan gunakan `dictionary.importMode`. Opsi untuk memilih cara pendistribusian. |

Properti `importMode` akan langsung berdampak pada metode penanaman konten aplikasi Anda. Konfigurasi ini bisa didefinisikan lewat `intlayer.config.ts` pada objek `dictionary` (secara luas) atau ditargetkan pada file kamus individu via berkas `.content.ts`.

### 1. Mode Static (Static Mode - `default`)

Dengan metode ini, Intlayer akan mengganti tulisan `useIntlayer` menjadi `useDictionary` lalu melakukan penanaman langsung semua data konten tersebut secara murni tanpa jeda ke dalam bundle aplikasi.

- **Kelebihan (Pros):** Rendersi secara instan (synchronous), nol jaringan interupsi saat proses hidrasi (hydration).
- **Kekurangan (Cons):** Bundle Anda akan menyimpan paket bahasa utuh di komponen tersebut **sepenuhnya**.
- **Peruntukan (Best for):** Single Page Applications (SPA).

**Contoh kode usai transformasi:**

```tsx
// Kode asli Anda
const content = useIntlayer("my-key");

// Ilustrasi kode seusai transformasi optimasi (Static)
// Kode di bawah hanyalah ilustrasi semata
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      id: "Judul saya",
    },
  },
});
```

### 2. Mode Dinamis (Dynamic Mode)

Lewat fungsi dynamic, Intlayer me-rewrite instruksi `useIntlayer` memakai `useDictionaryAsync`. Konsepnya menyalin sistem kerja `import()` (hampir sama seperti React Suspense), ini menjamin setiap file dictionary JSON hanya akan dijalankan berdasar rute letak wilayah spesifik Anda berada (locale).

- **Kelebihan (Pros):** **Penerapan locale-level tree shaking.** Pengguna yang membuka tampilan bahasa Inggris akan men-download file bahasa Inggrisnya saja _tanpa_ membawa konten bahasa Indonesianya. File Bahasa Indonesia tidak akan dimuat.
- **Kekurangan (Cons):** Menyisipkan satu pemanggilan aset (asset fetch/jaringan ekstra) di kala hidrasi komponen berjalan.
- **Peruntukan (Best for):** Blog atau teks naratif artikel besar, aplikasi berat dan masif yang butuh penanganan optimasi total pada bobot bundle file.

**Contoh kode usai transformasi:**

```tsx
// Kode asli Anda
const content = useIntlayer("my-key");

// Ilustrasi kode seusai transformasi optimasi (Dynamic)
// Kode di bawah hanyalah ilustrasi semata
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  id: () =>
    import(".intlayer/dynamic_dictionary/my-key/id.json").then(
      (mod) => mod.default
    ),
});
```

> Catatan: Apabila `importMode: 'dynamic'` diaplikasikan pada 100 tempat penggunaan `useIntlayer` di sebuah halamannya secara terpisah, hal itu dapat menimbulkan "waterfall" di mana browser memicu 100 pendistribusian network secara parsial. Solusinya, Anda dapat mengelompokkan panggilan dictionary itu di bawah satu nama (dengan me-mergenya jadi satu kelompok besar) ketimbang membaginya menjadi objek komponen terkecil demi keseimbangan loading time Anda.

### 3. Mode Fetch (Fetch Mode)

Sifat eksekusinya sama persis seperti fungsi Dinamis (Dynamic) namun bedanya metode ini mengumpulkan aset datanya via penarikan melalui API Intlayer Live Sync. Jikalau rute pemanggilan datanya gagal atau memang fiturnya diposisikan mati, program akan me-refresh kondisinya menggunakan teknik dynamic import standar.

**Contoh kode usai transformasi:**

```tsx
// Kode asli Anda
const content = useIntlayer("my-key");

// Ilustrasi kode seusai transformasi optimasi (Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  id: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/id").then((res) =>
      res.json()
    ),
});
```

> Lihat panduan CMS untuk petunjuk spesifikasinya: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

> Di dalam mode fetch, purge dan minify tak bisa dilaksanakan disebabkan file JSON Anda dipanggil menggunakan API cloud dengan spesifikasi original names (namanya tetap dipertahankan murni).

## Kesimpulan: Static vs Dinamis (Dynamic)

| Fitur                              | Mode Static (Statis)                               | Mode Dinamis (Dynamic)                   |
| :--------------------------------- | :------------------------------------------------- | :--------------------------------------- |
| **Ukuran Bundle JS**               | Lebih besar (berisi utuh seisi bahasa komponennya) | Amat kecil (murni skrip, tiada data)     |
| **Loading Awal (Init)**            | Cepat (Lengkap sepaket dengan bundle)              | Butuh jeda kecil (harus me-load JSON)    |
| **Ketergantungan Network**         | 0 penarikan tambahan (bebas jaringan)              | 1 penarikan per satuan key dictionary    |
| **Pemotongan file (Tree Shaking)** | Hanya di ranah komponen                            | Menyortir per komponen + wilayah lokal   |
| **Skema Target Terbaik**           | Tombol navigasi (UI), Situs SPA Kecil              | Artikel berat/banyak, Beragam terjemahan |
